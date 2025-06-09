import * as React from 'react';
import { Button, TextInput, Text, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// --- Stack A Screens (HOME) ---
function ScreenA1({ navigation }) {
  const [nombre, setNombre] = React.useState('');
  const [telefono, setTelefono] = React.useState('');

  return (
    <View style={styles.homeScreen}>
      <Text style={styles.text}>Pantalla A1</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        onChangeText={setNombre}
        value={nombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        onChangeText={setTelefono}
        value={telefono}
        keyboardType="phone-pad"
      />
      <Button
        title="Ir a A2"
        onPress={() => navigation.navigate('ScreenA2', { nombre, telefono })}
      />
    </View>
  );
}

function ScreenA2({ route }) {
  const { nombre, telefono } = route.params || {};
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.text}>Pantalla A2</Text>
      <Text style={styles.text}>Nombre: {nombre}</Text>
      <Text style={styles.text}>Teléfono: {telefono}</Text>
    </View>
  );
}

// --- Stack B Screens (Buscador) ---
function ScreenB1({ navigation }) {
  return (
    <View style={styles.searchScreen}>
      <Text style={styles.text}>Buscador 1</Text>
      <Button title="Ir a Buscador 2" onPress={() => navigation.navigate('ScreenB2')} />
    </View>
  );
}

function ScreenB2() {
  return (
    <View style={styles.searchScreen}>
      <Text style={styles.text}>Buscador 2</Text>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}

// --- Stack C Screens (Perfil) ---
function ScreenC1({ navigation }) {
  return (
    <View style={styles.profileScreen}>
      <Text style={styles.text}>Perfil 1</Text>
      <Button title="Ir a Perfil 2" onPress={() => navigation.navigate('ScreenC2')} />
    </View>
  );
}

function ScreenC2() {
  return (
    <View style={styles.profileScreen}>
      <Text style={styles.text}>Perfil 2</Text>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}

// --- Stack Navigators ---
const StackA = createNativeStackNavigator();
const StackB = createNativeStackNavigator();
const StackC = createNativeStackNavigator();

function StackANavigator() {
  return (
    <StackA.Navigator>
      <StackA.Screen name="ScreenA1" component={ScreenA1} />
      <StackA.Screen name="ScreenA2" component={ScreenA2} />
    </StackA.Navigator>
  );
}

function StackBNavigator() {
  return (
    <StackB.Navigator>
      <StackB.Screen name="ScreenB1" component={ScreenB1} />
      <StackB.Screen name="ScreenB2" component={ScreenB2} />
    </StackB.Navigator>
  );
}

function StackCNavigator() {
  return (
    <StackC.Navigator>
      <StackC.Screen name="ScreenC1" component={ScreenC1} />
      <StackC.Screen name="ScreenC2" component={ScreenC2} />
    </StackC.Navigator>
  );
}

// --- Bottom Tabs ---
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Buscador') iconName = 'search';
        else if (route.name === 'Perfil') iconName = 'person';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Home" component={StackANavigator} />
      <Tab.Screen name="Buscador" component={StackBNavigator} />
      <Tab.Screen name="Perfil" component={StackCNavigator} />
    </Tab.Navigator>
  );
}

// --- App Wrapper ---
export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 8,
    marginBottom: 10,
    width: '80%',
    borderRadius: 5,
  },
  homeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
  },
  searchScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#228b22',
  },
  profileScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8b008b',
  },
});
