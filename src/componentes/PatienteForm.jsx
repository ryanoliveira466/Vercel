// Importamos o Hook useState para controlar estados no componente
import { useState } from 'react';

// Importamos o CSS para estilização do formulário
import '../componentes/PatientForm.css';

// Este é o componente de formulário de paciente
export default function PatientForm({ onSubmit }) {
  // Estado para armazenar os dados digitados no formulário
  const [form, setForm] = useState({
    name: '',       // Nome do paciente
    age: '',        // Idade
    symptoms: '',   // Sintomas
    address: ''     // Endereço completo (em vez de latitude/longitude direto)
  });

  // Estado para controlar o processo de geocodificação
  const [geocoding, setGeocoding] = useState({
    loading: false,  // Indica se está carregando/convertendo o endereço
    error: null      // Guarda uma mensagem de erro (se houver)
  });

  // Função chamada sempre que o usuário digita algo em um campo do formulário
  const handleChange = (e) => {
    setForm({ 
      ...form, // copia os dados atuais do formulário
      [e.target.name]: e.target.value // atualiza apenas o campo que mudou
    });
  };

  // Função para converter (geocodificar) um endereço em latitude e longitude
  const geocodeAddress = async (address) => {
    setGeocoding({ loading: true, error: null }); // Começa o carregamento

    try {
      // Faz uma requisição para a API de geocodificação (Nominatim)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );

      // Converte a resposta para JSON
      const data = await response.json();

      // Se encontrar um resultado, retorna as coordenadas
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat), // converte latitude para número
          lng: parseFloat(data[0].lon)  // converte longitude para número
        };
      }

      // Se não encontrou nenhum endereço
      throw new Error('Endereço não encontrado');
    } catch (err) {
      // Em caso de erro, atualiza o estado e mostra a mensagem de erro
      setGeocoding({ loading: false, error: 'Erro ao geocodificar endereço' });
      console.error('Erro na geocodificação:', err);
      return null;
    }
  };

  // Função chamada quando o formulário é enviado
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    // Verifica se o campo de endereço está vazio
    if (!form.address) {
      setGeocoding({ loading: false, error: 'Por favor, insira um endereço' });
      return;
    }

    // Tenta geocodificar o endereço
    const coords = await geocodeAddress(form.address);

    // Se conseguiu obter coordenadas
    if (coords) {
      // Chama a função onSubmit recebida como prop, passando os dados do paciente + coordenadas
      onSubmit({ 
        ...form,
        ...coords // adiciona lat e lng ao objeto do formulário
      });

      // Limpa os campos do formulário após o envio
      setForm({ name: '', age: '', symptoms: '', address: '' });
      setGeocoding({ loading: false, error: null });
    }
  };

  // JSX (HTML + JavaScript) que define a interface do formulário
  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
      
      {/* Campo de nome */}
      <input
        name="name"
        placeholder="Nome"
        value={form.name}
        onChange={handleChange}
        required
      />

      {/* Campo de idade (número) */}
      <input
        name="age"
        type="number"
        placeholder="Idade"
        value={form.age}
        onChange={handleChange}
        required
      />

      {/* Campo de sintomas */}
      <textarea
        name="symptoms"
        placeholder="Sintomas"
        value={form.symptoms}
        onChange={handleChange}
        required
      />

      {/* Campo de endereço completo */}
      <input
        name="address"
        placeholder="Endereço completo (ex: Rua Exemplo, 123, São Paulo, SP)"
        value={form.address}
        onChange={handleChange}
        required
      />

      {/* Exibe uma mensagem de erro, se houver */}
      {geocoding.error && (
        <div style={{ color: 'red', fontSize: '0.8rem' }}>
          {geocoding.error}
        </div>
      )}

      {/* Botão de envio do formulário */}
      <button type="submit" disabled={geocoding.loading}>
        {geocoding.loading ? 'Convertendo endereço...' : 'Cadastrar Paciente'}
      </button>

      {/* Link para o site do SUS com um botão separado */}
      <a href="https://www.gov.br/saude/pt-br/sus" target="_blank" rel="noopener noreferrer">
        <button type="button">Site do SUS</button>
      </a>
    </form>
  );
}