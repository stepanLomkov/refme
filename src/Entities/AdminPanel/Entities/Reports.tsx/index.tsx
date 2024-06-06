import { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom"
import { API_PREFIX } from "src/Common/Consts";
import { DETAILS_PATH } from "src/Entities/Home/Bootstrap/Pages/Details/Path";
import { HOME_PATH } from "src/Entities/Home/Bootstrap/Path";

export function Reports () {
    const navigate = useNavigate();
    const [date, setDate] = useState([]);

    const getList = async () => {
        const response = await fetch(`${API_PREFIX}/get-reports-list`, {
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
        fetch(`${API_PREFIX}/accept-report/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(() => getList().then((list) => setDate(list)));
    }

    const handleReject = (id) => {
        fetch(`${API_PREFIX}/reject-report/${id}`, {
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
            
            Обработка жалоб
            <br /><br />

            Список жалоб:
            <br /><br />

            <ul>
                {date.length === 0 && 'нет данных'}
                {date?.map((report) => {
                    const { _id, reportCreator, text, vacancy } = report;
                    return (
                        <li key={ _id }>
                            {/* {`Пользователь: ${login}, `}
                            {`Контактный телефон: ${phone}, `}
                            {`Компания: ${company}, `}
                            {`Город: ${city}, `}
                            {`Краткое описание: ${description}, `}
                            <a href={`${API_PREFIX}/download/${file}`} download>
                                доказательство  возможности рекомендации
                            </a>
                            <br />
                            {`Подробное описание: ${more}, `} */}
                            {`Заявитель: ${reportCreator}, `}<br />
                            {`Текст жалобы: ${text}, `}<br />
                            <a href={`/${HOME_PATH}/${generatePath(DETAILS_PATH, { id: vacancy._id })}`} target="_blank" >посмотреть вакансию</a>,<br />
                            {` Статус сделки на момент жалобы: ${vacancy.status}, `}<br />
                            {`Телефон сотрудника: ${vacancy.phone}, `}<br />
                            {vacancy.clientInfo ? `Данные соискателя: ${vacancy.clientInfo.familyName} ${vacancy.clientInfo.firstName} ${vacancy.clientInfo.lastName}, ${vacancy.clientInfo.dateOfBorn},  ${vacancy.clientInfo.phone}, ` : null}<br />
                            {vacancy.clientInfo?.cv ? (
                                <>
                                    <a href={`${API_PREFIX}/download/${vacancy.clientInfo.cv}`} download>
                                        Резюме
                                    </a>
                                    <br />
                                </>
                            ) : null}

                            {vacancy.approveRegistration ? (
                                <>
                                    <a href={`${API_PREFIX}/download/${vacancy.approveRegistration}`} download>
                                        Доказательство сотрудника о вводе соискателя в рефереальную программу своей компании
                                    </a>
                                    <br />
                                </>
                            ) : null}

                            <button onClick={ () => handleAccept(_id) } >
                                Подтвердить жалобу (сделка закроется, вакансия станет доступа для поиска)
                            </button>
                            <button onClick={ () => handleReject(_id) } >
                                Отклонить жалобу (сделка не изменится)
                            </button>
                            <br /><br />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}