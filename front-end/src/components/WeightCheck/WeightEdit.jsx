import { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './WeightCheck.module.css';

//Module para editar registro de peso
export const WeightEdit = ({ currentRecord, editRecord }) => {

    const [formData, setFormData] = useState({
    weight: "",
    checkDate: ""
    });

    //Carregar dados do record para passar para o formulário
    useEffect(()=>{
        const recoverRecord = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/user/weight-check/${currentRecord.id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                console.log(`Registro de peso de id ${currentRecord.id}: `, response.data)
                setFormData({
                  weight: response.data.weight || "",
                  checkDate: response.data.checkDate || ""
              });
            } catch(error){
                console.error('Erro ao buscar registros de peso:', error)
                setFormData({
                  weight: "",
                  checkDate: ""
              });
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
          const response = await axios.put(`http://localhost:8080/user/weight-check/${currentRecord.id}`, newData, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          })
          console.log('Registro de peso alterado: ', response)
      } catch(error){
          console.error('Erro ao alterar registro peso:', error)
      }
      //Atualiza registros
      try{
        const updatedResponse = await axios.get(`http://localhost:8080/user/weight-check`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        console.log('Registros atualizados', updatedResponse.data)
        // Chama a função `editRecord` para atualizar os registros na UI
        editRecord(updatedResponse.data.weightCheckList);
      } catch(error){
          console.error('Erro atualizar registros: ', error)
      }
        setFormData({
            weight: '',
            checkDate: '',
          });
    };
    
    return (
      <div className={classes.formContainer}>
        <h2 className={classes.title}>Editar registro de peso</h2>
        <form onSubmit={handleSubmit}>
          <div className={classes.formGroup}>
            <label>Peso (kg)</label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className={classes.formGroup}>
            <label>Data:*</label>
            <input
              type="datetime-local"
              id="dacheckDatete"
              name="checkDate"
              value={formData.checkDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={classes.submitButton}>Salvar</button>
        </form>
      </div>
    );
  };
  
export default WeightEdit;  