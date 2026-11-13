
import {React, useState} from 'react';
import axios from 'axios';
import classes from './BloodPressure.module.css';


//Module para adicionar registro de pressão
export const BloodPressureAdd = ({ addRecord }) => {
    const [formData, setFormData] = useState({
        systolicPressure: '',
        diastolicPressure: '',
        heartRate:'',
        checkTime:'',
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
          const response = await axios.post('http://localhost:8080/user/bloodPressure', newRecord, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          })
          console.log('Medição de pressão registrada: ', response.data)
      } catch(error){
          console.error('Erro ao registrar medição de pressão:', error)
      }
      //Atualiza lista de registros
      try{
        const updatedResponse = await axios.get(`http://localhost:8080/user/bloodPressure`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        console.log('Registros atualizados', updatedResponse.data)
        // Chama a função `addRecord` para atualizar os registros na UI
        addRecord(updatedResponse.data.listBloodPressure)
      } catch(error){
          console.error('Erro atualizar registros: ', error)
      }
      setFormData({
        systolicPressure: '',
        diastolicPressure: '',
        heartRate:'',
        checkTime:'',
      });
    };
    
    return (
      <div className={classes.formContainer}>
        <h2 className={classes.title}>Adicionar medição de pressão</h2>
        <form onSubmit={handleSubmit}>
          <div className={classes.formGroup}>
            <label>Pressão sistólica (maior)</label>
            <input
              type="text"
              id="systolicPressure"
              name="systolicPressure"
              value={formData.systolicPressure}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label>Pressão diastólica (menor)</label>
            <input
              type="text"
              id="diastolicPressure"
              name="diastolicPressure"
              value={formData.diastolicPressure}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label>Batimentos cardíacos</label>
            <input
              type="text"
              id="heartRate"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className={classes.formGroup}>
            <label>Data:*</label>
            <input
              type="datetime-local"
              id="checkTime"
              name="checkTime"
              value={formData.checkTime}
              onChange={handleChange}
              required
            />
          </div>
        
  
          <button type="submit" className={classes.submitButton}>Registrar</button>
        </form>
      </div>
    );
  };
  
export default BloodPressureAdd;  