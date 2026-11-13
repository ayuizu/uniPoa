import { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './BloodPressure.module.css';

//Module para editar registro de pressão
export const BloodPressureEdit = ({ currentRecord, editRecord }) => {

    const [formData, setFormData] = useState({
        systolicPressure: '',
        diastolicPressure: '',
        heartRate:'',
        checkTime:'',
    });

    //Carregar dados do record para passar para o formulário
    useEffect(()=>{
        const recoverRecord = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/user/bloodPressure/${currentRecord.id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                console.log(`Registro de pressão de id ${currentRecord.id}: `, response.data)
                setFormData(response.data);
            } catch(error){
                console.error('Erro ao buscar registros de pressão:', error)
                setFormData({})
            }
        }
        if (currentRecord?.id) {
            recoverRecord();
          }
    },[])
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value || ""});
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      const newData = {... formData};
      //Edita registro
      try{
          const response = await axios.put(`http://localhost:8080/user/bloodPressure/${currentRecord.id}`, newData, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          })
          console.log('Registro de pressão alterado: ', response)
      } catch(error){
          console.error('Erro ao alterar registro pressão:', error)
      }
      //Atualiza lista de registros
      try{
        const updatedResponse = await axios.get(`http://localhost:8080/user/bloodPressure`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
          console.log('Registros atualizados', updatedResponse.data)
          // Chama a função `editRecord` para atualizar os registros na UI
          editRecord(updatedResponse.data.listBloodPressure)
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
          <button type="submit" className={classes.submitButton}>Salvar</button>
        </form>
      </div>
    );
  };
  
export default BloodPressureEdit;  