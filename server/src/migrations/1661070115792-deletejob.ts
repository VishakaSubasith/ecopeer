// @ts-ignore
import {MigrationInterface, QueryRunner} from "typeorm";

export class deletejob1661070115792 implements MigrationInterface {
    name = 'deletejob1661070115792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "deletedAt"`);
    }

}
