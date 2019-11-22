import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from '../entities/user.entity';
import {BaseController} from '../base.controller';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';

@Controller('user')
@ApiUseTags('用户模块')
export class UserController extends BaseController {
    constructor(
        private readonly userService: UserService,
    ) {
        super();
    }

    @Post('create')
    @ApiOperation({title: '用户创建'})
    async create(@Body() user: User) {
        return this.userService.create(user)
            .then(res => {
                return this.success();
            })
            .catch(err => {
                return this.fail('创建失败');
            });
    }
}
