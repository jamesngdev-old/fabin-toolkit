import { clickToOpenTab } from './scripts/clickToOpenTab';
import { replaceFacebookOriginHeader } from './scripts/replaceFacebookOriginHeader';

(async () => {
    clickToOpenTab();
    replaceFacebookOriginHeader();
})();
