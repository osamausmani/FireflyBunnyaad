import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Modal, TouchableWithoutFeedback, Animated, ScrollView, Dimensions } from 'react-native'
import { Colors } from '../../constants'
const { width, height } = Dimensions.get("window");
const FilterModal = ({ isVisible, onClose, minusHeigth = 400, children }) => {

    // states
    const [showFilterModal, setFilterModal] = useState(isVisible)
    const modalAnimatedValue = useRef(new Animated.Value(0)).current

    // useEffect hook
    useEffect(() => {
        if (showFilterModal) {
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start()
        }
        else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start(() => onClose())
        }

    }, [showFilterModal])

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [width, height - minusHeigth]
    })
    return (
        <Modal
            animationType='slide'
            transparent
            visible={isVisible}
            statusBarTranslucent >

            <View
                style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
                <TouchableWithoutFeedback
                    onPress={() => setFilterModal(false)} >
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,

                        }}
                    />
                </TouchableWithoutFeedback>

                <Animated.View
                    style={{
                        position: 'absolute',
                        backgroundColor: Colors.white,
                        top: modalY,
                        left: 0,
                        height: height,
                        width: width,
                        padding: 24 * 1.2,
                        borderTopLeftRadius: 24 * 2.2,
                        borderTopRightRadius: 24 * 2.2,
                    }}
                >
                    {/* header */}
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.red,
                                height: 2,
                                width: '30%',
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        />

                    </View>

                    {children}

                </Animated.View>
            </View>
        </Modal>
    )
}

export default FilterModal