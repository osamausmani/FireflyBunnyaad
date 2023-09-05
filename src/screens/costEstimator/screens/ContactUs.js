import { StyleSheet, Text, View, Pressable, Image, ScrollView, TextInput } from 'react-native'
import React from 'react'
import AppBackground from '../../../component/appComponnet/AppBackground'
import AppHeader from '../../../component/appComponnet/AppHeader'
import AppText from '../../../component/appComponnet/AppText'
import { disclaimer_icon, drawer_back, saveFile_icon } from '../../../assets/path'
import AppSubmitButton from '../../../component/appComponnet/AppSubmitButton'
import { darkgrey, fieldPlaceholderColor, lightGrey } from '../../../constants/Colors'
import Icon from 'react-native-vector-icons/Feather';

const ContactUs = ({ navigation }) => {
    return (
        <AppBackground home background="#fff">
            <AppHeader home background={"#fff"}>
                <View style={styles.header}>
                    <Pressable onPress={() => { navigation.pop() }}>
                        <Image source={drawer_back} style={styles.back} />
                    </Pressable>
                    <Text style={styles.text}>{`Contact Us`}</Text>


                </View>
            </AppHeader>

            <ScrollView style={styles.contactBody}>
                <AppSubmitButton
                    name={"Project Delivery Time Plan"}
                    width={"100%"}
                    backgroundColor={darkgrey}
                />
                <View style={styles.discliamer}>
                    <Icon name="info" size={18} color="#900" />
                    <AppText
                        margin={5}
                        title={"Disclaimer"}
                    />
                </View>
                <AppText
                    textAlign={"center"}
                    marginTop={20}
                    size={18}
                    title={"Please let us know a bit of details for your needs."}
                />
                <TextInput
                    style={styles.input}
                    // value={this.state.value}
                    // onChangeText={text=>this.setState({value:text})}
                    multiline={true}
                    numberOfLines={8}
                />

                <View>
                    <AppText
                        marginHorizontal={15}
                        marginTop={20}
                        marginBottom={-10}
                        title={"Area (sq Feet)"}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Covered Area (optional)"

                    />
                </View>
                <View>
                    <AppText
                        marginHorizontal={15}
                        marginTop={20}
                        marginBottom={-10}
                        title={"Plot Location"}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Plot Location (optional)"

                    />
                </View>

                <AppSubmitButton
                    name={"Submit"}
                    width={"80%"}
                    alignSelf={"center"}
                    marginTop={30}
                    onPress={() => navigation.navigate("SaveFile")} />

            </ScrollView>
        </AppBackground>
    )
}

export default ContactUs

const styles = StyleSheet.create({
    header: {
        flex: 1,
        marginHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
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
        marginTop: -25,
        marginHorizontal: 15,
        paddingHorizontal: 20
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
        borderWidth: 2,
        borderColor: fieldPlaceholderColor,
        borderRadius: 10,
        textAlignVertical: 'top',
        overflow: 'scroll'
    },

})