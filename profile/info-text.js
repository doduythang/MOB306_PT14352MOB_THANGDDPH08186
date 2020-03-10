import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default function infoText({data}) {
    return (
        <View>
            <Text>{`Name: ${data.name}`}</Text>
            <Text>{`Email: ${data.email}`}</Text>
            <Text>{`Address: ${data.address}`}</Text>
            <Text>{`Phone number: ${data.phone}`}</Text>
            <Text>{`Active: ${data.active ? 'Yes' : 'No'}`}</Text>
        </View>
    )
}
