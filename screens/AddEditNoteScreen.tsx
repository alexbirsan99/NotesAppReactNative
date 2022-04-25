import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActionMenuNoteScreen from '../ui_components/ActionMenuNoteScreen';
import FloatingActionButton from '../ui_components/FloatingActionButton';
import DefaultColors from '../utils/DefaultColors';
import NetworkRequests from '../utils/NetworkRequests';
import NoteNetwork from '../utils/NoteNetwork';


import ImageView from 'react-native-image-viewing';
import SelectTagModal from '../ui_components/SelectTagModal';

export default class AddEditNoteScreen extends React.Component<{}, any> {

    note = {} as INote;

    navigation: any;

    updateAddCallBack?: Function;

    deleteCallBack:Function;

    constructor(props: any) {
        super(props);
        this.navigation = props.navigation;
        this.updateAddCallBack = props.route.params.updateAddCallBack;
        this.deleteCallBack = props.route.params.deleteCallBack;

        props.route.params && props.route.params.note ? this.note = props.route.params.note : this.note = this.createEmptyNote();

        this.state = {
            actionMenuOpened: false,
            imageViewerOpened: false,
            noteImage: this.note.image,
            tag: props.route.params && props.route.params.tag ? props.route.params.tag : this.createEmptyTag(),
            tagColor: props.route.params && props.route.params.noteColorHex ? props.route.params.noteColorHex : null
        };

        this.buildActionMenu();
    }

    createEmptyNote(): INote {
        return {
            id: null as unknown as string,
            title: 'New note',
            description: '',
            modifyDate: new Date().toISOString(),
            createDate: new Date().toISOString(),
            image: '',
            tagID: ''
        }
    }

    createEmptyTag(): ITag {
        return (
            {
                id: '',
                colorID: '',
                name: ''
            }
        );
    }

    buildImageView() {
        return (
            <TouchableOpacity onPress={() => this.setState({ imageViewerOpened: true })}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: this.state.noteImage
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    buildActionMenu() {
        return (
            <ActionMenuNoteScreen
                note={this.note}
                selectedTag={this.state.tag}
                onSelectTag={
                    (selectedTag: ITag, tagColor: string) => {
                        this.setState({
                            tag: selectedTag,
                            tagColor: tagColor,
                            actionMenuOpened: false
                        });
                    }
                }
                onImagePicked={(image: string) => {
                    this.setState({
                        noteImage: image,
                        actionMenuOpened: false
                    });
                    this.note.image = image;
                }} 
                onDeleteNote = {
                    this.deleteCallBack
                }
                goBack = {this.navigation.goBack}
            />
        );
    }

    buildImageViewer() {
        return (
            <ImageView
                images={[{ uri: this.state.noteImage }]}
                imageIndex={0}
                visible={this.state.imageViewerOpened === true}
                onRequestClose={() => this.setState({ imageViewerOpened: false })}
            />
        );
    }

    render(): React.ReactNode {
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.topActions}>

                    <View style={[styles.topActions, { flex: 3 }]}>
                        <TouchableOpacity onPress={() => this.navigation.goBack()}>
                            <View style={styles.topActions}>
                                <Feather name="chevron-left" size={33} color="black" />
                                <Text style={[styles.topBarText]}>Notes</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.tagTitleContainer, { flex: 10 }]}>
                        <View style={styles.topActions}>
                            <Text style={styles.tagTitle}>{this.state.tag.name}</Text>
                        </View>
                    </View>

                    <View style={[styles.topActions, { flex: 3 }]}>
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
                {this.state.actionMenuOpened && this.buildActionMenu()}



                <View style={styles.screenContent}>
                    <TextInput onChangeText={(text) => this.note.title = text} style={[styles.title, { color: this.state.tagColor }]}>{this.note.title}</TextInput>
                    <TextInput onChangeText={(text) => this.note.description = text} style={[styles.body, { color: this.state.tagColor}]} multiline={true} placeholder="Note description...">{this.note.description}</TextInput>
                </View>


                <FloatingActionButton
                    onClick={() => {
                        if (this.note.id) {
                            NoteNetwork.updateNote(this.note);
                        } else {
                            this.note.image = '';
                            NoteNetwork.insertNote(this.note);
                        }
                        this.updateAddCallBack ? this.updateAddCallBack(this.note) : null;
                        this.navigation.goBack();
                    }}
                    icon={<Feather name="edit-3" size={24} color="white" />}
                    color={this.state.tagColor}
                />


                {this.buildImageViewer()}
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