import {Column, ColumnType, Entity, Long} from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';
import {BaseEntity} from './base.entity';

@Entity()
export class Message extends BaseEntity {

    @Column({length: 20})
    @ApiModelProperty({description: '姓名'})
    name: string;

    @Column('bigint')
    @ApiModelProperty({description: '手机号码'})
    mobile: number;

    @Column({length: 255})
    @ApiModelProperty({description: '邮箱'})
    mail: string;

    @Column({length: 1000})
    @ApiModelProperty({description: '留言'})
    remark: string;
}
