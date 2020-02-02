import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {File} from '../../entities/file.entity'
import {Repository} from 'typeorm';
import {join} from 'path';
import {createWriteStream} from 'fs';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
    ) {
    }

    async update(file) {
        const fileName = `${Date.now()}.jpg`;
        const writeImage = createWriteStream(join('/root', 'file', fileName));
        writeImage.write(file.buffer);
        const fileBean = new File();
        fileBean.originName = file.originalname;
        fileBean.name = fileName;
        fileBean.path = '/root/file/' + fileName;
        fileBean.createId = 1;
        fileBean.createTime = new Date();
        Logger.log(fileBean);
        this.fileRepository.save(fileBean);
        return fileBean;
    }

    async batchUpdate(files) {
        const result = [];
        for (const file of files) {
            await this.update(file).then(res => {
                result.push(res)
            });
        }
        return result;
    }
}
