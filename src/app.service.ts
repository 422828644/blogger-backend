import {Injectable} from '@nestjs/common';
import {exec} from 'child_process';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    gitPull() {
        exec('cd ~/soft/', (err, stdout) => {
            console.log(stdout);
            console.log('git success');
        });
        exec('git pull https://github.com/422828644/blogger-backend.git', (error, stdout) => {
            console.log(stdout);
        });
    }
}
