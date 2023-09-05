import { Dimensions, StyleSheet, View, Image, ActivityIndicator, ScrollView, TouchableOpacity, Pressable, Alert, Text } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppText from '../../../component/appComponnet/AppText'
import AppSubmitButton from '../../../component/appComponnet/AppSubmitButton';
import { getAllFloorPlansApi, imgUrl, PostRequest } from '../../../api/apiEndPoint';
import { AppContext } from '../../../contextApi/AppProvider'
import { Icon, Colors, Images } from '../../../constants';

const FloorSelectPayment = ({ navigation, route, }) => {
    // const { costId, file, homeFinanceFile } = route.params
    // console.log(file, "filePath");
    const [paymentMethod, setPaymentMethod] = useState({
        promoCode: false,
        easypaisa: false
    })
    const handlePaymentMethod = (key, value,) => {
        setPaymentMethod(prev => {
            if (key == 'promoCode') {
                return ({
                    promoCode: !prev.promoCode,
                    easypaisa: false
                })
            }
            else if (key == 'easypaisa') {
                return ({
                    promoCode: false,
                    easypaisa: !prev.easypaisa
                })
            }
            else {
                paymentMethod
            }

        })

    }

    const handleProceed = () => {
        if (paymentMethod.promoCode === true) {
          navigation.navigate("PromoScreen");
        } else if (paymentMethod.easypaisa === true) {
          navigation.navigate("paymentScreen");
        }
      };

    const download = (item) => {
        console.log(item);

        // let extension = item.split('.').pop();
        // RNFetchBlob
        //     .config({
        //         addAndroidDownloads: {
        //             description: "file",
        //             useDownloadManager: true,
        //             notification: true,
        //             path: RNFetchBlob.fs.dirs.DownloadDir + "file_" + extension
        //         },
        //         fileCache: true,
        //     })
        //     .fetch('GET', item, {
        //         //some headers ..
        //     })
        //     .then((res) => {
        //         // the temp file path
        //         console.log('The file saved to ', res.path())
        //     }).catch(e => console.log(e))







    }

    // render components 
    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
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
            <View>
                <AppText
                    title={"Select Payment Method"}
                    bold
                    color={Colors.fieldTextColor}
                    alignSelf={"center"}
                    size={18}
                    marginVertical={30}
                />
                {/* <TouchableOpacity style={[styles.contanier]} onPress={() => {
                    handlePaymentMethod('promoCode', !paymentMethod.promoCode)
                    // navigation.navigate("ApprovalCategory", {
                    //     isResidential: false,
                    //     authority
                    // })
                }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", height: 80 }}>
                        <Image resizeMode='contain' source={Images.promoCode} style={[styles.image,]} />
                    </View>
                    <Image source={paymentMethod.promoCode ? Icon.fill_radio : Icon.unfil_radio} style={{ width: 22, height: 22 }} />

                </TouchableOpacity> */}

                <TouchableOpacity style={[styles.contanier]} onPress={() => {
                    handlePaymentMethod('promoCode', !paymentMethod.easypaisa)
                    // navigation.navigate("ApprovalCategory", {
                    //     isResidential: false,
                    //     authority
                    // })
                }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", height: 80 }}>
                    <Image resizeMode='contain' source={Images.promoCode} style={[styles.promoimage,]} />

                    <AppText
                    title={"Use Promo Code"}
                    bold
                    color={Colors.lightblack}
                    alignSelf={"center"}
                    size={18}
                    marginVertical={30}
                />
                        
                    </View>
                    
                    <Image source={paymentMethod.promoCode ? Icon.fill_radio : Icon.unfil_radio} style={{ width: 22, height: 22 }} />

                </TouchableOpacity>

                
                <TouchableOpacity style={[styles.contanier]} onPress={() => {
                    handlePaymentMethod('easypaisa', !paymentMethod.promoCode)
                    // navigation.navigate("ApprovalCategory", {
                    //     isResidential: false,
                    //     authority
                    // })
                }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", height: 80 }}>

                        <Image resizeMode='contain' source={Images.payNow} style={[styles.paynowimage,]} />
                        <AppText
                    title={"Pay Now"}
                    bold
                    color={Colors.lightblack}
                    alignSelf={"center"}
                    size={1}
                    marginVertical={15}
                />
                        
                    </View>
                    
                    <Image source={paymentMethod.easypaisa ? Icon.fill_radio : Icon.unfil_radio} style={{ width: 22, height: 22 }} />

                </TouchableOpacity>

                <AppSubmitButton
                onPress={()=> handleProceed()}
                    // onPress={() => {
                    //     // download(file)
                    //     navigation.navigate("downloadScreen")
                    //     // navigation.navigate("banklist", {
                    //     //     costId: costId == undefined ? 0 : costId,
                    //     //     file: file ? file : ""
                    //     // })
                    // }}
                    marginVertical={20}
                    name={"Proceed"}

                />
            </View>

            {/* <ModalSignIn
                visible={showLoginModal}
                onCancel={() => setShowLoginModal(false)}
            />
            <ModalSignup
                visible={showSignUpModal}
                onCancel={() => setShowSignUpModal(false)}
            />
            <ModalOtp
                visible={showOtpModal}
                onCancel={() => setShowOtpModal(false)}
            /> */}

        </View>
    )
}

export default FloorSelectPayment

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
    promoimage: {
        width: 90,
        height:60,
    },
    paynowimage: {
        width: 110,
        height:120,
        marginTop:13,
        textAlign:'center',
    },
})