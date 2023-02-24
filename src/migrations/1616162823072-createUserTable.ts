import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1616162823072 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },

          { 
            name:'age',
            type:'int',
            isNullable: true,
          },
          {
            name:'sex',
            type:'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type:'int',
            isNullable: true,
          },
          {
            name: 'isDeleted',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'coverPicture',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
