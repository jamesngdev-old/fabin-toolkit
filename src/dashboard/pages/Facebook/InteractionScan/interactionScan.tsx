import React from 'react';
import Facebook from '@helpers/facebook';

export default function InteractionScan() {
    return (
        <button
            onClick={() => {
                const facebook = new Facebook();
                facebook.init();
            }}
        >
            Click me
        </button>
    );
}
