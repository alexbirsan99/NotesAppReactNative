import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import DefaultColors from '../utils/DefaultColors';

export default class FloatingActionButton extends React.Component<{color?:string, onClick?:any, icon?:JSX.Element}, any> {

    onClick = () => {};

    color = DefaultColors.neutralColor;

    icon?:JSX.Element;

    constructor(props: {color?:string, onClick?:any, icon?:JSX.Element}) {
        super(props);
        props.onClick ? this.onClick = props.onClick : null;
        props.color ? this.color = props.color : null;
        this.icon = props.icon;
    }

    render(): React.ReactNode {
        return (
            <TouchableOpacity onPress={this.props.onClick}>
                <View style={[this.styles.button, {backgroundColor: this.color}]}>
                    {this.icon}
                </View>
            </TouchableOpacity>
        );
    }


    styles = StyleSheet.create({

        button: {
            //flex: 1,
            borderRadius: 15,
            padding: 14,
            position: 'absolute',
            bottom: 20,
            right: 40,
        }
    });

}