import classes from './Item.module.css';
import { formatKey, formatValue } from './formatter';

const Item = ({ item, type }) => {
  return (
    <div className={classes.item}>
      <div className={classes.itemHeader}>
        <h2 className={classes.itemTitle}>{item.name || type}</h2>
      </div>
      <div className={classes.itemContent}>
        <ul className={classes.itemDetails}>
          {Object.entries(item).map(([key, value]) => (
            key !== 'id' && key !== 'title' && value != "" && ( // Exclude certain keys if needed
              <li key={key}>
                <strong>{formatKey(key)}:</strong> {formatValue(key, value)}
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Item;