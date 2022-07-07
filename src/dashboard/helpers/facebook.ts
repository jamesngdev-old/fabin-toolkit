import axios from 'axios';

export interface FacebookUserInfo {
    name: string;
    fb_dtsg: string;
    uid: string;
    gender?: string;
}

class Facebook {
    private cookie: string;
    private userInfo: FacebookUserInfo;
    private baseURL = 'https://www.facebook.com/api/graphql';

    async init() {
        await this.getUserInfo();
        return this;
    }

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

    async getUserInfo(): Promise<FacebookUserInfo> {
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

        this.userInfo = {
            uid,
            name,
            fb_dtsg,
        };

        return this.userInfo;
    }

    convertObjectToFormData(object: { [key: string]: any }) {
        const formData = new FormData();
        for (const property in object) {
            formData.append(property, object[property]);
        }
        return formData;
    }

    async graphQL(query: { [key: string]: any }) {
        // Convert object to form data
        const formData = this.convertObjectToFormData(query);
        return axios.post(this.baseURL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                origin: 'https://www.facebook.com',
                referer: 'https://www.facebook.com',
            },
        });
    }

    async getFriends() {
        if (!this.userInfo) {
            throw new Error("Can't get user info");
        }
        const { uid, fb_dtsg } = this.userInfo;

        const query = {
            __user: this.userInfo.uid,
            __a: 1,
            dpr: 1,
            fb_dtsg,
            fb_api_caller_class: 'RelayModern',
            fb_api_req_friendly_name:
                'FriendingCometFriendsListPaginationQuery',
            variables: `{ count: 30, cursor: null, name: null, scale: 1 }`,
            doc_id: 4858065864249125,
        };

        const result = await this.graphQL(query);
        console.log(result);
    }
}

export default Facebook;
