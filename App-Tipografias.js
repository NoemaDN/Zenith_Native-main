
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useFonts } from 'expo-font';

import Login from './src/Login';
import Registro from './src/Registro';
import CapturaDatos from './src/CapturaDatos';
import GuiaBienvenida from './src/GuiaBienvenida';
import Home from './src/Home';
import Diario from './src/Diario';
import Calendario from './src/Calendario';
import Informacion from './src/Informacion';
import Perfil from './src/Perfil';
import Configuracion from './src/Configuracion';
import ActualizarPerfil from './src/ActualizarPerfil';
import Permisos from './src/Permisos';
import SobreNosotros from './src/SobreNosotros';

// Tipografía predeterminada para toda la aplicación.
// Los estilos propios de cada componente pueden sobrescribirla.
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = [
  { fontFamily: 'LeagueSpartan-Font' },
  Text.defaultProps.style,
];

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.style = [
  { fontFamily: 'LeagueSpartan-Font' },
  TextInput.defaultProps.style,
];

export default function App() {
  const [fontsLoaded] = useFonts({
    'MontserratAlternates-Bold': require('./assets/fonts/MontserratAlternates-Bold.ttf'),
    'LeagueSpartan-Font': require('./assets/fonts/LeagueSpartan-Regular.ttf'),
  });

  const [pantallaActual, setPantallaActual] = useState('login');

  const [usuariosRegistrados, setUsuariosRegistrados] = useState([
    {
      nombre: 'Karina',
      correo: 'karina@gmail.com',
      password: '12345',
      avatar: '👧🏽',
      tipoPastilla: 'Combinadas',
      horario: '08:00 AM',
      pastillasActivas: '21 activas',
    },
  ]);

  const [datosUsuario, setDatosUsuario] = useState({
    nombre: 'Karina',
    correo: 'karina@gmail.com',
    password: '12345',
    avatar: '👧🏽',
    tipoPastilla: 'Combinadas',
    horario: '08:00 AM',
    pastillasActivas: '21 activas',
  });

  const registrarNuevoUsuario = (nombre, correo, password) => {
    const nuevoUsuario = {
      nombre,
      correo,
      password,
      avatar: '👧🏽',
      tipoPastilla: 'No registrada',
      horario: 'No configurado',
      pastillasActivas: 'No registrada',
    };

    setUsuariosRegistrados(prev => [...prev, nuevoUsuario]);
    setDatosUsuario(nuevoUsuario);
  };

  const guardarDatosMedicos = (tipo, horario, activas) => {
    setDatosUsuario(prev => {
      const usuarioActualizado = {
        ...prev,
        tipoPastilla: tipo,
        horario,
        pastillasActivas: activas,
      };

      setUsuariosRegistrados(lista =>
        lista.map(u =>
          u.correo.toLowerCase() === prev.correo.toLowerCase()
            ? usuarioActualizado
            : u
        )
      );

      return usuarioActualizado;
    });
  };

  const procesarInicioSesion = (nombre, correo) => {
    const usuarioEncontrado = usuariosRegistrados.find(
      u => u.correo.toLowerCase() === correo.toLowerCase()
    );

    if (usuarioEncontrado) {
      setDatosUsuario(usuarioEncontrado);
    } else {
      setDatosUsuario({
        nombre,
        correo,
        password: '12345',
        avatar: '👧🏽',
        tipoPastilla: 'Combinadas',
        horario: '08:00 AM',
        pastillasActivas: '21 activas',
      });
    }

    setPantallaActual('home');
  };

  const actualizarAvatar = nuevoAvatar => {
    setDatosUsuario(prev => {
      const usuarioActualizado = {
        ...prev,
        avatar: nuevoAvatar,
      };

      setUsuariosRegistrados(lista =>
        lista.map(u =>
          u.correo.toLowerCase() === prev.correo.toLowerCase()
            ? usuarioActualizado
            : u
        )
      );

      return usuarioActualizado;
    });
  };

  const actualizarUsuarioCompleto = nuevosDatos => {
    const correoAnterior = datosUsuario.correo.toLowerCase();

    setDatosUsuario(nuevosDatos);

    setUsuariosRegistrados(lista =>
      lista.map(u =>
        u.correo.toLowerCase() === correoAnterior
          ? nuevosDatos
          : u
      )
    );
  };

  const eliminarCuentaActual = () => {
    setUsuariosRegistrados(lista =>
      lista.filter(
        u =>
          u.correo.toLowerCase() !==
          datosUsuario.correo.toLowerCase()
      )
    );

    setDatosUsuario({
      nombre: '',
      correo: '',
      password: '',
      avatar: '👧🏽',
      tipoPastilla: '',
      horario: '',
      pastillasActivas: '',
    });

    setPantallaActual('login');
  };

  const procesarCerrarSesion = () => {
    setPantallaActual('login');
  };

  // Esperar a que ambas tipografías estén cargadas.
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {pantallaActual === 'login' && (
        <Login
          irARegistro={() => setPantallaActual('registro')}
          irACaptura={() => setPantallaActual('captura')}
          iniciarSesion={procesarInicioSesion}
          usuariosRegistrados={usuariosRegistrados}
        />
      )}

      {pantallaActual === 'registro' && (
        <Registro
          irALogin={() => setPantallaActual('login')}
          irACaptura={() => setPantallaActual('captura')}
          registrarNuevoUsuario={registrarNuevoUsuario}
        />
      )}

      {pantallaActual === 'captura' && (
        <CapturaDatos
          irAtras={() => setPantallaActual('login')}
          irAHome={() => setPantallaActual('guia')}
          guardarDatosMedicos={guardarDatosMedicos}
        />
      )}

      {pantallaActual === 'guia' && (
        <GuiaBienvenida
          terminarGuia={() => setPantallaActual('home')}
        />
      )}

      {pantallaActual === 'home' && (
        <Home
          irADiario={() => setPantallaActual('diario')}
          irACalendario={() => setPantallaActual('calendario')}
          irAInformacion={() => setPantallaActual('informacion')}
          irAPerfil={() => setPantallaActual('perfil')}
        />
      )}

      {pantallaActual === 'diario' && (
        <Diario
          irAHome={() => setPantallaActual('home')}
          irACalendario={() => setPantallaActual('calendario')}
          irAInformacion={() => setPantallaActual('informacion')}
        />
      )}

      {pantallaActual === 'calendario' && (
        <Calendario
          irAHome={() => setPantallaActual('home')}
          irADiario={() => setPantallaActual('diario')}
          irAInformacion={() => setPantallaActual('informacion')}
        />
      )}

      {pantallaActual === 'informacion' && (
        <Informacion
          irAHome={() => setPantallaActual('home')}
          irADiario={() => setPantallaActual('diario')}
          irACalendario={() => setPantallaActual('calendario')}
          irAGuia={() => setPantallaActual('guia')}
        />
      )}

      {pantallaActual === 'perfil' && (
        <Perfil
          irAHome={() => setPantallaActual('home')}
          irAEditarPerfil={() => setPantallaActual('editarPerfil')}
          irAConfiguracion={() => setPantallaActual('configuracion')}
          cerrarSesion={procesarCerrarSesion}
          datosUsuario={datosUsuario}
          actualizarAvatar={actualizarAvatar}
        />
      )}

      {pantallaActual === 'configuracion' && (
        <Configuracion
          irAPerfil={() => setPantallaActual('perfil')}
          irAActualizarPerfil={() => setPantallaActual('editarPerfil')}
          irAPermisos={() => setPantallaActual('permisos')}
          irASobreNosotros={() => setPantallaActual('sobreNosotros')}
          cerrarSesion={procesarCerrarSesion}
          eliminarCuenta={eliminarCuentaActual}
        />
      )}

      {pantallaActual === 'editarPerfil' && (
        <ActualizarPerfil
          irAPerfil={() => setPantallaActual('perfil')}
          datosUsuario={datosUsuario}
          actualizarUsuarioCompleto={actualizarUsuarioCompleto}
        />
      )}

      {pantallaActual === 'permisos' && (
        <Permisos
          irAConfiguracion={() =>
            setPantallaActual('configuracion')
          }
        />
      )}

      {pantallaActual === 'sobreNosotros' && (
        <SobreNosotros
          irAConfiguracion={() =>
            setPantallaActual('configuracion')
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F8',
  },
});
