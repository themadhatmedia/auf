import React from "react";
import {View, StyleSheet, Text, Image} from "react-native";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import {ItemTitle} from "@src/components/TextComponents";
import Icon from "@src/components//Icon";
import {GUTTER} from "@src/styles/global";
import IconButton from "@src/components/IconButton";
import CheckImg from "../img/OTDIHH-check.png";

const BlogItem = props => {
   const {item, global, colors, actions, index, t} = props;
   console.log(item.author , "itemtiko")
   return (
     <AppTouchableOpacity
         onPress={item.onClick}
         style={[styles.item, index === 0 ? {paddingTop: 0} : {}]}
     >
      <View
        style={[
           global.row,
           {justifyContent: "space-between", flex: 1, alignItems: "flex-start"}
        ]}
      >
      <View style={[styles.imageWrapper]}>
         <Image
             style={[
                styles.imageStyle,
                {borderColor: "rgba(0,0,0,0.08)", borderWidth: 1}
              ]}
              resizeMode="cover"
              source={item.featuredImage}
         />
      </View>

      <View style={[global.bottomBorder, styles.infoContainer]}>
         <ItemTitle
              global={global}
              numberOfLines={2}
              style={[global.itemTitle, {color: colors.headingsColor}]}
         >
            {item.title}
         </ItemTitle>


        <View style={{flexDirection:"row",alignItems:"center"}}>
          <Text style={[global.regularText]}>
              {item.authorName}
           </Text>
          {props.verifyUserData.hasOwnProperty(item.author.toString())  ? <Image source={CheckImg} style={{resizeMode:'contain',marginLeft:6,width:14,height:14}}/> : null}
       </View>


         <View style={{flex: 1}} />
            <View style={[global.row, {alignItems: "center"}]}>
               <Text style={global.textMeta}>{item.date}</Text>
                {item.allowComments && <View style={global.dotSep} />}
                {item.allowComments && (
                 <IconButton
                     icon={require("@src/assets/img/activity-actions/post-comment.png")}
                     tintColor={colors.textIconColor}
                     style={{height: 17, width: 17, marginLeft: -4}}
                     renderText={() => (
                         <Text style={[{marginLeft: 6}, global.activityCount]}>
                             {item.commentCount}
                         </Text>
                     )}
                 />
                )}
            </View>
           </View>
        </View>
      </AppTouchableOpacity>
   );
};

const styles = StyleSheet.create({
  joinButton: {
    marginTop: 2
  },
  item: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: GUTTER
  },
  imageWrapper: {
    height: 120,
    width: 120,
    borderRadius: 14,
    marginBottom: 16
  },
  imageStyle: {
    height: 120,
    width: 120,
    borderRadius: 14,
    overflow: "hidden"
  },
  infoContainer: {
    marginLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    flex: 1
 }
});

export default BlogItem;
