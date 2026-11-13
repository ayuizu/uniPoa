import { React, useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Symptoms.module.css';

//Module para editar registro
const SymptomsEdit = ({ currentRecord, editRecord }) =>{

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        intensity: '',
        registerDate: '',
    });
    
        //Carregar dados do record para passar para o formulário
  useEffect(()=>{
    const recoverRecord = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/user/symptom/${currentRecord.id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log(`Registro de sintoma de ${currentRecord.id}`, response.data)
            setFormData(response.data);
        } catch(error){
            console.error('Erro ao buscar registros de sintoma:', error)
            setFormData({})
        }
    }
    if (currentRecord?.id) {
        recoverRecord();
      }
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newData = {... formData};
    //Edita registro
    try{
        const response = await axios.put(`http://localhost:8080/user/symptom/${currentRecord.id}`, newData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        console.log('Registro de sintoma alterado: ', response.data)
    } catch(error){
        console.error('Erro ao alterar registro de sintoma: ', error)
    }
    //Atualiza lista de registros
    try{
      const updatedResponse = await axios.get(`http://localhost:8080/user/symptom`,{
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      })
      console.log('Atualizando registros: ', updatedResponse.data);
      // Chama a função `editRecord` para atualizar os registros na UI
      editRecord(updatedResponse.data.symptomList);
    }catch(error){
        console.error('Erro ao atualizar registros: ', error)
    }
    setFormData({
      name: '',
      description: '',
      intensity: '',
      registerDate: '',
    });
  };
  
  return (
      <div className={classes.formContainer}>
      <h2 className={classes.title}>Adicionar registro de sintoma</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label>Nome*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={classes.formGroup}>
          <label>Intensidade*</label>
          <select
            id="intensity"
            name="intensity"
            value={formData.intensity}
            onChange={handleChange}
            required
          >
            <option value="">Intensidade</option>
            <option value="BARELY_NOTICEABLE">Quase imperceptível</option>
            <option value="MILD_DISCOMFORT">Leve desconforto</option>
            <option value="MODERATE_INTENSITY">Intensidade moderada</option>
            <option value="SEVERE_PAIN">Dor severa</option>
            <option value="UNBEARABLE">Insuportável</option>
          </select>
        </div>
        <div className={classes.formGroup}>
          <label>Descrição</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className={classes.formGroup}>
          <label>Data*</label>
          <input
              type="datetime-local"
              id="registerDate"
              name="registerDate"
              value={formData.registerDate}
              onChange={handleChange}
              required
          />
          </div>
        <button type="submit" className={classes.submitButton}>Salvar</button>
      </form>
    </div>
  );
};

export default SymptomsEdit;