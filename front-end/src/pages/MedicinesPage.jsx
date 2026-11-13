import { useState, useEffect } from 'react';
import HeaderIn from "../components/HeaderIn";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import Modal from "../components/Modal";
import Medicines from '../components/Medicines/Medicines';
import MedicinesAdd from '../components/Medicines/MedicinesAdd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MedicinesPage = () => {

    //Carrega os registros de peso do BD
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const recoverRecords = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/medicine', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                console.log('Registros de medicamento: ', response.data)
                setRecords(response.data.listMedicine || []);
            } catch (error) {
                console.error('Erro ao buscar medicamentos:', error)
                setRecords([])
            }
        }
        recoverRecords();
    }, [])

    //Configura o modal para adicionar registros
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addRecord = (updatedRecord) => {
        setRecords(updatedRecord);
        closeModal();
    };

    const navigate = useNavigate();

    return (
        <>
            <div className="page">
                <div><HeaderIn /></div>
                <div className="userContent">
                    <div>
                        <Menu />
                    </div>
                    <div className="pageContent">
                        <h1>Medicamentos</h1>
                        <div className="pageGrid">
                            <div>
                                <Medicines records={records} setRecords={setRecords} />
                            </div>
                            <div className="sendButton">
                                <button className="buttonPurple" onClick={openModal}>Novo registro</button>
                                <button className="buttonPurple" onClick={() => {
                                    navigate('/relatory', { state: { items: records } })}}>
                                    Gerar Relatório
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <MedicinesAdd addRecord={addRecord} records={records} />
                </Modal>
                <div><Footer /></div>
            </div>
        </>
    );
};

export default MedicinesPage;