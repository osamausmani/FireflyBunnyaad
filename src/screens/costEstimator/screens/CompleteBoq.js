import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  Text,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import Share from 'react-native-share';
import Icons from 'react-native-vector-icons/AntDesign';
import AppText from '../../../component/appComponnet/AppText';
import AppSubmitButton from '../../../component/appComponnet/AppSubmitButton';
import {Colors} from '../../../constants';
import {
  imgUrl,
  insertClientCostEstimateApi,
  uploadAttachmentBase64Api,
} from '../../../api/apiEndPoint';
import {AppContext} from '../../../contextApi/AppProvider';
import ModalCostSave from '../../../component/appModal/ModalCostSave';
import {PostRequest} from '../../../api/axios';
import Pdf from 'react-native-pdf';
import {getUriToBase64} from '../../../constants/HelperFunctions';
import ModalSignIn from '../../../component/appModal/ModalSignIn';
import ModalSignup from '../../../component/appModal/ModalSignup';
import ModalOtp from '../../../component/appModal/ModalOtp';
import {Col, Row, Grid} from 'react-native-easy-grid';
import notes from './notes.json'

const CompleteBoq = ({navigation,route}) => {
  const {
    result,
    authData,
    constructionData,
    floorPlanData,
    finishingList,
    setCostEstimateId,
    downloadData,
    setDownloadData,
  } = useContext(AppContext);
  const boqData = [
    {key: 'City', value: result.city},
    {key: 'Plot Area', value: result.plotArea},
    {key: 'Size of Plot', value: result.sizeOfPlot},
    {key: 'Construction Quality', value: result.constructionQuality},
    {key: 'Plot Categories', value: result.plotCategory},
    {key: 'No. of Floors', value: result.noOfFloors},
    {key: 'Number of Units', value: result.noOfUnits},
  ];
  const [saveFile, setSaveFile] = useState('');
  const [showSaveProjectModal, setShowSaveProjectModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [finishList, setFinishingList] = useState(null);
  const [details] = useState([
    {name: 'city', value: 'islamabad'},
    {name: 'plot Area', value: 'Bahria'},
    {name: 'size of Plot ', value: '5 Marla'},
    {name: 'Construction Quality', value: 'Custome'},
    {name: 'Plot Categories', value: 'General (Non-corner)'},
    {name: 'No of Floors', value: 'Basement + corner +1st floor + Mumty'},
    {name: 'No of Units', value: 'Single Unit'},
  ]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const soursce = {
    uri: `${imgUrl}${modalData !== null && modalData[0].path}`,
    cache: true,
  };

  useEffect(() => {
    floorPlanData &&
      floorPlanData.modalData &&
      setModalData(floorPlanData.modalData);
    setFinishingList(finishingList);
    let sum = [];
    constructionData &&
      constructionData.map(element => {
        sum.push(element.amount);
      });
    let TotalAmount = sum.reduce(function (a, b) {
      return a + b;
    }, 0);
    setTotalAmount(TotalAmount);
  }, []);
  // const download = () => {
  //     RNFS.downloadFile({
  //         fromUrl: `file://${saveFile}`,
  //         toFile: `${RNFS.DownloadDirectoryPath}`
  //     }).promise
  // }
  

  const htmlContent = `
              <html>
                <head>
                  <meta charset="utf-8">
                  <title>report</title>
                  <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
                  <style>
                    ${htmlStyles}
                  </style>
                </head>
                <body>
                  <header>
                    <h1>BOQ FOR GREY STRUCTURE</h1>
                    <heading>
                    <h2>My Dream House</h2>
                    <div>
                    <P>Total Estimate</P>
                    <P>120,000,000 PKR.</P>
                    </div>
                    </heading>
                  </header>
                  <br/>
                  <br/>
                  ${details.map(
                    item => `
                  <div class ="details">
                  <p>${item.name}</p> 
                  <p>${item.value}</p>
                  </div>
                  `,
                  )}

                 <h3>Grey Structure BOQ</h3>
                 
        ${
          constructionData &&
          constructionData.map(
            (item, i) => `<div class="detail">
                 <p>${item.rawMaterialQuality}</p>
                <p>${item.rawMaterialQuality}   [ ${item.amount} Pkr ]</p>
                </div>`,
          )
        }
                <article>
                <br/>
                <br/>
                <br/>

                <h3>List of Finishing Material </h3> 
        ${
          finishList &&
          finishList.map(
            (data, index) => `<div class="detail">
                 <p > ${data.name}</p>
               
                </div>`,
          )
        }

                </article>
                  <article>
                  <h3 >Floor Plan # 1</h3>
                    <aside>
                    ${
                      modalData !== null &&
                      modalData.map(
                        item => `<div>
                    <img
                    width="100%" height="100%"
                    style= align-self: center;"
                    src= ${imgUrl}/${item.path}
                  />
                  <p>${item.attachmentText}</p>
                    </div>`,
                      )
                    }
                      
                    </aside>
                  </article>
                </body>
              </html>
            `;
  const askPermission = () => {
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Pdf creator needs External Storage Write Permission',
            message: 'Pdf creator needs access to Storage data in your SD Card',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          createPDF();
        } else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        alert('Write permission err', err);
        console.warn(err);
      }
    }
    if (Platform.OS === 'android') {
      requestExternalWritePermission();
    } else {
      createPDF();
    }
  };

  const createPDF = async () => {
    let options = {
      //Content to print
      html: htmlContent,
      //File Name
      fileName: 'Report',
      //File directory
      directory: 'Download',
      base64: true,
    };

    let file = await RNHTMLtoPDF.convert(options);
    // getUriToBase64(file.filePath).then(res => {
    //     console.log(res)
    //     setSaveFile(res)
    // })
    setSaveFile(file.base64);
    // { file && openFile(file.filePath) }
    // Alert.alert('Successfully Exported', [
    //   { text: 'Cancel', style: 'cancel' },
    //   { text: 'Open', onPress: () => openFile(file.filePath) }
    // ], { cancelable: true });
  };
  const openFile = filepath => {
    const path = filepath; // absolute-path-to-my-local-file.
    FileViewer.open(path)
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
  };

  const myCustomShare = async () => {
    const shareOptions = {
      message: 'Report',
      url: `file:///${saveFile}`,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  const SaveCostEstimate = async projectName => {
    try {
      const Model = {
        userID: 0,
        userKey: 'string',
        languageCode: 'en',
        ip: 'string',
        responseState: 200,

        isPremium: false,
        clientCostEstimate: {
          id: 0,
          userId: authData?.userId,
          projectName: projectName,
          projectTotalCost: totalAmount,
          cityId: result.cityId,
          societyId: result.societyId,
          plotSizeId: result.plotSizeId,
          floorId: result.floorId,
          unitId: result.unitId,
          floorPlanId: result.floorPlanId,
          constructionQualityId: result.constructionQualityId,
          city: result.city,
          plotCategoryId: result.plotCategoryId,
          plotCategory: result.plotCategory,
          society: result.plotArea,
          plotSize: result.sizeOfPlot,
          floor: result.noOfFloors,
          unit: result.noOfUnits,
          floorPlan: result.floorPlan,
          constructionQuality: result.constructionQuality,
          isPaid: false,
          paymentMethodId: 0,
          paymentTransactionId: null,
          rawMaterialDetails:
            constructionData !== null ? JSON.stringify(constructionData) : null,
          finishingRawMaterialDetails:
            finishList.length > 0 ? JSON.stringify(finishList) : null,
          completedPercentage: 100,
          isFullyCompleted: true,
          costEstimateUrl: null,
          isInterstedInDiagrams: false,
          isInterestedInHomeFinance: false,
          diagramLeadStatus: 0,
          homeFinanceLeadStatus: 0,
          createdAt: '2022-12-07T12:48:43.935Z',
          updatedAt: '2022-12-07T12:48:43.935Z',
          createdBy: authData?.userId,
          updatedBy: authData?.userId,
          dataStateId: 1,
          bankId: 0,
        },
      };

      PostRequest(insertClientCostEstimateApi, Model).then(res => {
        if (res === 0) {
          console.log('error');
        } else {
          setDownloadData({
            ...downloadData,
            file: saveFile,
          });
          setCostEstimateId(res.clientCostEstimate.id);
          handleUploadFile(res.clientCostEstimate.id);
          navigation.navigate('InvoiceScreen', {
            costId: res.clientCostEstimate.id,
            file: saveFile,
            image:route.params.image && route.params.image,
            invoiceData: route.params.invoiceData&&route.params.invoiceData,
            totalAmount: route.params.totalAmount&&route.params.totalAmount,
            structureData: route.params.structureData
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUploadFile = id => {
    const date = new Date();
    const model = {
      files: [
        {
          base64String: `${saveFile}`,
          fileName: `costEstimate_${date.getMilliseconds()}.pdf`,
          title: `costEstimate_${date.getMilliseconds()}.pdf`,
          description: 'report',
          isPremium: false,
          isElevation: false,
          sortOrder: 0,
        },
      ],
      attachmentTypeID: 2,
      actorID: id,
      userID: Number(authData.userId),
      attachmentID: 0,
    };
    // console.log(JSON.stringify(model, null, 2))
    PostRequest(uploadAttachmentBase64Api, model).then(res => {
      if (res === 0) {
        console.log('error', 'res err');
      } else {
        console.log(JSON.stringify(res, null, 2), 'file upload successfully');
      }
    });
  };

  // render  Modals
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icons name="arrowleft" size={30} color="#fff" />
        </TouchableOpacity>
        <AppText
          marginLeft={'5%'}
          size={20}
          title={'Cost Estimator'}
          color="#fff"
        />
      </View>
    );
  };

  const renderBoqTopHeader = () => {
    return (
      <>
        <View style={styles.boqHeader}>
          <AppText size={16} bold title={'BOQ (GREY STRUCTURE)'} />
        </View>
        <AppText
          size={16}
          title={result.name}
          alignSelf="center"
          marginTop={5}
          color={Colors.fieldTextColor}
        />
        <View style={styles.totalEstimate}>
          <AppText title={'Total Cost'} color={Colors.lightblack} size={16} />

          <AppText title={`${totalAmount && totalAmount} PKR.`} size={16} />
        </View>
      </>
    );
  };
  // console.log(constructionData)
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {renderHeader()}

      <View style={{marginTop: 10, paddingBottom: 85}}>
        <ScrollView>
          {renderBoqTopHeader()}
          {boqData.map((data, index) => {
            return (
              <View style={styles.boqData} key={index}>
                <Grid>
                  <Col style={{width: '50%'}}>
                    <Row
                      style={{
                        borderWidth: 1,
                        borderColor: '#ddd',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <AppText title={data.key} textAlign="left" width="50%" />
                    </Row>
                  </Col>

                  <Col style={{width: '50%'}}>
                    <Row
                      style={{
                        borderWidth: 1,
                        borderColor: '#ddd',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <AppText
                        title={data.value}
                        textAlign="left"
                        width="50%"
                      />
                    </Row>
                  </Col>
                </Grid>
              </View>
            );
          })}
          <AppText
            size={18}
            title={'Grey Structure BOQ Summary'}
            marginHorizontal={25}
            borderTopWidth={1}
            borderTopColor={Colors.lightGrey}
            marginVertical={20}
            paddingVertical={20}
          />
          <Grid>
            <Col style={{width: '30%'}}>
              <Text style={{left: 20,fontWeight:'bold',color:'black'}}>Material</Text>
            </Col>
            <Col style={{width: '20%'}}>
              <Text style={{left: 1,fontWeight:'bold',color:'black'}}>Quality</Text>
            </Col>
            <Col style={{width: '20%'}}>
              <Text style={{right: 12,fontWeight:'bold',color:'black'}}>Quantity</Text>
            </Col>
            <Col style={{width: '20%'}}>
              <Text style={{right: 22,fontWeight:'bold',color:'black'}}>Unit</Text>
            </Col>
            <Col style={{width: '30%'}}>
              <Text style={{right: 39,fontWeight:'bold',color:'black'}}>Amount</Text>
            </Col>
          </Grid>
          {constructionData &&
            constructionData.map((item, i) => {
              {/* console.log(item, 'item'); */}
              return (
                <View style={styles.boqData} key={i}>
                  <Grid>
                    <Col style={{width: '26%'}}>
                      <Row
                        style={{
                          borderWidth: 1,
                          borderColor: '#ddd',
                          alignContent: 'flex-start',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}
                      >
                        <AppText
                          title={item.rawMaterial}
                          textAlign="left"
                          //   width="78%"
                          fontSize={13}
                        />
                      </Row>
                    </Col>
                    <Col style={{width: '20%'}}>
                      <Row
                        style={{
                          borderWidth: 1,
                          borderColor: '#ddd',
                          justifyContent: 'flex-start',
                          alignContent: 'flex-start',
                          alignItems: 'center',
                        }}
                      >
                        <View style={{flexDirection: 'row'}}>
                          <AppText
                            title={`${item.rawMaterialQuality}`}
                            textAlign="left"
                            fontSize={13}
                            //   width="70%"
                          />
                        </View>
                      </Row>
                    </Col>

                    <Col style={{width: '16%'}}>
                      <Row
                        style={{
                          borderWidth: 1,
                          borderColor: '#ddd',
                          justifyContent: 'flex-start',
                          alignContent: 'center',
                          alignItems: 'center',
                          // width:'56%'
                        }}
                      >
                        <View style={{justifyContent: 'center', margin: 2}}>
                          <AppText
                            title={`${item.quantity ? "****": item.quantity}`}
                            textAlign="left"
                            fontSize={13}
                          />
                        </View>
                      </Row>
                    </Col>

                    <Col style={{width: '18%'}}>
                      <Row
                        style={{
                          borderWidth: 1,
                          borderColor: '#ddd',
                          justifyContent: 'flex-start',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <AppText
                          title={`${item.measuringUnit ? '****' : item.measuringUnit}  `}
                          textAlign="left"
                          fontSize={13}
                        />
                      </Row>
                    </Col>

                    <Col style={{width: '20%'}}>
                      <Row
                        style={{
                          borderWidth: 1,
                          borderColor: '#ddd',
                          justifyContent: 'flex-start',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <AppText
                          title={`  ${item.amount}Pkr  `}
                          textAlign="left"
                          fontSize={13}
                        />
                      </Row>
                    </Col>
                  </Grid>
                </View>
              );
            })}
          <AppText
            size={18}
            title={'List of Finishing Material'}
            marginHorizontal={25}
            borderTopWidth={1}
            borderTopColor={Colors.lightGrey}
            marginVertical={20}
            paddingVertical={20}
          />
          <View
            style={{
              backgroundColor: Colors.lightYello,
              flexDirection: 'row',
              width: '100%',
              marginTop: 5,
              paddingHorizontal: 30,
            }}
          >
            <View style={{width: '56%', marginRight: 5}}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'transparent',
                  paddingVertical: 10,
                  alignItems: 'flex-start',
                }}
              >
                <AppText title={'Material'} color={Colors.white} bold />
              </TouchableOpacity>
            </View>
            <View
              style={{flexDirection: 'row', width: '44%', paddingHorizontal: 5}}
            >
              <AppText
                title={'Quantity'}
                color={Colors.white}
                paddingVertical={10}
                width={'50%'}
                textAlign={'left'}
              />
              <AppText
                title={'Unit'}
                color={Colors.white}
                paddingVertical={10}
                width={'50%'}
                textAlign={'left'}
              />
            </View>
          </View>
          {finishList &&
            finishList.map((detail, i) => {
              return (
                <View
                  key={i}
                  style={[
                    {
                      flexDirection: 'row',
                      width: '100%',
                      marginTop: 5,
                      marginHorizontal: 30,
                    },
                  ]}
                >
                  <View style={{width: '50%', marginRight: 5}}>
                    <TouchableOpacity
                      onPress={() => handleSelectedOffer(detail)}
                      style={[
                        {
                          paddingVertical: 10,
                          alignItems: 'center',
                          borderRadius: 10,
                          flexDirection: 'row',
                        },
                      ]}
                    >
                      <Text style={{color: Colors.darkgrey}}>
                        {detail.rawMaterial}
                      </Text>
                      {/* detail.rawMaterialQuality === "Premium" ? "A Graded" : detail.rawMaterialQuality == "Standard" ? "B" : "C" */}
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '40%',
                      backgroundColor: '#fff',
                    }}
                  >
                    <AppText
                      title={detail.quantity?"****" : detail.quantity}
                      color={Colors.fieldTextColor}
                      paddingVertical={10}
                      width={'50%'}
                    />
                    <AppText
                      title={`${detail.unit}`}
                      color={Colors.fieldTextColor}
                      paddingVertical={10}
                      width={'50%'}
                    />
                  </View>
                </View>
              );
            })}
          <AppText
            size={18}
            title={'Floor Plans'}
            marginHorizontal={20}
            paddingVertical={25}
            borderBottomWidth={1}
            borderBottomColor={Colors.lightGrey}
          />

          {modalData !== null && (
            <View style={{flex: 1, marginHorizontal: 1}}>
              <Pdf
                trustAllCerts={false}
                source={soursce}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`Current page: ${page}`);
                }}
                onError={error => {
                  console.log(error);
                }}
                onPressLink={uri => {
                  console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
              />
            </View>
          )}

          
          <View>
                    <AppText
                        size={18}
                        title={"Elevation"}
                        marginHorizontal={25}
                        paddingVertical={20}
                        borderBottomWidth={1}
                        marginTop={-5}
                        borderBottomColor={Colors.lightGrey}

                    />
                    <View>
                    {console.log(`${imgUrl}${floorPlanData.imagePath}`,"jsdasv")}
                    <Image source={{uri:`${imgUrl}${floorPlanData.imagePath}`}} style={styles.ElevationImg} />
                    </View>                    
              </View> 

              
              <View>
                    <AppText
                        size={18}
                        title={"DISCLAIMER/IMPORTANT NOTES BELOW CONSTRUCTION SUMMARY"}
                        marginHorizontal={25}
                        paddingVertical={20}
                        borderBottomWidth={1}
                        marginTop={-5}
                        borderBottomColor={Colors.lightGrey}

                    />
                    
                    <View style={{margin:18}}>
                    <Text style={{fontSize:15, color:'#000', marginBottom:5}}>Important Notes:</Text>
                    {notes.map((note,index)=>(
                        <Text style={{marginBottom:4}}>{index+1}- {note.notes}</Text>
                      ))}
                    </View>                    
              </View> 

          <View style={styles.socailButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                // download("ds")
                if (authData.isLogin) {
                  console.log('userLogin');
                  setShowSaveProjectModal(true);
                } else {
                  console.log('user is Not  login in first login');
                  setShowLoginModal(true);
                }
              }}
              style={{
                height: 50,
                width: '50%',
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingHorizontal: 20,
                marginHorizontal: 10,
                backgroundColor: Colors.lightYello,
              }}
            >
              <AppText title={'Download and Exit'} color={'#000'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={myCustomShare}
              style={{
                height: 50,
                width: '50%',
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingHorizontal: 20,
                marginHorizontal: 10,
                backgroundColor: '#E5EAEE',
                borderWidth: 1,
                borderColor: '#E5EAEE',
              }}
            >
              <Icons name="sharealt" size={20} color="#000" />
              <AppText title={'SHARE'} />
            </TouchableOpacity>
          </View>
          <AppSubmitButton
            name={'SAVE THE PROJECT'}
            alignSelf="center"
            textAlign="center"
            onPress={() => {
              if (authData.isLogin) {
                console.log('userLogin');
                setShowSaveProjectModal(true);
                ToastAndroid.show('Saved Successfgully !', ToastAndroid.SHORT);
                navigation.replace('AppStack');
              } else {
                console.log('user is Not  login in first login');
                setShowLoginModal(true);
              }
             
            }}
          />
        </ScrollView>
      </View>

      {/* Show Modals */}
      <ModalCostSave
        visible={showSaveProjectModal}
        onCancelPress={() => setShowSaveProjectModal(false)}
        onPressOk={projectName => {
          console.log('Save Project', projectName);
          SaveCostEstimate(projectName);
          setShowSaveProjectModal(false);
        }}
      />

      <ModalSignIn
        visible={showLoginModal}
        onCancel={() => setShowLoginModal(false)}
        onPresSignup={() => {
          setShowLoginModal(false);
          setShowSignUpModal(true);
        }}
        onPressLogin={() => setShowLoginModal(false)}
      />
      <ModalSignup
        visible={showSignUpModal}
        onCancel={() => setShowSignUpModal(false)}
        onPressLogin={() => {
          setShowLoginModal(true);
          setShowSignUpModal(false);
        }}
        onPressSignup={() => {
          setShowOtpModal(true);
          setShowSignUpModal(false);
        }}
      />
      <ModalOtp
        visible={showOtpModal}
        onCancel={() => setShowOtpModal(false)}
        onPressSubmit={() => setShowOtpModal(false)}
      />
    </View>
  );
};

export default CompleteBoq;
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightYello,
    paddingHorizontal: 40,
  },
  bottom_wrapper: {
    flex: 1,
    margin: 5,
    padding: 10,
  },
  bottom_logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 25,
    marginLeft: 20,
  },
  modalbg: {
    height: height / 1.4,
    width: width / 1.1,
    alignSelf: 'center',
    marginTop: 20,
    overflow: 'scroll',
  },
  socailButtonContainer: {
    marginVertical: 15,
    marginHorizontal: 20,
    height: height - height / 1.4 - 140,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  boqHeader: {
    alignSelf: 'center',
    margin: 15,
  },
  totalEstimate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginHorizontal: 25,
    marginTop: 15,
    marginBottom: 20,
  },
  boqData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginHorizontal: 15,
  },
  pdf: {
    backgroundColor: '#fff',
    flex: 1,
    height: Dimensions.get('window').height / 2.5,
  },
  ElevationImg:{
    backgroundColor: '#fff',
    flex: 1,
    height: Dimensions.get('window').height / 2.5,
    marginHorizontal:12
  }
}); 

const htmlStyles = `
*{
  border: 0;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}
h1,h2 { font: bold 100% sans-serif;
     letter-spacing: 0.1em; 
     text-align: center;
      text-transform: uppercase;
     }
     h3{
        text-transform: uppercase;
        font-size:20px;
        font-weight:bold;
        padding:30px 0px;
     }

/* page */
html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
html { background: #999; cursor: default; }
body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }
/* header */
header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }
header h1 { border-radius: 0.25em;
     color: '#000'; 
     margin: 0 0 1em;
      padding: 0.5em 0; 
      font-size: 22px;
    }

header h2 { border-radius: 0.25em;
        color: #000; 
        margin: 0 0 1em;
         padding: 0.5em 0;
         font-size: 20px;
        }
header p {
    text-align: center;
    font-size: 22px;
    padding:5;
}

header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }
/* article */
article, article address, table.meta, table.inventory { margin: 0 0 3em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }
article address { float: left; font-size: 125%; font-weight: bold; }

/* aside */
aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h1 { border-color: #999; border-bottom-style: solid; }
aside p {
    font-size: 32px;
    font-weight:bold;
    text-align: center;
    margin-top:15;
}
.details{
    display: flex;
    justify-content:space-between;
    margin:0px 10px;
    padding: 5px 30px;
}



.details p {
    width:50%;
    font-size: 22px;
    color:"#000";
}

.detail{
    display: flex;
    justify-content:space-between;
    margin:10px 10px;
    padding: 10px 30px;
}
`;
