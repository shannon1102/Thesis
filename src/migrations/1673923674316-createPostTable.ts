import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createPostTable1673923674316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "post",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "updatedAt",
            type: "datetime",
          },
          {
            name: "createdAt",
            type: "datetime",
          },
          {
            name: "isDeleted",
            type: "boolean",
          },
          {
            name: "userId",
            type: "int",
          },
        ],
      }),
      true,
    );
    queryRunner.clearSqlMemory();
    const foreignKey = new TableForeignKey({
      columnNames: ["userId"],
      referencedColumnNames: ["id"],
      referencedTableName: "user",
      onDelete: "CASCADE",
    });
    await queryRunner.createForeignKey("post", foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('post');
  }
}
