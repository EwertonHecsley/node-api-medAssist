-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F', 'O');

-- CreateTable
CREATE TABLE "pacients" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "susNumber" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gender" "Gender" NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pacients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "docNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" UUID NOT NULL,
    "pacientId" UUID NOT NULL,
    "doctorId" UUID NOT NULL,
    "originalText" TEXT NOT NULL,
    "improvedText" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pacients_susNumber_key" ON "pacients"("susNumber");

-- CreateIndex
CREATE UNIQUE INDEX "pacients_cpf_key" ON "pacients"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pacients_email_key" ON "pacients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_docNumber_key" ON "doctors"("docNumber");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_email_key" ON "doctors"("email");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "pacients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
