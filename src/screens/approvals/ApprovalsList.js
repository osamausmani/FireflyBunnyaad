import { StyleSheet, View, Image, FlatList, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppText from '../../component/appComponnet/AppText'
import ModuleCard from '../../component/tabComponent/ModuleCard'
import Feather from 'react-native-vector-icons/Feather';
import Language from '../../languages/Language'
import { Background, Colors, Icon, Images } from '../../constants'
import { PostRequest } from '../../api/axios'
import { getAllApprovalsApi, getSocietysDDLApi } from '../../api/apiEndPoint'
import AppOptionText from '../../component/appComponnet/AppOptionText';
import { AppContext } from '../../contextApi/AppProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ApprovalsList = ({ navigation }) => {

    const { approvalRelationIds, setApprovalRelationIds } = useContext(AppContext)

    const [isEnglish, SelectLanguage] = useState(true)
    const [selectedItem, setSelectedItem] = useState(null)
    const [showIndicator, setShowIndicator] = useState(true);
    const [approvalList, setApprovalList] = useState([]);


    useEffect(() => {
        getAllApprovals()
        console.log(approvalRelationIds);
    }, []);

    const getAllApprovals = async () => {
        console.log(approvalRelationIds, "ids");
        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "en",
                "ip": "string",
                "responseState": 200,

                "approval": {
                    "approvalId": 0,
                    "logo": "string",
                    "isResidential": true,
                    "createdAt": "2022-12-26T09:38:11.766Z",
                    "updatedAt": "2022-12-26T09:38:11.766Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 0,
                    "name": "string",
                    "description": "string"
                },
                "approvalRelationList": [
                    {
                        "id": 0,
                        "approvalId": 0,
                        "societyId": approvalRelationIds.societyID,
                        "plotSizeId": 1,
                        "floorId": 1,
                        "dataStateId": 0
                    }
                ]
            }
            PostRequest(getAllApprovalsApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    setApprovalList(res.approvalList)
                    console.log("res", JSON.stringify(res.approvalList, null, 2));
                }
            }
            )
        } catch (error) {
            console.log(error);
        }

    }
    const onSelectedItem = (item) => {
        setSelectedItem(item)
        setApprovalRelationIds({ ...approvalRelationIds, societyID: item !== null ? item.id : 0 })
    }


    // render  comonents
    const renderHeader = () => {
        return (
            <ImageBackground source={Background.approal_bg} style={{ height: 250, alignItems: "center" }} >
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ width: "50%", paddingHorizontal: 10, marginTop: 10, }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: "rgba(255,255,255,.2)", width: 30, height: 30, alignItems: "center", justifyContent: "center", marginTop: 10, borderRadius: 80, overflow: "hidden" }}>
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
                            bold
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
            </ImageBackground>
        )
    }
  console.log(approvalList)

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <View style={{ flex: 1, marginTop: 0, }}>
                {/* {
                    !approvalList.length && <AppText
                        title={"No List Found for this Approvals  .."}
                        marginHorizontal={"20%"}
                        marginTop={"50%"}
                        color={Colors.fieldPlaceholderColor}
                    />
                } */}
                
                <FlatList
                    style={{ marginTop: 25, flex: 1, marginHorizontal: 10 }}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    data={approvalList && approvalList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={[styles.contanierList]} onPress={() => {
                            navigation.navigate("ApprovalCategory", {
                                details: item
                            })
                        }}>
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", height: 80 }}>
                                {/* <Image resizeMode='contain' source={Icon.approvals} style={[styles.image,]} /> */}
                                <AppText
                                    title={`${item.name.substring(0, 20)} ...`}
                                    bold
                                    fontSize={15}
                                    marginHorizontal={20}
                                    color={Colors.lightblack}
                                />
                            </View>
                            <AntDesign
                                style={{ borderRadius: 100 }}
                                name="rightcircle"
                                size={18}
                                color={Colors.lightblack}
                            />

                        </TouchableOpacity>
                    )}
                    keyExtractor={item => `approval-${item.approvalId}`}
                />
            </View>

        </View>
    )
}

export default ApprovalsList

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
    contanierList: {
        width: '96%',
        height: 80,
        backgroundColor: "#fff",
        marginHorizontal: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        flexWrap: 'wrap',
        overflow: 'hidden',
        alignItems: "center",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 5,
        borderRightWidth: 5,
        borderColor: "rgba(0,0,0,.06)",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5
    },

    image: {
        width: 35,
        height: 35,
    },
    logo: {
        width: 45,
        height: 45,
    }

})
