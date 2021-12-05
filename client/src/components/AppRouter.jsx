import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Context } from '..';
import { authRoutes, publicRoutes } from '../routes';
import { NOTFOUNDED_ROUTE } from '../utils/consts';

const AppRouter = () => {
    const {user} = useContext(Context)
    let accessRouter;

    if(user.isAuth){
        accessRouter = authRoutes.map(({path,Component})=>
            <Route key={path} path={path} component={Component} exact/>
        )
    }else{
        accessRouter = publicRoutes.map(({path,Component})=>
            <Route key={path} path={path} component={Component} exact/>
        )
    }
    return (
        <Switch>
            {accessRouter}
            <Redirect to={NOTFOUNDED_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;