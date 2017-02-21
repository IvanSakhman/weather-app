import React from 'react';
import { ItemsContainer } from '../ItemsContainer/ItemsContainer'

import styles from './Main.scss';


class Main extends React.Component {
    state = {
        city: [
            "L'viv",
            "Donets'k",
            "Vinnytsia",
            "Dnipropetrovsk",
            "Ivano-Frankivs'k",
            "Zhytomyr",
            "Kiev",
            "Kirovohrad",
            "Luhans'k",
            "Luts'k",
            "Mykolaiv",
            "Odessa",
            "Poltava",
            "Rivne",
            "Sumy",
            "Ternopil",
            "Uzhhorod",
            "Kharkiv",
            "Kherson",
            "Khmelnytskyi",
            "Cherkasy",
            "Chernivtsi",
            "Chernihiv",
            "Zaporizhia",
            "Simferopol"
        ]
    };
    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}> Weather App</h1>

                <ItemsContainer city={this.state.city} />
            </div>
        )
    }
}

export default Main;