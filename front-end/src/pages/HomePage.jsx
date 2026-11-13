import Header from "../components/Header";
import "../App.css";
import Footer from "../components/Footer";


const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <div className="div--banner">
          <div className="div--banner--text">
            <h1>Sua saúde descomplicada</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum finibus nisl, a pretium sapien luctus vel. Etiam luctus ullamcorper eros vel congue. Aenean et tortor augue. Phasellus cursus lacus eget ligula dignissim, at viverra nulla maximus. Maecenas faucibus nibh ut risus vulputate faucibus. Nam et vestibulum enim. Cras semper sodales est, aliquet finibus sem consequat sit amet. Phasellus massa leo, tristique eget est vitae, dapibus pulvinar elit. Aenean condimentum sollicitudin cursus. Sed at rutrum dolor. Aliquam elit felis, tincidunt ac nulla ac, porta porta odio.
            </p>
          </div>
        </div>
        <div className="cont--info">
          <h1>O período de matrículas está aberto!</h1>
          <p>
            Com o Salutia, você organiza e acessa todas as informações importantes da sua saúde de forma prática e segura. Um único aplicativo para gerenciar seu bem-estar com facilidade e tranquilidade. Simplifique o cuidado com a sua saúde!
          </p>
          <div className="grid">
            <div className="item">
              <img className="itemImage" src='src/assets/vaccine_cottonbro.jpg' alt="Seringa frasco-ampola para vacinação por Cottonbro Studio" />
              <h3>Vacinas</h3>
              <p>
                Histórico vacinal sempre à mão.
              </p>
            </div>
            <div className="item">
              <img className="itemImage" src='src/assets/medicines_pietrozj.jpg' alt="Medicamento em cápsulas por Pietro Jeng" />
              <h3>Medicamentos</h3>
              <p>
                Tratamentos organizados com facilidade.
              </p>
            </div>
            <div className="item">
              <img className="itemImage" src='src/assets/appointment_pixabay.jpg' alt="Agenda e estetoscópio por Pixabay." />
              <h3>Agenda de consultas</h3>
              <p>
                Controle fácil das suas consultas.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
