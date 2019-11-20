import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Employee} from '../entities/employee.entity';
import {Repository} from 'typeorm';

@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(Employee)
                private readonly employeeRepository: Repository<Employee>,
    ) {}

    root(): string {
        return 'Hello World!';
    }

    async create(employee: Employee) {
        return this.employeeRepository.save(employee);
    }

    async findOne(name: string): Promise<Employee> {
        return await this.employeeRepository.findOne({name});
    }
}
