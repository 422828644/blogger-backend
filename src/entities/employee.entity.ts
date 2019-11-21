import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Company} from './company.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({nullable: true})
    address: string;

    @Column()
    sex: number;

    @ManyToOne(type => Company, company => company.employees, {cascade: true})
    @JoinTable()
    company: Company;
}
