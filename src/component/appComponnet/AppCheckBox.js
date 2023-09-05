import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { checked, uncheck } from '../../assets/path'
import { darkgrey } from '../../constants/Colors'

const LanguageCheckBox = ({ check = false, flag, text, value, onPress }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.pic} source={flag} />
            <Text style={styles.language}>{text}</Text>
            <Pressable value={value} onPress={onPress}>
                <Image style={styles.checkbox} source={check ? checked : uncheck} />
            </Pressable>

        </View>
    )
}

export default LanguageCheckBox

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: 50,
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 5
    },
    pic: {
        width: 30,
        height: 30,
        margin: 5
    },
    language: {
        flex: 1,
        marginLeft: 10,
        fontSize: 12,
        fontWeight: "bold",
        color: darkgrey
    },
    checkbox: {
        width: 25,
        height: 25,
    }
})