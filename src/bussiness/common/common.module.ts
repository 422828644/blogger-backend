import {TypeOrmModule} from '@nestjs/typeorm';
import {File} from '../../entities/file.entity';
import {FileService} from './file.service';
import {CommonController} from './common.controller';
import {Module} from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([File])],
    providers: [FileService],
    controllers: [CommonController],
})
export class CommonModule {
}
