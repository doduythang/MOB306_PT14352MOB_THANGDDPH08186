import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

// Khi ten file la index.js thi ben import se chi can tro den thu muc
// import xxx from './list' -> './list/index'
export default function Row({ item, show }) {
    return (
        // View nay dai dien cho 1 row
        (show == true) ? (
            <View style={style.row}>
                <View style={style.left}>
                    <Image source={{ uri: item.avatar }} style={style.image} />
                </View>
                <View style={style.right}>
                    <Text style={style.text}>{item.name}</Text>
                    <Text style={style.text}>{item.address}</Text>
                    <Text style={style.text}>{item.email}</Text>
                </View>
            </View>
        )
        : null
    );
}

const style = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 20,
        margin: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#ccc"
    },
    right: {
        marginLeft: 20,
    },
    text: {
        fontStyle: "italic",
        fontSize: 20
    }
});
