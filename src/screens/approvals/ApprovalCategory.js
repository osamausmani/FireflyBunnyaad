


import { StyleSheet, View, Pressable, Image, FlatList,Text, ImageBackground, TouchableOpacity, Dimensions, PermissionsAndroid,TextInput, Button,ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AppSubmitButton, AppText, Background, Colors, Icon, Images } from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Language from '../../languages/Language'
import { PostRequest } from '../../api/axios'
import { baseUrlApi, getAllApprovalsApi, imgUrl } from '../../api/apiEndPoint'
import LottieLoader from '../../component/customeDrawer/LottieLoader'
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import Pdf from 'react-native-pdf';
const ApprovalCategory = ({ navigation, route }) => {

    const { details } = route.params
    console.log("detail", details);
    const [approvalList, setApprovalList] = useState([])
    const [loader, setLoader] = useState(false)
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const soursce = { uri: `${imgUrl}${details.logo}`, cache: true };
    const source = { uri: `https://www.africau.edu/images/default/sample.pdf`, cache: true };
    console.log(soursce);
    // render list 
    const renderHeader = () => {
        return (
            <ImageBackground source={Background.approal_bg} style={{ height: 70, alignItems: "center" }} >
                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    backgroundColor: "rgba(255,255,255,.2)",
                    width: 30, height: 30, alignItems: "center", justifyContent: "center",
                    margin: 22, borderRadius: 80, overflow: "hidden", alignSelf: "flex-start"
                }}>
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
    

 
  
    const handleSearchTextChange = (text) => {
      setSearchText(text);
      setSearchResult('');
    }
  
    const handleSearch = () => {
        const foundIndex = soursce.uri.toLowerCase().indexOf(searchText.toLowerCase());
      
        if (foundIndex !== -1) {
          setSearchResult(
            <>
              <Text>{soursce.uri.slice(0, foundIndex)}</Text>
              <Text style={{ color: 'red' }}>{soursce.uri.slice(foundIndex, foundIndex + searchText.length)}</Text>
              <Text>{soursce.uri.slice(foundIndex + searchText.length)}</Text>
            </>
          );
        } else {
          setSearchResult('No text found');
        }
      } 

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            {renderHeader()}
            <View style={{ marginTop: 10, paddingHorizontal: 15, marginBottom: 10 }}>
                <AppText
                    size={18}
                    marginHorizontal={20}
                    color={Colors.fieldTextColor}
                    title={details.name} />
                <AppText
                    title={details.description}
                    size={12}
                    marginVertical={5}
                    marginHorizontal={20}
                    color={Colors.fieldTextColor}
                />
{/* 
<View>
      <TextInput
        value={searchText}
        onChangeText={handleSearchTextChange}
        placeholder="Search text"
      />
      <Button title="Search" onPress={handleSearch} />
      <Text>
        {searchResult}
      </Text>
    </View> */}
            </View>
            <View style={{ flex: 1, marginHorizontal: 15, marginBottom: 10 }}>
                
                <Pdf
                    trustAllCerts={false}
                    source={soursce}
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
                        navigation.replace('AppStack', { screen: 'consultancyStack', params: { val: 'Im intrested in Map Approvals ,' }, });
                    }}
                    name={"Consult us"}
                />
            </View>


        </View>
    )
}

export default ApprovalCategory

const styles = StyleSheet.create({
    header: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightYello,
        paddingHorizontal: 40
    },
    contanier: {
        width: '95%',
        height: 80,
        backgroundColor: "#fff",
        marginHorizontal: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        flexWrap: 'wrap',
        overflow: 'hidden',
        alignItems: "center",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 5,
        borderRightWidth: 5,
        borderColor: "rgba(0,0,0,.06)",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5
    },
    image: {
        width: 35,
        height: 35,
    },
    logo: {
        width: 45,
        height: 45,
    },
    pdf: {
        backgroundColor: "#fff",
        flex: 1,
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height,
    }
})