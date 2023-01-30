import {MigrationInterface, QueryRunner} from "typeorm";

export class dropUsernameInUserTable1675013856500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE user DROP COLUMN username;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE user ADD COLUMN username varchar(200);`);

    }

}
