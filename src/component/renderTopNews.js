import { StyleSheet, Text, View,ImageBackground,Image } from 'react-native'
import React,{useEffect, useState} from 'react'
import Swiper from 'react-native-swiper'
import { PostRequest, getAllStaticFlowsApi, imgUrl } from '../api/apiEndPoint';
import { Background, Colors, Icon, AppText, Logo } from '../constants'




const renderTopNews = () => {
    const [flowData, setFlowData] = useState([]);

    const getStaticFlows = () => {
        try {
            const model = {
                userModel,
                staticFlow: {
                    ...staticFlow,
                    type: 2
                }
            }
            PostRequest(getAllStaticFlowsApi, model).then(res => {
                if (res === 0) {
                    console.log("error");
                }
                else {
                    setFlowData(res?.staticFlowList)
                }
            }
            )
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
getStaticFlows()
    },[])

    return (
        <Swiper style={{ height: 160 }} autoplay autoplayTimeout={10}
            dot={
                <View style={{ backgroundColor: '#D9D9D9', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />
            }
            activeDot={
                <View style={{ backgroundColor: "#FFFFFF", width: 15, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />
            }
        >
            {flowData && flowData.length > 0 ? flowData.map((item, i) => <ImageBackground key={i}
                source={Background.service_background}
                style={{ height: 150, marginHorizontal: 2 }} >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: "50%", paddingHorizontal: 10, marginTop: 20, }}>
                        <AppText
                            size={15}
                            title={item?.title}
                            color={"#fff"}
                            bold
                            textTransform="uppercase"
                        />
                        <AppText
                            marginTop={1}
                            size={11}
                            title={`${item?.description.slice(0, 90)} ...`}
                            color={"#fff"}
                        />
                    </View>
                    <View style={{ width: "40%", alignItems: "flex-end", justifyContent: "center", height: 150 }}>
                        <Image
                            source={{ uri: `${imgUrl}/${item.logo}` }}
                            style={{ width: "95%", height: 90 }} />
                    </View>

                </View>
            </ImageBackground>
            ) :
                <ImageBackground
                    source={Background.service_bg}
                    style={{ height: 150, marginHorizontal: 2 }} >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: "50%", paddingHorizontal: 10, marginTop: 20, }}>
                            <AppText
                                size={15}
                                title={"Title News"}
                                color={"#fff"}
                                bold
                                textTransform="uppercase"
                            />
                            <AppText
                                marginTop={1}
                                size={11}
                                title={`News Description ...`}
                                color={"#fff"}
                            />
                            <View style={{ backgroundColor: "rgba(255,255,255,.2)", paddingVertical: 5, width: "60%", alignItems: "center", marginTop: 10, borderRadius: 5 }}>
                                <AppText
                                    size={14}
                                    title={"Order Now"}
                                    color={"#fff"}
                                />
                            </View>

                        </View>
                        <View style={{ width: "40%", alignItems: "flex-end", justifyContent: "center", height: 150 }}>
                            <Image
                                // source={{ uri: `${flowUrl}/${item.logo}` }}
                                source={Icon.service_icon}
                                style={{ width: "95%", height: 90 }} />
                        </View>

                    </View>
                </ImageBackground>
            }
        </Swiper>
    )
}


export default renderTopNews

const styles = StyleSheet.create({})