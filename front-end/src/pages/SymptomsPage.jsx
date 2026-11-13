import { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderIn from "../components/HeaderIn";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import Modal from "../components/Modal";
import Symptoms from '../components/Symptoms/Symptoms';
import SymptomsAdd from '../components/Symptoms/SymptomsAdd';
import { useNavigate } from 'react-router-dom';

const SymptomsPage = () => {

    //Carrega os registros de peso do BD
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const recoverRecords = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/symptom', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                console.log('Registros de sintomas ', response.data)
                setRecords(response.data.symptomList || []);
            } catch (error) {
                console.error('Erro ao buscar registros de sintomas:', error)
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
                        <h1>Sintomas</h1>
                        <div className="pageGrid">
                            <div>
                                <Symptoms records={records} setRecords={setRecords} />
                            </div>
                            <div className="sendButton">
                                <button className="buttonPurple" onClick={openModal}>Novo registro</button>
                                <button className="buttonPurple" onClick={() => navigate('/relatory', { state: { items: records } })}>
                                    Gerar Relatório
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <SymptomsAdd addRecord={addRecord} records={records} />
                </Modal>
                <div><Footer /></div>
            </div>
        </>
    );
};

export default SymptomsPage;