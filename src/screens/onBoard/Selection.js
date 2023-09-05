import { Image, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Logo, AppText } from '../../constants'

const Selection = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, position: 'relative', backgroundColor: "#fff", }}>
            <StatusBar hidden />

            <Image source={Logo.bunyad_updated_logo} style={{ alignSelf: "center", height:500, width:500 }} />
            <TouchableOpacity style={{ backgroundColor: Colors.lightYello, padding: 10, alignItems: "center", marginHorizontal: 20, borderRadius:12, fontFamily: "Bill Corporate Narrow WOO",}}
                onPress={() => navigation.replace('SignUp')}
            >
                <AppText
                    title={"Create Account"}
                    color={"#fff"}
                    size={17}
                />
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 10, alignItems: "center", marginTop: 10, fontFamily:'TAN Aegean' }}
                onPress={() => navigation.replace('AppStack')}
            >
                <AppText
                    title={"Continue as  a Guest"}
                    color={Colors.fieldTextColor}
                    size={16}
                />
            </TouchableOpacity>
        </SafeAreaView >
    )
}

export default Selection

const styles = StyleSheet.create({})