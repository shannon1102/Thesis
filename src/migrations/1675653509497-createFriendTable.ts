import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createFriendTable1675653509497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "friend",
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
                  name: "friendId",
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
          await queryRunner.createForeignKey("friend", foreignKeyUser);
      
          const foreignKeyFriend = new TableForeignKey({
              columnNames: ["friendId"],
              referencedColumnNames: ["id"],
              referencedTableName: "user",
              onDelete: "CASCADE",
            });
            await queryRunner.createForeignKey("friend", foreignKeyFriend);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('friend');
    }

}
