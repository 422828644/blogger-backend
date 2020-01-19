import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './bussiness/user/user.module';
import {PassportModule} from '@nestjs/passport';
import {AuthModule} from './bussiness/auth/auth.module';
import {RedisModule} from 'nestjs-redis';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MessageModule} from './bussiness/message/message.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'nest',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        RedisModule.register({
            url: 'redis://@127.0.0.1:6379',
        }),
        PassportModule.register({defaultStrategy: 'jwt'}),
        UserModule,
        AuthModule,
        MessageModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
