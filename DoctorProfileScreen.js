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
            const data = docSnap.data();
            setGender(data.gender || '');
            setName(data.name || '');
            setAge(data.age || '');
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
        source={require('../assets/doctor.png')}
        style={styles.avatar}
      />
      <Text style={styles.username}>Dr. {name}</Text>

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
    backgroundColor: '#db9f9fff',
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
    backgroundColor: '#555',
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  infoBlock: {
    width: '80%',
    marginBottom: 15,
  },
  label: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  value: {
    fontSize: 18,
    color: '#fff',
    marginTop: 4,
  },
});
