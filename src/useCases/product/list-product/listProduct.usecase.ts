// A camada  de useCases pode fazer conexão os modelos de negócios descritos na parte de entities (DOMAIN)

import { Product, ProductGateway } from "../../../domain";

import { UseCase } from "../../useCase";

export type ListProductInputDto = void

export type ListProductOutputDto = {
    product: {
        id: string;
        name: string;
        price: number;
        quantity: number
    }[]
}

export class ListProductUseCase implements UseCase<ListProductInputDto, ListProductOutputDto> {
    private constructor(private readonly productGateway: ProductGateway){}

    public static create(productGateway: ProductGateway){
        return new ListProductUseCase(productGateway)
    }

    public async execute(input: void): Promise<ListProductOutputDto> {
        const product = await this.productGateway.list()

        const productOutput = this.presentOutput(product)

        return productOutput
    }

    private presentOutput(product: Product[]): ListProductOutputDto {
        return {
            product: product.map((index) => {
                return { 
                    id: index.getId(),
                    name: index.getName(),
                    price: index.getPrice(),
                    quantity: index.getQuantity()
                }
            })
        }
    }
}