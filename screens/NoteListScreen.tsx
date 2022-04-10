import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import NoteNetwork from '../utils/NoteNetwork';
import NoteComponent from '../ui_components/NoteComponent';


export default class NoteListScreen extends React.Component<{}, any> {

    constructor(props:any) {
        super(props);
        this.getNoteList();
        this.state = {
            notesList: []
        };
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
            <FlatList
                style = {styles.list}
                data= {this.state.notesList}
                renderItem={({item}) => <NoteComponent {...item}/>}
                keyExtractor={item => item.id}
                numColumns={2}
            />
        );
    }

}


const styles = StyleSheet.create({
    list: {
        padding: 16
    }
})