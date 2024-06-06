import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { API_PREFIX } from "src/Common/Consts";

export function ConfirmEmployment () {
    const navigate = useNavigate();
    const [date, setDate] = useState([]);

    const getList = async () => {
        const response = await fetch(`${API_PREFIX}/get-confirm-employment-list`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })

        const data = await response.json();

        return data
    }

    useEffect(() => {
        getList().then((list) => setDate(list));
    }, []);

    const handleAccept = (userId) => {
        fetch(`${API_PREFIX}/accept-confirm-employment/${userId}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(() => getList().then((list) => setDate(list)));
    }

    const handleReject = (userId) => {
        fetch(`${API_PREFIX}/reject-confirm-employment/${userId}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(() => getList().then((list) => setDate(list)));
    }

    return (
        <>
            <button
                onClick={() => {
                    navigate('..');
                }}
            >
                Вренуться в панель администратора
            </button>
            <br /><br />
            
            Подтверждение трудоустройства
            <br /><br />

            Список активных запросов:
            <br /><br />

            <ul>
                {date.length === 0 && 'нет данных'}
                {date?.map(({ _id, company, file, phone, userId, userLogin }) => {
                    return (
                        <li key={ _id }>
                            {`Пользователь: ${userLogin}, `}
                            {`Контактный телефон: ${phone}, `}
                            {`Компания: ${company}, `}
                            <a href={`${API_PREFIX}/download/${file}`} download>
                                доказательство трудоустройства
                            </a>
                            
                            <button onClick={ () => handleAccept(userId) } >
                                Подтвердить
                            </button>
                            <button onClick={ () => handleReject(userId) } >
                                Отклонить
                            </button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}