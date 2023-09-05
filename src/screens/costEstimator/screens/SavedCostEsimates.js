import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Text,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../contextApi/AppProvider";
import SaveCard from "../../../component/tabComponent/SaveCard";
import { Background, Colors, AppText } from "../../../constants";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";
import VideoModal from "../../../component/appModal/VideoModal";
import { userModel, clientCostEstimate } from "../../../models";
import {
  PostRequest,
  getAllClientCostEstimatesApi,
  renameProjectNameApi,
  updateClientCostEstimateStatusApi,
} from "../../../api/apiEndPoint";
import FilterModal from "../../../component/appModal/FilterModal";
import ModalCostSave from "../../../component/appModal/ModalCostSave";

const SavedCostEsimates = ({ navigation, route }) => {
  const { authData } = useContext(AppContext);
  const [isshowoption, setisMshowoption] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showIndicator, setShowIndicator] = useState(true);
  const [showSaveProjectModal, setShowSaveProjectModal] = useState(false);
  const [savedEstimateList, setSavedEstimateList] = useState([]);
  const [selectedEstimate, setSelectedEstimate] = useState({});

  console.log(route.params.userId);

  useEffect(() => {
    getAllCostEstimates();
  }, [renamecostEstimate]);

  const handleSkip = () => {
    setModalVisible(false);
    navigation.navigate("selectCity", {
      userId: route.params.userId,
    });
  };

  const getAllCostEstimates = async () => {
    try {
      const Model = {
        ...userModel,
        userID: authData.userId,
        isPremium: false,
        clientCostEstimate: {
          ...clientCostEstimate,
          userId: authData.userId,
        },
      };
      PostRequest(getAllClientCostEstimatesApi, Model).then((res) => {
        if (res === 0) {
          console.log("error");
          // setShowIndicator(false)
        } else {
          setShowIndicator(false);
          setSavedEstimateList(res.clientCostEstimateList);
        }
      });
    } catch (error) {
      console.log(err);
    }
  };

  const renamecostEstimate = (name) => {
    try {
      const Model = {
        ...userModel,
        clientCostEstimate: {
          ...clientCostEstimate,
          id: selectedEstimate?.id,
          userId: selectedEstimate?.userId,
          projectName: name,
        },
      };
      PostRequest(renameProjectNameApi, Model).then((res) => {
        if (res === 0) {
          console.log("error");
          setShowIndicator(false);
        } else {
          getAllCostEstimates();
          setShowIndicator(false);
        }
      });
    } catch (error) {
      console.log(err);
    }
  };

  const deletecostEstimate = () => {
    // console.log(selectedEstimate.id);
    try {
      const Model = {
        ...userModel,
        clientCostEstimate: {
          ...clientCostEstimate,
          id: selectedEstimate?.id,
          userId: selectedEstimate?.userId,
          dataStateId: 2,
        },
      };
      PostRequest(updateClientCostEstimateStatusApi, Model).then((res) => {
        if (res === 0) {
          console.log("error");
          setShowIndicator(false);
        } else {
          getAllCostEstimates();
          setShowIndicator(false);
        }
      });
    } catch (error) {
      console.log(err);
    }
  };
  const showDeleteAlert = () => {
    Alert.alert("", "Are you sure want to delete ?", [
      {
        text: "No",
        onPress: () => {},
        style: "No",
      },
      {
        text: "yes",
        onPress: () => {
          deletecostEstimate();
          setisMshowoption(false);
        },
      },
    ]);
  };

  // render Components
  const renderHeader = () => {
    return (
      <View style={{ height: 400, backgroundColor: Colors.lightYello }}>
        <View style={{}}>
          <View style={{ width: "55%", paddingHorizontal: 10, marginTop: 10 }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backIcon}
            >
              <Feather
                style={{ borderRadius: 100 }}
                name="arrow-left"
                size={18}
                color="#fff"
              />
            </Pressable>
          </View>
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <AppText
              title={"CONSTRUCTION COST CALCULATOR"}
              marginTop={18}
              size={20}
              color={"#fff"}
              bold
              textTransform="uppercase"
              alignItems="center"
            />
          </View>

          <View
            style={{
              width: "50%",
              marginHorizontal: 10,
              flexDirection: "row",
              marginTop: "8%",
            }}
          >
            <AppText
              title={
                `Use our construction cost calculator to get quick estimates as per your required building material quality along with realistic costs`.slice(
                  0,
                  200
                ) + "."
              }
              size={15}
              marginTop={20}
              justifyContent="center"
              color={"#fff"}
            />
            <Image
              source={Background.costEstimate}
              style={{ width: 140, height: 140, marginLeft: "17%" }}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {renderHeader()}
      <TouchableOpacity
        style={styles.startCost}
        onPress={() => setModalVisible(true)}
      >
        <AppText
          title={"Start Cost Estimator"}
          color={Colors.newTextColor}
          size={16}
          bold
        />
        <Feather
          style={{ borderRadius: 100 }}
          name="arrow-right"
          size={28}
          color={Colors.newTextColor}
        />
      </TouchableOpacity>
      {!savedEstimateList && (
        <AppText
          title={"No Saved Cost Estimates Found .."}
          marginHorizontal={"20%"}
          marginTop={"50%"}
          color={Colors.fieldPlaceholderColor}
        />
      )}
      <FlatList
        style={{ marginTop: 25, flex: 1 }}
        contentContainerStyle={{ paddingBottom: 50 }}
        data={savedEstimateList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <SaveCard
            style={{ marginTop: 10 }}
            data={item}
            onPress={(item) => {
              setSelectedEstimate(item);
              setisMshowoption(true);
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Video Modal */}
      <VideoModal visible={isModalVisible} onPress={handleSkip} />

      {isshowoption && (
        <FilterModal
          isVisible={isshowoption}
          onClose={() => setisMshowoption(false)}
          minusHeigth={200}
        >
          <View>
            <TouchableOpacity
              style={styles.bottomField}
              onPress={() => {
                navigation.navigate("ViewEstimate", { selectedEstimate });
              }}
            >
              <MaterialCommunityIcons
                style={{ borderRadius: 100 }}
                name="preview"
                size={22}
                color={Colors.fontColor}
              />
              <AppText
                marginLeft={30}
                size={16}
                title={"View "}
                color={Colors.fieldTextColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomField}
              onPress={() => {
                setShowSaveProjectModal(true);
                setisMshowoption(false);
              }}
            >
              <MaterialCommunityIcons
                style={{ borderRadius: 100 }}
                name="drive-file-rename-outline"
                size={22}
                color={Colors.fontColor}
              />
              <AppText
                marginLeft={30}
                size={16}
                title={"Rename"}
                color={Colors.fieldTextColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomField}
              onPress={() => {
                showDeleteAlert();
              }}
            >
              <MaterialCommunityIcons
                style={{ borderRadius: 100 }}
                name="delete-outline"
                size={22}
                color={Colors.fontColor}
              />
              <AppText
                marginLeft={30}
                size={16}
                title={"Delete"}
                color={Colors.fieldTextColor}
              />
            </TouchableOpacity>
          </View>
        </FilterModal>
      )}

      <ModalCostSave
        name={selectedEstimate.projectName}
        visible={showSaveProjectModal}
        onCancelPress={() => setShowSaveProjectModal(false)}
        onPressOk={(projectName) => {
          // console.log("Save Project", projectName)
          renamecostEstimate(projectName);
          setShowSaveProjectModal(false);
        }}
      />
    </View>
  );
};

export default SavedCostEsimates;
const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  startCost: {
    marginTop: 20,
    marginBottom: -10,
    width: "95%",
    height: 80,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 15,
    flexWrap: "wrap",
    overflow: "hidden",
    alignItems: "center",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: "rgba(0,0,0,.06)",
    alignContent: "center",
  },
  backIcon: {
    backgroundColor: "rgba(255,255,255,.2)",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 80,
    overflow: "hidden",
  },
  bottomField: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.fontColor,
    borderBottomWidth: 0.15,
    paddingVertical: 10,
  },
});
