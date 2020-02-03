import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, Logger, Param, Post, Put} from '@nestjs/common';
import {BaseController} from '../../base.controller';
import {ContentService} from './content.service';
import {Content} from '../../entities/content.entity';

@ApiUseTags('内容模块')
@Controller('content')
export class ContentController extends BaseController {
    constructor(
        private readonly contentService: ContentService,
    ) {
        super();
    }

    @Post()
    @ApiOperation({title: '创建内容'})
    async create(@Body() content: Content) {
        content.createId = 1;
        content.createTime = new Date();
        return this.contentService.create(content)
            .then(res => {
                return this.success();
            })
            .catch(err => {
                Logger.debug(err);
                return this.fail(err.message || '创建失败');
            })
    }

    @Delete(':id')
    @ApiOperation({title: '内容删除'})
    async delete(@Param('id') id: number) {
        return this.contentService.deleteById(id)
            .then(res => {
                return this.success('内容删除成功')
            })
            .catch(err => {
                Logger.debug(err);
                return this.fail(err.message || '删除内容')
            });
    }

    @Put()
    @ApiOperation({title: '内容更新'})
    async update(@Body() content: Content) {
        if (!content.id) {
            return this.fail('内容ID不为空');
        }
        return this.contentService.update(content)
            .then(res => {
                return this.success('更新成功', res);
            })
            .catch(err => {
                Logger.debug(err);
                return this.fail(err.message || '更新失败');
            })
    }

    @Get('code/:code')
    @ApiOperation({title: '内容查询'})
    async find(@Param('code') code: string) {
        if (!code) {
            return this.fail('代码值不能为空');
        }
        return this.contentService.find(code)
            .then(res => {
                return this.success('查询成功', res);
            })
            .catch(err => {
                return this.fail(err);
            });
    }

    @Get('parentCode/:parentCode')
    @ApiOperation({title: '根据父代码值查询内容'})
    async findByParentCode(@Param('parentCode') parentCode: string) {
        Logger.log('[根据父代码值查询内容]:' + parentCode + '(parentCode)');
        if (!parentCode) {
            return this.fail('父代码值不能为空');
        }
        return this.contentService.findByParentCode(parentCode)
            .then(res => {
                return this.success('查询成功', res);
            })
            .catch(err => {
                return this.fail(err);
            });
    }

    @Get('all')
    @ApiOperation({title: '查询所有内容'})
    async findAll() {
        return this.contentService.findAll()
            .then(res => {
                return this.success('查询成功', res);
            })
            .catch(err => {
                return this.fail(err);
            });
    }
}
