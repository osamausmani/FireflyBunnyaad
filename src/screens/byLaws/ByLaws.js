import { StyleSheet, View, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import AppText from '../../component/appComponnet/AppText'
import ModuleCard from '../../component/tabComponent/ModuleCard'
import Feather from 'react-native-vector-icons/Feather';
import Language from '../../languages/Language'
import { Background, Images } from '../../constants'
import { PostRequest } from '../../api/axios'
import { getDevelopmentAuthoritysDDLApi } from '../../api/apiEndPoint'





const ByLaws = ({ navigation }) => {
    const [isEnglish, SelectLanguage] = useState(true)
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
                console.log(res)
                if (res === 0) {
                    console.log("error");
                    // setShowIndicator(false)
                }
                else {
                    // setShowIndicator(false)
                    // setDevelopmentAuthorities(res.developmentAuthorityDDL)
                    setDevelopmentAuthorities(res.developmentAuthorityDDL)
                    // console.log("res", JSON.stringify(res.developmentAuthorityDDL, null, 2));
                }
            }
            )
        } catch (error) {
            console.log(error);
        }

    }


    // const getDevelopmnetAuthortyDDL = async () => {

    //     try {
    //         const Model = {
    //             "userID": 0,
    //             "userKey": "string",
    //             "languageCode": "en",
    //             "ip": "string",
    //             "responseState": 200,

    //             "developmentAuthority": {
    //                 "developmentAuthorityId": 0,
    //                 "logo": "string",
    //                 "isStandard": true,
    //                 "createdAt": "2022-12-26T12:45:09.635Z",
    //                 "updatedAt": "2022-12-26T12:45:09.635Z",
    //                 "createdBy": 0,
    //                 "updatedBy": 0,
    //                 "dataStateId": 0,
    //                 "displayForId": 1
    //             }
    //         }
    //         PostRequest(getDevelopmentAuthoritysDDLApi, Model).then(res => {
    //             console.log(res)
    //             if (res === 0) {
    //                 console.log("error");
    //                 // setShowIndicator(false)
    //             }
    //             else {
    //                 // setShowIndicator(false)
    //                 setDevelopmentAuthorities(res.developmentAuthorityDDL)
    //                 // console.log("res", JSON.stringify(res.developmentAuthorityDDL, null, 2));
    //             }
    //         }
    //         )
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }


    // render  comonents
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
                                navigation.navigate("BylawsCategory",{
                                    developmentAuthorityId:item.id
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

export default ByLaws

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
    container: {
        marginTop: 10,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        textAlign: 'center',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 5,
        borderRightWidth: 6,
        borderColor: "rgba(0,0,0,.06)",
    },
    containerWraper: {
        justifyContent: 'space-between',
        textAlign: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },

})

