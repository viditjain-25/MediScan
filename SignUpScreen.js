import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const SignUpScreen = ({ route, navigation }) => {
  const { role } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const validateAndSignUp = async () => {
    if (!name || !age) {
      Alert.alert('Missing Fields', 'Please enter your name and age.');
      return;
    }
    if (!email.endsWith('@gmail.com')) {
      Alert.alert('Invalid Email', 'Email must end with @gmail.com');
      return;
    }
    if (!gender) {
      Alert.alert('Gender Required', 'Please select a gender');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        name,
        age,
        gender,
        role,
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Signed Up', `Welcome, ${name}`);
      navigation.navigate(role === 'Doctor' ? 'DoctorHome' : 'Home');
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your full name"
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        placeholder="Enter your age"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Enter your Gmail"
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

      <TouchableOpacity style={styles.button} onPress={validateAndSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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

export default SignUpScreen;
