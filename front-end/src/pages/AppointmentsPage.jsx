import { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderIn from "../components/HeaderIn";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import Modal from "../components/Modal";
import Appointments from '../components/Appointments/Appointments';
import AppointmentsAdd from '../components/Appointments/AppointmentsAdd';
import { useNavigate } from 'react-router-dom';


const AppointmentsPage = () => {

    //Carrega os registros do BD
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const recoverRecords = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/appointment', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                console.log('Registros de consultas: ', response.data)
                setRecords(response.data.listAppointments || []);
            } catch (error) {
                console.error('Erro ao buscar registros de consultas:', error)
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
                        <h1>Consultas</h1>
                        <div className="pageGrid">
                            <div>
                                {/* Carrega o componente Appointments (que lista registros) e passa records (registros do BD) para ele */}
                                <Appointments records={records}  setRecords={setRecords} />
                            </div>
                            <div className="sendButton">
                                {/* Botão para abrir o Modal para adicionar um novo registro */}
                                <button className="buttonPurple" onClick={openModal}>Novo registro</button>
                                <button className="buttonPurple" onClick={() => navigate('/relatory', { state: { items: records } })}>
                                    Gerar Relatório
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Modal irá abrir com o componente AppointmentsAdd ao clicar no botão. Passamos addRecord e records para ele*/}
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <AppointmentsAdd addRecord={addRecord} records={records} />
                </Modal>
                <div><Footer /></div>
            </div>
        </>
    );
};

export default AppointmentsPage;