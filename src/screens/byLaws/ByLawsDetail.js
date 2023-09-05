import { StyleSheet, View, Image, FlatList, ImageBackground, TouchableOpacity, Dimensions, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import AppText from '../../component/appComponnet/AppText'
import ModuleCard from '../../component/tabComponent/ModuleCard'
import Feather from 'react-native-vector-icons/Feather';
import Language from '../../languages/Language'
import { AppSubmitButton, Background, Images } from '../../constants'
import { PostRequest } from '../../api/axios'
import { getDevelopmentAuthoritysDDLApi, imgUrl } from '../../api/apiEndPoint'
import Pdf from 'react-native-pdf';




const ByLawsDetail = ({ navigation, route }) => {
    const { detail } = route.params
    console.log(detail, "detail")
    const [isEnglish, SelectLanguage] = useState(true)

    const source = { uri: `${imgUrl}${detail.logo}`, cache: true };
    // const source = { uri: `https://www.africau.edu/images/default/sample.pdf`, cache: true };
    //render component
    const renderHeader = () => {
        return (
            <ImageBackground source={Background.approal_bg} style={{ height: 80, }} >
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ margin: 20, backgroundColor: "rgba(255,255,255,.2)", width: 30, height: 30, alignItems: "center", justifyContent: "center", borderRadius: 80, overflow: "hidden", alignSelf: "flex-start" }}>
                    <Feather
                        style={{ borderRadius: 100 }}
                        name="arrow-left"
                        size={18}
                        color="#fff"
                    />
                </TouchableOpacity>
            </ImageBackground >
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <View style={{ flex: 1, marginBottom: 10, }} >
                <Pdf
                    trustAllCerts={false}
                    source={source}
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
            <View style={{ marginVertical: 10 }}>
                <AppSubmitButton
                    onPress={() => {
                        navigation.replace('AppStack', { screen: 'consultancyStack', params: { val: 'Im intrested in ByLaws ,' }, });
                    }}
                    name={"Consult us"}
                />
            </View>
        </View>
    )
}

export default ByLawsDetail

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
        marginLeft: "30%",
        padding: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: "#fff"
    },
    container: {
        marginTop: 10,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        textAlign: 'center',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 5,
        borderRightWidth: 6,
        borderColor: "rgba(0,0,0,.06)",
    },
    containerWraper: {
        justifyContent: 'space-between',
        textAlign: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    pdf: {
        backgroundColor: "#fff",
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 300,
    },
})

