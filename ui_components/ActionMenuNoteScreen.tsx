import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DefaultColors from "../utils/DefaultColors";

export default class ActionMenuNoteScreen extends React.Component<{}, any> {

    constructor(props: any) {
        super(props);
    }


    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.action}>
                        <Feather name="image" size={24} color="black" />
                        <Text style={styles.actionText}>Change image</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.action, { marginTop: 8 }]}>
                        <Feather name="tag"  size={24} color="black" />
                        <Text style={styles.actionText}>Change tag</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={[styles.actionDelete, { marginTop: 8 }]}>
                        <Feather name="trash-2" size={24} color="white" />
                        <Text style={styles.actionTextDelete}>Delete note</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: DefaultColors.neutralColorLight,
        position: 'absolute',
        right: 20,
        top: 120,
        padding: 12,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
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

    actionDelete: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: DefaultColors.redColorDark,
        color: 'white',
        padding: 11,
        borderRadius: 9
    },


    actionText: {
        marginLeft: 8,
        fontSize: 16
    },

    actionTextDelete: {
        marginLeft: 8,
        fontSize: 16,
        color: 'white'
    }
});