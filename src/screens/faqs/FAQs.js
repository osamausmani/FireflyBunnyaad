import { Dimensions, StyleSheet, Text, TouchableOpacity, View,TextInput,TouchableWithoutFeedback, Image } from 'react-native';
import React, { useState, useContext,useEffect } from 'react';
import Pdf from 'react-native-pdf';
import Entypo from 'react-native-vector-icons/Entypo';
import { PostRequest ,getAllConsultancyInfosApi, imgUrl, insertConsultancyApi} from '../../api/apiEndPoint';
import { AppText,Colors, Icon } from '../../constants';
import faqs from './faqs.json';
import { ScrollView } from 'react-native-gesture-handler';
import { AppContext } from '../../contextApi/AppProvider';
import AudioRecord from 'react-native-audio-record'
import Sound from 'react-native-sound'
import Feather from 'react-native-vector-icons/Feather';
import AppSubmitButton from "../../component/appComponnet/AppSubmitButton"
import ModalSignIn from '../../component/appModal/ModalSignIn';
import ModalSignup from '../../component/appModal/ModalSignup';
import { recordPermissions, getUriToBase64, options } from '../../constants/HelperFunctions';
import FilterModal from '../../component/appModal/FilterModal';

import ModalOtp from '../../component/appModal/ModalOtp';




