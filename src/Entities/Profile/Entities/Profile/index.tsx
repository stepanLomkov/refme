import { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { Button } from "src/Common/Components/Button";
import { API_PREFIX, GENERAL_COLOR } from "src/Common/Consts";
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
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: '30px', maxWidth: '500px', alignItems: 'center', fontSize: '18px' }}>
            <div><span style={{ color: GENERAL_COLOR }}>Логин аккаунта:</span> {profile?.login}</div> <br />

            {profile?.isAdmin ? (
                <>
                    <Button
                        onClick={() => {
                            navigate(`/${ADMIN_PANEL_PATH}`);
                        }}
                    >
                        Панель администратора
                    </Button> 
                    <br/>
                </>
            ) : null}

            <div><span style={{ color: GENERAL_COLOR }}>Возможность создавать вакансии:</span> {profile?.hasCrateVacancy ? 'есть' : 'нет'}</div> <br />

            {profile?.company ? (
                <div><span style={{ color: GENERAL_COLOR }}>Ваша компания:</span> {profile.company}<br /></div> 
            ) : null}

            {profile?.hasCrateVacancy ? (
                <Button
                    onClick={() => {
                        navigate(`/${CREATE_PATH}`);
                    }}
                >
                    Создать вакансию
                </Button> 
            ) : (
                profile?.activeConfirm ? (
                    <>Ваш запрос на возможность создания заявок на рассмотрении, ожидайте</>
                ) : (
                    <Button onClick={() => navigate(`/${CONFIRM_EMPLOYMENT_PATH}`)}>
                        Подтвердить трудоустройство
                    </Button>
                )
            )}
            <br />

            {profile?.hasCrateVacancy || profile?.activeConfirm ? (
                <Button
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
                </Button>
            ) : null}
            <br/>

            {profile?.createdVacancies && profile.createdVacancies.length !== 0 ? (
                <>
                    Вакансии, созданные вами:
                    {profile.createdVacancies.map(({ id, city, description }) => {
                        return (
                            <div key={ id } onClick={ () => navigate(`/${generatePath(DEAL_PATH, { id })}`) } style={{ width: '100%', padding: '4px', margin: '6px 0', fontSize: '16px', color: GENERAL_COLOR, backgroundColor: '#D8BFD8', fontWeight: 600 }} >
                                {`Название: ${description}`}<br />
                                {`Город: ${city}`}<br />
                            </div>
                        )
                    })}
                    <br/>
                </>
            ) : null}

            {profile?.assignedVacancies && profile.assignedVacancies.length !== 0 ? (
                <>
                    Активные вакансии, на которые вы откликнулись:
                    {profile.assignedVacancies.map(({ id, city, description, company }) => {
                        return (
                            <div key={ id } onClick={ () => navigate(`/${generatePath(DEAL_PATH, { id })}`) } style={{ width: '100%', padding: '4px', margin: '6px 0', fontSize: '16px', color: GENERAL_COLOR, backgroundColor: '#D8BFD8', fontWeight: 600 }} >
                                {`Название: ${description}`}<br />
                                {`Компания: ${company}, Город: ${city}`}<br />
                            </div>
                        )
                    })}
                    <br/>
                </>
            ) : null}

            <Button
                onClick={() => {
                    localStorage.removeItem('accessToken');
                    location.href = '/';
                }}
            >
                Выйти
            </Button>
        </div>
    );
}
