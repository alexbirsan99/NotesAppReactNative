import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import NoteNetwork from '../utils/NoteNetwork';
import NoteComponent from '../ui_components/NoteComponent';
import { SafeAreaView } from 'react-native-safe-area-context';


export default class NoteListScreen extends React.Component<{}, any> {

    navigation: any;

    constructor(props: any) {
        super(props);
        this.navigation = props.navigation;
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
            <SafeAreaView>
                <FlatList
                    style={styles.list}
                    data={this.state.notesList}
                    renderItem={({ item }) =>
                        <NoteComponent {...item} onClick={() => {
                            this.navigation.navigate('AddEditNote', {note: item})
                        }} />
                    }
                    keyExtractor={item => item.id}
                    numColumns={2}
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