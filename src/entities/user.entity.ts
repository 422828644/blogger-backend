import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './base.entity';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {

    @Column({unique: true})
    @ApiModelProperty({})
    account: string;

    @Column()
    password: string;

    @Column({nullable: true})
    salt: string;

    @Column({nullable: true, name: 'rel_name'})
    relName: string;

    @Column({nullable: true})
    mobile: string;
}
