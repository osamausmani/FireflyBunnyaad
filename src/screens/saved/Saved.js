import { StyleSheet, View, Pressable, Image, FlatList } from 'react-native'
import React from 'react'
import { drawer_back } from '../../assets/path'
import { lightGrey } from '../../constants/Colors'
import AppHeader from '../../component/appComponnet/AppHeader'
import SaveCard from '../../component/tabComponent/SaveCard'
import AppText from '../../component/appComponnet/AppText'
import { savedData } from '../../constants/SavedData'



const Saved = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: lightGrey }}>
            <AppHeader home plain >
                <View style={styles.header}>
                    <Pressable>
                        <Image source={drawer_back} style={styles.back} />
                    </Pressable>
                    <AppText
                        marginLeft={"30%"}
                        padding={10}
                        size={22}
                        bold
                        color={"#fff"}
                        title={'Saved'}
                    />
                </View>
            </AppHeader>
            <View style={{ flex: 1, marginTop: -50, }}>
                <FlatList
                    style={{ paddingTop: 25 }}
                    data={savedData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View style={{ marginVertical: 10, }}>
                            <SaveCard data={item} onPress={() => navigation.navigate('SavedCompare')} />
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                />

            </View>
        </View>
    )
}

export default Saved

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
        marginLeft: "30%",
        padding: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: "#fff"
    },

})