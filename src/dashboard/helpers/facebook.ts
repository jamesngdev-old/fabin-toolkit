import axios from 'axios';
import { sleep } from '@helpers/sleep';

export interface FacebookUserInfo {
    name: string;
    fb_dtsg: string;
    uid: string;
    gender?: string;
}

export enum Gender {
    FEMALE = 'FEMALE',
    MALE = 'MALE',
    UNKNOWN = 'UNKNOWN',
}

export interface FriendInfo {
    friendship_status?: string;
    gender?: Gender;
    id?: string;
    name?: string;
    profile_picture?: {
        uri?: string;
    };
    short_name?: string;
    social_context?: { text?: string };
    text?: string;
    subscribe_status?: string;
    url?: string;
}

class Facebook {
    private cookie: string;
    private userInfo: FacebookUserInfo;
    private baseURL = 'https://www.facebook.com/api/graphql';
    private friends: FriendInfo[] = [];
    private LOCAL_STORAGE_KEY_NAME = {
        FRIENDS: 'FRIENDS_',
    };

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
            },
        });
    }

    async getFriends(isLocal: boolean = true): Promise<{
        createdAt?: number;
        data: FriendInfo[];
    }> {
        if (!this.userInfo) {
            throw new Error("Can't get user info");
        }
        const { uid, fb_dtsg } = this.userInfo;

        if (isLocal) {
            const localFriendsJson = localStorage.getItem(
                this.LOCAL_STORAGE_KEY_NAME.FRIENDS + uid,
            );

            if (localFriendsJson && localFriendsJson !== '') {
                this.friends = JSON.parse(localFriendsJson);
                return this.friends as any;
            }
        }

        let query = {
            __user: uid,
            __a: 1,
            dpr: 1,
            fb_dtsg,
            fb_api_caller_class: 'RelayModern',
            fb_api_req_friendly_name:
                'FriendingCometFriendsListPaginationQuery',
            variables: `{ count: 30, cursor: null, name: null, scale: 1 }`,
            doc_id: 4858065864249125,
        };

        while (true) {
            const response = await this.graphQL(query);
            const allFriends = response?.data?.data?.viewer?.all_friends;
            const { edges = [], page_info } = allFriends;

            if (!page_info?.has_next_page) {
                break;
            } else {
                query.variables = `{ count: 30, cursor: '${page_info?.end_cursor}', name: null, scale: 1 }`;
                await sleep(2 * 1000);
            }

            for (const edge of edges) {
                if (edge?.node) {
                    this.friends.push(edge.node);
                }
            }
        }

        localStorage.setItem(
            this.LOCAL_STORAGE_KEY_NAME.FRIENDS + uid,
            JSON.stringify({
                data: this.friends,
                createdAt: new Date().getTime(),
            }),
        );

        return {
            data: this.friends,
            createdAt: new Date().getTime(),
        };
    }
}

export default Facebook;
