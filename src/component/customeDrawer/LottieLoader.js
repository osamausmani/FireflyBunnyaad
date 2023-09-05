import { View, Text, Modal, TouchableOpacity, Press } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Icon } from '../../constants';

const LottieLoader = ({ visible, clickHide }) => {
    return (
        <Modal
            style={{
                flex: 1,
                borderWidth: 20,
                borderColor: 'red',
            }}
            transparent
            visible={visible}
        >

            <View style={{ justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "rgba(0, 0, 0, .7)" }}>
                <TouchableOpacity
                    onPress={() => clickHide()}
                    style={{ position: "absolute", top: 8, left: 14, height: 50, width: 50, zIndex: 999 }}
                >
                    <AntDesign

                        style={{ borderRadius: 100 }}
                        name="arrowleft"
                        size={38}
                        color={"#fff"}
                    />
                </TouchableOpacity>
                <Lottie source={Icon.loaderLottie} autoPlay loop />
            </View>

        </Modal>
    )
}


export default LottieLoader

