import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal, 
  FlatList, 
  Alert,
  ScrollView 
} from 'react-native';

export default function CapturaDatos({ irAtras, irAHome, guardarDatosMedicos }) {
  // Estados para las selecciones
  const [tipoPastilla, setTipoPastilla] = useState('');
  const [horario, setHorario] = useState('');
  const [pastillasActivas, setPastillasActivas] = useState('');

  // Control de Modales
  const [modalVisible, setModalVisible] = useState(false);
  const [modalHorarioVisible, setModalHorarioVisible] = useState(false);
  const [opcionesActuales, setOpcionesActuales] = useState([]);
  const [tituloModal, setTituloModal] = useState('');
  const [campoSeleccionado, setCampoSeleccionado] = useState('');

  // Estados temporales para la hora
  const [horaSel, setHoraSel] = useState('08');
  const [minutoSel, setMinutoSel] = useState('00');
  const [periodoSel, setPeriodoSel] = useState('AM');

  // Listas para el reloj
  const horas = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutos = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  const periodos = ['AM', 'PM'];

  // Listas de opciones prediseñadas
  const opcionesTipo = [
    { label: 'Combinadas (Estrógeno + Progestágeno)', value: 'Combinadas' },
    { label: 'Solo Progestágeno (Minipíldora)', value: 'Minipíldora' },
    { label: 'Uso Continuo / Extendido', value: 'Continuo' }
  ];

  const opcionesActivas = [
    { label: '21 pastillas activas (7 placebo/descanso)', value: '21 activas' },
    { label: '24 pastillas activas (4 placebo/descanso)', value: '24 activas' },
    { label: '28 pastillas activas (Sin descanso)', value: '28 activas' }
  ];

  const abrirSelectorOpciones = (titulo, opciones, campo) => {
    setTituloModal(titulo);
    setOpcionesActuales(opciones);
    setCampoSeleccionado(campo);
    setModalVisible(true);
  };

  const seleccionarOpcion = (valor) => {
    if (campoSeleccionado === 'tipo') setTipoPastilla(valor);
    if (campoSeleccionado === 'activas') setPastillasActivas(valor);
    setModalVisible(false);
  };

  const confirmarHorario = () => {
    setHorario(`${horaSel}:${minutoSel} ${periodoSel}`);
    setModalHorarioVisible(false);
  };

  const guardarYContinuar = () => {
    if (!tipoPastilla || !horario || !pastillasActivas) {
      Alert.alert('Datos incompletos', 'Por favor completa todos los campos para continuar.');
      return;
    }

    // Guarda los datos en el estado global del usuario activo
    if (guardarDatosMedicos) {
      guardarDatosMedicos(tipoPastilla, horario, pastillasActivas);
    }

    irAHome();
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.titulo}>Captura de datos</Text>

      {/* Botón 1: Tipo de pastilla */}
      <TouchableOpacity 
        style={styles.btnGradient} 
        onPress={() => abrirSelectorOpciones('Selecciona tu tipo de pastilla', opcionesTipo, 'tipo')}
      >
        <Text style={styles.btnTexto}>
          {tipoPastilla ? `Tipo: ${tipoPastilla}` : 'Tipo de pastilla'}
        </Text>
      </TouchableOpacity>

      {/* Botón 2: Horario de toma con Reloj */}
      <TouchableOpacity 
        style={styles.btnGradient} 
        onPress={() => setModalHorarioVisible(true)}
      >
        <Text style={styles.btnTexto}>
          {horario ? `Horario: ${horario}` : 'Horario de toma'}
        </Text>
      </TouchableOpacity>

      {/* Botón 3: Número de pastillas activas */}
      <TouchableOpacity 
        style={styles.btnGradient} 
        onPress={() => abrirSelectorOpciones('Número de pastillas activas por caja', opcionesActivas, 'activas')}
      >
        <Text style={styles.btnTexto}>
          {pastillasActivas ? `Activas: ${pastillasActivas}` : 'Número de pastillas activas'}
        </Text>
      </TouchableOpacity>

      {/* Acción OK Inferior Derecha */}
      <TouchableOpacity style={styles.btnOk} onPress={guardarYContinuar}>
        <Text style={styles.btnOkText}>Ok</Text>
      </TouchableOpacity>

      {/* MODAL RELOJ (Hora : Minuto AM/PM) */}
      <Modal visible={modalHorarioVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Horario habitual de toma</Text>

            <View style={styles.relojContainer}>
              {/* Columna Horas */}
              <View style={styles.columnaReloj}>
                <Text style={styles.columnaLabel}>Hora</Text>
                <ScrollView style={styles.scrollReloj} showsVerticalScrollIndicator={false}>
                  {horas.map((h) => (
                    <TouchableOpacity 
                      key={h} 
                      style={[styles.itemReloj, horaSel === h && styles.itemRelojSeleccionado]}
                      onPress={() => setHoraSel(h)}
                    >
                      <Text style={[styles.textoReloj, horaSel === h && styles.textoRelojSeleccionado]}>{h}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <Text style={styles.dosPuntos}>:</Text>

              {/* Columna Minutos */}
              <View style={styles.columnaReloj}>
                <Text style={styles.columnaLabel}>Min</Text>
                <ScrollView style={styles.scrollReloj} showsVerticalScrollIndicator={false}>
                  {minutos.map((m) => (
                    <TouchableOpacity 
                      key={m} 
                      style={[styles.itemReloj, minutoSel === m && styles.itemRelojSeleccionado]}
                      onPress={() => setMinutoSel(m)}
                    >
                      <Text style={[styles.textoReloj, minutoSel === m && styles.textoRelojSeleccionado]}>{m}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Columna AM / PM */}
              <View style={styles.columnaReloj}>
                <Text style={styles.columnaLabel}>Tanda</Text>
                <ScrollView style={styles.scrollReloj} showsVerticalScrollIndicator={false}>
                  {periodos.map((p) => (
                    <TouchableOpacity 
                      key={p} 
                      style={[styles.itemReloj, periodoSel === p && styles.itemRelojSeleccionado]}
                      onPress={() => setPeriodoSel(p)}
                    >
                      <Text style={[styles.textoReloj, periodoSel === p && styles.textoRelojSeleccionado]}>{p}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Previsualización */}
            <Text style={styles.previsualizacion}>Seleccionado: {horaSel}:{minutoSel} {periodoSel}</Text>

            <View style={styles.modalBotones}>
              <TouchableOpacity style={styles.btnCancelarModal} onPress={() => setModalHorarioVisible(false)}>
                <Text style={styles.btnCancelarTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnConfirmarModal} onPress={confirmarHorario}>
                <Text style={styles.btnConfirmarTexto}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL DE OPCIONES GENERALES (Tipo / Activas) */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{tituloModal}</Text>
            
            <FlatList
              data={opcionesActuales}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.opcionItem} 
                  onPress={() => seleccionarOpcion(item.value)}
                >
                  <Text style={styles.opcionTexto}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity 
              style={styles.btnCerrarModal} 
              onPress={() => setModalVisible(false)}
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
  container: { flex: 1, backgroundColor: '#FFF5F8', justifyContent: 'center', paddingHorizontal: 30 },
  titulo: { fontSize: 32, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 60 },
  btnGradient: { backgroundColor: '#F9B2D0', borderRadius: 25, height: 55, justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  btnTexto: { color: 'white', fontSize: 18, fontWeight: '500' },
  btnOk: { position: 'absolute', bottom: 50, right: 40 },
  btnOkText: { fontSize: 36, fontWeight: 'bold', color: '#000' },
  
  // Modales
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  modalContent: { width: '100%', backgroundColor: 'white', borderRadius: 20, padding: 25, maxHeight: '70%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B2A4E', marginBottom: 15, textAlign: 'center' },
  opcionItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  opcionTexto: { fontSize: 16, color: '#333', textAlign: 'center' },
  btnCerrarModal: { marginTop: 15, paddingVertical: 10, alignItems: 'center' },
  btnCerrarTexto: { color: '#E53935', fontWeight: 'bold', fontSize: 16 },

  // Estilos del Reloj
  relojContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 180, marginVertical: 10 },
  columnaReloj: { width: 70, alignItems: 'center' },
  columnaLabel: { fontWeight: 'bold', color: '#888', marginBottom: 5 },
  scrollReloj: { width: '100%' },
  itemReloj: { paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  itemRelojSeleccionado: { backgroundColor: '#F9B2D0' },
  textoReloj: { fontSize: 18, color: '#333' },
  textoRelojSeleccionado: { color: 'white', fontWeight: 'bold' },
  dosPuntos: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 5, color: '#F9B2D0' },
  previsualizacion: { textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#1B2A4E', marginVertical: 15 },
  modalBotones: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  btnCancelarModal: { padding: 12, flex: 1, alignItems: 'center' },
  btnCancelarTexto: { color: '#E53935', fontWeight: 'bold' },
  btnConfirmarModal: { backgroundColor: '#F9B2D0', borderRadius: 15, padding: 12, flex: 1, alignItems: 'center' },
  btnConfirmarTexto: { color: 'white', fontWeight: 'bold' }
});