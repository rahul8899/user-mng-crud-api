import { Router } from 'express'
import { bodyValidator } from '../../middleware/validate.middleware'
import { ProductController } from './product.controller'
import { productSchema } from './product.schema'
import { Auth } from '../../middleware/auth.middleware'

export class CategoryRoute {
    router = Router()
    private prodCont: ProductController = new ProductController()

    constructor() {
        this.router.get('/', [Auth], this.prodCont.getProducts)

        this.router.post('/', [Auth, bodyValidator(productSchema)], this.prodCont.createProduct)

        this.router.put('/:id', [Auth, bodyValidator(productSchema)], this.prodCont.updateProduct)

        this.router.delete('/:id', [Auth], this.prodCont.deleteProduct)
    }
}
