generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  items     Item[]   // Relacionamento com os itens perdidos/achados
}

model Admin {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  role      String   // 'admin' ou outros níveis de acesso, se necessário
}

model Item {
  id          Int      @id @default(autoincrement())
  name        String
  description String
  status      String   // 'lost' ou 'found'
  dateLost    DateTime @default()
  locationId  Int
  location    Location @relation(fields: [locationId], references: [id])
  userId      Int?
  user        User?    @relation(fields: [userId], references: [id])  // Usuário que cadastrou o item
  proofs      Proof[]  // Provas (ex: fotos do item)
}

model Proof {
  id       Int      @id @default(autoincrement())
  imageUrl String
  itemId   Int
  item     Item     @relation(fields: [itemId], references: [id])
}

model Location {
  id       Int      @id @default(autoincrement())
  name     String   // Nome da estação de metrô
  address  String?  // Endereço da estação (opcional)
  items    Item[]   // Itens perdidos/encontrados nessa estação
}
  await Prisma.image.deleteMany({
      where: {
        itemId: id, // Dependendo do nome da chave estrangeira
      },
    });