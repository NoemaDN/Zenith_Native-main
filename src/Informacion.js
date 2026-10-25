import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Modal,
  Image 
} from 'react-native';

export default function Informacion({ irAHome, irADiario, irACalendario, irAGuia }) {
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);

  // Lista de artículos informativos resumidos con fuentes médicas oficiales
  const articulos = [
    {
      id: '1',
      titulo: '¿Qué hacer si olvidas una pastilla?',
      sinopsis: 'Guía paso a paso sobre cómo actuar según las horas transcurridas desde tu olvido habitual.',
      portada: '💊',
      contenido: 'Si han pasado menos de 24 horas, tómala en cuanto lo recuerdes y sigue con el horario normal. Si pasaron más de 24 horas, toma la última pastilla olvidada de inmediato (aunque signifique tomar dos juntas) y utiliza un método de barrera (preservativo) durante los siguientes 7 días.',
      fuente: 'Fuente: Organización Mundial de la Salud (OMS) & Mayo Clinic.'
    },
    {
      id: '2',
      titulo: 'Pastillas y mitos de fertilidad',
      sinopsis: 'Desmitificando el impacto del uso prolongado de anticonceptivos orales en el embarazo.',
      portada: '🩺',
      contenido: 'Las pastillas anticonceptivas no causan infertilidad a largo plazo. Al suspenderlas, la fertilidad suele regresar a su estado natural en un plazo de 1 a 3 meses. Los retrasos en la concepción suelen deberse a causas ajenas a la píldora.',
      fuente: 'Fuente: Planned Parenthood & ACOG.'
    },
    {
      id: '3',
      titulo: 'Efectos secundarios comunes',
      sinopsis: 'Síntomas habituales durante los primeros tres meses de adaptación hormonal.',
      portada: '🌱',
      contenido: 'Durante los primeros 90 días, es normal experimentar ligeros manchados intermenstruales, sensibilidad en los pechos o nauseas leves. Si los síntomas persisten pasados tres meses o son muy molestos, consulta a tu ginecóloga para ajustar la dosis.',
      fuente: 'Fuente: Instituto Mexicano del Seguro Social (IMSS).'
    },
    {
      id: '4',
      titulo: 'Medicamentos que interfieren',
      sinopsis: 'Sustancias que pueden reducir la efectividad de los anticonceptivos hormonales.',
      portada: '⚠️',
      contenido: 'Ciertos antibióticos específicos (como la rifampicina), medicamentos anticonvulsivos y suplementos naturales como la Hierba de San Juan pueden acelerar la eliminación de hormonas y reducir la efectividad de la pastilla.',
      fuente: 'Fuente: Biblioteca Nacional de Medicina (MedlinePlus).'
    },
    {
      id: '5',
      titulo: 'Anticonceptivos y salud ósea',
      sinopsis: 'Cómo influyen las hormonas sintéticas en la densidad mineral del hueso.',
      portada: '🦴',
      contenido: 'Las píldoras combinadas (estrógeno + progestágeno) ayudan a mantener niveles hormonales estables y proteger la densidad ósea en edades reproductivas, siempre que se acompañe de una dieta rica en calcio y ejercicio.',
      fuente: 'Fuente: Mayo Clinic / Endocrine Society.'
    }
  ];

  return (
    <View style={styles.container}>
      
      {/* Botón superior de regreso y Título */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnAtras} onPress={irAHome}>
          <Text style={styles.btnAtrasTexto}>←</Text>
        </TouchableOpacity>
        <Text style={styles.tituloHeader}>Información</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
        
        {/* Banner "¿Te perdiste la guía inicial? Mírala aquí" */}
        <TouchableOpacity style={styles.bannerGuia} onPress={irAGuia} activeOpacity={0.8}>
          <Text style={styles.bannerTitulo}>¿Te perdiste la guía inicial?</Text>
          <Text style={styles.bannerSubtitulo}>Mírala aquí</Text>
        </TouchableOpacity>

        {/* Lista de Artículos */}
        {articulos.map((art) => (
          <TouchableOpacity 
            key={art.id} 
            style={styles.cardArticulo} 
            onPress={() => setArticuloSeleccionado(art)}
            activeOpacity={0.8}
          >
            {/* Portada / Miniatura */}
            <View style={styles.miniaturaContainer}>
              <Text style={{ fontSize: 35 }}>{art.portada}</Text>
            </View>

            {/* Texto Título y Sinopsis */}
            <View style={styles.textosArticulo}>
              <Text style={styles.tituloArticulo}>{art.titulo}</Text>
              <Text style={styles.sinopsisArticulo} numberOfLines={3}>{art.sinopsis}</Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* MODAL POP-UP DEL ARTÍCULO */}
      <Modal 
        visible={articuloSeleccionado !== null} 
        transparent={true} 
        animationType="slide"
        onRequestClose={() => setArticuloSeleccionado(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.headerModal}>
              <Text style={{ fontSize: 40 }}>{articuloSeleccionado?.portada}</Text>
              <Text style={styles.modalTitulo}>{articuloSeleccionado?.titulo}</Text>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalTextoContenido}>
                {articuloSeleccionado?.contenido}
              </Text>
              
              <Text style={styles.modalFuente}>
                {articuloSeleccionado?.fuente}
              </Text>
            </ScrollView>

            <TouchableOpacity 
              style={styles.btnCerrarModal} 
              onPress={() => setArticuloSeleccionado(null)}
            >
              <Text style={styles.btnCerrarTexto}>Cerrar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* NAVEGACIÓN INFERIOR (BOTTOM NAV) */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={irADiario} style={styles.navBtn}>
            <Text style={{ fontSize: 24 }}>📓</Text>
          </TouchableOpacity>

          {/* Icono Activo Central */}
          <View style={styles.navBtnActivo}>
            <Text style={{ fontSize: 26 }}>📚</Text>
          </View>

          <TouchableOpacity onPress={irACalendario} style={styles.navBtn}>
            <Text style={{ fontSize: 24 }}>🧮</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={irAHome} style={styles.navBtn}>
            <Text style={{ fontSize: 24 }}>🏠</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F8' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingTop: 50, 
    paddingHorizontal: 25, 
    paddingBottom: 10 
  },
  btnAtras: { 
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    backgroundColor: '#F9A8CB', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 15
  },
  btnAtrasTexto: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  tituloHeader: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#F9A8CB', 
    flex: 1, 
    textAlign: 'center',
    marginRight: 45
  },
  scrollArea: { paddingHorizontal: 25, paddingBottom: 110 },
  
  // Banner Rosa a Azul
  bannerGuia: { 
    backgroundColor: '#CDE5F7', 
    borderRadius: 20, 
    paddingVertical: 20, 
    alignItems: 'center', 
    marginBottom: 20 
  },
  bannerTitulo: { fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 5 },
  bannerSubtitulo: { fontSize: 16, color: 'white', fontWeight: '500' },

  // Tarjetas de Artículos
  cardArticulo: { 
    backgroundColor: '#BDE2F4', 
    borderRadius: 20, 
    padding: 15, 
    flexDirection: 'row', 
    marginBottom: 15, 
    alignItems: 'center' 
  },
  miniaturaContainer: { 
    width: 80, 
    height: 80, 
    backgroundColor: '#EAEAEA', 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  textosArticulo: { flex: 1 },
  tituloArticulo: { fontSize: 16, fontWeight: 'bold', color: '#1B2A4E', marginBottom: 5 },
  sinopsisArticulo: { fontSize: 13, color: '#2C3E50', lineHeight: 18 },

  // Pop-up / Modal
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 25 
  },
  modalContent: { 
    width: '100%', 
    backgroundColor: 'white', 
    borderRadius: 25, 
    padding: 25, 
    maxHeight: '75%' 
  },
  headerModal: { alignItems: 'center', marginBottom: 15 },
  modalTitulo: { fontSize: 20, fontWeight: 'bold', color: '#1B2A4E', textAlign: 'center', marginTop: 10 },
  modalBody: { marginVertical: 10 },
  modalTextoContenido: { fontSize: 15, color: '#333', lineHeight: 22, marginBottom: 20 },
  modalFuente: { fontSize: 12, color: '#777', fontStyle: 'italic', textAlign: 'right', marginBottom: 10 },
  btnCerrarModal: { 
    backgroundColor: '#F9A8CB', 
    borderRadius: 20, 
    paddingVertical: 12, 
    alignItems: 'center', 
    marginTop: 10 
  },
  btnCerrarTexto: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  // Bottom Nav Estilizado
  bottomNavContainer: { 
    position: 'absolute', 
    bottom: 25, 
    left: 20, 
    right: 20, 
    alignItems: 'center' 
  },
  bottomNav: { 
    backgroundColor: '#1B2A4E', 
    borderRadius: 35, 
    height: 65, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    width: '100%',
    paddingHorizontal: 10
  },
  navBtn: { padding: 10 },
  navBtnActivo: { 
    backgroundColor: '#111D38', 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#F9A8CB'
  }
});