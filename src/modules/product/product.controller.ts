import { NextFunction, Request, Response } from "express";
import { BadRequestResponse, InternalServerErrorResponse, SuccessResponse } from "../../helpers/http";
import { Product } from "../../db/product.model"; // Assuming the Product model is in the 'product.model' file
import { PRODUCT } from "../../helpers/message"; // Assuming you have message constants for product-related responses

export class ProductController {

    public createProduct = async (req: Request, res: Response): Promise<any> => {
        try {
            const { body } = req;

            // Check if a product with the same name already exists
            const existingProduct = await Product.findOne({
                where: {
                    name: body.name, category_id: body.category_id,
                }
            });
            if (existingProduct) {
                return BadRequestResponse(res, PRODUCT.PRODUCT_EXIST);
            }

            // Create a new product
            const newProduct = await Product.create({
                name: body.name,
                category_id: body.category_id,
                price: body.price,
                detail: body.detail
            });

            return SuccessResponse(res, PRODUCT.PRODUCT_CREATED, newProduct);
        } catch (error: any) {
            return InternalServerErrorResponse(res, error.message);
        }
    }

    public getProducts = async (req: Request, res: Response): Promise<any> => {
        try {
            const products = await Product.findAll();
            return SuccessResponse(res, PRODUCT.PRODUCT_FETCHED, products);
        } catch (error: any) {
            return InternalServerErrorResponse(res, error.message);
        }
    }

    public getProductById = async (req: Request, res: Response): Promise<any> => {
        try {
            const product = await Product.findOne({ where: { id: req.params.id } });
            if (!product) {
                return BadRequestResponse(res, PRODUCT.PRODUCT_NOT_FOUND);
            }
            return SuccessResponse(res, PRODUCT.PRODUCT_FETCHED, product);
        } catch (error: any) {
            return InternalServerErrorResponse(res, error.message);
        }
    }

    public updateProduct = async (req: Request, res: Response): Promise<any> => {
        try {
            const { body } = req;
            const product = await Product.findOne({ where: { id: req.params.id } });
            if (!product) {
                return BadRequestResponse(res, PRODUCT.PRODUCT_NOT_FOUND);
            }

            const updatedProduct = await product.update(body);
            return SuccessResponse(res, PRODUCT.PRODUCT_UPDATED, updatedProduct);
        } catch (error: any) {
            return InternalServerErrorResponse(res, error.message);
        }
    }

    public deleteProduct = async (req: Request, res: Response): Promise<any> => {
        try {
            const product = await Product.findOne({ where: { id: req.params.id } });
            if (!product) {
                return BadRequestResponse(res, PRODUCT.PRODUCT_NOT_FOUND);
            }

            await product.destroy();
            return SuccessResponse(res, PRODUCT.PRODUCT_DELETED);
        } catch (error: any) {
            return InternalServerErrorResponse(res, error.message);
        }
    }
}
