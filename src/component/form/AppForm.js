import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AppForm = ({ children }) => {
    return (

        <View style={styles.formContainer}>
            {children}
        </View>
    )
}

export default AppForm

const styles = StyleSheet.create({
    formContainer: {
        alignSelf: 'center',
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 25,
        zIndex: 1
    }
})