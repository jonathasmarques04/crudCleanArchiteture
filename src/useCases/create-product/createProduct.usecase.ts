// A camada  de useCases pode fazer conexão os modelos de negócios descritos na parte de entities (DOMAIN)

import { Product, ProductGateway } from "../../domain";

import { UseCase } from "../useCase"

export type CreateProductInputDto = {
    name: string;
    price: number;
}

export type CreateProductOutputDto = {
    id: string;
}

export class CreateProductUseCase implements UseCase<CreateProductInputDto, CreateProductOutputDto>{
    private constructor(private readonly productGateway: ProductGateway){}

    public static create(productGateway: ProductGateway){
        return new CreateProductUseCase(productGateway)
    }

    public async execute({ name, price }: CreateProductInputDto): Promise<CreateProductOutputDto>{
        const product = Product.create(name, price)

        await this.productGateway.save(product)

        const productOutput = this.presentOutput(product)

        return productOutput
    }


    private presentOutput(product: Product): CreateProductOutputDto{
        const productOutput: CreateProductOutputDto = {
            id: product.getId()
        }

        return productOutput
    }
}