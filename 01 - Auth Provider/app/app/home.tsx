import { useAuth } from '@/providers/authProvider';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default function Home() {

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>You are logged in</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: '#5271ff',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: '90%'

  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
})