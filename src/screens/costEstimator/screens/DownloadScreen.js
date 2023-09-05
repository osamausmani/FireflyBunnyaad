import { StyleSheet, View, TouchableOpacity, FlatList, Image, PermissionsAndroid, Alert ,ToastAndroid ,Linking ,Platform } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { PostRequest } from '../../../api/axios';
import { flowUrl, getAllFloorPlansApi, getAttachmentApi, getFloorPlanByIDApi, getHomeFinanceDocApi, imgUrl, updateClientCostEstimateQuestionsApi } from '../../../api/apiEndPoint';
import { Icon, Colors, AppText, AppSubmitButton } from '../../../constants';
import { AppContext } from '../../../contextApi/AppProvider';
import RNFetchBlob from 'rn-fetch-blob'
import { userModel, floorPlan } from '../../../models';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import PDFView from 'react-native-pdf';
import notes from './notes.json'



const DownloadScreen = ({ navigation, route }) => {

    const { result, floorPlanData, floorRelationIds, downloadData, setDownloadData, costEstimateId,floorPlanId,constructionData ,authData} = useContext(AppContext)
    const [selectedItem, setSelectedItem] = useState(null)
 const [downloadimage,setDownloadImage] =useState('')

    const [diagramData] = useState([
        { id: 1, name: "submission Drawing", value: "true" },
        { id: 2, name: "Working Drawing ", value: "true" },
        { id: 3, name: "none", value: "false" },
    ])

    console.log(floorPlanData.description)
    // console.log(notes,"notes")

    const boqData = [
        {key: 'City', value: result.city},
        {key: 'Plot Area', value: result.plotArea},
        {key: 'Size of Plot', value: result.sizeOfPlot},
        {key: 'Construction Quality', value: result.constructionQuality},
        {key: 'Plot Categories', value: result.plotCategory},
        {key: 'No. of Floors', value: result.noOfFloors},
      ];

   
    useEffect(() => {

        handleHomeDoc()
        getAllFloorPlans()
        handleDetail()
    }, []);


    const generateHTMLTable = () => {
        const boqRows = boqData.map((item) => {
          return `<tr>
                    <td>${item.key}</td>
                    <td>${item.value}</td>
                  </tr>`;
        });
      
        const tableRows = constructionData.map((item, index) => {
          return `<tr key=${index}>
                    <td>${item.rawMaterial}</td>
                    <td>${item.measuringUnit}</td>
                    <td>${item.quantity}</td>
                    <td>${item.rate}</td>
                    <td>${item.amount}</td>
                  </tr>`;
        });
      
        const floorPlanDescription = floorPlanData.description.map((item) => {
          const floorPlanEntries = Object.entries(item).map(([key, value]) => {
            if (key !== "FloorPlanID") {
              const sectionEntries = Object.entries(value).map(([sectionKey, sectionValue]) => `${sectionKey}: ${sectionValue}`).join(", ");
              return `<tr>
                        <td><p>${key}</p></td>
                        <td>${sectionEntries}</td>
                      </tr>`;
            }
            return "";
          });
      
          return floorPlanEntries.join('');
        });
      
        const notesList = notes.map((note) => {
          return `<li>${note.notes}</li>`;
        });
      
        const html = `
          <html>
            <head>
              <style>
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  border: 1px solid black;
                  padding: 8px;
                }
                th {
                  background-color: #f2f2f2;
                }
              </style>
            </head>
            <body>
              <h1 style={{justifyContent:'center}}>BOQ</h1>
              <table>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  ${boqRows.join('')}
                </tbody>
              </table>
              
              <h1>Construction Data</h1>
              <table>
                <thead>
                  <tr>
                    <th>Raw Material</th>
                    <th>Measuring Unit</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${tableRows.join('')}
                </tbody>
              </table>
              
              <h1>Floor Plan Description</h1>
              <table>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  ${floorPlanDescription.join('')}
                </tbody>
              </table>
              
              <img src="${imgUrl}${floorPlanData?.imagePath}" alt="Download Image">
              
              <h1>Notes</h1>
              <ul>
                ${notesList.join('')}
              </ul>
            </body>
          </html>
        `;
      
        return html;
      };
      
      
      

      
      const generatePDF = async () => {
        const htmlContent = generateHTMLTable();
        const options = {
          html: htmlContent,
          fileName: 'construction_data',
          directory: 'docs',
        };
      
        try {
          const pdf = await RNHTMLtoPDF.convert(options);
          const sourcePath = pdf.filePath;
      
          if (sourcePath) {
            const downloadDir = RNFetchBlob.fs.dirs.DownloadDir;
            let destinationPath = `${downloadDir}/construction_data.pdf`;
            let counter = 1;
      
            while (await RNFetchBlob.fs.exists(destinationPath)) {
              destinationPath = `${downloadDir}/construction_data${counter}.pdf`;
              counter++;
            }
      
            await RNFetchBlob.fs.mv(sourcePath, destinationPath);
      
            ToastAndroid.show(
              `PDF saved successfully at: ${destinationPath}`,
              ToastAndroid.SHORT
            );
      
            if (Platform.OS === 'ios') {
              await RNFetchBlob.ios.openDocument(destinationPath);
            } else if (Platform.OS === 'android') {
              await RNFetchBlob.android.actionViewIntent(
                destinationPath,
                'application/pdf'
              );
            }
          } else {
            console.log('Source path is empty. PDF generation may have failed.');
            ToastAndroid.show('PDF generation failed.', ToastAndroid.SHORT);
          }
        } catch (error) {
          console.error('Error generating the PDF:', error);
          ToastAndroid.show('Error generating the PDF.', ToastAndroid.SHORT);
        }
      };
      
      
      



    const getAllFloorPlans = async () => {
  const Model = {
    ...userModel,
    floorPlan: {
      ...floorPlan,
      floorPlanId: floorPlanData !== null ? floorPlanData.floorPlanId : floorPlanId
    },
    isPremium: true,
  };
  PostRequest(getFloorPlanByIDApi, Model)
    .then(async (res) => {
      if (res === 0) {
        console.log("error");
      } else {
        await generatePDF();
        downloadFile(`${imgUrl}${res?.attachmentList[0]?.path}`);
        setDownloadImage(`${imgUrl}${res?.attachmentList[0]?.path}`);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

    const handleHomeDoc = async () => {
        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "en",
                "ip": "string",
                "responseState": 200,

                "homeFinanaceModel": {
                    "floorPlanID": result.floorPlanId == 0 ? 1 : result.floorPlanId,
                    "bankID": 1,
                    "bankName": "string",
                    "documentURL": "string"
                }
            }
            PostRequest(getHomeFinanceDocApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                }
                else {
                    console.log("res", JSON.stringify(res.homeFinanaceModel.floorPlanID, null, 2));
                    if (downloadData.isIntrestedFile && res.responseState == 200) {
                        downloadFile(`${flowUrl}${res.homeFinanaceModel.documentURL}`)
                        setDownloadImage(`${flowUrl}${res.homeFinanaceModel.documentURL}`)

                    }
                }
            }
            )
        } catch (error) {
            console.log(error);
        }

    }

    const handleDetail = async () => {
        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "string",
                "ip": "string",
                "responseState": 200,

                "attachment": {
                    "attachmentId": floorPlanData.modalData[0].attachmentId,
                    "attachmentTypeId": floorPlanData.modalData[0].attachmentTypeId,
                    "atachment": "string",
                    "path": "string",
                    "actionRowId": costEstimateId,
                    "createdAt": "2023-01-30T14:05:13.592Z",
                    "updatedAt": "2023-01-30T14:05:13.592Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 0,
                    "attachmentText": "string",
                    "attachmentDescription": "string",
                    "sortOrder": 0,
                    "isPremium": false,
                    "isElevation": false
                }
            }
            PostRequest(getAttachmentApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                }
                else {
                    console.log("res", JSON.stringify(res.attachments[0].attachment, null, 2));
                    if (res.attachments && res.attachments.length > 0) {
                        const attachment = res.attachments[0].attachment;
                      } else {
                        console.log('No attachment found.');
                      }
                }
            }
            )
        } catch (error) {
            console.log(error);
        }

    }


    const actualDownload = (file) => {
        const { dirs } = RNFetchBlob.fs;
        RNFetchBlob.config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: 'Report.pdf',
            path: `${dirs.DownloadDir}/Report.pdf`,
          },
        })
          .fetch('GET', file, {})
          .then((res) => {
            console.log('The file saved to', res.path());
          })
          .catch((error) => {
            console.log('Error downloading the file:', error);
          });
      };
      
      const downloadFile = async (file) => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            actualDownload(file);
            console.log('File downloaded successfully!');
            ToastAndroid.show('File downloaded successfully!', ToastAndroid.SHORT);
          } else {
            console.log('Storage permission denied. File could not be downloaded.');
            ToastAndroid.show(
              'Storage permission denied. File could not be downloaded.',
              ToastAndroid.SHORT
            );
          }
        } catch (error) {
          console.error('Error downloading the file:', error);
          ToastAndroid.show('Error downloading the file.', ToastAndroid.SHORT);
        }
      };



    // const download = (item) => {
    //     downloadFile()
    //     console.log(item);
    //     let extension = item.split('.').pop();
    //     RNFetchBlob
    //         .config({
    //             addAndroidDownloads: {
    //                 description: "file",
    //                 useDownloadManager: true,
    //                 notification: true,
    //                 path: RNFetchBlob.fs.dirs.DownloadDir + "file_" + extensiond
    //             },
    //             fileCache: true,
    //         })
    //         .fetch('GET', `http://20.115.97.210:2025//wwwroot/Banks/Bank Alfalah/20x40 BOQ Alfalah Bank.pdf`, {
    //             //some headers ..
    //         })
    //         .then((res) => {
    //             // the temp file path
    //             console.log('The file saved to ', res.path())
    //         }).catch(e => console.log(e))


    //     const date = new Date()
    //     let img_url = path

    //     const { config, fs } = RNFetchBlob
    //     let pDir = fs.dirs.DownloadDir
    //     let options = {
    //       fileCache: true,
    //       addAndroidDownloads: {
    //         useDownloadManagers: true,
    //         notification: true,
    //         path: pDir + '/file_' + extension,
    //         description: "Image"
    //       }
    //     }
    //     config(options)
    //       .fetch("GET", path)
    //       .then(res => {
    //         console.log(res, "success")
    //       })


    // }


    const handleUpdateClientQuestion = async (isIntrested, type) => {

        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "en",
                "ip": "string",
                "responseState": 200,

                "isPremium": true,
                "clientCostEstimate": {
                    "id": 0,
                    "userId": authData?.userId,
                    "projectName": "string",
                    "projectTotalCost": 6000,
                    "cityId": floorRelationIds.cityID,
                    "societyId": floorRelationIds.societyID,
                    "plotSizeId": floorRelationIds.plotSizeID,
                    "floorId": floorRelationIds.floorID,
                    "unitId": floorRelationIds.unitID,
                    "floorPlanId": floorPlanData !== null ? floorPlanData.floorPlanId : floorPlanId,
                    "constructionQualityId": result.constructionQualityId,
                    "city": result.city,
                    "plotCategoryId": floorRelationIds.plotCategoryID,
                    "plotCategory": result.plotCategory,
                    "society": result.plotArea,
                    "plotSize": result.sizeOfPlot,
                    "floor": result.noOfFloors,
                    "unit": result.noOfUnits,
                    "floorPlan": result.floorPlan,
                    "constructionQuality": result.constructionQuality,
                    "isPaid": true,
                    "paymentMethodId": 0,
                    "paymentTransactionId": "string",
                    "rawMaterialDetails": "string",
                    "finishingRawMaterialDetails": "string",
                    "completedPercentage": 0,
                    "isFullyCompleted": true,
                    "costEstimateUrl": "string",
                    "isInterstedInDiagrams": true,
                    "isInterestedInHomeFinance": true,
                    "diagramLeadStatus": 0,
                    "homeFinanceLeadStatus": 0,
                    "createdAt": "2022-12-07T14:32:47.628Z",
                    "updatedAt": "2022-12-07T14:32:47.628Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 0,
                    "bankId": 0
                },
                "updateCostEstimateStatus": {
                    "costEstimateID": costEstimateId,
                    "isInterested": isIntrested,
                    "requestType": type,
                    "status": 1
                }
            }
            PostRequest(updateClientCostEstimateQuestionsApi, Model).then(res => {
                console.log(res)
                if (res === 0) {
                    console.log("error");
                }
                else {
                    console.log("res", JSON.stringify(res, null, 2));

                }
            }
            )
        } catch (error) {
            console.log(error);
        }
    }


    const onItemSelected = (item) => {
        if (selectedItem !== null && selectedItem.id == item.id) {
            setSelectedItem(null)
        }
        else {
            setSelectedItem(item)
        }
    }


    // render components 
    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    // navigation.goBack()
                }}>
                    {/* <AppText
                        marginLeft={"5%"}
                        size={20}
                        bold
                        title={"X"}
                        color="#fff"
                    /> */}
                </TouchableOpacity>
                <AppText
                    marginLeft={"0%"}
                    bold
                    size={20}
                    title={""}
                    color="#fff"
                />
            </View>
        )
    }
    const renderItem = ({ item, i }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    onItemSelected(item)
                }}
                style={[styles.option,
                    //  { borderRightWidth: 5, borderColor: Colors.darkYellow } : {}
                ]}
            >
                <AppText
                    color={Colors.fieldTextColor}
                    title={`${item.name} `}
                    textAlign={"left"}
                    size={14}
                    // bold={selectedItem && selectedItem.constructionQualityId == item.constructionQualityId ? true : false}
                    width={"80%"}
                />
                {selectedItem && selectedItem.id == item.id ? <Image source={Icon.fill_radio} style={{ width: 20, height: 20 }} />
                    : <Image source={Icon.unfil_radio} style={{ width: 20, height: 20 }} />}

            </TouchableOpacity>
        );
    };
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: 30, height: "76%" }}>
                    <AppText
                        title={"Are you intrested in any of the  below options ?"}
                        bold
                        color={Colors.fieldTextColor}
                        alignSelf={"center"}
                        size={18}
                        marginVertical={30}
                        textAlign={"center"}
                        width={"80%"}
                    />
                    <FlatList
                        style={styles.flatList}
                        data={diagramData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </View>



            </View>
            <AppSubmitButton
    onPress={() => {
        if (selectedItem == null) {
            navigation.replace('AppStack', { screen: 'consultancyStack', params: { val: 'Im intrested in floor plan ,' }, });
        } else {
            handleUpdateClientQuestion(selectedItem.value, 1);
            navigation.replace('AppStack', { screen: 'consultancyStack', params: { val: 'Im intrested in floor plan ,' }, });
        }
    }}
    marginVertical={20}
    name={"Countinue"}
/>

        </View>
    )
}

export default DownloadScreen

const styles = StyleSheet.create({
    header: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightYello,
        paddingHorizontal: 40
    },
    option: {
        padding: 15,
        borderWidth: 1,
        borderColor: Colors.fieldPlaceholderColor,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginHorizontal: 30,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    flatList: {
        paddingVertical: 0,
        height: 250,
        overflow: "hidden"
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
    yesBtn: {
        width: "40%",
        backgroundColor: Colors.lightYello,
        borderWidth: 1,
        borderColor: Colors.lightYello,
        padding: 10,
        alignItems: "center",
        borderRadius: 10
    },
    noBtn: {
        width: "40%",
        backgroundColor: Colors.fieldPlaceholderColor,
        borderWidth: 1,
        borderColor: Colors.fieldPlaceholderColor,
        padding: 10,
        alignItems: "center",
        borderRadius: 10
    }
})

