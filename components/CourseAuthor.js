import React from 'react';
import { View, Text , Image } from 'react-native';
import AppAvatar from "@src/components/AppAvatar";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import { getBestImageVariant } from "@src/utils/CCDataUtil";
import { withUserClickHandler } from "@src/components/hocs/withUserClickHandler";
import CheckImg from "../img/OTDIHH-check.png"; //Use BuddyBoss HOC for easier navigation

const CourseAuthor = (props) => {

    const { user, global, lightStyle, toUserBasedOnSettings } = props;

    const boundCallback = React.useMemo(
        () => toUserBasedOnSettings.bind(null, null, user),
        [user]
    );

    const userAvatarUrl = React.useMemo(
        () =>
            !!user
                ? user.avatar_urls
                ? getBestImageVariant(user.avatar_urls, 96)
                : user?.avatar?.thumb
                : "",
        [user]
    );

    return <View style={[global.row]}>
        <AppTouchableOpacity onPress={boundCallback}>
            <View>
                {user && (
                    <AppAvatar
                        size={26}
                        name={user.name}
                        source={{
                            uri: userAvatarUrl
                        }}
                    />
                )}
            </View>
        </AppTouchableOpacity>
        <View style={{ marginLeft: 8 }}>
            {user && (

                <>
                    <Text
                        style={[
                            global.itemAuthorName,
                            { marginBottom: 1},
                            lightStyle ? { color: "white" } : {}
                        ]}
                    >
                        {user?.name}

                        <View>
                            {props.verifyUserData.hasOwnProperty(user.id.toString()) ? <Image source={CheckImg} style={{resizeMode:  'contain', marginLeft: 6,width:14,height:14}}/> : null}
                        </View>
                    </Text>
                </>

            )}
        </View>
    </View>
}

export default withUserClickHandler(CourseAuthor);
