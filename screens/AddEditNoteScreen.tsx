import { AntDesign, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatingActionButton from '../ui_components/FloatingActionButton';
import DefaultColors from '../utils/DefaultColors';
import NoteNetwork from '../utils/NoteNetwork';

export default class AddEditNoteScreen extends React.Component {

    note: INote = {} as INote;

    navigation:any;

    noteColorHex?:string;

    constructor(props: any) {
        super(props);
        props.route.params && props.route.params.note? this.note = props.route.params.note : this.createEmptyNote();
        this.navigation = props.navigation;
        props.route.params && props.route.params.noteColorHex ? this.noteColorHex = props.route.params.noteColorHex : null;
    }

    createEmptyNote() {
        this.note  = {
            id: '',
            title: 'New note',
            description: '',
            modifyDate: new Date().toISOString(),
            createDate: new Date().toISOString(),
            image: '',
            tagID: ''
        }
    }

    render(): React.ReactNode {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => this.navigation.goBack()}>
                    <View style={styles.topBar}>
                        <Feather name="chevron-left" size={33} color="black" />
                        <Text style={[styles.topBarText]}>Notes List</Text>
                    </View>
                </TouchableOpacity>


                <View style={styles.screenContent}>
                    <TextInput onChangeText={(text) => this.note.title = text} style={[styles.title, {color: this.noteColorHex}]}>{this.note.title}</TextInput>
                    <TextInput onChangeText={(text) => this.note.description = text} style={[styles.body, {color: this.noteColorHex}]} multiline={true} placeholder = "Note description...">{this.note.description}</TextInput>
                </View>


                <FloatingActionButton
                    onClick={() => {
                        if(this.note.id) {

                        } else {
                            this.note.image = '';
                            NoteNetwork.insertNote(this.note);
                        }
                    }}
                    icon = {<FontAwesome5 name="edit" size={24} color='white' />}
                    color={'black'}
                />
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