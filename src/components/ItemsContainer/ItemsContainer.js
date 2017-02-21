import React from 'react';
import Item from '../Item/Item';
import styles from './ItemsContainer.scss';

export const ItemsContainer = (props) => {
    return (
        <div className={styles.container}>
            {props.city.map(city => <Item key={city} city={city} /> )}
        </div>
    )
};