import React, {Component} from 'react';
import TenderContext from '../context';
import CurrentProduct from './CurrentProduct/currentProduct';
import ShopInfoBar from './ShopInfoBar/shopInfoBar';

import './shop.css';

class Shop extends Component {
    
    static contextType = TenderContext;

    constructor(props) {
        super(props);

        this.handleBuy = this.handleBuy.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    handleBuy() {
        const canAfford = this.context.canAfford(this.context.currentShoppingItem.price)

        if (canAfford) {
            if (this.context.currentShoppingItem.ad) {
                this.context.removeItemFromState(this.context.currentShoppingItem.index);
            }
            this.context.subtractTotalByPrice(this.context.currentShoppingItem.price);
            this.context.getNewProductToSell();
        }
        else {
            this.context.setErrorMessages(['You can\'t afford that item'])
        }
    }

    handleSkip() {
        this.context.getNewProductToSell();
    }

    handleLike() {
        this.context.setCurrentProductToLiked();
    }

    handleDone() {
        this.context.goBack();
    }

    render() {
        return(
            <div>
                <ShopInfoBar 
                    totalMoney={this.context.totalMoney}
                    handleDone={this.handleDone}/>
                
                <CurrentProduct 
                    item={this.context.currentShoppingItem}
                    handleBuy={this.handleBuy}
                    handleSkip={this.handleSkip}
                    handleLike={this.handleLike}/>
            </div>
        )
    }
}

export default Shop;