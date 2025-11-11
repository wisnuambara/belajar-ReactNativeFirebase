import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, Alert } from 'react-native'
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword }from 'firebase/auth';

const Login = ({ navigation }: any) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async() => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User signed in:', user.email);
            Alert.alert(
                    'Success',
                    'Login Berhasil'
                  );
        } catch (error) {
            console.error('Error signing in:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Login</Text>
            <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none'
            onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput value={password} style={styles.input} placeholder='Password' autoCapitalize='none'
            onChangeText={(text) => setPassword(text)}></TextInput>
            { loading ? (<ActivityIndicator size="large" color="#0000ff" />) :
            (
                <>
                    <Button  title='Sign In' onPress={signIn} />
                   
                </>
            )
            
            }
            <Text
                  style={[styles.hintText, { marginTop: 14, color: '#2563eb' }]}
                  onPress={() => navigation.navigate('Register')}
                  >
                  doesnt have an account?
            </Text>
        </View>
    )
}

export default Login

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
