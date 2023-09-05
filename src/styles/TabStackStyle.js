import { StyleSheet, Dimensions } from "react-native"
import { lightYello, tab_title_color } from "../constants/Colors"
const { height, width } = Dimensions.get('window')

export const styles = StyleSheet.create({
    imageStyle: {
        width: 20,
        height: 20,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    tabBar: {
        height: 70,
        position: 'absolute',
        bottom: 16,
        right: 16,
        left: 16,
        borderRadius: 16,
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: "#fff",
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        paddingTop: 12,
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: lightYello,
        borderRadius: 25,
    },
    text: {
        width: 80,
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: tab_title_color,
    }
})