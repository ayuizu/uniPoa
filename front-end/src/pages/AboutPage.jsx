import Footer from "../components/Footer";
import Header from "../components/Header";
import classes from "../pages/AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={classes.page}>
      <div>

      <Header />
      </div>
      <div className={classes.pageAbout}>
        <h1>Sobre o UniPOA</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum finibus nisl, a pretium sapien luctus vel. Etiam luctus ullamcorper eros vel congue. Aenean et tortor augue. Phasellus cursus lacus eget ligula dignissim, at viverra nulla maximus. Maecenas faucibus nibh ut risus vulputate faucibus. Nam et vestibulum enim. Cras semper sodales est, aliquet finibus sem consequat sit amet. Phasellus massa leo, tristique eget est vitae, dapibus pulvinar elit. Aenean condimentum sollicitudin cursus. Sed at rutrum dolor. Aliquam elit felis, tincidunt ac nulla ac, porta porta odio.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum finibus nisl, a pretium sapien luctus vel. Etiam luctus ullamcorper eros vel congue. Aenean et tortor augue. Phasellus cursus lacus eget ligula dignissim, at viverra nulla maximus. Maecenas faucibus nibh ut risus vulputate faucibus. Nam et vestibulum enim. Cras semper sodales est, aliquet finibus sem consequat sit amet. Phasellus massa leo, tristique eget est vitae, dapibus pulvinar elit. Aenean condimentum sollicitudin cursus. Sed at rutrum dolor. Aliquam elit felis, tincidunt ac nulla ac, porta porta odio.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
