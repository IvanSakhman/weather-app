import React from 'react';
import styles from './Item.scss';

class Item extends React.Component {
    render() {
        return (
            <div>
                <h3 className={styles.cityName}>Lviv</h3>
                <p>Temperature</p>
                <img src="#" alt="weather"/>
            </div>
        )
    }
}

export default Item;