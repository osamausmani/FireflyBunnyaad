import { StyleSheet } from "react-native"
import { lightGrey, textColor } from '../constants/Colors'


export const styles = StyleSheet.create({
    card: {
        width: '95%',
        height: 80,
        backgroundColor: "#fff",
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        flexWrap: 'wrap',
        overflow: 'hidden',
        alignItems: "center",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 5,
        borderRightWidth: 5,
        borderColor: "rgba(0,0,0,.06)",

    },
    cardheader: {
        alignSelf: "center",
        width: "45%",
        justifyContent: "center",
        alignItems: "center"
    },
    cardBody: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%'


    },
    headerBody: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    completion: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center"
    },
    compare: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerLeft: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})