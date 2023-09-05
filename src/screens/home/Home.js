import { SafeAreaView, ScrollView, StyleSheet, View, Image, Pressable, ImageBackground, TouchableOpacity, Text, Dimensions, PermissionsAndroid, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import Language from '../../languages/Language'
import { Background, Colors, Icon, AppText, Logo } from '../../constants'
import Horizontalcard from '../../component/tabComponent/Horizontalcard'
import Slider from '../../component/appModal/Slider'
import Feather from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper'
import { AppContext } from "../../contextApi/AppProvider"
import { PostRequest, getAllStaticFlowsApi, imgUrl } from '../../api/apiEndPoint';
import { _retrieveObject, _retrieveData, _removeItem } from '../../constants/AsyncStorageHelper'
import { userModel, staticFlow } from "../../models"
import { Settings, AppEventsLogger } from 'react-native-fbsdk-next';

const Home = () => {
    const { setResult,setFloorRelationIds, authData, setAuthData, setContructionData, setFinishingList } = useContext(AppContext)
    const navigation = useNavigation();
    const [flowData, setFlowData] = useState([]);


    useEffect(() => {
        Settings.setAppID('741561060919365');
        Settings.initializeSDK();
    }, [])

    useEffect(() => {
        getUserData()
        getStaticFlows()
        setResult({
            name: "",
            city: "",
            plotArea: "",
            sizeOfPlot: "",
            constructionQuality: "",
            plotCategory: "",
            noOfFloors: "",
            noOfUnits: "",
            cityId: 0,
            societyId: 0,
            plotSizeId: 0,
            floorId: 0,
            unitId: 0,
            floorPlanId: 0,
            constructionQualityId: 0,
        })
        setFloorRelationIds({
            cityID: 0,
            societyID: 0,
            plotSizeID: 0,
            plotCategoryID: 0,
            floorID: 0,
            unitID: 0,
            floorPlanID: 0
        })
        setContructionData(null)
        setFinishingList(null)
    }, [])

    const getUserData = async () => {
        const res = await _retrieveObject('@tokenObj')
        if (res) {
            // console.log(res, "user Local object");
            setAuthData({
                ...authData,
                isLogin: true,
                userId: res.UserID,
                userName: res.FirstName,
                phNumber: res.UserLogin
            })
        }
    }

    // console.log(authData.userId)

    const getStaticFlows = () => {
        try {
            const model = {
                userModel,
                staticFlow: {
                    ...staticFlow,
                    type: 2
                }
            }
            PostRequest(getAllStaticFlowsApi, model).then(res => {
                if (res === 0) {
                    console.log("error");
                }
                else {
                    setFlowData(res?.staticFlowList)
                }
            }
            )
        } catch (error) {
            console.log(error);
        }
    }

    //render  Componnets
    const renderHeader = () => {
        return (
            <View style={styles.topHeader}>
                <View style={{ flexDirection: "row", width: "45%", justifyContent: "space-between", marginTop: 20 }}>
                    <Pressable style={{ marginTop: 5, marginRight: 10 }} onPress={() => navigation.openDrawer()}>
                        <Image source={Icon.menu} style={{ paddingRight: 15 }} />
                    </Pressable>
                    <Image source={Icon.flat_logo} style={{}} />
                </View>
                <View style={{ flexDirection: "row", width: "12%", justifyContent: "space-between", marginTop: 20 }}>
                    <Pressable onPress={() => { }}>
                        <Image source={Icon.notification} style={{ height: 20, width: 15 }} />
                    </Pressable>
                    <Pressable onPress={() => { }}>
                        {/* <Image source={Icon.profile} style={{ height: 20, width: 15 }} /> */}
                    </Pressable>
                </View>
            </View>
        )
    }
    const renderServices = () => {
        return (
            <>
                <View style={{ marginTop: 25, marginHorizontal: 20 }}>
                    <AppText
                        size={20}
                        title={"Services"}
                        color={Colors.newTextColor}
                        fontWeight="bold"
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('CostEstimator',{
                    userId: authData.userId,
                })} style={[styles.cost, styles.elevation]}>
                    <Image resizeMode='contain' source={Icon.costCalculator} style={[styles.image]} />
                    <AppText
                        title={Language.costCalculator.substring(0, 18)}
                        bold
                        color={Colors.newTextColor}
                        width={"70%"}
                        size={20}
                        fontWeight="600"
                    />
                    <Feather
                        style={{ borderRadius: 100 }}
                        name="arrow-right"
                        size={22}
                        color={Colors.white}
                    />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', paddingTop: 0, }}>
                    <Horizontalcard  text={Language.floorPlan} onPress={() => navigation.navigate('floorPlanStack',{userId: authData.userId,})} />
                    <Horizontalcard text={Language.floorPlanApproval} onPress={() => navigation.navigate('ApprovalStack',{userId: authData.userId,})} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Horizontalcard  text={Language.lops} onPress={() => navigation.navigate('lopsStack',{userId: authData.userId,})} />
                    <Horizontalcard  text={Language.byLaws} onPress={() => navigation.navigate('byLawsStack',{userId: authData.userId,})} />
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 0 }}>
                    <Horizontalcard text={Language.consultancy} onPress={() => navigation.navigate('consultancyStack', { val: "consultancy"})} />
                    <Horizontalcard text={Language.soilTesting} onPress={() => { navigation.navigate('soilTesting',{userId: authData.userId,}) }} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('FAQs')} style={[styles.faqs, styles.elevation]}>
                    <AppText
                        textAlign={"center"}
                        alignSelf={"center"}
                        title={Language.faqstag.substring(0, 18)}
                        bold
                        color={Colors.newTextColor}
                        width={"100%"}
                        size={20}
                        fontWeight="600"
                    />

                </TouchableOpacity>
            </>
        )
    }
    const renderTopNews = () => {
        return (
            <Swiper style={{ height: 160 }} autoplay autoplayTimeout={10}
                dot={
                    <View style={{ backgroundColor: '#D9D9D9', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />
                }
                activeDot={
                    <View style={{ backgroundColor: "#FFFFFF", width: 15, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />
                }
            >
                {flowData && flowData.length > 0 ? flowData.map((item, i) => <ImageBackground key={i}
                    source={Background.service_background}
                    style={{ height: 150, marginHorizontal: 2 }} >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: "50%", paddingHorizontal: 10, marginTop: 20, }}>
                            <AppText
                                size={15}
                                title={item?.title}
                                color={"#fff"}
                                bold
                                textTransform="uppercase"
                            />
                            <AppText
                                marginTop={1}
                                size={11}
                                title={`${item?.description.slice(0, 90)} ...`}
                                color={"#fff"}
                            />
                        </View>
                        <View style={{ width: "40%", alignItems: "flex-end", justifyContent: "center", height: 150 }}>
                            <Image
                                source={{ uri: `${imgUrl}/${item.logo}` }}
                                style={{ width: "95%", height: 90 }} />
                        </View>

                    </View>
                </ImageBackground>
                ) :
                    <ImageBackground
                        source={Background.service_bg}
                        style={{ height: 150, marginHorizontal: 2 }} >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: "50%", paddingHorizontal: 10, marginTop: 20, }}>
                                <AppText
                                    size={15}
                                    title={"Title News"}
                                    color={"#fff"}
                                    bold
                                    textTransform="uppercase"
                                />
                                <AppText
                                    marginTop={1}
                                    size={11}
                                    title={`News Description ...`}
                                    color={"#fff"}
                                />
                                <View style={{ backgroundColor: "rgba(255,255,255,.2)", paddingVertical: 5, width: "60%", alignItems: "center", marginTop: 10, borderRadius: 5 }}>
                                    <AppText
                                        size={14}
                                        title={"Order Now"}
                                        color={"#fff"}
                                    />
                                </View>

                            </View>
                            <View style={{ width: "40%", alignItems: "flex-end", justifyContent: "center", height: 150 }}>
                                <Image
                                    // source={{ uri: `${flowUrl}/${item.logo}` }}
                                    source={Icon.service_icon}
                                    style={{ width: "95%", height: 90 }} />
                            </View>

                        </View>
                    </ImageBackground>
                }
            </Swiper>
        )
    }

    return (
        <SafeAreaView style={styles.container} >
            {renderHeader()}
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderTopNews()}
                {renderServices()}
                <View style={{ marginTop: 1, marginBottom: 20, marginHorizontal: 20 }}>
                    <AppText
                        size={20}
                        title={"Trending Designs"}
                        color={Colors.newTextColor}
                        fontWeight="bold"
                    />
                </View>
                <Slider />


            </ScrollView>
            {/* <PickupModal
                visible={true}
            /> */}
        </SafeAreaView>
    )
}

export default Home
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({

    cost: {
        backgroundColor: Colors.lightYello,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: width / 1.1,
        height: 75,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 5,
        flexDirection: "row",
        paddingHorizontal: 0,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 4,
        borderRightWidth: 2,
        borderColor: "rgba(0,0,0,.04)",
        borderBottomColor: "rgba(0,0,0,.04)",
    },
    faqs: {
        backgroundColor: Colors.lightYello,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: width / 1.1,
        height: 60,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 5,
        flexDirection: "row",
        paddingHorizontal: 0,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderColor: "rgba(0,0,0,.04)",
        borderBottomColor: "rgba(0,0,0,.04)",
    },
    image: {
        width: "20%",
        height: 40,
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 5,
        backgroundColor: "#fff"
    },
    modalBody: {
        height: 260,
        width: '95%',
        marginTop: "50%",
        backgroundColor: '#fff',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },


    topHeader: {
        marginHorizontal: -10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    row: { flexDirection: 'row' },


})