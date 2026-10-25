import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert 
} from 'react-native';

export default function Login({ irARegistro, iniciarSesion, usuariosRegistrados = [] }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const manejarLogin = () => {
    Keyboard.dismiss();

    const correoLimpio = correo.toLowerCase().trim();

    if (!correoLimpio || !password) {
      Alert.alert('Campos vacíos', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    // Buscamos si el usuario existe en la lista de registrados
    const usuarioEncontrado = usuariosRegistrados.find(
      (u) => u.correo.toLowerCase().trim() === correoLimpio && u.password === password
    );

    if (usuarioEncontrado) {
      // Inicia sesión pasando el nombre y correo correspondientes a la cuenta encontrada
      iniciarSesion(usuarioEncontrado.nombre, usuarioEncontrado.correo);
    } else {
      Alert.alert(
        'Acceso denegado', 
        'El correo o la contraseña son incorrectos o el usuario no está registrado.'
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.innerContainer}>
          
          {/* Logo Central */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>Zenith</Text>
            </View>
          </View>

          <View style={styles.form}>
            {/* Campo Correo */}
            <Text style={styles.label}>Correo</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input} 
                placeholder="example@gmail.com" 
                placeholderTextColor="#666"
                keyboardType="email-address" 
                autoCapitalize="none"
                autoCorrect={false}
                value={correo}
                onChangeText={setCorreo} 
              />
              <Text style={styles.icon}>📝</Text>
            </View>

            {/* Campo Contraseña */}
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input} 
                placeholder="S1nN1ñ@s" 
                placeholderTextColor="#666"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword} 
              />
            </View>

            {/* Enlace de Registro */}
            <TouchableOpacity onPress={irARegistro}>
              <Text style={styles.registerLink}>¿Aún no tienes cuenta? Regístrate</Text>
            </TouchableOpacity>

            {/* Botón Ingresar */}
            <TouchableOpacity style={styles.btnIngresar} onPress={manejarLogin}>
              <Text style={styles.btnIngresarText}>Ingresar</Text>
            </TouchableOpacity>

            {/* Botón Términos y Condiciones */}
            <TouchableOpacity style={styles.btnTerminos}>
              <Text style={styles.btnTerminosText}>Términos y condiciones</Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F8' },
  innerContainer: { flex: 1, justifyContent: 'center', paddingHorizontal: 40 },
  logoContainer: { alignItems: 'center', marginBottom: 50 },
  logoCircle: { 
    width: 160, 
    height: 160, 
    borderRadius: 80, 
    backgroundColor: '#D9D9D9', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logoText: { color: 'white', fontSize: 36, fontWeight: 'bold' },
  form: { width: '100%' },
  label: { color: '#2C3E50', marginBottom: 8, fontSize: 16, fontWeight: '600', paddingLeft: 5 },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FADCE6', 
    borderRadius: 25, 
    paddingHorizontal: 20, 
    height: 55, 
    marginBottom: 20 
  },
  input: { flex: 1, height: '100%', color: '#333', fontSize: 16 },
  icon: { fontSize: 20, color: '#666' },
  registerLink: { 
    color: '#5D6D7E', 
    fontSize: 13, 
    textDecorationLine: 'underline', 
    marginBottom: 50, 
    paddingLeft: 5 
  },
  btnIngresar: { 
    backgroundColor: '#F9A8CB', 
    paddingVertical: 15, 
    borderRadius: 30, 
    alignItems: 'center', 
    marginBottom: 20 
  },
  btnIngresarText: { color: 'white', fontSize: 20, fontWeight: '500' },
  btnTerminos: { 
    backgroundColor: '#BDE4F4', 
    paddingVertical: 10, 
    borderRadius: 15, 
    alignItems: 'center' 
  },
  btnTerminosText: { color: '#2C3E50', fontSize: 14, fontWeight: '500' }
});