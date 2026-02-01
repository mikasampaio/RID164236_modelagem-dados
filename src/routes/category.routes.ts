import { Router } from "express";
import { CategoriesController } from "@/controllers/categories.controller";
import {
  createCategorySchema,
  updateCategorySchema,
} from "@/dtos/categories.dtos";
import categoryFactory from "@/factories/category.factory";
import { QueryParams, validator } from "@/middlewares/validator.middleware";

export const categoryRoutes = Router();

const categoryController = new CategoriesController(
  categoryFactory.getService(),
);

categoryRoutes.post(
  "/",
  validator({
    type: QueryParams.BODY,
    schema: createCategorySchema,
  }),
  categoryController.create,
);

categoryRoutes.get("/", (req, res, next) => {
  if (req.query.id) return categoryController.getById(req, res, next);
  return categoryController.get(req, res, next);
});

categoryRoutes.put(
  "/",
  validator({
    type: QueryParams.BODY,
    schema: updateCategorySchema,
  }),
  categoryController.update,
);

categoryRoutes.delete("/", categoryController.delete);
