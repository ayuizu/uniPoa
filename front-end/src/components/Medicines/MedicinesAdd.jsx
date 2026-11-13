import { useState } from 'react';
import axios from 'axios';
import classes from './Medicines.module.css';

//Module para adicionar medicamento
const MedicinesAdd = ({ addRecord }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequencyValue: '',
    frequencyUnit: '',
    doseValue: '',
    doseUnit: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecord = { ...formData };
    //Adicionar registro
    try {
      const response = await axios.post('http://localhost:8080/user/medicine', newRecord, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log('Medicamento registrado: ', response.data)
    } catch (error) {
      console.error('Erro ao registrar medicamento:', error)
    }
    //Atualiza registro
    try {
      const updatedResponse = await axios.get(`http://localhost:8080/user/medicine`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log('Registros atualizados', updatedResponse.data)
      // Chama a função `addRecord` para atualizar os registros na UI
      addRecord(updatedResponse.data.listMedicine);
    } catch (error) {
      console.error('Erro atualizar registros: ', error)
    }
    setFormData({
      name: '',
      description: '',
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
      <h2 className={classes.title}>Adicionar medicamento</h2>
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

        <button type="submit" className={classes.submitButton}>Registrar</button>
      </form>
    </div>
  );
};

export default MedicinesAdd;
