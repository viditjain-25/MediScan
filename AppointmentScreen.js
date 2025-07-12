import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc, getDoc, doc, serverTimestamp } from 'firebase/firestore';

const timeSlots = [
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
  '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM',
  '08:00 PM - 09:00 PM',
  '09:00 PM - 10:00 PM',
  '10:00 PM - 11:00 PM'
];

const AppointmentScreen = ({ navigation }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        const nameFromEmail = user.email ? user.email.split('@')[0] : 'Unknown';

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserDetails({
            uid: user.uid,
            email: user.email || 'unknown@gmail.com',
            patientName: data.patientName || nameFromEmail,
            gender: data.gender || 'Unknown',
          });
        } else {
          // fallback user if no user doc in Firestore
          setUserDetails({
            uid: user.uid,
            email: user.email || 'unknown@gmail.com',
            patientName: nameFromEmail,
            gender: 'Unknown',
          });
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const bookAppointment = async () => {
    if (!selectedSlot) {
      Alert.alert('Please select a time slot');
      return;
    }

    const user = auth.currentUser;
    if (!user || !userDetails) {
      Alert.alert('Error', 'User not logged in or details not loaded.');
      return;
    }

    const appointmentData = {
      patientId: userDetails.uid,
      doctorId: 'doctor123', // Can replace this with selected doctor ID later
      patientName: userDetails.patientName,
      email: userDetails.email,
      gender: userDetails.gender,
      timeSlot: selectedSlot,
      createdAt: serverTimestamp(),
      status: 'active'
    };

    try {
      await addDoc(collection(db, 'appointments'), appointmentData);
      Alert.alert('Appointment Booked', `Slot: ${selectedSlot}`);
      setSelectedSlot(null);
      navigation.goBack();
    } catch (error) {
      console.error('Error booking appointment:', error);
      Alert.alert('Error', 'Something went wrong while booking.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Time Slot</Text>
      <FlatList
        data={timeSlots}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.slot, selectedSlot === item && styles.selectedSlot]}
            onPress={() => setSelectedSlot(item)}
          >
            <Text style={styles.slotText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.bookButton} onPress={bookAppointment}>
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  slot: {
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
  },
  selectedSlot: { backgroundColor: '#d0e7ff' },
  slotText: { textAlign: 'center' },
  bookButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});
