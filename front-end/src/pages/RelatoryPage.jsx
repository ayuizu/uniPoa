import { useLocation } from 'react-router-dom';
import Item from '../components/Item';
import './RelatoryPage.module.css';


const Relatory = () => {
  const location = useLocation();
  const items = location.state?.items || [];

  const handlePrint = () => {
    const printArea = document.getElementById('printArea'); // Get the area to print
    const originalContent = document.body.innerHTML; // Store the original page content
    console.log(printArea)
    console.log(originalContent);

    document.body.innerHTML = printArea.innerHTML;

    window.print();

    document.body.innerHTML = originalContent;
  };


  return (
    <div>
      <div id='printArea'>
        <h1>Relatório</h1>
        {
          items && items.length > 0 ? (
            items.map((item) => <Item key={item.id || Math.random()} item={item} />)
          ) : (
            <p>Nenhuma informação encontrada</p>
          )
        }
      </div>
      <button onClick={() => handlePrint()}>print</button>
    </div>
  );
};

export default Relatory;