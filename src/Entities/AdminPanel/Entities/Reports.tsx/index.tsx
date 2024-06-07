import { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom"
import { Button } from "src/Common/Components/Button";
import { API_PREFIX, GENERAL_COLOR } from "src/Common/Consts";
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
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: '100px', maxWidth: '500px' }}>
            <Button
                onClick={() => {
                    navigate('..');
                }}
            >
                Вренуться в панель администратора
            </Button>
            <br /><br />
            
            <b style={{ color: GENERAL_COLOR, fontSize: '20px' }}>Обработка жалоб</b>
            <br /><br />

            <b style={{ color: GENERAL_COLOR }}>Список жалоб:</b>
            <br /><br />

            {date.length === 0 && <div style={{ fontSize: '18px', color: GENERAL_COLOR, fontWeight: 600 }}>нет данных</div>}
            {date?.map((report) => {
                const { _id, reportCreator, text, vacancy } = report;
                return (
                    <div key={ _id } style={{ width: '100%', padding: '4px', margin: '6px 0', fontSize: '16px', color: GENERAL_COLOR, backgroundColor: '#D8BFD8', fontWeight: 600 }}>
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

                        <Button onClick={ () => handleReject(_id) } >
                            Отклонить жалобу (сделка не изменится)
                        </Button>
                        <br /><br />
                        <Button onClick={ () => handleAccept(_id) } >
                            Подтвердить жалобу (сделка закроется, вакансия станет доступа для поиска)
                        </Button>
                    </div>
                )
            })}
        </div>
    )
}