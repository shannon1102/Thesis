import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createMesageTable1677079981667 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "message",
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
                    name: "message",
                    type: "varchar(1000)",
                  },
                  {
                    name: "conversationId",
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
            
            const messageUserForginKey = 
              new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
              });
            await queryRunner.createForeignKey("message",messageUserForginKey);
            queryRunner.clearSqlMemory();
            const messageConversationForginKey =
                new TableForeignKey({
                  columnNames: ["conversationId"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "conversation",
                  onDelete: "CASCADE",
                });
            await queryRunner.createForeignKey("message",messageConversationForginKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("message");
    }

}
