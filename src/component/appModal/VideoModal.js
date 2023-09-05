import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import React, { useState, useRef } from "react";

import Video from "react-native-video";

import Icon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/Octicons";
import ProgressBar from "react-native-progress/Bar";
import { video_bg } from "../../assets/path";
import LinearGradient from "react-native-linear-gradient";

const { height, width } = Dimensions.get("window");

const VideoModal = ({ visible, onPress }) => {
  const videoPlayer = useRef(null);
  const [paused, setPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);

  const handleLoad = (meta) => {
    setDuration(meta.duration);
  };
  const handleProgress = (progress) => {
    setProgress(progress.currentTime / duration);
  };
  const handleEnd = () => {
    setPaused(true);
  };
  const handleMuted = () => {
    setMuted(!muted);
  };
  const handleProgressTouch = (e) => {
    const position = e.nativeEvent.locationX;
    const progress = (position / 250) * duration;
    videoPlayer.current.seek(progress);
  };
  const handleMainBtnPress = () => {
    console.log("press");
    if (progress > 1) {
      videoPlayer.current.seek(0);
    }
    setPaused(!paused);
  };

  const secondsToTime = (time) => {
    return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + (time % 60);
  };
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Video
            paused={paused}
            source={{
              uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
            onLoad={handleLoad}
            onProgress={handleProgress}
            onEnd={handleEnd}
            ref={videoPlayer}
            muted={false}
            fullscreen
            controls={false}
          />

          {/* {!paused ? (
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                bottom: "32%",
                justifyContent: "space-between",
              }}
            >
              <TouchableWithoutFeedback onPress={handleMainBtnPress}>
                <Icon name={paused ? "play" : "pause"} size={30} color="#fff" />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handleProgressTouch}>
                <View style={{ marginHorizontal: 5, paddingTop: 5 }}>
                  <ProgressBar
                    progress={progress}
                    unfilledColor="transparent"
                    color="#fff"
                    borderColor="#fff"
                    width={200}
                    height={20}
                  />
                </View>
              </TouchableWithoutFeedback>
              <Text style={{ color: "#fff", paddingTop: 5 }}>
                {secondsToTime(Math.floor(progress * duration))}
              </Text>
              <TouchableWithoutFeedback onPress={handleMuted}>
                <Icons
                  style={{ marginHorizontal: 10 }}
                  name={muted ? "unmute" : "mute"}
                  size={30}
                  color="#fff"
                />
              </TouchableWithoutFeedback>
            </View>
          ) : null} */}
          {paused ? (
            <View style={styles.controls}>
              <Pressable onPress={handleMainBtnPress}>
                <Icon
                  name={"play"}
                  size={40}
                  color="rgba(255, 255, 255, 0.9)"
                />
              </Pressable>
            </View>
          ) : null}

          {paused ? (
            <ImageBackground
              source={video_bg}
              resizeMode="contain"
              style={{
                width: "100%",
                height: modalHeight - 60,
                opacity: 1,
                position: "absolute",
                top: 0,
              }}
            />
          ) : null}
          <Pressable
            onPress={onPress}
            style={[styles.skipbtn, { overflow: "hidden" }]}
          >
            <LinearGradient
              colors={["#D9D9D9", "#959595"]}
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.skiptext}>Skip</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default VideoModal;
const modalHeight = height / 1.75;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .9)",
  },
  modalView: {
    backgroundColor: "#fff",
    height: modalHeight,
    marginTop: height / 5,
    marginHorizontal: 20,
    alignItems: "center",
    shadowColor: "transparent",
    borderRadius: 10,
    flexWrap: "wrap",
    overflow: "hidden",
    position: "relative",
  },
  mediaPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "black",
    justifyContent: "center",
  },
  skipbtn: {
    position: "absolute",
    bottom: 5,
    width: width - 100,
    borderRadius: 30,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  skiptext: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  controls: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    height: 105,
    zIndex: 100,
    opacity: 10,
    width: 105,
    borderRadius: 50,
    top: "30%",
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  mainButton: {
    marginRight: 15,
  },
});
