import { Pressable, StyleSheet, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Icon, Images } from '../../constants'
import AppText from '../appComponnet/AppText'
import Swiper from 'react-native-swiper'
import { flowUrl, getAllStaticFlowsApi, imgUrl } from '../../api/apiEndPoint'
import { PostRequest } from '../../api/axios'
import { userModel, staticFlow } from "../../models"

const Slider = () => {
    const [flowData, setFlowData] = useState([]);
    useEffect(() => {
        getStaticFlows()
    }, []);

    const getStaticFlows = () => {
        try {
            const model = {
                userModel,
                staticFlow: {
                    ...staticFlow,
                    type: 3
                }
            }
            PostRequest(getAllStaticFlowsApi, model).then(res => {
                if (res === 0) {
                    console.log("error");
                }
                else {
                    setFlowData(res?.staticFlowList)
                    // console.log("res", JSON.stringify(res.staticFlowList, null, 2));
                }
            }
            )
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Swiper autoplay autoplayTimeout={5} style={{ height: 130 }}
            dot={
                <View style={{ backgroundColor: '#D9D9D9', }} />
            }
            activeDot={
                <View style={{ backgroundColor: "#FFFFFF", }} />
            }
        >
            {flowData && flowData.length > 0 ? flowData.map((item, i) => <View key={i} style={{ borderRadius: 25, overflow: "hidden", width: "90%" }}>
                <Image source={{ uri: `${imgUrl}/${item.logo}` }} style={{ borderRadius: 10, height: 130, width: "100%", borderRadius: 10 }} />
                <View style={{ position: 'absolute', bottom: 10, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 30 }}>
                    <AppText
                        title={item?.title}
                        size={20}
                        bold
                        color={"#fff"}
                        flex={1}
                        marginTop={0}
                    />
                    <Image
                        source={Icon.backIcon}
                        style={{ width: 30, height: 30 }} />
                </View>
            </View>
            )
                :
                <View style={{ borderRadius: 25, overflow: "hidden", width: "90%" }}>
                    <Image source={Images.slid1} style={{ borderRadius: 10, height: 130, width: "100%", borderRadius: 10 }} />
                    <View style={{ position: 'absolute', bottom: 10, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 30 }}>
                        <AppText
                            title={"Al-Imarat Group"}
                            size={20}
                            bold
                            color={"#fff"}
                            flex={1}
                            marginTop={0}
                        />
                        <Image
                            source={Icon.backIcon}
                            style={{ width: 30, height: 30 }} />
                    </View>
                </View>
            }

        </Swiper>
    )
}

export default Slider

const styles = StyleSheet.create({})