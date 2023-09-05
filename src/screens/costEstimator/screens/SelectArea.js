

import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppOptionText from '../../../component/appComponnet/AppOptionText'
import { PostRequest } from '../../../api/axios';
import { getSocietysDDLApi } from '../../../api/apiEndPoint';
import { AppContext } from '../../../contextApi/AppProvider'
import { Colors } from '../../../constants';
import { userModel, society } from "../../../models"
import CostEstimateHeader from '../../../component/appComponnet/CostEstimateHeader';

const SelectArea = ({ navigation,route }) => {
    const { result, setResult, authData, floorRelationIds, setFloorRelationIds } = useContext(AppContext)
    const [selectedItem, setSelectedItem] = useState(null)
    const [showIndicator, setShowIndicator] = useState(true);
    const [societyList, setSocietyList] = useState([]);

// console.log('city id',route.params.userId.cityId.id)
// console.log('userId',route.params.userId.userId)

const id ={
    userId:route.params.userId.userId,
    cityId:route.params.userId.cityId.id,
    areaid:selectedItem
}

    useEffect(() => {
        getAllSocieties()
    }, []);

    const getAllSocieties = async () => {
        try {
            const Model = {
                ...userModel,
                society
            }
            PostRequest(getSocietysDDLApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    
                    const data = res.societyDDL.filter((societyfil)=>societyfil.cityID === route.params.userId.cityId.id)
                    setSocietyList(data)
                    // console.log(data,"sjdasd")

                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    const onSelectedItem = (item) => {
        setSelectedItem(item)
        setResult({
            ...result,
            plotArea: item !== null ? item.name : "",
            societyId: item !== null ? item.id : 0
        })
        setFloorRelationIds({ ...floorRelationIds, societyID: item !== null ? item.id : 0 })
    }

    // console.log(societyList)

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <CostEstimateHeader
                authData={authData}
                result={result}
                navigation={navigation}
                percentage={"20"}
            />
            <View style={{ flex: 1, marginTop: 30 }}>
                {showIndicator ?
                    <ActivityIndicator size={55} color={Colors.darkYellow} />
                    :
                    <AppOptionText
                        title={"Select Your Society/Area"}
                        dataa={societyList}
                        navigation={navigation}
                        nextScreen={"selectPlotSize"}
                        selectedItem={selectedItem}
                        onSelectedItem={onSelectedItem}
                        filter
                        userId={id}

                    />
                }
            </View>
        </View>
    )
}

export default SelectArea

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