import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DefaultColors from "../utils/DefaultColors";
import * as ImagePicker from 'expo-image-picker';
import SelectTagModal from "./SelectTagModal";

export default class ActionMenuNoteScreen extends React.Component<{ onImagePicked: any, selectedTag?:ITag, onSelectTag:any }, any> {

    onImagePicked: Function = () => { };

    onSelectTag:Function = () => {};

    constructor(props: { onImagePicked: any, selectedTag?:ITag, onSelectTag:any }) {
        super(props);
        this.state = {
            tagModal: false,
            selectedTag: props.selectedTag
        };
        this.onImagePicked = props.onImagePicked;
        this.onSelectTag= props.onSelectTag;
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
        return(
            <SelectTagModal onSelectTag={this.onSelectTag} toggleVisibility={() => {
                this.setState({
                    tagModal: false
                });
            }} selectedTag = {this.state.selectedTag}/>
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