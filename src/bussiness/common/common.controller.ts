import {ApiConsumes, ApiImplicitFile, ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {Controller, Post, UploadedFile, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {BaseController} from '../../base.controller';
import {FileInterceptor} from '@nestjs/platform-express';
import {FileService} from './file.service';

@ApiUseTags('工具模块')
@Controller('common')
export class CommonController extends BaseController {
    constructor(private readonly fileService: FileService,
    ) {
        super();
    }

    @ApiOperation({title: '上传文件'})
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({name: 'file'})
    @Post('file/upload')
    @UseInterceptors(FileInterceptor('file')) // file对应HTML表单的name属性
    async fileUpload(@UploadedFile() file) {
        if (file) {
            return this.fileService.update(file)
                .then(res => {
                    return this.success('上传成功', res);
                })
                .catch(err => {
                    console.error(err);
                    return this.fail(err.message || '上传文件失败');
                })
        } else {
            return this.fail('接收文件失败')
        }
    }

    @ApiOperation({title: '上传文件组'})
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({name: 'file'})
    @Post('file/batchUpload')
    @UseInterceptors(FileInterceptor('files')) // file对应HTML表单的name属性
    async fileBatchUpload(@UploadedFiles() files) {
        if (files && files.length !== 0) {
            return this.fileService.batchUpdate(files)
                .then(res => {
                    return this.success('上传成功', res);
                })
                .catch(err => {
                    console.error(err);
                    return this.fail(err.message || '上传文件失败');
                })
        } else {
            return this.fail('接收文件失败')
        }
    }
}
