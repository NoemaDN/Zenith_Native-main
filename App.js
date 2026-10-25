import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const CALENDARIO_VACIO = { registros: {}, inicioCiclo: null };

// Llaves donde se guarda la información en el teléfono
const LLAVE_USUARIOS = '@app/usuariosRegistrados';
const LLAVE_CALENDARIO = '@app/calendarioPorUsuario';

const USUARIOS_INICIALES = [
  {
    nombre: 'Karina',
    correo: 'karina@gmail.com',
    password: '12345',
    avatar: '👧🏽',
    tipoPastilla: 'Combinadas',
    horario: '08:00 AM',
    pastillasActivas: '21 activas',
  },
];

export default function App() {
  const [fontsLoaded] = useFonts({
    'MontserratAlternates-Bold': require('./assets/fonts/MontserratAlternates-Bold.ttf'),
    'LeagueSpartan-Font': require('./assets/fonts/LeagueSpartan-Regular.ttf'),
  });

  const [pantallaActual, setPantallaActual] = useState('login');

  const [usuariosRegistrados, setUsuariosRegistrados] = useState(USUARIOS_INICIALES);

  const [datosUsuario, setDatosUsuario] = useState(USUARIOS_INICIALES[0]);

  // Calendario por usuario, con el correo como llave
  const [calendarioPorUsuario, setCalendarioPorUsuario] = useState({});

  // Indica si ya se leyó lo guardado en el teléfono
  const [datosCargados, setDatosCargados] = useState(false);

  // ---------- Cargar datos guardados al abrir la app ----------
  useEffect(() => {
    const cargar = async () => {
      try {
        const guardados = await AsyncStorage.multiGet([
          LLAVE_USUARIOS,
          LLAVE_CALENDARIO,
        ]);

        const usuariosJSON = guardados[0][1];
        const calendarioJSON = guardados[1][1];

        if (usuariosJSON !== null) {
          const usuarios = JSON.parse(usuariosJSON);
          if (Array.isArray(usuarios)) setUsuariosRegistrados(usuarios);
        }

        if (calendarioJSON !== null) {
          const calendario = JSON.parse(calendarioJSON);
          if (calendario && typeof calendario === 'object') {
            setCalendarioPorUsuario(calendario);
          }
        }
      } catch (error) {
        console.warn('No se pudieron cargar los datos guardados:', error);
      } finally {
        setDatosCargados(true);
      }
    };

    cargar();
  }, []);

  // ---------- Guardar cada vez que cambian ----------
  useEffect(() => {
    if (!datosCargados) return;

    const guardar = async () => {
      try {
        await AsyncStorage.multiSet([
          [LLAVE_USUARIOS, JSON.stringify(usuariosRegistrados)],
          [LLAVE_CALENDARIO, JSON.stringify(calendarioPorUsuario)],
        ]);
      } catch (error) {
        console.warn('No se pudieron guardar los datos:', error);
      }
    };

    guardar();
  }, [usuariosRegistrados, calendarioPorUsuario, datosCargados]);

  // ---------- Calendario del usuario actual ----------
  const claveUsuario = (datosUsuario.correo || '').toLowerCase();
  const calendarioActual = calendarioPorUsuario[claveUsuario] ?? CALENDARIO_VACIO;

  const actualizarRegistrosCalendario = nuevosRegistros => {
    setCalendarioPorUsuario(prev => ({
      ...prev,
      [claveUsuario]: {
        ...(prev[claveUsuario] ?? CALENDARIO_VACIO),
        registros: nuevosRegistros,
      },
    }));
  };

  const actualizarInicioCiclo = nuevaFecha => {
    setCalendarioPorUsuario(prev => ({
      ...prev,
      [claveUsuario]: {
        ...(prev[claveUsuario] ?? CALENDARIO_VACIO),
        inicioCiclo: nuevaFecha,
      },
    }));
  };

  // ---------- Usuarios ----------
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
    const usuarioActualizado = {
      ...datosUsuario,
      tipoPastilla: tipo,
      horario,
      pastillasActivas: activas,
    };

    setDatosUsuario(usuarioActualizado);
    setUsuariosRegistrados(lista =>
      lista.map(u =>
        u.correo.toLowerCase() === datosUsuario.correo.toLowerCase()
          ? usuarioActualizado
          : u
      )
    );
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
    const usuarioActualizado = { ...datosUsuario, avatar: nuevoAvatar };

    setDatosUsuario(usuarioActualizado);
    setUsuariosRegistrados(lista =>
      lista.map(u =>
        u.correo.toLowerCase() === datosUsuario.correo.toLowerCase()
          ? usuarioActualizado
          : u
      )
    );
  };

  const actualizarUsuarioCompleto = nuevosDatos => {
    const correoAnterior = datosUsuario.correo.toLowerCase();
    const correoNuevo = (nuevosDatos.correo || '').toLowerCase();

    setDatosUsuario(nuevosDatos);

    setUsuariosRegistrados(lista =>
      lista.map(u =>
        u.correo.toLowerCase() === correoAnterior ? nuevosDatos : u
      )
    );

    if (correoNuevo !== correoAnterior) {
      setCalendarioPorUsuario(prev => {
        const datosPrevios = prev[correoAnterior];
        if (!datosPrevios) return prev;
        const { [correoAnterior]: _quitado, ...resto } = prev;
        return { ...resto, [correoNuevo]: datosPrevios };
      });
    }
  };

  const eliminarCuentaActual = () => {
    setUsuariosRegistrados(lista =>
      lista.filter(
        u => u.correo.toLowerCase() !== datosUsuario.correo.toLowerCase()
      )
    );

    setCalendarioPorUsuario(prev => {
      const { [claveUsuario]: _quitado, ...resto } = prev;
      return resto;
    });

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

  if (!fontsLoaded || !datosCargados) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
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
          <GuiaBienvenida terminarGuia={() => setPantallaActual('home')} />
        )}

        {pantallaActual === 'home' && (
          <Home
            datosUsuario={datosUsuario}
            irADiario={() => setPantallaActual('diario')}
            irACalendario={() => setPantallaActual('calendario')}
            irAInformacion={() => setPantallaActual('informacion')}
            irAPerfil={() => setPantallaActual('perfil')}
          />
        )}

        {pantallaActual === 'diario' && (
          <Diario
            datosUsuario={datosUsuario}
            irAHome={() => setPantallaActual('home')}
            irACalendario={() => setPantallaActual('calendario')}
            irAInformacion={() => setPantallaActual('informacion')}
          />
        )}

        {pantallaActual === 'calendario' && (
          <Calendario
            datosUsuario={datosUsuario}
            registros={calendarioActual.registros}
            setRegistros={actualizarRegistrosCalendario}
            inicioCiclo={calendarioActual.inicioCiclo}
            setInicioCiclo={actualizarInicioCiclo}
            irAHome={() => setPantallaActual('home')}
            irADiario={() => setPantallaActual('diario')}
            irAInformacion={() => setPantallaActual('informacion')}
          />
        )}

        {pantallaActual === 'informacion' && (
          <Informacion
            datosUsuario={datosUsuario}
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
          <Permisos irAConfiguracion={() => setPantallaActual('configuracion')} />
        )}

        {pantallaActual === 'sobreNosotros' && (
          <SobreNosotros
            irAConfiguracion={() => setPantallaActual('configuracion')}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F8',
  },
});