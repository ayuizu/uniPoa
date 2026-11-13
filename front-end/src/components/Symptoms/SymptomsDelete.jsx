import axios from 'axios';
import classes from './Symptoms.module.css';

const SymptomsDelete = ({ currentRecord, deleteRecord, onClose }) => {

    const handleDelete = async () => {
        //Exclui registro
        try {
            const response = await axios.delete(`http://localhost:8080/user/symptom/${currentRecord.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log(`Registro de sintoma de id ${currentRecord.id} excluído: `, response.data)
        } catch (error) {
            console.error('Erro excluir registro de sintoma: ', error)
        }
        //Atualiza lista de registros
        try {
            const updatedResponse = await axios.get(`http://localhost:8080/user/symptom`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log('Atualizando registros: ', updatedResponse.data);
            // Chama a função `deleteRecord` para atualizar os registros na UI
            deleteRecord(updatedResponse.data.symptomList);
        } catch (error) {
            console.error('Erro ao atualizar registros: ', error)
        }
    }

    return (
        <div className={classes.deleteContainer}>
            <h2 className={classes.deleteTitle}>Excluir registro de sintoma</h2>
            <p className={classes.deleteMsg}>Deseja continuar e remover o registro?</p>
            <div className={classes.deleteButtons}>
                <button className={classes.submitButton} type="submit" onClick={() => handleDelete()}>Sim</button>
                <button className={classes.submitButton} type="close" onClick={onClose}>Voltar</button>
            </div>
        </div>
    );
};



export default SymptomsDelete;