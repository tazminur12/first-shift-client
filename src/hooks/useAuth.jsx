// src/hooks/useAuth.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';

const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    return context;
};

export default useAuth; // Make sure this is a default export