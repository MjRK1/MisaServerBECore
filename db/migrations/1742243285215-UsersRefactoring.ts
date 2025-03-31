import { MigrationInterface, QueryRunner } from "typeorm";

export class userRefactoring1742238342165 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE IF NOT EXISTS "user" ('+
          'id integer  primary key');

        await queryRunner.query('ALTER TABLE IF EXISTS "user" DROP COLUMN "name"');
        await queryRunner.query('ALTER TABLE IF EXISTS "user" DROP COLUMN "email"');

        // Добавление новых колонок
        await queryRunner.query('ALTER TABLE IF EXISTS "user" ADD COLUMN "username" character varying NOT NULL');
        await queryRunner.query('ALTER TABLE IF EXISTS "user" ADD COLUMN "password" character varying NOT NULL');
        await queryRunner.query('ALTER TABLE IF EXISTS  "user" ADD COLUMN "displayName" character varying NOT NULL');
        await queryRunner.query('ALTER TABLE IF EXISTS  "user" ADD COLUMN "createdAt" TIMESTAMP NOT NULL DEFAULT now()');
        await queryRunner.query('ALTER TABLE IF EXISTS  "user" ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT now()');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "displayName"');
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "username"');
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "password"');
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "createdAt"');
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "updatedAt"');

        // Восстановление старых колонок (если необходимо)
        await queryRunner.query('ALTER TABLE "user" ADD COLUMN "name" character varying');
        await queryRunner.query('ALTER TABLE "user" ADD COLUMN "email" character varying');
    }
}
