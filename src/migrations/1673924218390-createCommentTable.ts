import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createCommentTable1673924218390 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "comment",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "comment",
            type: "varchar(1000)",
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
          {
            name: "postId",
            type: "int",
          },
        ],
      }),
      true,
    );
    queryRunner.clearSqlMemory();
    const foreignKeyUser = new TableForeignKey({
      columnNames: ["userId"],
      referencedColumnNames: ["id"],
      referencedTableName: "user",
      onDelete: "CASCADE",
    });
    await queryRunner.createForeignKey("comment", foreignKeyUser);

    const foreignKeyPost = new TableForeignKey({
        columnNames: ["postId"],
        referencedColumnNames: ["id"],
        referencedTableName: "post",
        onDelete: "CASCADE",
      });
      await queryRunner.createForeignKey("comment", foreignKeyPost);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('comment');
  }
}
