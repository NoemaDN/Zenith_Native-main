import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

export default function SobreNosotros({ irAConfiguracion }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnAtras} onPress={irAConfiguracion}>
        <Text style={styles.btnAtrasTexto}>←</Text>
      </TouchableOpacity>

      <Text style={styles.brandTitle}>Zenith</Text>

      <View style={styles.contenido}>
        <Text style={styles.textoPrincipal}>
          Esta aplicación fue creada para ayudarte con tu método anticonceptivo.
        </Text>
        <Text style={styles.textoSub}>Algo bonito.</Text>

        <Text style={styles.equipoTitulo}>Nuestro equipo:</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD', paddingTop: 50, paddingHorizontal: 30 },
  btnAtras: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#F9A8CB', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  btnAtrasTexto: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  brandTitle: { fontSize: 48, color: 'white', textAlign: 'center', marginBottom: 40, fontWeight: '300' },
  contenido: { alignItems: 'center' },
  textoPrincipal: { fontSize: 18, color: '#1B2A4E', textAlign: 'center', marginBottom: 15, lineHeight: 24 },
  textoSub: { fontSize: 18, color: '#1B2A4E', textAlign: 'center', marginBottom: 40 },
  equipoTitulo: { fontSize: 18, color: '#1B2A4E', textAlign: 'center', fontWeight: '500' }
});