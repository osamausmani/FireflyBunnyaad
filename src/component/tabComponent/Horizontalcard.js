import { StyleSheet, Text, View, Image, Dimensions, Pressable, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { AppText, Colors } from '../../constants'


const Horizontalcard = ({ img, text, onPress, customStyle, imgStyle, bgImage }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.contanier, styles.elevation, customStyle]}>
            <Image resizeMode='contain' source={img} style={[styles.image, { ...imgStyle}]} />
            <AppText
                title={text.substring(0, 20)}
                width="65%"
                color={Colors.newTextColor}
                fontSize={13}
                textAlign='center'
                marginHorizontal={5}
                marginVertical={7}
                bold
                fontWeight="800"
            />
            {/* <Text ellipsizeMode="head" numberOfLines={2} style={styles.text}>{text.substring(0, 20)}</Text> */}
        </TouchableOpacity>

    )
}

export default Horizontalcard


const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    contanier: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 2.25,
        height: 100,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 4,
        borderColor: "rgba(0,0,0,.06)",
        
    },
    image: {
        width: "30%",
        height: 10,
        
    },
    text: {
        width: "65%",
        color: Colors.lightblack,
        fontSize: 15,
        textAlign: 'center',
        marginHorizontal: 5,
        fontWeight:'bold'
    },

    elevation: {
backgroundColor:'#E5EAEE'
    },
})