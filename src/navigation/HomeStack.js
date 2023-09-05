import { Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/HomeStackStyle'
import Language from '../languages/Language'
import AsyncStorage from '@react-native-async-storage/async-storage';


import AppBackground from '../component/appComponnet/AppBackground'
import { avatar, white_menu, notification_icon } from '../assets/path'
import AppHeader from '../component/appComponnet/AppHeader'
import Home from '../screens/home/Home'
import PickupModal from '../component/appModal/PickupModal';
import QualityShowModal from '../component/appModal/QualityShowModal';

const HomeStack = ({ navigation }) => {
    const [isEnglish, SelectLanguage] = useState(null);

    const getLocalData = async () => {
        const getLocalLAnguages = await AsyncStorage.getItem('language');
        let isEnglish = await JSON.parse(getLocalLAnguages);
        SelectLanguage(isEnglish)
    }
    useEffect(() => {
        getLocalData()
    }, [getLocalData, SelectLanguage,])
    return (
        <AppBackground home={true}>

            {
                isEnglish ?
                    <AppHeader home >
                        <View style={styles.topHeader}>
                            <View style={styles.row}>
                                <Pressable onPress={() => navigation.openDrawer()}>
                                    <Image style={[styles.header_icon, { marginRight: 5 }]} source={white_menu} />
                                </Pressable>
                                <Text style={styles.logo} >{Language.title}</Text>
                            </View>
                            <View style={styles.row}>
                                <Image style={[styles.header_icon, { marginRight: 10 }]} source={notification_icon} />
                                <Image style={styles.header_icon} source={avatar} />
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{Language.welcome} ,<Text style={{ fontWeight: 'bold' }}> {Language.name}</Text></Text>
                        </View>

                    </AppHeader> :
                    <AppHeader home >
                        <View style={styles.topHeader}>
                            <View style={styles.row}>
                                <Image style={styles.header_icon} source={avatar} />
                                <Image style={[styles.header_icon, { marginLeft: 10 }]} source={notification_icon} />
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.logo, { marginRight: 20 }]} >{Language.title}</Text>
                                <Pressable onPress={() => navigation.openDrawer()}>
                                    <Image style={styles.header_icon} source={white_menu} />
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{Language.welcome} ,جان ڈو </Text>
                        </View>

                    </AppHeader>
            }
            <Home />
        </AppBackground >

    )
}

export default HomeStack

