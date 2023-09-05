import { StyleSheet, Dimensions, Image, View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { lightGrey, darkYellow, } from '../../constants/Colors'
const { height, width } = Dimensions.get('window')
import { main_bg } from '../../assets/path'


const AppHeader = ({ source, home = false, background, plain = false, title, icon, children }) => {
    return (
        <>
            {home ?
                <View style={[styles.header, background ? { backgroundColor: background } : {}]}>
                    <View style={styles.uperHeader} ></View>
                    <View style={styles.bottomHeader}></View>
                    {plain ?
                        <View style={[styles.curve, background ? { backgroundColor: background } : {}]} />
                        :
                        <ImageBackground source={main_bg} style={[styles.curve, background ? { backgroundColor: background } : {}]} />
                    }
                    <View style={styles.body}>
                        {children}
                    </View>
                </View> :
                <View style={styles.logo_container} >
                    <Image source={source ? source : icon} style={source ? styles.logo : styles.icon} />
                    {title ? <Text style={styles.title} >{title}</Text> : null}
                </View>
            }
        </>
    )
}

export default AppHeader

const styles = StyleSheet.create({
    logo_container: {
        marginTop: "20%",
        marginVertical: width / 2 - 46.8,
        alignItems: 'center',
    },
    logo: {
        width: 94.6,
        height: 48.64,
    },
    icon: {
        width: 41,
        height: 48.64,
    },
    title: {
        marginTop: 5,
        alignSelf: 'center',
        fontSize: 20
    },
    header: {
        height: 195,
    },
    uperHeader: {
        backgroundColor: darkYellow,
        height: 140,
        borderBottomLeftRadius: 45
    },
    bottomHeader: {
        backgroundColor: darkYellow,
        height: 50,
        width: "50%",
        marginLeft: 'auto',
    },
    curve: {
        height: 50,
        marginTop: -50,
        borderTopRightRadius: 55,
        backgroundColor: lightGrey
    },
    body: { height: 120, marginTop: -180 }
})