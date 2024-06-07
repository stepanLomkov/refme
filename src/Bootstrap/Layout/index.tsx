import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { Button } from "src/Common/Components/Button";
import { GENERAL_COLOR } from "src/Common/Consts";
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
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'xxx-large',  height: '50px', color: GENERAL_COLOR }}>
                <b onClick={() => window.location.href = '/'}>RefMe</b>
                {localStorage.getItem('accessToken') ?
                    <Button onClick={ () => navigate(PROFILE_PATH) } >
                        Профиль
                    </Button>
                    :
                    <Button onClick={ () => navigate(AUTH_PATH)}>
                        Зарегистрироваться или войти
                    </Button>
                }
            </div>

            <style>{'.custom-file-upload { display: inline-block; padding: 6px 12px; cursor: pointer; background-color: #D8BFD8; border: 1px solid #ccc; border-radius: 4px; }'}</style>

            <div style={{ justifyContent: 'center', display: 'flex' }}>
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
            </div>  
        </>
    );
}