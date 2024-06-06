import { useState } from "react";
import { useParams } from "react-router-dom";
import { API_PREFIX } from "src/Common/Consts";

export function ApproveRegistration ({ clientInfo, onSucces }) {
    const { id } = useParams();
    const [hasErrors, setErrors] = useState();
    const [file, setFile] = useState();

    const handleSend = () => {
        if (!file) {
            setErrors(true);
            return;
        }

        setErrors(false);

        const formData = new FormData();
        formData.append('file', file);

        const send = async () => {
            await fetch(`${API_PREFIX}/approve-registration/${id}`, {
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
            Внесите следующие данные в реферальную программу вашей компании:<br /><br />

            Фамилия: {clientInfo?.familyName}
            <br /><br />

            Имя: {clientInfo?.firstName}
            <br /><br />

            Отчество: {clientInfo?.lastName}
            <br /><br />

            Дата рождения: {clientInfo?.dateOfBorn}
            <br /><br />

            Контактный телефон +7 {clientInfo?.phone}
            <br /><br />

            <a href={`${API_PREFIX}/download/${clientInfo?.cv}`} download>
                Резюме
            </a>
            <br /><br />

            Если данные введены неккоректно, то оставьте жалобу
            <input />
            <br />
            <button>
                Пожаловаться
            </button>
            <br /><br />

            Если все данные корректны и вы внесли их в реферальную программу вашей компании, то предоставьте доказательства этого (например скрин с отправленным запросом) и отправьте форму
            <br /><br />

            {hasErrors ? (
                <>
                    <span style={{ color: 'red' }}>Заполните все поля для отправки запроса!</span>
                    <br /><br />
                </>
            ) : null}

            доказательства
            <br />
            <input type="file" onChange={(e) => {
                setFile(e.target.files[0]);
            } }/>
            <br /><br />

            <button onClick={ handleSend } >
                Отправить форму
            </button>
        </>
    );
}