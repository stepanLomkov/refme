import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { API_PREFIX } from "src/Common/Consts";

export function ConfirmCreateVacancy () {
    const navigate = useNavigate();
    const [date, setDate] = useState([]);

    const getList = async () => {
        const response = await fetch(`${API_PREFIX}/get-confirm-create-vacancy-list`, {
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

    const handleAccept = (id) => {
        fetch(`${API_PREFIX}/accept-confirm-create-vacancy/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(() => getList().then((list) => setDate(list)));
    }

    const handleReject = (id) => {
        fetch(`${API_PREFIX}/reject-confirm-create-vacancy/${id}`, {
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
            
            Подтверждение создаваемых вакансий
            <br /><br />

            Список активных запросов:
            <br /><br />

            <ul>
                {date.length === 0 && 'нет данных'}
                {date?.map(({ _id, city, company, description, file, login, more, phone }) => {
                    return (
                        <li key={ _id }>
                            {`Пользователь: ${login}, `}
                            {`Контактный телефон: ${phone}, `}
                            {`Компания: ${company}, `}
                            {`Город: ${city}, `}
                            {`Краткое описание: ${description}, `}
                            <a href={`${API_PREFIX}/download/${file}`} download>
                                доказательство  возможности рекомендации
                            </a>
                            <br />
                            {`Подробное описание: ${more}, `}
                            
                            <button onClick={ () => handleAccept(_id) } >
                                Подтвердить
                            </button>
                            <button onClick={ () => handleReject(_id) } >
                                Отклонить
                            </button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}