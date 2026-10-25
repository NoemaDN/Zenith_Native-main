import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  LayoutAnimation, 
  Platform, 
  UIManager 
} from 'react-native';

// Habilitar animaciones para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function GuiaBienvenida({ terminarGuia }) {
  // Estado para controlar qué sección está abierta
  const [seccionAbierta, setSeccionAbierta] = useState(null);

  const toggleSeccion = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSeccionAbierta(seccionAbierta === id ? null : id);
  };

  // Contenido informativo validado médicamente con sus respectivas fuentes citadas
  const seccionesInfo = [
    {
      id: 'actuan',
      titulo: '¿Cómo actúan?',
      contenido: 'Impiden la ovulación (la liberación de un óvulo por parte de los ovarios). Además, espesan el moco del cuello uterino para dificultar el paso de los espermatozoides y adelgazan el revestimiento del útero para evitar la implantación.',
      fuente: 'Fuente: Organización Mundial de la Salud (OMS) / Mayo Clinic.'
    },
    {
      id: 'efectividad',
      titulo: 'Efectividad',
      contenido: 'Con un uso correcto y constante (tomando la pastilla todos los días a la misma hora), su efectividad es mayor al 99%. Con un uso típico o irregular (olvidos habituales), la efectividad disminuye a un 91% aproximadamente.',
      fuente: 'Fuente: Planned Parenthood / CDC.'
    },
    {
      id: 'reacciones',
      titulo: 'Reacciones secundarias',
      contenido: 'Pueden presentarse náuseas leves, dolor de cabeza, sensibilidad en los pechos, cambios de humor o sangrado intermenstrual (manchado) durante los primeros 3 meses de uso. Suelen desaparecer de forma gradual conforme el cuerpo se adapta.',
      fuente: 'Fuente: Instituto Mexicano del Seguro Social (IMSS).'
    },
    {
      id: 'malestares',
      titulo: '¿Qué hacer en caso de malestares?',
      contenido: 'Se recomienda tomar la pastilla junto con los alimentos o antes de dormir para reducir las náuseas. Si los síntomas persisten o se presentan dolores severos de cabeza, dolor en las piernas o visión borrosa, debes acudir a valoración médica inmediata.',
      fuente: 'Fuente: Secretaría de Salud / ACOG.'
    },
    {
      id: 'fallas',
      titulo: 'Causas de falla',
      contenido: 'Omitir o retrasar la toma diaria, presentar vómitos o diarrea severa dentro de las 3 o 4 horas posteriores a la toma, o consumir ciertos medicamentos (como antibióticos específicos o anticonvulsivos) que interfieren con su absorción.',
      fuente: 'Fuente: Organización Mundial de la Salud (OMS).'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Marca Superior */}
        <Text style={styles.brandTitle}>Zenith</Text>

        {/* Tarjeta Blanca de Introducción */}
        <View style={styles.cardBienvenida}>
          <Text style={styles.tituloBienvenida}>Bienvenida</Text>
          
          <Text style={styles.textoParrafo}>
            Los anticonceptivos hormonales orales o pastillas anticonceptivas, son un método seguro y efectivo para evitar temporalmente el embarazo, contienen pequeñas cantidades de hormonas femeninas parecidas a las que produce el organismo de la mujer.
          </Text>

          <Text style={styles.textoParrafo}>
            Los anticonceptivos hormonales orales, contienen 21 pastillas anticonceptivas, que se toman diariamente a la misma hora.
          </Text>

          <Text style={styles.textoParrafo}>
            La primera pastilla se toma el primer día de la menstruación, al terminar de tomar las pastillas del paquete, se deja un período de 7 días sin tomar pastillas, durante los cuales se presenta la menstruación.
          </Text>

          <Text style={styles.textoParrafo}>
            Recuerda iniciar la toma de pastillas de un paquete nuevo al siguiente día de los 7 días de descanso.
          </Text>
        </View>

        {/* Secciones Desplegables */}
        {seccionesInfo.map((sec) => {
          const estaAbierta = seccionAbierta === sec.id;
          return (
            <View key={sec.id} style={styles.desplegableWrapper}>
              <TouchableOpacity 
                style={styles.btnDesplegable} 
                onPress={() => toggleSeccion(sec.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.btnTexto}>{sec.titulo}</Text>
                <Text style={styles.flecha}>{estaAbierta ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {estaAbierta && (
                <View style={styles.contenidoDesplegado}>
                  <Text style={styles.textoContenido}>{sec.contenido}</Text>
                  <Text style={styles.textoFuente}>{sec.fuente}</Text>
                </View>
              )}
            </View>
          );
        })}

        {/* Botón Omitir en la parte inferior */}
        <TouchableOpacity style={styles.btnOmitir} onPress={terminarGuia}>
          <Text style={styles.btnOmitirTexto}>Omitir</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF0F5' // Tono rosa pastel suave de fondo
  },
  scrollContent: { 
    paddingHorizontal: 25, 
    paddingTop: 50, 
    paddingBottom: 40 
  },
  brandTitle: { 
    fontSize: 42, 
    color: '#1B2A4E', 
    textAlign: 'center', 
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-thin'
  },
  cardBienvenida: { 
    backgroundColor: 'white', 
    borderRadius: 30, 
    padding: 25, 
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  tituloBienvenida: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#1B2A4E', 
    marginBottom: 15 
  },
  textoParrafo: { 
    fontSize: 14, 
    color: '#2C3E50', 
    lineHeight: 20, 
    marginBottom: 12 
  },
  desplegableWrapper: { 
    marginBottom: 15 
  },
  btnDesplegable: { 
    backgroundColor: '#F9A8CB', 
    borderRadius: 25, 
    height: 55, 
    paddingHorizontal: 25, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  btnTexto: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  flecha: { 
    color: 'white', 
    fontSize: 14 
  },
  contenidoDesplegado: { 
    backgroundColor: '#FFF', 
    marginTop: 5, 
    borderRadius: 20, 
    padding: 20, 
    borderWidth: 1, 
    borderColor: '#F9A8CB' 
  },
  textoContenido: { 
    fontSize: 14, 
    color: '#333', 
    lineHeight: 20, 
    marginBottom: 10 
  },
  textoFuente: { 
    fontSize: 12, 
    color: '#777', 
    fontStyle: 'italic', 
    textAlign: 'right' 
  },
  btnOmitir: { 
    alignSelf: 'flex-end', 
    marginTop: 20, 
    padding: 10 
  },
  btnOmitirTexto: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1B2A4E' 
  }
});