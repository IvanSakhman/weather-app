import React from 'react';
import styles from './Welcome.scss';

class Welcome extends React.Component {
    render() {
        return (
            <div className={styles.title}>
                Hello World!
            </div>
        )
    }
}

export default Welcome;