import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import moment from 'moment';

const DoctorAppointmentScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = moment();
      const data = snapshot.docs.map(doc => {
        const item = doc.data();
        const appointmentTime = moment(item.createdAt?.toDate()).set(
          moment(item.timeSlot, 'hh:mm A').toObject()
        );
        const isPast = now.diff(appointmentTime, 'minutes') > 15;
        return { id: doc.id, ...item, isPast };
      });
      setAppointments(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const upcomingAppointments = appointments.filter(item => !item.isPast);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0579f6ff" />
        <Text style={styles.loadingText}>Loading appointments...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {upcomingAppointments.length === 0 ? (
        <Text style={styles.noAppointments}>No current appointments.</Text>
      ) : (
        <FlatList
          data={upcomingAppointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>Name: {item.patientName}</Text>
              <Text style={styles.cardText}>Email: {item.email}</Text>
              <Text style={styles.cardText}>Gender: {item.gender}</Text>
              <Text style={styles.cardText}>Time Slot: {item.timeSlot}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default DoctorAppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#db9f9fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  noAppointments: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#292626ff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 2,
  },
});
