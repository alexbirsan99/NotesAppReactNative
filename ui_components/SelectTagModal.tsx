import { Feather } from "@expo/vector-icons";
import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DefaultColors from "../utils/DefaultColors";
import TagNetwork from "../utils/TagNetwork";
import MasonryLayout from "./MasonryLayout";
import ColorNetwork from '../utils/ColorNetwork';


export default class SelectTagModal extends React.Component<{ toggleVisibility: Function, selectedTag?:ITag, onSelectTag:any }, any> {

    toggleVisibility: Function;

    onSelectTag:Function;

    constructor(props: { toggleVisibility: Function, selectedTag?:ITag, onSelectTag:any  }) {
        super(props);
        this.toggleVisibility = props.toggleVisibility;
        this.onSelectTag = props.onSelectTag;
        this.state = {
            selectedTag: props.selectedTag,
            selectedTagColor: DefaultColors.neutralColor,
            tags: []
        };
        this.loadTags();
    }

    loadTags() {
        TagNetwork.loadTags().then(result => {
            const tags = result.tags;
            let retrievedTags:{tag:ITag, colorHex:string}[] = [];
            let loadTags = async () => {
                tags.forEach((element:ITag, index:number) => {
                    retrievedTags.push({
                        tag: element,
                        colorHex: DefaultColors.neutralColor
                    });
                    ColorNetwork.getColor(element.colorID).then((color) => {
                        retrievedTags[index].colorHex = `#${color.hexCode}`;
                    });
                });
            };
            loadTags().then(() => {
                this.setState({
                    tags: retrievedTags
                });
            })
        })
    }


    selectTag(tag:ITag, tagColor:string) {
        this.setState({
            selectedTag:tag,
            selectedTagColor: tagColor
        });
    }


    render(): React.ReactNode {
        return (
            <Modal visible={true} transparent={true}>

                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableWithoutFeedback  onPress={() => this.toggleVisibility()}>
                        <View style = {styles.background}></View>
                    </TouchableWithoutFeedback>

                    <View style={styles.container}>
                        <Text style={styles.modalTitle}>Select Tag</Text>
                        <MasonryLayout
                            numColumns={1}
                            data={this.state.tags}
                            keyExtractor={(item: any) => item.tag.id}
                            renderItem={(item: any) =>
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.selectTag(item.tag, item.colorHex)}>
                                    <View style={[styles.tag, this.state.selectedTag.id === item.tag.id ? { backgroundColor: item.colorHex} : {}, { marginTop: 16 }]}>
                                        <Text style={this.state.selectedTag.id === item.tag.id ? styles.selectedTagName : styles.unselectedTagName}>{item.tag.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        />

                        <View style={styles.actionsContainer}>
                            <TouchableOpacity style = {styles.action} onPress = {() => this.toggleVisibility()}>
                                <Text style = {styles.actionText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.action} onPress = {() => {
                                this.onSelectTag(this.state.selectedTag, this.state.selectedTagColor);
                                this.toggleVisibility();
                            }}>
                                <Text style = {[styles.actionText, {color: DefaultColors.confirmColor}]}>Select</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </Modal>
        );
    }

}


const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999999999,
        position: 'absolute'
    },

    container: {
        backgroundColor: 'white',
        height: 400,
        width: 300,
        borderRadius: 15,
        padding: 24,
        zIndex: 999999999
    },
    modalTitle: {
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 20
    },
    tag: {
        backgroundColor: DefaultColors.neutralColor,
        padding: 16,
        borderRadius: 9
    },

    unselectedTagName: {
        textAlign: 'center',
        fontSize: 16
    },

    selectedTagName: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white'
    },


    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }, 

    action: {
        padding: 12,
        marginLeft: 8
    }, 
    
    actionText: {
        fontSize: 16,
        fontWeight: '500'
    }
});

