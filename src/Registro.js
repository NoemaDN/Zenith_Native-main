import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert,
  Image 
} from 'react-native';

export default function Registro({ irALogin, irACaptura, registrarNuevoUsuario }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [aceptoTerminos, setAceptoTerminos] = useState(false);

  const manejarRegistro = () => {
    Keyboard.dismiss();

    if (!correo.trim() || !password.trim() || !confirmPassword.trim() || !nombre.trim()) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos para continuar.');
      return;
    }

    if (!correo.includes('@') || !correo.includes('.')) {
      Alert.alert('Correo inválido', 'Ingresa un correo electrónico válido.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Contraseñas no coinciden', 'La contraseña y su confirmación deben ser iguales.');
      return;
    }

    if (!aceptoTerminos) {
      Alert.alert('Términos y condiciones', 'Debes aceptar los términos y condiciones para crear tu cuenta.');
      return;
    }

    // Registrar en el estado global
    registrarNuevoUsuario(nombre.trim(), correo.trim().toLowerCase(), password);

    // Avanzar a la captura de datos (onboarding)
    irACaptura();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
          
          {/* Botón regresar circular rosado */}
          <TouchableOpacity style={styles.btnAtras} onPress={irALogin}>
            <Text style={styles.btnAtrasTexto}>←</Text>
          </TouchableOpacity>

          {/* Avatar / Ilustración superior */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <Text style={{ fontSize: 60 }}>👧🏽</Text>
            </View>
          </View>

          {/* Formulario */}
          <View style={styles.form}>
            
            <Text style={styles.label}>Correo</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={correo}
                onChangeText={setCorreo}
              />
            </View>

            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                placeholder=""
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <Text style={styles.label}>Confirmar contraseña</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                placeholder=""
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <Text style={styles.label}>Nombre/Apodo</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                placeholder=""
                value={nombre}
                onChangeText={setNombre}
              />
            </View>

            {/* Checkbox Términos y Condiciones */}
            <TouchableOpacity 
              style={styles.checkboxContainer} 
              onPress={() => setAceptoTerminos(!aceptoTerminos)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, aceptoTerminos && styles.checkboxActivo]}>
                {aceptoTerminos && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.terminosTexto}>
                He leído y acepto los <Text style={styles.terminosEnlace}>términos y condiciones</Text>
              </Text>
            </TouchableOpacity>

            {/* Botón Crear */}
            <TouchableOpacity style={styles.btnCrear} onPress={manejarRegistro}>
              <Text style={styles.btnCrearText}>Crear</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F8' },
  scrollArea: { paddingHorizontal: 30, paddingTop: 50, paddingBottom: 40 },
  btnAtras: { 
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    backgroundColor: '#F9A8CB', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 10
  },
  btnAtrasTexto: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatarCircle: { 
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    backgroundColor: '#E5D4CE', 
    justifyContent: 'center', 
    alignItems: 'center',
    overflow: 'hidden'
  },
  form: { width: '100%' },
  label: { color: '#2C3E50', marginBottom: 6, fontSize: 16, fontWeight: 'bold', paddingLeft: 5 },
  inputContainer: { 
    backgroundColor: '#FCE4EC', 
    borderRadius: 25, 
    paddingHorizontal: 20, 
    height: 50, 
    marginBottom: 15,
    justifyContent: 'center'
  },
  input: { flex: 1, height: '100%', color: '#333', fontSize: 16 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 15, paddingLeft: 5 },
  checkbox: { 
    width: 22, 
    height: 22, 
    borderWidth: 2, 
    borderColor: '#666', 
    borderRadius: 4, 
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  checkboxActivo: { backgroundColor: '#F9A8CB', borderColor: '#F9A8CB' },
  checkmark: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  terminosTexto: { color: '#666', fontSize: 13, flex: 1 },
  terminosEnlace: { color: '#F9A8CB', textDecorationLine: 'underline' },
  btnCrear: { 
    backgroundColor: '#F9A8CB', 
    paddingVertical: 14, 
    borderRadius: 30, 
    alignItems: 'center', 
    marginTop: 10 
  },
  btnCrearText: { color: 'white', fontSize: 22, fontWeight: 'bold' }
});