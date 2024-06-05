import { useState } from "react";
import { JSX } from "react/jsx-runtime";
import { API_PREFIX } from "src/Common/Consts";

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
        <>
            Логин <input onBlur={(e) => setLogin(e.target.value)} />
            <br />
            Пароль <input onBlur={(e) => setPassword(e.target.value)} type="password" />
            <br />

            <button onClick={ handleLoginClick } >
                Войти
            </button>
            <br />

            <button onClick={ handleRegisterClick }>
                Зарегистрироваться
            </button>
        </>
    );
}
