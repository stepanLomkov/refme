import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { API_PREFIX } from "src/Common/Consts";

export default function Details (): JSX.Element {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        setData({
            title: 'Uber',
            description: 'Team Lead, Inside Sales - Uber Eats London',
            more: 'некоторая подробная информация',
        });
    }, []);

    useEffect(() => {
        const loadDetails = async () => {
            const response = await fetch(`${API_PREFIX}/details/${id}`, {
                method: "GET"
            })
    
            const data = await response.json();

            return data
        }
        
        loadDetails().then(detailsData => setData(detailsData))
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
