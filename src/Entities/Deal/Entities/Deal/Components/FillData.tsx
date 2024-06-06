import { useState } from "react";
import { useParams } from "react-router-dom";
import { API_PREFIX } from "src/Common/Consts";

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

            Фамилия
            <input onChange={(e) => {
                setFamilyName(e.target.value);
            }} />
            <br /><br />

            Имя
            <input onChange={(e) => {
                setFirstName(e.target.value);
            }} />
            <br /><br />

            Отчество
            <input onChange={(e) => {
                setLastName(e.target.value);
            }} />
            <br /><br />

            Дата рождения
            <input onChange={(e) => {
                setDateOfBorn(e.target.value);
            }} />
            <br /><br />

            Контактный телефон
            <input onChange={(e) => {
                setPhone(e.target.value);
            }}/>
            <br /><br />

            Резюме
            <br />
            <input type="file" onChange={(e) => {
                setFile(e.target.files[0]);
            } }/>
            <br /><br />

            <button onClick={ handleSend }>
                Отправить данные
            </button>
        </>
    );
}