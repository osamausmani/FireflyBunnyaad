import { 
  Dimensions,
   StyleSheet, 
   View,
    Image, 
    ActivityIndicator, 
    ScrollView, 
    TouchableOpacity,
     Pressable,
      Alert, 
      Text,
      Modal,
    PermissionsAndroid,

     } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppText from '../../../component/appComponnet/AppText'
import AppSubmitButton from '../../../component/appComponnet/AppSubmitButton';
import { getAllFloorPlansApi, imgUrl, PostRequest } from '../../../api/apiEndPoint';
import { Icon, Colors, Images } from '../../../constants';
import {AppContext} from '../../../contextApi/AppProvider';






const PaymentScreen = ({ navigation, route, }) => {

  const {
    result,
    constructionData,
    floorPlanData,
    authData,
    costEstimateId,
    setCostEstimateId,
    downloadData,
    setDownloadData,
  } = useContext(AppContext);
    // const { file,totalAmount } = route.params

    const [paymentMethod, setPaymentMethod] = useState({
        jazzCash: false,
        easypaisa: false
    })

    // const askPermission = () => {
    //   async function requestExternalWritePermission() {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //         {
    //           title: 'Pdf creator needs External Storage Write Permission',
    //           message: 'Pdf creator needs access to Storage data in your SD Card',
    //         },
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         createPDF();
    //       } else {
    //         alert('WRITE_EXTERNAL_STORAGE permission denied');
    //       }
    //     } catch (err) {
    //       alert('Write permission err', err);
    //       console.warn(err);
    //     }
    //   }
    //   if (Platform.OS === 'android') {
    //     requestExternalWritePermission();
    //   } else {
    //     createPDF();
    //   }
    // };
  
    // const createPDF = async () => {
    //   let options = {
    //     //Content to print
    //     html: htmlContent,
    //     //File Name
    //     fileName: 'Report',
    //     //File directory
    //     directory: 'Download',
    //     base64: true,
    //   };
  

    //   // console.log(route.params.totalAmount.totalAmount,'total payment')
    //   // let file = await RNHTMLtoPDF.convert(options);
    //   // console.log(file, "file");
    //   // getUriToBase64(file.filePath).then(res => {
    //   //     // console.log(res)
    //   //     setSaveFile(res)
    //   // })
    //   setSaveFile(file.base64);
    //   // { file && openFile(file.filePath) }
    //   // Alert.alert('Successfully Exported', [
    //   //   { text: 'Cancel', style: 'cancel' },
    //   //   { text: 'Open', onPress: () => openFile(file.filePath) }
    //   // ], { cancelable: true });
    // };



    const handlePaymentMethod = (key, value,) => {
        setPaymentMethod(prev => {
            if (key == 'jazzCash') {
                return ({
                    jazzCash: !prev.jazzCash,
                    easypaisa: false
                })
            }
            else if (key == 'easypaisa') {
                return ({
                    jazzCash: false,
                    easypaisa: !prev.easypaisa
                })
            }
            else {
                paymentMethod
            }

        })
    }

    // const download = (item) => {
    //     console.log(item);

    //     // let extension = item.split('.').pop();
    //     // RNFetchBlob
    //     //     .config({
    //     //         addAndroidDownloads: {
    //     //             description: "file",
    //     //             useDownloadManager: true,
    //     //             notification: true,
    //     //             path: RNFetchBlob.fs.dirs.DownloadDir + "file_" + extension
    //     //         },
    //     //         fileCache: true,
    //     //     })
    //     //     .fetch('GET', item, {
    //     //         //some headers ..
    //     //     })
    //     //     .then((res) => {
    //     //         // the temp file path
    //     //         console.log('The file saved to ', res.path())
    //     //     }).catch(e => console.log(e)

    // }

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
                    handlePaymentMethod('jazzCash', !paymentMethod.jazzCash)
                    // navigation.navigate("ApprovalCategory", {
                    //     isResidential: false,
                    //     authority
                    // })
                }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", height: 80 }}>
                        <Image resizeMode='contain' source={Images.jazzCash} style={[styles.image,]} />
                    </View>
                    <Image source={paymentMethod.jazzCash ? Icon.fill_radio : Icon.unfil_radio} style={{ width: 22, height: 22 }} />

                </TouchableOpacity> */}

                <TouchableOpacity style={[styles.contanier]} onPress={() => {
                    handlePaymentMethod('jazzCash', !paymentMethod.easypaisa)
                    // navigation.navigate("ApprovalCategory", {
                    //     isResidential: false,
                    //     authority
                    // })
                }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", height: 80 }}>
                        <Image resizeMode='contain' source={Images.jazzCash} style={[styles.image,]} />
                        
                    </View>
                    
                    <Image source={paymentMethod.jazzCash ? Icon.fill_radio : Icon.unfil_radio} style={{ width: 22, height: 22 }} />

                </TouchableOpacity>

                
                <TouchableOpacity style={[styles.contanier]} onPress={() => {
                    handlePaymentMethod('easypaisa', !paymentMethod.jazzCash)
                    // navigation.navigate("ApprovalCategory", {
                    //     isResidential: false,
                    //     authority
                    // })
                }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", height: 80 }}>
                        <Image resizeMode='contain' source={Images.easypaisa} style={[styles.image,]} />
                        
                    </View>
                    
                    <Image source={paymentMethod.easypaisa ? Icon.fill_radio : Icon.unfil_radio} style={{ width: 22, height: 22 }} />

                </TouchableOpacity>

                <AppSubmitButton
                    onPress={() => {
                        // download(file)
                        navigation.navigate("BankDetails",{
                            costId: costEstimateId == undefined ? 0 : costEstimateId,
                            // file: file ? file : "",
                        })
                     
                    }}
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

              {/* Detail Modal===================================================== */}
    

      {/* Detail Modal===================================================== */}

        </View>
    )
}

export default PaymentScreen
const {height, width} = Dimensions.get('window');


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
    image: {
        width: 100,
        height: 40,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        flex:1,
        width:'100%',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: Colors.lightYello,
        padding:12,
        width:'75%',
        top:4
        // marginTop:120
        // bottom:32
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      boqData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      pdf: {
        backgroundColor: '#fff',
        flex: 1,
        // width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2.5,
        height:332,
        width:332
       
      },
      ElevationImg:{
        backgroundColor: '#fff',
        // flex: 1,
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height / 2.5,
        marginHorizontal:12,
        height:332,
        width:332
      }
})