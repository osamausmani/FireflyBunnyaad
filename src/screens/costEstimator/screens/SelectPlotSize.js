

import { StyleSheet, View, TouchableOpacity,ToastAndroid } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppText from '../../../component/appComponnet/AppText'
import CustomeDropDown from '../../../component/customeDrawer/CustomeDropDown';
import { PostRequest } from '../../../api/axios';
import { getPlotSizesDDLApi } from '../../../api/apiEndPoint';
import { AppContext } from '../../../contextApi/AppProvider'
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../constants';
import { userModel, plotSize } from "../../../models"
import CostEstimateHeader from '../../../component/appComponnet/CostEstimateHeader';

const SelectPlotSize = ({ navigation,route }) => {
    
    const { result, setResult, authData, floorRelationIds, setFloorRelationIds } = useContext(AppContext)

    const [showIndicator, setShowIndicator] = useState(true);
    const [selectedPlotSize, setSelectedPlotSize] = useState(null);
    const [plotsList, setPlotsList] = useState([]);


    useEffect(() => {
        getAllPlots()

    }, []);


    const showToastMessage = () => {
        ToastAndroid.show(
          "Please select first.",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          65,
          50
        );
      };

const id ={
    userId:route.params.userId.userId,
    cityId:route.params.userId.cityId,
    areaid:route.params.userId.areaid.id,
    plotSizeId : floorRelationIds
}

    const getAllPlots = async () => {
        try {
            const Model = {
                ...userModel,
                plotSize
            }
            PostRequest(getPlotSizesDDLApi, Model).then(res => {
                // console.log(res)
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    setPlotsList(res.plotSizeDDL)
                }
            })
        } catch (error) {
            console.log(error);
        }

    }
    const onItemSelected = (item) => {
        setSelectedPlotSize(item);
        setFloorRelationIds({ ...floorRelationIds, plotSizeID: item.id })
        setResult({
            ...result,
            sizeOfPlot:item.name,
            plotSizeId:item.id

        })
    }
    // 

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>

            <CostEstimateHeader
                authData={authData}
                result={result}
                navigation={navigation}
                percentage={"30"}

            />
            <View style={{ flex: 1, marginTop: 30 }}>

            
      

                <AppText
                    color='#000'
                    title={"Plot Size"}
                    margin={20}
                    size={18}
                    bold
                    textAlign="center"
                />
                <CustomeDropDown label="Please Select size of Plot" dataa={plotsList} onSelect={onItemSelected} />
                <View style={styles.footer}>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.prvBtn} onPress={() => navigation.pop()}>
                            <AppText
                                color={Colors.lightblack}
                                title={"Go Back"}
                                size={18}
                            />
                        </TouchableOpacity>
                        <LinearGradient colors={['#EFAF0F', '#EFAF0F']} style={styles.nextBtn} >
                            <TouchableOpacity style={styles.nextBtn}  onPress={() => selectedPlotSize == null ? showToastMessage() :  navigation.navigate("selectPlotCategory",{
                                userId:id
                            })}>
                                <AppText
                                    title={"Next"}
                                    size={18}
                                    color={"#000"}
                                />
                            </TouchableOpacity>
                            
                        </LinearGradient>

                    </View>
                </View>
            </View>

        </View>
    )
}

export default SelectPlotSize

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
    btnContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 50
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
    prvBtn: {
        borderWidth: 1,
        borderColor: Colors.silver_color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 120,
        height: 50,
        backgroundColor: Colors.silver_color
    },
    nextBtn: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 120,
        height: 50
    }
})