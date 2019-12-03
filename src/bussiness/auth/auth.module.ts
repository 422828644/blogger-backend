import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'bearer',
            property: 'profile',
            session: true,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})

export class AuthModule {
}
