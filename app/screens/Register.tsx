import React, { useState } from 'react';
import { View, TextInput, ActivityIndicator, Button, StyleSheet, Alert, Text } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase/config';

const Register = ({navigation}:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [noHP, setNoHP] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {

    setLoading(true);

    try {
      // Membuat user baru
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      // Kirim email verifikasi
      await sendEmailVerification(user);

      // Simpan data tambahan ke Firestore
      const userRef = doc(FIREBASE_DB, 'users', user.uid);
      await setDoc(userRef, {
        namaLengkap,
        noHP,
        email,
        createdAt: new Date(),
      });

      Alert.alert(
        'Success',
        'User registered successfully. Please check your email for verification'
      );

      // Reset form setelah register sukses
      setEmail('');
      setPassword('');
      setNamaLengkap('');
      setNoHP('');
    } catch (error: any) {
      console.error('Error registering user:', error);
      Alert.alert('Register failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Register</Text>
      <TextInput
      value={email}
      style={styles.input}
      placeholder="Email"
      autoCapitalize="none"
      keyboardType="email-address"
      onChangeText={setEmail}
      />
      <TextInput
      value={namaLengkap}
      style={styles.input}
      placeholder="Nama Lengkap"
      onChangeText={setNamaLengkap}
      />
      <TextInput
      value={noHP}
      style={styles.input}
      placeholder="Nomor HP"
      keyboardType="phone-pad"
      onChangeText={setNoHP}
      />
      <TextInput
      value={password}
      style={styles.input}
      placeholder="Password"
      secureTextEntry
      onChangeText={setPassword}
      />

      {loading ? (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      ) : (
      <Button title="Create Account" onPress={signUp} />
      )}

      {/* Clickable text below the button that navigates to the "Login" screen.
        Ensure this component receives a navigation prop or use useNavigation(). */}
      <Text
      style={[styles.hintText, { marginTop: 14, color: '#2563eb' }]}
      onPress={() => navigation.navigate('Login')}
      >
      already have an accout?
      </Text>
    </View>
  );
};

export default Register;

// To add the "Register" title and card look, wrap your inputs/button in a card View like:
//   <View style={styles.card}>
//     <Text style={styles.title}>Register</Text>
//     {/* inputs & button here */}
//   </View>
// Make sure to import Text from 'react-native' at the top.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  card: {
    position: 'absolute',
    bottom: 300, // distance from bottom
    alignSelf: 'center', // center horizontally
    width: '92%',
    maxWidth: 480,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: 'center',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    // Android elevation
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },
  input: {
    marginVertical: 6,
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#e6e9ef',
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#fbfdff',
    color: '#0f172a',
  },
  actions: {
    marginTop: 12,
    width: '100%',
  },
  buttonWrapper: {
    borderRadius: 10,
    overflow: 'hidden', // keeps native Button rounded on Android
  },
  loading: {
    marginTop: 12,
  },
  hintText: {
    marginTop: 10,
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },
});
