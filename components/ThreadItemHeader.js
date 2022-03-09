import React from "react";
import { Text, View , Image} from "react-native";
import {FontWeights} from "@src/styles/global";
import CheckImg from "../img/OTDIHH-check.png";

const getStatus = (item) => {
   const idWithAdmin = 1;

   if (item.sender_id === 1){
       return "(Admin)"
   }

   return "";
}
const ThreadItemHeader = (props) => {

   const {message, global, thread, item} = props;

   return <View
       style={[
           global.row,
           { justifyContent: "space-between", marginBottom: 2, marginTop: 2 }
       ]}
   >
       <View style={{flexDirection:"row",alignItems:"center"}}>
        <Text style={[global.text, { fontWeight: FontWeights.semiBold }]}>
           {message.name}  
        </Text>
        {props.verifyUserData.hasOwnProperty(item.sender_id.toString())  ? <Image source={CheckImg} style={{resizeMode:'contain',marginLeft:6,width:14,height:14}}/> : null}
       </View>
       

       <Text style={[global.itemLightMeta]}>{message.date}</Text>
   </View>
}

export default ThreadItemHeader;