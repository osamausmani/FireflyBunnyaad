import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AppText, Colors } from '../../../constants'
import Entypo from 'react-native-vector-icons/Entypo'

const ViewSavedCostEstimate = ({ navigation, route }) => {

    const { selectedEstimate } = route.params
    console.log(JSON.stringify(selectedEstimate, null, 2));

    const [data, setdata] = useState({});
    const [rawMaterial, setrawMaterial] = useState([]);
    const boqData = [
        { key: "City", value: selectedEstimate?.city },
        { key: "Plot Area", value: selectedEstimate?.society },
        { key: "Size of Plot", value: selectedEstimate?.plotSize },
        { key: "Construction Quality", value: selectedEstimate?.constructionQuality },
        { key: "Plot Categories", value: selectedEstimate?.plotCategory },
        { key: "No. of Floors", value: selectedEstimate?.floor },
    ]

    useEffect(() => {
        setdata(selectedEstimate)
        setrawMaterial(JSON.parse(selectedEstimate.rawMaterialDetails))
    }, []);

    const renderHeader = () => {
        return <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Entypo
                    name={'arrow-long-left'}
                    color={Colors.white}
                    size={24}
                />
            </TouchableOpacity>
            <AppText
                marginLeft={"5%"}
                bold
                size={20}
                title={"Back"}
                color="#fff"
            />
        </View>
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <>
                <View style={styles.boqHeader}>
                </View>
                <AppText
                    size={16}
                    bold
                    title={data?.projectName}
                    alignSelf="center"
                    marginTop={5}
                    color={Colors.fieldTextColor}
                />
                <View style={styles.totalEstimate}>
                    <AppText
                        title={"Total Estimate"}
                        color={Colors.lightblack}
                        size={16}
                    />
                    <AppText
                        title={`${data?.projectTotalCost} PKR.`}
                        size={16}
                    />
                </View>
            </>
            <AppText
                title={"Boq List "}
                marginBottom={10}
                marginHorizontal={20}
                color={Colors.lightYello}
                size={22}
            />
            {
                boqData.map((data, index) => {
                    return (
                        <View style={styles.boqData} key={index}>
                            <AppText
                                title={data.key}
                                textAlign='left'
                                width="50%"
                                color={Colors.fieldTextColor}
                            />
                            <AppText
                                title={data.value}
                                textAlign='left'
                                width="50%"
                            />
                        </View>
                    )
                })
            }

            <AppText
                title={"Raw Material Detail"}
                marginBottom={30}
                marginVertical={30}
                marginHorizontal={20}
                color={Colors.lightYello}
                size={22}
            />
            {
                rawMaterial && rawMaterial.map((item, i) => {
                    return (
                        <View style={styles.boqData} key={i}>
                            <AppText
                                title={item.rawMaterial}
                                textAlign='left'
                                width="35%"
                            />
                            <View style={{ width: "65%" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <AppText
                                        title={`${item.rawMaterialQuality}   [ ${item.amount} Pkr ] `}
                                        textAlign='left'
                                    />

                                </View>
                                <View style={{ justifyContent: "center", margin: 2 }}>
                                    <AppText
                                        title={`${item.quantity}   ${item.measuringUnit}  `}
                                        textAlign='left'
                                    />

                                </View>
                            </View>
                        </View>
                    )
                })
            }

        </View>
    )
}

export default ViewSavedCostEstimate
const { height, width } = Dimensions.get("window")
const styles = StyleSheet.create({
    header: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightYello,
        paddingHorizontal: 20
    },
    boqHeader: {
        alignSelf: "center",
        margin: 15,
    },
    totalEstimate: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginHorizontal: 25,
        marginTop: 15,
        marginBottom: 20
    },
    boqData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        marginHorizontal: 15,

    },
})