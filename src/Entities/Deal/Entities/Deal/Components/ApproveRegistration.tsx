import { useState } from "react";
import { useParams } from "react-router-dom";
import { API_PREFIX, GENERAL_COLOR } from "src/Common/Consts";
import { Report } from "./Report";
import { Button } from "src/Common/Components/Button";

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

            <div><span style={{ color: GENERAL_COLOR }}>Фамилия: </span>{clientInfo?.familyName}</div>
            <br />
            
            <div><span style={{ color: GENERAL_COLOR }}>Имя: </span>{clientInfo?.firstName}</div>
            <br />

            <div><span style={{ color: GENERAL_COLOR }}>Отчество: </span>{clientInfo?.lastName}</div>
            <br />

            <div><span style={{ color: GENERAL_COLOR }}>Дата рождения: </span>{clientInfo?.dateOfBorn}</div>
            <br />

            <div><span style={{ color: GENERAL_COLOR }}>Контактный телефон: </span>{clientInfo?.phone}</div>
            <br />

            <a href={`${API_PREFIX}/download/${clientInfo?.cv}`} download>
                Резюме
            </a>
            <br /><br />

            Если данные введены неккоректно, то оставьте жалобу<br />
            <Report />
            <br />

            Если все данные корректны и вы внесли их в реферальную программу вашей компании, то предоставьте доказательства этого (например скрин с отправленным запросом) и отправьте форму
            <br /><br />
            
            

            <input className="custom-file-upload" type="file" onChange={(e) => {
                setFile(e.target.files[0]);
            } }/>

            {hasErrors ? (
                <>
                    <br />
                    <span style={{ color: 'red' }}>Прикрепите файл для отправки запроса!</span>
                </>
            ) : null}
            <br /><br />

            <Button onClick={ handleSend } >
                Отправить форму
            </Button>
        </>
    );
}