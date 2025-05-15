import { useState } from 'react' // Importa o hook useState do React para gerenciar o estado do componente
import PatientForm from '../componentes/PatienteForm' // Importa o componente PatientForm para adicionar novos pacientes
import PatientMap from '../componentes/PatientMap' // Importa o componente PatientMap para exibir os pacientes no mapa

import '../pages/DashboardPage.css' // Importa o arquivo de estilo CSS para a página

// Definição do componente DashboardPage
export default function DashboardPage() {
  // Declaração do estado 'patients' para armazenar a lista de pacientes. Inicializa com um paciente.
  const [patients, setPatients] = useState([
    { id: 1, name: "João", symptoms: "Febre", lat: -29.7600, lng: -51.1469 }
  ])

  // Função para adicionar um novo paciente ao estado 'patients'
  const handleAddPatient = (patient) => {
    // A função adiciona o novo paciente à lista, atribuindo um ID único (incremental) ao paciente.
    setPatients([...patients, { ...patient, id: patients.length + 1 }])
  }

  // Renderiza o componente
  return (
    <div style={{ padding: '2rem' }}> {/* Container com padding */}
      <h1>SynHealth Monitoramento da 232N </h1> {/* Título da página */}
      {/* Componente PatientForm recebe a função handleAddPatient como prop para adicionar novos pacientes */}
      <PatientForm onSubmit={handleAddPatient} />
      
      <div style={{ marginTop: '2rem' }}> {/* Espaço entre o formulário e o mapa */}
        {/* Componente PatientMap recebe a lista de pacientes como prop e exibe no mapa */}
        <PatientMap patients={patients} />

        
      </div>
    </div>
  )
}