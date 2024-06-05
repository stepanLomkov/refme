import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_PREFIX } from "src/Common/Consts";
import { PROFILE_PATH } from "src/Entities/Profile/Bootstrap/Path";

export function Create (): JSX.Element {
    const navigate = useNavigate();
    const [description, setDescription] = useState();
    const [city, setCity] = useState();
    const [more, setMore] = useState();
    const [file, setFile] = useState();
    const [hasErrors, setErrors] = useState(false)

    const handleConfirm = () => {
        if (!description || !city || !more || !file) {
            setErrors(true);
            return;
        }

        setErrors(false);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        formData.append('city', city);
        formData.append('more', more);

        const confirm = async () => {
            await fetch(`${API_PREFIX}/create-vacancy`, {
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
            Создание вакансии
            <br /><br />

            {hasErrors ? (
                <>
                    <span style={{ color: 'red' }}>Заполните все поля для отправки запроса!</span>
                    <br /><br />
                </>
            ) : null}

            Краткое описание
            <input onChange={(e) => {
                setDescription(e.target.value);
            }} />
            <br /><br />

            Город
            <input onChange={(e) => {
                setCity(e.target.value);
            }} />
            <br /><br />

            Подробная информация о вакансии<br />
            <textarea onChange={(e) => {
                setMore(e.target.value);
            }} />
            <br /><br />

            Доказательство возможности рекомендации (например скриншот из реферальной программы)
            <br />
            <input type="file" onChange={(e) => {
                setFile(e.target.files[0]);
            } }/>
            <br /><br />

            <button onClick={ handleConfirm }>
                Отправить на проверку
            </button>
        </>
    );
}
