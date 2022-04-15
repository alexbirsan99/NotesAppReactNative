import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import NoteNetwork from '../utils/NoteNetwork';
import NoteComponent from '../ui_components/NoteComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import MasonryLayout from '../ui_components/MasonryLayout';


export default class NoteListScreen extends React.Component<{}, any> {

    navigation: any;

    noteComponents: JSX.Element[] = [];


    constructor(props: any) {
        super(props);
        this.state = {
            notesList: []
        };
        this.navigation = props.navigation;
        this.getNoteList();
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

    /*<FlatList
    style={styles.list}
    data={this.state.notesList}
    renderItem={({ item }) =>
        <NoteComponent {...item} onClick={() => {
            this.navigation.navigate('AddEditNote', {note: item})
        }} />
    }
    keyExtractor={item => item.id}
    numColumns={2}
/>*/


    /*
                    <FlatList
                        style={styles.list}
                        data={this.state.notesList}
                        renderItem={({ item }) => {
                            const newNoteComponent = <NoteComponent marginTop={-60} note = {item}  onClick={() => {
                                this.navigation.navigate('AddEditNote', { note: item })
                            }} />
                            this.noteComponents.push(newNoteComponent);
                            return newNoteComponent;
                        }}
                        keyExtractor={item => item.id}
                        numColumns={2}
                    />
                    */


    render(): React.ReactNode {
        return (
            <SafeAreaView>
                <MasonryLayout
                    data={this.state.notesList}
                    keyExtractor = {(item:any) => item.id}
                    numColumns={2}
                    renderItem={(item: any) => {
                        return (
                            <NoteComponent note={item as INote} onClick={() => {
                                this.navigation.navigate('AddEditNote')
                            }} />
                        )
                    }}
                />
            </SafeAreaView>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#fff'
    },
    list: {
        padding: 16
    }
})