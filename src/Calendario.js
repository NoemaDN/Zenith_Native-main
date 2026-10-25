import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function Calendario({ irAHome, irADiario, irAInformacion }) {
  const diasSemana = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const diasMes = [
    '', '', '1', '2', '3', '4', '5',
    '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26',
    '27', '28', '29', '30', '', '', ''
  ];
  const diasResaltados = ['9', '10', '11', '12', '13'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={irAHome}><Text style={styles.btnBack}>←</Text></TouchableOpacity>
        <Text style={styles.titulo}>Mi calendario</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {/* Tarjeta del Calendario */}
        <View style={styles.tarjetaCalendario}>
          <View style={styles.controles}>
            <Text style={styles.flecha}>&lt;</Text>
            <View style={styles.selectores}>
              <View style={styles.select}><Text style={styles.selectText}>Sep ▾</Text></View>
              <View style={styles.select}><Text style={styles.selectText}>2026 ▾</Text></View>
            </View>
            <Text style={styles.flecha}>&gt;</Text>
          </View>

          <View style={styles.gridSemana}>
            {diasSemana.map((dia, i) => <Text key={i} style={styles.diaSemana}>{dia}</Text>)}
          </View>

          <View style={styles.gridDias}>
            {diasMes.map((num, i) => {
              const estaResaltado = num !== '' && diasResaltados.includes(num);
              return (
                <View key={i} style={[styles.diaCelda, estaResaltado && styles.diaResaltado]}>
                  <Text style={[styles.diaTexto, estaResaltado && styles.textoBlanco]}>{num}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Tarjeta Más Información */}
        <View style={styles.tarjetaInfo}>
          <Text style={styles.infoTitulo}>Más información</Text>
          <Text style={styles.infoTexto}>
            Aquí podrás visualizar el seguimiento de tus tomas, identificar días de descanso y revisar el historial de tus ciclos pasados.
          </Text>
        </View>
      </ScrollView>

      {/* Menú Inferior */}
      <View style={styles.navInferior}>
        <TouchableOpacity onPress={irADiario}><Text style={styles.navIcono}>📓</Text></TouchableOpacity>
        <TouchableOpacity onPress={irAInformacion}><Text style={styles.navIcono}>📚</Text></TouchableOpacity>
        <View style={styles.navItemActivo}><Text style={styles.navIcono}>🧮</Text></View>
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
  tarjetaCalendario: { backgroundColor: '#FDE7ED', borderRadius: 20, padding: 15, marginBottom: 20 },
  controles: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  flecha: { fontSize: 18, fontWeight: 'bold', color: '#1B2A4E' },
  selectores: { flexDirection: 'row', gap: 10 },
  select: { borderWidth: 1, borderColor: '#F49EBF', borderRadius: 12, paddingVertical: 4, paddingHorizontal: 10, backgroundColor: 'white' },
  selectText: { color: '#1B2A4E', fontWeight: 'bold', fontSize: 14 },
  gridSemana: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  diaSemana: { color: '#888', fontSize: 12, fontWeight: 'bold', width: '14%', textAlign: 'center' },
  gridDias: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  diaCelda: { width: '13%', height: 36, justifyContent: 'center', alignItems: 'center', marginBottom: 5, borderRadius: 8 },
  diaResaltado: { backgroundColor: '#F49EBF' },
  diaTexto: { color: '#1B2A4E', fontSize: 14 },
  textoBlanco: { color: 'white', fontWeight: 'bold' },
  tarjetaInfo: { backgroundColor: '#FDE7ED', borderRadius: 20, padding: 20, alignItems: 'center' },
  infoTitulo: { fontSize: 18, fontWeight: 'bold', color: '#1B2A4E', marginBottom: 10 },
  infoTexto: { fontSize: 13, color: '#555', textAlign: 'center', lineHeight: 20 },
  navInferior: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: 'white', borderRadius: 30, height: 60, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  navIcono: { fontSize: 24 },
  navItemActivo: { backgroundColor: '#F49EBF', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }
});