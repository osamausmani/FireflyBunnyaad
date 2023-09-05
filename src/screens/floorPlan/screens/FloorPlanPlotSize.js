

import { StyleSheet, View, TouchableOpacity, Alert, ToastAndroid, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppText from '../../../component/appComponnet/AppText'
import CustomeDropDown from '../../../component/customeDrawer/CustomeDropDown';
import { PostRequest } from '../../../api/axios';
import { getPlotSizesDDLApi } from '../../../api/apiEndPoint';
import { AppContext } from '../../../contextApi/AppProvider'
import LinearGradient from 'react-native-linear-gradient';
import { Background, Colors, Images } from '../../../constants';
import ModalCostSave from '../../../component/appModal/ModalCostSave';
import ModalSignIn from '../../../component/appModal/ModalSignIn';
import Feather from 'react-native-vector-icons/Feather';

const FloorPlanPlotSize = ({ navigation,route }) => {

    const { floorRelationIds, setFloorRelationIds, authData, } = useContext(AppContext)

    const id ={
        userId:route.params.userId.userId,
        cityId:route.params.userId.cityId,
        areaid:route.params.userId.areaid.id,
        plotSizeId : floorRelationIds
    }

    const [showIndicator, setShowIndicator] = useState(true);
    const [plotsList, setPlotsList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(false)
    const [showSaveProjectModal, setShowSaveProjectModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [showOtpUpModal, seetShowOtpUpModal] = useState(false)


    useEffect(() => {
        getAllPlots()

    }, []);

    const getAllPlots = async () => {
        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "en",
                "ip": "string",
                "responseState": 200,

                "plotSize": {
                    "plotSizeId": 0,
                    "length": 0,
                    "width": 0,
                    "totalArea": 0,
                    "isStandard": true,
                    "measuringUnitId": 0,
                    "createdAt": "2022-10-10T11:25:37.130Z",
                    "updatedAt": "2022-10-10T11:25:37.130Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 0
                }

            }
            PostRequest(getPlotSizesDDLApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    setPlotsList(res.plotSizeDDL)
                    // console.log("res", JSON.stringify(res.plotSizeDDL, null, 2));
                }
            }
            )
        } catch (error) {
            console.log(error);
        }

    }
    const onItemSelected = (item) => {
        console.log(item, "find item");
        setFloorRelationIds({ ...floorRelationIds, plotSizeID: item.id })
        setSelectedItem(true)
    }


    const showAlert = () => {
        Alert.alert(
            "",
            "Do you want  to save this Project for later ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        authData?.isLogin ? setShowSaveProjectModal(true) : setShowLoginModal(true)

                    }
                }
            ]
        );
    }
    const showToastMessage = () => {
        ToastAndroid.show(
            "Please select first.",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            65,
            50
        );
    };

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
                            title={"FLOOR PLANS LIBRARY"}
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
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <View style={{ flex: 1, marginTop: 10 }}>
                <AppText
                    color={Colors.lightblack}
                    title={"Size of Plot ?"}
                    margin={20}
                    size={18}
                    bold
                    textAlign="center"
                />
                <CustomeDropDown label="Please Select size of Plot" dataa={plotsList} onSelect={onItemSelected} />
                <View style={styles.footer}>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.prvBtn} onPress={() => navigation.pop()}>
                            <AppText
                                color={Colors.lightblack}
                                title={"Previous"}
                                size={18}
                            />
                        </TouchableOpacity>
                        <LinearGradient colors={['#EFAF0F', '#EFAF0F']} style={styles.nextBtn} >
                            <TouchableOpacity style={styles.nextBtn} onPress={() => {
                                selectedItem ? navigation.navigate("floorPlanPlotCategory",{userId:id}) : showToastMessage()
                            }}>
                                <AppText
                                    title={"Next"}
                                    size={18}
                                    color={"#000"}
                                />
                            </TouchableOpacity>
                        </LinearGradient>


                    </View>
                </View>
            </View>

            {/* Show Modals */}
            <ModalCostSave
                visible={showSaveProjectModal}
                onCancelPress={() => setShowSaveProjectModal(false)}
                onPressOk={() => {
                    console.log("Save Project")
                    setShowSaveProjectModal(false)
                }}
            />
            <ModalSignIn
                visible={showLoginModal}
                onCancel={() => {
                    setShowLoginModal(false)
                    setShowSaveProjectModal(true);
                }}
            />


        </View>
    )
}

export default FloorPlanPlotSize

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
    btnContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 50
    },
    footer: {
        height: 80,
        justifyContent: 'center',
        marginBottom: 1,
        alignContent: "center",
        borderTopWidth: 4,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: "rgba(0,0,0,.06)",
        position: "absolute",
        bottom: 1,
        left: 0,
        width: "100%"
    },
    prvBtn: {
        borderWidth: 1,
        borderColor: Colors.silver_color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 120,
        height: 50,
        backgroundColor: Colors.silver_color
    },
    nextBtn: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 120,
        height: 50
    }
})