


import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, Pressable, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import AppText from "../appComponnet/AppText"
import Colors, { background_grey, darkgrey, darkYellow, fieldPlaceholderColor } from '../../constants/Colors'
import { cross_icon } from "../../assets/path"
import { PostRequest } from '../../api/axios'
import { getCitysDDLApi, getetCustomQualityRawMaterialDetailsApi } from '../../api/apiEndPoint'
import { AppSubmitButton, Icon } from '../../constants'
import LinearGradient from 'react-native-linear-gradient';

const PickupModal = ({ visible, color, children, onPress, handlePlanChange, onPressContinue,floorPlanId }) => {
    // console.log(floorPlanId,'jsadasdasrdc')


    const [showIndicator, setShowIndicator] = useState(true);
    const [offerList, setCustomeOfferList] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState([])
    const [excavationAmount, setExcavationAmount] = useState('')
    

 

useEffect(() => {
      getCustomeOffers();
  }, [floorPlanId]);
  
  

    const getCustomeOffers = async () => {
        const Model = {
            "userID": 0,
            "userKey": "string",
            "languageCode": "en",
            "ip": "string",
            "responseState": 200,

            "floorPlan": {
                "floorPlanId": floorPlanId,
                "isStandard": true,
                "createdAt": "2022-10-12T09:54:33.489Z",
                "updatedAt": "2022-10-12T09:54:33.489Z",
                "createdBy": 0,
                "updatedBy": 0,
                "dataStateId": 0
            }
        }
        try {
            const res = await PostRequest(getetCustomQualityRawMaterialDetailsApi, Model);
            if (res === 0) {
              console.log("error");
              setShowIndicator(false);
            } else {
              setShowIndicator(false);
              setCustomeOfferList(res.rawMaterials);
        
              // Find the offer with rawMaterial equal to "Excavation"
              const excavationOffer = res.rawMaterials.find(
                (offer) => offer.rawMaterial === 'Excavation'
              );
        
              if (excavationOffer) {
                // Set the default selection for the excavation offer
                setExcavationAmount(excavationOffer.rawMaterials[0]?.amount || '');
                handleSelectedOffer(excavationOffer.rawMaterials[0]);
              }
            }
          } catch (error) {
            console.log("error", error);
            setShowIndicator(false);
          }
    }

    const handleSelectedOffer = (detail) => {
        if (selectedOffer.length <= 0) {
            setSelectedOffer([...selectedOffer, detail])
        }
        else {
            const checkPrevAdd = selectedOffer.some(item => item.rawMaterial === detail.rawMaterial)
            if (!checkPrevAdd) {
                setSelectedOffer([...selectedOffer, detail])
            }
            else {
                const newdata = []
                const filterData = selectedOffer.filter(item => item.rawMaterial !== detail.rawMaterial)
                filterData.map(item => newdata.push(item))
                newdata.push(detail)
                setSelectedOffer(newdata)
            }

        }
    }
    const showToastMessage = () => {
        ToastAndroid.show(
            "Some Field is Missing.",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            65,
            50
        );
    };
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={styles.modalContainer}>
                <View style={{ marginVertical: 20, alignItems: "center", position: "relative" }}>
                    <Pressable
                        onPress={() => {
                            onPress()
                            handlePlanChange(selectedOffer)
                        }}
                        style={{
                            backgroundColor: Colors.lightYello,
                            padding: 5,
                            borderRadius: 50,
                            alignSelf: "flex-end",
                            marginRight: 15,
                            marginTop: -10
                        }}>
                        <Image source={cross_icon} style={{ width: 15, height: 15 }} />
                    </Pressable>
                    <AppText
                        title={"Construction Quantity"}
                        size={18}
                        color={"#000"}
                        bold
                    />
                    <AppText
                        title={"Pick your own Material"}
                        size={14}
                        marginTop={5}
                        color={Colors.lightYello}
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, alignItems: "center", marginBottom: 10 }}>
                    <AppText
                        title={"Total Cost"}
                        size={16}
                        bold
                    />
                    <AppText
                        title={selectedOffer?.reduce((accumulator, object) => {
                            return accumulator + object.amount;
                        },0)}
                        bold
                    />

                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[color ? { backgroundColor: color } : {}]}>
                    <View style={{ marginHorizontal: 10 }}>
                        {
                            offerList?.map((offer, i) => {
                                // setTotalCost([])
                                
                              
                                return (
                                    <View key={i} style={{ marginBottom: 20 }}>
                                        <View style={{ backgroundColor: Colors.lightYello, alignItems: "center", padding: 10, borderRadius: 10 }}>
                                            <AppText
                                                title={offer.rawMaterial}
                                                color={"#fff"}
                                                size={18}
                                            />
                                        </View>

                                        <View style={{ flexDirection: 'row', width: "100%", marginTop: 5 }}>
                                            <View style={{ width: "35%", marginRight: 5 }}>
                                                <TouchableOpacity style={{ backgroundColor: "transparent", paddingVertical: 10, alignItems: "center", }}>
                                                    <AppText
                                                        title={"Quality"}
                                                        color={Colors.fieldTextColor}
                                                        bold
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: 'row', width: "65%", paddingHorizontal: 5 }}>

                                                <AppText
                                                    title={"Quantity"}
                                                    color={Colors.fieldTextColor}
                                                    paddingVertical={10}
                                                    width={"30%"}
                                                    textAlign={"left"}
                                                />
                                                <AppText
                                                    title={"Rate / Unit"}
                                                    color={Colors.fieldTextColor}
                                                    paddingVertical={10}
                                                    width={"40%"}
                                                />
                                                <AppText
                                                    title={"Amount"}
                                                    color={Colors.fieldTextColor}
                                                    paddingVertical={10}
                                                    width={"25%"}
                                                />
                                            </View>
                                        </View>
                                        {offer.rawMaterials?.map((detail, i) => {
                                            const checkSeleted = selectedOffer?.some(item => item.rawMaterial === detail.rawMaterial && item.rawMaterialQualityId === detail.rawMaterialQualityId)
                                            
                                            return (
                                                <View
                                                    key={i}
                                                    style={[{ flexDirection: 'row', width: "100%", marginTop: 5, },]}>
                                                    <View style={{ width: "35%", marginRight: 15 }}>
                                                        
                                                        {
                                                            detail.rawMaterial === "Excavation" ? (
                                                                <Text style={{ color: darkgrey,marginLeft:33 }}>
                                                                {
                                                                    detail.rawMaterialQuality

                                                                }
                                                                </Text>

                                                            )
                                                            :
                                                            <TouchableOpacity
                                                            onPress={() => handleSelectedOffer(detail)}
                                                            style={[{ marginRight: 30, paddingVertical: 10, alignItems: "center", borderRadius: 10, flexDirection: "row" },]}>
                                                            <Image source={checkSeleted ? Icon.fill_radio : Icon.unfil_radio } style={{ width: 25, height: 25, marginRight: 10 }} />
                                                            <Text style={{ color: darkgrey }}>
                                                                {
                                                                    detail.rawMaterialQuality

                                                                }
                                                            </Text>
                                                            {/* detail.rawMaterialQuality === "Premium" ? "A Graded" : detail.rawMaterialQuality == "Standard" ? "B" : "C" */}
                                                            </TouchableOpacity>

                                                        }
                                                        
                                                       
                                                    </View>
                                                    <View style={{ flexDirection: 'row', width: "70%", backgroundColor: "#fff", paddingHorizontal: 5 }}>
                                                        {/* <AppText
                                                            title={detail.unit}
                                                            color
                                                            paddingVertical={10}
                                                            width={"26%"}
                                                        /> */}
                                                        <AppText
                                                            title={
                                                                detail.quantity ? "****" : null
                                                                // "******"
                                                            }
                                                            color={Colors.fieldTextColor}
                                                            paddingVertical={10}
                                                            width={"30%"}
                                                        />
                                                        <AppText
                                                            // title={`${detail.rate}/${detail.unit}`}
                                                            title={"*****"}
                                                            color={Colors.fieldTextColor}
                                                            paddingVertical={10}
                                                            width={"35%"}
                                                        />
                                                        <AppText
                                                            title={detail.amount}
                                                            color={Colors.fieldTextColor}
                                                            paddingVertical={10}
                                                            width={"40%"}
                                                        />
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                )
                            })
                        }
                        <View style={styles.footer}>
                            <View style={styles.btnContainer}
                            >
                                <TouchableOpacity style={styles.prvBtn} onPress={() => {
                                    onPress()
                                    handlePlanChange(selectedOffer)
                                }}>
                                    <AppText
                                        title={"Back"}
                                        size={17}
                                        color={Colors.lightblack}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (selectedOffer.length < 3) {
                                            showToastMessage()
                                        }
                                        else {
                                            onPress()
                                            onPressContinue(selectedOffer)
                                        }
                                    }}>
                                    <LinearGradient colors={['#EFAF0F', '#EFAF0F']} style={styles.nextBtn}>
                                        <AppText
                                            title={"Continue to Summary"}
                                            size={17}
                                            color={"#000"}
                                        />
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>

        </Modal>
    )
}

export default PickupModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        marginHorizontal: 15,
        backgroundColor: '#fff',
        // alignItems: 'center',
        textAlign: 'center',
        borderRadius: 15,

    },
    btnContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 0
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
    },
    prvBtn: {
        borderWidth: 1,
        borderColor: Colors.silver_color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 120,
        backgroundColor:Colors.silver_color,
    },
    nextBtn: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: "100%"
    }
})