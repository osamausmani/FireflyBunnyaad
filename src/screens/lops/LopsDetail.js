import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View, FlatList, TouchableOpacity, PermissionsAndroid, Dimensions, Text, ToastAndroid ,ActivityIndicator} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import Language from '../../languages/Language';
import AppText from '../../component/appComponnet/AppText';
import { AppSubmitButton, Colors, Icon } from '../../constants';
import { getAllLopsApi, imgUrl } from '../../api/apiEndPoint';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PostRequest } from '../../api/axios';
import LottieLoader from '../../component/customeDrawer/LottieLoader';
import ImageZoom from 'react-native-image-pan-zoom';
import Pdf from 'react-native-pdf';

const LopsDetail = ({ navigation, route }) => {
    const { detail } = route.params
    const fileUrl = detail && getUrlExtension(detail.logo)
    
    console.log("detail", detail, fileUrl)

    const [isEnglish, SelectLanguage] = useState(null);
    const [lopsList, setLopsList] = useState([])
    const [loader, setLoader] = useState(false)
    const [imageLoading, setImageLoading] = useState(true);


    const getLocalData = async () => {
        const getLocalLAnguages = await AsyncStorage.getItem('language');
        let isEnglish = await JSON.parse(getLocalLAnguages);
        SelectLanguage(isEnglish)
    }

    useEffect(() => {
        getLocalData()
    }, [getLocalData,])

    useEffect(() => {

        return () => {
            setLoader(false)
        };
    }, []);

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
                        title={detail?.name}
                        color="#fff"
                    />
                </View>

            </View>
        )
    }

    const handleImageLoad = () => {
        setImageLoading(false);
      };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <View style={{ flex: 1, marginTop: 20, }}>
                {imageLoading && (
                    <ActivityIndicator size={55} color={Colors.darkYellow} />
                        )}
                <View style={{ marginTop: 40, marginHorizontal: 30 }}>
                    <AppText
                        title={detail?.name}
                        size={22}
                        color={Colors.fieldTextColor}
                        bold

                    />
                    <AppText
                        title={detail?.description}
                        size={14}
                        color={Colors.fieldTextColor}
                        marginTop={15}
                        marginHorizontal={10}
                    />


                    <TouchableOpacity style={[styles.contanier]} onPress={() => {
                        askPermission(detail)
                    }}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", height: 80 }}>

                            <AppText
                                title={"click to Preview"}
                                bold
                                marginHorizontal={20}
                                color={Colors.fieldTextColor}
                            />
                        </View>
                        <AntDesign
                            style={{ borderRadius: 100 }}
                            name="eyeo"
                            size={18}
                            color={Colors.filedBgColor}
                        />

                    </TouchableOpacity>
                </View>
               { 
                 <View style={{ flex: 1, }}>
                
                    {
                        fileUrl == 'pdf' ? <Pdf
                            trustAllCerts={false}
                            source={{ uri: `${imgUrl}${detail.logo}`, cache: true }}
                            onLoadComplete={(numberOfPages, filePath) => {
                                console.log(`Number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                console.log(`Current page: ${page}`);
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            onPressLink={(uri) => {
                                console.log(`Link pressed: ${uri}`);
                            }}
                            style={styles.pdf} /> :

                            <ImageZoom cropWidth={Dimensions.get('window').width}
                                style={{ flex: 1, backgroundColor: "#fff" }}
                                cropHeight={Dimensions.get('window').height}
                                imageWidth={Dimensions.get('window').width}
                                imageHeight={500}>
                                <Image
                                    resizeMode='contain'
                                    style={{ height: 400 }}
                                    source={{ uri: `${imgUrl}${detail.logo}` }} 
                                    onLoad={handleImageLoad} 
                                    />

                            </ImageZoom>
                    }

                </View>
               }
                <View style={{ marginVertical: 10 }}>
                    <AppSubmitButton
                        onPress={() => {
                            navigation.replace('AppStack', { screen: 'consultancyStack', params: { val: 'Im intrested in society Lops ,' }, });
                        }}
                        name={"Consult us"}
                        
                    />
                </View>
            </View>
        </View>
    )

}

export default LopsDetail

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
        height: 60,
        backgroundColor: "#fff",
        marginHorizontal: 10,
        paddingHorizontal: 20,
        borderRadius: 35,
        flexWrap: 'wrap',
        overflow: 'hidden',
        alignItems: "center",
        alignContent: "center",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 5,
        borderRightWidth: 5,
        borderColor: "rgba(0,0,0,.06)",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 35
    },
    image: {
        width: 35,
        height: 35,
    },
    logo: {
        width: 45,
        height: 45,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 300,
        backgroundColor: "#fff"
    },
})