// O gateway faz uma conexão direta com o produto

import { Product } from "../entity/product.entity";

export interface ProductGateway {
    save(product: Product): Promise<void>
    list(): Promise<Product[]>
}