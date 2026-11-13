//Importante: Falta trocar o header para o de navegação interna

import HeaderIn from "../components/HeaderIn";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import classes from "./UserPage.module.css"

const UserPage = () => {
    return (
        <div className={classes.page}>
            <div><HeaderIn /></div>
            <div className={classes.userContent}>
                <div className={classes.divMenu}>
                    <Menu />
                </div>
                <div className={classes.divContent}>
                        <img className={classes.userImage} src='src/assets/users_pixabay.jpg' alt="Mãos unidas" />
                    <div className={classes.divInfo}>
                        <h1>Bem-vindo(a) ao <span className={classes.unipoa}>UniPOA!</span></h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum finibus nisl, a pretium sapien luctus vel. Etiam luctus ullamcorper eros vel congue. Aenean et tortor augue.
                            <br /><br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum finibus nisl, a pretium sapien luctus vel. Etiam luctus ullamcorper eros vel congue. Aenean et tortor augue. Phasellus cursus lacus eget ligula dignissim, at viverra nulla maximus. Maecenas faucibus nibh ut risus vulputate faucibus. 
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserPage;