





import { StyleSheet, Text, View, Pressable, Image, FlatList, } from 'react-native'
import React, { useState } from 'react'
import { confirm_icon, cross_icon } from '../../assets/path'
import { background_grey, lightGrey, lightYello } from '../../constants/Colors'
import AppHeader from '../../component/appComponnet/AppHeader'
import SaveCard from '../../component/tabComponent/SaveCard'

import { savedData } from '../../constants/SavedData'

const ComapreResult = ({ navigation }) => {
    const [selectedItem, setSelectedItem] = useState(null)
    const [isSelected, setIsSelected] = useState(false)

    const handleSelected = (item) => {
        setSelectedItem(selectedItem === item ? null : item)
        setIsSelected(selectedItem === item ? false : true)
    }

    return (
        <View style={{ flex: 1, backgroundColor: lightGrey }}>
            <AppHeader home plain >
                <View style={styles.header}>
                    <Pressable onPress={() => { isSelected ? navigation.navigate("CompareResult") : navigation.pop() }}>
                        <Image source={isSelected ? confirm_icon : cross_icon} style={styles.back} />
                    </Pressable>
                    <Text style={styles.text}>{isSelected ? `Confirm` : `Select a Project to Compare with`}</Text>
                </View>
            </AppHeader>
            <View style={{ flex: 1, marginTop: -50, }}>
                <FlatList
                    style={{ paddingTop: 25, }}
                    data={savedData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View style={{ marginVertical: 10, }}>
                            <SaveCard onPress={() => handleSelected(item)} data={item} style={item === selectedItem ? {
                                opacity: 100,
                                borderWidth: 2,
                                borderColor: lightYello,
                            }
                                : {
                                    backgroundColor: background_grey,

                                }}
                                selected={item === selectedItem ? "#fff" : "#EEEEEF"}
                            />
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                />

            </View>

        </View>
    )
}

export default ComapreResult

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
        marginLeft: "1%",
        padding: 10,
        fontSize: 21,
        color: "#fff"
    },

})