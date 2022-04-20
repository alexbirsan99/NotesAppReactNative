import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import DefaultColors from "../utils/DefaultColors";

export default class ActionMenuNoteScreen extends React.Component<{}, any> {

    constructor(props:any) {
        super(props);
    }


    render(): React.ReactNode {
        return(
            <View style = {styles.container}>
                <View style = {styles.action}>
                    <Feather name="image" style = {styles.actionIcon} size={24} color="black" />
                    <Text style = {styles.actionText}>Change image</Text>
                </View>
                <View style = {[styles.action,{marginTop: 8}]}>
                    <Feather name="tag" style = {styles.actionIcon} size={24} color="black" />
                    <Text style = {styles.actionText}>Change tag</Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: DefaultColors.neutralColorLight,
        position: 'absolute',
        right: 20,
        top: 100,
        padding: 12,
        borderRadius: 15,
        shadowColor:'#000',
        shadowOpacity: 0.3,
        shadowRadius:10,
        zIndex: 9999
    },

    action: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 11,
        borderRadius: 9
    },

    actionIcon: {

    },


    actionText: {
        marginLeft: 8,
        fontSize: 16
    }
});