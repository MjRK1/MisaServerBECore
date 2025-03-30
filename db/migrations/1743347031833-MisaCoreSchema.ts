import { MigrationInterface, QueryRunner } from "typeorm";

export class MisaCoreSchema1743347031833 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "misacore_schema";`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP SCHEMA IF EXISTS "misacore_schema";`);
    }
}
