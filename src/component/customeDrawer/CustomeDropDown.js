import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList, Dimensions, Image, Pressable, Alert } from 'react-native'

import React, { useState, useRef, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors, Icon } from '../../constants';

const CustomeDropDown = ({ label, dataa, onSelect, navigation }) => {
    /// code  dropDown
    const DropdownButton = useRef();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [dropdownTop, setDropdownTop] = useState(0);

    useEffect(() => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + h);
        });

    }, [])

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + h / 1.5);
        });
        setVisible(true);
    };

    const onItemPress = (item) => {
        setSelected(item);
        setVisible(false);
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={styles.item} onPress={() => {
            onItemPress(item)
            onSelect(item)
        }}>
            <Text style={{ color: Colors.fieldTextColor }}> {item.name}</Text>
            <Image source={Icon.unfil_radio} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
    );

    const renderDropdown = () => {
        return (
            <Modal visible={visible} transparent animationType="none" >
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <View style={[styles.dropdown,]}>
                        <Pressable
                            onPress={() => setVisible(false)}
                            style={{ justifyContent: "flex-end", flexDirection: "row", margin: 20 }} >
                            <AntDesign size={26} color={Colors.lightYello} name={"closecircle"} />
                        </Pressable>
                        <FlatList
                            data={dataa}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };




    return (
        <TouchableOpacity
            ref={DropdownButton}
            style={styles.button}
            onPress={toggleDropdown}
        >
            {renderDropdown()}
            <Text style={styles.buttonText}>
                {(selected && selected.name) || label}
            </Text>
            <AntDesign style={styles.icon} size={14} name={"down"} />
        </TouchableOpacity>
    )
}

export default CustomeDropDown
const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
    ///
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 55,
        zIndex: 1,
        width: "80%",
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.filedBgColor
    },
    buttonText: {
        flex: 1,
        width: '70%',
        textAlign: 'center',
        color: Colors.fieldTextColor,
        fontWeight: "bold"
    },
    icon: {
        marginRight: 10,
        color: Colors.darkgrey,
        fontSize: 14,
        backgroundColor: Colors.lightGrey,
        borderRadius: 20,
        padding: 5

    },
    dropdown: {
        position: 'absolute',
        backgroundColor: Colors.white,
        width: '90%',
        alignSelf: 'center',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        borderRadius: 10,
        height: height / 1.2
    },
    overlay: {
        width: '100%',
        height: '100%',
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomWidth: .5,
        borderBottomColor: Colors.lightGrey,
        marginBottom: 10,
        marginHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-between",

    },

})