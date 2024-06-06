import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { API_PREFIX } from "src/Common/Consts";
import { PROFILE_PATH } from "src/Entities/Profile/Bootstrap/Path";

export function ConfirmEmployment (): JSX.Element {
    const navigate = useNavigate();
    const [company, setCompany] = useState();
    const [phone, setPhone] = useState();
    const [file, setFile] = useState();
    const [hasErrors, setErrors] = useState(false)

    const handleConfirm = () => {
        if (!company || !phone || !file) {
            setErrors(true);
            return;
        }

        setErrors(false);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('company', company);
        formData.append('phone', phone);

        const confirm = async () => {
            await fetch(`${API_PREFIX}/confirm-employment`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: formData,
            })

            navigate(`/${PROFILE_PATH}`);
        }

        confirm();
    }

    return (
        <>
            Форма подтверждения трудоустройства
            <br /><br />

            {hasErrors ? (
                <>
                    <span style={{ color: 'red' }}>Заполните все поля для отправки запроса!</span>
                    <br /><br />
                </>
            ) : null}

            Компания
            <input onChange={(e) => {
                setCompany(e.target.value);
            }} />
            <br /><br />

            Контактный телефон 
            <input onChange={(e) => {
                setPhone(e.target.value);
            }}/>
            <br /><br />

            Доказательство трудоустройства (например трудовой договор)
            <br />
            <input type="file" onChange={(e) => {
                setFile(e.target.files[0]);
            } }/>
            <br /><br />

            <button onClick={ handleConfirm }>
                Отправить запрос на подтверждение
            </button>
        </>
    )
}
