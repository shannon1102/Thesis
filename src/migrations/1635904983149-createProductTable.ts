import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createProductTable1635904983149 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "status",
            type: "varchar",
          },
          {
            name: "numFloors",
            type: "int",
            isNullable: true,
          },
          {
            name: "numBedRooms",
            type: "int",
            default: 0,
          },
          {
            name: "squaredMeterArea",
            type: "int",
            default: 0,
          },
          {
            name: "lengthMeter",
            type: "int",
            default: 0,
          },
          {
            name: "widthMeter",
            type: "int",
            default: 0,
          },
          {
            name: "featureImageId",
            type: "int",
          },
          {
            name: "certificateOfLand",
            type: "int"
          },
          {
            name: "district",
            type: "varchar",
          },
          {
            name: "ward",
            type: "varchar",
          },

          {
            name: "houseType",
            type: "int",
          },
          {
            name: "userId",
            type: "int"
          },
          {
            name: "price",
            type: "bigint",
            default: 0,
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
    const featureImageForeignKey = new TableForeignKey({
      columnNames: ["featureImageId"],
      referencedColumnNames: ["id"],
      referencedTableName: "media",
      onDelete: "CASCADE",
    });
    await queryRunner.createForeignKey("product", featureImageForeignKey);
    queryRunner.clearSqlMemory();
    const userForeignKey = new TableForeignKey({
      columnNames: ["userId"],
      referencedColumnNames: ["id"],
      referencedTableName: "user",
      onDelete: "CASCADE",
    });
    await queryRunner.createForeignKey("product", userForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("product");
  }
}
