import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { lightYello, formTextColor } from '../../constants/Colors'

const AppFormText = ({ children, title = 'sample Text', link, onPress, style, color, size, h1color, fontFamily }) => {
    return (
        <View style={[styles.container, { ...style }]}>
            <Text style={[styles.text, h1color ? { color: h1color} : {}]}>{children}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={[styles.linkStyle, color && { color: color }, size && { fontSize: size}]}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AppFormText

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 15,
    },
    text: {
        color: formTextColor,
        textAlign: 'center',
        fontFamily:'TAN Aegean'

    },
    linkStyle: {
        marginLeft: 5,
        color: lightYello,
        fontWeight: 'bold',
    },
})