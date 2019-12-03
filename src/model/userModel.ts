import {IsNotEmpty, Length} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class UserModel {
    readonly id: number;
    @ApiModelProperty({description: '帐号'})
    @IsNotEmpty({message: '帐号不能为空'})
    readonly account: string;
    @ApiModelProperty({description: '密码'})
    @IsNotEmpty({message: '密码不能为空'})
    @Length(6, 20, {message: '密码长度为6~20'})
    readonly password: string;

    token: string;
}
