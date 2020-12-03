import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1606671808053 implements MigrationInterface {
    name = 'initial1606671808053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "category"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."enabled" IS NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "enabled" SET DEFAULT true`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."updatedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "product"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "enabled" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."enabled" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."createdAt" IS NULL`);
    }

}
