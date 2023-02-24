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
                  name: "requesterId",
                  type: "int",
                },
                {
                  name: "addresseeId",
                  type: "int",
                },
                {
                  name: "statusCode",
                  type: "int"
                  //1: Requested ,2: Accept,3: Declined
                }
              ],
            }),
            true,
          );
          queryRunner.clearSqlMemory();
          const foreignKeyUser = new TableForeignKey({
            columnNames: ["requesterId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE",
          });
          await queryRunner.createForeignKey("friend", foreignKeyUser);
      
          const foreignKeyFriend = new TableForeignKey({
              columnNames: ["addresseeId"],
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
