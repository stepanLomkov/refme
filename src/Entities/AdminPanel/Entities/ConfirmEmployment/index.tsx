import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Button } from "src/Common/Components/Button";
import { API_PREFIX, GENERAL_COLOR } from "src/Common/Consts";

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
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: '100px', maxWidth: '500px' }}>
            <Button
                onClick={() => {
                    navigate('..');
                }}
            >
                Вренуться в панель администратора
            </Button>
            <br /><br />
            
            <b style={{ color: GENERAL_COLOR, fontSize: '20px' }}>Подтверждение трудоустройства</b>
            <br /><br />

            <b style={{ color: GENERAL_COLOR }}>Список активных запросов:</b>
            <br /><br />

            {date.length === 0 && <div style={{ fontSize: '18px', color: GENERAL_COLOR, fontWeight: 600 }}>нет данных</div>}
            {date?.map(({ _id, company, file, phone, userId, userLogin }) => {
                return (
                    <div key={ _id } style={{ width: '100%', padding: '4px', margin: '6px 0', fontSize: '16px', color: GENERAL_COLOR, backgroundColor: '#D8BFD8', fontWeight: 600 }} >
                        {`Пользователь: ${userLogin}, `}
                        {`Контактный телефон: ${phone}, `}<br />
                        {`Компания: ${company}, `}
                        <a href={`${API_PREFIX}/download/${file}`} download>
                            доказательство трудоустройства
                        </a>
                        <br />
            
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button onClick={ () => handleReject(userId) } >
                                Отклонить
                            </Button>
                            <Button onClick={ () => handleAccept(userId) } >
                                Подтвердить
                            </Button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}