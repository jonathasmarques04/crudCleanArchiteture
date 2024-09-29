import { Api } from "../api";
import { Route } from "./routes/routes";

import express, { Express } from "express";

export class ApiExpress implements Api {
  private app: Express;

  private constructor(routes: Route[]) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
  }

  public static create(routes: Route[]) {
    return new ApiExpress(routes);
  }

  private addRoutes(routes: Route[]) {
    routes.forEach((index) => {
      const path = index.getPath();
      const method = index.getMethod();
      const handler = index.getHandler();

      this.app[method](path, handler);
    });
  } //Essa função respeita o principio 'OCP' Open closed principle

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running... port: ${port}`);
      this.listRoutes();
    });
  }

  private listRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route)
      .map((route: any) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method,
        };
      });

    console.log(routes);
  }
}
