import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const noteComponent = ({ item }: { item: INote }) =>( 
    <View style={styles.card}>
        <Text style = {styles.cardTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
    </View>
);

const styles = StyleSheet.create({
    card: {
        elevation: 20,
        borderRadius: 10,
        padding: 16,
        margin: 8,
        backgroundColor: '#9642f5',
        flex: 1
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "600"
    }
});


export default noteComponent;