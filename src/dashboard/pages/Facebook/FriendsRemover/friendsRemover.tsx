import React from 'react';
import Facebook from '@helpers/facebook';

export default function FriendsRemover() {
    return (
        <button
            onClick={async () => {
                const facebook = await new Facebook().init();
                facebook.getFriends();
            }}
        >
            Scan friends
        </button>
    );
}
