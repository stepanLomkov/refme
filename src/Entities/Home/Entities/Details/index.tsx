import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

export default function Details (): JSX.Element {
    const navigate = useNavigate();
    const [data, setData] = useState({});

    useEffect(() => {
        setData({
            title: 'Uber',
            description: 'Team Lead, Inside Sales - Uber Eats London',
            more: 'некоторая подробная информация',
        });
    }, []);

    return (
        <>
            <button onClick={() => navigate('..')}>Назад</button>
            Компания: {data.title} <br />
            Описание: {data.description} <br />
            Подробная информация: {data.more} <br />
        </>
    );
}
