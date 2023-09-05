import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppText, Background, Colors, Images } from '../../constants'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ByLawsResidentialCheck = ({ navigation, route }) => {
    const { item } = route.params


    // render List
    const renderHeader = () => {
        return (
            <ImageBackground source={Background.approal_bg} style={{ height: 250, alignItems: "center" }} >
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ width: "50%", paddingHorizontal: 10, marginTop: 25, }}>
                        <TouchableOpacity onPress={() => navigation.replace("AppStack")} style={{ backgroundColor: "rgba(255,255,255,.2)", width: 30, height: 30, alignItems: "center", justifyContent: "center", marginTop: 10, borderRadius: 80, overflow: "hidden" }}>
                            <Feather
                                style={{ borderRadius: 100 }}
                                name="arrow-left"
                                size={18}
                                color="#fff"
                            />
                        </TouchableOpacity>
                        <AppText
                            marginTop={8}
                            size={18}
                            title={"By Laws"}
                            color={"#fff"}
                            bold
                            width={100}
                            textTransform="uppercase"
                        />
                        <AppText
                            marginTop={8}
                            size={12}
                            title={"Bylaws Information with our smart and accurate System."}
                            color={"#fff"}
                        />
                    </View>
                    <View style={{ width: "45%", alignItems: "flex-start", justifyContent: "center", height: 250 }}>
                        <Image source={Images.bylaws} style={{ width: 250, height: 140 }} />
                    </View>

                </View>
            </ImageBackground>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <View style={{ flex: 1, marginTop: 20, }}>
                <AppText
                    title={"Please Select Category"}
                    marginVertical={10}
                    color={Colors.fieldTextColor}
                    bold
                    alignSelf={"center"}
                />
                <TouchableOpacity style={[styles.contanier]} onPress={() => {
                    navigation.navigate("BylawsCategory", {
                        isResidential: true,
                        item
                    })
                }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", height: 80 }}>
                        <Image resizeMode='contain' source={Images.resid_img} style={[styles.image,]} />
                        <AppText
                            title={"Residential"}
                            bold
                            marginHorizontal={20}
                            color={Colors.fieldTextColor}
                        />
                    </View>
                    <AntDesign
                        style={{ borderRadius: 100 }}
                        name="rightcircle"
                        size={18}
                        color={Colors.filedBgColor}
                    />

                </TouchableOpacity>
                <TouchableOpacity style={[styles.contanier]} onPress={() => {
                    navigation.navigate("BylawsCategory", {
                        isResidential: false,
                        authority
                    })
                }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", height: 80 }}>
                        <Image resizeMode='contain' source={Images.chr_img} style={[styles.image,]} />
                        <AppText
                            title={"Commercial"}
                            bold
                            marginHorizontal={20}
                            color={Colors.fieldTextColor}
                        />
                    </View>
                    <AntDesign
                        style={{ borderRadius: 100 }}
                        name="rightcircle"
                        size={18}
                        color={Colors.filedBgColor}
                    />

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ByLawsResidentialCheck

const styles = StyleSheet.create({
    contanier: {
        width: '95%',
        height: 80,
        backgroundColor: "#fff",
        marginHorizontal: 10,
        paddingHorizontal: 20,
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

