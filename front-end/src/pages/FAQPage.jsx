import Footer from "../components/Footer";
import Header from "../components/Header";
import classes from "../pages/FAQPage.module.css";

const FAQPage = () => {
  return (
    <div className={classes.page}>
      <Header />
      <div className={classes.pageFaq}>
        <h1>Perguntas Frequentes</h1>
        <p>
          Encontre aqui as respostas para as dúvidas mais comuns sobre o Portal
          de Matrículas da UniPOA. Se não encontrar o que procura, entre em
          contato conosco através da página <a href="">Contato</a>.
        </p>

        <div className={classes.faqSection}>
          <div className={classes.faqItem}>
            <h3>O que é o Portal de Matrículas da UniPOA?</h3>
            <p>
              O Portal de Matrículas da UniPOA é a plataforma oficial da
              universidade para realização de matrícula, rematrícula, escolha de
              disciplinas, consulta de horários e acompanhamento da situação
              acadêmica.
            </p>
          </div>

          <div className={classes.faqItem}>
            <h3>Como acesso o Portal de Matrículas?</h3>
            <p>
              Você pode acessar o portal diretamente pelo navegador, em qualquer
              dispositivo com acesso à internet. Basta entrar com seu número de
              matrícula (RA) ou CPF e sua senha cadastrada na UniPOA.
            </p>
          </div>

          <div className={classes.faqItem}>
            <h3>O Portal de Matrículas é seguro?</h3>
            <p>
              Sim! A proteção dos seus dados acadêmicos e pessoais é nossa
              prioridade. Utilizamos criptografia e boas práticas de segurança
              digital em conformidade com a LGPD para garantir a privacidade das
              suas informações.
            </p>
          </div>

          <div className={classes.faqItem}>
            <h3>Como faço minha rematrícula ou inclusão de disciplinas?</h3>
            <p>
              Após fazer login na plataforma, acesse a opção Matrícula Online
              no menu principal. Lá, você poderá selecionar as disciplinas
              disponíveis para o semestre, conferir os horários e confirmar sua
              grade.
            </p>
          </div>

          <div className={classes.faqItem}>
            <h3>Preciso de ajuda com minha matrícula, como entrar em contato?</h3>
            <p>
              Caso tenha problemas de acesso, pendências financeiras ou dúvidas
              sobre sua grade curricular, acesse a página{" "}
              <a href="">Contato</a> para falar com a Secretaria Acadêmica via
              telefone, WhatsApp ou e-mail.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;