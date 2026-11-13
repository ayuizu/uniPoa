import { useLocation } from 'react-router-dom';
import Item from './Item';
import classes from './RelatoryPage.module.css';
import { useNavigate } from 'react-router-dom';

const Relatory = () => {
  const location = useLocation();
  const items = location.state?.items || [];
  const type = location.state?.type;

  const handlePrint = () => {
    const printArea = document.getElementById('printArea'); // Get the area to print
    const originalContent = document.body.innerHTML; // Store the original page content
    console.log(printArea)
    console.log(originalContent);

    document.body.innerHTML = printArea.innerHTML;

    window.print();

    document.body.innerHTML = originalContent;
    window.location.reload()
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className={classes.buttonsWrapper}>
        <button className={classes.printButton} onClick={() => handlePrint()}>Gerar relatório</button>
        <button className={classes.printButton} onClick={() => navigate(-1)}>Voltar</button>
      </div>
      <div id='printArea' className={classes.content}>
        <h1 className={classes.title}>Relatório</h1>
        <div className={classes.items}>
          {
            items && items.length > 0 ? (
              items.map((item) => <Item key={item.id || Math.random()} item={item} type={type} />)
            ) : (
              <p>Nenhuma informação encontrada</p>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Relatory;