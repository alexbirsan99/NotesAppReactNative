import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DefaultColors from "../utils/DefaultColors";
import * as ImagePicker from 'expo-image-picker';
import SelectTagModal from "./SelectTagModal";
import NoteNetwork from "../utils/NoteNetwork";

export default class ActionMenuNoteScreen extends React.Component<{ goBack?: Function, onImagePicked: any, selectedTag?: ITag, note: INote, onSelectTag: any, onDeleteNote: Function }, any> {

    onImagePicked: Function = () => { };

    onSelectTag: Function = () => { };

    onDeleteNote: Function;

    note: INote;

    goBack?: Function;

    constructor(props: { goBack?: Function, onImagePicked: any, selectedTag?: ITag, note: INote, onSelectTag: any, onDeleteNote: Function }) {
        super(props);
        this.state = {
            tagModal: false,
            selectedTag: props.selectedTag
        };
        this.note = props.note;
        this.onImagePicked = props.onImagePicked;
        this.onSelectTag = props.onSelectTag;
        this.onDeleteNote = props.onDeleteNote;
        this.goBack = props.goBack;
        this.buildTagModal();
    }


    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7
        });
        if (!result.cancelled) {
            result.base64 = `data:image/webp;base64,` + result.base64;
            this.onImagePicked(result.base64);
        }
    }

    buildTagModal() {
        return (
            <SelectTagModal onSelectTag={this.onSelectTag} toggleVisibility={() => {
                this.setState({
                    tagModal: false
                });
            }} selectedTag={this.state.selectedTag} />
        );
    }


    buildDeleteNotebutton() {
        return (
            <TouchableOpacity onPress={() => {
                NoteNetwork.deleteNote(this.note);
                this.onDeleteNote(this.note);
                this.goBack ? this.goBack() : null;
            }}>
                <View style={[styles.actionDelete, { marginTop: 8 }]}>
                    <Feather name="trash-2" size={24} color="white" />
                    <Text style={styles.actionTextDelete}>Delete note</Text>
                </View>
            </TouchableOpacity>
        );
    }


    render(): React.ReactNode {
        return (
            <View style={styles.container}>

                {this.state.tagModal && this.buildTagModal()}

                <TouchableOpacity onPress={() => {
                    this.pickImage();
                }}>
                    <View style={styles.action}>
                        <Feather name="image" size={24} color="black" />
                        <Text style={styles.actionText}>Change image</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => {
                    this.setState({
                        tagModal: true
                    });
                }}>
                    <View style={[styles.action, { marginTop: 8 }]}>
                        <Feather name="tag" size={24} color="black" />
                        <Text style={styles.actionText}>Change tag</Text>
                    </View>
                </TouchableOpacity>



                {this.note.id && this.buildDeleteNotebutton()}
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