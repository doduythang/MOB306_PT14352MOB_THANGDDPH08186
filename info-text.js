import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Switch,
    Modal,
    Button,
    TextInput,
    Picker
} from 'react-native';

export default function infoText({ data }) {
    return (
        <View>
            <Text>{`Name: ${data.name}`}</Text>

        </View>
    )
}
