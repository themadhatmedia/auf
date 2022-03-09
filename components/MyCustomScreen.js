import React from 'react';
import { View } from 'react-native';
import TopicsScreen from "@src/containers/Custom/TopicsScreen";

const MyCustomScreen = (props) => {

    return (
        <View style={{ flex: 1 }}>
            <TopicsScreen {...props} showSearch={false} hideFilters={true} hideTitle={false} />
        </View>)
}

MyCustomScreen.navigationOptions = {
    header: null
}

export default MyCustomScreen;
