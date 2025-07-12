import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // make sure path is correct

const LoginScreen = ({ route, navigation }) => {
  const { role } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState('');

  const validateAndLogin = async () => {
    if (!email.endsWith('@gmail.com')) {
      Alert.alert('Invalid Email', 'Email must end with @gmail.com');
      return;
    }
    if (!gender) {
      Alert.alert('Gender Required', 'Please select a gender');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Successful', `Email: ${email}\nGender: ${gender}`);
      navigation.navigate(role === 'Doctor' ? 'DoctorHome' : 'Home');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Enter Gmail"
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholder="Enter password"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderOption, gender === 'Male' && styles.selectedGender]}
          onPress={() => setGender('Male')}
        >
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderOption, gender === 'Female' && styles.selectedGender]}
          onPress={() => setGender('Female')}
        >
          <Text>Female</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={validateAndLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 10, fontWeight: 'bold' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10,
  },
  passwordInput: { flex: 1, paddingVertical: 10 },
  genderContainer: {
    flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10,
  },
  genderOption: {
    padding: 10, borderWidth: 1, borderRadius: 5, borderColor: '#aaa',
  },
  selectedGender: { backgroundColor: '#cce5ff' },
  button: {
    backgroundColor: '#007bff', padding: 15, borderRadius: 5, marginTop: 20,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default LoginScreen;
