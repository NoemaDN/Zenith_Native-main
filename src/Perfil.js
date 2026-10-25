import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Modal, 
  FlatList,
  Alert 
} from 'react-native';

export default function Perfil({ 
  irAHome, 
  irAEditarPerfil, 
  irAConfiguracion, 
  cerrarSesion, 
  datosUsuario,
  actualizarAvatar 
}) {
  const [modalAvatarVisible, setModalAvatarVisible] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // Opciones de avatar para personalizar
  const avataresDisponibles = ['👩🏾‍🦱', '👧🏽', '👩🏻‍🦰', '👩🏼', '👩🏻', '👩🏽‍🦱'];

  const seleccionarAvatar = (emoji) => {
    actualizarAvatar(emoji);
    setModalAvatarVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Encabezado Superior */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnHeader} onPress={irAHome}>
          <Text style={styles.btnHeaderTexto}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnHeader} onPress={irAConfiguracion}>
          <Text style={styles.btnHeaderTexto}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {/* Foto de Perfil Editable */}
        <View style={styles.avatarContainer}>
          <TouchableOpacity 
            style={styles.avatarCircle} 
            onPress={() => setModalAvatarVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={{ fontSize: 75 }}>{datosUsuario?.avatar || '👧🏽'}</Text>
            <View style={styles.badgeCamara}>
              <Text style={{ fontSize: 12 }}>📷</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Nombre con icono de edición */}
        <View style={styles.nombreContainer}>
          <Text style={styles.nombreTexto}>{datosUsuario?.nombre || 'Matilda'}</Text>
          <TouchableOpacity onPress={irAEditarPerfil}>
            <Text style={styles.iconoEditar}>📝</Text>
          </TouchableOpacity>
        </View>

        {/* Datos de Registro/Inicio de sesión */}
        <View style={styles.seccion}>
          <Text style={styles.label}>Correo</Text>
          <View style={styles.fieldBox}>
            <Text style={styles.fieldText}>{datosUsuario?.correo || 'alumno2324@gmail.com'}</Text>
          </View>

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.fieldBoxRow}>
            <Text style={styles.fieldText}>
              {mostrarPassword ? datosUsuario?.password : '••••••••'}
            </Text>
            <TouchableOpacity onPress={() => setMostrarPassword(!mostrarPassword)}>
              <Text style={{ fontSize: 16 }}>{mostrarPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Información Médica Capturada */}
        <View style={styles.seccionMedica}>
          <Text style={styles.tituloSeccionMedica}>Datos del anticonceptivo</Text>

          <View style={styles.cardMedica}>
            <Text style={styles.labelMedica}>Tipo de pastilla</Text>
            <Text style={styles.valorMedica}>{datosUsuario?.tipoPastilla || 'Combinadas'}</Text>
          </View>

          <View style={styles.cardMedica}>
            <Text style={styles.labelMedica}>Horario habitual de toma</Text>
            <Text style={styles.valorMedica}>{datosUsuario?.horario || '08:00 AM'}</Text>
          </View>

          <View style={styles.cardMedica}>
            <Text style={styles.labelMedica}>Número de pastillas activas</Text>
            <Text style={styles.valorMedica}>{datosUsuario?.pastillasActivas || '21 activas'}</Text>
          </View>
        </View>

        {/* Botón Cerrar Sesión */}
        <TouchableOpacity style={styles.btnCerrarSesion} onPress={cerrarSesion}>
          <Text style={styles.btnCerrarSesionTexto}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal para Cambiar Foto/Avatar de Perfil */}
      <Modal visible={modalAvatarVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Elige tu foto de perfil</Text>
            
            <View style={styles.gridAvatares}>
              {avataresDisponibles.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.itemAvatar}
                  onPress={() => seleccionarAvatar(item)}
                >
                  <Text style={{ fontSize: 45 }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.btnCerrarModal}
              onPress={() => setModalAvatarVisible(false)}
            >
              <Text style={styles.btnCerrarTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F8' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingTop: 50, 
    paddingHorizontal: 25, 
    paddingBottom: 10 
  },
  btnHeader: { 
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    backgroundColor: '#F9A8CB', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  btnHeaderTexto: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  scrollArea: { paddingHorizontal: 30, paddingBottom: 40 },
  avatarContainer: { alignItems: 'center', marginTop: 10, marginBottom: 15 },
  avatarCircle: { 
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    backgroundColor: '#E5D4CE', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'relative'
  },
  badgeCamara: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 6,
    borderWidth: 1,
    borderColor: '#E2D4DE'
  },
  nombreContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 30 
  },
  nombreTexto: { 
    fontSize: 34, 
    fontWeight: 'bold', 
    color: '#1B2A4E', 
    marginRight: 8 
  },
  iconoEditar: { fontSize: 20 },
  seccion: { marginBottom: 25 },
  label: { 
    color: '#1B2A4E', 
    marginBottom: 6, 
    fontSize: 16, 
    fontWeight: 'bold', 
    paddingLeft: 5 
  },
  fieldBox: { 
    backgroundColor: '#FCE4EC', 
    borderRadius: 25, 
    paddingHorizontal: 20, 
    height: 55, 
    justifyContent: 'center', 
    marginBottom: 20 
  },
  fieldBoxRow: { 
    backgroundColor: '#FCE4EC', 
    borderRadius: 25, 
    paddingHorizontal: 20, 
    height: 55, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginBottom: 20 
  },
  fieldText: { color: '#1B2A4E', fontSize: 16, fontWeight: '500' },
  
  // Estilos de Datos Médicos
  seccionMedica: {
    marginTop: 10,
    marginBottom: 20
  },
  tituloSeccionMedica: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B2A4E',
    marginBottom: 15,
    paddingLeft: 5
  },
  cardMedica: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FCE4EC'
  },
  labelMedica: { fontSize: 13, color: '#888', marginBottom: 3 },
  valorMedica: { fontSize: 16, fontWeight: 'bold', color: '#1B2A4E' },

  btnCerrarSesion: { 
    backgroundColor: '#FFEBEE', 
    borderRadius: 20, 
    paddingVertical: 14, 
    alignItems: 'center', 
    marginTop: 10 
  },
  btnCerrarSesionTexto: { color: '#E53935', fontWeight: 'bold', fontSize: 16 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  modalContent: { width: '100%', backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B2A4E', marginBottom: 20 },
  gridAvatares: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  itemAvatar: { padding: 10, margin: 5 },
  btnCerrarModal: { marginTop: 15, paddingVertical: 10 },
  btnCerrarTexto: { color: '#E53935', fontWeight: 'bold', fontSize: 16 }
});