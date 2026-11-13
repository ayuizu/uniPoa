import axios from 'axios';
import classes from './WeightCheck.module.css';

//Module para editar registro de peso
export const WeightDelete = ({ currentRecord, deleteRecord, onClose }) => {

    const handleDelete = async () => {   
        //Deleta registro     
        try{
            const response = await axios.delete(`http://localhost:8080/user/weight-check/${currentRecord.id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log(`Registro de peso de id ${currentRecord.id} excluído: `, response.data)
        } catch(error){
            console.error('Erro excluir registros de peso: ', error)
        }
        //Atualiza registros
        try{
            const updatedResponse = await axios.get(`http://localhost:8080/user/weight-check`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log('Registros atualizados', updatedResponse.data)
            // Chama a função `deleteRecord` para atualizar os registros na UI
            deleteRecord(updatedResponse.data.weightCheckList);
        } catch(error){
            console.error('Erro atualizar registros: ', error)
        }
    }
        
    return (
      <div className={classes.deleteContainer}>
        <h2 className={classes.deleteTitle}>Excluir registro de peso</h2>
        <p className={classes.deleteMsg}>Deseja continuar e remover o registro?</p>
        <div className={classes.deleteButtons}>
            <button className={classes.submitButton} type="submit" onClick={()=>handleDelete()}>Sim</button>
            <button className={classes.submitButton} type="close" onClick={onClose}>Voltar</button>
        </div>
      </div>
    );
  };
  
export default WeightDelete;  