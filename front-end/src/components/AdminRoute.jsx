import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { estaLogado, isAdmin, idAlunoLogado } from '../services/sessao';

// isAdmin={true} exige perfil de administrador, isAdmin={false} exige perfil de aluno e sem a prop basta estar logado
function AdminRoute({ isAdmin: exigeAdmin, children }) {
  if (!estaLogado()) {
    return <Navigate to="/login" replace />;
  }
  if (exigeAdmin !== undefined && exigeAdmin !== isAdmin()) {
    return <Navigate to="/login" replace />;
  }
  if (exigeAdmin === false && !idAlunoLogado()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

AdminRoute.propTypes = {
  isAdmin: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
