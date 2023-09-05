


import { StyleSheet, View, Pressable, Image, FlatList, ImageBackground, TouchableOpacity, PermissionsAndroid, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AppText, Background, Colors, Icon, Images } from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Language from '../../languages/Language'
import { PostRequest } from '../../api/axios'
import { getAllApprovalsApi, getAllBilosApi, imgUrl } from '../../api/apiEndPoint'
import LottieLoader from '../../component/customeDrawer/LottieLoader'
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";

const ByLawsCategory = ({ navigation,route }) => {

    const {developmentAuthorityId } = route.params
    const [approvalList, setApprovalList] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        getAllByLawsList()

        // return () => {
        //     setLoader(false)
        // };
    }, []);

    const getAllByLawsList = async () => {

        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "en",
                "ip": "string",
                "responseState": 200,
                "bilos": {
                    "bilosId": 0,
                    "logo": "string",
                    "isResidential": true,
                    "createdAt": "2022-12-26T13:07:53.556Z",
                    "updatedAt": "2022-12-26T13:07:53.556Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 0,
                    "name": "string",
                    "description": "string",
                    "developmentAuthorityId": developmentAuthorityId
                }
            }
            PostRequest(getAllBilosApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    // setShowIndicator(false)
                }
                else {
                    // setShowIndicator(false)
                    // const newData = res.bilosList?.filter(item => item.isResidential == isResidential)
                    setApprovalList(res.bilosList)
                    // console.log("res", JSON.stringify(newData, null, 2));
                    console.log("res", JSON.stringify(res, null, 2));
                }
            }
            )
        } catch (error) {
            console.log(error);
        }


    }




    // render list 
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
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            {renderHeader()}
            <View style={{ flex: 1, marginTop: 0, }}>
                <LottieLoader
                    visible={loader}
                    clickHide={() => setLoader(false)}
                />

                <FlatList
                    style={{ marginTop: 25, flex: 1, marginHorizontal: 10 }}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    data={approvalList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={[styles.contanier]} onPress={() => {
                            // askPermission(item)
                            navigation.navigate("BylawsDetail", {
                                detail: item
                            })
                        }}>
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", height: 80 }}>
                                <Image resizeMode='contain' source={Icon.approval_icon} style={[styles.image,]} />
                                <AppText
                                    title={item.name}
                                    bold
                                    marginHorizontal={20}
                                    color={Colors.fieldTextColor}
                                />
                            </View>
                            <AntDesign
                                style={{ borderRadius: 100 }}
                                name="rightcircle"
                                size={18}
                                color={Colors.filedBgColor}
                            />

                        </TouchableOpacity>
                    )}
                    keyExtractor={item => `approval-${item.approvalId}`}
                />
            </View>
        </View>
    )
}

export default ByLawsCategory

const styles = StyleSheet.create({
    header: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightYello,
        paddingHorizontal: 40
    },
    contanier: {
        width: '95%',
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
