import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Alert 
} from 'react-native';

export default function Configuracion({ 
  irAPerfil, 
  irAActualizarPerfil, 
  irAPermisos, 
  irASobreNosotros, 
  cerrarSesion, 
  eliminarCuenta 
}) {

  const confirmarEliminar = () => {
    Alert.alert(
      'Eliminar cuenta',
      '¿Estás segura de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: eliminarCuenta }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Botón de regreso rosado */}
      <TouchableOpacity style={styles.btnAtras} onPress={irAPerfil}>
        <Text style={styles.btnAtrasTexto}>←</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Configuración</Text>

      <View style={styles.menuContainer}>
        {/* Actualizar perfil */}
        <TouchableOpacity style={styles.btnGradient} onPress={irAActualizarPerfil}>
          <Text style={styles.btnTexto}>Actualizar perfil</Text>
          <Text style={styles.iconTexto}>▶</Text>
        </TouchableOpacity>

        {/* Permisos */}
        <TouchableOpacity style={styles.btnGradient} onPress={irAPermisos}>
          <Text style={styles.btnTexto}>Permisos</Text>
          <Text style={styles.iconTexto}>▶</Text>
        </TouchableOpacity>

        {/* Sobre nosotros */}
        <TouchableOpacity style={styles.btnGradient} onPress={irASobreNosotros}>
          <Text style={styles.btnTexto}>Sobre nosotros</Text>
          <Text style={styles.iconTexto}>▶</Text>
        </TouchableOpacity>

        {/* Cerrar sesión */}
        <TouchableOpacity style={styles.btnGradient} onPress={cerrarSesion}>
          <Text style={styles.btnTexto}>Cerrar sesión</Text>
          <Text style={styles.iconTexto}>🚪</Text>
        </TouchableOpacity>

        {/* Eliminar cuenta */}
        <TouchableOpacity style={styles.btnGradient} onPress={confirmarEliminar}>
          <Text style={styles.btnTexto}>Eliminar cuenta</Text>
          <Text style={styles.iconTexto}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF5F8', 
    paddingTop: 50, 
    paddingHorizontal: 30 
  },
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
  titulo: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#1B2A4E', 
    textAlign: 'center', 
    marginBottom: 40 
  },
  menuContainer: { width: '100%' },
  btnGradient: { 
    backgroundColor: '#F9B2D0', 
    borderRadius: 20, 
    height: 55, 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  btnTexto: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: '500' 
  },
  iconTexto: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});