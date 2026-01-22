import { StatusCodes } from "http-status-codes";
import type { CategoriesRepository } from "@/database/repositories/categories.repository";
import type { ProductsRepository } from "@/database/repositories/products.repository";
import type { QueryDTO } from "@/dtos/commons.dtos";
import type { CreateProductDTO, UpdateProductDTO } from "@/dtos/products.dtos";
import { ErrorMessage } from "@/errors";
import type { Product } from "@/generated/prisma/client";
import type { IGetResponse } from "@/interfaces/commons.interface";

export class ProductService {
  constructor(
    private productRepository: ProductsRepository,
    private categoryRepository: CategoriesRepository,
  ) {}

  async create({
    name,
    categoryId,
    ...props
  }: CreateProductDTO): Promise<Product> {
    const categoryExists = await this.categoryRepository.getById(categoryId);

    if (!categoryExists) {
      throw new ErrorMessage("Category not found.", StatusCodes.NOT_FOUND);
    }

    const foundProduct = await this.productRepository.getByName(name);

    if (foundProduct) {
      throw new ErrorMessage(
        "Product with this name already exists.",
        StatusCodes.BAD_REQUEST,
      );
    }

    return await this.productRepository.create({
      name,
      category: { connect: { id: categoryId } },
      ...props,
    });
  }

  async get(params: QueryDTO): Promise<IGetResponse<Product>> {
    return await this.productRepository.get(params);
  }

  async getById(id: string): Promise<Product | null> {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new ErrorMessage("Product not found.", StatusCodes.NOT_FOUND);
    }

    return product;
  }

  async update(id: string, data: UpdateProductDTO): Promise<Product> {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new ErrorMessage("Product not found.", StatusCodes.NOT_FOUND);
    }

    if (data.name && data.name !== product.name) {
      const foundProduct = await this.productRepository.getByName(
        data.name as string,
      );

      if (foundProduct) {
        throw new ErrorMessage(
          "Product with this name already exists.",
          StatusCodes.BAD_REQUEST,
        );
      }
    }

    const isExistsCategory = data.categoryId
      ? await this.categoryRepository.getById(data.categoryId)
      : null;

    if (data.categoryId && !isExistsCategory) {
      throw new ErrorMessage("Category not found.", StatusCodes.NOT_FOUND);
    }

    return await this.productRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new ErrorMessage("Product not found.", StatusCodes.NOT_FOUND);
    }

    return await this.productRepository.delete(id);
  }
}
