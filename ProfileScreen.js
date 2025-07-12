import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setEmail(currentUser.email);
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setGender(userData.gender || '');
            setName(userData.name || '');
            setAge(userData.age || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/user.png')} // ensure this file exists
        style={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{gender}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{age}</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: '#eca7a7ff',
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  infoBlock: {
    alignItems: 'flex-start',
    width: '80%',
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  value: {
    fontSize: 18,
    color: '#fff',
    marginTop: 2,
  },
});
