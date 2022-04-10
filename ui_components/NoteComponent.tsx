import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ColorNetwork from '../utils/ColorNetwork';
import TagNetwork from '../utils/TagNetwork';

class NoteComponent extends React.Component<{}, any> {


    constructor(props: any) {
        super(props);
        this.state = {
            note: props as INote,
            tag: {} as ITag,
            colorHex: '#f0f0f0'
        }
        this.getTag();
    }

    getTag() {
        TagNetwork.getTag(this.state.note.tagID).then(value => {
            this.setState({
                tag: value.tag,
            });
            this.loadColor();
        });
    }

    loadColor() {
        ColorNetwork.getColor(this.state.tag.colorID).then(value => {
            value.hexCode ? this.setState({
                colorHex: '#' + value.hexCode,
            }) : null;
        });
    }



    render(): React.ReactNode {

        let styles = StyleSheet.create({
            card: {
                elevation: 20,
                borderRadius: 10,
                padding: 16,
                margin: 8,
                backgroundColor: this.state.colorHex,
                flex: 1
            },
        
            cardTitle: {
                fontSize: 20,
                fontWeight: "600"
            }
        });


        return (
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{this.state.note.title}</Text>
                <Text>{this.state.tag.name}</Text>
                <Text>{this.state.note.description}</Text>
            </View>
        );
    }

}


export default NoteComponent;