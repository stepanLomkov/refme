import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "src/Common/Components/Button";
import { API_PREFIX, GENERAL_COLOR } from "src/Common/Consts";
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
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: '100px', maxWidth: '500px' }}>
            <b style={{ color: GENERAL_COLOR, fontSize: '20px' }}>Создание вакансии</b>
            <br /><br />

            <b style={{ color: GENERAL_COLOR }}>Краткое описание</b>
            <input style={{ height: '25px' }} onChange={(e) => {
                setDescription(e.target.value);
            }} />
            <br />

            <b style={{ color: GENERAL_COLOR }}>Город</b>
            <input style={{ height: '25px' }} onChange={(e) => {
                setCity(e.target.value);
            }} />
            <br />

            <b style={{ color: GENERAL_COLOR }}>Подробная информация о вакансии</b>
            <textarea style={{ height: '300px' }} onChange={(e) => {
                setMore(e.target.value);
            }} />
            <br />

            Доказательство возможности рекомендации (например скриншот из реферальной программы)
            <br />
            <input className="custom-file-upload" type="file" onChange={(e) => {
                setFile(e.target.files[0]);
            } }/>
            <br /><br />

            {hasErrors ? (
                <>
                    <span style={{ color: 'red' }}>Заполните все поля для отправки запроса!</span>
                    <br />
                </>
            ) : null}

            <Button onClick={ handleConfirm }>
                Отправить на проверку
            </Button>
        </div>
    );
}
