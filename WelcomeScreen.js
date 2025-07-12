import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const [role, setRole] = useState(null);

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen, { role });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MediScan</Text>

      {!role ? (
        <>
          <TouchableOpacity style={styles.roleButton} onPress={() => handleRoleSelection('Doctor')}>
            <Text style={styles.roleText}>I am a Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roleButton} onPress={() => handleRoleSelection('Patient')}>
            <Text style={styles.roleText}>I am a Patient</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subTitle}>Selected Role: {role}</Text>

          <TouchableOpacity style={styles.button} onPress={() => handleNavigate('Login')}>
            <Text style={styles.buttonText}>{role} Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.signup]} onPress={() => handleNavigate('SignUp')}>
            <Text style={styles.buttonText}>{role} Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setRole(null)}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f0fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 40,
    color: '#4b6cb7',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#444',
  },
  roleButton: {
    backgroundColor: '#6fa9dc',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginVertical: 10,
  },
  roleText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4b6cb7',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginVertical: 10,
  },
  signup: {
    backgroundColor: '#6fcf97',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backText: {
    marginTop: 20,
    fontSize: 14,
    color: '#555',
    textDecorationLine: 'underline',
  },
});
