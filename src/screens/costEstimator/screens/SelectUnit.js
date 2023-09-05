

import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppOptionText from '../../../component/appComponnet/AppOptionText'
import { getUnitsDDLApi } from '../../../api/apiEndPoint';
import { PostRequest } from '../../../api/axios';
import { AppContext } from '../../../contextApi/AppProvider'
import { Colors } from '../../../constants';
import CostEstimateHeader from '../../../component/appComponnet/CostEstimateHeader';

const SelectUnit = ({ navigation }) => {

    const { result, setResult, authData, floorRelationIds, setFloorRelationIds } = useContext(AppContext)

    const [selectedItem, setSelectedItem] = useState(null)
    const [showIndicator, setShowIndicator] = useState(true);
    const [unitList, setUnitList] = useState([]);

    useEffect(() => {
        getAllUnits()
    }, []);

    const getAllUnits = async () => {
        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "en",
                "ip": "string",
                "responseState": 200,

                "unit": {
                    "unitId": 0,
                    "isStandard": true,
                    "createdAt": "2022-10-10T12:39:54.448Z",
                    "updatedAt": "2022-10-10T12:39:54.448Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 0
                }
            }
            PostRequest(getUnitsDDLApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    setUnitList(res.unitDDL)
                    // console.log("res", JSON.stringify(res.unitDDL, null, 2));
                }
            }
            )
        } catch (error) {

        }
    }
    const onItemSelected = (item) => {
        setSelectedItem(item)
        setFloorRelationIds({ ...floorRelationIds, unitID: item !== null ? item.id : 0 })
        setResult({
            ...result,
            noOfUnits: item !== null ? item.name : "",
            unitId: item !== null ? item.id : 0
        })
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <CostEstimateHeader
                authData={authData}
                result={result}
                navigation={navigation}
                percentage={"60"}

            />
            <View style={{ flex: 1, marginTop: 30 }}>
                {showIndicator ?
                    <ActivityIndicator size={55} color={Colors.darkYellow} />
                    :
                    <AppOptionText
                        title={"Number of Units"}
                        dataa={unitList}
                        navigation={navigation}
                        nextScreen={"selcetFloorPlans"}
                        selectedItem={selectedItem}
                        onSelectedItem={onItemSelected}
                    />
                }
            </View>
        </View>
    )
}

export default SelectUnit

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