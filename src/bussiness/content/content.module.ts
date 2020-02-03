import {TypeOrmModule} from '@nestjs/typeorm';
import {Content} from '../../entities/content.entity';
import {ContentService} from './content.service';
import {ContentController} from './content.controller';
import {Module} from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([Content])],
    providers: [ContentService],
    controllers: [ContentController],
})
export class ContentModule {
}
