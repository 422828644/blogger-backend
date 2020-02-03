import {Body, Controller, Delete, Get, Logger, Param, Post, Put} from '@nestjs/common';
import {BaseController} from '../../base.controller';
import {MessageService} from './message.service';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {Message} from '../../entities/message.entity';

@ApiUseTags('留言模块')
@Controller('message')
export class MessageController extends BaseController {
    constructor(
        private readonly messageService: MessageService,
    ) {
        super();
    }

    @Post()
    @ApiOperation({title: '创建留言'})
    async create(@Body() message: Message) {
        message.createId = 1;
        message.createTime = new Date();
        return this.messageService.create(message)
            .then(res => {
                return this.success();
            })
            .catch(err => {
                Logger.debug(err);
                return this.fail(err.message || '创建失败');
            });
    }

    @Delete(':id')
    @ApiOperation({title: '留言删除'})
    async delete(@Param('id') id: number) {
        return this.messageService.deleteById(id)
            .then(res => {
                return this.success('留言删除成功');
            })
            .catch(err => {
                Logger.debug(err);
                return this.fail(err.message || '删除失败');
            });
    }

    @Put()
    @ApiOperation({title: '留言更新'})
    async update(@Body() message: Message) {
        if (!message.id) {
            return this.fail('留言ID不为空');
        }
        return this.messageService.update(message)
            .then(res => {
                return this.success('更新成功', res);
            })
            .catch(err => {
                Logger.debug(err);
                return this.fail(err.message || '更新失败');
            });
    }

    @Get('mobile/:mobile')
    @ApiOperation({title: '留言查询'})
    async find(@Param('mobile') mobile: number) {
        if (!mobile) {
            return this.fail('手机号不为空');
        }
        return this.messageService.find(mobile)
            .then(res => {
                return this.success('查询成功', res);
            })
            .catch(err => {
                return this.fail(err);
            });
    }

    @Get('all')
    @ApiOperation({title: '查询所有消息'})
    async findAll() {
        return this.messageService.findAll()
            .then(res => {
                return this.success('查询成功', res);
            })
            .catch(err => {
                return this.fail(err);
            });
    }
}
