
import { Dimensions, StyleSheet, View, Image, ActivityIndicator, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import CostEstimateHeader from '../../../component/appComponnet/CostEstimateHeader';
import { PostRequest, getAllFloorPlansApi, imgUrl } from '../../../api/apiEndPoint';
import { AppContext } from '../../../contextApi/AppProvider'
import { Icon, Colors, AppSubmitButton, AppText, AppModal, AppOptionImage, AppOptionText } from '../../../constants';
import ImageZoom from 'react-native-image-pan-zoom';
import { userModel, floorPlan } from "../../../models"
import LinearGradient from 'react-native-linear-gradient';
import Pdf from 'react-native-pdf';
import AppOptionImageColumn from '../../../component/appComponnet/AppOptionImageColumn';
import description from './description.json'

const SelcetFloorPlans = ({ navigation,route }) => {
    const { result, setResult, floorRelationIds, authData, setUserData, setFloorPlanData,floorPlanData } = useContext(AppContext)
    const [showModal, setShowModal] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [zoomImage, setZoomImage] = useState(false);
    const [radioCheck, setRadioCheck] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showIndicator, setShowIndicator] = useState(true);
    const [floorPlanList, setFloorPlanList] = useState([]);
    const [modalData, setmodalData] = useState(null);

    const newData = modalData !== null && modalData.modalData[0].path;
    const newDataWithSpaces = newData && newData.replace(/\+/g, '');
    const soursce = { uri: `${imgUrl}${newDataWithSpaces}`, cache: true };
    const source = { uri: `https://www.africau.edu/images/default/sample.pdf`, cache: true };


    useEffect(() => {
        getAllFloorPlans()
    }, []);
    const id ={
        userId:route.params.userId.userId,
        cityId:route.params.userId.cityId,
        areaid:route.params.userId.areaid,
        plotsizeid:route.params.userId.plotsizeid,
        plotCatagoryId:route.params.userId.plotCatagoryId,
        floorId: route.params.userId.floorId.id,
        selectFloorId:radioCheck
    }


    const getAllFloorPlans = async () => {
        const Model = {
            ...userModel,
            floorPlan,
            floorPlanRelationList: [{
                "cityID": floorRelationIds.cityID,
                "societyID": floorRelationIds.societyID,
                "plotSizeID": floorRelationIds.plotSizeID,
                "plotCategoryID": floorRelationIds.plotCategoryID,
                "floorID": floorRelationIds.floorID,
                "unitID": 1,
                "floorPlanID": floorRelationIds.floorPlanID
            }]
        }
        PostRequest(getAllFloorPlansApi, Model).then(res => {
            if (res === 0) {
                console.log("error");
                setShowIndicator(false)
            }
            else {
                setShowIndicator(false)

                const newData = res.floorPlans?.map((item) => {
                    const descriptionData = description.data.filter(
                        (x) => x.FloorPlanID == item.floorPlanId
                      );
                    return {
                        floorPlanId: item.floorPlanId,
                        imagePath: item.imagePath,
                        name: item.name,
                        description : item.description,
                        description: descriptionData.length > 0 ? descriptionData : [],
                        modalData: res.attachmentList?.filter((item2) => {
                            if (item2.actionRowId == item.floorPlanId) {
                                return item2
                            }
                        }),

                    }

                })
        
                setFloorPlanList(newData)
                 
                
      
            }
        }
        )
    }


    const onItemSelected = (item) => {
        setSelectedItem(item)
    }
    
    const handleImageDescription = (modalData) => {

        setmodalData(modalData)
        setFloorPlanData(modalData);
        setRadioCheck(modalData)
        setShowModal(true)
    }
    const handleRadioCheck = (item) => {
        setRadioCheck(item)
        setResult({
            ...result,
            floorPlan: item !== null ? item.name : "",
            floorPlanId: item !== null ? item.floorPlanId : 0,

        })
        setFloorPlanData(item);
    }

    const handleContinue = () => {
        navigation.navigate("selectConstructionQuality",{allIds:id})
        
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <CostEstimateHeader
                authData={authData}
                result={result}
                navigation={navigation}
                percentage={"80"}
            />
            <View style={{ flex: 1, marginTop: 30 }}>
                {showIndicator ?
                    <ActivityIndicator size={55} color={Colors.darkYellow} />
                    :
                    <AppOptionImageColumn
                        navigation={navigation}
                        title={"floor plans"}   
                        dataa={floorPlanList}
                        nextScreen={"selectConstructionQuality"}
                        selectedRadio={radioCheck}
                        selectedItem={selectedItem}
                        onSelectedItem={onItemSelected}
                        onPressImage={handleImageDescription}
                        onPressRadio={(item) => handleRadioCheck(item)}
                        allIds={id}

                    />
                }

                {/* // Image   modals  */}
                <AppModal visible={showModal} color={Colors.darkgrey}>
                    {modalData &&
                        <View style={styles.modal}>
                            <Pressable style={styles.cancelModal} onPress={() => {
                                setShowModal(false)
                                }} >
                                <Image source={Icon.modal_cross} style={{ width: 25, height: 25 }} />
                            </Pressable>
                            <View style={{ flex: 1, marginHorizontal: 20 }}>
                                <AppText
                                    title={modalData?.name}
                                    alignSelf={'center'}
                                    size={19}
                                    color={Colors.darkgrey}
                                    
                                />
                                <View style={{marginTop:12}}>
                                <AppText
                                    title='Description:'
                                    fontWeight={'700'}
                                    size={19}
                                    color={Colors.black}
                                />
                                </View>


                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                                <View style={{ flex: 1 }}>
                                                  {modalData.description.map((x, index) => (
                                                    <View key={index} style={{ flexDirection: 'column' }}>
                                                      {x.GF && Object.keys(x.GF).map((key, i) => {
                                                        const value = x.GF[key];
                                                        if (value) {
                                                          return (
                                                            <View style={{ flexDirection: 'row'}}>
                                                            <View key={key} style={{width:'80%'}}>
                                                              <AppText
                                                                title={`GF ${key}:`}
                                                                fontWeight="700"
                                                                size={15}
                                                                color={Colors.black}
                                                              />
                                                            </View>
                                                            <View style={{alignSelf:'center'}}>
                                                              <AppText
                                                                title={value}
                                                                size={15}
                                                                color={Colors.black}
                                                                marginLeft={10}
                                                              />
                                                              </View>
                                                            </View>
                                                          );
                                                        }
                                                        return null;
                                                      })}
                                                      {x.Basement && Object.keys(x.Basement).map((key, index) => {
                                                        const value = x.Basement[key];
                                                        if (value) {
                                                          const basementIndex = Math.floor(index);
                                                          if (basementIndex <= Object.keys(x.GF).length) {
                                                            return (
                                                              <View key={key} style={{ flexDirection: 'row' }}>
                                                              <View style={{width:'80%'}}>
                                                              <AppText
                                                                  title={`Bsmt ${key}:`}
                                                                  fontWeight="700"
                                                                  size={15}
                                                                  color={Colors.black}
                                                                />
                                                              </View>
                                                              <View style={{alignSelf:'center'}}>
                                                                <AppText
                                                                  title={value}
                                                                  size={15}
                                                                  color={Colors.black}
                                                                  marginLeft={10}
                                                                />
                                                                </View>
                                                              </View>
                                                            );
                                                          }
                                                        }
                                                        return null;
                                                      })}
                                                    </View>
                                                  ))}
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                  {modalData.description.map((x, index) => (
                                                    <View key={index} style={{ flexDirection: 'column' }}>
                                                      {x.FF && Object.keys(x.FF).map((key, i) => {
                                                        const value = x.FF[key];
                                                        if (value) {
                                                          return (
                                                            <View key={key} style={{ flexDirection: 'row'}}>
                                                            <View style={{width:'85%'}}>

                                                              <AppText
                                                                title={`FF ${key}:`}
                                                                fontWeight="700"
                                                                size={15}
                                                                marginLeft={22}
                                                                color={Colors.black}
                                                              />
                                                              </View>
                                                              <View style={{alignSelf:'center'}}>

                                                              <AppText
                                                                title={value}
                                                                size={15}
                                                                color={Colors.black}
                                                                marginLeft={17}
                                                              />
                                                              </View>
                                                            </View>
                                                          );
                                                        }
                                                        return null;
                                                      })}
                                                    </View>
                                                  ))}
                                                </View>
                                 </View>


                                <View style={{ flex: 1, marginHorizontal: 1}} >
                                    <Pdf
                                        trustAllCerts={false}
                                        source={soursce && soursce}
                                        onLoadComplete={(numberOfPages, filePath) => {
                                            console.log(`Number of pages: ${numberOfPages}`);
                                        }}
                                        onPageChanged={(page, numberOfPages) => {
                                            console.log(`Current page: ${page}`);
                                        }}
                                        onError={(error) => {
                                            console.log(error);
                                        }}
                                        onPressLink={(uri) => {
                                            console.log(`Link pressed: ${uri}`);
                                        }}
                                        style={styles.pdf} />
                                </View>
                                <View style={styles.footer}>
                                    <View style={styles.btnContainer}
                                    >
                                        <TouchableOpacity style={styles.prvBtn} onPress={() => {
                                            setShowModal(false)
                                        }}>
                                            <AppText
                                                title={"Back"}
                                                size={17}
                                                color={Colors.lightblack}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity

                                            onPress={() => {
                                                setShowModal(false)
                                                handleContinue()

                                            }}>

                                            <LinearGradient colors={['#EFAF0F', '#EFAF0F']} style={styles.nextBtn} >
                                                <AppText
                                                    title={"Continue"}
                                                    size={17}
                                                    color={"#000"}
                                                />
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                </AppModal>

                <AppModal visible={showImage} color={"#fff"}>
                    <Pressable style={[styles.cancelModal, { margin: 5 }]} onPress={() => setShowImage(false)} >
                        <Image source={Icon.modal_cross} style={{ width: 25, height: 25 }} />
                    </Pressable>
                    <ImageZoom cropWidth={Dimensions.get('window').width}
                        style={{ flex: 1, backgroundColor: "#fff" }}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={Dimensions.get('window').width}
                        imageHeight={250}>
                        <Image style={{ width: Dimensions.get('window').width, height: 250, }}
                            source={{ uri: `${zoomImage}` }} />
                    </ImageZoom>
                </AppModal>

            </View>
        </View>
    )
}

export default SelcetFloorPlans

const { height, width } = Dimensions.get("window")

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
    modal: {
        flex: 1,
        height: height / 1,
        backgroundColor: '#fff',
        width: width / 1,
        marginHorizontal: 20,
        // marginTop: height / 6.5,
        // borderRadius: 10
    },
    modalGallery: {
        height: 220,
        marginTop: 35,
    },
    slide1: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide2: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        borderRadius: 2,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    carasoulImage: {
        height: 180,
        width: width / 1.4,
        overflow: 'hidden',
        marginHorizontal: 10,
        borderRadius: 10
    },
    cancelModal: {
        alignSelf: 'flex-end',
        padding: 3,
        top: 10,
        right: 10,
    },
    pdf: {
        backgroundColor: "#fff",
        flex: 1,
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height - 100,
    },
    btnContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20
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
    },
    prvBtn: {
        borderWidth: 1,
        borderColor: Colors.silver_color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 120,
        backgroundColor: Colors.silver_color,
    },
    nextBtn: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 130
    }
})
