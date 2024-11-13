import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { PRIMARY_COLOR } from "@/resources/constants";
import Input from "@/components/Input";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";

export default function index() {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Hello there,</Text>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Log in to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          label="Your email"
          placeholder="Enter email"
          autoCapitalize="none"
          icon={() => (
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="#6e6e6e"
            />
          )}
        />
        <View style={{ marginTop: 4 }}>
          <Input
            label="Your password"
            placeholder="Enter password"
            autoCapitalize="none"
            secureTextEntry
            icon={() => (
              <MaterialIcons name="lock-outline" size={28} color="#6e6e6e" />
            )}
          />
        </View>

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logInButton}>
          <Text style={styles.login}>Log in</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.account}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}> Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#6e6e6e",
  },
  subtitle: {
    fontSize: 18,
    color: "#6e6e6e",
    marginTop: 10,
  },
  inputContainer: {
    flex: 1,
    width: "100%",
    marginTop: 28,
  },
  logInButton: {
    width: "100%",
    padding: 16,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  login: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  forgotPasswordButton: {
    marginTop: 8,
    alignSelf: "flex-end",
  },
  forgotPassword: {
    color: PRIMARY_COLOR,
    fontWeight: "600",
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  account: {
    color: "#6e6e6e",
    fontWeight: "600",
  },
});
