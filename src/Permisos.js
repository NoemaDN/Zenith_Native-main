import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Permisos({ irAConfiguracion }) {
  const [notificaciones, setNotificaciones] = useState(true);
  const [almacenamiento, setAlmacenamiento] = useState(true);
  const [segundoPlano, setSegundoPlano] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnAtras} onPress={irAConfiguracion}>
        <Text style={styles.btnAtrasTexto}>←</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Permisos</Text>

      <View style={styles.lista}>
        <View style={styles.item}>
          <Text style={styles.itemTexto}>Notificaciones</Text>
          <TouchableOpacity onPress={() => setNotificaciones(!notificaciones)}>
            <View style={[styles.checkCircle, notificaciones && styles.checkActivo]}>
              <Text style={styles.checkIcono}>✓</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemTexto}>Almacenamiento</Text>
          <TouchableOpacity onPress={() => setAlmacenamiento(!almacenamiento)}>
            <View style={[styles.checkCircle, almacenamiento && styles.checkActivo]}>
              <Text style={styles.checkIcono}>✓</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemTexto}>Ejecutar en segundo plano</Text>
          <TouchableOpacity onPress={() => setSegundoPlano(!segundoPlano)}>
            <View style={[styles.checkCircle, segundoPlano && styles.checkActivo]}>
              <Text style={styles.checkIcono}>✓</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F8', paddingTop: 50, paddingHorizontal: 30 },
  btnAtras: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#F9A8CB', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  btnAtrasTexto: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  titulo: { fontSize: 32, fontWeight: 'bold', color: '#1B2A4E', textAlign: 'center', marginBottom: 50 },
  lista: { width: '100%' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 35 },
  itemTexto: { fontSize: 20, color: '#1B2A4E', fontWeight: '500' },
  checkCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#CCC', justifyContent: 'center', alignItems: 'center' },
  checkActivo: { backgroundColor: '#000' },
  checkIcono: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});