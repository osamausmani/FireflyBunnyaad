import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppOptionText from '../../../component/appComponnet/AppOptionText'
import { getPlotCategorysDDLApi } from '../../../api/apiEndPoint';
import { PostRequest } from '../../../api/axios';
import { AppContext } from '../../../contextApi/AppProvider'
import { Colors } from '../../../constants';
import { userModel, plotCategory } from "../../../models"
import CostEstimateHeader from '../../../component/appComponnet/CostEstimateHeader';

const SelectPlotCategory = ({ navigation,route }) => {
    const { result, setResult, authData, floorRelationIds, setFloorRelationIds, } = useContext(AppContext)

    const [selectedItem, setSelectedItem] = useState(null)
    const [showIndicator, setShowIndicator] = useState(true);
    const [plotCategoryList, setPlotCategoryList] = useState([]);
    const id ={
        userId:route.params.userId.userId,
        cityId:route.params.userId.cityId,
        areaid:route.params.userId.areaid,
        plotsizeid:route.params.userId.plotSizeId.plotSizeID,
        plotCatagory:selectedItem

    }
    useEffect(() => {
        getAllPlotCategories()

    }, []);

    const getAllPlotCategories = async () => {
        try {
            const Model = {
                ...userModel,
                plotCategory
            }
            PostRequest(getPlotCategorysDDLApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    setPlotCategoryList(res.plotCategoryDDL)
                }
            }
            )
        } catch (error) {
            console.log(error);
        }
    }

    const onSelectedItem = (item) => {
        setSelectedItem(item)
        setFloorRelationIds({ ...floorRelationIds, plotCategoryID: item !== null ? item.id : 0 })
        setResult({
            ...result,
            plotCategory: item !== null ? item.name : "",
            plotCategoryId: item !== null ? item.id : 0
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <CostEstimateHeader
                authData={authData}
                result={result}
                navigation={navigation}
                percentage={"40"}

            />
            <View style={{ flex: 1, marginTop: 30 }}>

                {showIndicator ?
                    <ActivityIndicator size={55} color={Colors.darkYellow} />
                    :
                    <AppOptionText
                        title={"Plot Categories"}
                        dataa={plotCategoryList}
                        navigation={navigation}
                        nextScreen={"selectFloor"}
                        selectedItem={selectedItem}
                        onSelectedItem={onSelectedItem}
                        userId={id}
                    />
                }
            </View>
        </View>
    )
}

export default SelectPlotCategory

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