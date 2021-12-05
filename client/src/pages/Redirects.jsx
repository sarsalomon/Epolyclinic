import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Context } from '..';

const Redirects = () => {
    const {user} = useContext(Context)
    
    if (user._userrole === "Reception"){
        return <Redirect to='/reception'  />
    }else if (user._userrole === "Admin"){
        return <Redirect to='/admin'  />
    }else if (user._userrole === "Doctor"){
        return <Redirect to='/doctordashboard'  />
    }
    return (
        <div>
            
        </div>
    );
};

export default Redirects;