import express from "express";
import { prismaConnect } from "./database/prisma";
import { env } from "./services/config/env";

const port = env.PORT;

const app = express();

const startServer = async () => {
  try {
    await prismaConnect();

    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();

// Prisma Schema -> DTO (Schema) -> REPOSITORY (CAMADA PARA CHAMAR O PRISMACLIENT) -> SERVICE -> CONTROLLER -> ROUTES
