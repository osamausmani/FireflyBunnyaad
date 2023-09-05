import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppOptionText from '../../../component/appComponnet/AppOptionText'
import { getFloorsDDLApi } from '../../../api/apiEndPoint';
import { PostRequest } from '../../../api/axios';
import { AppContext } from '../../../contextApi/AppProvider'
import { Colors } from '../../../constants';
import { userModel, floor } from "../../../models"
import CostEstimateHeader from '../../../component/appComponnet/CostEstimateHeader';

const SelectFloor = ({ navigation,route }) => {

    const { result, setResult, authData, setUserData, floorRelationIds, setFloorRelationIds } = useContext(AppContext)
    const [selectedItem, setSelectedItem] = useState(null)
    const [showIndicator, setShowIndicator] = useState(true);
    const [floorList, setFloorList] = useState([]);
    const [filterfloorList, setFilterfloorList] = useState([]);

            const id ={
                userId:route.params.userId.userId,
                cityId:route.params.userId.cityId,
                areaid:route.params.userId.areaid,
                plotsizeid:route.params.userId.plotsizeid,
                plotCatagoryId:route.params.userId.plotCatagory.id,
                floorId: selectedItem
        
            }
    useEffect(() => {
        getAllFloors()
    }, []);
    const getAllFloors = async () => {
        try {
            const Model = {
                ...userModel,
                floor
            }
            PostRequest(getFloorsDDLApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    setFloorList(res.floorDDL)
                    setFilterfloorList(res.floorDDL.filter(x=> x.id == '2' || x.id == '4'))
                }
            }
            )
        } catch (error) {
            console.log(error);
        }

    }
    const onItemSelected = (item) => {
        setSelectedItem(item)
        setFloorRelationIds({ ...floorRelationIds, floorID: item !== null ? item.id : 0 })
        setResult({
            ...result,
            noOfFloors: item !== null ? item.name : "",
            floorId: item !== null ? item.id : 0,
        })

    }
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <CostEstimateHeader
                authData={authData}
                result={result}
                navigation={navigation}
                percentage={"50"}

            />
            <View style={{ flex: 1, marginTop: 30 }}>
                {showIndicator ?
                    <ActivityIndicator size={55} color={Colors.darkYellow} />
                    :
                    <AppOptionText
                        title={"No. of floors"}
                        dataa={route.params.userId.plotsizeid == '1' || route.params.userId.plotsizeid == '2' || route.params.userId.plotsizeid == '3' ? filterfloorList :floorList}
                        navigation={navigation}
                        nextScreen={"selcetFloorPlans"}
                        selectedItem={selectedItem}
                        onSelectedItem={onItemSelected}
                        userId={id}
                    />
                }

            </View>
        </View>
    )
}

export default SelectFloor

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