import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import ColorNetwork from '../utils/ColorNetwork';
import DefaultColors from '../utils/DefaultColors';
import TagNetwork from '../utils/TagNetwork';

class NoteComponent extends React.Component<{note:INote, onClick?:any, marginTop?:number}, any> {


    onClick:any = () => { };


    constructor(props:{note:INote, onClick?:any, marginTop?:number}) {
        super(props);
        this.state = {
            note: props.note,
            tag: {} as ITag,
            colorHex: DefaultColors.neutralColor,
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


        return (
            <View style = {this.styles.container}>
                <View style={[this.styles.card, {backgroundColor: this.state.colorHex}]}>
                    <TouchableOpacity onPress={() => this.onClick(this.state.colorHex)}>
                        {
                            this.state.note.image ?
                                <Image
                                    style={this.styles.cardImage}
                                    source={{
                                        uri: this.state.note.image
                                    }}
                                /> : null
                        }
                        <View style={this.styles.cardBody}>
                            <Text style={this.styles.cardTitle}>{this.state.note.title}</Text>
                            <Text>{this.state.tag.name}</Text>
                            <Text>{this.state.note.description}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    styles = StyleSheet.create({

        container: {
            flex: 1, 
            flexWrap: 'wrap', 
            paddingTop:8,
            paddingBottom:8,
            paddingLeft:16,
            paddingRight:16
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

}


export default NoteComponent;