


import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, Alert, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { getAllConstructionQualitysApi, getRawMaterialDetailsByConstructionQualityApi, imgUrl, PostRequest } from '../../../api/apiEndPoint';
import PickupModal from '../../../component/appModal/PickupModal';
import QualityShowModal from '../../../component/appModal/QualityShowModal';
import { AppContext } from '../../../contextApi/AppProvider'
import { Icon, Colors, AppText } from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import CostEstimateHeader from '../../../component/appComponnet/CostEstimateHeader';

const SelectConstructionQuality = ({ navigation,route }) => {

    const { result, setResult, floorPlanData, constructionData, setContructionData, authData, setUserData } = useContext(AppContext)

    const [selectedItem, setSelectedItem] = useState(null)
    const [customSelected, setCustomSelected] = useState(null)
    const [showIndicator, setShowIndicator] = useState(true);
    const [constructionQualityList, setConstructionQualityList] = useState([]);
    const [showOfferModal, setShowOfferModal] = useState(false)
    const [showQualityModal, setShowQualityModal] = useState(false)
    const [showTitle, setShowTitle] = useState("")
    const [constructionId, setConstructionId] = useState(null)
    const [floorPlanId, setFloorPlanId] = useState(null)
    const [rawMaterialList, setRawMaterialList] = useState([]);
    const [allIdss, setAllIdds] = useState(false);
    const [eveImage, setEveImage]=useState(route.params?.allIds?.selectFloorId?.imagePath)
    const [floorPlanSetId, setFloorPlanSetId] = useState('')


    

    useEffect(() => {
        getAllConstructionQualitys()
        setAllIdds({idss : route.params?.allIds, selectedItem : selectedItem ? selectedItem : null})
        setFloorPlanSetId(route.params?.allIds?.selectFloorId?.floorPlanId)

    }, []);

    const handlePlanChange = (plan) => {
        setContructionData(plan)
    }

    const handleContinue = (plan) => {

        setContructionData(plan)
        navigation.navigate("BOQGreyStructure",{
            allIds:{allIdss},
            image : eveImage,
        })
    }
    

    const getAllConstructionQualitys = async () => {
        const Model = {
            "userID": 0,
            "userKey": "string",
            "languageCode": "en",
            "ip": "string",
            "responseState": 200,

            "constructionQuality": {
                "constructionQualityId": 0,
                "isStandard": true,
                "createdAt": "2022-10-11T13:10:38.471Z",
                "updatedAt": "2022-10-11T13:10:38.471Z",
                "createdBy": 0,
                "updatedBy": 0,
                "dataStateId": 0
            }
        }
        try {
            PostRequest(getAllConstructionQualitysApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    setConstructionQualityList(res.constructionQualityTextList)
                }
            }
            )
        } catch (e) {
            console.log(e);
        }

    }

    const getRawMateials = async (floorId, constructionId) => {
        const Model = {
            "userID": constructionId,
            "userKey": "string",
            "languageCode": "en",
            "ip": "string",
            "responseState": 200,

            "floorPlan": {
                "floorPlanId": floorId,
                "isStandard": true,
                "createdAt": "2022-10-12T12:14:24.031Z",
                "updatedAt": "2022-10-12T12:14:24.031Z",
                "createdBy": 0,
                "updatedBy": 0,
                "dataStateId": 0
            }
        }
        try {
            PostRequest(getRawMaterialDetailsByConstructionQualityApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    setRawMaterialList(res.rawMaterials)
                    setShowQualityModal(true)
                }
            }
            )
        }
        catch (e) {
            console.log(e);
        }

    }


    const onItemSelected = (item) => {
        // console.log("find item", "floor plan data", floorPlanData.floorPlanId, item);
        setSelectedItem(item)
        setResult({
            ...result,
            constructionQuality: item.name,
            constructionQualityId: item.constructionQualityId
        })
        setFloorPlanId(floorPlanData.floorPlanId)
        setConstructionId(item.constructionQualityId)
        getRawMateials(floorPlanData.floorPlanId, item.constructionQualityId)

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

    const renderItem = ({ item, i }) => {
        
        return (
            <TouchableOpacity onPress={() => {
                onItemSelected(item)
                setCustomSelected(null)
                setShowTitle(item.name)
                if (selectedItem !== null && selectedItem.constructionQualityId == item.constructionQualityId) {
                    setSelectedItem({})
                    // onSelectedItem(null)
                }
                else {
                    // onSelectedItem(item)
                    setSelectedItem(item)
                }

            }
            }
                key={i} style={[styles.option,
                selectedItem && selectedItem.constructionQualityId == item.constructionQualityId ? { borderRightWidth: 5, borderColor: Colors.darkYellow } : {}
                ]

                }>
                <Image source={{ uri: `${imgUrl}/${item.logo}` }} style={{ width: 20, height: 20 }} />
                <AppText
                    color={Colors.fieldTextColor}
                    title={`${item.name} `}
                    textAlign={"left"}
                    size={14}
                    bold={selectedItem && selectedItem.constructionQualityId == item.constructionQualityId ? true : false}
                    width={"80%"}
                />
                {selectedItem && selectedItem.constructionQualityId == item.constructionQualityId ? 
                <Image source={Icon.fill_radio} style={{ width: 20, height: 20 }} />
                : <Image source={Icon.unfil_radio} style={{ width: 20, height: 20 }} />}

            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <CostEstimateHeader
                authData={authData}
                result={result}
                navigation={navigation}
                percentage={"90"}
                constructionData={constructionData}

            />
            <View style={{ flex: 1, marginTop: 50 }}>
                {showIndicator ?
                    <ActivityIndicator size={55} color={Colors.darkYellow} />
                    :
                    <View style={{ flex: 1, marginBottom: 5 }}>
                        <View >
                            <AppText
                                color={Colors.darkgrey}
                                title={"Construction Quality"}
                                textAlign={"center"}
                                margin={20}
                                size={18}
                                bold
                            />
                            <FlatList
                                style={styles.flatList}
                                data={constructionQualityList}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setShowOfferModal(true)
                                    setSelectedItem(null)
                                    setCustomSelected("Custome Material")
                                    setResult({
                                        ...result,
                                        constructionQuality: "custome Quantity",
                                        constructionQualityId: 0
                                    })

                                }}
                                style={[styles.option, { marginHorizontal: 30, }, customSelected !== null ? { borderRightWidth: 5, borderColor: Colors.darkYellow } : {}]}>
                                <View style={{ flexDirection: 'row' }} >
                                    <Image source={Icon.edit_icon} style={{ width: 20, height: 20, marginRight: 20, }} />
                                    <AppText
                                        color={Colors.lightblack}
                                        title={"Pick Your Own Material"}
                                        size={14}
                                        bold
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                }
                <View style={styles.footer}>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.prvBtn} onPress={() => navigation.pop()}>
                            <AppText
                                color={Colors.lightblack}
                                title={"Go Back"}
                                size={18}
                            />
                        </TouchableOpacity>
                        {/* <LinearGradient colors={['#EFAF0F', '#EFAF0F']} style={styles.nextBtn} >
                            <TouchableOpacity style={styles.nextBtn} onPress={() => {
                                if (selectedItem !== null || customSelected !== null) {

                                    navigation.navigate("BOQGreyStructure",{
                                        allIds: allIdss ,
                                        selectedItem : selectedItem,
                                        image:eveImage
                                    }) 
                                }
                                else {
                                    showToastMessage()
                                }

                            }}>
                                <AppText
                                    title={"Next"}
                                    size={18}
                                    color={"#000"}
                                />
                            </TouchableOpacity>
                        </LinearGradient> */}


                    </View>
                </View>


                <QualityShowModal
                    visible={showQualityModal}
                    onPress={() => setShowQualityModal(false)}
                    floorPlanId={floorPlanId}
                    constructionId={constructionId}
                    title={showTitle}
                    list={rawMaterialList}
                    handlePlanChange={handlePlanChange}
                    navigation={navigation}
                    onPressContinue={handleContinue}
                />
                <PickupModal
                    floorPlanId={floorPlanSetId}
                    visible={showOfferModal}
                    onPress={() => setShowOfferModal(false)}
                    handlePlanChange={handlePlanChange}
                    onPressContinue={handleContinue}

                />
            </View>


        </View>
    )
}

export default SelectConstructionQuality
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
        paddingVertical: 0,
    },
    option: {
        padding: 15,
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