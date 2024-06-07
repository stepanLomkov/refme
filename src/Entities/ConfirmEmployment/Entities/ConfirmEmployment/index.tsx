import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { Button } from "src/Common/Components/Button";
import { API_PREFIX, GENERAL_COLOR } from "src/Common/Consts";
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
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: '100px', maxWidth: '500px' }}>
            <b style={{ color: GENERAL_COLOR, fontSize: '20px' }}>Форма подтверждения трудоустройства</b>
            <br /><br />

            <b style={{ color: GENERAL_COLOR }}>Компания</b>
            <input style={{ height: '25px' }} onChange={(e) => {
                setCompany(e.target.value);
            }} />
            <br /><br />
 
            <b style={{ color: GENERAL_COLOR }}>Контактный телефон</b>
            <input style={{ height: '25px' }} onChange={(e) => {
                setPhone(e.target.value);
            }}/>
            <br /><br />

            Доказательство трудоустройства (например трудовой договор)
            <br />
            <input className="custom-file-upload" type="file" onChange={(e) => {
                setFile(e.target.files[0]);
            } }/>
            <br /><br />

            {hasErrors ? (
                <>
                    <span style={{ color: 'red' }}>Заполните все поля для отправки запроса!</span>
                    <br /><br />
                </>
            ) : null}

            <Button onClick={ handleConfirm }>
                Отправить запрос на подтверждение
            </Button>
        </div>
    )
}
