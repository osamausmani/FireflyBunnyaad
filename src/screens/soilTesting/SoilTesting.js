import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground, ScrollView, Dimensions, FlatList, Text } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import { Background, Images, Colors, AppText } from '../../constants'
import { PostRequest, getAllSoilTestingsApi } from '../../api/apiEndPoint';
import icon from '../../constants/icon';


const SoilTesting = ({ navigation }) => {

    const [showIndicator, setShowIndicator] = useState(false)
    const [soilList, setSoilList] = useState([])

    useEffect(() => {
        getConsulltanceyinfo()
    }, [])

    const getConsulltanceyinfo = () => {
        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "string",
                "ip": "string",
                "responseState": 200,
                "soilTesting": {
                    "soilTestingId": 0,
                    "companyName": "string",
                    "contactNumber": "string",
                    "officeAddress": "string",
                    "practiceYears": "string",
                    "logo": "string",
                    "isActive": true
                }
            }
            PostRequest(getAllSoilTestingsApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    setSoilList(res.soilTestingList)
                    console.log("res", JSON.stringify(res.soilTestingList, null, 2));
                }
            }
            )
        } catch (error) {
            console.log(error);
        }
    }




    //render Component
    const renderHeader = () => {
        return (
            <View style={{ height: 200, alignItems: "center", backgroundColor: "rgba(255, 0, 0, 0.6);" }} >
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ width: "50%", paddingHorizontal: 10, marginTop: 10, }}>
                        <TouchableOpacity
                            onPress={() => navigation.replace("AppStack")}
                            style={{ backgroundColor: "rgba(255,255,255,.2)", width: 30, height: 30, alignItems: "center", justifyContent: "center", marginTop: 10, borderRadius: 80, overflow: "hidden" }}>
                            <Feather
                                style={{ borderRadius: 100 }}
                                name="arrow-left"
                                size={18}
                                color="#fff"
                            />
                        </TouchableOpacity>
                        <AppText
                            title={" SOIL AND MATERIAL TESTING"}
                            marginTop={8}
                            size={15}
                            color={"#fff"}
                            bold
                            textTransform="uppercase"
                        />

                        <AppText
                            title={`Our authorized Soil and Material testing company which gives you complete  black white details from soil testing of your plot and material quality before using`.slice(0, 200) + '.'}
                            marginTop={8}
                            size={12}
                            color={"#fff"}
                        />
                    </View>
                    <View style={{ width: "45%", alignItems: "center", justifyContent: "center", height: 200 }}>
                        <Image source={icon.soilTesting} style={{ width: 190, height: 150 }} />
                    </View>

                </View>
            </View >
        )
    }
    const renderItem = ({ item, i }) => {
        return (
            <View style={styles.container}>
                <View style={styles.textField}>
                    <AppText
                        marginLeft={"2%"}
                        title={"Name"}
                        width={"25%"}
                    />
                    <AppText
                        title={item.companyName}
                        width={"70%"}
                    />
                </View>
                <View style={styles.textField}>
                    <AppText
                        marginLeft={"2%"}
                        title={"Contanct Number"}
                        width={"25%"}
                    />
                    <AppText
                        title={item.contactNumber}
                        width={"70%"}
                    />
                </View>
                <View style={styles.textField}>
                    <AppText
                        marginLeft={"2%"}
                        title={"office Address"}
                        width={"25%"}
                    />
                    <AppText
                        title={item.officeAddress}
                        width={"70%"}
                    />
                </View>
                <View style={styles.textField}>
                    <AppText
                        marginLeft={"2%"}
                        title={"practice Years"}
                        width={"25%"}
                    />
                    <AppText
                        title={item.practiceYears}
                        width={"70%"}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <View style={{ flex: 1 }}>
                <FlatList
                    style={styles.flatList}
                    data={soilList}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    )
}

export default SoilTesting

const styles = StyleSheet.create({
    header: {
        flex: 1,
        marginHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    back: {
        width: 25,
        height: 25
    },
    text: {
        marginLeft: "25%",
        padding: 10,
        fontSize: 21,
        color: "#fff"
    },
    flatList: {
        marginTop: 15
    },
    container: {
        backgroundColor: "rgba(0,0,0,.03)",
        marginVertical: 5,
        marginHorizontal: 12,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 1,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 8,
        borderRightWidth: 5,
        borderColor: "rgba(0,0,0,.06)",

    }
    ,
    textField: {
        flexDirection: 'row',
        justifyContent: "space-between",
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        marginVertical: 5,
        paddingBottom: 1,
        alignItems: "center"
    }

})
