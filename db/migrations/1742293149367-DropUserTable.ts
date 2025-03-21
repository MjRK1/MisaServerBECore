import { MigrationInterface, QueryRunner } from "typeorm";

export class DropUserTable1742293149367 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "user"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "user" (' +
          'id integer  primary key, username varchar,' +
          ' password varchar, dispayName varchar, createAt timestamp, updatedAt timestamp');
    }
}
