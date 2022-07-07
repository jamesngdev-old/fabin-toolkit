export const replaceFacebookOriginHeader = () => {
    // HTTP origin replacement.
    function getOriginFromUrl(inp: string) {
        try {
            const url = new URL(inp);
            return (
                url.protocol +
                '//' +
                url.hostname +
                (url.port ? ':' + url.port : '')
            );
        } catch (e) {
            return '';
        }
    }

    // for changing origin of requests initiated by the extension background pages
    chrome.webRequest.onBeforeSendHeaders.addListener(
        function (info) {
            if (info.initiator == 'chrome-extension://' + chrome.runtime.id) {
                let originSet = null;
                let refererSet = null;
                for (
                    let index = 0;
                    index < info.requestHeaders.length;
                    index++
                ) {
                    if (
                        info.requestHeaders[index].name.toLowerCase() ===
                        'origin'
                    ) {
                        info.requestHeaders[index].value = getOriginFromUrl(
                            info.url,
                        );
                        originSet = true;
                    }
                    if (
                        info.requestHeaders[index].name.toLowerCase() ===
                        'referer'
                    ) {
                        info.requestHeaders[index].value =
                            getOriginFromUrl(info.url) + '/';
                        refererSet = true;
                    }
                }
                if (!originSet) {
                    info.requestHeaders.push({
                        name: 'Origin',
                        value: getOriginFromUrl(info.url),
                    });
                }
                if (!refererSet) {
                    info.requestHeaders.push({
                        name: 'Referer',
                        value: getOriginFromUrl(info.url) + '/',
                    });
                }
                return { requestHeaders: info.requestHeaders };
            }
        },
        { urls: ['*://*.facebook.com/api/graphql*'] },
        ['blocking', 'requestHeaders'],
    );
};
