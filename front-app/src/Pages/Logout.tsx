import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Store from './../store';

export const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        Store.clearStorage();
        navigate('/')
    }, []);

    return <></>
}