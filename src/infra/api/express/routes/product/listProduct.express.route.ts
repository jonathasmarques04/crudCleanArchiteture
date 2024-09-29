import { Request, Response } from "express";
import {
    ListProductOutputDto,
    ListProductUseCase,
} from "../../../../../useCases/list-product/listProduct.usecase";
import { httpMethod, HttpMethod, Route } from "../routes";

export type ListProductResponseDto = {
    products: {
        id: string;
        name: string;
        price: number;
    }[];
};

export class ListProductRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listProductService: ListProductUseCase
    ) {}

    public static create(listProductService: ListProductUseCase) {
        return new ListProductRoute(
            "/products",
            httpMethod.GET,
            listProductService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const output = await this.listProductService.execute();

            const responseBody = this.present(output);

            response.status(200).json(responseBody).send();
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: ListProductOutputDto): ListProductResponseDto {
        const response: ListProductResponseDto = {
            products: input.product.map((index) => ({
                id: index.id,
                name: index.name,
                price: index.price,
            })),
        };

        return response;
    }
}