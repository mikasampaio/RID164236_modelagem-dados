import type { QueryDTO } from "@/dtos/commons.dtos";
import type { Prisma, PrismaClient, Product } from "@/generated/prisma/client";
import type { IGetResponse } from "@/interfaces/commons.interface";

export class ProductsRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return await this.prisma.product.create({
      data: {
        ...data,
        status: {
          createdAt: new Date(),
        },
      },
    });
  }

  async get({
    page,
    pageSize,
    search,
  }: QueryDTO): Promise<IGetResponse<Product>> {
    const whereParams: Prisma.ProductWhereInput = {
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    };

    const [results, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where: whereParams,
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
        orderBy: {
          name: "asc",
        },
      }),
      this.prisma.product.count({
        where: whereParams,
      }),
    ]);

    return {
      results,
      total,
    };
  }

  async getById(id: string): Promise<Product | null> {
    return await this.prisma.product.findFirst({
      where: {
        id,
      },
    });
  }

  async getByName(name: string): Promise<Product | null> {
    return await this.prisma.product.findFirst({
      where: { name },
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...data,
        status: {
          updatedAt: new Date(),
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
