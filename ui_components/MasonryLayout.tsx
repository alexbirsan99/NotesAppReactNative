import React from "react";
import { FlatList, ScrollView, View, Text, Dimensions, StyleSheet } from "react-native";

export default class MasonryLayout extends React.Component<{ numColumns: number, renderItem: Function, data: any, keyExtractor?: Function }, any> {

    numColumns: number = 0;

    data: any;

    scrollTransform: { x?: number, y?: number, width?: number, height?: number } = {};

    renderItem: Function;

    keyExtractor?: Function;

    constructor(props: { numColumns: number, renderItem: Function, data: any, keyExtractor?: Function }) {
        super(props);
        this.state = {
            transform: this.scrollTransform,
            columnWidth: 0
        };
        this.numColumns = props.numColumns;
        this.renderItem = props.renderItem;
        this.keyExtractor = props.keyExtractor;
    }


    render(): React.ReactNode {

        this.data = this.props.data;

        return (
            <ScrollView style={this.styles.scroll} onLayout={(event) => {
                this.setState({
                    transform: event.nativeEvent.layout,
                    cellWidth: event.nativeEvent.layout.width / this.numColumns
                });
            }}>
                {this.renderColumns()}
            </ScrollView>
        )

    }


    renderColumns(): JSX.Element {
        let columns: JSX.Element[] = [];

        for (let i = 0; i < this.numColumns; i++) {
            columns.push(
                <View key={i} style={{
                    width: this.state.cellWidth,
                    height: '100%',
                    flexDirection: 'column'
                }}>
                    {this.renderItems(i)}
                </View>
            );
        }
        return (
            <View style={this.styles.columnContainer}>
                {columns}
            </View>
        );
    }


    renderItems(indexColumn: number): JSX.Element {

        let items = [];

        for (let i = indexColumn; i < this.data.length; i += this.numColumns) {
            let value = this.data[i];
            let key = this.keyExtractor ? this.keyExtractor(value) : null;
            items.push(
                <View key={key} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this.renderItem(value)}
                </View>
            );
        }

        return (
            <>
                {items}
            </>
        );
    }




    styles = StyleSheet.create({
        scroll: {
            flexDirection: 'row',
            flexWrap: 'wrap'
        },

        columnContainer: {
            flexDirection: 'row'
        }
    });

}