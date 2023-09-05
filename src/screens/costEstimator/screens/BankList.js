import { Alert, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, PermissionsAndroid, FlatList } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { AppSubmitButton, AppText, Colors, Icon } from '../../../constants'
import { PostRequest } from '../../../api/axios';
import { flowUrl, getBanksDDLApi, getHomeFinanceDocApi, updateClientCostEstimateQuestionsApi } from '../../../api/apiEndPoint';
import RNFS, { downloadFile } from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob'
import { AppContext } from '../../../contextApi/AppProvider';
import Icons from 'react-native-vector-icons/AntDesign'


const BankList = ({ navigation, route }) => {
    const { downloadData, setDownloadData } = useContext(AppContext)

    const { costId, file } = route.params
    // const file = ""
    // const costId = 1   //hard coded
    const { result } = useContext(AppContext)

    const [banklist, setBankList] = useState([]);
    const [showDrawing, setShowDrawing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null)

    const [showhomeFinanceQuestion, setShowhomeFinanceQuestion] = useState(true)
    const [showDiagramsQuestion, setshowDiagramsQuestion] = useState(false)
    const [homeFinanceFile, setHomeFinanceFile] = useState('')

    const [diagramData, setDiagramData] = useState([
        { id: 1, name: "submission Drawing", value: "true" },
        { id: 2, name: "Working Drawing ", value: "true" },
        { id: 3, name: "none", value: "false" },
    ])

    useEffect(() => {
        checkPermission()
    }, []);



    const onItemSelected = (item) => {
        if (selectedItem !== null && selectedItem.id == item.id) {
            setSelectedItem(null)
        }
        else {
            setSelectedItem(item)
        }
    }

    const checkPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage permission required',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the storage')

                } else {
                    Alert.alert('BUNNYAAD', 'You must allow to proceed further.')
                }
            } catch (err) {
                console.warn(err)
                return
            }
        }
        else {
        }

    }


    // const handleHomeDoc = async () => {
    //     try {
    //         const Model = {
    //             "userID": 0,
    //             "userKey": "string",
    //             "languageCode": "en",
    //             "ip": "string",
    //             "responseState": 200,

    //             "homeFinanaceModel": {
    //                 "floorPlanID": result.floorPlanId == 0 ? 1 : result.floorPlanId,
    //                 "bankID": selectedItem.id,
    //                 "bankName": "string",
    //                 "documentURL": "string"
    //             }
    //         }
    //         PostRequest(getHomeFinanceDocApi, Model).then(res => {
    //             if (res === 0) {
    //                 console.log("error");
    //             }
    //             else {
    //                 console.log("res", JSON.stringify(res, null, 2));
    //                 if (res.responseState == 200) {
    //                     download(`${flowUrl}/${res.homeFinanaceModel.documentURL}`)
    //                     setHomeFinanceFile(`${flowUrl}/${res.homeFinanaceModel.documentURL}`)
    //                 }
    //             }
    //         }
    //         )
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    const download = (item) => {
        setShowDrawing(false)
        setshowDiagramsQuestion(true)
        console.log(item);
        let extension = item.split('.').pop();
        RNFetchBlob
            .config({
                addAndroidDownloads: {
                    description: "file",
                    useDownloadManager: true,
                    notification: true,
                    path: RNFetchBlob.fs.dirs.DownloadDir + "file_" + extension
                },
                fileCache: true,
            })
            .fetch('GET', item, {
                //some headers ..
            })
            .then((res) => {
                // the temp file path
                console.log('The file saved to ', res.path())
            }).catch(e => console.log(e))






        // const date = new Date()
        // let img_url = path

        // const { config, fs } = RNFetchBlob
        // let pDir = fs.dirs.DownloadDir
        // let options = {
        //   fileCache: true,
        //   addAndroidDownloads: {
        //     useDownloadManagers: true,
        //     notification: true,
        //     path: pDir + '/file_' + extension,
        //     description: "Image"
        //   }
        // }
        // config(options)
        //   .fetch("GET", path)
        //   .then(res => {
        //     console.log(res, "success")
        //   })


    }


    const handleUpdateClientQuestion = async (isIntrested, type) => {
        console.log(isIntrested, "check");
        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "en",
                "ip": "string",
                "responseState": 200,

                "isPremium": true,
                "clientCostEstimate": {
                    "id": 0,
                    "userId": 0,
                    "projectName": "string",
                    "projectTotalCost": 0,
                    "cityId": 0,
                    "societyId": 0,
                    "plotSizeId": 0,
                    "floorId": 0,
                    "unitId": 0,
                    "floorPlanId": 0,
                    "constructionQualityId": 0,
                    "city": "string",
                    "plotCategoryId": 0,
                    "plotCategory": "string",
                    "society": "string",
                    "plotSize": "string",
                    "floor": "string",
                    "unit": "string",
                    "floorPlan": "string",
                    "constructionQuality": "string",
                    "isPaid": true,
                    "paymentMethodId": 0,
                    "paymentTransactionId": "string",
                    "rawMaterialDetails": "string",
                    "finishingRawMaterialDetails": "string",
                    "completedPercentage": 0,
                    "isFullyCompleted": true,
                    "costEstimateUrl": "string",
                    "isInterstedInDiagrams": true,
                    "isInterestedInHomeFinance": true,
                    "diagramLeadStatus": 0,
                    "homeFinanceLeadStatus": 0,
                    "createdAt": "2022-12-07T14:32:47.628Z",
                    "updatedAt": "2022-12-07T14:32:47.628Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 0,
                    "bankId": 0
                },
                "updateCostEstimateStatus": {
                    "costEstimateID": costId,
                    "isInterested": isIntrested,
                    "requestType": type,
                    "status": 1
                }
            }
            PostRequest(updateClientCostEstimateQuestionsApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                }
                else {
                    console.log("res", JSON.stringify(res, null, 2));

                }
            }
            )
        } catch (error) {
            console.log(error);
        }
    }

    // render components 
    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Icons style={{ marginRight: 15 }} name="arrowleft" size={20} color="#fff" />

                </TouchableOpacity>
                <AppText
                    marginLeft={"0%"}
                    bold
                    size={16}
                    title={"Cost Estimate"}
                    color="#fff"
                />
            </View>
        )
    }
    const renderItem = ({ item, i }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    onItemSelected(item)
                }}
                style={[styles.option,
                    //  { borderRightWidth: 5, borderColor: Colors.darkYellow } : {}
                ]}
            >
                <AppText
                    color={Colors.fieldTextColor}
                    title={`${item.name} `}
                    textAlign={"left"}
                    size={14}
                    // bold={selectedItem && selectedItem.constructionQualityId == item.constructionQualityId ? true : false}
                    width={"80%"}
                />
                {selectedItem && selectedItem.id == item.id ? <Image source={Icon.fill_radio} style={{ width: 20, height: 20 }} />
                    : <Image source={Icon.unfil_radio} style={{ width: 20, height: 20 }} />}

            </TouchableOpacity>
        );
    };

    const renderHomeFinacQuestion = () => {
        return <View style={{ flex: 1, marginTop: 30, }}>
            <AppText
                title={"Do you want for home Financing ?"}
                bold
                color={Colors.fieldTextColor}
                alignSelf={"center"}
                size={18}
                marginVertical={30}
            />

            <View style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "75%", alignSelf: "center"
            }}>
                <TouchableOpacity style={styles.yesBtn}
                    onPress={() => {
                        handleUpdateClientQuestion(true, 2)
                        navigation.navigate("paymentScreen", {
                            costId: costId,
                            file: file,
                            homeFinanceFile: homeFinanceFile
                        })
                        setDownloadData({
                            ...downloadData,
                            isIntrestedFile: true
                        })

                    }}

                >
                    <AppText
                        title={"Yes"}
                    />
                </TouchableOpacity >
                <TouchableOpacity style={styles.noBtn}
                    onPress={() => {
                        handleUpdateClientQuestion(false, 2)
                        navigation.navigate("paymentScreen", {
                            costId: costId,
                            file: file,
                            homeFinanceFile: homeFinanceFile
                        })
                        setDownloadData({
                            ...downloadData,
                            isIntrestedFile: false
                        })
                    }}

                >
                    <AppText
                        title={"No"}
                    />
                </TouchableOpacity>

            </View>

        </View>
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            {renderHomeFinacQuestion()}
        </View>
    )
}

export default BankList

const styles = StyleSheet.create({
    header: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightYello,
        paddingHorizontal: 40
    },
    option: {
        padding: 15,
        borderWidth: 1,
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
    flatList: {
        paddingVertical: 0,
        height: 250,
        overflow: "hidden"
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
    yesBtn: {
        width: "40%",
        backgroundColor: Colors.lightYello,
        borderWidth: 1,
        borderColor: Colors.lightYello,
        padding: 10,
        alignItems: "center",
        borderRadius: 10
    },
    noBtn: {
        width: "40%",
        backgroundColor: Colors.fieldPlaceholderColor,
        borderWidth: 1,
        borderColor: Colors.fieldPlaceholderColor,
        padding: 10,
        alignItems: "center",
        borderRadius: 10
    }
})