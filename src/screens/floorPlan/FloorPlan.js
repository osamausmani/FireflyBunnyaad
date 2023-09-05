import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Language from "../../languages/Language";
import AppText from "../../component/appComponnet/AppText";
import { Background, Colors, Icon, Images } from "../../constants";
import { PostRequest } from "../../api/axios";
import { getCitysDDLApi } from "../../api/apiEndPoint";
import Feather from "react-native-vector-icons/Feather";
import AppOptionText from "../../component/appComponnet/AppOptionText";
import { AppContext } from "../../contextApi/AppProvider";

const { height, width } = Dimensions.get("window");
const FloorPlan = ({ navigation, route }) => {
  const { floorRelationIds, setFloorRelationIds, authData } =
    useContext(AppContext);
  const [isEnglish, SelectLanguage] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showIndicator, setShowIndicator] = useState(true);
  const [cityList, setCityList] = useState([]);

  const passingId = {
    userId: route.params.userId,
    cityId: selectedItem,
  };

  useEffect(() => {
    getAllCityDDL();
  }, []);

  const getAllCityDDL = async () => {
    try {
      const Model = {
        userID: 0,
        userKey: "string",
        languageCode: "en",
        ip: "string",
        responseState: 200,

        city: {
          cityId: 0,
          logo: "string",
          isStandard: true,
          createdAt: "2022-10-12T08:27:32.664Z",
          updatedAt: "2022-10-12T08:27:32.664Z",
          createdBy: 0,
          updatedBy: 0,
          dataStateId: 0,
        },
      };
      PostRequest(getCitysDDLApi, Model).then((res) => {
        // console.log(res)
        if (res === 0) {
          console.log("error");
          setShowIndicator(false);
        } else {
          setShowIndicator(false);
          setCityList(
            res.cityDDL.filter(
              (c) => c.name === "Rawalpindi" || c.name === "Islamabad"
            )
          );
          // const data = res.cityDDL.filter(c => c.name === 'Faisalabad' || c.name === 'Islamabad')
          // console.log(data)
          // console.log("res", JSON.stringify(res.cityDDL, null, 2));
        }
      });
    } catch (error) {
      console.log(err);
    }
  };

  const onSelectedItem = (item) => {
    // console.log(item, "find item");
    setSelectedItem(item);
    // console.log(floorRelationIds)
    setFloorRelationIds({
      ...floorRelationIds,
      cityID: item !== null ? item.id : 0,
    });
    // console.log({ ...floorRelationIds, cityID: item !== null ? item.id : 0 })
  };

  const showAlert = () => {
    Alert.alert("", "Do you want  to save this Project for later ?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          console.log("Ok Pressed");
        },
      },
    ]);
  };

  const getLocalData = async () => {
    const getLocalLAnguages = await AsyncStorage.getItem("language");
    let isEnglish = await JSON.parse(getLocalLAnguages);
    SelectLanguage(true);
  };

  useEffect(() => {
    getLocalData();
  }, [getLocalData]);

  // render Modals

  const renderHeader = () => {
    return (
      <ImageBackground
        source={Background.floorPlan_bg}
        style={{ height: 250, alignItems: "center" }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "55%", paddingHorizontal: 20, marginTop: 12 }}>
            <TouchableOpacity
              onPress={() => navigation.replace("AppStack")}
              style={{
                backgroundColor: "rgba(255,255,255,.2)",
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                borderRadius: 80,
                overflow: "hidden",
              }}
            >
              <Feather
                style={{ borderRadius: 100 }}
                name="arrow-left"
                size={18}
                color="#fff"
              />
            </TouchableOpacity>
            <AppText
              title={"FLOOR PLANS LIBRARY"}
              marginTop={7}
              size={16}
              color={"#fff"}
              fontWeight="600"
              textTransform="uppercase"
            />
            <AppText
              title={
                `Hundreds of building by-laws based floor plans with elevations, ranging from as small as 20’ x 40’ to as big as 60’ x 90’`.slice(
                  0,
                  200
                ) + "."
              }
              marginTop={8}
              size={15}
              color={"#fff"}
            />
          </View>
          <View
            style={{
              width: "45%",
              alignItems: "center",
              justifyContent: "center",
              height: 250,
            }}
          >
            <Image
              source={Images.floorPlan}
              style={{ width: 120, height: 120 }}
            />
          </View>
        </View>
      </ImageBackground>
    );
  };
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {renderHeader()}
      <View style={{ flex: 1, marginTop: 20 }}>
        {showIndicator ? (
          <ActivityIndicator size={55} color={Colors.darkYellow} />
        ) : (
          <AppOptionText
            title={"Select Your City"}
            dataa={cityList}
            navigation={navigation}
            nextScreen={"floorPlanArea"}
            selectedItem={selectedItem}
            onSelectedItem={onSelectedItem}
            userId={passingId}
          />
        )}
      </View>
    </View>
  );
};

export default FloorPlan;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  back: {
    width: 25,
    height: 25,
  },
  text: {
    marginLeft: "30%",
    padding: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 5,
    borderRightWidth: 6,
    borderColor: "rgba(0,0,0,.06)",
  },
  containerWraper: {
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  arrow: {
    width: 10,
    height: 20,
  },
  label: {
    flex: 1,
    marginLeft: 20,
    fontSize: 14,
    margin: 10,
    fontWeight: "bold",
  },
});
