import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './base.entity';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {

    @Column({unique: true})
    @ApiModelProperty({description: '帐号'})
    account: string;

    @Column()
    @ApiModelProperty({description: '密码'})
    password: string;

    @Column({nullable: true})
    salt: string;

    @Column({nullable: true, name: 'rel_name'})
    @ApiModelProperty({description: '真实姓名'})
    relName: string;

    @Column({nullable: true})
    @ApiModelProperty({description: '手机号'})
    mobile: string;
}
