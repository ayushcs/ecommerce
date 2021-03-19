import React from 'react';
import Carts from './Carts';
import Header from './Header';
import Products from './Products';
import { Switch, Route } from 'react-router-dom';

function Homepage() {

    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route exact path='/' component={Products} />
                <Route exact path='/cart' component={Carts} />
            </Switch>
        </React.Fragment>
    )
}

export default Homepage
