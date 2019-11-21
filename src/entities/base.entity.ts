import {Column, PrimaryGeneratedColumn} from 'typeorm';

export class BaseEntity {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: bigint;

    @Column({type: 'bigint', default: 1 , name: 'create_id'})
    createId: bigint;

    @Column({type: 'datetime', name: 'create_time'})
    createTime: Date;

    @Column({nullable: true, type: 'bigint', name: 'update_id'})
    updateId: bigint;

    @Column({nullable: true, type: 'datetime', name: 'update_time'})
    updateTime: Date;
}
