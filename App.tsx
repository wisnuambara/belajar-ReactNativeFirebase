import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Home  from './app/screens/Home';
import Detail from './app/screens/Detail';  
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebase/config';
import { User } from 'firebase/auth'

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

const InsideStackScreen = () => {
  return (
    <InsideStack.Navigator>
    <InsideStack.Screen name="home" component={Home} />
    <InsideStack.Screen name="detail" component={Detail} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
    }); 
    return () => unsubscribe();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? 
        (
          <Stack.Screen name="Inside" component={InsideStackScreen} options={{ headerShown: false }} />
        ) 
        : 
        (
        <><Stack.Screen name='Login' component={Login} options={{ headerShown: false }} /><Stack.Screen name='Register' component={Register} options={{ headerShown: false }} /></>
        )
        
      }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
