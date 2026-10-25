import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';

export default function Diario({ irAHome, irAInformacion, irACalendario }) {
  const dias = [{d:'Lun',n:6},{d:'Mar',n:7},{d:'Mié',n:8},{d:'Jue',n:9},{d:'Vie',n:10}];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={irAHome}><Text style={styles.btnBack}>←</Text></TouchableOpacity>
        <Text style={styles.titulo}>Mi diario</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {/* Carrusel de Días */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasScroll}>
          {dias.map((dia, index) => (
            <View key={index} style={[styles.diaCaja, dia.n === 8 && styles.diaActivo]}>
              <Text style={[styles.diaLetra, dia.n === 8 && styles.textoBlanco]}>{dia.d}</Text>
              <Text style={[styles.diaNumero, dia.n === 8 && styles.textoBlanco]}>{dia.n}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.subtitulo}>Hoy no has registrado síntomas</Text>

        {/* Sección de Síntomas */}
        <View style={styles.seccion}>
          <Text style={styles.label}>¿Qué síntomas tienes hoy?</Text>
          <View style={styles.gridSintomas}>
            {[1,2,3,4,5,6].map(i => (
              <View key={i} style={styles.sintomaCaja} />
            ))}
          </View>
        </View>

        {/* Notas */}
        <View style={styles.seccion}>
          <Text style={styles.label}>Notas adicionales</Text>
          <TextInput 
            style={styles.textArea} 
            placeholder="Escribe aquí si notaste algo inusual..." 
            multiline={true} 
            numberOfLines={4} 
          />
        </View>

        <TouchableOpacity style={styles.btnGuardar}>
          <Text style={styles.btnGuardarTexto}>Guardar registro</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Menú Inferior */}
      <View style={styles.navInferior}>
        <View style={styles.navItemActivo}><Text style={styles.navIcono}>📓</Text></View>
        <TouchableOpacity onPress={irAInformacion}><Text style={styles.navIcono}>📚</Text></TouchableOpacity>
        <TouchableOpacity onPress={irACalendario}><Text style={styles.navIcono}>🧮</Text></TouchableOpacity>
        <TouchableOpacity onPress={irAHome}><Text style={styles.navIcono}>🏠</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF9F9' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 10 },
  btnBack: { fontSize: 28, color: '#F49EBF', fontWeight: 'bold', marginRight: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#1B2A4E' },
  scrollArea: { paddingHorizontal: 20, paddingBottom: 100 },
  diasScroll: { flexDirection: 'row', marginBottom: 20 },
  diaCaja: { width: 60, height: 70, backgroundColor: 'white', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 10, borderWidth: 1, borderColor: '#E2D4DE' },
  diaActivo: { backgroundColor: '#F49EBF', borderColor: '#F49EBF' },
  diaLetra: { fontSize: 14, color: '#888' },
  diaNumero: { fontSize: 20, fontWeight: 'bold', color: '#1B2A4E' },
  textoBlanco: { color: 'white' },
  subtitulo: { textAlign: 'center', color: '#1B2A4E', fontWeight: 'bold', marginBottom: 20 },
  seccion: { marginBottom: 20 },
  label: { color: '#1B2A4E', fontWeight: 'bold', marginBottom: 10 },
  gridSintomas: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  sintomaCaja: { width: '30%', height: 60, backgroundColor: '#E2D4DE', borderRadius: 10 },
  textArea: { backgroundColor: 'white', borderRadius: 15, padding: 15, height: 100, textAlignVertical: 'top', borderWidth: 1, borderColor: '#E2D4DE' },
  btnGuardar: { backgroundColor: '#1B2A4E', padding: 15, borderRadius: 25, alignItems: 'center', marginTop: 10 },
  btnGuardarTexto: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  navInferior: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: 'white', borderRadius: 30, height: 60, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  navIcono: { fontSize: 24 },
  navItemActivo: { backgroundColor: '#F49EBF', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }
});