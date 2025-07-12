import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PatientHome = () => {
  const [symptoms, setSymptoms] = React.useState('');
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  const handleAnalyze = async () => {
    if (!symptoms) return;

    setLoading(true);
    try {
      // Simulated ML response
      const simulatedResult = {
        disease: 'Flu',
        cure: 'Rest, hydration, and paracetamol',
      };
      setTimeout(() => {
        setResult(simulatedResult);
        setLoading(false);
      }, 1500);
    } catch (e) {
      Alert.alert('Error', 'Failed to analyze');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Describe Your Symptoms:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. fever, cough, headache"
        value={symptoms}
        onChangeText={setSymptoms}
        multiline
      />
      <Button title="Analyze" onPress={handleAnalyze} disabled={loading} />
      {result && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Disease: {result.disease}</Text>
          <Text style={styles.resultText}>Cure: {result.cure}</Text>
        </View>
      )}
    </View>
  );
};

export default PatientHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eab8b8ff',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  result: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 6,
  },
});
