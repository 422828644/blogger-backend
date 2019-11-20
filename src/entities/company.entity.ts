import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Employee} from './employee.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Employee, employee => employee.company)
    employees: Employee[];
}
