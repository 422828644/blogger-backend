import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {BaseController} from './base.controller';
import {UserService} from './bussiness/user/user.service';
import {UserModel} from './model/userModel';

@Controller()
@ApiUseTags('默认')
export class AppController extends BaseController {
    constructor(
        private readonly appService: AppService,
        private readonly userService: UserService,
    ) {
        super();
    }

    @Get()
    @ApiOperation({title: '首页'})
    async getHello() {
        return this.appService.getHello();
    }

    @Post()
    @ApiOperation({title: '登录'})
    async login(@Body() userModel: UserModel) {
        return await this.userService.signIn(userModel)
            .then(res => {
                return this.success('', res);
            })
            .catch(err => {
                return this.fail(err);
            });
    }
}
