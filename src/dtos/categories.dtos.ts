import z from "zod";

export const createCategorySchema = {
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
};

const createCategorySchemaObject = z.object(createCategorySchema);

export type CreateCategoryDTO = z.infer<typeof createCategorySchemaObject>;

export const updateCategorySchema = {
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
};

const updateCategorySchemaObject = z.object(updateCategorySchema);

export type UpdateCategoryDTO = z.infer<typeof updateCategorySchemaObject>;
