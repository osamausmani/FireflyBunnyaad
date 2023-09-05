import { StyleSheet, View, Image, FlatList, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppText from '../../component/appComponnet/AppText'
import ModuleCard from '../../component/tabComponent/ModuleCard'
import Feather from 'react-native-vector-icons/Feather';
import Language from '../../languages/Language'
import { Background, Colors, Images } from '../../constants'
import { PostRequest } from '../../api/axios'
import { getFloorsDDLApi } from '../../api/apiEndPoint'
import AppOptionText from '../../component/appComponnet/AppOptionText';
import { AppContext } from '../../contextApi/AppProvider';





const ApprovalFloors = ({ navigation }) => {
    const { approvalRelationIds, setApprovalRelationIds } = useContext(AppContext)

    const [isEnglish, SelectLanguage] = useState(true)
    const [selectedItem, setSelectedItem] = useState(null)
    const [showIndicator, setShowIndicator] = useState(true);
    const [floorList, setFloorList] = useState([]);


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
                    console.log("res", JSON.stringify(res.floorDDL, null, 2));
                }
            }
            )
        } catch (error) {
            console.log(error);
        }

    }
    const onItemSelected = (item) => {
        console.log(item, "find item");
        setSelectedItem(item)
        setApprovalRelationIds({ ...approvalRelationIds, floorID: item !== null ? item.id : 0 })

    }
    // render  comonents
    const renderHeader = () => {
        return (
            <ImageBackground source={Background.approal_bg} style={{ height: 250, alignItems: "center" }} >
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ width: "50%", paddingHorizontal: 10, marginTop: 25, }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: "rgba(255,255,255,.2)", width: 30, height: 30, alignItems: "center", justifyContent: "center", marginTop: 10, borderRadius: 80, overflow: "hidden" }}>
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
                            title={"Approval Services"}
                            color={"#fff"}
                            bold
                            width={100}
                            textTransform="uppercase"
                        />
                        <AppText
                            marginTop={8}
                            size={12}
                            title={"Approvals Information with our smart and accurate System."}
                            color={"#fff"}
                        />
                    </View>
                    <View style={{ width: "45%", alignItems: "center", justifyContent: "center", height: 250 }}>
                        <Image source={Images.approval} style={{ width: 150, height: 150 }} />
                    </View>

                </View>
            </ImageBackground >
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <View style={{ flex: 1, marginTop: 0, }}>
                <View style={{ flex: 1, marginTop: 30 }}>
                    {showIndicator ?
                        <ActivityIndicator size={55} color={Colors.darkYellow} />
                        :
                        <AppOptionText
                            title={"No. of floors"}
                            dataa={floorList}
                            navigation={navigation}
                            nextScreen={"Approvallist"}
                            selectedItem={selectedItem}
                            onSelectedItem={onItemSelected}
                        />
                    }

                </View>
            </View>
        </View>
    )
}

export default ApprovalFloors

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
