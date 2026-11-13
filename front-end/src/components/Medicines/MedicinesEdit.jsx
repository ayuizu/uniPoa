import { React, useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Medicines.module.css';

//Module para editar medicamento
const MedicinesEdit = ({ currentRecord, editRecord }) => {
  const [formData, setFormData] = useState({
    name: '',
    description:'',
    frequencyValue: '',
    frequencyUnit: '',
    doseValue: '',
    doseUnit: '',
    startDate: '',
    endDate: '',
    });

    //Carregar dados do record para passar para o formulário
    useEffect(()=>{
      const recoverRecord = async () => {
          try{
              const response = await axios.get(`http://localhost:8080/user/medicine/${currentRecord.id}`,{
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
              })
              console.log('Registro de medicamento de id {id}: ', response.data)
              setFormData(response.data);
          } catch(error){
              console.error('Erro ao buscar registros de medicamento:', error)
              setFormData({})
          }
      }
      if (currentRecord?.id) {
          recoverRecord();
        }
    },[])
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value || "" });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      const newData = {... formData};
      //Edita registro
      try{
          const response = await axios.put(`http://localhost:8080/user/medicine/${currentRecord.id}`, newData, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          })
          console.log('Medicamento alterado: ', response)
      } catch(error){
          console.error('Erro ao alterar medicamento:', error)
      }
      //Atualiza registro
      try{
        const updatedResponse = await axios.get(`http://localhost:8080/user/medicine`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        console.log('Registros atualizados', updatedResponse.data)
        // Chama a função `editRecord` para atualizar os registros na UI
        editRecord(updatedResponse.data.listMedicine);
    } catch(error){
        console.error('Erro atualizar registros: ', error)
    }
    setFormData({
      name: '',
      description:'',
      frequencyValue: '',
      frequencyUnit: '',
      doseValue: '',
      doseUnit: '',
      startDate: '',
      endDate: '',
      });
    };
      
    return (
      <div className={classes.formContainer}>
        <h2 className={classes.title}>Editar medicamento</h2>
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
            <label>Frequência</label>
            <div className={classes.formLine}>
              <input
                type="text"
                id="frequencyValue"
                name="frequencyValue"
                value={formData.frequencyValue}
                onChange={handleChange}
              />
              <select
                id="frequencyUnit"
                name="frequencyUnit"
                value={formData.frequencyUnit}
                onChange={handleChange}
              >
              <option value="">Intervalo</option>
              <option value="MINUTES">Minuto(s)</option>
              <option value="HOURS">Horas(s)</option>
              <option value="DAYS">Dia(s)</option>
              <option value="WEEKS">Semana(s)</option>
              <option value="MONTHS">Mes(es)</option>
              <option value="SPORADICALLY">Esporádico</option>
              </select>
            </div>
          </div>
          <div className={classes.formGroup}>
            <label>Intensidade*</label>
            <div className={classes.formLine}>
              <input
                type="text"
                id="doseValue"
                name="doseValue"
                value={formData.doseValue}
                onChange={handleChange}
              />
              <select
                id="doseUnit"
                name="doseUnit"
                value={formData.doseUnit}
                onChange={handleChange}
              >
              <option value="">Unidade</option>
              <option value="MCG">mcg</option>
              <option value="MG">mg</option>
              <option value="G">g</option>
              <option value="ML">ml</option>
              <option value="UI">UI</option>
              <option value="PCT">%</option>
              </select>
            </div>
          </div>
  
          <div className={classes.formGroup}>
            <label>Data de Início*</label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label>Data de Fim</label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
  
          <button type="submit" className={classes.submitButton}>Salvar alterações</button>
        </form>
      </div>
    );
  };
  
  export default MedicinesEdit;