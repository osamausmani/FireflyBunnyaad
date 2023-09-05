import { StyleSheet, View, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, Alert, Text } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppText from '../../../component/appComponnet/AppText'
import { getRawMaterialByCategoryIDApi, getRawMaterialByFloorPlansApi } from '../../../api/apiEndPoint';
import { PostRequest } from '../../../api/axios';
import { AppContext } from '../../../contextApi/AppProvider'
import { Colors } from '../../../constants';
import ModalCostSave from '../../../component/appModal/ModalCostSave';
import ModalSignIn from '../../../component/appModal/ModalSignIn';
import { ScrollView } from 'react-native-gesture-handler';

const SelectFinishingMaterial = ({ navigation,route }) => {
    const { setFinishingList ,authData} = useContext(AppContext)
    const [showIndicator, setShowIndicator] = useState(true);
    const [rawMaterialList, setRawMaterialList] = useState([]);
    const [showSaveProjectModal, setShowSaveProjectModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)


    const sortedRawMaterialList = rawMaterialList.sort((a, b) => a.rawMaterial.localeCompare(b.rawMaterial));
    useEffect(() => {
        getAllListMaterial()
    }, [route.params.floorPlanId]);

    const getAllListMaterial = async () => {
        const Model = {
            "userID": 0,
            "userKey": "string",
            "languageCode": "en",
            "ip": "string",
            "responseState": 200,

            "isPremium": true,
            "floorPlan": {
                "floorPlanId": route.params.floorPlanId,
                "isStandard": true,
                "createdAt": "2022-12-09T11:05:49.343Z",
                "updatedAt": "2022-12-09T11:05:49.343Z",
                "createdBy": 0,
                "updatedBy": 0,
                "dataStateId": 0
            }
        }
        PostRequest(getRawMaterialByFloorPlansApi, Model).then(res => {
            if (res === 0) {
                console.log("error");
                setShowIndicator(false)
            }
            else {
                setShowIndicator(false)
                setRawMaterialList(res.rawMaterials)
                setFinishingList(res.rawMaterials)
            }
        }
        )
    }

    // const renderItem = ({ item, i }) => {
    //     return (
    //         <View key={i} style={[styles.option]}>
    //             <AppText
    //                 color={Colors.fieldTextColor}
    //                 title={`${item.name} `}
    //                 textAlign={"left"}
    //                 size={14}
    //                 width={"80%"}
    //             />
    //         </View>
    //     );
    // };
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
    // navigation.replace("AppStack")
    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    showAlert()
                }}>
                    <AppText
                        marginLeft={"5%"}
                        size={20}
                        bold
                        title={"X"}
                        color="#fff"
                    />
                </TouchableOpacity>
                <AppText
                    marginLeft={"0%"}
                    bold
                    size={20}
                    title={"Cancel"}
                    color="#fff"
                />
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            {showIndicator ?
                <ActivityIndicator size={55} color={Colors.darkYellow} />
                :
                <ScrollView>
                    <View style={{ flex: 1, marginTop: 0 }}>

                        <View style={{ flex: 1, marginBottom: 5 }}>
                            <View >
                                <AppText
                                    color={Colors.darkgrey}
                                    title={"List of Finishing Material"}
                                    textAlign={"center"}
                                    margin={20}
                                    size={18}
                                    bold
                                />

                                <View style={{ backgroundColor: Colors.lightYello, flexDirection: 'row', width: "100%", marginTop: 5, paddingHorizontal: 30 }}>
                                    <View style={{ width: "56%", marginRight: 5 }}>
                                        <View style={{ backgroundColor: "transparent", paddingVertical: 10, alignItems: "flex-start", }}>
                                            <AppText
                                                title={"Material"}
                                                color={Colors.white}
                                                bold
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: "44%", paddingHorizontal: 5 }}>

                                        <AppText
                                            title={"Qunatity"}
                                            color={Colors.white}
                                            paddingVertical={10}
                                            width={"50%"}
                                            textAlign={"left"}
                                        />
                                        <AppText
                                            title={"Unit"}
                                            color={Colors.white}
                                            paddingVertical={10}
                                            paddingHorizontal={18}
                                            width={"50%"}
                                            textAlign={"left"}
                                        />

                                    </View>
                                </View>

                                {sortedRawMaterialList && sortedRawMaterialList.map((detail, i) => {
    return (
        <View
            key={i}
            style={[{ flexDirection: 'row', width: "100%", marginTop: 5, marginHorizontal: 30 },]}>
            <View style={{ width: "50%", marginRight: 5 }}>
                <View
                    style={[{ paddingVertical: 10, alignItems: "center", borderRadius: 10, flexDirection: "row" },]}>
                    <Text style={{ color: Colors.darkgrey }}>
                        {detail.rawMaterial}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', width: "40%", backgroundColor: "#fff", }}>
                <AppText
                    title={detail.quantity ? "****" : null}
                    color={Colors.fieldTextColor}
                    paddingVertical={10}
                    width={"50%"}
                />
                <AppText
                    title={detail.unit}
                    color={Colors.fieldTextColor}
                    paddingVertical={10}
                    width={"50%"}
                />
            </View>
        </View>
    );
})}




                            </View>

                        </View>



                        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
                            <View style={styles.btnContainer}
                            >
                                <TouchableOpacity style={styles.prvBtn} onPress={() => navigation.goBack()}>
                                    <AppText
                                        title={"Back"}
                                        size={18}
                                        color={Colors.black}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.nextBtn} onPress={() => {
                                    navigation.navigate("completeBoq",{
                                        
                                            image:route.params.image,
                                            invoiceData:route.params.invoiceData,
                                            structureData:route.params.structureData,
                                            totalAmount:route.params.totalAmount
                                        
                                    })
                                }}>
                                    <AppText
                                        title={"Continue to Summary"} 
                                        size={18}
                                        color={"#000"}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>}
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

export default SelectFinishingMaterial
const { height, width } = Dimensions.get('window')
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
    flatList: {
        height: height / 2,
        // flex: 1,
        paddingVertical: 0,
    },
    option: {
        padding: 20,
        paddingHorizontal: 50,
        borderWidth: 2,
        borderColor: Colors.fieldPlaceholderColor,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginHorizontal: 30,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    searchBar: {
        color: Colors.darkgrey,
        borderBottomColor: Colors.fieldPlaceholderColor,
        borderBottomWidth: 2,
        width: "80%",
        alignSelf: 'center',
        fontSize: 17
    },
    btnContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 30,
    },
    prvBtn: {
        borderWidth: 2,
        borderColor: Colors.silver_color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 100,
        backgroundColor:Colors.silver_color
        
    },
    nextBtn: {
        backgroundColor: Colors.buttonYellowColor,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 200
    }


})