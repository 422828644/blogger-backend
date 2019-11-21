import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {EmployeeService} from './employee.service';
import {Employee} from '../entities/employee.entity';

@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService,
    ) {
    }

    @Get()
    root(): string {
        // tslint:disable-next-line:no-console
        console.log(123);
        return this.employeeService.root();
    }

    @Get('findOne/:name')
    async findOne(@Param() params) {
        // tslint:disable-next-line:no-console
        console.log(params.name);
        return this.employeeService.findOne(params.name);
    }

    @Post('create')
    async create(@Body() employee: Employee) {
        return this.employeeService.create(employee)
            .then(res => {
                return 'create employee ...done';
            })
            .catch(err => {
                return err;
            });
    }
}
