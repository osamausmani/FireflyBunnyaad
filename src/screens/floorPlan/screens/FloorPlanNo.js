
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, Alert, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppText from '../../../component/appComponnet/AppText'
import AppOptionText from '../../../component/appComponnet/AppOptionText'
import { getFloorsDDLApi } from '../../../api/apiEndPoint';
import { PostRequest } from '../../../api/axios';
import { AppContext } from '../../../contextApi/AppProvider'
import { Background, Colors, Images } from '../../../constants';
import ModalCostSave from '../../../component/appModal/ModalCostSave';
import ModalSignIn from '../../../component/appModal/ModalSignIn';
import Feather from 'react-native-vector-icons/Feather';
const FloorPlanNo = ({ navigation,route }) => {

    const { floorRelationIds, setFloorRelationIds, authData, setUserData } = useContext(AppContext)
    const [selectedItem, setSelectedItem] = useState(null)
    const [showIndicator, setShowIndicator] = useState(true);
    const [floorList, setFloorList] = useState([]);
    const [filterfloorList, setFilterfloorList] = useState([]);
    const [showSaveProjectModal, setShowSaveProjectModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)

    const id ={
        userId:route.params.userId.userId,
        cityId:route.params.userId.cityId,
        areaid:route.params.userId.areaid,
        plotsizeid:route.params.userId.plotsizeid,
        plotCatagoryId:route.params.userId.plotCatagory.id,
        floorId: selectedItem

    }


    useEffect(() => {
        getAllFloors()
    }, []);

    const getAllFloors = async () => {
        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "en",
                "ip": "string",
                "responseState": 200,

                "floor": {
                    "floorId": 0,
                    "isStandard": true,
                    "createdAt": "2022-10-10T12:13:16.162Z",
                    "updatedAt": "2022-10-10T12:13:16.162Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 0
                }
            }
            PostRequest(getFloorsDDLApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    setFloorList(res.floorDDL)
                    // console.log("res", JSON.stringify(res.floorDDL, null, 2));
                    setFilterfloorList(res.floorDDL.filter(x=> x.id == '2' || x.id == '4'))
                }
            }
            )
        } catch (error) {
            console.log(error);
        }

    }
    const onItemSelected = (item) => {
        // console.log(item, "find item");
        setSelectedItem(item)
        setFloorRelationIds({ ...floorRelationIds, floorID: item !== null ? item.id : 0 })
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
            <ImageBackground source={Background.floorPlan_bg} style={{ height: 250, alignItems: "center" }} >
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ width: "55%", paddingHorizontal: 10, marginTop: 10, }}>
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
            </ImageBackground>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <View style={{ flex: 1, marginTop: 15 }}>
                {showIndicator ?
                    <ActivityIndicator size={55} color={Colors.darkYellow} />
                    :
                    <AppOptionText
                        title={"No. of floors"}
                        dataa={route.params.userId.plotsizeid == '1' || route.params.userId.plotsizeid == '2' || route.params.userId.plotsizeid == '3' ? filterfloorList :floorList}
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

export default FloorPlanNo

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