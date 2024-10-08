import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useAuth } from '@/providers/authProvider';

export default function Login() {

  const email = useRef<string>();
  const password = useRef<string>();

  const { login } = useAuth();

  const handleLogin = async () => {

    if (email.current && password.current) {
      await login(email.current, password.current);

    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.logo} source={require("@/assets/images/logo.png")} resizeMode='contain' />
        <Text style={styles.welcome}>Welcome to</Text>
        <Image style={styles.logoWithText} source={require("@/assets/images/logo-with-text.png")} resizeMode='contain' />
      </View>

      <View style={styles.loginForm}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email-outline" size={24} color="#707070" style={styles.icon} />
          <TextInput style={styles.input} placeholder='Enter your email' autoCapitalize={'none'} onChangeText={ch => email.current = ch} />
        </View>

        <View style={[styles.inputContainer, styles.passwordInput]}>
          <MaterialCommunityIcons name="lock-outline" size={24} color="#707070" style={styles.icon} />
          <TextInput style={styles.input} placeholder='Enter your password' autoCapitalize={'none'} secureTextEntry onChangeText={ch => password.current = ch} />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>
            I forgot my password
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.createAccount}>Create one</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  topContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: -60
  },
  welcome: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: -24
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 100
  },
  logoWithText: {
    width: '100%'
  },
  loginForm: {
    flex: 2,
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
  loginText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  loginButton: {
    marginTop: 24,
    backgroundColor: '#5271ff',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: 54
  },
  forgotPasswordText: {
    color: '#5271ff',
    fontWeight: 'bold'
  },
  forgotPasswordButton: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingBottom: 32,
    flexDirection: 'row'
  },
  createAccount: {
    color: '#5271ff',
    fontWeight: 'bold'
  }
})