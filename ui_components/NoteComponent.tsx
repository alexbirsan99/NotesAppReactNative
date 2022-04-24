import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import ColorNetwork from '../utils/ColorNetwork';
import DefaultColors from '../utils/DefaultColors';
import TagNetwork from '../utils/TagNetwork';

class NoteComponent extends React.Component<{ note: INote, onClick?: any, marginTop?: number}, any> {


    onClick: any = () => { };



    constructor(props: { note: INote, onClick?: any, marginTop?: number}) {
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
            <View style={this.styles.container}>
                <View style={[this.styles.card, { backgroundColor: this.state.colorHex }]}>
                    <TouchableOpacity onPress={() => this.onClick({ colorHex: this.state.tag.id ? this.state.colorHex : DefaultColors.blackColor, tag: this.state.tag})}>
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
                            <Text style={[this.styles.cardTitle, {color: this.state.tag.id ? 'white' : 'black'}]}>{this.state.note.title}</Text>
                            {this.state.note.description? <Text style = {[this.styles.cardDescription, {color: this.state.tag.id ? 'white' : 'black'}]}>{this.state.note.description}</Text> : null}
                        </View>

                        {this.state.tag.id? <View style={[this.styles.tag]}>
                            <Text style = {[this.styles.tagText]}>{this.state.tag.name}</Text>
                        </View>: null}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    styles = StyleSheet.create({

        container: {
            flex: 1,
            flexWrap: 'wrap',
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16,
            paddingRight: 16
        },

        container2: {
            flex: 1,
            flexWrap: 'wrap',
            margin: 8,
            marginTop: this.props.marginTop,
            flexShrink: 1
        },

        card: {
            elevation: 20,
            borderRadius: 15,
            width: '100%'
        },

        cardTitle: {
            fontSize: 18,
            fontWeight: "600"
        },

        cardDescription : {
            marginTop: 8
        },

        cardBody: {
            padding: 16,
            paddingBottom: 12
        },

        cardImage: {
            borderRadius: 15,
            height: undefined,
            width: '100%',
            aspectRatio: 1
        },

        tag: {
            margin: 16,
            marginTop: 0,
            flexDirection: 'row'
        },

        tagText: {
            color: DefaultColors.neutralColorDark,
            borderColor: DefaultColors.neutralColorDark,
            borderWidth: 1.2,
            flexShrink: 1,
            padding: 4,
            borderRadius: 10,
            fontSize: 12
        }
    });

}


export default NoteComponent;