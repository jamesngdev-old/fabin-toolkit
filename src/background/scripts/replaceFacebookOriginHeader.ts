export const replaceFacebookOriginHeader = () => {
    chrome.declarativeNetRequest
        .updateDynamicRules({
            addRules: [
                {
                    id: 1,
                    priority: 1,
                    action: {
                        // @ts-ignore
                        type: 'modifyHeaders',
                        requestHeaders: [
                            {
                                header: 'origin',
                                // @ts-ignore
                                operation: 'set',
                                value: 'https://www.facebook.com',
                            },
                        ],
                    },
                    condition: {
                        urlFilter: 'facebook.com',
                        // @ts-ignore
                        resourceTypes: ['xmlhttprequest'],
                    },
                },
            ],
            removeRuleIds: [1],
        })
        .then(() => {});
};
