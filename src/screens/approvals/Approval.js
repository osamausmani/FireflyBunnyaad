import { StyleSheet, View, Image, FlatList, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppText from '../../component/appComponnet/AppText'
import ModuleCard from '../../component/tabComponent/ModuleCard'
import Feather from 'react-native-vector-icons/Feather';
import Language from '../../languages/Language'
import { Background, Colors, Images } from '../../constants'
import { PostRequest } from '../../api/axios'
import { getSocietysDDLApi } from '../../api/apiEndPoint'
import AppOptionText from '../../component/appComponnet/AppOptionText';
import { AppContext } from '../../contextApi/AppProvider';





const Approval = ({ navigation }) => {

    const { approvalRelationIds, setApprovalRelationIds } = useContext(AppContext)

    const [isEnglish, SelectLanguage] = useState(true)
    const [selectedItem, setSelectedItem] = useState(null)
    const [showIndicator, setShowIndicator] = useState(true);
    const [societyList, setSocietyList] = useState([]);


    useEffect(() => {
        getAllSocieties()
    }, []);

    const getAllSocieties = async () => {

        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "en",
                "ip": "string",
                "responseState": 200,
                "society": {
                    "societyId": 0,
                    "logo": "string",
                    "createdAt": "2022-12-26T07:01:01.314Z",
                    "updatedAt": "2022-12-26T07:01:01.314Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 0,
                    "displayForId": 1
                },
            }
            PostRequest(getSocietysDDLApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    setSocietyList(res.societyDDL)
                    console.log("res", JSON.stringify(res.societyDDL, null, 2));
                }
            }
            )
        } catch (error) {
            console.log(error);
        }

    }
    const onSelectedItem = (item) => {
        console.log(item, "find item");
        setSelectedItem(item)
        setApprovalRelationIds({ ...approvalRelationIds, societyID: item !== null ? item.id : 0 })
    }


    // render  comonents
    const renderHeader = () => {
        return (
            <ImageBackground source={Background.approal_bg} style={{ height: 250, alignItems: "center" }} >
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ width: "50%", paddingHorizontal: 10, marginTop: 10, }}>
                        <TouchableOpacity onPress={() => navigation.replace("AppStack")} style={{ backgroundColor: "rgba(255,255,255,.2)", width: 30, height: 30, alignItems: "center", justifyContent: "center", marginTop: 10, borderRadius: 80, overflow: "hidden" }}>
                            <Feather
                                style={{ borderRadius: 100 }}
                                name="arrow-left"
                                size={18}
                                color="#fff"
                            />
                        </TouchableOpacity>
                        <AppText
                            title={"MAP APPROVALS"}
                            marginTop={8}
                            size={16}
                            color={"#fff"}
                            fontWeight="600"
                            textTransform="uppercase"
                        />
                        <AppText
                            title={`Get Map approvals services of residential plot from society or any other government body to start construction`.slice(0, 200) + '.'}
                            marginTop={8}
                            size={15}
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
                            title={"Select Your Society/Area"}
                            dataa={societyList}
                            navigation={navigation}
                            nextScreen={"Approvallist"}
                            selectedItem={selectedItem}
                            onSelectedItem={onSelectedItem}
                            filter
                        />
                    }
                </View>
            </View>
        </View>
    )
}

export default Approval

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