import React from 'react';
import ItemsContainer from '../ItemsContainer/ItemsContainer'

import styles from './Main.scss';

class Main extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}> Weather App</h1>

                <ItemsContainer />
            </div>
        )
    }
}

export default Main;