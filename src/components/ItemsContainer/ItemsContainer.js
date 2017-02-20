import React from 'react';
import Item from '../Item/Item';
import styles from './ItemsContainer.scss';

class ItemsContainer extends React.Component {
    render() {
        return (
            <div>
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
        )
    }
}

export default ItemsContainer;