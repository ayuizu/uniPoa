import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCalendarDays, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import classes from './HomePage.module.css';

const funcionalidades = [
  {
    titulo: 'Matrículas',
    descricao: 'Consulte as turmas disponíveis e realize sua matrícula.',
    icone: faClipboardCheck,
    destino: '/login',
  },
  {
    titulo: 'Grade horária',
    descricao: 'Visualize suas aulas e organize sua rotina acadêmica.',
    icone: faCalendarDays,
    destino: '/login',
  },
  {
    titulo: 'Disciplinas',
    descricao: 'Explore as disciplinas, seus períodos e pré-requisitos.',
    icone: faBookOpen,
    destino: '/login',
  },
];

const HomePage = () => (
  <div className={classes.home}>
    <Header />
    <main>
      <section className={classes.hero} aria-labelledby="home-title">
        <div className={classes.heroCard}>
          <h1 id="home-title">Sua jornada acadêmica começa aqui!</h1>
          <p>
            Acesse o portal UniPOA para consultar disciplinas, organizar sua grade horária e
            realizar suas matrículas de forma simples e prática.
          </p>
          <Link className={classes.heroButton} to="/login">Acessar portal</Link>
        </div>
      </section>

      <section className={classes.features} aria-labelledby="features-title">
        <div className={classes.featuresIntro}>
          <h2 id="features-title">Tudo o que você precisa em um só lugar</h2>
        </div>
        <div className={classes.featureGrid}>
          {funcionalidades.map(({ titulo, descricao, icone, destino }) => (
            <article className={classes.featureCard} key={titulo}>
              <FontAwesomeIcon className={classes.featureIcon} icon={icone} aria-hidden="true" />
              <h3><Link to={destino}>{titulo}</Link></h3>
              <p>{descricao}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default HomePage;
