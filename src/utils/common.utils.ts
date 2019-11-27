export class Utils {
    static getRandomSalt(): string {
        const model = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let salt = '';
        for (let i = 0; i < 6; i++) {
            const c = model[(Math.random() * 36).toFixed()];
            salt = salt + c;
        }
        return salt;
    }
}
