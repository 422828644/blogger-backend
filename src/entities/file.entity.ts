import {Column, Entity} from 'typeorm';
import {BaseEntity} from './base.entity';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class File extends BaseEntity {

    @Column({length: 200})
    @ApiModelProperty({description: '路径'})
    path: string;

    @Column({length: 50})
    @ApiModelProperty({description: '原文件名称'})
    originName: string;

    @Column({length: 80})
    @ApiModelProperty({description: '文件名称'})
    name: string;

    @Column({nullable: true, length: 30})
    @ApiModelProperty({description: '文件类型'})
    type: string;

    @Column({default: false})
    @ApiModelProperty({description: '是否已删除'})
    delete: boolean;
}
