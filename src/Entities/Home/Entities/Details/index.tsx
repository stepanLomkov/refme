import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { Button } from "src/Common/Components/Button";
import { API_PREFIX, GENERAL_COLOR } from "src/Common/Consts";
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
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: '30px', maxWidth: '500px', alignItems: 'center' }}>
            <div><span style={{ color: GENERAL_COLOR }}>Название:</span> {data.description}</div> <br /><br />
            <div><span style={{ color: GENERAL_COLOR }}>Компания:</span> {data.company}</div> <br /><br />
            <div><span style={{ color: GENERAL_COLOR }}>Город:</span> {data.city}</div> <br /><br />

            <span style={{ color: GENERAL_COLOR }}>Подробная информация</span>
            {data.more} <br /><br />

            <a href={`${API_PREFIX}/download/${data.file}`} download>
                доказательство  возможности рекомендации
            </a>
            <br /><br />

            {localStorage.getItem('accessToken') ? (
                <Button onClick={ handleAssignClick }>
                    Получить рефералку
                </Button>
            ) : (
                <>
                    Для продолжения авторизуйтесь
                    <Button onClick={ () => navigate(`../../${AUTH_PATH}`)}>
                        Зарегистрироваться или войти
                    </Button>
                </>  
            )}
        </div>
    );
}
