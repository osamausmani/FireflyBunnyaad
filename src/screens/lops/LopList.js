import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View, FlatList, TouchableOpacity, PermissionsAndroid, Dimensions, Text, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import Language from '../../languages/Language';
import AppText from '../../component/appComponnet/AppText';
import { Colors, Icon } from '../../constants';
import { getAllLopsApi, imgUrl } from '../../api/apiEndPoint';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PostRequest } from '../../api/axios';
import AppModal from '../../component/appModal/AppModal';
import LottieLoader from '../../component/customeDrawer/LottieLoader';

const LopList = ({ navigation, route }) => {
    const { lop } = route.params
    console.log("lop", lop)

    const [isEnglish, SelectLanguage] = useState(null);
    const [lopsList, setLopsList] = useState([])
    const [loader, setLoader] = useState(false)

    const getLocalData = async () => {
        const getLocalLAnguages = await AsyncStorage.getItem('language');
        let isEnglish = await JSON.parse(getLocalLAnguages);
        SelectLanguage(isEnglish)
    }

    useEffect(() => {
        getLocalData()
    }, [getLocalData,])

    useEffect(() => {
        getDevelopmnetAuthortyDDL()

        return () => {
            setLoader(false)
        };
    }, []);

    const getDevelopmnetAuthortyDDL = async () => {

        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "string",
                "ip": "string",
                "responseState": 200,
                "lop": {
                    "lopid": 0,
                    "logo": "string",
                    "isResidential": true,
                    "createdAt": "2022-11-29T06:18:34.642Z",
                    "updatedAt": "2022-11-29T06:18:34.642Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 0,
                    "name": "string",
                    "description": "string",
                    "developmentAuthorityId": lop?.id
                }
            }
            PostRequest(getAllLopsApi, Model).then(res => {
                console.log(res,"asdasd")
                if (res === 0) {
                    console.log("error");
                    // setShowIndicator(false)
                }
                else {
                    // setShowIndicator(false)
                    setLopsList(res.lopList)
                    // console.log("res", JSON.stringify(res, null, 2));
                }
            }
            )
        } catch (error) {
            console.log(error);
        }


    }

    // File open 
    const askPermission = (item) => {
        setLoader(true)
        async function requestExternalWritePermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Pdf creator needs External Storage Write Permission',
                        message:
                            'Pdf creator needs access to Storage data in your SD Card',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    openFile(item);
                } else {
                    alert('WRITE_EXTERNAL_STORAGE permission denied');
                }
            } catch (err) {
                alert('Write permission err', err);
                console.warn(err);
            }
        }
        if (Platform.OS === 'android') {
            requestExternalWritePermission();
        } else {
            openFile(item);
        }
    }

    function getUrlExtension(url) {
        return url.split(/[#?]/)[0].split(".").pop().trim();
    }

    const openFile = (filepath) => {
        console.log(filepath, "sd");
        const path = imgUrl + filepath?.logo;// absolute-path-to-my-local-file.
        const extension = getUrlExtension(path);
        console.log(extension, "ext");
        // Feel free to change main path according to your requirements.
        const localFile = `${RNFS.DocumentDirectoryPath}/${filepath?.name}.${extension}`;

        const options = {
            fromUrl: path,
            toFile: localFile,
        };
        RNFS.downloadFile(options)
            .promise.then(() => FileViewer.open(localFile))
            .then(() => {
                // success
                console.log("open SuccessFully");
                setLoader(false)
            })
            .catch((error) => {
                // error
                console.log("failed  to load ");
                setLoader(false)
                ToastAndroid.show(
                    "Server is busy please check later.",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    65,
                    50
                );

            });

    }

    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <AntDesign
                            style={{ borderRadius: 100 }}
                            name="arrowleft"
                            size={28}
                            color={Colors.white}
                        />
                    </TouchableOpacity>
                    <AppText
                        marginLeft={"5%"}
                        bold
                        size={20}
                        title={lop?.name}
                        color="#fff"
                    />
                </View>
                <Image resizeMode='contain' source={{ uri: `${imgUrl}/${lop?.logo}` }} style={[styles.logo]} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <View style={{ flex: 1, marginTop: 0, }}>
                <LottieLoader
                    visible={loader}
                    clickHide={() => setLoader(false)}
                />

                <FlatList
                    style={{ marginTop: 25, flex: 1, marginHorizontal: 10 }}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    data={lopsList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={[styles.contanier]} onPress={() => {
                            console.log("lop", item);
                            navigation.navigate("lopsDetail", {
                                detail: item
                            })
                        }}>
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", height: 80 }}>
                                {/* <Image resizeMode='contain' source={Icon.lops} style={[styles.image,]} /> */}
                                <AppText
                                    title={item.name}
                                    bold
                                    fontSize={15}
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
                    keyExtractor={item => `lops-${item.lopid}`}
                />
            </View>
        </View>
    )

}

export default LopList

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