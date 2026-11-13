
import {React, useState} from 'react';
import axios from 'axios';

import classes from './Appointments.module.css';


//Module para adicionar registro de peso
export const AppointmentsAdd = ({ addRecord }) => {
    const [formData, setFormData] = useState({
        name:'',
        doctorsName:'',
        description:'',
        date: '',
        address: '',
        reminders:'', 
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      const newRecord = {... formData};
      //Adiciona registro
      try{
          const response = await axios.post('http://localhost:8080/user/appointment', newRecord, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          })
          console.log('Consulta registrada: ', response)
      } catch(error){
          console.error('Erro ao registrar consulta:', error)
      }
      //Atualiza registros
      try{
        const updatedResponse = await axios.get(`http://localhost:8080/user/appointment`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        console.log('Registros atualizados', updatedResponse.data)
         // Chama a função `addRecord` para atualizar os registros na UI
         addRecord(updatedResponse.data.listAppointments)
      }catch(error){
          console.error('Erro atualizar registros: ', error)
      }
      setFormData({
        name:'',
        doctorsName:'',
        description:'',
        date: '',
        address: '',
        reminders:'', 
      });
    };
    
    return (
      <div className={classes.formContainer}>
        <h2 className={classes.title}>Adicionar dados da consulta</h2>
        <form onSubmit={handleSubmit}>
          <div className={classes.formGroup}>
            <label>Especialidade:*</label>
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
            <label>Nome do(a) médico(a):</label>
            <input
              type="text"
              id="doctorsName"
              name="doctorsName"
              value={formData.doctorsName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label>Descrição:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label>Endereço:*</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className={classes.formGroup}>
            <label>Data:*</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        
  
          <button type="submit" className={classes.submitButton}>Registrar</button>
        </form>
      </div>
    );
  };
  
export default AppointmentsAdd;  