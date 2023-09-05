import { StyleSheet, Dimensions } from "react-native"
import { lightGrey } from "../constants/Colors"
const { height, width } = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightGrey
    },
    logo_container: {
        marginTop: "20%",
        margin: width / 2 - 46.8,
    },
    logo: {
        width: 94.6,
        height: 48.64,
    },
    selector: {
        height: height / 1.8,
        marginTop: '-20%',
        alignItems: 'center',
    },
    header: {
        width: "85%",
        height: 67,
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    checkBoxContainer: {
        height: 129,
        width: "85%",
        marginTop: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 5
    },
    line: {
        width: '94%',
        alignSelf: 'center',
        backgroundColor: lightGrey,
        height: 1
    },
    bg: {
        position: 'absolute',
        bottom: -38,
        resizeMode: 'contain',
        width: width,
    },

})