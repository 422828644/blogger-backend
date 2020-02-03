import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Content} from '../../entities/content.entity';

@Injectable()
export class ContentService {
    constructor(
        @InjectRepository(Content)
        private readonly contentRepository: Repository<Content>,
    ) {
    }

    async create(content: Content) {
        const [content1, count] = await this.contentRepository.findAndCount({
            code: content.code,
            parentCode: content.code,
        });
        if (count > 0) {
            throw new Error('重复提交');
        }
        return await this.contentRepository.save(content);
    }

    async deleteById(id: number) {
        return await this.contentRepository.delete({id});
    }

    async update(content: Content) {
        return await this.contentRepository.update(content.id, content);
    }

    async find(code: string) {
        return await this.contentRepository.find({code});
    }

    async findByParentCode(parentCode: string): Promise<Content[]> {
        return await this.contentRepository.find({parentCode})
    }

    async findAll(): Promise<Content[]> {
        return await this.contentRepository.find();
    }
}
