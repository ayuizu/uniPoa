import HeaderIn from "./HeaderIn";
import Footer from "./Footer";
import Menu from "./Menu";
import classes from "./Academico.module.css";

// Layout comum das páginas internas: cabeçalho, menu lateral, conteúdo e rodapé
const AreaLogada = ({ titulo, subtitulo, children }) => {
    return (
        <div className="page">
            <div><HeaderIn /></div>
            <div className="userContent">
                <div>
                    <Menu />
                </div>
                <main className={classes.conteudo}>
                    <h1>{titulo}</h1>
                    {subtitulo && <p className={classes.subtitulo}>{subtitulo}</p>}
                    {children}
                </main>
            </div>
            <div><Footer /></div>
        </div>
    );
}

export default AreaLogada;
