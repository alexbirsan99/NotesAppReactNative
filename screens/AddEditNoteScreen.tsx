import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActionMenuNoteScreen from '../ui_components/ActionMenuNoteScreen';
import FloatingActionButton from '../ui_components/FloatingActionButton';
import DefaultColors from '../utils/DefaultColors';
import NetworkRequests from '../utils/NetworkRequests';
import NoteNetwork from '../utils/NoteNetwork';

export default class AddEditNoteScreen extends React.Component<{}, any> {

    note: INote = {} as INote;

    tag:ITag = {} as ITag;

    navigation: any;

    noteColorHex?: string;

    callBack?: Function;

    actionMenu?: JSX.Element;

    constructor(props: any) {
        super(props);
        this.navigation = props.navigation;
        this.callBack = props.route.params.callBack;
        props.route.params && props.route.params.note ? this.note = props.route.params.note : this.createEmptyNote();
        props.route.params && props.route.params.tag ? this.tag = props.route.params.tag : this.createEmptyTag();
        props.route.params && props.route.params.noteColorHex ? this.noteColorHex = props.route.params.noteColorHex : null;

        this.state = {
            actionMenuOpened: false
        };

        this.buildActionMenu();
    }

    createEmptyNote() {
        this.note = {
            id: '',
            title: 'New note',
            description: '',
            modifyDate: new Date().toISOString(),
            createDate: new Date().toISOString(),
            image: '',
            tagID: ''
        }
    }

    createEmptyTag() {
        this.tag = {
            id: '',
            colorID: '',
            name: ''
        }
    }

    buildImageView() {
        return (
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri: this.note.image
                    }}
                />
            </View>
        )
    }

    buildActionMenu() {
        this.actionMenu = <ActionMenuNoteScreen />;
    }

    render(): React.ReactNode {
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.topActions}>

                    <View style = {[styles.topActions, {flex: 3}]}>
                        <TouchableOpacity onPress={() => this.navigation.goBack()}>
                            <View style={styles.topActions}>
                                <Feather name="chevron-left" size={33} color="black" />
                                <Text style={[styles.topBarText]}>Notes</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style = {[styles.tagTitleContainer, {flex: 10}]}>
                        <View style={styles.topActions}>
                            <Text style = {styles.tagTitle}>{this.tag.name}</Text>
                        </View>
                    </View>

                    <View style = {[styles.topActions, {flex: 3}]}>
                        <TouchableOpacity style={styles.topActions} onPress={
                            () => {
                                this.setState({
                                    actionMenuOpened: !this.state.actionMenuOpened
                                });
                            }
                        }>
                            <MaterialCommunityIcons name="dots-horizontal" size={33} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>



                {this.note.image ? this.buildImageView() : null}
                {this.state.actionMenuOpened && this.actionMenu}



                <View style={styles.screenContent}>
                    <TextInput onChangeText={(text) => this.note.title = text} style={[styles.title, { color: this.noteColorHex }]}>{this.note.title}</TextInput>
                    <TextInput onChangeText={(text) => this.note.description = text} style={[styles.body, { color: this.noteColorHex }]} multiline={true} placeholder="Note description...">{this.note.description}</TextInput>
                </View>


                <FloatingActionButton
                    onClick={() => {
                        if (this.note.id) {
                            NoteNetwork.updateNote(this.note);
                        } else {
                            this.note.image = '';
                            NoteNetwork.insertNote(this.note);
                        }
                        this.callBack ? this.callBack(this.note) : null;
                        this.navigation.goBack();
                    }}
                    icon={<Feather name="edit-3" size={24} color="white" />}
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


    topActions: {
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },

    topRightActionPosition: {
        position: 'absolute',
        right: 32
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
    },

    imageContainer: {
        padding: 16,
        width: '100%',
        aspectRatio: 2,
    },

    image: {
        height: '100%',
        borderRadius: 20
    },

    tagTitleContainer: {
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },

    tagTitle: {
        flex: 1,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 18
    }
});