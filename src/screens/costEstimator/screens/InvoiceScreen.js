import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    PermissionsAndroid,
    StatusBar,
    Text,
   
  } from 'react-native';
  import React, {useContext, useState, useEffect} from 'react';
  import Icons from 'react-native-vector-icons/AntDesign';
  import RNHTMLtoPDF from 'react-native-html-to-pdf';
  import FileViewer from 'react-native-file-viewer';
  import Share from 'react-native-share';
  import AppText from '../../../component/appComponnet/AppText';
  import AppSubmitButton from '../../../component/appComponnet/AppSubmitButton';
  import {Colors} from '../../../constants';
  import {AppContext} from '../../../contextApi/AppProvider';
  import {
    imgUrl,
    insertClientCostEstimateApi,
    uploadAttachmentBase64Api,
  } from '../../../api/apiEndPoint';
  import ModalCostSave from '../../../component/appModal/ModalCostSave';
  import {PostRequest} from '../../../api/axios';
  import RNFetchBlob from 'rn-fetch-blob';
  import RNFS from 'react-native-fs';
  import Pdf from 'react-native-pdf';
  import {getUriToBase64} from '../../../constants/HelperFunctions';
  import ModalSignIn from '../../../component/appModal/ModalSignIn';
  import ModalSignup from '../../../component/appModal/ModalSignup';
  import ModalOtp from '../../../component/appModal/ModalOtp';
  import {Col, Row, Grid} from 'react-native-easy-grid';
  import notes from './notes.json'
  
  const InvoiceScreen = ({navigation,route}) => {
    const {
      result,
      constructionData,
      floorPlanData,
      authData,
      costEstimateId,
      setCostEstimateId,
      downloadData,
      setDownloadData,
    } = useContext(AppContext);
    
    const[image,setImage] =useState(route.params.image)

    console.log(floorPlanData.description,"sdasd")
  
    const boqData = [
      {key: 'City', value: result.city},
      {key: 'Plot Area', value: result.plotArea},
      {key: 'Size of Plot', value: result.sizeOfPlot},
      {key: 'Construction Quality', value: result.constructionQuality},
      {key: 'Plot Categories', value: result.plotCategory},
      {key: 'No. of Floors', value: result.noOfFloors},
    ];
    const [saveFile, setSaveFile] = useState('');
    const [showSaveProjectModal, setShowSaveProjectModal] = useState(false);
  
    const [totalAmount, setTotalAmount] = useState(0);
    const [modalData, setModalData] = useState(null);
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
      let sum = [];
      constructionData &&
        constructionData.map(element => {
          sum.push(element.amount);
        });
      let TotalAmount = sum.reduce(function (a, b) {
        return a + b;
      },0);
      setTotalAmount(TotalAmount);
  
      // askPermission();
    }, []);
  
  
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
                    ${details.map(
                      item => `
                    <div class ="details">
                    <p>${item.name}</p> 
                    <p>${item.value}</p>
                    </div>
                    `,
                    )}
                    <br/>
                    <br/>
  
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
                  
                  <br/>
                  <br/>
                    <article>
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
    // const askPermission = () => {
    //   async function requestExternalWritePermission() {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //         {
    //           title: 'Pdf creator needs External Storage Write Permission',
    //           message: 'Pdf creator needs access to Storage data in your SD Card',
    //         },
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         createPDF();
    //       } else {
    //         alert('WRITE_EXTERNAL_STORAGE permission denied');
    //       }
    //     } catch (err) {
    //       alert('Write permission err', err);
    //       console.warn(err);
    //     }
    //   }
    //   if (Platform.OS === 'android') {
    //     requestExternalWritePermission();
    //   } else {
    //     createPDF();
    //   }
    // };
  
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
      getUriToBase64(file.filePath).then(res => {
          setSaveFile(res)
      })
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
      } catch (error) {
        console.log('Error => ', error);
      }
    };
  
  
    const SaveCostEstimate = async projectName => {
      // console.log(projectName, saveFile);
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
            rawMaterialDetails:constructionData !== null? JSON.stringify(constructionData): 'string',
            finishingRawMaterialDetails: null,
            completedPercentage: 100,
            isFullyCompleted: true,
            costEstimateUrl: null,
            isInterstedInDiagrams: false,
            isInterestedInHomeFinance: false,
            diagramLeadStatus: 0,
            homeFinanceLeadStatus: 0,
            createdAt: '2022-12-07T12:48:43.935Z',
            updatedAt: '2022-12-07T12:48:43.935Z',
            createdBy: authData?.userId0,
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
            download(saveFile)
            handleUploadFile(res.clientCostEstimate.id);
            setCostEstimateId(res.clientCostEstimate.id);
            navigation.navigate('paymentScreen', {
              costId: res.clientCostEstimate.id,
              file: saveFile,
              image:image,
              invoiceData : boqData,
              structureData : constructionData,
              totalAmount:totalAmount
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    // console.log(route.params.allIds,'boq hello there')
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
      console.log(JSON.stringify(model, null, 2))
      PostRequest(uploadAttachmentBase64Api, model).then(res => {
        if (res === 0) {
          console.log('error', 'res err');
        } else {
          console.log(JSON.stringify(res, null, 2), 'file upload successfully');
        }
      });
    };
  
    const download = async item => {
      // console.log(saveFile);
  
      // let extension = item.split('.').pop();
      // RNFetchBlob
      //     .config({
      //         addAndroidDownloads: {
      //             description: "file",
      //             useDownloadManager: true,
      //             notification: true,
      //             path: RNFetchBlob.fs.dirs.DocumentDir + "file_" + extension
      //         },
      //         fileCache: true,
      //     })
      //     .fetch('GET', `file:///${saveFile}`, {
      //         //some headers ..
      //     })
      //     .then((res) => {
      //         // the temp file path
      //     }).catch(e => console.log(e))
  
      // downloadPDF = async (url, fileName) =>{
      //Define path to store file along with the extension
      const path = `${RNFS.DocumentDirectoryPath}/${saveFile}.pdf`;
      const headers = {
        Accept: 'application/pdf',
        'Content-Type': 'application/pdf',
        Authorization: `Bearer [token]`,
      };
      let filePath = `file:///${saveFile}`;
      //Define options
      const options = {
        fromUrl: filePath,
        toFile: path,
      };
      // Call downloadFile
      const response = RNFS.downloadFile({
        fromUrl: `http://20.115.97.210:2025//wwwroot/Banks/Bank Alfalah/20x40 BOQ Alfalah Bank.pdf'`,
        toFile: path,
      });
      // console.log(response, '-------------------------------');
      return response.promise.then(async res => {
        //Transform response
        if (res && res.statusCode === 200 && res.bytesWritten > 0 && res.path) {
        } else {
          console.log('ds');
        }
      });
    };

    const formatNumberWithCommas = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    const formattedTotalAmount = formatNumberWithCommas(totalAmount);
  
    //  Component Display
    const renderHeader = () => {
      return (
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Icons name="arrowleft" size={30} color="#fff" />
          </TouchableOpacity>
          <AppText
            marginLeft={'5%'}
            size={20}
            title={'Invoice'}
            color="#fff"
          />
        </View>
      );
    };
    const renderBoqTopHeader = () => {
      return (
        <>
          <View style={styles.boqHeader}>
            <AppText size={25} bold title={'Invoice'} marginTop={12} />
          </View>
          <AppText
            size={16}
            title={result.name}
            alignSelf="center"
            marginTop={5}
            color={Colors.fieldTextColor}
          />
          <View style={styles.totalEstimate}>
            <AppText
              title={'Total Estimate'}
              color={Colors.lightblack}
              size={16}
            />
            <AppText title={`${formattedTotalAmount && formattedTotalAmount} PKR.`} size={16} />
          </View>
        </>
      );
    };
  

  
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar hidden />
        {renderHeader()}
  
        <View style={{marginTop: 10, paddingBottom: 85}}>
          <ScrollView>
            {renderBoqTopHeader()}
            {boqData.map((data, index) => {
              return (
                <View style={styles.boqData} key={index}>
                  <Grid>
                    <Col style={{width: '45%'}}>
                      <Row
                        style={{
                          borderWidth: 1,
                          borderColor: '#ddd',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}
                      >
                        <AppText
                          title={data.key}
                          textAlign="left"
                          width="87%"
                          color={Colors.lightblack}
                          fontWeight="bold"
                        />
                      </Row>
                    </Col>
                    <Col>
                      <Row
                        style={{
                          borderWidth: 1,
                          borderColor: '#ddd',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <AppText
                          title={data.value}
                          textAlign="left"
                          width="75%"
                        />
                      </Row>
                    </Col>
                  </Grid>
                </View>
              );
            })}
            <AppText
              size={20}
              title={'Grey Structure BOQ Summary'}
              marginHorizontal={25}
              paddingVertical={25}
              borderBottomWidth={1}
              borderBottomColor={Colors.lightGrey}
            />
  
            <Grid>
              <Col style={{width: '30%'}}>
                <Text style={{left: 10}}>Material</Text>
              </Col>
              <Col style={{width: '20%'}}>
                <Text style={{left: 4}}>Quality</Text>
              </Col>
              <Col style={{width: '20%'}}>
                <Text style={{right: 4}}>Quantity</Text>
              </Col>
              <Col style={{width: '20%'}}>
                <Text style={{}}>Unit</Text>
              </Col>
              <Col style={{width: '20%'}}>
                <Text style={{right: 31}}>Amount (Rs)</Text>
              </Col>  
            </Grid>
            {constructionData &&
              constructionData.map((item, i) => {
                return (
                  <View style={styles.boqData} key={i}>
                    <Grid>
                      <Col style={{width: '30%'}}>
                        <Row
                          style={{
                            borderWidth: 1,
                            borderColor: '#ddd',
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
                              title={`${item.quantity ? '****': item.quantity} `}
                              // title={`${item.quantity} `}
                              
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
                            title={`${item.rate ? '****' :item.rate}  `}
                            // title={`${item.rate}`}
  
                            textAlign="left"
                            fontSize={13}
                          />
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
                            title={`${item.amount}`}
                            textAlign="left"
                            fontSize={13}
                          />
                        </Row>
                      </Col>
                      {/* </View> */}
                    </Grid>
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
                      <Image source={{uri:`${imgUrl}${image}`}} style={styles.ElevationImg} />
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


                    <View>
                    <AppText
                        size={18}
                        title={"Description"}
                        marginHorizontal={25}
                        paddingVertical={20}
                        borderBottomWidth={1}
                        marginTop={-5}
                        borderBottomColor={Colors.lightGrey}

                    />

<View style={{ margin:8, flexDirection: 'row' }}>


<View style={{ flex: 1, margin:10 }}>
  {floorPlanData.description.map((x, index) => (
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
  {floorPlanData.description.map((x, index) => (
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
                    </View>
            
              </View> 
  
        
  
            <View style={styles.socailButtonContainer}>
            <AppSubmitButton
              width="100%"
              name={'Proceed to Download full Version'}
              alignSelf="center"
              textAlign="center"
              onPress={() => navigation.navigate('paymentScreen',{
              image:image,
              file: saveFile,
              invoiceData : boqData,
              structureData : constructionData,
              floorPlanId: floorPlanData.floorPlanId,
              totalAmount:{totalAmount}
              })}
            />
  
            
           
            </View>
   
          </ScrollView>
        </View>
  
        
  
  
        {/* Show Modals */}
  
          <ModalCostSave
          visible={showSaveProjectModal}
          onCancelPress={() => setShowSaveProjectModal(false)}
          onPressOk={projectName => {
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
  
  export default InvoiceScreen;
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
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '68%',
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
      marginHorizontal: 5,
    },
    pdf: {
      backgroundColor: '#fff',
      flex: 1,
      // width: Dimensions.get('window').width,
      height: Dimensions.get('window').height / 2.5,
    },
    ElevationImg:{
      backgroundColor: '#fff',
      flex: 1,
      // width: Dimensions.get('window').width,
      height: Dimensions.get('window').height / 2.5,
      marginHorizontal:12
    }
    
  });
  /////file style
  
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
  