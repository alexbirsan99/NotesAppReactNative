import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import ColorNetwork from '../utils/ColorNetwork';
import TagNetwork from '../utils/TagNetwork';

class NoteComponent extends React.Component<{note:INote, onClick?:Function, marginTop?:number}, any> {


    onClick:Function = () => { };


    constructor(props:{note:INote, onClick?:Function, marginTop?:number}) {
        super(props);
        this.state = {
            note: props.note,
            tag: {} as ITag,
            colorHex: '#f0f0f0',
        }
        props.onClick ? this.onClick = props.onClick : null;
        this.getTag();
    }

    public getTag() {
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

            container: {
                flex: 1, 
                flexWrap: 'wrap', 
                margin: 8
            },

            container2: {
                flex: 1, 
                flexWrap: 'wrap', 
                margin: 8,
                marginTop:this.props.marginTop,
                flexShrink: 1
            },

            card: {
                elevation: 20,
                borderRadius: 10,
                backgroundColor: this.state.colorHex,
                width: '100%'
            },

            cardTitle: {
                fontSize: 20,
                fontWeight: "600"
            },

            cardBody: {
                padding: 16
            },

            cardImage: {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: undefined,
                width: '100%',
                resizeMode: 'contain',
                aspectRatio: 1
            }
        });


        return (
            <View style = {styles.container}>
                <View style={styles.card}>
                    <TouchableOpacity onPress={this.onClick}>
                        {
                            this.state.note.image ?
                                <Image
                                    style={styles.cardImage}
                                    source={{
                                        uri: this.state.note.image
                                    }}
                                /> : null
                        }
                        <View style={styles.cardBody}>
                            <Text style={styles.cardTitle}>{this.state.note.title}</Text>
                            <Text>{this.state.tag.name}</Text>
                            <Text>{this.state.note.description}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}


export default NoteComponent;