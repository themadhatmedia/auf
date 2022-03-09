import React from "react";
import { View, StyleSheet, Text ,Image } from "react-native";
import AppAvatar from "@src/components/AppAvatar";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import { getAvatar } from "@src/utils";
import { dateRenderer, spanRenderer } from "@src/utils/htmlRender";
import { stripActivityTags } from "@src/utils/buddypress";
import HTML from "react-native-render-html";
import ActivityPrivacyButton from "@src/components/Activity/Privacy/ActivityPrivacyButton";
import CheckImg from "../img/OTDIHH-check.png";

const ActivityHeader = (props) => {


   const {
       user,
       item,
       global,
       colors,
       tagsStyles,
       attemptDeepLink,
       showAvatar,
       style,
       textColor,
       setItemHeight = () => { },
       onChangePrivacy,
       privacyModalVisible,
       contentWrapperStyle,
       avatarSize,
       hidePrivacy,
   } = props;

   const lightText = colors.descLightTextColor;

   let activityContent = item.action;

   //Change the display content of the activity item.
   //(The following codes are examples only and can be safely removed from the component)
   // const status = `<span>(User status: verified)</span>`; //Create html element for displaying verified status
   // activityContent += status;
   //End


   let avatarName = item?.user?.name || "";
   if (item?.user?.id === user?.id) avatarName = user.name; // user is unavailable during guest login

   const showPrivacy =
       !hidePrivacy &&
          item.can_edit &&
       (item.type === "activity_update" || item.type === "activity_comment") &&
       item.component !== "groups";

   const onLayout = ({
       nativeEvent: {
           layout: { height }
       }
   }) => {
       setItemHeight(height);
   };

   const tColor = textColor || colors.textColor;

    console.log(item ,"item")

   return (
       <View style={[global.row, styles.header, style]}>
           {showAvatar && (
               <AppTouchableOpacity onPress={item.authorClick}>
                   <AppAvatar
                       userId={item.user.user_id}
                       size={avatarSize || 40}
                       name={avatarName}
                       source={
                           item.avatarUrl
                               ? { uri: getAvatar(item.avatarUrl, 96) }
                               : require("@src/assets/img/default/default-member-img.png")
                       }
                   />
               </AppTouchableOpacity>
           )}
           <View
               onLayout={onLayout}
               style={[
                   styles.text,
                   { marginLeft: showAvatar ? 10 : 0 },
                   contentWrapperStyle
               ]}
           >
              <View style={{flexDirection:"row",alignItems:"center"}}>
                  {/*<HTML*/}
                  {/*    classesStyles={{ "activity-to": { marginHorizontal: 3 } }}*/}
                  {/*    tagsStyles={{*/}
                  {/*        ...tagsStyles,*/}
                  {/*        rawtext: {*/}
                  {/*            ...global.activityHtmlrawtext,*/}
                  {/*            color: tColor*/}
                  {/*        },*/}
                  {/*        p: { ...global.activityHtmlp, color: tColor },*/}
                  {/*        a: {*/}
                  {/*            ...global.activityHtmla,*/}
                  {/*            color: tColor,*/}
                  {/*            textDecorationLine: "none"*/}
                  {/*        }*/}
                  {/*    }}*/}
                  {/*    baseFontStyle={Object.assign(*/}
                  {/*        {},*/}
                  {/*        global.activityHtml,*/}
                  {/*        textColor ? { color: textColor } : {}*/}
                  {/*    )}*/}
                  {/*    html={item.user.name}*/}
                  {/*    onLinkPress={attemptDeepLink(false)}*/}
                  {/*    renderers={{*/}
                  {/*        a: dateRenderer,*/}
                  {/*        span: spanRenderer*/}
                  {/*    }}*/}
                  {/*/>*/}
                  <Text style={[global.regularText,{fontWeight:700}]}>{item.user.name}</Text>
                  { props.verifyUserData.hasOwnProperty(item.user.id.toString()) ? <Image source={CheckImg} style={{resizeMode:  'contain', marginLeft: 6,width:14,height:14}}/> : null}

              </View>
               <Text style={[global.activityDate, { color: lightText, marginTop: 3 }]}>
                   {item.dateRecorded}
               </Text>
           </View>
           {showPrivacy &&
               !!item.privacy &&
               item.privacy !== "media" && (
                   <ActivityPrivacyButton
                       privacyModalVisible={privacyModalVisible}
                       privacy={item.privacy}
                       onPress={onChangePrivacy}
                       colors={colors}
                       global={global}
                       style={{ width: 18, height: 13 }}
                   />
               )}
       </View>
   );
};

const styles = StyleSheet.create({
   item: {},
   header: {
       alignItems: "flex-start",
       justifyContent: "space-between",
       marginBottom: 11
   },
   text: {
       flex: 1
   }
});

export default ActivityHeader;
