import { useState } from 'react';
import classes from './Vaccines.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal';
import Dialog from '../Dialog';
import VaccinesEdit from './VaccinesEdit';
import VaccinesDelete from './VaccinesDelete';
import { formatValue } from '../formatter';

//Lista de medicamentos
const Vaccines = ({ records, setRecords }) => {

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

  //Atualizar página e fechar modal ao salvar edição
  const handleSave = (updatedRecords) => {
    closeModal();
    setRecords(updatedRecords);
  }

  //Atualizar página e fechar dialog ao excluir
  const handleDelete = (records) => {
    closeDialog();
    setRecords(records);
  }

  return (
    <div className={classes.records}>
      {(!records || records.length === 0) ? (
        <p className={classes.noRecordsMessage}>Nenhuma vacina encontrado</p>
      ) : (
        records.map((record) => (
          <div key={record.id} className={classes.recordItem}>
            <div className={classes.recordTitle}>
              <div><p>{record.name}</p></div>
              <div className={classes.editIcon}>
                <button className={classes.recordButton} onClick={() => openModal(record)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </div>
              <div className={classes.excludeIcon}>
                <button className={classes.recordButton} onClick={() => openDialog(record)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
            <div className={classes.recordDetails}>
              <div className={classes.recordDetailsLeft}>
                <p><strong>Descrição:</strong> {record.description ? <span>{record.description}</span> : "-"}</p>
                <strong>
                  <p>Frequência: {record.frequencyValue ? <span>a cada {record.frequencyValue} {formatValue('frequencyUnit', record.frequencyUnit)}</span> : "-"}</p>
                </strong>
              </div>
              <div className={classes.recordDetailsRight}>
                <p><strong>Data aplicação:</strong> {record.applicationDate}</p>
              </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              {currentRecord && <VaccinesEdit currentRecord={currentRecord} editRecord={handleSave} />}
            </Modal>
            <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
              {currentRecord && <VaccinesDelete currentRecord={currentRecord} deleteRecord={handleDelete} onClose={closeDialog} />}
            </Dialog>
          </div>
        ))
      )}
    </div>
  );
};


export default Vaccines;