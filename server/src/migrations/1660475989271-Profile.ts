// @ts-ignore
import {MigrationInterface, QueryRunner} from "typeorm";

export class Profile1660475989271 implements MigrationInterface {
    name = 'Profile1660475989271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "representative" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" RENAME COLUMN "name" TO "firstName"`);
        await queryRunner.query(`ALTER TABLE "representative" RENAME COLUMN "name" TO "firstName"`);
        await queryRunner.query(`CREATE TYPE "public"."solar_power_plant_owner_ownertype_enum" AS ENUM('INDIVIDUAL', 'CORPORATE', 'MANAGEMENT_COMPANY')`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" ADD "ownerType" "public"."solar_power_plant_owner_ownertype_enum" NOT NULL DEFAULT 'MANAGEMENT_COMPANY'`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" ADD "companyName" character varying`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" ADD "lastName" character varying`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" ADD "nickname" character varying`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" ADD "lat" double precision`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" ADD "lng" double precision`);
        await queryRunner.query(`ALTER TABLE "representative" ADD "companyName" character varying`);
        await queryRunner.query(`ALTER TABLE "representative" ADD "lastName" character varying`);
        await queryRunner.query(`ALTER TABLE "representative" ADD "nickname" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "representative" DROP COLUMN "nickname"`);
        await queryRunner.query(`ALTER TABLE "representative" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "representative" RENAME COLUMN "firstName" TO "name"`);
        await queryRunner.query(`ALTER TABLE "representative" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "representative" DROP COLUMN "companyName"`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" DROP COLUMN "nickname"`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" RENAME COLUMN "firstName" TO "name"`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" DROP COLUMN "companyName"`);
        await queryRunner.query(`ALTER TABLE "solar_power_plant_owner" DROP COLUMN "ownerType"`);
        await queryRunner.query(`DROP TYPE "public"."solar_power_plant_owner_ownertype_enum"`);
    }

}
