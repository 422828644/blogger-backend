import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Message} from '../../entities/message.entity';
import {Repository} from 'typeorm';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) {
    }

    async create(message: Message) {
        const [message1, count] = await this.messageRepository.findAndCount(message);
        if (count > 0) {
            return fail('重复提交');
        }
        return await this.messageRepository.save(message);
    }

    async update(message: Message) {
        return await this.messageRepository.update(message.id, message);
    }

    async deleteById(id: number) {
        return await this.messageRepository.query(`DELETE FROM message WHERE id = '${id}'`);
    }

    async find(mobile: number) {
        return await this.messageRepository.find({mobile});
    }

    async findAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    }
}
