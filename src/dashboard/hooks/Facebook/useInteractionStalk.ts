import Facebook, {
    FacebookUserInfo,
    InteractionMapValue,
} from '@helpers/facebook';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { message } from 'antd';

const facebook = new Facebook();

export default function useInteractionStalk() {
    const [stalkUser, setStalkUser] = useState<FacebookUserInfo>();
    const [dateRange, setDateRange] = useState<RangePickerProps['value']>([
        moment().subtract(6, 'month'),
        moment(),
    ]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFetchingTargetProfile, setIsFetchingTargetProfile] =
        useState<boolean>(false);
    const [interactors, setInteractors] = useState<InteractionMapValue[]>([]);
    //
    // useEffect(() => {
    //     facebook.init();
    // }, []);

    const onChangeProfile = useCallback(
        async (event: any) => {
            setIsFetchingTargetProfile(true);
            facebook
                .getUserInfoByUrl(event.target.value)
                .then(info => {
                    setStalkUser(info);
                })
                .catch(() => {
                    message.warn(
                        'Sorry ! Get trouble when get target user info',
                    );
                })
                .finally(() => {
                    setIsFetchingTargetProfile(false);
                });
        },
        [setStalkUser],
    );

    const onStartStalk = useCallback(async () => {
        setIsLoading(true);
        await facebook.init();
        const [startDate, endDate] = dateRange;

        facebook
            .getInteractions(
                stalkUser.uid,
                startDate.toDate().getTime(),
                endDate.toDate().getTime(),
            )
            .then(interactionMap => {
                setInteractors(Array.from(interactionMap.values()));
                setIsLoading(false);
            });
    }, [stalkUser, dateRange, setIsLoading, setInteractors]);

    const onChangeDate = useCallback(
        (value: RangePickerProps['value']) => {
            setDateRange(value);
        },
        [setDateRange],
    );

    const topReactors = useMemo(
        () =>
            interactors
                .sort((a, b) => b.interaction.reaction - a.interaction.reaction)
                .slice(0, 10)
                .filter(item => item.interaction.reaction > 0),
        [interactors],
    );

    const topCommentors = useMemo(
        () =>
            interactors
                .sort((a, b) => b.interaction.comment - a.interaction.comment)
                .slice(0, 10)
                .filter(item => item.interaction.comment > 0),
        [interactors],
    );

    return {
        isLoading,
        isFetchingTargetProfile,
        onChangeProfile,
        stalkUser,
        dateRange,
        onStartStalk,
        onChangeDate,
        interactors,
        topReactors,
        topCommentors,
    };
}
