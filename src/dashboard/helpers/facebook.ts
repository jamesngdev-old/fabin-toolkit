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
    }

    async init() {
        const cookies = await this.getCookies();
        await this.getUserInfo();
        console.log({ cookies });
    }
}

export default Facebook;
