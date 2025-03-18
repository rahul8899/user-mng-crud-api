import { NextFunction, Request, Response } from "express";
import { User } from "../../db/user.model";
import { BadRequestResponse, InternalServerErrorResponse, SuccessResponse } from "../../helpers/http";
import { comparePassword, hashPassword } from "../../helpers/bcrypt";
import { AUTH, USER } from "../../helpers/message";
import { loginToken } from "../../helpers/util";
import { TokenPayload } from "../../interface/auth.interface";

export class AuthController {

    public registerUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const { body } = req

            const existingUser = await User.findOne({ where: { email: body.email } });
            if (existingUser) {
                return BadRequestResponse(res, USER.USER_EXIST);
            }

            const hashedPassword = await hashPassword(body.password);

            const newUser = await User.create({
                email: body.email,
                password: hashedPassword
            })

            return SuccessResponse(res, USER.USER_RESGISTERED, newUser);
        } catch (error: any) {
            console.log('error: ', error);
            return InternalServerErrorResponse(res, error.message);
        }
    }

    public loginUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const { body } = req

            const existingUser = await User.findOne({ where: { email: body.email } });
            if (!existingUser) {
                return BadRequestResponse(res, USER.USER_NOT_FOUND);
            }

            const isPasswordMatch = await comparePassword(body.password, existingUser.password);

            if (!isPasswordMatch) {
                return BadRequestResponse(res, AUTH.INVALID_PASSWORD);
            }

            const user_payload: TokenPayload = {
                user_id: existingUser.id,
                email: existingUser.email
            }

            const token = loginToken(user_payload)

            const response = {
                token
            }

            return SuccessResponse(res, AUTH.LOGIN_SUCCESS, response);
        } catch (error: any) {
            return InternalServerErrorResponse(res, error.message);
        }
    }

}
