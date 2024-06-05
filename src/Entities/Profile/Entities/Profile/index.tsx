import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { API_PREFIX } from "src/Common/Consts";
import { ADMIN_PANEL_PATH } from "src/Entities/AdminPanel/Bootstrap/Path";
import { CONFIRM_EMPLOYMENT_PATH } from "src/Entities/ConfirmEmployment/Bootstrap/Path";

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

            {profile?.haveCrateVacancy ? (
                <button>
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
            {profile?.haveCrateVacancy || profile?.activeConfirm ? (
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

            Текущие вакансии, на которые вы откликнулись:
            <br/><br/>

            Открытые вакансии, созданные вами:
            <br/><br/>

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
