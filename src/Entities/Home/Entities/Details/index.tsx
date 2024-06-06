import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { API_PREFIX } from "src/Common/Consts";
import { AUTH_PATH } from "src/Entities/Auth/Bootstrap/Path";
import { DEAL_PATH } from "src/Entities/Deal/Bootstrap/Path";

export default function Details (): JSX.Element {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const { id } = useParams();

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

    const handleAssignClick = () => {
        const assignVacancy = async () => {

            await fetch(`${API_PREFIX}/assign-vacancy/${id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
        }
        
        assignVacancy().then(() => navigate(`/${generatePath(DEAL_PATH, { id })}`));
    }

    return (
        <>
            <br />
            Компания: {data.company} <br />
            Город: {data.city} <br />
            Описание: {data.description} <br />
            Подробная информация: {data.more} <br />

            <a href={`${API_PREFIX}/download/${data.file}`} download>
                доказательство  возможности рекомендации
            </a>
            <br /><br />

            {localStorage.getItem('accessToken') ? (
                <button onClick={ handleAssignClick }>
                    Получить рефералку
                </button>
            ) : (
                <>
                    Для продолжения авторизуйтесь
                    <button onClick={ () => navigate(`../../${AUTH_PATH}`)}>
                        Зарегистрироваться или войти
                    </button>
                </>  
            )}
        </>
    );
}
