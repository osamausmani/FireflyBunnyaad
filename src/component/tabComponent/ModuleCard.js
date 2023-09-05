import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants';
import AppText from '../appComponnet/AppText';
import { imgUrl } from '../../api/apiEndPoint';

const ModuleCard = ({ img, text, onPress, customStyle, imgStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.contanier, { ...customStyle }]}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", height: 80 }}>
                <Image resizeMode='contain' source={{ uri: `${imgUrl}/${img}` }} style={[styles.image, { ...imgStyle }]} />
                <AppText
                    title={text}
                    bold
                    marginHorizontal={10}
                />
            </View>
            <AntDesign
                style={{ borderRadius: 100 }}
                name="rightcircle"
                size={18}
                color={Colors.filedBgColor}
            />

        </TouchableOpacity>
    )
}

export default ModuleCard



const styles = StyleSheet.create({
    contanier: {
        width: '100%',
        height: 80,
        backgroundColor: "#fff",
        marginHorizontal: 0,
        paddingHorizontal: 10,
        borderRadius: 15,
        flexWrap: 'wrap',
        overflow: 'hidden',
        alignItems: "center",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 5,
        borderRightWidth: 5,
        borderColor: "rgba(0,0,0,.06)",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5
    },
    image: {
        width: 40,
        height: 40,
    },

})