import React, { useState, useEffect, useContext } from 'react'
import { Image, Pressable, StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions, ActivityIndicator } from 'react-native'

import Icons from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Language from '../../languages/Language';
import AppText from '../../component/appComponnet/AppText';
import { Background, Colors, Images, Icon } from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PostRequest } from '../../api/axios';
import { getAllFloorPlansApi, imgUrl } from '../../api/apiEndPoint';
import { AppContext } from '../../contextApi/AppProvider';
const FloorPlanPlotSelection = ({ navigation, route }) => {

    const { floorRelationIds } = useContext(AppContext)

    const { title } = "Residential"
    const [isEnglish, SelectLanguage] = useState(true);
    const [showIndicator, setShowIndicator] = useState(true);
    const [floorPlanList, setFloorPlanList] = useState([]);

    const getLocalData = async () => {
        const getLocalLAnguages = await AsyncStorage.getItem('language');
        let isEnglish = await JSON.parse(getLocalLAnguages);
        SelectLanguage(true)
    }

    useEffect(() => {
        getLocalData()
    }, [getLocalData,])
    useEffect(() => {
        getAllFloorPlans()
        // console.log(floorRelationIds, "ids")
    }, []);

    const getAllFloorPlans = async () => {

        const Model = {
            "userID": 0,
            "userKey": "string",
            "languageCode": "en",
            "ip": "string",
            "responseState": 200,
            "isPremium": false,
            "floorPlan": {
                "floorPlanId": 0,
                "isStandard": true,
                "createdAt": "2022-11-17T10:07:42.213Z",
                "updatedAt": "2022-11-17T10:07:42.213Z",
                "createdBy": 0,
                "updatedBy": 0,
                "dataStateId": 0
            },
            "floorPlanRelationList": [{
                "cityID": floorRelationIds.cityID,
                "societyID": floorRelationIds.societyID,
                "plotSizeID": floorRelationIds.plotSizeID,
                "plotCategoryID": floorRelationIds.plotCategoryID,
                "floorID": floorRelationIds.floorID,
                "unitID": 1,
                "floorPlanID": 0
            }]
        }

        console.log(JSON.stringify(Model, null, 2), "model");

        PostRequest(getAllFloorPlansApi, Model).then(res => {
            if (res === 0) {
                console.log("error");
                setShowIndicator(false)
            }
            else {
                setShowIndicator(false)
                // console.log("raw data", JSON.stringify(res, null, 2), "floor plans");
                const newData = res.floorPlans?.map((item) => {
                    return {
                        floorPlanId: item.floorPlanId,
                        imagePath: item.imagePath,
                        name: item.name,
                        description: item.description,
                        modalData: res.attachmentList?.filter((item2) => item2.actionRowId == item.floorPlanId)
                    }
                })

                setFloorPlanList(newData)
                console.log("res", JSON.stringify(newData, null, 2));
            }
        }
        )
    }
    const renderHeader = () => {
        return (
            <ImageBackground source={Background.floorPlan_bg} style={{ height: 250, alignItems: "center" }} >
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
                            title={" FLOOR PLANS LIBRARY"}
                            marginTop={8}
                            size={16}
                            color={"#fff"}
                            fontWeight="600"
                            textTransform="uppercase"
                        />
                        <AppText
                            title={`Hundreds of building by-laws based floor plans with elevations, ranging from as small as 20’ x 40’ to as big as 60’ x 90’`.slice(0, 200) + '.'}
                            marginTop={8}
                            size={15}
                            color={"#fff"}
                        />
                    </View>
                    <View style={{ width: "45%", alignItems: "center", justifyContent: "center", height: 250 }}>
                        <Image source={Images.floorPlan} style={{ width: 130, height: 130 }} />
                    </View>

                </View>
            </ImageBackground >
        )
    }

    return (
        <View style={{ backgroundColor: "#fff", flex: 1, }}>

            {renderHeader()}
            {showIndicator ?
                <ActivityIndicator size={55} color={Colors.darkYellow} />
                :
                <ScrollView style={{ marginHorizontal: 10 }} showsVerticalScrollIndicator={false}>
                    {
                        floorPlanList && floorPlanList.map((item, index) => (
                            <Pressable key={index} style={styles.container} onPress={() => {
                                navigation.navigate("floorPlandetail", {
                                    modalData: item
                                })
                            }
                            }>
                                <View style={[{ flexDirection: isEnglish ? 'row' : 'row-reverse', }, styles.containerWraper]}>
                                    <Image source={Icon.floorPlan} style={styles.icon} />

                                    <Text style={[styles.label, { textAlign: isEnglish ? "left" : 'right' }]}>{item.name}</Text >
                                    <Image style={[styles.arrow, { transform: [{ rotate: isEnglish ? '0deg' : '180deg' }] }]} source={Icon.arrow_icon} />
                                </View>
                            </Pressable>
                        )
                        )
                    }


                </ScrollView>
            }
            <View style={{}}></View>
        </View >
    )
}

export default FloorPlanPlotSelection
const { height, width } = Dimensions.get("window")
const styles = StyleSheet.create({
    header: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightYello,
        paddingHorizontal: 40
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
        padding: 7,
        borderRadius: 10,
        textAlign: 'center',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 6,
        borderColor: "rgba(0,0,0,.06)",
    },
    containerWraper: {
        justifyContent: 'space-between',
        textAlign: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 8
    },
    icon: {
        width: 40,
        height: 40
    },
    arrow: {
        width: 10,
        height: 20
    },
    label: {
        flex: 1,
        marginLeft: 20,
        fontSize: 14,
        margin: 10,
        fontWeight: 'bold',
        color: Colors.fieldTextColor
    },
    modal: {
        height: height / 1.5,
        backgroundColor: '#fff',
        width: width / 1.1,
        marginHorizontal: 20,
        marginTop: height / 6.5,
        borderRadius: 10
    },
    modalGallery: {
        height: 220,
        marginTop: 35,
    },
    slide1: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide2: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        borderRadius: 2,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    carasoulImage: {
        height: 180,
        width: width / 1.4,
        overflow: 'hidden',
        marginHorizontal: 10,
        borderRadius: 10
    },
    cancelModal: {
        alignSelf: 'flex-end',
        padding: 3,
        top: 10,
        right: 10,
    }
})