import {Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from '../../entities/user.entity';
import {BaseController} from '../../base.controller';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';

@Controller('user')
@ApiUseTags('用户模块')
export class UserController extends BaseController {
    constructor(
        private readonly userService: UserService,
    ) {
        super();
    }

    @Post()
    @ApiOperation({title: '用户创建'})
    async create(@Body() user: User) {
        user.createId = 1;
        user.createTime = new Date();
        return this.userService.create(user)
            .then(res => {
                return this.success();
            })
            .catch(err => {
                // tslint:disable-next-line:no-console
                Logger.debug(err);
                return this.fail('创建失败');
            });
    }

    @Delete(':id')
    @ApiOperation({title: '用户删除'})
    async delete(@Param('id') id: number) {
        return this.userService.deleteById(id)
            .then(res => {
                return this.success('用户删除成功');
            })
            .catch(err => {
                // tslint:disable-next-line:no-console
                Logger.debug(err);
                return this.fail('删除失败');
            });
    }

    @Put()
    @ApiOperation({title: '用户更新'})
    async update(@Body() user: User) {
        if (!user.id) {
            return this.fail('用户ID不为空');
        }
        return this.userService.update(user)
            .then(res => {
                return this.success('更新成功', res);
            })
            .catch(err => {
                // tslint:disable-next-line:no-console
                Logger.debug(err);
                return this.fail('更新失败');
            });
    }

    @Get(':account')
    @ApiOperation({title: '用户查询'})
    async findOne(@Param('account') account: string) {
        if (!account) {
            return this.fail('帐号不为空');
        }
        return this.userService.findOne(account)
            .then(res => {
                return this.success('查询成功', res);
            })
            .catch(err => {
                return this.fail(err);
            });
    }

    @Get('all')
    @ApiOperation({title: '查询所有用户'})
    async findAll() {
        return this.userService.findAll()
            .then(res => {
                return this.success('查询成功', res);
            })
            .catch(err => {
                return this.fail(err);
            });
    }
}
