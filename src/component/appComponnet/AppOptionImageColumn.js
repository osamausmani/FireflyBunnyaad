import {
  StyleSheet,
  View,
  Pressable,
  Dimensions,
  Image,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  Text
} from "react-native";
import React from "react";
import AppText from "./AppText";
import { Icon, Colors } from "../../constants";
import LinearGradient from "react-native-linear-gradient";
import { imgUrl } from "../../api/apiEndPoint";

const AppOptionImageColumn = ({
  title,
  navigation,
  nextScreen,
  allIds,
  selectedRadio,
  onPressImage,
  onPressRadio,
  dataa}) => {


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
    return (
      <View style={styles.option}>
        <TouchableOpacity onPress={() => onPressImage(item)}>
          <View key={i} style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: `${imgUrl}/${item.imagePath}` }}
              style={{ width: 120, borderRadius: 10 }}
            />

            <View style={{ marginLeft: 15 }}>
              {item.description.map(
                x =>
                  x.GF.Bathrooms.length > 0
                    ? <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", color: "#000" }}>
                          GF_Bathroom:
                        </Text>
                        <Text style={{ marginLeft: 13 }}>
                          {item.description.map(x => x.GF.Bathrooms)}
                        </Text>
                      </View>
                    : null
              )}

               {item.description.map(
                x =>
                
                  x.length > 0
                    ? <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", color: "#000" }}>
                          FF Bathroom:{" "}
                        </Text>
                        <Text style={{ marginLeft: 15 }}>
                          {item.description.map(x => x.FF.Bathrooms)}
                        </Text>
                      </View>
                    : <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", color: "#000" }}>
                          GF Lobby:{" "}
                        </Text>
                        <Text style={{ marginLeft: 36 }}>
                          {item.description.map(x => x.GF.Lobby)}
                        </Text>
                      </View>
              )}

              {item.description.map(
                x =>
                  x.GF.Bedrooms.length > 0
                    ? <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", color: "#000" }}>
                          GF Bedrooms:{" "}
                        </Text>
                        <Text style={{ marginLeft: 10 }}>
                          {item.description.map(x => x.GF.Bedrooms)}
                        </Text>
                      </View>
                    : null
              )}

              {item.description.map(
                x =>
                  x.length > 0
                    ? <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", color: "#000" }}>
                          FF Kitchen:
                        </Text>
                        <Text style={{ marginLeft: 32 }}>
                          {item.description.map(x => x.FF.Kitchen)}
                        </Text>
                      </View>
                    : <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", color: "#000" }}>
                          GF Car Porch:{" "}
                        </Text>
                        <Text style={{ marginLeft: 13 }}>
                          {item.description.map(x => x.GF.CarPorch)}
                        </Text>
                      </View>
              )}

              {item.description.map(
                x =>
                  x.GF.Kitchen.length > 0
                    ? <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", color: "#000" }}>
                          GF_Kitchen:{" "}
                        </Text>
                        <Text style={{ marginLeft: 24 }}>
                          {item.description.map(x => x.GF.Kitchen)}
                        </Text>
                      </View>
                    : null
              )}

              {item.description.map(
                x =>
                  x.length > 0
                    ? <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", color: "#000" }}>
                          FF_Kitchen:{" "}
                        </Text>
                        <Text style={{ marginLeft: 26 }}>
                          {item.description.map(x => x.FF.Kitchen)}
                        </Text>
                      </View>
                    : null
              )} 
            </View>

          </View>
        </TouchableOpacity>

        <Pressable
          onPress={() => onPressRadio(item)}
          style={{
            width: 35,
            height: 35,
            position: "absolute",
            top: 5,
            right: 0
          }}
        >
          <Image
            source={selectedRadio === item ? Icon.fill_radio : Icon.unfil_radio}
            style={{ width: 22, height: 22 }}
          />
        </Pressable>
      </View>
    );
  };


  return (
    <View style={{ flex: 1, marginTop: -15 }}>
      <AppText
        color={Colors.darkgrey}
        title={title}
        textAlign={"center"}
        margin={20}
        size={18}
        bold
      />
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.flatList}
          data={dataa}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.footer}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.prvBtn}
              onPress={() => navigation.pop()}
            >
              <AppText title={"Back"} size={17} color={Colors.lightblack} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (selectedRadio == null) {
                  showToastMessage();
                } else {
                  navigation.navigate(nextScreen, {
                    allIds: allIds
                  });
                }
              }}
            >
              <LinearGradient
                colors={["#EFAF0F", "#EFAF0F"]}
                style={styles.nextBtn}
              >
                <AppText title={"Next"} size={17} color={"#000"} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AppOptionImageColumn;

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    padding: 15,
    borderColor: Colors.fieldPlaceholderColor,
    margin: 30,
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  //slider
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    color: "red"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  flatList: {
    height: height / 2.5,
    padding: 15,
    paddingVertical: 0,
    marginHorizontal: 10
  },
  option: {
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.fieldPlaceholderColor,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    borderRadius: 10,
    width: "100%",
    flexWrap: "wrap",
    overflow: "hidden"
  },
  searchBar: {
    color: Colors.darkgrey,
    borderBottomColor: Colors.fieldPlaceholderColor,
    borderBottomWidth: 2,
    width: "80%",
    alignSelf: "center",
    fontSize: 17
  },
  btnContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 50
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
    borderColor: "rgba(0,0,0,.06)"
  },
  prvBtn: {
    borderWidth: 1,
    borderColor: Colors.silver_color,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    width: 120,
    backgroundColor: Colors.silver_color
  },
  nextBtn: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    width: 120
  }
});
