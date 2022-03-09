import React from "react";
import {View, StyleSheet, Text , Image} from "react-native";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import {withSettings} from "@src/components/hocs/withSettings";
import {formatDate} from "@src/utils";
import {GUTTER} from "@src/styles/global";
import {RichHtmlText} from "@src/utils/htmlRender";
import {AvatarIcon, MessagesAvatars} from "@src/components/Messages/MessageSingle"; //Get avatar components from BuddyBoss app code. You can also create your own component to use
import CheckImg from "../img/OTDIHH-check.png";

const dotSize = 10;
const dotGap = 8;

const MessageSingle = props => {
   const {item, index, global, colors, t, toThread ,verifyUserData} = props;
   let lastRecipientID = item.recipients[Object.keys(item.recipients)[Object.keys(item.recipients).length - 1]].user_id;
   console.log(item.recipients , "item.recipients")
   console.log(lastRecipientID , "lastRecipientID")
   console.log(verifyUserData,"verifyUserData")
   return (
     <AppTouchableOpacity
       onPress={toThread(item)}
       style={[styles.item, index === 0 ? {paddingTop: 0} : {}]}
     >
       <View style={[global.row, styles.itemInner]}>
         <View
           style={[
             global.row,
             {
               justifyContent: "space-between",
               flex: 1,
               paddingLeft: item.unread ? GUTTER - dotSize : GUTTER + dotGap
             }
           ]}
         >
         {item.unread && (
           <View style={[styles.dot, {backgroundColor: colors.linkColor}]} />
         )}
         <MessagesAvatars
              item={item}
              global={global}
              circleColor={colors.bodyFrontBg}
           />
           <View style={[styles.text, global.bottomBorder]}>
             <View
               style={[
                 global.row,
                 {
                   marginBottom: 3,
                   justifyContent: "space-between",
                   alignItems: "flex-start"
                 }
               ]}
             >
             <View style={{flex: 1,flexDirection:"row",alignItems:"center"}}>
               <RichHtmlText
                 colors={colors}
                 numberOfLines={1}
                 richText={item.title}
                 style={global.itemAuthorName}
               />
               <View style={{marginLeft: 6,alignSelf:"center"}}>
                  {props.verifyUserData.hasOwnProperty(lastRecipientID.toString())  ? <Image source={CheckImg} style={{resizeMode:'contain',marginLeft:-3,width:14,height:14}}/> : null}
              </View>
             </View>
              
             <Text style={[global.itemLightMeta]}>{item.date}</Text>
           </View>
            <View style={[global.row]}>
            <Text
              style={[
                global.messageExcerpt,
                {flex: 1},
                item.unread ? {color: colors.textColor} : {}
              ]}
            >
            <Text>{`${item.lastSenderName}`}</Text>
              {item.excerpt}
            </Text>
           </View>
         </View>
       </View>
     </View>
   </AppTouchableOpacity>
 );
};

const styles = StyleSheet.create({
 item: {
   flex: 1,
   paddingRight: GUTTER
 },
 itemInner: {
   flex: 1,
   justifyContent: "space-between"
 },
 text: {
   paddingTop: 15,
   paddingBottom: 15,
   marginLeft: 12,
   flex: 1
 },
 dot: {
   marginRight: dotGap,
   borderRadius: 5,
   width: dotSize,
   height: dotSize
 }
});
export default withSettings(MessageSingle);