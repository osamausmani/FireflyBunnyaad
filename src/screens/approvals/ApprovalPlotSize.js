import { StyleSheet, View, Image, FlatList, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppText from '../../component/appComponnet/AppText'
import ModuleCard from '../../component/tabComponent/ModuleCard'
import Feather from 'react-native-vector-icons/Feather';
import Language from '../../languages/Language'
import { Background, Colors, Images } from '../../constants'
import { PostRequest } from '../../api/axios'
import { getPlotSizesDDLApi } from '../../api/apiEndPoint'
import AppOptionText from '../../component/appComponnet/AppOptionText';
import LinearGradient from 'react-native-linear-gradient';
import CustomeDropDown from '../../component/customeDrawer/CustomeDropDown';
import { AppContext } from '../../contextApi/AppProvider';




const ApprovalPlotSize = ({ navigation }) => {
    const { approvalRelationIds, setApprovalRelationIds } = useContext(AppContext)

    const [isEnglish, SelectLanguage] = useState(true)
    const [developmentAuthorities, setDevelopmentAuthorities] = useState([])

    const [showIndicator, setShowIndicator] = useState(true);
    const [plotsList, setPlotsList] = useState([]);

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
        setApprovalRelationIds({ ...approvalRelationIds, plotSizeID: item !== null ? item.id : 0 })
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
            </ImageBackground>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <View style={{ flex: 1, marginTop: 0, }}>
                <View style={{ flex: 1, marginTop: 30 }}>
                    <AppText
                        color={Colors.fieldPlaceholderColor}
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
                                    title={"Go Back"}
                                    size={18}
                                />
                            </TouchableOpacity>
                            <LinearGradient colors={['#D9D9D9', '#959595']} style={styles.nextBtn} >
                                <TouchableOpacity style={styles.nextBtn} onPress={() => navigation.navigate("ApprovalFloors")}>
                                    <AppText
                                        title={"Next"}
                                        size={18}
                                        color={"#fff"}
                                    />
                                </TouchableOpacity>
                            </LinearGradient>

                        </View>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default ApprovalPlotSize

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
        borderColor: Colors.lightblack,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        width: 120,
        height: 50
    },
    nextBtn: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        width: 120,
        height: 50
    }

})
