//Problemas: ao salvar edição, modal não fecha sozinho e página não atualiza sozinha.
import { useState } from 'react';
import Modal from '../Modal';
import Dialog from '../Dialog';
import AppointmentsEdit from './AppointmentsEdit';
import AppointmentsDelete from './AppointmentsDelete';
import classes from './Appointments.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { formatValue } from '../formatter';

//Lista de registros
const Appointments = ({ records, setRecords }) => {

  const [currentRecord, setCurrentRecord] = useState(null);

  //Configura Modal para editar registros
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (record) => {
    setCurrentRecord(record);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRecord("");
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

  const handleDelete = (uppdatedRecords) => {
    closeDialog();
    setRecords(uppdatedRecords);
  }

  return (
    <div className={classes.records}>
      {(!records || records.length === 0) ? (
        <p className={classes.noRecordsMessage}>Nenhum registro encontrado</p>
      ) : (records.map((record) => (
        <div key={record.id} className={classes.recordItem}>
          <div className={classes.recordTitle}>
            <div><p>Consulta #{record.id}</p></div>
            <div className={classes.editIcon}><button className={classes.recordButton} onClick={() => openModal(record)}><FontAwesomeIcon icon={faPenToSquare} /></button></div>
            <div className={classes.excludeIcon}> <button className={classes.recordButton} onClick={() => openDialog(record)}><FontAwesomeIcon icon={faXmark} /></button></div>
          </div>
          <div className={classes.recordDetails}>
            <div className={classes.recordDetailsLeft}>
              <p><strong>Especialidade:</strong> {record.name}</p>
              <p><strong>Nome do médico:</strong> {record.doctorsName}</p>
              <p><strong>Endereço:</strong> {record.address}</p>
            </div>
            <div className={classes.recordDetailsRight}>
              <p><strong>Data:</strong> {formatValue("date", record.date)}</p>
              <p><strong>Descrição:</strong> {record.description}</p>
            </div>
          </div>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {currentRecord && <AppointmentsEdit currentRecord={currentRecord} editRecord={handleSave} />}
          </Modal>

          <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
            {currentRecord && <AppointmentsDelete currentRecord={currentRecord} deleteRecord={handleDelete} onClose={closeDialog} />}
          </Dialog>
        </div>
      ))
      )
      }
    </div>
  );
};

export default Appointments;


