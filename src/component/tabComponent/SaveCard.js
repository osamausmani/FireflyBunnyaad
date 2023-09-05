import { Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { styles } from '../../styles/SaveCardStyle'

import { compare_icon, delete_icon, edit_icon } from '../../assets/path'
import Colors, { lightGrey, lightYello, textColor } from '../../constants/Colors'

import Feather from 'react-native-vector-icons/Entypo';
import ProgressCircle from 'react-native-progress-circle'
import AppText from '../appComponnet/AppText'
import { Icon } from '../../constants'

const SaveCard = ({ data, onPress, selected = "#fff", style }) => {
    return (
        <View style={[styles.card, style]}>
            <View style={styles.cardBody}>
                <View style={styles.cardheader}>
                    <View style={{}}>
                        <AppText
                            size={12}
                            bold
                            textTransform={'uppercase'}
                            title={data?.projectName}
                        />
                    </View>
                    <View style={styles.headerLeft}>
                        <AppText
                            size={10}
                            title={data.createdAt}
                            marginRight={10}
                        />
                        {/* <AppText
                            size={10}
                            title={"12:41 PM"}
                        /> */}
                    </View>
                </View>
                <Pressable style={styles.completion} >
                    <ProgressCircle
                        percent={data?.completedPercentage}
                        radius={20}
                        borderWidth={3}
                        color={lightYello}
                        shadowColor={lightGrey}
                        bgColor={selected}
                    >
                        <AppText
                            size={9}
                            title={`${data?.completedPercentage}%`}
                            color={Colors.lightblack}
                        />
                    </ProgressCircle>
                    <AppText
                        title={"Completion"}
                        size={10}

                    />
                </Pressable>
                <Pressable style={styles.compare} onPress={onPress}>
                    <Image source={Icon.compare_icon} style={{ width: 40, height: 40, marginTop: 5 }} />
                    <AppText
                        title={"Compare"}
                        size={10}

                    />
                </Pressable>
                <Pressable style={styles.compare} onPress={() => onPress(data)}>
                    <Feather
                        style={{ borderRadius: 100 }}
                        name="dots-three-vertical"
                        size={22}
                        color={Colors.fontColor}
                    />
                </Pressable>
            </View>


        </View>
    )
}

export default SaveCard