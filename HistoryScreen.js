// screens/HistoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
          collection(db, 'appointments'),
          where('patientId', '==', user.uid),
          where('status', '==', 'completed') // only completed appointments
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading your history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Appointment History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Symptoms: {item.symptoms}</Text>
            <Text>Diagnosis: {item.diagnosis || 'Pending'}</Text>
            <Text>Cure: {item.cure || 'Pending'}</Text>
            <Text>Time Slot: {item.timeSlot}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  card: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
