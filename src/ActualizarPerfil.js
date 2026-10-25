import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Modal, 
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

export default function ActualizarPerfil({ irAPerfil, datosUsuario, actualizarUsuarioCompleto }) {
  // Datos básicos
  const [nombre, setNombre] = useState(datosUsuario?.nombre || '');
  const [correo, setCorreo] = useState(datosUsuario?.correo || '');
  const [password, setPassword] = useState(datosUsuario?.password || '');
  const [confirmPassword, setConfirmPassword] = useState(datosUsuario?.password || '');
  const [avatar, setAvatar] = useState(datosUsuario?.avatar || '👧🏽');
  
  // Datos médicos
  const [tipoPastilla, setTipoPastilla] = useState(datosUsuario?.tipoPastilla || 'Combinadas');
  const [horario, setHorario] = useState(datosUsuario?.horario || '08:00 AM');
  const [pastillasActivas, setPastillasActivas] = useState(datosUsuario?.pastillasActivas || '21 activas');

  // Control de Modales
  const [modalAvatarVisible, setModalAvatarVisible] = useState(false);
  const [modalOpcionesVisible, setModalOpcionesVisible] = useState(false);
  const [modalHorarioVisible, setModalHorarioVisible] = useState(false);

  const [opcionesActuales, setOpcionesActuales] = useState([]);
  const [tituloModal, setTituloModal] = useState('');
  const [campoSeleccionado, setCampoSeleccionado] = useState('');

  // Estados temporales para el selector de Reloj
  const [horaSel, setHoraSel] = useState('08');
  const [minutoSel, setMinutoSel] = useState('00');
  const [periodoSel, setPeriodoSel] = useState('AM');

  // Opciones de listas
  const avataresDisponibles = ['👩🏾‍🦱', '👧🏽', '👩🏻‍🦰', '👩🏼', '👩🏻', '👩🏽‍🦱'];

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

  const horas = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutos = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  const periodos = ['AM', 'PM'];

  // Abrir selector de opciones generales
  const abrirSelectorOpciones = (titulo, opciones, campo) => {
    setTituloModal(titulo);
    setOpcionesActuales(opciones);
    setCampoSeleccionado(campo);
    setModalOpcionesVisible(true);
  };

  const seleccionarOpcion = (valor) => {
    if (campoSeleccionado === 'tipo') setTipoPastilla(valor);
    if (campoSeleccionado === 'activas') setPastillasActivas(valor);
    setModalOpcionesVisible(false);
  };

  const confirmarHorario = () => {
    setHorario(`${horaSel}:${minutoSel} ${periodoSel}`);
    setModalHorarioVisible(false);
  };

  const guardarCambios = () => {
    Keyboard.dismiss();

    if (!nombre.trim() || !correo.trim()) {
      Alert.alert('Campos obligatorios', 'El nombre y el correo no pueden estar vacíos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Contraseñas no coinciden', 'La contraseña nueva y la confirmación deben coincidir.');
      return;
    }

    const datosActualizados = {
      nombre: nombre.trim(),
      correo: correo.trim().toLowerCase(),
      password: password,
      avatar: avatar,
      tipoPastilla: tipoPastilla,
      horario: horario,
      pastillasActivas: pastillasActivas
    };

    actualizarUsuarioCompleto(datosActualizados);
    Alert.alert('Éxito', 'Tus datos han sido actualizados correctamente.', [
      { text: 'OK', onPress: irAPerfil }
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
          
          <TouchableOpacity style={styles.btnAtras} onPress={irAPerfil}>
            <Text style={styles.btnAtrasTexto}>←</Text>
          </TouchableOpacity>

          {/* Foto de Perfil Editable */}
          <View style={styles.avatarContainer}>
            <TouchableOpacity 
              style={styles.avatarCircle} 
              onPress={() => setModalAvatarVisible(true)}
            >
              <Text style={{ fontSize: 75 }}>{avatar}</Text>
            </TouchableOpacity>
          </View>

          {/* Nombre editable */}
          <View style={styles.nombreContainer}>
            <TextInput 
              style={styles.nombreInput}
              value={nombre}
              onChangeText={setNombre}
            />
            <Text style={styles.iconoEditar}>📝</Text>
          </View>

          {/* Formulario Datos de Cuenta */}
          <View style={styles.form}>
            <Text style={styles.label}>Correo</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={{ fontSize: 18 }}>📝</Text>
            </View>

            <Text style={styles.label}>Nueva contraseña</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

            <Text style={styles.label}>Confirmar contraseña</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
              />
            </View>

            {/* Datos Médicos con Modales Desplegables */}
            <Text style={[styles.label, { marginTop: 15 }]}>Tipo de pastilla</Text>
            <TouchableOpacity 
              style={styles.btnSelectable} 
              onPress={() => abrirSelectorOpciones('Selecciona el tipo de pastilla', opcionesTipo, 'tipo')}
            >
              <Text style={styles.btnSelectableTexto}>{tipoPastilla}</Text>
              <Text style={{ color: '#888' }}>▼</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Horario habitual de toma</Text>
            <TouchableOpacity 
              style={styles.btnSelectable} 
              onPress={() => setModalHorarioVisible(true)}
            >
              <Text style={styles.btnSelectableTexto}>{horario}</Text>
              <Text style={{ color: '#888' }}>🕒</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Número de pastillas activas</Text>
            <TouchableOpacity 
              style={styles.btnSelectable} 
              onPress={() => abrirSelectorOpciones('Selecciona pastillas activas', opcionesActivas, 'activas')}
            >
              <Text style={styles.btnSelectableTexto}>{pastillasActivas}</Text>
              <Text style={{ color: '#888' }}>▼</Text>
            </TouchableOpacity>

            {/* Botón Guardar Cambios */}
            <TouchableOpacity style={styles.btnGuardar} onPress={guardarCambios}>
              <Text style={styles.btnGuardarTexto}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

        {/* Modal Avatar */}
        <Modal visible={modalAvatarVisible} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Elige tu nueva foto</Text>
              <View style={styles.gridAvatares}>
                {avataresDisponibles.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.itemAvatar}
                    onPress={() => { setAvatar(item); setModalAvatarVisible(false); }}
                  >
                    <Text style={{ fontSize: 45 }}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.btnCerrarModal} onPress={() => setModalAvatarVisible(false)}>
                <Text style={styles.btnCerrarTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Opciones Médicas (Tipo / Activas) */}
        <Modal visible={modalOpcionesVisible} transparent={true} animationType="fade">
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
              <TouchableOpacity style={styles.btnCerrarModal} onPress={() => setModalOpcionesVisible(false)}>
                <Text style={styles.btnCerrarTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Reloj (Horario) */}
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

                {/* Columna AM/PM */}
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

      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F8' },
  scrollArea: { paddingHorizontal: 30, paddingTop: 50, paddingBottom: 40 },
  btnAtras: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#F9A8CB', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  btnAtrasTexto: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  avatarContainer: { alignItems: 'center', marginBottom: 15 },
  avatarCircle: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#E5D4CE', justifyContent: 'center', alignItems: 'center' },
  nombreContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  nombreInput: { fontSize: 30, fontWeight: 'bold', color: '#1B2A4E', borderBottomWidth: 1, borderBottomColor: '#F9A8CB', textAlign: 'center', minWidth: 150 },
  iconoEditar: { fontSize: 20, marginLeft: 8 },
  form: { width: '100%' },
  label: { color: '#1B2A4E', marginBottom: 6, fontSize: 15, fontWeight: 'bold', paddingLeft: 5 },
  inputContainer: { backgroundColor: '#FCE4EC', borderRadius: 25, paddingHorizontal: 20, height: 50, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  input: { flex: 1, height: '100%', color: '#333', fontSize: 15 },
  
  // Estilo de botones desplegables
  btnSelectable: { backgroundColor: '#FCE4EC', borderRadius: 25, paddingHorizontal: 20, height: 50, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  btnSelectableTexto: { color: '#333', fontSize: 15, fontWeight: '500' },

  btnGuardar: { backgroundColor: '#F9A8CB', paddingVertical: 15, borderRadius: 30, alignItems: 'center', marginTop: 20 },
  btnGuardarTexto: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  
  // Modales
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  modalContent: { width: '100%', backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center', maxHeight: '70%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B2A4E', marginBottom: 20 },
  gridAvatares: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  itemAvatar: { padding: 10, margin: 5 },
  btnCerrarModal: { marginTop: 15, paddingVertical: 10 },
  btnCerrarTexto: { color: '#E53935', fontWeight: 'bold', fontSize: 16 },
  opcionItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', width: '100%' },
  opcionTexto: { fontSize: 16, color: '#333', textAlign: 'center' },

  // Reloj
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
  modalBotones: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 },
  btnCancelarModal: { padding: 12, flex: 1, alignItems: 'center' },
  btnCancelarTexto: { color: '#E53935', fontWeight: 'bold' },
  btnConfirmarModal: { backgroundColor: '#F9B2D0', borderRadius: 15, padding: 12, flex: 1, alignItems: 'center' },
  btnConfirmarTexto: { color: 'white', fontWeight: 'bold' }
});