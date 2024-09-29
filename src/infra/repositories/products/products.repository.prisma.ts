// A parte de infra se destina um pouco mais para a conexão entre o nosso modelo de negócio que já está na fase
// de useCases e o nosso Banco de Dados

import { PrismaClient } from "@prisma/client";

import { Product, ProductGateway } from "../../../domain";

export class ProductRepositoryPrisma implements ProductGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new ProductRepositoryPrisma(prismaClient);
  }

  public async save(product: Product): Promise<void> {
    const data = {
      id: product.getId(),
      name: product.getName(),
      price: product.getPrice(),
      quantity: product.getQuantity(),
    };

    await this.prismaClient.product.create({
      data,
    });
  }
  public async list(): Promise<Product[]> {
    const products = await this.prismaClient.product.findMany();

    const productList = products.map((index) => {
      const product = Product.with({
        id: index.id,
        name: index.name,
        price: index.price,
        quantity: index.quantity,
      });
      return product
    });

    return productList
  }
}
