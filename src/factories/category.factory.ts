import { CategoriesRepository } from "@/database/repositories/categories.repository";
import { PrismaClient } from "@/generated/prisma/client";
import { CategoryService } from "@/services/categories.services";

const categoryFactory = (() => {
  let categoryService: CategoryService;

  return {
    getService: (): CategoryService => {
      if (!categoryService) {
        const categoryRepository = new CategoriesRepository(new PrismaClient());

        categoryService = new CategoryService(categoryRepository);
      }
      return categoryService;
    },
  };
})();

export default categoryFactory;
