import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import moment from 'moment';

const DoctorHistoryScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = moment();
      const historyData = snapshot.docs.map(doc => {
        const item = doc.data();
        const appointmentTime = moment(item.createdAt?.toDate()).set(
          moment(item.timeSlot, 'hh:mm A').toObject()
        );
        const isPast = now.diff(appointmentTime, 'minutes') > 15;
        return { id: doc.id, ...item, isPast };
      }).filter(item => item.isPast);
      setAppointments(historyData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Appointment History</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Name: {item.patientName}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Gender: {item.gender}</Text>
            <Text>Time Slot: {item.timeSlot}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DoctorHistoryScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  card: {
    padding: 15,
    backgroundColor: '#67b5f9ff',
    borderRadius: 8,
    marginBottom: 10,
  },
});
