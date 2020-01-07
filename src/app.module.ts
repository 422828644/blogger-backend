import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './bussiness/user/user.module';
import {PassportModule} from '@nestjs/passport';
import {AuthModule} from './bussiness/auth/auth.module';
import {RedisModule} from 'nestjs-redis';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '0.0.0.0',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'nest',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        RedisModule.register({
            url: 'redis://@0.0.0.0:6379',
        }),
        PassportModule.register({defaultStrategy: 'jwt'}),
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
