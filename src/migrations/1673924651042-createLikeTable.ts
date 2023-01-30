import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createLikeTable1673924651042 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "like",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
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
          await queryRunner.createForeignKey("like", foreignKeyUser);
      
          const foreignKeyPost = new TableForeignKey({
              columnNames: ["postId"],
              referencedColumnNames: ["id"],
              referencedTableName: "post",
              onDelete: "CASCADE",
            });
            await queryRunner.createForeignKey("like", foreignKeyPost);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('like');

    }

}
