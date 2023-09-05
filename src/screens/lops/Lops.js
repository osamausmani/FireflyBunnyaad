


import { StyleSheet, View, Pressable, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppText from '../../component/appComponnet/AppText'
import ModuleCard from '../../component/tabComponent/ModuleCard'
import Feather from 'react-native-vector-icons/Feather';
import Language from '../../languages/Language'
import { Background, Images } from '../../constants'
import { PostRequest } from '../../api/axios'
import { getDevelopmentAuthoritysDDLApi } from '../../api/apiEndPoint'

const Lops = ({ navigation }) => {

    const [developmentAuthorities, setDevelopmentAuthorities] = useState([])

    useEffect(() => {
        getDevelopmnetAuthortyDDL()
    }, []);

    const getDevelopmnetAuthortyDDL = async () => {

        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "en",
                "ip": "string",
                "responseState": 200,

                "developmentAuthority": {
                    "developmentAuthorityId": 0,
                    "logo": "string",
                    "isStandard": true,
                    "createdAt": "2022-12-26T12:45:09.635Z",
                    "updatedAt": "2022-12-26T12:45:09.635Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 0,
                    "displayForId": 2
                }
            }
            PostRequest(getDevelopmentAuthoritysDDLApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    // setShowIndicator(false)
                }
                else {
                    // setShowIndicator(false)
                    // setDevelopmentAuthorities(res.developmentAuthorityDDL)
                    setDevelopmentAuthorities(res.developmentAuthorityDDL.filter((x=>x.id == '1' || x.id == '4')))
                    // console.log("res", JSON.stringify(res.developmentAuthorityDDL, null, 2));
                }
            }
            )
        } catch (error) {
            console.log(error);
        }

    }

    // render Components

    const renderHeader = () => {
        return (
            <ImageBackground source={Background.lop_bg} style={{ height: 200, alignItems: "center" }} >
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ width: "50%", paddingHorizontal: 10, marginTop: 10, }}>
                        <TouchableOpacity
                            onPress={() => navigation.replace("AppStack")}
                            style={{ backgroundColor: "rgba(255,255,255,.2)", width: 30, height: 30, alignItems: "center", justifyContent: "center", marginTop: 10, borderRadius: 80, overflow: "hidden" }}>
                            <Feather
                                style={{ borderRadius: 100 }}
                                name="arrow-left"
                                size={18}
                                color="#fff"
                            />
                        </TouchableOpacity>
                        <AppText
                            title={"SOCIETIES LOP’s"}
                            marginTop={8}
                            size={15}
                            color={"#fff"}
                            bold
                            textTransform="uppercase"
                        />
                        <AppText
                            title={`Here you can see your plot before buying by viewing approved societies LOP’s in just one click.`.slice(0, 200) + '.'}
                            marginTop={8}
                            size={12}
                            color={"#fff"}
                        />
                    </View>
                    <View style={{ width: "45%", alignItems: "center", justifyContent: "center", height: 250 }}>
                        <Image source={Images.lops} style={{ width: 190, height: 120 }} />
                    </View>

                </View>
            </ImageBackground>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <View style={{ flex: 1, marginTop: 0, }}>

                <FlatList
                    style={{ marginTop: 25, flex: 1, marginHorizontal: 20 }}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    data={developmentAuthorities}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <ModuleCard
                            img={item.logo}
                            text={item.name}
                            onPress={() => {
                                navigation.navigate("lopslist", {
                                    lop: item
                                })
                            }}
                            customStyle={{
                                borderWidth: 2,
                            }}
                        />
                    )}
                    keyExtractor={item => `lop-${item.id}`}
                />
            </View>
        </View>
    )
}

export default Lops

const styles = StyleSheet.create({
    header: {
        flex: 1,
        marginHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    back: {
        width: 25,
        height: 25
    },
    text: {
        marginLeft: "30%",
        padding: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: "#fff"
    },

})