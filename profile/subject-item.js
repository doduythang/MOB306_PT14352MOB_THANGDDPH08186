import React from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';

export default function subjectItem({item, handleDelete, handleEdit}){
    const alertDelete = (identity, handleDelete) => {
        return Alert.alert(
            'Delete Subject', // tham so dau tien: title
            `Ban co muon xoa ${identity} khong?`, // tham so t2: content
            [
                {
                    text: 'Co',
                    onPress: () => {handleDelete(identity)}
                },
                {
                    text: 'Khong',
                    onPress: () => {}
                }
            ],
            {cancleable: false} // cho click ra ben ngoai alert hay khong (true -> disable)
        )
    };

    return (
        <View style={style.row}>
            <View>
                <Text>{`Name: ${item.name}`}</Text>
                <Text>{`Identity: ${item.identity}`}</Text>
                <Text>{`Class name: ${item.className}`}</Text>
                <Text>--------------</Text>
            </View>
            <View>
                <Button title='EDIT' onPress={() => {handleEdit(item.identity)}} />
                <Button title='DELETE' onPress={() => {alertDelete(item.identity, handleDelete)}}  />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    row: {
        flexDirection: 'row'
    }
});
