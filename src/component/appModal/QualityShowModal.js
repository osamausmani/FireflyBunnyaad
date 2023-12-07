import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import AppText from "../appComponnet/AppText";
import {
  background_grey,
  darkgrey,
  darkYellow,
  fieldPlaceholderColor,
  tab_title_color,
  textColor,
} from "../../constants/Colors";
import { cross_icon } from "../../assets/path";
import { PostRequest } from "../../api/axios";
import {
  getCitysDDLApi,
  getetCustomQualityRawMaterialDetailsApi,
  getRawMaterialDetailsByConstructionQualityApi,
} from "../../api/apiEndPoint";
import { Icon, Colors, AppSubmitButton } from "../../constants";
import LinearGradient from "react-native-linear-gradient";

const QualityShowModal = ({
  visible,
  color,
  children,
  onPress,
  floorPlanId,
  constructionId,
  title,
  handlePlanChange,
  list,
  navigation,
  onPressContinue,
  route,
}) => {
  const [rawMaterialList, setRawMaterialList] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState([]);

  useEffect(() => {
    setRawMaterialList(list);
  }, [list]);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View
          style={{
            marginVertical: 20,
            alignItems: "center",
            position: "relative",
          }}
        >
          <Pressable
            onPress={() => {
              onPress();
              handlePlanChange(rawMaterialList);

              setSelectedOffer([]);
            }}
            style={{
              backgroundColor: darkYellow,
              padding: 5,
              borderRadius: 50,
              alignSelf: "flex-end",
              marginRight: 15,
              marginTop: -10,
            }}
          >
            <Image source={cross_icon} style={{ width: 15, height: 15 }} />
          </Pressable>
          <AppText
            title={"Construction Quantity"}
            size={18}
            color={"#000"}
            bold
          />
          <AppText title={title} size={14} marginTop={5} color={darkYellow} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[color ? { backgroundColor: color } : {}]}
        >
          <View style={{ marginHorizontal: 10, flex: 1 }}>
            {rawMaterialList &&
              rawMaterialList.map((offer, i) => {
                return (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <View
                      style={{
                        backgroundColor: Colors.lightYello,
                        alignItems: "center",
                        padding: 10,
                        borderRadius: 10,
                        marginBottom: 3,
                      }}
                    >
                      <AppText
                        title={offer.rawMaterial}
                        color={"#fff"}
                        size={18}
                      />
                    </View>
                    <View
                      style={{
                        marginHorizontal: 15,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: 3,
                      }}
                    >
                      <View style={styles.rowF}>
                        <AppText
                          color={tab_title_color}
                          title="Unit"
                          size={18}
                          marginLeft={20}
                        />
                      </View>
                      <View style={styles.rowS}>
                        <AppText
                          color={tab_title_color}
                          title={offer.unit}
                          // title={"******"}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        marginHorizontal: 15,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: 3,
                      }}
                    >
                      <View style={styles.rowF}>
                        <AppText
                          color={tab_title_color}
                          title="Quantity"
                          size={18}
                          marginLeft={20}
                        />
                      </View>
                      <View style={styles.rowS}>
                        <AppText
                          color={tab_title_color}
                          title={offer.quantity ? "****" : null}
                          // title={"******"}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        marginHorizontal: 15,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: 3,
                      }}
                    >
                      <View style={styles.rowF}>
                        <AppText
                          color={tab_title_color}
                          title="Rate per Unit"
                          size={18}
                          marginLeft={20}
                        />
                      </View>
                      <View style={styles.rowS}>
                        <AppText
                          color={tab_title_color}
                          // title={offer.rate}
                          title={"****"}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        marginHorizontal: 15,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: 3,
                      }}
                    >
                      <View style={styles.rowF}>
                        <AppText
                          color={tab_title_color}
                          title="Total Amount"
                          size={18}
                          marginLeft={20}
                        />
                      </View>
                      <View style={styles.rowS}>
                        <AppText color={tab_title_color} title={offer.amount} />
                      </View>
                    </View>
                  </View>
                );
              })}
            <View style={styles.footer}>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.prvBtn}
                  onPress={() => {
                    onPress();
                    handlePlanChange(rawMaterialList);
                    setSelectedOffer([]);
                  }}
                >
                  <AppText title={"Back"} size={17} color={Colors.lightblack} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onPress();
                    onPressContinue(rawMaterialList);
                  }}
                >
                  <LinearGradient
                    colors={["#EFAF0F", "#EFAF0F"]}
                    style={styles.nextBtn}
                  >
                    <AppText
                      title={"Continue to Summary"}
                      size={17}
                      color={"#000"}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default QualityShowModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginHorizontal: 0,
    backgroundColor: "#fff",
    // alignItems: 'center',
    textAlign: "center",
    borderRadius: 15,
  },
  rowF: {
    paddingVertical: 10,
    width: "65%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rowS: {
    padding: 10,
    width: "34%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  btnContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 0,
  },
  footer: {
    height: 80,
    marginLeft: -10,
    marginRight: -10,
    paddingLeft: 10,
    paddingRight: 10,
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
    borderRadius: 15,
    width: 120,
    backgroundColor: Colors.silver_color,
  },
  nextBtn: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    width: "100%",
  },
});
