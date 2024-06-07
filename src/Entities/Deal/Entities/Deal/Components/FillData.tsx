import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "src/Common/Components/Button";
import { API_PREFIX, GENERAL_COLOR } from "src/Common/Consts";

export function FillData ({ onSucces }) {
    const { id } = useParams();
    const [hasErrors, setErrors] = useState();
    const [familyName, setFamilyName] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [dateOfBorn, setDateOfBorn] = useState();
    const [phone, setPhone] = useState();
    const [file, setFile] = useState();

    const handleSend = () => {
        if (!familyName || !firstName || !lastName || !dateOfBorn || !phone || !file) {
            setErrors(true);
            return;
        }

        setErrors(false);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('familyName', familyName);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('dateOfBorn', dateOfBorn);
        formData.append('phone', phone);

        const send = async () => {
            await fetch(`${API_PREFIX}/send-data/${id}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: formData,
            })

            onSucces();
        }

        send();
    }
    
    return (
        <>
            Заполните следующие данные:
            <br /><br />

            {hasErrors ? (
                <>
                    <span style={{ color: 'red' }}>Заполните все поля для отправки запроса!</span>
                    <br /><br />
                </>
            ) : null}

            <b style={{ color: GENERAL_COLOR }}>Фамилия</b>
            <input style={{ height: '25px' }} onChange={(e) => {
                setFamilyName(e.target.value);
            }} />
            <br />

            <b style={{ color: GENERAL_COLOR }}>Имя</b>
            <input style={{ height: '25px' }} onChange={(e) => {
                setFirstName(e.target.value);
            }} />
            <br />

            <b style={{ color: GENERAL_COLOR }}>Отчество</b>
            <input style={{ height: '25px' }} onChange={(e) => {
                setLastName(e.target.value);
            }} />
            <br />

            <b style={{ color: GENERAL_COLOR }}>Дата рождения</b>
            <input style={{ height: '25px' }} onChange={(e) => {
                setDateOfBorn(e.target.value);
            }} />
            <br />

            <b style={{ color: GENERAL_COLOR }}>Контактный телефон</b>
            <input style={{ height: '25px' }} onChange={(e) => {
                setPhone(e.target.value);
            }}/>
            <br />

            <b style={{ color: GENERAL_COLOR }}>Резюме</b>
            <br />
            <input className="custom-file-upload" type="file" onChange={(e) => {
                setFile(e.target.files[0]);
            } }/>
            <br />

            <Button onClick={ handleSend }>
                Отправить данные
            </Button>
        </>
    );
}