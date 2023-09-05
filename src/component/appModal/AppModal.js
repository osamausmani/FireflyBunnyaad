import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'

const AppModal = ({ visible, color, children, ...props }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={[styles.modalContainer, color ? { backgroundColor: color } : {}, props]}>
                {children}
            </View>
        </Modal>
    )
}

export default AppModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        height: 30,
        backgroundColor: 'rgba(0, 0, 0, .9)',
        alignItems: 'center',
        textAlign: 'center',
    },
})