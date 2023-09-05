import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, Modal, TouchableWithoutFeedback, StatusBar, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppText from '../../component/appComponnet/AppText'
import AppSubmitButton from "../../component/appComponnet/AppSubmitButton"
import Feather from 'react-native-vector-icons/Feather';
import { Background, Images, Colors, Icon } from '../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Entypo from 'react-native-vector-icons/Entypo'

import AudioRecord from 'react-native-audio-record'
import Sound from 'react-native-sound'
import { recordPermissions, getUriToBase64, options } from '../../constants/HelperFunctions';
import TermsAndConditionForn from '../../component/customeDrawer/TermsAndConditionForn';
import { PostRequest } from '../../api/axios';
import { getAllConsultancyInfosApi, imgUrl, insertConsultancyApi } from '../../api/apiEndPoint';
import FilterModal from '../../component/appModal/FilterModal';
import { AppContext } from '../../contextApi/AppProvider';
import ModalSignIn from '../../component/appModal/ModalSignIn';
import ModalSignup from '../../component/appModal/ModalSignup';
import ModalOtp from '../../component/appModal/ModalOtp';
import Pdf from 'react-native-pdf';
let sound;

const Consultancy = ({ navigation, route }) => {
    const { val } = route?.params;
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
    const [pdffile, setPdfFile] = useState('')

    const src = `${imgUrl}${consultanceyInfo && consultanceyInfo.urllink}`
    console.log(src, "s");
    const source = { uri: src, cache: true };
    // const source = { uri: `https://www.africau.edu/images/default/sample.pdf`, cache: true };


    useEffect(() => {
        setDescription(val?val:null);
        recordPermissions()
        getConsulltanceyinfo()
    }, [])


    const content = [
        {
          header: 'CONSULTANCY SERVICES',
          text: [
            'At Bunnyaad, get expert guidance and support throughout every step of your construction project. From buying a plot to the completion of the construction project, we will exceed your expectations.'
          ]
        },
        {
          subHeader: 'Hire us for:',
          text: [
            'PLOT BUYING CONSULTANCY:',
            'Plot buying consultancy provides expert guidance in identifying and evaluating your plot. Our team of consultants will help you make an informed and confident decision throughout the entire process ensuring a smooth transaction. We will help you find the right answers to many questions, some of which are stated below:',
            '1. Is your selected plot approved by the government?            ',
            '2. Is your selected plot available on approved LOP by the governmnet?',
            '3. Is your selected plot location as per the approved LOP by the government?',
            '4. Which authority or government body has given approvals regarding your map and for construction on your selected plot?',
            '5. If you buy your selected plot, will that plot get map approvals or construction NOC from the government or any other competent authority?',
            'Is your plot located on filling land or natural surface land?, etc'
          ]
        },
        {
          subHeader: 'SOIL TESTING CONSULTANCY:',
          text: [
            'At Bunnyaad, professional soil testing services and consultancy is available for our valued members. We connect you with our vetted and approved soil testing companies. The soil testing service gives you insight into the bearing capacity of your plot and also provides recommendations for foundational work. This will help you control and manage your construction costs. By utilizing our services, you may be eligible for discounted rates.'
          ]
        },
        {
          subHeader: 'RESIDENTIAL MAP APPROVALS CONSULTANCY FROM SOCIETIES AND GOVERNMENT BODIES:',
          text: [
            "It's been difficult for the average person to get map approvals. Bunnyaad is making it easier. Bunnyaad is a hassle-free platform that simplifies the process of getting building map approvals. We take care of all the document and drawing preparation, present your case before the competent authority on your behalf and get approvals from them in time - so you can relax."
          ]
        },
        {
          subHeader: 'ARCHITECTURAL, STRUCTURAL AND MEP SERVICES AND CONSULTANCY:',
          text: [
            'Bunnyaad is providing the following design services for your dream house construction which include:',
            '1. Architectural Services. Floor plans, sections, elevations, furniture layouts, front elevation renders, and interior designing.',
            '2. Structural Drawings. Foundation details, complete steel layouts, and structural stability certificate.',
            '3. Electrical Drawings. Ceiling light layouts, Light plug layouts, power plug layouts, Main distribution board details, and earthing details.',
            '4. Plumbing Drawings. Water supply layouts, sewerage layouts, gas points routing, any other special requirement.'
          ]
        },
        {
          text: [
            'Moreover, at Bunnyaad, you also get consultancy/guidance for all the above-listed services if you have already outsourced this to someone else.'
          ]
        },
        {
          subHeader: 'COMPLETE TURN-KEY CONSTRUCTION CONSULTANCY:',
          text: [
            "It's difficult for most people to construct a dream home because they lack knowledge, but when you're building a house with Bunnyaad, you don't need to worry about that. Our digital platform lets you search for the right people for your project--from architects to engineers, material suppliers, and contractors--and it also provides transparent insights into each step of the construction process. We give you recommendations based on your budget and your needs while ensuring that all the necessary standards are met during every phase of the building process. Building a house can be difficult, but Bunnyaad makes it simple."
          ]
        },
        {
          subHeader: 'CONSTRUCTION MATERIAL CONSULTANCY:',
          text: [
            "Bunnyaad helps you find the best building materials, at the best prices. If you are having difficulty finding materials or if you think that the material you have already purchased is too costly, Bunnyaad is here to help. We offer complete consultancy in selecting cost-effective building materials that meet engineering standards and come with authentic testing reports on their durability, reliability, and strength. And if you have already bought some materials for your home construction project but are worried about them, we can help you too. All you need to do is contact us before using these materials!"
          ]
        }
      ];

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
            console.log(authData.userId)
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
                    "description": val? val + description : null,
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

    //render Component
    const renderHeader = () => {
        return (
            <ImageBackground source={Background.consultant_bg} style={{ height: 200, alignItems: "center" }} >
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
                            title={"CONSULTANCY SERVICES"}
                            marginTop={8}
                            size={15}
                            color={"#fff"}
                            bold
                            textTransform="uppercase"
                        />

                        <AppText
                            title={`Building your DREAM home is now gives you ease b`}
                            marginTop={8}
                            size={12}
                            color={"#fff"}
                        />
                    </View>
                    <View style={{ width: "45%", alignItems: "center", justifyContent: "center", height: 200 }}>
                        <Image source={Images.consultancy} style={{ width: 190, height: 150 }} />
                    </View>

                </View>
            </ImageBackground>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar
                hidden
            />
            <KeyboardAwareScrollView style={styles.contactBody}>
                {renderHeader()}

                    {content.map((section, index) => (
                        <View key={index} style={{ alignItems: 'center', marginBottom: 20,marginTop:15 }}>
                        {section.header && <Text style={{ fontSize: 24, fontWeight: 'bold',color:'#000', marginBottom: 10, textAlign: 'center' }}>{section.header}</Text>}
                        {section.subHeader && <Text style={{ fontSize: 18, fontWeight: 'bold',color:'#000', marginBottom: 5, textAlign: 'center' }}>{section.subHeader}</Text>}
                        {section.text.map((item, itemIndex) => (
                            <Text key={itemIndex} style={{ marginLeft: section.subHeader ? 20 : 10, marginBottom: 5,color:'#000', textAlign: 'left', margin: 0 }}>{item}</Text>
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
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Consultancy

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





})