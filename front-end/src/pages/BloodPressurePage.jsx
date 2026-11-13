import { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderIn from "../components/HeaderIn";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import Modal from "../components/Modal";
import BloodPressure from '../components/BloodPressure/BloodPressure';
import BloodPressureAdd from '../components/BloodPressure/BloodPressureAdd';
import { useNavigate } from 'react-router-dom';


const BloodPressurePage = () => {

    //Carrega os registros do BD
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const recoverRecords = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/bloodPressure', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                console.log('Registros de pressão: ', response.data)
                setRecords(response.data.listBloodPressure || []);
            } catch (error) {
                console.error('Erro ao buscar registros de pressão:', error)
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
                        <h1>Pressão Arterial</h1>
                        <div className="pageGrid">
                            <div>
                                {/* Carrega o componente BloodPressure (que lista registros) e passa records (registros do BD) para ele */}
                                <BloodPressure records={records} setRecords={setRecords} />
                            </div>
                            <div className="sendButton">
                                {/* Botão para abrir o Modal para adicionar um novo registro */}
                                <button className="buttonPurple" onClick={openModal}>Novo registro</button>
                                <button className="buttonPurple" onClick={() => navigate('/relatory', { state: { items: records, type: "Pressão" } })}>
                                    Gerar Relatório
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Modal irá abrir com o componente BloodPressureAdd ao clicar no botão. Passamos addRecord e records para ele*/}
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <BloodPressureAdd addRecord={addRecord} records={records} />
                </Modal>
                <div><Footer /></div>
            </div>
        </>
    );
};

export default BloodPressurePage;