import { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { API_PREFIX } from "src/Common/Consts";
import { ADMIN_PANEL_PATH } from "src/Entities/AdminPanel/Bootstrap/Path";
import { CONFIRM_EMPLOYMENT_PATH } from "src/Entities/ConfirmEmployment/Bootstrap/Path";
import { CREATE_PATH } from "src/Entities/Create/Bootstrap/Path";
import { DEAL_PATH } from "src/Entities/Deal/Bootstrap/Path";

export function Profile (): JSX.Element {
    const navigate = useNavigate();
    const [profile, setProfile] = useState();

    const getProfile = async () => {
        const response = await fetch(`${API_PREFIX}/profile`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })

        const data = await response.json();

        return data
    }

    useEffect(() => {
        getProfile().then(profileData => setProfile(profileData))
    }, []);

    return (
        <>
            Логин аккаунта: {profile?.login}
            <br/><br/>

            {profile?.isAdmin ? (
                <>
                    <button
                        onClick={() => {
                            navigate(`/${ADMIN_PANEL_PATH}`);
                        }}
                    >
                        Админка
                    </button> 
                    <br/><br/>
                </>
            ) : null}

            Возможность создавать вакансии: {profile?.hasCrateVacancy ? 'есть' : 'нет'}
            <br/>

            {profile?.company ? (
                <>Ваша компания: {profile.company} <br /></>
            ) : null}

            {profile?.hasCrateVacancy ? (
                <button
                    onClick={() => {
                        navigate(`/${CREATE_PATH}`);
                    }}
                >
                    Создать вакансию
                </button> 
            ) : (
                profile?.activeConfirm ? (
                    <>Ваш запрос на возможность создания заявок на рассмотрении, ожидайте</>
                ) : (
                    <button onClick={() => navigate(`/${CONFIRM_EMPLOYMENT_PATH}`)}>
                        Подтвердить трудоустройство
                    </button>
                )
            )}
            <br />
            {profile?.hasCrateVacancy || profile?.activeConfirm ? (
                <button
                    onClick={async () => {
                        await fetch(`${API_PREFIX}/delete-confirm-employment`, {
                            method: "DELETE",
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                            },
                        })

                        getProfile().then(profileData => setProfile(profileData))
                    }}
                >
                    Удалить подтверждение о трудоустройстве
                </button>
            ) : null}
            <br/><br/>

            {profile?.createdVacancies && profile.createdVacancies.length !== 0 ? (
                <>
                    Открытые вакансии, созданные вами:
                    {profile.createdVacancies.map(({ id, city, description }) => {
                        return (
                            <li key={ id }>
                                {description}, 
                                {city}
                                <button onClick={ () => navigate(`/${generatePath(DEAL_PATH, { id })}`) } >
                                    Посмотреть детали
                                </button>
                            </li>
                        )
                    })}
                    <br/><br/>
                </>
            ) : null}

            {profile?.assignedVacancies && profile.assignedVacancies.length !== 0 ? (
                <>
                    Активные вакансии, на которые вы откликнулись:
                    {profile.assignedVacancies.map(({ id, city, description, company }) => {
                        return (
                            <li key={ id }>
                                {description}, 
                                {company},
                                {city}
                                <button onClick={ () => navigate(`/${generatePath(DEAL_PATH, { id })}`) } >
                                    Посмотреть детали
                                </button>
                            </li>
                        )
                    })}
                    <br/><br/>
                </>
            ) : null}

            <button
                onClick={() => {
                    localStorage.removeItem('accessToken');
                    location.href = '/';
                }}
            >
                Выйти
            </button>
        </>
    );
}
