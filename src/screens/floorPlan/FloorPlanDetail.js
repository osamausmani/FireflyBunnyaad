import React, { useState, useEffect, useRef,useContext } from 'react'
import { Image, Pressable, StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, ImageBackground, Dimensions, StatusBar } from 'react-native'
import Icons from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBackground from '../../component/appComponnet/AppBackground'
import { bedroom_icon, drawer_back, floor_plan_img, kitchen_icon, washroom_icon } from '../../assets/path'
import AppHeader from '../../component/appComponnet/AppHeader'
import Language from '../../languages/Language';
import AppText from '../../component/appComponnet/AppText';
import RBSheet from "react-native-raw-bottom-sheet";
import Colors, { darkYellow, fieldPlaceholderColor, lightGrey } from '../../constants/Colors';
import Swiper from 'react-native-swiper';
import { AppSubmitButton, Background, Icon, Images } from '../../constants';
import AppModal from '../../component/appModal/AppModal';
import ImageZoom from 'react-native-image-pan-zoom';
import { imgUrl } from '../../api/apiEndPoint';
import Pdf from 'react-native-pdf';
import { AppContext } from '../../contextApi/AppProvider';

const FloorPlanDetail = ({ navigation, route }) => {
    const { setFloorPlanId } = useContext(AppContext)

    const { modalData } = route.params;
    setFloorPlanId(modalData.floorPlanId,"sdds")
    console.log("---", JSON.stringify(modalData, null, 2))
    const [isEnglish, SelectLanguage] = useState(true);


    // const source = { uri: `https://www.africau.edu/images/default/sample.pdf`, cache: true };
    const source = { uri: `${imgUrl}${modalData.modalData[0].path}`, cache: true };

    const getLocalData = async () => {
        const getLocalLAnguages = await AsyncStorage.getItem('language');
        let isEnglish = await JSON.parse(getLocalLAnguages);
        SelectLanguage(true)
    }

    useEffect(() => {
        getLocalData()
    }, [getLocalData,])

    // render  modals

    return (
        <View style={{ backgroundColor: "#fff", flex: 1, }}>
            <StatusBar hidden />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <Icons name="arrowleft" size={30} color="#fff" />
                </TouchableOpacity>
                <AppText
                    marginLeft={"5%"}
                    bold
                    size={18}
                    title={"Floor Plan Detail"}
                    color="#fff"
                />
            </View>
            <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
                <AppText
                    title={modalData?.name}
                    size={16}
                    bold
                    marginLeft={20}
                />
                <AppText
                    title={modalData?.description}
                    size={15}
                    marginTop={5}
                    marginLeft={20}
                    width={"80%"}
                    color={Colors.fieldTextColor}
                />
            </View>

            <View style={{ flex: 1, marginHorizontal: 15, marginBottom: 10 }} >
                <Pdf
                    trustAllCerts={false}
                    source={source}
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
                    style={styles.pdf} />
            </View>
            <Text style={{color:'#000', marginBottom:12, marginLeft:12, fontWeight:'bold', fontSize:14}}>To view detailed floorplan download full version</Text>
            <View style={{ marginVertical: 10, }}>
          
          <AppSubmitButton
                onPress={() => {
                    navigation.navigate('paymentScreen');
                }}
              name={"Download Full Version"}
              
          />
          </View>
            <View style={{ marginVertical: 10, }}>
          
                <AppSubmitButton
                    onPress={() => {
                        navigation.replace('AppStack', { screen: 'consultancyStack', params: { val: 'Im intrested in floor plan ,' }, });
                    }}
                    name={"Consult us"}
                    
                />
            </View>
        </View>
    )
}

export default FloorPlanDetail
const { height, width } = Dimensions.get("window")
const styles = StyleSheet.create({
    header: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightblue,
        paddingHorizontal: 40
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
    mapImage: {
        height: 180,
        width: width / 1.4,
        overflow: 'hidden',
        marginHorizontal: 10,
        borderRadius: 10

    },
    pdf: {

        flex: 1,
        backgroundColor: "#fff"
        // width: Dimensions.get('window').width - 30,
        // height: Dimensions.get('window').height,
    }
})