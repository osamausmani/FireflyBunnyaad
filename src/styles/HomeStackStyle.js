import { StyleSheet, Dimensions } from "react-native"
import { lightGrey, header_line_color } from "../constants/Colors"
const { height, width } = Dimensions.get('window')


export const styles = StyleSheet.create({

    topHeader: {
        height: 75,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row: { flexDirection: 'row' },
    logo: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10
    },
    titleContainer: {
        height: 45,
        marginHorizontal: 20,
        justifyContent: 'center'
    },
    title: {
        fontSize: 16,
        color: '#fff',
    },
    line: {
        borderColor: header_line_color,
        borderWidth: .8,
        height: 1,
        marginHorizontal: 0
    },
    body: {
        backgroundColor: lightGrey,
        height: '100%',
        flex: 1,
        width: "100%",
        // marginTop: -55,
        borderTopRightRadius: 45,
    },
    header_icon: {
        width: 30,
        height: 30,
    }


})