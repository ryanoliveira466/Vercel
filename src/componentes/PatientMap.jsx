// Importa componentes do react-leaflet, que é uma biblioteca para mostrar mapas usando o Leaflet no React
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Importa o CSS do Leaflet necessário para exibir o mapa corretamente
import 'leaflet/dist/leaflet.css';

// Importa o Leaflet puro para configurar os ícones
import L from 'leaflet';

// Importa o CSS personalizado para este componente (caso exista)
import '../componentes/PatientMap.css';

// Corrige o problema com os ícones padrão do Leaflet (sem isso, os marcadores não aparecem)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png', // Ícone para telas retina
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',         // Ícone padrão
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'      // Sombra do marcador
});

// Componente principal que recebe uma lista de pacientes como propriedade
export default function PatientMap({ patients }) {
  // Define a posição central inicial do mapa
  // Se houver pacientes, centraliza no primeiro paciente; se não, centraliza em Brasília
  const center = patients.length > 0 
    ? [patients[0].lat, patients[0].lng]  // Coordenadas do primeiro paciente
    : [-15.7801, -47.9292];              // Coordenadas de Brasília (padrão)

  return (
    // Container do mapa com altura e largura definidas
    <div style={{
      height: '800px',
      width: '80vw',
      margin: '0 auto' // Centraliza o mapa na página
    }}>
      
      {/* Componente principal do mapa */}
      <MapContainer 
        center={center} // Posição inicial do mapa
        zoom={5}        // Nível de zoom inicial (5 = visão ampla)
        style={{ height: '100%', width: '100%' }} // Tamanho do mapa
      >

        {/* Camada de fundo do mapa, usando OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Para cada paciente, coloca um marcador no mapa */}
        {patients.map(patient => (
          <Marker 
            key={patient.id || Math.random()} // Chave única (usa o id, ou gera um aleatório)
            position={[patient.lat, patient.lng]} // Posição do marcador
          >
            {/* Janela que aparece quando o usuário clica no marcador */}
            <Popup>
              <strong>{patient.name}</strong><br />
              {/* Mostra o endereço se estiver disponível */}
              {patient.address && <span>Endereço: {patient.address}<br /></span>}
              Idade: {patient.age}<br />
              Sintomas: {patient.symptoms}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}