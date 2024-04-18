import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { AuthPage } from "src/Entities/Auth/Bootstrap";
import { AUTH_PATH } from "src/Entities/Auth/Bootstrap/Path";
import { HomePage } from "src/Entities/Home/Bootstrap";
import { HOME_PATH } from "src/Entities/Home/Bootstrap/Path";
import { ProfilePage } from "src/Entities/Profile/Bootstrap";
import { PROFILE_PATH } from "src/Entities/Profile/Bootstrap/Path";

/** Основной лайаут приложения. */
export function MainLayout (): JSX.Element {
    const navigate = useNavigate();

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'x-large' }}>
                <span onClick={() => window.location.href = '/'}>RefJob</span>
                {localStorage.getItem('accessToken') ? <button onClick={ () => navigate(PROFILE_PATH) }>Профиль</button> : null}
            </div>
            
            <Routes>
                <Route element={ <Navigate to={ HOME_PATH } replace /> } index />
                <Route element={ <HomePage /> } path={ `/${HOME_PATH}/*` } />
                <Route element={ <AuthPage /> } path={ AUTH_PATH } />
                <Route element={ <ProfilePage /> } path={ PROFILE_PATH } />
            </Routes>
        </>
    );
}