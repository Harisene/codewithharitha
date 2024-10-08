import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useAuth } from '@/providers/authProvider';

export default function Register() {

  const email = useRef<string>();
  const password = useRef<string>();
  const confirmPassword = useRef<string>();

  const { register } = useAuth();

  const handleRegister = async () => {
    if (email.current && password.current) {
      await register(email.current, password.current);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backContainer} onPress={(() => router.back())}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.topContainer}>
        <Text style={styles.welcome}>Create new account at</Text>
        <Image style={styles.logo} source={require("@/assets/images/logo-with-text.png")} resizeMode='contain' />
      </View>

      <View style={styles.registerForm}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email-outline" size={24} color="#707070" style={styles.icon} />
          <TextInput style={styles.input} placeholder='Enter your email' autoCapitalize={'none'} onChangeText={ch => email.current = ch} />
        </View>

        <View style={[styles.inputContainer, styles.passwordInput]}>
          <MaterialCommunityIcons name="lock-outline" size={24} color="#707070" style={styles.icon} />
          <TextInput style={styles.input} placeholder='Enter your password' autoCapitalize={'none'} secureTextEntry onChangeText={ch => password.current = ch} />
        </View>

        <View style={[styles.inputContainer, styles.passwordInput]}>
          <MaterialCommunityIcons name="lock-outline" size={24} color="#707070" style={styles.icon} />
          <TextInput style={styles.input} placeholder='Enter your password again' autoCapitalize={'none'} secureTextEntry onChangeText={ch => confirmPassword.current = ch} />
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerText}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  header: {
    width: '80%',
  },
  backContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed',
    width: 34,
    height: 34,
    borderRadius: 17
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  welcome: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: -24
  },
  logo: {
    width: '100%'
  },
  registerForm: {
    flex: 3,
    width: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 18
  },
  input: {
    width: '76%'
  },
  icon: {
    padding: 16
  },
  passwordInput: {
    marginTop: 14
  },
  registerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  registerButton: {
    marginTop: 24,
    backgroundColor: '#5271ff',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: 54
  },
})