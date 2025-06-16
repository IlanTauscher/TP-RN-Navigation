import * as React from 'react';
import { Button, TextInput, Text, View, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

function PantallaInicio({ navigation }) {
  const [nombre, setNombre] = React.useState('');
  const [telefono, setTelefono] = React.useState('');

  return (
    <View style={styles.contenedorInicio}>
      <Text style={styles.titulo}>Registro de Usuario</Text>
      <TextInput style={styles.entrada} placeholder="Ingrese su nombre" value={nombre} onChangeText={setNombre}/>
      <TextInput style={styles.entrada} placeholder="Ingrese su teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad"/>
      <Button title="Continuar" onPress={() => navigation.navigate('PantallaDetalle', { nombre, telefono })}/>
    </View>
  );
}

function PantallaDetalle({ route, navigation }) {
  const { nombre, telefono } = route.params;
  const [comentario, setComentario] = React.useState('');

  return (
    <View style={styles.contenedorInicio}>
      <Text style={styles.titulo}>Datos Ingresados</Text>
      <Text style={styles.texto}>Nombre: {nombre}</Text>
      <Text style={styles.texto}>Teléfono: {telefono}</Text>
      <TextInput style={styles.entrada} placeholder="Escribe un comentario" value={comentario} onChangeText={setComentario}/>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

function BusquedaInicio({ navigation }) {
  const [consulta, setConsulta] = React.useState('');

  return (
    <View style={styles.contenedorBusqueda}>
      <Text style={styles.titulo}>Buscador</Text>
      <TextInput style={styles.entrada} placeholder="¿Qué quieres buscar?" value={consulta} onChangeText={setConsulta}/>
      <Button title="Buscar" onPress={() => navigation.navigate('BuscadorResultado', { consulta })}/>
    </View>
  );
}

function BuscadorResultado({ route, navigation }) {
  const { consulta } = route.params;
  const [nota, setNota] = React.useState('');

  return (
    <View style={styles.contenedorBusqueda}>
      <Text style={styles.titulo}>Resultado de: {consulta}</Text>
      <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.imagen}/>
      <TextInput style={styles.entrada} placeholder="Deja tu nota" value={nota} onChangeText={setNota}/>
      <Button title="Enviar nota" onPress={() => navigation.goBack()} />
    </View>
  );
}

function PerfilInicio({ navigation }) {
  const [usuario, setUsuario] = React.useState('');

  return (
    <View style={styles.contenedorPerfil}>
      <Text style={styles.titulo}>Mi Perfil</Text>
      <TextInput style={styles.entrada} placeholder="Nombre de usuario" value={usuario} onChangeText={setUsuario}/>
      <Button title="Ver Detalle" onPress={() => navigation.navigate('PerfilDetalle', { usuario })}/>
    </View>
  );
}

function PerfilDetalle({ route, navigation }) {
  const { usuario } = route.params;
  const [bio, setBio] = React.useState('');

  return (
    <View style={styles.contenedorPerfil}>
      <Text style={styles.titulo}>Detalles de {usuario}</Text>
      <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.imagen}/>
      <TextInput style={styles.entrada} placeholder="Escribe tu biografía" value={bio} onChangeText={setBio}/>
      <Button title="Guardar" onPress={() => navigation.goBack()} />
    </View>
  );
}

function ConfiguracionInicio({ navigation }) {
  const [modo, setModo] = React.useState('');

  return (
    <View style={styles.contenedorConfiguracion}>
      <Text style={styles.titulo}>Configuración</Text>
      <TextInput style={styles.entrada} placeholder="Modo de la app" value={modo} onChangeText={setModo}/>
      <Button title="Ir a Ajustes" onPress={() => navigation.navigate('ConfiguracionDetalle', { modo })}/>
    </View>
  );
}

function ConfiguracionDetalle({ route, navigation }) {
  const { modo } = route.params;
  const [valor, setValor] = React.useState('');

  return (
    <View style={styles.contenedorConfiguracion}>
      <Text style={styles.titulo}>Ajustes Avanzados</Text>
      <Text style={styles.texto}>Modo actual: {modo}</Text>
      <TextInput style={styles.entrada} placeholder="Nuevo valor" value={valor} onChangeText={setValor}/>
      <Button title="Aplicar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function NavegadorInicio() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PantallaInicio" component={PantallaInicio} options={{ title: 'Inicio' }} />
      <Stack.Screen name="PantallaDetalle" component={PantallaDetalle} options={{ title: 'Detalle' }} />
    </Stack.Navigator>
  );
}

function NavegadorBusqueda() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BusquedaInicio" component={BusquedaInicio} options={{ title: 'Buscador' }} />
      <Stack.Screen name="BuscadorResultado" component={BuscadorResultado} options={{ title: 'Resultado' }} />
    </Stack.Navigator>
  );
}

function NavegadorPerfil() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PerfilInicio" component={PerfilInicio} options={{ title: 'Perfil' }} />
      <Stack.Screen name="PerfilDetalle" component={PerfilDetalle} options={{ title: 'Editar' }} />
    </Stack.Navigator>
  );
}

function NavegadorConfiguracion() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ConfiguracionInicio" component={ConfiguracionInicio} options={{ title: 'Configuración' }} />
      <Stack.Screen name="ConfiguracionDetalle" component={ConfiguracionDetalle} options={{ title: 'Ajustes' }} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function NavegacionPrincipal() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let icono = 'help';
          if (route.name === 'Inicio') icono = 'home';
          else if (route.name === 'Buscador') icono = 'search';
          else if (route.name === 'Perfil') icono = 'person';
          else if (route.name === 'Configuración') icono = 'settings';
          return <Ionicons name={icono} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Inicio" component={NavegadorInicio} />
      <Tab.Screen name="Buscador" component={NavegadorBusqueda} />
      <Tab.Screen name="Perfil" component={NavegadorPerfil} />
      <Tab.Screen name="Configuración" component={NavegadorConfiguracion} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar/>
      <NavigationContainer>
        <NavegacionPrincipal />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: 'white',
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  texto: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  entrada: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 15,
    width: '80%',
    borderRadius: 8,
  },
  contenedorInicio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
  },
  contenedorBusqueda: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#228b22',
  },
  contenedorPerfil: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8b008b',
  },
  contenedorConfiguracion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff8c00',
  },
  imagen: {
    width: 100,
    height: 100,
    marginTop: 15,
  },
});
