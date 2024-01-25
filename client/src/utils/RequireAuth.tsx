import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useStore } from '../stores';

export const RequireAuth: React.FC = observer(() => {
    const { authStore } = useStore();
    if (!authStore.isLoggedIn) {
        return <Navigate to='/login' />;
    }
    return <Outlet />;
});
