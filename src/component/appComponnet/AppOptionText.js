import {
  StyleSheet,
  View,
  Pressable,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppText from "./AppText";
import { imgUrl } from "../../api/apiEndPoint";
import { Icon, Colors } from "../../constants";
import LinearGradient from "react-native-linear-gradient";
import RightArrow from "react-native-vector-icons/AntDesign";

const AppOptionText = ({
  title,
  dataa = [],
  navigation,
  nextScreen,
  filter = false,
  customeData = "",
  onSelectedItem,
  selectedItem,
  userId,
}) => {
  const [filteredText, setFilteredText] = useState("");
  const [filterdList, setFilterdList] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSearchData = (text) => {
    setFilteredText(text);
    const temp = text.toLowerCase();
    const newData = dataa.filter((item) => {
      return item.name.toLowerCase().indexOf(temp.toLowerCase()) !== -1;
    });
    setFilterdList(newData);
  };
  useEffect(() => {
    setFilterdList(dataa);
  }, [dataa]);

  const showToastMessage = () => {
    ToastAndroid.show(
      "Please select first.",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      65,
      50
    );
  };
  const renderItem = ({ item, i }) => {
    // console.log(`${imgUrl}/${item.logo}`)
    // console.log(item)
    return (
      <TouchableOpacity
        onPress={() => {
          if (selectedValue !== null && selectedValue.id == item.id) {
            setSelectedValue({});
            onSelectedItem(null);
          } else {
            onSelectedItem(item);
            setSelectedValue(item);
          }
        }}
        key={i}
        style={[
          styles.option,
          selectedValue && selectedValue.id == item.id
            ? { borderRightWidth: 2, borderColor: Colors.darkYellow }
            : {},
        ]}
      >
        <AppText
          color={Colors.lightblack}
          title={`${item.name} `}
          textAlign={"left"}
          size={14}
          bold={selectedValue && selectedValue.id == item.id ? true : false}
          width={"60%"}
        />
        {/* {selectedValue && selectedValue.id == item.id? <Image source={Icon.fill_radio} style={{ width: 20, height: 20 }} />
        : <Image
              source={Icon.unfil_radio}
              style={{ width: 20, height: 20 }}
            />} */}
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, marginTop: -15 }}>
      <AppText
        color={Colors.newTextColor}
        title={title}
        textAlign={"center"}
        margin={20}
        size={18}
        bold
      />
      {filter && (
        <TextInput
          placeholderTextColor={Colors.darkgrey}
          style={styles.searchBar}
          value={filteredText}
          placeholder="Search ..."
          onChangeText={(text) => handleSearchData(text)}
        />
      )}

      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.flatList}
          data={filter ? filterdList : dataa}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.footer}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.prvBtn}
              onPress={() => navigation.goBack()}
            >
              <AppText title={"Go Back"} size={17} color={Colors.lightblack} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                selectedItem == null
                  ? showToastMessage()
                  : navigation.navigate(nextScreen, {
                      userId: userId,
                    });
              }}
            >
              <LinearGradient
                colors={["#EFAF0F", "#EFAF0F"]}
                style={styles.nextBtn}
              >
                <AppText title={"Next"} size={17} color={Colors.lightblack} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AppOptionText;

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    padding: 15,
    borderColor: Colors.fieldPlaceholderColor,
    margin: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  //slider
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    color: "red",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  flatList: {
    height: height / 3.5,
    paddingVertical: 0,
  },
  option: {
    padding: 15,
    borderWidth: 2,
    borderColor: Colors.filedBgColor,
    backgroundColor: Colors.filedBgColor,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 30,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchBar: {
    color: Colors.darkgrey,
    borderBottomColor: Colors.fieldPlaceholderColor,
    borderBottomWidth: 2,
    width: "80%",
    alignSelf: "center",
    fontSize: 17,
  },
  btnContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 30,
  },
  footer: {
    height: 80,
    justifyContent: "center",
    marginBottom: 1,
    alignContent: "center",
    borderTopWidth: 4,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(0,0,0,.06)",
  },
  prvBtn: {
    borderWidth: 1,
    borderColor: Colors.silver_color,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.silver_color,
    borderRadius: 15,
    width: 140,
  },
  nextBtn: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    width: 140,
    // backgroundColor:'#EFAF0F'
  },
});
