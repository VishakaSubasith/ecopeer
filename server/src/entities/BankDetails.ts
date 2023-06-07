
import { Field, Int, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";


@ObjectType()
@Entity()
export class BankDetails extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    bankName: string;

    @Field()
    @Column()
    branchName: string;

    @Field( { nullable: true })
    @Column()
    depositItem: string;

    @Field( { nullable: true })
    @Column()
    accountNumber: string;

    @Field( { nullable: true })
    @Column()
    accountHolderKanji: string;

    @Field( { nullable: true })
    @Column()
    accountHolderHiragana: string;

    @Field( )
    @Column()
    userId: number;

    @Field({ nullable: true })
    @Column()
    bankType: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
