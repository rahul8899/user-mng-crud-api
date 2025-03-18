import { NextFunction, Request, Response } from "express";
import { BadRequestResponse, InternalServerErrorResponse, SuccessResponse } from "../../helpers/http";
import { Category } from "../../db/category.model";
import { CATEGORY } from "../../helpers/message";

export class CategoryController {

    public createCategory = async (req: Request, res: Response): Promise<any> => {
        try {
            const { body } = req

            const existingCategory = await Category.findOne({ where: { name: body.name } });
            if (existingCategory) {
                return BadRequestResponse(res, CATEGORY.CATEGORY_EXIST);
            }

            const newCategory = await Category.create({
                name: body.name
            })

            return SuccessResponse(res, CATEGORY.CATEGORY_CREATED, newCategory);
        } catch (error: any) {
            return InternalServerErrorResponse(res, error.message);
        }
    }

    public getCategory = async (req: Request, res: Response): Promise<any> => {
        try {
            const categories = await Category.findAll();
            return SuccessResponse(res, CATEGORY.CATEGORY_FETCHED, categories);
        } catch (error: any) {
            return InternalServerErrorResponse(res, error.message);
        }
    }

    public getCategoryById = async (req: Request, res: Response): Promise<any> => {
        try {
            const category = await Category.findOne({ where: { id: req.params.id } });
            return SuccessResponse(res, CATEGORY.CATEGORY_FETCHED, category);
        } catch (error: any) {
            return InternalServerErrorResponse(res, error.message);
        }
    }

    public updateCategory = async (req: Request, res: Response): Promise<any> => {
        try {
            const { body } = req
            const category = await Category.findOne({ where: { id: req.params.id } });
            if (!category) {
                return BadRequestResponse(res, CATEGORY.CATEGORY_NOT_FOUND);
            }

            const updatedCategory = await category.update(body);
            return SuccessResponse(res, CATEGORY.CATEGORY_UPDATED, updatedCategory);
        } catch (error: any) {
            return InternalServerErrorResponse(res, error.message);
        }
    }

    public deleteCategory = async (req: Request, res: Response): Promise<any> => {
        try {
            const category = await Category.findOne({ where: { id: req.params.id } });
            if (!category) {
                return BadRequestResponse(res, CATEGORY.CATEGORY_NOT_FOUND);
            }

            await category.destroy();
            return SuccessResponse(res, CATEGORY.CATEGORY_DELETED);
        } catch (error: any) {
            return InternalServerErrorResponse(res, error.message);
        }
    }
}
