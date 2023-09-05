import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { fieldPlaceholderColor, lightYello } from '../../constants/Colors'
import AppText from '../appComponnet/AppText'

const Option = ({ data, onPress }) => {

    return (
        <View style={{ flex: 1 }}>
            {
                data.map((item, i) => <Pressable onPress={onPress}
                    key={i} style={styles.option}>
                    <Text>{item}</Text>
                </Pressable>)
            }
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 50 }}>
                <View style={styles.btnContainer}
                >
                    <Pressable style={styles.prvBtn}>
                        <AppText
                            title={"Previous"}
                            size={18}
                        />
                    </Pressable>
                    <Pressable style={styles.nextBtn}>
                        <AppText
                            title={"Next"}
                            size={18}
                            color={"#fff"}
                        />
                    </Pressable>
                </View>
            </View>
        </View>

    )
}

export default Option

const styles = StyleSheet.create({
    option: {
        padding: 20,
        borderWidth: 2,
        borderColor: fieldPlaceholderColor,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10
    },
    btnContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 50
    },
    prvBtn: {
        borderWidth: 2,
        borderColor: fieldPlaceholderColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 110
    },
    nextBtn: {
        backgroundColor: lightYello,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 110
    }
})