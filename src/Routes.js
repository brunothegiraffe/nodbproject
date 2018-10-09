import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Owned from './components/Owned';

export default(
    <div>
        <Switch>
            <Route path='/owned' component={ Owned }/>
        </Switch>
    </div>
)