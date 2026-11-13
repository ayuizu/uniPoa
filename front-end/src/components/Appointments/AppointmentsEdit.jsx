import { React, useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Appointments.module.css';

//Module para editar registro
export const AppointmentsEdit = ({ currentRecord, editRecord }) => {

    const [formData, setFormData] = useState({
        name:'',
        doctorsName:'',
        description:'',
        date: '',
        address: '',
        reminders:'', 
    });

    //Carregar dados do record para passar para o formulário
    useEffect(()=>{
        const recoverRecord = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/user/appointment/${currentRecord.id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                console.log(`Registro de consulta de id ${currentRecord.id}: `, response.data)
                setFormData(response.data);
            } catch(error){
                console.error('Erro ao buscar registros de consulta:', error)
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
          const response = await axios.put(`http://localhost:8080/user/appointment/${currentRecord.id}`, newData, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          })
          console.log('Registro de consulta alterado: ', response.data)
      } catch(error){
          console.error('Erro ao alterar registro de consulta:', error)
      }
      //Atualiza registros
      try{
      const updatedResponse = await axios.get(`http://localhost:8080/user/appointment`,{
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      })
      console.log('Registros atualizados', updatedResponse.data)
        // Chama a função `editRecord` para atualizar os registros na UI
        editRecord(updatedResponse.data.listAppointments)
      } catch(error){
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
        <h2 className={classes.title}>Editar dados da consulta</h2>
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
  
          <button type="submit" className={classes.submitButton}>Salvar</button>
        </form>
      </div>
    );
  };
  
export default AppointmentsEdit;  