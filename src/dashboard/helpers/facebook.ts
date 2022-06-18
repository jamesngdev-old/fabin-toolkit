import axios from 'axios';

interface UserInfo {
    name: string;
    fb_dtsg: string;
    uid: string;
    gender?: string;
}

class Facebook {
    private cookie: string;
    private userInfo: UserInfo;

    constructor() {}

    async getCookies() {
        return new Promise(resolve => {
            chrome.cookies.getAll(
                {
                    domain: '.facebook.com',
                },
                function (cookies) {
                    this.cookie = cookies.reduce((result, cookie) => {
                        result += cookie.name + ':' + cookie.value + '; ';
                        return result;
                    }, '');
                    resolve(this.cookie);
                },
            );
        });
    }

    async getUserInfo() {
        const profileSource = await axios
            .get('https://m.facebook.com/profile.php')
            .then(res => res.data);

        const uidRegex = /{"ACCOUNT_ID":"([0-9]*)"/gm;
        const nameRegex = /<title>(.*)<\/title>/gm;
        const fbDtsgRegex =
            /input type="hidden" name="fb_dtsg" value="(.*)" autocomplete="off" \/><input t/gm;

        const uid = uidRegex.exec(profileSource)?.[1];
        const name = nameRegex.exec(profileSource)?.[1];
        const fb_dtsg = fbDtsgRegex.exec(profileSource)?.[1];

        return {
            uid,
            name,
            fb_dtsg,
        };
    }

    async init() {
        const cookies = await this.getCookies();
        this.userInfo = await this.getUserInfo();
        console.log(this.userInfo);
    }
}

export default Facebook;
