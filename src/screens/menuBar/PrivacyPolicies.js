import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { AppText, Colors } from '../../constants'
import Pdf from 'react-native-pdf';
import { imgUrl } from '../../api/apiEndPoint';


const PrivacyPolicies = ({ navigation }) => {

    const source = { uri: `${imgUrl}extras/Privacy Policy_Bunnyaad_APP.pdf`, cache: true };
    console.log(source);
    const renderHeader = () => {
        return <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Entypo
                    name={'arrow-long-left'}
                    color={Colors.white}
                    size={24}
                />
            </TouchableOpacity>
            <AppText
                marginLeft={"5%"}
                bold
                size={20}
                title={"Privacy Policey"}
                color="#fff"
            />
        </View>
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderHeader()}
            <View style={{ flex: 1, marginHorizontal: 1, marginBottom: 10 }} >
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
        </View>
    )
}

export default PrivacyPolicies

const styles = StyleSheet.create({
    header: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightYello,
        paddingHorizontal: 20
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 300,
        backgroundColor: "#fff"
    },
})