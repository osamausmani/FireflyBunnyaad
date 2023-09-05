import { StyleSheet, Keyboard, SafeAreaView, View, Dimensions, Image, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { lightGrey } from '../../constants/Colors'
const { width } = Dimensions.get('window')
import { bottom_bg, main_bg } from '../../assets/path'


const AppBackground = ({ children, home = false, background, scrollView = false }) => {
    const [shouldShow, showImage] = useState(true);
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        return () => {
            Keyboard.removeAllListeners("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeAllListeners("keyboardDidHide", _keyboardDidHide);
            // Keyboard.removeSubscription(_keyboardDidShow, _keyboardDidHide);
        };
    }, []);

    let _keyboardDidShow = () => {
        showImage(false)
    }

    let _keyboardDidHide = () => {
        showImage(true)
    }
    return (
        <>{!home ? <SafeAreaView style={[styles.container, background ? { backgroundColor: background } : {}]}>
            {children}
            {shouldShow ? <Image source={bottom_bg} style={styles.bg} /> : null}
        </SafeAreaView> : <ImageBackground source={main_bg} style={[styles.container, background ? { backgroundColor: background } : {}]}>
            {children}
        </ImageBackground>
        }


        </>
    )
}

export default AppBackground

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightGrey,

    },
    bg: {
        position: 'absolute',
        bottom: -38,
        resizeMode: 'contain',
        width: width,
    },
})