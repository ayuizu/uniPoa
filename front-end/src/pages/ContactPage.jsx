import Footer from "../components/Footer";
import Header from "../components/Header";
import classes from "../pages/ContactPage.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';

const ContactPage = () => {
  return (
    <div className={classes.page}>
      <div>
        <Header />
      </div>
      <div className={classes.pageContact}>
        <h1>Entre em Contato</h1>
        <p>
          Estamos aqui para ajudar! Entre em contato conosco através dos nossos
          canais de atendimento. <br />Seja para tirar dúvidas, enviar sugestões ou
          buscar suporte, nossa equipe estará à disposição.
        </p>

        <div className={classes.contactInfo}>
          <div className={classes.contactItem}>
            <div className={classes.contactIcon}><FontAwesomeIcon icon={faPhone} style={{color: "#1C4650"}} size="xs" /> </div>
            <h3>Telefone</h3>
            <p>0800 000 000 000</p>
          </div>

          <div className={classes.contactItem}>
            <div className={classes.contactIcon}><FontAwesomeIcon icon={faWhatsapp} style={{color: "#1C4650",}} size="xs" /> </div>
            <h3>WhatsApp</h3>
            <p>(51) 3333-3333</p>
          </div>

          <div className={classes.contactItem}>
            <div className={classes.contactIcon}><FontAwesomeIcon icon={faEnvelope} style={{color: "#1C4650",}} size="xs" /> </div>
            <h3>E-mail</h3>
            <p>
            <a href="">contato@unipoa.com</a>
            </p>
          </div>

          <div className={classes.contactItem}>
            <div className={classes.contactIcon}><FontAwesomeIcon icon={faTelegram} style={{color: "#1C4650",}} size="xs" /> </div>
            <h3>Telegram</h3>
            <p>
              <a href="" target="_blank">
                canalcartaosaude
              </a>
            </p>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
