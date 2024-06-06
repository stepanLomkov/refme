import { useState } from "react";
import { useParams } from "react-router-dom";
import { API_PREFIX } from "src/Common/Consts";

export function Report () {
    const { id } = useParams();
    const [text, setText] = useState();
    const [hasErrors, setErrors] = useState();
    const [hasSuccess, setSuccess] = useState();

    const handleReport = () => {
        if (!text) {
            setErrors(true)
        } else {
            setErrors(false)

            const formData = new FormData();
            formData.append('text', text);

            const send = async () => {
                await fetch(`${API_PREFIX}/send-report/${id}`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    body: formData,
                })

                setSuccess(true)
            }
    
            send();
        }
    }

    return (
        <>
            <input onChange={(e) => {
                setText(e.target.value);
            }} />

            <button onClick={ handleReport }>
                Пожаловаться
            </button>

            <br />

            {hasErrors ? (
                <>
                    <span style={{ color: 'red' }}>Заполните поле для отправки жалобы!</span>
                    <br /><br />
                </>
            ) : null}

            {hasSuccess ? (
                <>
                    <span style={{ color: 'green' }}>Жалоба отправлена</span>
                    <br /><br />
                </>
            ) : null}
        </>
    );
}