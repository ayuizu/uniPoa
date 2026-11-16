import { useNavigate } from "react-router-dom";
import AreaLogada from "../components/AreaLogada";
import VisaoGeralAluno from "../components/VisaoGeral/VisaoGeralAluno";
import VisaoGeralAdmin from "../components/VisaoGeral/VisaoGeralAdmin";
import { isAdmin, nomeUsuario } from "../services/sessao";

// Página inicial depois do login: Visão geral do aluno ou do administrador
const UserPage = () => {
    const navigate = useNavigate();

    if (isAdmin()) {
        return (
            <AreaLogada
                titulo="Visão geral"
                subtitulo="Acompanhe as ofertas acadêmicas e gerencie as turmas."
                acao={<button className="buttonPurple" onClick={() => navigate('/turmas')}>+ Nova turma</button>}
            >
                <VisaoGeralAdmin />
            </AreaLogada>
        );
    }

    return (
        <AreaLogada
            titulo={`Olá, ${nomeUsuario().split(' ')[0]}!`}
            subtitulo="Acompanhe suas matrículas e organize sua rotina acadêmica."
        >
            <VisaoGeralAluno />
        </AreaLogada>
    );
}

export default UserPage;
