import axios from 'axios';
import classes from './Appointments.module.css';

//Module para editar registro
export const AppointmentsDelete = ({ currentRecord, deleteRecord, onClose}) => {
    
    const handleDelete = async () => {
        //Deleta registro
        try{
            const response = await axios.delete(`http://localhost:8080/user/appointment/${currentRecord.id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log(`Registro de consulta de id ${currentRecord.id} excluído: `, response.data)
        } catch(error){
            console.error('Erro excluir registros de consulta: ', error)
        }
        //Atualiza registros
        try{
            const updatedResponse = await axios.get(`http://localhost:8080/user/appointment`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log('Registros atualizados', updatedResponse.data)
             // Chama a função `deleteRecord` para atualizar os registros na UI
             deleteRecord(updatedResponse.data.listAppointments)
        } catch(error){
            console.error('Erro atualizar registros: ', error)
        }
    }
    
    return (
      <div className={classes.deleteContainer}>
        <h2 className={classes.deleteTitle}>Excluir registro de consulta</h2>
        <p className={classes.deleteMsg}>Deseja continuar e remover o registro?</p>
        <div className={classes.deleteButtons}>
            <button className={classes.submitButton} type="submit" onClick={()=>handleDelete()}>Sim</button>
            <button className={classes.submitButton} type="close" onClick={onClose}>Voltar</button>
        </div>
      </div>
    );
  };
  
export default AppointmentsDelete;  