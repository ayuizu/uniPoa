import { useState } from 'react';
import Modal from '../Modal';
import Dialog from '../Dialog';
import SymptomsEdit from './SymtomsEdit';
import SymptomsDelete from './SymptomsDelete';
import classes from './Symptoms.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { formatValue } from '../formatter';


const Symptoms = ({ records, setRecords }) => {
  const [currentRecord, setCurrentRecord] = useState(null);

  //Configura Modal para editar registros
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (record) => {
    setCurrentRecord(record);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  }

  //Configura Dialog para deletar registros
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = (record) => {
    setCurrentRecord(record);
    setIsDialogOpen(true);
  }
  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentRecord(null);
  }

  const handleSave = (updatedRecords) => {
    closeModal();
    setRecords(updatedRecords);
  };

  const handleDelete = (updatedRecords) => {
    closeDialog();
    setRecords(updatedRecords);
  }

  return (
    <div className={classes.records}>
      {(!records || records.length === 0) ? (
        <p className={classes.noRecordsMessage}>Nenhum registro encontrado</p>
      ) : (
        records.map((record) => (
          <div key={record.id} className={classes.recordItem}>
            <div className={classes.recordTitle}>
              <div><p>Sintoma #{record.id}</p></div>
              <div className={classes.editIcon}><button className={classes.recordButton} onClick={() => openModal(record)}><FontAwesomeIcon icon={faPenToSquare} /></button></div>
              <div className={classes.excludeIcon}> <button className={classes.recordButton} onClick={() => openDialog(record)}><FontAwesomeIcon icon={faXmark} /></button> </div>
            </div>
            <div className={classes.recordDetails}>
              <div className={classes.recordDetailsLeft}>
                <p><strong>Nome:</strong> {record.name}</p>
                <p><strong>Intensidade:</strong> {formatValue('intensity', record.intensity)}</p>
                <p><strong>Data:</strong> {formatValue('registerDate', record.registerDate)}</p>
              </div>
              <div className={classes.recordDetailsRight}>
                <p><strong>Descrição:</strong> {record.description}</p>
              </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              {currentRecord && <SymptomsEdit currentRecord={currentRecord} editRecord={handleSave} />}
            </Modal>

            <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
              {currentRecord && <SymptomsDelete currentRecord={currentRecord} deleteRecord={handleDelete} onClose={closeDialog} />}
            </Dialog>
          </div>
        ))
      )
      }
    </div>
  );
};



export default Symptoms;
