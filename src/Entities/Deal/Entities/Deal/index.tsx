import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { API_PREFIX } from "src/Common/Consts";
import { DETAILS_PATH } from "src/Entities/Home/Bootstrap/Pages/Details/Path";
import { HOME_PATH } from "src/Entities/Home/Bootstrap/Path";
import { FillData } from "./Components/FillData";
import { ApproveRegistration } from "./Components/ApproveRegistration";
import { Report } from "./Components/Report";

export function Deal (): JSX.Element {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState();

    const prefillDeal = async () => {
        const response = await fetch(`${API_PREFIX}/prefill-deal/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })

        const data = await response.json();

        return data
    }

    useEffect(() => {
        prefillDeal().then((prefill) => setData(prefill));
    }, []);

    const handleCompleteDeal = async () => {
        await fetch(`${API_PREFIX}/complete-deal/${id}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })

        navigate(`/${HOME_PATH}`);
    }

    const handleDelete = async () => {
        await fetch(`${API_PREFIX}/delete-vacancy/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })

        navigate(`/${HOME_PATH}`);
    }

    const BodyComponent = () => {
        if (data?.areYouCreater) {
            switch (data?.status) {
                case 'создана':
                    return (
                        <>
                            Ожидайте, пока соискатель не выберет вашу вакансию
                            <br /><br />

                            Пока соискатель не нашелся, вы можете удалить вакансию
                            <br />
                            <button onClick={ handleDelete }>
                                Удалить вакансию
                            </button>
                        </>
                    );
                case 'ожидание заполнения данных соискателем':
                    return (
                        <>
                            Ожидайте, пока соискатель не заполнит данные
                            <br /><br />

                            Если соискатель долгое время не заполняет данные, вы можете оставить жалобу<br />
                            <Report />
                        </>
                    );
                case 'внесение данных сотрудником в реферальную программу':
                    return <ApproveRegistration clientInfo={ data?.clientInfo } onSucces={() => prefillDeal().then((prefill) => setData(prefill))} />;
                case 'ожидание результатов сделки':
                    return (
                        <>
                            Ожидаем завершение сделки<br />
                            Как только с соискателем свяжется HR, он отметит это, а вакансия вернется в общий поиск<br /><br />

                            Если соискатель долгое время не отмечает заверщение сделки, вы можете оставить жалобу<br />
                            <Report />
                        </>
                    );
            }
        } else {
            switch (data?.status) {
                case 'ожидание заполнения данных соискателем':
                    return <FillData onSucces={() => prefillDeal().then((prefill) => setData(prefill))} />;
                case 'внесение данных сотрудником в реферальную программу':
                    return (
                        <>
                            Ожидайте, пока сотрудник не заполнит данные в реферальную программу
                            <br /><br />

                            Если сотрудник долгое время не заполняет данные, вы можете оставить жалобу<br />
                            <Report />
                        </>
                    );
                case 'ожидание результатов сделки':
                    return (
                        <>
                            Сотрудник компании ввел ваши данные в реферальную программу <a href={`${API_PREFIX}/download/${data?.approveRegistration}`} download>(доказательства)</a><br />

                            Дождитесь звонка от HR, а после подтвердите завершение сделки<br /><br />
                            <button onClick={ handleCompleteDeal }>
                                Завершить сделку
                            </button>
                            <br /><br />

                            Если доказательства сотрудника недостаточны, или продолжительное время с вами не связываются, вы можете оставить жалобу<br />
                            <Report />
                        </>
                    );
            }
        }
    }

    return (
        <>
            Сделка по вакансии
            <br /><br />

            Краткое описание: {data?.description}<br />
            Компания: {data?.company}<br />
            Город: {data?.city}<br />
            <button
                onClick={() => {
                    navigate(`/${HOME_PATH}/${generatePath(DETAILS_PATH, { id })}`);
                }}
            >
                Перейти к полному просмотру вакансии
            </button>
            <br /><br />
            <BodyComponent />
        </>
    );
}
