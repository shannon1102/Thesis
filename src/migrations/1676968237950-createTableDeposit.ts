import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTableDeposit1676968237950 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: "deposit",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "userId",
                type: "int",
              },
              {
                name: "productId",
                type: "int",
              },
              {
                name: "price",
                type: "int",
              },
    
              {
                name: "customerName",
                type: "varchar",
              },
              {
                name: "customerEmail",
                type: "varchar",
              },
              {
                name: "customerPhone",
                type: "varchar",
              },
              {
                name: "customerAddress",
                type: "varchar",
              },
              {
                name: "paymentMethod",
                type: "varchar",
              },
    
              {
                name: "status",
                type: "varchar",
              },
    
              {
                name: "createdAt",
                type: "datetime",
                default: "CURRENT_TIMESTAMP(6)",
              },
              {
                name: "updatedAt",
                type: "datetime",
                default: "CURRENT_TIMESTAMP(6)",
                onUpdate: "CURRENT_TIMESTAMP(6)",
              },
            ],
          }),
          true,
        );
        queryRunner.clearSqlMemory();
        
        const depositUserForginKey = 
          new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE",
          });
        await queryRunner.createForeignKey("deposit",depositUserForginKey);
        queryRunner.clearSqlMemory();
        const depositProductForginKey =
            new TableForeignKey({
              columnNames: ["productId"],
              referencedColumnNames: ["id"],
              referencedTableName: "product",
              onDelete: "CASCADE",
            });
        await queryRunner.createForeignKey("deposit",depositProductForginKey);
      }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("deposit");
    }

}
