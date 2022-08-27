/* eslint-disable */

export const replaceFacebookOriginHeader = () => {
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
            {
                id: 1,
                priority: 1,
                action: {
                    type: 'modifyHeaders',
                    requestHeaders: [
                        {
                            header: 'origin',
                            operation: 'set',
                            value: 'https://www.facebook.com',
                        },
                    ],
                },
                condition: {
                    urlFilter: 'facebook.com',
                    resourceTypes: ['xmlhttprequest'],
                },
            },
        ],
        removeRuleIds: [1],
    });
};
