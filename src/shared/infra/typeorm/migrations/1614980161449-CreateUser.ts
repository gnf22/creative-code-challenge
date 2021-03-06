import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1614980161449 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'telephone',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'age',
            type: 'integer',
          },
          {
            name: 'weight',
            type: 'decimal',
            precision: 5,
            scale: 2,
          },
          {
            name: 'ethnicity',
            type: 'enum',
            enum: [
              'branco',
              'preto',
              'amarelo',
              'pardo',
              'indígena',
              'outro',
              'nenhum',
            ],
            enumName: 'ethnicityEnum',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
