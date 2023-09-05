import { StyleSheet, TextInput, View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppModal from './AppModal'
import AppText from '../appComponnet/AppText'
import { Colors } from '../../constants'

const ModalCostSave = ({ visible = false, onPressOk, onCancelPress, name = '' }) => {
    const [projectName, setProjectName] = useState('')

    useEffect(() => {
        setProjectName(name)
        return () => {
            setProjectName('')
        };
    }, [name]);

    return (
        <AppModal
            visible={visible}
            justifyContent={"center"}
        >
            <View style={styles.modal} >
                <Pressable style={{ position: "absolute", top: 0, right: 0, margin: 15 }} onPress={() => onCancelPress()} >
                    <AntDesign size={24} color={Colors.fieldTextColor} name={"close"} />
                </Pressable>
                <AppText
                    title={"Please rename it to save this project for later ?"}
                    alignSelf={"center"}
                />
                <TextInput
                    style={styles.textField}
                    placeholderTextColor={Colors.fieldPlaceholderColor}
                    placeholder='My Dream Project'
                    value={projectName}
                    onChangeText={(text) => setProjectName(text)}
                />
                <View style={styles.btnContainer}>
                    <Pressable style={{ marginRight: 25 }} onPress={() => onCancelPress()} >
                        <AppText
                            title={"DISCARD"}
                            color={Colors.fieldPlaceholderColor}
                        />
                    </Pressable>
                    <Pressable onPress={() => onPressOk(projectName)} >
                        <AppText
                            title={"SAVE"}
                            color={Colors.lightYello}
                        />
                    </Pressable>
                </View>
            </View>

        </AppModal>
    )
}

export default ModalCostSave

const styles = StyleSheet.create({
    modal: {
        width: "90%",
        height: 250,
        backgroundColor: "#fff",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    textField: {
        backgroundColor: Colors.filedBgColor,
        color: Colors.lightblack,
        width: "85%",
        alignSelf: "center",
        borderRadius: 10,
        paddingLeft: 10,
        marginVertical: 15
    },
    btnContainer: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginHorizontal: 50
    }
})