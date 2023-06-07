
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
export class ExchangeInformation extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    blogUrl: string;

    @Field()
    @Column()
    twitter: string;

    @Field( { nullable: true })
    @Column()
    comment: string;

    @Field( { nullable: true })
    @Column()
    interested: string;

    @Field( { nullable: true })
    @Column()
    trouble: string;

    @Field( )
    @Column()
    userId: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
