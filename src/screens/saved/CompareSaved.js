


import { StyleSheet, Text, View, Pressable, Image, FlatList, } from 'react-native'
import React, { useState } from 'react'
import { confirm_icon, cross_icon } from '../../assets/path'
import { background_grey, lightGrey, lightYello } from '../../constants/Colors'
import AppHeader from '../../component/appComponnet/AppHeader'
import SaveCard from '../../component/tabComponent/SaveCard'

import Icon from 'react-native-vector-icons/Ionicons'

import { savedData } from '../../constants/SavedData'
import AppModal from '../../component/appModal/AppModal'
import AppText from '../../component/appComponnet/AppText'

const CompareSaved = ({ navigation }) => {
    const [selectedItem, setSelectedItem] = useState(null)
    const [isSelected, setIsSelected] = useState(false)
    const [viewResult, setViewResult] = useState(false)

    const handleSelected = (item) => {
        setSelectedItem(selectedItem === item ? null : item)
        setIsSelected(selectedItem === item ? false : true)
    }

    return (
        <View style={{ flex: 1, backgroundColor: lightGrey }}>
            <AppHeader home plain >
                <View style={styles.header}>
                    <Pressable onPress={() => { isSelected ? setViewResult(true) : navigation.pop() }}>
                        <Image source={isSelected ? confirm_icon : cross_icon} style={styles.back} />
                    </Pressable>
                    <AppText
                        marginLeft={"1%"}
                        padding={10}
                        size={21}
                        color={"#fff"}
                        title={isSelected ? `Confirm` : `Select a Project to Compare with`}
                    />
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
            <AppModal
                visible={viewResult}
            >
                <View style={{
                    backgroundColor: '#fff', flex: 1,
                    margin: 20,
                    borderRadius: 10,
                }}>
                    <View style={{
                        height: 120,
                        padding: 25,
                        alignItems: 'center'
                    }}>
                        <Pressable onPress={() => setViewResult(!viewResult)} style={{ position: 'absolute', right: 0, top: 5, marginRight: 10 }}>
                            <Icon
                                name='close-circle'
                                size={28}
                                color={lightYello} />
                        </Pressable>
                        <AppText
                            size={16}
                            bold={true}
                            title={"Contruction Quality"}
                        />
                        <AppText
                            size={14}
                            title={"B Grade(Standard Quality)"}
                            color={lightYello}
                            marginTop={10}
                        />

                        <Text style={{ fontSize: 14, color: lightYello, marginTop: 10 }}></Text>
                    </View>

                </View>
            </AppModal>

        </View>
    )
}

export default CompareSaved

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