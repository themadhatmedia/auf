import React, { useMemo , useEffect } from "react";
import { View, StyleSheet, Image , Text, ActivityIndicator } from "react-native";
import axios from "axios";

import AppAvatar from "@src/components/AppAvatar";
import { ItemTitle } from "@src/components/TextComponents";
import Icon from "@src/components/Icon";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import { Settings } from "@src/reducers/config";
import AuthWrapper from "@src/components/AuthWrapper";
import { withSettings } from "@src/components/hocs/withSettings";
import ActionSheetButton from "@src/components/ActionButtons/ActionSheetButton";
import { formatDate, displayUserName } from "@src/utils";
import { GUTTER } from "@src/styles/global";
import CheckImg from "../img/OTDIHH-check.png";

const MemberItem = props => {
    const {
        item,
        global,
        actions,
        index,
        colors,
        settings,
        lastItem,
        groupId,
        locale,
        t,
        showLoader = false,
        rawData
    } = props;

    const userMeta = useMemo(() => {
        if (!!groupId && item.groupJoiningDate) {
            return `${t("members:joined")} ${formatDate(locale)(
                item.groupJoiningDate
            )}`;
        } else if (settings[Settings.ENABLE_MEMBER_TYPE_DISPLAY] && item.type) {
            return item.type;
        } else if (item.nicename) {
            return displayUserName(item.nicename);
        }
    });


    return (
        <AppTouchableOpacity
            onPress={item.onClick}
            style={[styles.item, index === 0 ? { paddingTop: 0 } : {}]}
        >
            <View style={[global.row, styles.itemInner]}>
                <AppAvatar
                    size={64}
                    name={item.fullname}
                    source={{
                        uri: item.avatarUrl
                    }}
                />
                <View
                    style={[global.row, !lastItem && global.bottomBorder, styles.text]}
                >
                    <View style={{ flex: 1 }}>
                        <ItemTitle global={global} style={{ marginBottom: 3, flexDirection:'row'}}>
                            <Text>
                                {item.fullname}
                            </Text>
                            <View style={{marginLeft: 6}}>
                                { props.verifyUserData.hasOwnProperty(item.id.toString()) ? <Image source={CheckImg} style={{resizeMode:  'contain', marginLeft: 6,width:14,height:14}}/> : null}
                            </View>
                        </ItemTitle>
                        {!!userMeta && <Text style={global.itemMeta}>{userMeta}</Text>}

                    </View>
                    {showLoader ? (
                        <ActivityIndicator size={"small"} color={colors.highlightColor} />
                    ) : (
                        <ActionSheetButton
                            headerProps={{
                                id: item.id,
                                title: item.fullname,
                                avatarSource: { uri: item.avatarUrl },
                                onClick: item.onClick
                            }}
                            object={item}
                            actionButtons={actions}
                            global={global}
                            colors={colors}
                            t={t}
                            renderButton={() => (
                                <AuthWrapper actionOnGuestLogin={"hide"}>
                                    <Icon
                                        icon={require("@src/assets/img/horizontal-dots.png")}
                                        tintColor={colors.textIconColor}
                                        styles={{
                                            margin: 5,
                                            height: 16
                                        }}
                                    />
                                </AuthWrapper>
                            )}
                        />
                    )}
                </View>
            </View>

        </AppTouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        paddingHorizontal: GUTTER
    },
    itemInner: {
        flex: 1,
        justifyContent: "space-between"
    },
    text: {
        paddingVertical: 24,
        marginLeft: 14,
        justifyContent: "space-between",
        flex: 1
    },
    buttonsWrap: {}
});

export default withSettings(MemberItem);
