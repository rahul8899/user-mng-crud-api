import express from "express";
import { AuthRoute } from "./modules/auth/auth.route"
import { CategoryRoute } from "./modules/category/category.route";
import { ProductRoute } from "./modules/product/product.route";

export class Routes {
  router = express.Router();

  path() {
    this.router.use('/auth', new AuthRoute().router);

    this.router.use('/category', new CategoryRoute().router);

    this.router.use('/product', new ProductRoute().router);

    return this.router;
  }
}
