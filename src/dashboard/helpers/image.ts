// @ts-ignore
import defaultAvatar from '../assets/images/avatar.png';

export const getFacebookAvatar = (
    uid?: string,
    height: number = 500,
    width: number = 500,
) => {
    if (uid) {
        return `https://graph.facebook.com/${uid}/picture?height=500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    }

    return defaultAvatar;
};
