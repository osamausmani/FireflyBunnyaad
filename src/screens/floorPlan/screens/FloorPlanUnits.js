import { StyleSheet, View, TouchableOpacity, ActivityIndicator, Alert, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppText from '../../../component/appComponnet/AppText'
import AppOptionText from '../../../component/appComponnet/AppOptionText'
import { getUnitsDDLApi } from '../../../api/apiEndPoint';
import { PostRequest } from '../../../api/axios';
import { AppContext } from '../../../contextApi/AppProvider'
import { Background, Colors, Images } from '../../../constants';
import ModalCostSave from '../../../component/appModal/ModalCostSave';
import ModalSignIn from '../../../component/appModal/ModalSignIn';
import Feather from 'react-native-vector-icons/Feather';
const FloorPlanUnits = ({ navigation }) => {

    const { floorRelationIds, setFloorRelationIds } = useContext(AppContext)

    const [selectedItem, setSelectedItem] = useState(null)
    const [showIndicator, setShowIndicator] = useState(true);
    const [unitList, setUnitList] = useState([]);

    const [showSaveProjectModal, setShowSaveProjectModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [showOtpUpModal, seetShowOtpUpModal] = useState(false)

    useEffect(() => {
        getAllUnits()
    }, []);

    const getAllUnits = async () => {
        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "en",
                "ip": "string",
                "responseState": 200,

                "unit": {
                    "unitId": 0,
                    "isStandard": true,
                    "createdAt": "2022-10-10T12:39:54.448Z",
                    "updatedAt": "2022-10-10T12:39:54.448Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 0
                }
            }
            PostRequest(getUnitsDDLApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    setUnitList(res.unitDDL)
                    // console.log("res", JSON.stringify(res.unitDDL, null, 2));
                }
            }
            )
        } catch (error) {

        }
    }
    const onItemSelected = (item) => {
        console.log(item, "find item");
        setSelectedItem(item)
        setFloorRelationIds({ ...floorRelationIds, unitID: item !== null ? item.id : 0 })
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

    const renderHeader = () => {
        return (
            <ImageBackground source={Background.floorPlan_bg} style={{ height: 200, alignItems: "center" }} >
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ width: "50%", paddingHorizontal: 10, marginTop: 25, }}>
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
                            marginTop={8}
                            size={18}
                            title={"FLOOR PLANS"}
                            color={"#fff"}
                            bold
                            width={100}
                            textTransform="uppercase"
                        />
                        <AppText
                            marginTop={8}
                            size={12}
                            title={"Floor Plan Information with our smart and accurate System."}
                            color={"#fff"}
                        />
                    </View>
                    <View style={{ width: "45%", alignItems: "center", justifyContent: "center", height: 250 }}>
                        <Image source={Images.floorPlan} style={{ width: 120, height: 120 }} />
                    </View>

                </View>
            </ImageBackground>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <View style={{ flex: 1, marginTop: 30 }}>
                {showIndicator ?
                    <ActivityIndicator size={55} color={Colors.darkYellow} />
                    :
                    <AppOptionText
                        title={"Number of Units"}
                        dataa={unitList}
                        navigation={navigation}
                        nextScreen={"floorPlanPlotSelection"}
                        selectedItem={selectedItem}
                        onSelectedItem={onItemSelected}
                    />
                }
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

export default FloorPlanUnits

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
})