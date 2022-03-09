import React from "react";
import {View, Text, TouchableOpacity , Image} from "react-native";
import {getAvatar} from "@src/utils";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import AppAvatar from "@src/components/AppAvatar";
import CheckImg from "../img/OTDIHH-check.png";

// const renderVerified = (author,props) => {
//     if(props.verifyUserData.hasOwnProperty(author.id.toString())){
//         return <Image source={CheckImg} style={{resizeMode:'contain',marginLeft:6,width:14,height:14}}/>
//     }
//
//     return null;
// }

const ItemHeader = props => {
    const {item,
        global,
        formatDateFunc,
        textColor,
        linkColor,
        light,
        alignItems,
        avatarSize,
        titleStyle,
        actionButtons} = props
    let lightStyle = {};
    if (light) lightStyle = {color: "#ffffff"};

    let alignStyle = {};
    if (alignItems) alignStyle = {alignItems: alignItems};
    return (
        <View style={[global.itemHeader, alignStyle]}>
            <View style={[global.itemLeft, {alignItems: "center"}]}>
                <AppTouchableOpacity
                    onPress={item.navigateToProfile ? item.navigateToProfile : () => {}}
                    style={global.avatarWrap}
                >
                    <AppAvatar
                        size={avatarSize}
                        name={item.author.name}
                        source={{
                            uri: getAvatar(item.author.avatar, 96)
                        }}
                    />
                </AppTouchableOpacity>
                {!!item.author.name && (
                    <View style={{flex: 1}}>

                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Text
                                style={[
                                    global.itemName,
                                    lightStyle,
                                    titleStyle
                                ]}
                            >
                                {item.author.name}
                            </Text>
                            {props.verifyUserData.hasOwnProperty(item.author.id.toString())  ? <Image source={CheckImg} style={{resizeMode:'contain',marginLeft:6,width:14,height:14}}/> : null}
                        </View>
                        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                            <Text style={[global.itemMeta, lightStyle]}>
                                {formatDateFunc(item.lastActive)}
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

export default ItemHeader;
