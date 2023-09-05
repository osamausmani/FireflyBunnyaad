import React, { useState, useEffect } from 'react'
import { Image, Pressable, StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, ToastAndroid } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Language from '../../languages/Language';
import { Icon, Colors, Logo } from '../../constants';
import AppText from '../appComponnet/AppText';
import { _retrieveObject, _retrieveData, _removeItem } from '../../constants/AsyncStorageHelper'


const CustomeDrawer = (props) => {
    const navigation = props.navigation;
    const [isEnglish, SelectLanguage] = useState(null);
    const [userData, setUserData] = useState({})

    const getUserData = async () => {
        const res = await _retrieveObject('@tokenObj')
        if (res) {
            // console.log(res, "user Local objects");
            setUserData(res)
        }

    }

    useEffect(() => {
        getUserData()
    }, [_retrieveObject])

    const customData = [
        { route: 'userProfile', label: Language.userProfile, icon: Icon.personal_icon, onPress: () => console.log(" user Profile Click") },
        { route: 'chatWithUs', label: Language.chatWithUs, icon: Icon.setting_icon, onPress: () => Linking.openURL('whatsapp://send?text=Hello,&phone=+9203097779132') },
        { route: 'customerSupport', label: Language.customerSupport, icon: Icon.supports_icon, onPress: () => Linking.openURL(`tel:+92 0309 7779132`) },
        { route: 'termOruse', label: Language.termOruse, icon: Icon.blogs_icon, onPress: () => navigation.navigate("termOfUse") },
        { route: 'privacyPolicy', label: Language.privacyPolicy, icon: Icon.privacy_icon, onPress: () => navigation.navigate("privacyPolicy") },
        { route: 'Logout', label: Language.Logout, icon: Icon.signout_icon, onPress: () => handleSignoutPress() },
    ];

    const getLocalData = async () => {
        const getLocalLAnguages = await AsyncStorage.getItem('language');
        let isEnglish = await JSON.parse(getLocalLAnguages);
        SelectLanguage(isEnglish)

    }
    useEffect(() => {
        getLocalData()
    }, [getLocalData,])

    const handleSignoutPress = () => {
        showToastMessage()
        _removeItem("@tokenObj")
        navigation.navigate('SignIn')

    }
    const showToastMessage = () => {
        ToastAndroid.show(
            "Logout Successfully.",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            65,
            50
        );
        
    };
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <AppText
                        marginLeft={"5%"}
                        size={20}
                        bold
                        title={"X"}
                        color="#fff"
                    />
                </TouchableOpacity>
                <Image source={Logo.flat_logo} style={styles.text} />
            </View>


            <ScrollView style={{ marginHorizontal: 20, marginTop: 30 }}>
                {/* {userData &&
                    <AppText
                        title={`Hi - ${userData && userData.FirstName}`}
                    />
                } */}

                {
                    customData.map((item, index) => (
                        <TouchableOpacity key={index} style={{ marginTop: 10 }} onPress={() => {
                            item.onPress()
                            // Linking.openURL('whatsapp://send?text=Hello,&phone=+9203097779132')
                            // Linking.openURL(`tel:+92 0309 7779132`)
                        }}>
                            <View style={{ flexDirection: !isEnglish ? 'row' : 'row-reverse', justifyContent: 'space-between' }}>
                                <Image style={styles.icon} source={item.icon} />
                                <Text style={[styles.label, { textAlign: !isEnglish ? "left" : 'right' }]}> {item.label} </Text>
                                <Image style={[styles.arrow, { transform: [{ rotate: !isEnglish ? '0deg' : '180deg' }] }]} source={Icon.arrow_icon} />
                            </View>
                        </TouchableOpacity>
                    )
                    )
                }


            </ScrollView>
            <View style={{}}></View>

        </View>

    )
}

export default CustomeDrawer

const styles = StyleSheet.create({
    header: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightGrey,
        paddingHorizontal: 40
    },
    back: {
        width: 25,
        height: 25
    },
    text: {
        marginLeft: "10%",
        marginRight: '10%',
        padding: 5,
        width: 180,
        height: 45

    },
    icon: {
        width: 30,
        height: 30
    },
    label: {
        flex: 1,
        marginLeft: 20,
        fontSize: 14,
        margin: 10,
        fontWeight: 'bold',
        color: Colors.fieldTextColor
    },
    arrow: {
        alignSelf: "center",
        width: 10,
        height: 10
    }

})