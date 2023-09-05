import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../constants";

const AppSubmitButton = ({
  name,
  fontcolor,
  icon,
  leftIcon = false,
  disabled = false,
  onPress,
  isYellow = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{ flexDirection: "row" }}
    >
      <LinearGradient
        colors={!isYellow ? ["#EFAF0F", "#EFAF0F"] : ["#e7a300", "#e7a300"]}
        style={[styles.button, { ...props }]}
      >
        {!leftIcon ? (
          <Text style={[styles.text, fontcolor ? { color: fontcolor } : {}]}>
            {name}{" "}
          </Text>
        ) : null}
        {icon && (
          <Image
            style={[
              styles.icon,
              { marginRight: 10, marginLeft: 10, height: 18 },
            ]}
            source={icon}
          />
        )}
        {leftIcon ? (
          <Text style={[styles.text, fontcolor ? { color: fontcolor } : {}]}>
            {name}{" "}
          </Text>
        ) : null}
        {disabled && (
          <ActivityIndicator
            style={{ marginLeft: 20 }}
            size="small"
            color={Colors.white}
          />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AppSubmitButton;

const styles = StyleSheet.create({
  button: {
    width: "90%",
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  text: {
    color: "#000",
    fontSize: 14,
    textTransform: "uppercase",
  },
  icon: {
    marginLeft: 10,
    width: 21,
    height: 14,
  },
});
