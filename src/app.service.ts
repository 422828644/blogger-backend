import {Injectable} from '@nestjs/common';
import {exec} from 'child_process';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    gitHubPull() {
        exec('cd ~/soft/', (err, stdout) => {
            console.log(stdout);
        });
        exec('git pull https://github.com/422828644/blogger-backend.git', (error, stdout) => {
            console.log(stdout);
        });
    }

    giteePull() {
        exec('cd ~/front/', ((error, stdout) => {
            console.log(stdout);
        }))
        exec('git pull origin master', ((error, stdout) => {
            console.log(stdout);
        }))
    }
}
