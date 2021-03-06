import {Column, Entity} from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';
import {BaseEntity} from './base.entity';

@Entity()
export class Content extends BaseEntity {

    @Column({length: 50, unique: true})
    @ApiModelProperty({description: '代码值'})
    code: string;

    @Column({nullable: true, length: 50, name: 'parent_code'})
    @ApiModelProperty({description: '父代码值'})
    parentCode: string;

    @Column({nullable: true, length: 50})
    @ApiModelProperty({description: '标题'})
    title: string;

    @Column({nullable: true, type: 'text'})
    @ApiModelProperty({description: '内容'})
    content: string;

    @Column({nullable: true, length: 200})
    @ApiModelProperty({description: '图片路径'})
    url: string;

    @Column({type: 'tinyint', default: 0})
    @ApiModelProperty({description: '排序值'})
    sort: number;
}
