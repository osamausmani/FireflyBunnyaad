import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Colors } from "../../constants/index";
import { flowUrl, getAllStaticFlowsApi, imgUrl } from "../../api/apiEndPoint";
import { PostRequest } from "../../api/axios";
import { userModel, staticFlow } from "../../models";

const { width, height } = Dimensions.get("window");
const NOnBoard = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [flowData, setFlowData] = useState([]);

  const ref = useRef();

  useEffect(() => {
    getStaticFlows();
  }, []);

  const getStaticFlows = () => {
    try {
      const model = {
        userModel,
        staticFlow: {
          ...staticFlow,
          type: 1,
        },
      };
      PostRequest(getAllStaticFlowsApi, model).then((res) => {
        console.log(res);
        if (res === 0) {
          console.log("error");
        } else {
          setFlowData(res?.staticFlowList);
          // console.log("res", JSON.stringify(res.staticFlowList, null, 2));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != flowData?.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    navigation.navigate("SignIn");
  };

  // render  Components

  const RenderSlide = ({ item, index }) => {
    return (
      <View style={{ width }}>
        {index % 2 == 0 && (
          <Image
            // source={item?.image}
            source={{ uri: `${imgUrl}/${item.logo}` }}
            style={{
              height: 250,
              width: 350,
              resizeMode: "contain",
              alignSelf: "center",
            }}
          />
        )}

        <View
          style={{
            alignSelf: "center",
            alignItems: "center",
            marginTop: index % 2 == 0 ? 30 : 10,
          }}
        >
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.description} </Text>
        </View>
        {index % 2 != 0 && (
          <Image
            source={{ uri: `${imgUrl}/${item.logo}` }}
            style={{
              height: "58%",
              width: width / 1.2,
              resizeMode: "contain",
              alignSelf: "center",
            }}
          />
        )}
      </View>
    );
  };

  const Footer = () => {
    return (
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          bottom: 0,
          width: width - 20,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
          }}
        ></View>

        {/* Render buttons */}
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex == flowData?.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("SignIn")}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 15,
                    fontFamily: "Bill Corporate Narrow WOO",
                  }}
                >
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "#fff",
                  }}
                >
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, position: "relative", backgroundColor: "#fff" }}
    >
      <StatusBar hidden />
      <View style={styles.indicator}>
        {flowData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index == currentSlideIndex
                    ? Colors.lightYello
                    : Colors.lightGrey,
              },
            ]}
          />
        ))}
      </View>

      <View
        style={{
          height: height / 1.2,
          marginTop: "30%",
        }}
      >
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={flowData && flowData}
          pagingEnabled
          renderItem={({ item, index }) => (
            <RenderSlide item={item} index={index} />
          )}
        />
      </View>

      <TouchableOpacity
        onPress={skip}
        style={{
          position: "absolute",
          top: 40,
          right: 20,
          flex: 1,
        }}
      >
        <Text style={{ color: "#000", fontSize: 15 }}>skip {">"}</Text>
      </TouchableOpacity>
      <Footer />
    </SafeAreaView>
  );
};

export default NOnBoard;

const styles = StyleSheet.create({
  subtitle: {
    color: Colors.darkgrey,
    fontSize: 15,
    marginTop: 8,
    maxWidth: "80%",
    lineHeight: 22,
    fontFamily: "TAN Aegean",
    width: 300,
    marginHorizontal: 30,
    textAlign: "center",
  },
  title: {
    color: "#000",
    fontSize: 19,
    fontWeight: "bold",
    fontFamily: "Bill Corporate Narrow WOO",
    marginHorizontal: 30,
    lineHeight: 30,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    position: "absolute",
    top: "8%",
    flexDirection: "row",
    width: "20%",
    marginLeft: 20,
    justifyContent: "space-between",
  },
  dot: {
    marginBottom: 15,
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 15,
    backgroundColor: Colors.lightYello,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
});
