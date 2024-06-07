import { useState } from "react";
import { JSX } from "react/jsx-runtime";
import { Button } from "src/Common/Components/Button";
import { API_PREFIX, GENERAL_COLOR } from "src/Common/Consts";

export function Auth (): JSX.Element {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = () => {
        const loginUser = async () => {
            const urlencoded = new URLSearchParams();
            urlencoded.append("login", login);
            urlencoded.append("password", password);

            const response = await fetch(`${API_PREFIX}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlencoded,
            })
    
            const data = await response.json();

            return data
        }
        
        loginUser().then(data => {
            if (data?.message === 'Login successfull' && data?.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                location.href = document.referrer;
            }
        })

        
    }

    const handleRegisterClick = () => {
        const loginUser = async () => {
            const urlencoded = new URLSearchParams();
            urlencoded.append("login", login);
            urlencoded.append("password", password);

            const response = await fetch(`${API_PREFIX}/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlencoded,
            })
    
            const data = await response.json();

            return data
        }
        
        loginUser()
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: '100px', maxWidth: '500px' }}>
            <b style={{ color: GENERAL_COLOR, fontSize: '20px' }}>Логин</b> <input style={{ height: '25px' }} onBlur={(e) => setLogin(e.target.value)} />
            <br />
            <b style={{ color: GENERAL_COLOR, fontSize: '20px' }}>Пароль</b> <input style={{ height: '25px' }} onBlur={(e) => setPassword(e.target.value)} type="password" />
            <br />

            <Button onClick={ handleLoginClick } >
                Войти
            </Button>

            <br />

            <Button onClick={ handleRegisterClick }>
                Зарегистрироваться
            </Button>
        </div>
    );
}
