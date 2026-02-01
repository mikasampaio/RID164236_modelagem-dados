import "dotenv/config";

import { OrderStatus, PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.order.updateMany({
    where: { orderStatus: "CANCELED" as OrderStatus },
    data: { orderStatus: OrderStatus.CANCELLED },
  });

  console.log("Pedidos atualizados:", result.count);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
