import HeaderIn from "./HeaderIn";
import Menu from "./Menu";
import classes from "./Academico.module.css";

// Layout comum das páginas internas: cabeçalho, menu lateral e conteúdo (sem rodapé, como no Figma)
const AreaLogada = ({ titulo, subtitulo, children }) => {
    return (
        <div className={classes.layout}>
            <HeaderIn />
            <Menu />
            <main className={classes.conteudo}>
                <h1>{titulo}</h1>
                {subtitulo && <p className={classes.subtitulo}>{subtitulo}</p>}
                {children}
            </main>
        </div>
    );
}

export default AreaLogada;
