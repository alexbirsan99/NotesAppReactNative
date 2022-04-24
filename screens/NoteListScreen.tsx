import { StatusBar } from 'expo-status-bar';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import NoteNetwork from '../utils/NoteNetwork';
import NoteComponent from '../ui_components/NoteComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import MasonryLayout from '../ui_components/MasonryLayout';
import FloatingActionButton from '../ui_components/FloatingActionButton';
import DefaultColors from '../utils/DefaultColors';
import Entypo from '@expo/vector-icons/build/Entypo';


export default class NoteListScreen extends React.Component<{}, any> {

    navigation: any;

    screenTitle: string;


    constructor(props: any) {
        super(props);
        this.state = {
            notesList: []
        };
        this.navigation = props.navigation;
        this.getNoteList();
        this.screenTitle = "Noteifyou"
    }

    getNoteList = () => {
        NoteNetwork.getNotes().then((value) => {
            if (value.statusCode === 200) {
                //setNotesList(value.notes as any);
                this.setState({
                    notesList: value.notes
                });
            }
        });
    }


    render(): React.ReactNode {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <Text style={styles.title}>{this.screenTitle}</Text>


                    <MasonryLayout
                        data={this.state.notesList}
                        keyExtractor={(item: any) => item.id}
                        numColumns={2}
                        renderItem={(item: any, index:number) => {
                            return (
                                <NoteComponent note={item as INote} onClick={(args:any) => {
                                    console.log(args);
                                    this.navigation.navigate('AddEditNote', {
                                        note: item,
                                        tag: args.tag,
                                        noteColorHex: args.colorHex,
                                        deleteCallBack: (deletedNote:any) => {
                                            this.setState({
                                                notesList: this.state.notesList.filter((element:INote) =>  element.id !== deletedNote.id)
                                            })
                                        },
                                        updateAddCallBack: (updatedNote:any) => {
                                            let updatedNoteList = [...this.state.notesList];
                                            updatedNoteList[index] = updatedNote as INote;
                                            this.setState({
                                                notesList: updatedNoteList
                                            });
                                        }
                                    })
                                }} />
                            )
                        }}
                    />
                </ScrollView>

                <FloatingActionButton
                    onClick={() => {
                        this.navigation.navigate('AddEditNote', {
                            updateAddCallBack: (note:INote) => {
                                this.setState({
                                    notesList: this.state.notesList.push(note)
                                })
                            }
                        })
                    }}
                    icon={<Entypo name="plus" size={24} color={'white'} />}
                    color={DefaultColors.confirmColor}
                />
            </SafeAreaView>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    list: {
        padding: 16
    },
    title: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        fontSize: 30,
        fontWeight: '700'
    }
})