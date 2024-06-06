import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { AdminPanelPage } from "src/Entities/AdminPanel/Bootstrap";
import { ADMIN_PANEL_PATH } from "src/Entities/AdminPanel/Bootstrap/Path";
import { AuthPage } from "src/Entities/Auth/Bootstrap";
import { AUTH_PATH } from "src/Entities/Auth/Bootstrap/Path";
import { ConfirmEmploymentPage } from "src/Entities/ConfirmEmployment/Bootstrap";
import { CONFIRM_EMPLOYMENT_PATH } from "src/Entities/ConfirmEmployment/Bootstrap/Path";
import { CreatePage } from "src/Entities/Create/Bootstrap";
import { CREATE_PATH } from "src/Entities/Create/Bootstrap/Path";
import { DealPage } from "src/Entities/Deal/Bootstrap";
import { DEAL_PATH } from "src/Entities/Deal/Bootstrap/Path";
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
                <span onClick={() => window.location.href = '/'}>RefMe</span>
                {localStorage.getItem('accessToken') ?
                    <button onClick={ () => navigate(PROFILE_PATH) }>
                        Профиль
                    </button>
                    :
                    <button onClick={ () => navigate(AUTH_PATH)}>
                        Зарегистрироваться или войти
                    </button>
                }
            </div>
            
            <Routes>
                <Route element={ <Navigate to={ HOME_PATH } replace /> } index />
                <Route element={ <HomePage /> } path={ `/${HOME_PATH}/*` } />
                <Route element={ <AuthPage /> } path={ AUTH_PATH } />
                <Route element={ <ProfilePage /> } path={ PROFILE_PATH } />
                <Route element={ <ConfirmEmploymentPage /> } path={ CONFIRM_EMPLOYMENT_PATH } />
                <Route element={ <AdminPanelPage /> } path={ `${ADMIN_PANEL_PATH}/*` } />
                <Route element={ <CreatePage /> } path={ CREATE_PATH } />
                <Route element={ <DealPage /> } path={ DEAL_PATH } />
            </Routes>
        </>
    );
}