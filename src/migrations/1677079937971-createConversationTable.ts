import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createConversationTable1677079937971 implements MigrationInterface {

 public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "conversation",
                columns: [
                  {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                  },
                  {
                    name: "firstUserId",
                    type: "int",
                  },
                  {
                    name: "secondUserId",
                    type: "int",
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
            
            const conversationFirstUserForginKey = 
              new TableForeignKey({
                columnNames: ["firstUserId"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
              });
            await queryRunner.createForeignKey("conversation",conversationFirstUserForginKey);
            queryRunner.clearSqlMemory();
            const conversationSecondUserForginKey =
                new TableForeignKey({
                  columnNames: ["secondUserId"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "user",
                  onDelete: "CASCADE",
                });
            await queryRunner.createForeignKey("conversation",conversationSecondUserForginKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("conversation");
    }

}
