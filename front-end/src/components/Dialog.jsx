import classes from './Dialog.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Dialog = ({ isOpen, onClose, children }) => {
  
  if (!isOpen) return null;

  return (
    <div className={classes.overlay}>
      <div className={classes.dialog}>
        <button onClick={onClose} className={classes.closeButton}><span data-tooltip="Fechar"><FontAwesomeIcon icon={faXmark} style={{color: "#B197FC",}} /></span></button>
        {children}
      </div>
    </div>
  );
};

export default Dialog;