const FAQs = ({ navigation }) => {
  const [showDescriptions, setShowDescriptions] = useState({});
  const [showAnswers, setShowAnswers] = useState({});
  const { authData, setAuthData } = useContext(AppContext)
  const [recording, setRecording] = useState(false)
  const [recordingUploading, setRecordingUploading] = useState(false)
  const [audioUri, setAudioUri] = useState('')
  const [audioFile, setAudioFile] = useState('')
  const [playing, setPlaying] = useState(false)
  const [recordShow, setRecordShow] = useState(true);
  const [isplaying, setIsPlaying] = useState(true);
  const [description, setDescription] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [consultanceyInfo, setConsultanceyInfo] = useState({})
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState([]);



  let sound;
 
const getConsulltanceyinfo = () => {
    try {
        const Model = {
            "userID": 0,
            "userKey": "string",
            "languageCode": "en",
            "ip": "string",
            "responseState": 200,

            "consultancyInfo": {
                "consultancyInfoId": 0,
                "title": "string",
                "description": "string",
                "urllink": "string",
                "dataStateId": 0
            }
        }
        PostRequest(getAllConsultancyInfosApi, Model).then(res => {
            if (res === 0) {
                console.log("error");
                // setShowIndicator(false)
            }
            else {
                // setShowIndicator(false)
                setConsultanceyInfo(res.consultancyInfoList.length && res.consultancyInfoList[0])
                // console.log("res", JSON.stringify(res.consultancyInfoList.length && res.consultancyInfoList[0], null, 2));
            }
        }
        )
    } catch (error) {
        console.log(error);
    }
}

const startPlaying = () => {
    sound && sound.play(success => success && setIsPlaying(true));
    setIsPlaying(false)
}

const stopPlaying = () => {
    sound.pause();
    setIsPlaying(true)
}

const onPlay = () => {
    if (isplaying) {
        sound = new Sound(`${audioUri}`, null, startPlaying);
    } else {
        stopPlaying();
    }
}

const handleClickSubmit = () => {
    if (authData.isLogin) {
        consultanceyOffered()
    }
    else {
        setShowSignUpModal(true)
    }

}




const consultanceyOffered = () => {

    let date = new Date()
    let file = audioFile.uri
    console.log(file, "audio uri")

    try {
        const modal = {
            "userID": 0,
            "userKey": "string",
            "languageCode": "string",
            "ip": "string",
            "responseState": 200,

            "consultancy": {
                "consultancyId": 0,
                "isResidential": true,
                "createdAt": "2022-12-04T11:12:47.999Z",
                "updatedAt": "2022-12-04T11:12:47.999Z",
                "createdBy": 0,
                "updatedBy": 0,
                "dataStateId": 0,
                "description": description,
                "consultancyStatus": 1,
                "areaInSqF": 0,
                "plotLocation": "string",
                "audioUrl": "string",
                "userID": authData.userId,
                "userName": authData.userName,
                "userEmail": "string",
                "userPhoneNo": authData.phNumber
            },
            "attachment": {
                "files": [
                    {
                        "base64String": file,
                        "fileName": "agf.mp3",
                        "title": "string",
                        "description": "string",
                        "isPremium": true,
                        "sortOrder": 0
                    }
                ],
                "attachmentTypeID": 0,
                "actorID": 0,
                "userID": 0,
                "attachmentID": 0
            }
        }
        // console.log("modal data", modal);
        PostRequest(insertConsultancyApi, modal).then(res => {
            if (res === 0) {
                console.log("error", res);
                // setShowIndicator(false)
            }
            else {
                setModalVisible(true)
                // console.log("res", JSON.stringify(res, null, 2));
            }
        }
        )
    } catch (error) {
        console.log(error);
    }

}


const filterFaqs = () => {
    const filtered = faqs.steps.filter((step) => {
      const filteredFaqs = step.faqs.filter((faq) => {
        const question = faq.question.toLowerCase();
        return question.includes(searchQuery.toLowerCase());
      });
      return filteredFaqs.length > 0;
    });
    setFilteredFaqs(filtered);
  };


useEffect(() => {
    setDescription();
    recordPermissions()
    getConsulltanceyinfo()
    filterFaqs();

}, [searchQuery])




  const toggleDescription = (stepIndex) => {
    setShowDescriptions((prevShowDescriptions) => ({
      ...prevShowDescriptions,
      [stepIndex]: !prevShowDescriptions[stepIndex]
    }));
  };
  

  const renderTable = (data, headerNames, tableName) => (
    <View>
      <Text style={styles.tableTitle}>{tableName}</Text>
      <View style={styles.tableRow}>
        {headerNames.map((headerName, index) => (
          <Text key={index} style={styles.tableCell}>{headerName}</Text>
        ))}
      </View>
      {data.map((row, index) => (
        <View key={index} style={styles.tableRow}>
          {headerNames.map((headerName, index) => (
            <Text key={index} style={styles.tableCell}>{row[headerName]}</Text>
          ))}
        </View>
      ))}
    </View>
  );

  const toggleAnswer = (stepIndex, faqIndex) => {
    setShowAnswers((prevShowAnswers) => ({
      ...prevShowAnswers,
      [`${stepIndex}-${faqIndex}`]: !prevShowAnswers[`${stepIndex}-${faqIndex}`]
    }));
  };
  

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name={'arrow-long-left'} color={Colors.white} size={24} />
        </TouchableOpacity>
        <AppText marginLeft={'5%'} bold size={20} title={'Back'} color="#fff" />

      </View>
    );
  };

  return (
    
    <ScrollView style={{ flex: 1, marginHorizontal: 1, marginBottom: 10, height: '100%' }}>
    {renderHeader()}
    <View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search questions..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
    </View>

    <View style={{ margin: 5, padding: 10, alignItems: 'center' }}>
      <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>{faqs.title}</Text>
      {filteredFaqs.map((step, index) => (
        <View key={index} style={{ margin: 13 }}>
          <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: 'black', textDecorationLine: 'underline' }}>
            {step.title}
          </Text>
          <TouchableOpacity onPress={() => toggleDescription(index)}>
            <View style={styles.guidelineContainer}>
              <Text style={styles.guidelineText}>1) Guidelines:</Text>
              <Entypo name={'chevron-down'} color={Colors.black} size={16} style={{ marginRight: 5 }} />
            </View>
            {showDescriptions[index] && (
              <View>
                {step.description.map((desc, descIndex) => (
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }} key={descIndex}>
                    <Text style={{ marginRight: 5, color: 'black' }}>{'\u2023'}</Text>
                    <Text style={{ margin: 2, color: 'black' }}>{desc}</Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}> 2) Frequently Asked Questions:</Text>
          {step.faqs.map((faq, faqIndex) => (
            <TouchableOpacity key={faqIndex} onPress={() => toggleAnswer(index, faqIndex)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: 'gray', paddingBottom: 5, marginBottom: 10 }}>
                <Text style={{ margin: 4, width: '95%', color: 'black' }}>{faq.question}</Text>
                <Entypo name={'chevron-down'} color={Colors.black} size={16} style={{ marginRight: 5 }} />
              </View>
              {showAnswers[`${index}-${faqIndex}`] && (
                <>
                  <Text style={{ margin: 4 }}>{faq.answer}</Text>
                  {faq.RDA_Bylaws && renderTable(faq.RDA_Bylaws, ["Plot_Size", "Building_Line", "Rear_Space", "Side_Space"], 'RDA Bylaws')}
                  {faq.CDA_Bylaws && renderTable(faq.CDA_Bylaws, ["Plot_Size", "Building_Line", "Rear_Space", "Side_1", "Side_2", "Mumty_Area", "Bsmt"], 'CDA Bylaws')}
                  {faq.DocumentsCopies && renderTable(faq.DocumentsCopies, ["DocumentsCopies", "Remarks"], 'DocumentsCopies')}
                  {faq.SteelSizeofSteel && renderTable(faq.SteelSizeofSteel, ["DiameterofSteel", "WeightinKgFeet", "TotalLengthoftheSteelBar", "TotalweightinKgofTotalLengthofthebar"], 'Diameter of Steel')}
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}

    <View style={{ borderBottomColor: Colors.lightGrey, borderBottomWidth: 1 }}></View>
                <View
                    style={{ marginHorizontal: 15, }}
                >

                    <AppText
                        textAlign={"center"}
                        marginTop={20}
                        size={14}
                        width={"80%"}
                        alignSelf={"center"}
                        color={"#2B2B2B"}
                        title={"Please let us know a bit of details for your needs."}
                    />
                    <AppText
                        color={Colors.fontColor}
                        bold
                        marginHorizontal={15}
                        marginTop={20}
                        title={"Please Enter your Query "}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Details"
                        value={description}
                        onChangeText={text => setDescription(text)}
                        multiline={true}
                        numberOfLines={8}
                    />
                    <AppText
                        color={Colors.fontColor}
                        bold
                        marginHorizontal={15}
                        marginTop={20}
                        title={"Record your Message"}
                    />
                    {recordShow ?
                        <View style={[styles.shadow, styles.recordingView]}>
                            <TouchableWithoutFeedback
                                onPressIn={() => {
                                    setRecording(!recording)
                                    try {
                                        (AudioRecord.init(options), AudioRecord.start())
                                    } catch (error) {
                                        console.log('Error recording: ', error)
                                    }
                                }
                                }
                                onPressOut={() => {
                                    setRecording(!recording)
                                    setPlaying(!playing)
                                    setRecordingUploading(true)
                                    setRecordShow(!recordShow)
                                    setIsPlaying(true)

                                    try {
                                        AudioRecord.stop().then(audio => {
                                            setAudioUri(audio)
                                            getUriToBase64(audio).then(res => setAudioFile(res))
                                        })
                                    } catch (error) {
                                        console.log('Error recording: ', error)
                                    }
                                }
                                }
                            >
                                {!recording ?
                                    <View style={styles.row}>
                                        <Feather
                                            name={'mic'}
                                            color={Colors.lightGrey}
                                            size={22}
                                        />
                                        <Text style={styles.recordingText}>Hold to Record audio</Text>
                                    </View>
                                    : <View style={styles.row}>
                                        <Entypo
                                            name={'controller-stop'}
                                            color={Colors.lightYello}
                                            size={24}
                                        />
                                        <Text style={styles.recordingText}>Recording</Text>
                                    </View>}

                            </TouchableWithoutFeedback>
                        </View>
                        :
                        <TouchableOpacity
                            style={[styles.shadow, styles.recordingView]}
                            onPress={() => onPlay()}>
                            {isplaying ?
                                <View style={[styles.row, { paddingHorizontal: 16 }]}>
                                    <View style={[styles.row, { flex: 1 }]}>
                                        <Entypo
                                            name={'controller-play'}
                                            color={Colors.lightGrey}
                                            size={24}
                                        />
                                        <Text style={styles.recordingText}>
                                            Play
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.del}
                                        onPress={() => {
                                            setAudioUri('')
                                            setRecording(false)
                                            setPlaying(false)
                                            setRecordingUploading(false)
                                            setRecordShow(true)
                                        }}>
                                        <Feather
                                            name={'trash'}
                                            color={Colors.lightGrey}
                                            size={24}
                                        />
                                    </TouchableOpacity>

                                </View>
                                :
                                <View style={[styles.row, { paddingHorizontal: 16 }]}>
                                    <View style={[styles.row, { flex: 1 }]}>
                                        <Feather
                                            name={'pause'}
                                            color={Colors.white}
                                            size={24}
                                        />
                                        <Text style={styles.recordingText}>
                                            playing
                                        </Text>
                                    </View>
                                </View>
                            }
                        </TouchableOpacity>
                    }

                    <AppSubmitButton
                        name={"Submit"}
                        width={"98%"}
                        marginTop={30}
                        marginHorizontal={2}
                        onPress={() => {
                            handleClickSubmit()
                            // consultanceyOffered()
                        }

                        } />
                </View>

                <ModalSignIn
                    visible={showLoginModal}
                    onCancel={() => setShowLoginModal(false)}
                    onPresSignup={() => {
                        setShowLoginModal(false)
                        setShowSignUpModal(true)
                    }}
                    onPressLogin={() => setShowLoginModal(false)}
                />
                <ModalSignup
                    visible={showSignUpModal}
                    onCancel={() => setShowSignUpModal(false)}
                    onPressLogin={() => {
                        setShowLoginModal(true)
                        setShowSignUpModal(false)
                    }}
                    onPressSignup={() => {
                        setShowOtpModal(true)
                        setShowSignUpModal(false)
                    }}
                />
                <ModalOtp
                    visible={showOtpModal}
                    onCancel={() => setShowOtpModal(false)}
                    onPressSubmit={() => setShowOtpModal(false)}
                />



                {modalVisible &&
                    <FilterModal
                        isVisible={modalVisible}
                        onClose={() => setModalVisible(false)}
                    >
                        <View style={{
                            flex: 1,
                            alignItems: "center",
                            paddingTop: 25
                        }}>
                            <Image source={Icon.done} resizeMode="contain" style={{ height: 120, width: 120 }} />
                            <AppText
                                title={"Your message  is Recieved"}
                                color={Colors.fontColor}
                                bold
                                size={14}
                                marginTop={20}
                            />
                            <AppText
                                title={"Our Team Will contact "}
                                color={Colors.fontColor}
                                bold
                                size={14}
                                marginTop={3}
                            />
                            <AppText
                                title={"you soon"}
                                color={Colors.fontColor}
                                bold
                                size={14}
                            />
                            <AppSubmitButton
                                onPress={() => {
                                    setModalVisible(false)
                                    navigation.replace("AppStack")
                                }}
                                marginTop={40}
                                name={"Return To Home"}
                            />


                        </View>
                    </FilterModal>}

    
  </View>
</ScrollView>

  );
};

export default FAQs;

const styles = StyleSheet.create({
  header: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightYello,
    paddingHorizontal: 20
  },
  guidelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent:'space-between'
  },
  guidelineText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize:12
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
contactBody: {
    flex: 1,
    marginBottom: 60,       
},
discliamer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: "center",
},
input: {
    marginTop: 15,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: Colors.filedBgColor,
    borderRadius: 10,
    textAlignVertical: 'top',
    overflow: 'scroll',
    maxHeight: 150,
    color: Colors.fieldTextColor
},
pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 300,
    backgroundColor: "#fff"
},
shadow: {
    shadowColor: Colors.GRAY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
},


recordingText: {
    color: Colors.white,
    fontSize: 18,
    marginLeft: 15
},
row: {
    flexDirection: 'row',
},
del: {
    flexDirection: 'row-reverse',
    width: 50,
    borderLeftColor: Colors.white,
    borderLeftWidth: 1,
},
center: {
    flexDirection: 'row',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
},
bold: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
},

recordingView: {
    flexDirection: 'row',
    backgroundColor: Colors.fontColor,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 5,
    marginHorizontal: 10
},
searchBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },





});
