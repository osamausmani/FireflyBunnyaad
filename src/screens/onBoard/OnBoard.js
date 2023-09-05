import { SafeAreaView, Text, View, Image } from 'react-native'
import React, { useState } from 'react'

import { logo_png, aus_flag, pak_flag, forwad_arrow } from '../../assets/path';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Language from '../../languages/Language';

import { styles } from '../../styles/OnBoardStyle';
import AppCheckBox from '../../component/appComponnet/AppCheckBox';
import AppSubmitButton from '../../component/appComponnet/AppSubmitButton';
import AppBackground from '../../component/appComponnet/AppBackground';
import AppHeader from '../../component/appComponnet/AppHeader';
import { darkgrey } from '../../constants/Colors';


const OnBoard = ({ navigation }) => {
    const [languages, setLanguages] = useState({
        eng: false,
        urdu: false
    });

    const onPress = (key) => {

        if (key == 'urdu') {
            Language.setLanguage('ur')
        } else {
            Language.setLanguage('en')
        }

        setLanguages(prev => {
            if (key == 'eng') {
                return ({
                    eng: !prev.eng,
                    urdu: false
                })
            }
            else if (key == 'urdu') {
                return ({
                    eng: false,
                    urdu: !prev.urdu
                })
            }
            else {
                languages
            }
        })

    }

    const handleContinue = async () => {
        try {
            await AsyncStorage.setItem("language", JSON.stringify(languages.eng))
        }
        catch (error) {
            console.log(error);
        }

        navigation.navigate('AppStack')
    }


    return (
        <AppBackground>
            <AppHeader source={logo_png} />
            <View style={styles.selector}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: darkgrey }}> Please Select Your Language</Text>
                </View>
                <View style={styles.checkBoxContainer}>
                    <AppCheckBox
                        flag={aus_flag}
                        text={"English"}
                        check={languages.eng}
                        value={languages.eng}
                        onPress={() => onPress('eng')

                        }
                    />
                    <View style={styles.line} />
                    <AppCheckBox
                        flag={pak_flag}
                        text={"Urdu"}
                        check={languages.urdu}
                        value={languages.urdu}
                        onPress={() => onPress('urdu')
                        }
                    />
                </View>
                <View style={{ marginTop: 50, }}>
                    <AppSubmitButton
                        name={"Continue"}
                        icon={forwad_arrow}
                        onPress={handleContinue}
                    />
                </View>
            </View>
        </AppBackground>

    )
}

export default OnBoard
