
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert, Text, Modal, StatusBar } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../contextApi/AppProvider'
import AppText from '../../../component/appComponnet/AppText'
import AppOptionText from '../../../component/appComponnet/AppOptionText'
import { PostRequest } from '../../../api/axios';
import { getCitysDDLApi } from '../../../api/apiEndPoint';
import { Colors } from '../../../constants';
import ModalCostSave from '../../../component/appModal/ModalCostSave'
import ModalSignIn from '../../../component/appModal/ModalSignIn'
const FloorPlanCity = ({ navigation,route }) => {

    const { result, setResult, authData, setUserData } = useContext(AppContext)
    // console.log(setResult)
    const [selectedItem, setSelectedItem] = useState(null)
    const [showIndicator, setShowIndicator] = useState(true);
    const [cityList, setCityList] = useState([]);


    const id ={
        userId:route.params.userId,
        cityId:selectedItem
    }

    useEffect(() => {
        getAllCityDDL()
    }, []);

    const getAllCityDDL = async () => {

        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "en",
                "ip": "string",
                "responseState": 200,

                "city": {
                    "cityId": 0,
                    "logo": "string",
                    "isStandard": true,
                    "createdAt": "2022-10-12T08:27:32.664Z",
                    "updatedAt": "2022-10-12T08:27:32.664Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 0
                }

            }
            PostRequest(getCitysDDLApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    setCityList(res.cityDDL)
                    //    console.log("res", JSON.stringify(res.cityDDL, null, 2));
                }
            }
            )
        } catch (error) {
            console.log(err);
        }


    }
    const onSelectedItem = (item) => {
        // console.log(item, "find item");
        setSelectedItem(item)
        setResult({ ...result, city: item.name })
    }

    const showAlert = () => {
        Alert.alert(
            "",
            "Do you want  to save this Project for later ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        console.log("Ok Pressed")
                    }
                }
            ]
        );
    }
    // navigation.replace("AppStack")
    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    showAlert()
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
            <View style={{ flex: 1, marginTop: 30 }}>
                {showIndicator ?
                    <ActivityIndicator size={55} color={Colors.darkYellow} />
                    :
                    <AppOptionText
                        title={"Select Your City"}
                        dataa={cityList}
                        navigation={navigation}
                        nextScreen={"floorPlanArea"}
                        selectedItem={selectedItem}
                        onSelectedItem={onSelectedItem}
                        userId={id}

                    />
                }
            </View>

        </View>
    )
}

export default FloorPlanCity

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
})