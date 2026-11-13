//Problemas: ao salvar edição, modal não fecha sozinho e página não atualiza sozinha.
import { useState } from 'react';
import Modal from '../Modal';
import Dialog from '../Dialog';
import BloodPressureEdit from './BloodPressureEdit';
import BloodPressureDelete from './BloodPressureDelete';
import classes from './BloodPressure.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { formatValue } from '../formatter';

//Lista de registros
const BloodPressure = ({ records, setRecords }) => {

  const [currentRecord, setCurrentRecord] = useState(null);

  //Configura Modal para editar registros
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (record) => {
    setCurrentRecord(record);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setCurrentRecord("");
    setIsModalOpen(false);
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
  }

  const handleDelete = (updatedRecords) => {
    closeDialog();
    setRecords(updatedRecords);
  }

  return (
    <div className={classes.records}>

      {(!records || records.length === 0) ? (
        <p className={classes.noRecordsMessage}>Nenhum registro encontrado</p>
      ) : (records.map((record) => (
        <div key={record.id} className={classes.recordItem}>
          <div className={classes.recordTitle}>
            <div><p>Pressão Arterial #{record.id}</p></div>
            <div className={classes.editIcon}><button className={classes.recordButton} onClick={() => openModal(record)}><FontAwesomeIcon icon={faPenToSquare} /></button></div>
            <div className={classes.excludeIcon}> <button className={classes.recordButton} onClick={() => openDialog(record)}><FontAwesomeIcon icon={faXmark} /></button></div>
          </div>
          <div className={classes.recordDetails}>
            <div className={classes.recordDetailsLeft}>
              <p><strong>Pressão sistólica:</strong> {record.systolicPressure}</p>
              <p><strong>Pressão diastólica:</strong> {record.diastolicPressure}</p>
            </div>
            <div className={classes.recordDetailsRight}>
              <p><strong>Batimentos cardíacos:</strong> {record.heartRate} bpm</p>
              <p><strong>Data:</strong> {formatValue('checkTime', record.checkTime)}</p>
            </div>
          </div>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {currentRecord && <BloodPressureEdit currentRecord={currentRecord} editRecord={handleSave} />}
          </Modal>

          <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
            {currentRecord && <BloodPressureDelete currentRecord={currentRecord} deleteRecord={handleDelete} onClose={closeDialog} />}
          </Dialog>
        </div>
      ))
      )
      }
    </div>
  );
};

export default BloodPressure;


