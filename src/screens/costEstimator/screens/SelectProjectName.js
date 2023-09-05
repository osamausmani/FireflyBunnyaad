import { StyleSheet, TextInput, View, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
import AppText from "../../../component/appComponnet/AppText"
import AppSubmitButton from "../../../component/appComponnet/AppSubmitButton"
import { AppContext } from '../../../contextApi/AppProvider'
import { Colors } from '../../../constants'


const SelectProjectName = ({ navigation }) => {

    const { result, setResult } = useContext(AppContext)

    const [projectName, setProjectName] = useState('')
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.header}>
                <AppText
                    marginLeft={"0%"}
                    bold
                    size={20}
                    title={"Cost Estimator"}
                    color="#fff"
                />
            </View>

            <View style={{ flex: 1, }}>
                <View style={{ flex: 1, marginTop: 150 }} >
                    <AppText
                        alignSelf="center"
                        bold
                        size={18}
                        color={Colors.darkgrey}
                        title={"Please Enter Project Title"}
                    />
                    <View style={{
                        position: "relative",
                        justifyContent: 'center'
                    }}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="My Dream Home ..."
                            value={projectName}
                            placeholderTextColor={Colors.darkgrey}
                            onChangeText={(e) => {
                                setProjectName(e)
                                setResult({ ...result, name: e })
                            }}
                        />
                        <Pressable
                            style={styles.btnCross}
                        >
                            <AppText
                                size={18}
                                color={Colors.darkgrey}
                                title="X"
                            />
                        </Pressable>
                    </View>
                    <AppText
                        color={Colors.darkgrey}
                        marginHorizontal={40}
                        marginTop={-20}
                        title={"Please enter an information title"}
                    />
                </View>
                <AppSubmitButton
                    width="85%"
                    alignSelf="center"
                    margin={25}
                    name={"Lets start"}
                    onPress={() => {
                        navigation.navigate("selectCity", {
                            projectName: projectName
                        })
                    }}
                />
            </View>

        </View>
    )
}

export default SelectProjectName

const styles = StyleSheet.create({

    header: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightYello,
        paddingHorizontal: 40
    },
    textInput: {
        borderWidth: 2,
        padding: 15,
        borderColor: Colors.fieldPlaceholderColor,
        margin: 30,
        borderRadius: 10,
        backgroundColor: '#fff',
        color: Colors.darkgrey
    },
    btnCross: {
        position: "absolute",
        right: 45,
    }

})