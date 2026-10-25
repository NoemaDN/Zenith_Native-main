import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function Home({ irAPerfil, irADiario, irACalendario, irAInformacion }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollArea}>
        
        {/* Encabezado Azul */}
        <View style={styles.headerAzul}>
          <TouchableOpacity onPress={irAPerfil} style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👩🏾‍🦱</Text>
          </TouchableOpacity>
          <Text style={styles.saludo}>¡Hola, Matilda!</Text>
        </View>

        {/* Sección del Blíster */}
        <View style={styles.seccionBlister}>
          <View style={styles.blisterFondo}>
            <Text style={styles.blisterDia}>Día 8</Text>
            <Text style={styles.blisterPregunta}>¿Ya tomaste tu pastilla?</Text>
            
            <View style={styles.pastillasArco}>
              <View style={styles.pastilla} />
              <View style={styles.pastilla} />
              <View style={styles.pastilla} />
              <View style={[styles.pastilla, styles.pastillaActiva]}>
                <View style={styles.pastillaCentro} />
              </View>
              <View style={styles.pastillaVacia}><Text style={styles.textVacia}>-</Text></View>
              <View style={styles.pastillaVacia}><Text style={styles.textVacia}>-</Text></View>
              <View style={styles.pastillaVacia}><Text style={styles.textVacia}>-</Text></View>
            </View>
          </View>
        </View>

        {/* Tarjeta Rosa: Síntomas */}
        <View style={styles.tarjetaRosa}>
          <Text style={styles.tarjetaTitulo}>Lo que podrías sentir los próximos días</Text>
          <View style={styles.sintomasFila}>
            {[1, 2, 3, 4].map((item) => (
              <View key={item} style={styles.sintomaItem}>
                <View style={styles.sintomaCirculo} />
                <Text style={styles.sintomaTexto}>Síntoma</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tarjeta Azul: Accesos Rápidos */}
        <View style={styles.tarjetaAzul}>
          <Text style={styles.tarjetaTitulo}>¿Necesitas registrar síntomas o revisar tu historial?</Text>
          <View style={styles.botonesFila}>
            <TouchableOpacity style={styles.btnCuadrado} onPress={irADiario}>
              <Text style={styles.btnTexto}>Diario</Text>
              <Text style={styles.btnIcono}>📓</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCuadrado} onPress={irACalendario}>
              <Text style={styles.btnTexto}>Calendario</Text>
              <Text style={styles.btnIcono}>🧮</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Barra de Navegación Inferior */}
      <View style={styles.navInferior}>
        <TouchableOpacity onPress={irADiario}><Text style={styles.navItem}>📓</Text></TouchableOpacity>
        <TouchableOpacity onPress={irAInformacion}><Text style={styles.navItem}>📚</Text></TouchableOpacity>
        <TouchableOpacity onPress={irACalendario}><Text style={styles.navItem}>🧮</Text></TouchableOpacity>
        
        <View style={styles.navItemActivo}>
          <Text style={styles.navItemActivoTexto}>🏠</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF9F9' },
  scrollArea: { paddingBottom: 100 },
  headerAzul: {
    backgroundColor: '#BDE4F4',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50, height: 50, backgroundColor: 'white', borderRadius: 25,
    justifyContent: 'center', alignItems: 'center', marginRight: 15,
  },
  avatarEmoji: { fontSize: 24 },
  saludo: { fontSize: 24, fontWeight: 'bold', color: '#1B2A4E' },
  seccionBlister: { padding: 20, marginTop: -20 },
  blisterFondo: {
    backgroundColor: '#1B2A4E', borderRadius: 20, padding: 20, alignItems: 'center',
  },
  blisterDia: { color: '#F49EBF', fontSize: 24, fontWeight: 'bold' },
  blisterPregunta: { color: 'white', fontSize: 16, marginBottom: 20 },
  pastillasArco: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
  pastilla: { width: 30, height: 30, backgroundColor: '#F49EBF', borderRadius: 15 },
  pastillaActiva: { backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  pastillaCentro: { width: 15, height: 15, backgroundColor: '#F49EBF', borderRadius: 7.5 },
  pastillaVacia: { width: 30, height: 30, borderWidth: 2, borderColor: '#555', borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  textVacia: { color: '#555' },
  tarjetaRosa: { backgroundColor: '#FDE7ED', marginHorizontal: 20, padding: 20, borderRadius: 20, marginBottom: 20 },
  tarjetaAzul: { backgroundColor: '#BDE4F4', marginHorizontal: 20, padding: 20, borderRadius: 20, marginBottom: 20 },
  tarjetaTitulo: { color: '#1B2A4E', fontWeight: 'bold', marginBottom: 15, fontSize: 16 },
  sintomasFila: { flexDirection: 'row', justifyContent: 'space-between' },
  sintomaItem: { alignItems: 'center' },
  sintomaCirculo: { width: 40, height: 40, backgroundColor: 'white', borderRadius: 20, marginBottom: 5 },
  sintomaTexto: { fontSize: 12, color: '#1B2A4E' },
  botonesFila: { flexDirection: 'row', justifyContent: 'space-between' },
  btnCuadrado: { backgroundColor: 'white', width: '48%', padding: 15, borderRadius: 15, alignItems: 'center' },
  btnTexto: { fontWeight: 'bold', color: '#1B2A4E', marginBottom: 10 },
  btnIcono: { fontSize: 30 },
  navInferior: {
    position: 'absolute', bottom: 20, left: 20, right: 20,
    backgroundColor: 'white', borderRadius: 30, height: 60,
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
  },
  navItem: { fontSize: 24 },
  navItemActivo: {
    backgroundColor: '#F49EBF', width: 50, height: 50, borderRadius: 25,
    justifyContent: 'center', alignItems: 'center',
    position: 'absolute', right: 10,
  },
  navItemActivoTexto: { fontSize: 24 }
});