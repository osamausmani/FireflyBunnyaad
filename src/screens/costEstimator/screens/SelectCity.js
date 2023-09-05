import {
  StyleSheet,
  View,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../contextApi/AppProvider";
import AppOptionText from "../../../component/appComponnet/AppOptionText";
import { PostRequest } from "../../../api/axios";
import { getCitysDDLApi } from "../../../api/apiEndPoint";
import { Colors } from "../../../constants";
import CostEstimateHeader from "../../../component/appComponnet/CostEstimateHeader";
import { userModel, city } from "../../../models";
import renderTopNews from "../../../component/renderTopNews";

const SelectCity = ({ navigation, route }) => {
  // console.log(route.params.userId)
  const { result, setResult, authData, floorRelationIds, setFloorRelationIds } =
    useContext(AppContext);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showIndicator, setShowIndicator] = useState(true);
  const [cityList, setCityList] = useState([]);

  const id = {
    userId: route.params.userId,
    cityId: selectedItem,
  };

  useEffect(() => {
    getAllCityDDL();
  }, []);

  const getAllCityDDL = async () => {
    try {
      const Model = {
        ...userModel,
        city,
      };
      PostRequest(getCitysDDLApi, Model).then((res) => {
        if (res === 0) {
          console.log("error");
          setShowIndicator(false);
        } else {
          setShowIndicator(false);
          setCityList(res.cityDDL);
        }
      });
    } catch (error) {
      console.log(err);
    }
  };

  const onSelectedItem = (item) => {
    // console.log(item)
    setSelectedItem(item);
    setResult({
      ...result,
      city: item !== null ? item.name : "",
      cityId: item !== null ? item.id : 0,
    });
    setFloorRelationIds({
      ...floorRelationIds,
      cityID: item !== null ? item.id : 0,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CostEstimateHeader
        authData={authData}
        result={result}
        navigation={navigation}
        percentage={"10"}
      />

      <View style={{ flex: 1, marginTop: 30 }}>
        {showIndicator ? (
          <ActivityIndicator size={55} color={Colors.darkYellow} />
        ) : (
          <AppOptionText
            title={"Select Your City"}
            dataa={cityList}
            navigation={navigation}
            nextScreen={"selectArea"}
            selectedItem={selectedItem}
            onSelectedItem={onSelectedItem}
            userId={id}
          />
        )}
      </View>
    </View>
  );
};

export default SelectCity;

const styles = StyleSheet.create({
  header: {
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightYello,
    paddingHorizontal: 40,
  },
  back: {
    width: 25,
    height: 25,
  },
});
