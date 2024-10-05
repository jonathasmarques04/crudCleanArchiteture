import { prisma } from "./package";

import {
  ApiExpress,
  CreateProductRoute,
  ListProductRoute,
  ProductRepositoryPrisma,
} from "./infra";

import { CreateProductUseCase, ListProductUseCase } from "./useCases";

function main() {
  const repository = ProductRepositoryPrisma.create(prisma);

  const createProductUseCase = CreateProductUseCase.create(repository);
  const listProductUseCase = ListProductUseCase.create(repository);

  const createRoute = CreateProductRoute.create(createProductUseCase);
  const listRoute = ListProductRoute.create(listProductUseCase);

  const api = ApiExpress.create([createRoute, listRoute]);
  const port = 5000;
  api.start(port);
}

main();
