import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "../../constants";
import { color } from "react-native-reanimated";

const AppFormField = ({
  value,
  onChange,
  icon,
  placeholder,
  errorMessage,
  secureTextEntry,
  onPress,
  eyeicon,
  keyboardType,
  fontFamily,
}) => {
  return (
    <View>
      <View
        style={[
          styles.appField,
          errorMessage && { borderBottomColor: Colors.lightYello },
        ]}
      >
        <View style={{ width: "95%", flexDirection: "row" }}>
          <Feather
            name={icon}
            size={18}
            style={{ marginVertical: 15, marginRight: 10 }}
          />
          <TextInput
            style={[styles.input]}
            placeholder={placeholder}
            color="#000"
            placeholderTextColor="#9a9a9a"
            autoCapitalize="none"
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType ? keyboardType : "default"}
            secureTextEntry={secureTextEntry}
            fontFamily={fontFamily}
          />
          {eyeicon ? (
            <Pressable onPress={onPress}>
              <Image style={styles.icon} source={eyeicon} />
            </Pressable>
          ) : null}
        </View>
      </View>
      {errorMessage ? (
        <View style={{ marginVertical: 0, marginHorizontal: 50 }}>
          {
            <Text style={{ color: Colors.lightYello }}>
              {errorMessage && errorMessage}
            </Text>
          }
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default AppFormField;

const styles = StyleSheet.create({
  appField: {
    flexDirection: "column",
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#9a9a9a",
    paddingBottom: 5,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#38385E",
    marginHorizontal: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
  },
  icon: {
    height: 18,
    width: 18,
    position: "absolute",
    top: 15,
    right: -15,
  },
  input: {
    flex: 1,
    borderRadius: 15,
    marginRight: 20,
    color: Colors.fieldPlaceholderColor,
  },
});
