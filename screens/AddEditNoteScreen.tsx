import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class AddEditNoteScreen extends React.Component {

    note: INote = {} as INote;

    navigation:any;

    constructor(props: any) {
        super(props);
        this.note = props.route.params.note;
        this.navigation = props.navigation;
    }

    render(): React.ReactNode {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => this.navigation.goBack()}>
                    <View style={styles.topBar}>
                        <Feather name="chevron-left" size={33} color="black" />
                        <Text style={styles.topBarText}>Notes List</Text>
                    </View>
                </TouchableOpacity>


                <View style={styles.screenContent}>
                    <TextInput style={styles.title}>{this.note.title}</TextInput>
                    <TextInput style={styles.body} multiline={true}>{this.note.description}</TextInput>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column'
    },


    topBar: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },

    topBarText: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: '600'
    },

    screenContent: {
        flex: 50,
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'column'
    },

    title: {
        flex: 10,
        fontSize: 36,
        fontWeight: '700'
    },

    body: {
        flex: 100,
        marginTop: 16,
        fontSize: 20,
        textAlignVertical: 'top',
        paddingTop: 0,
        paddingBottom: 0
    }
});