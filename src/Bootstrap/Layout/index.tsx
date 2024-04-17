import { Navigate, Route, Routes } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { HomePage } from "src/Entities/Home/Bootstrap";
import { HOME_PATH } from "src/Entities/Home/Bootstrap/Path";

/** Основной лайаут приложения. */
export function MainLayout (): JSX.Element {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: 'x-large' }}>RefJob</div>
            <Routes>
                <Route element={ <Navigate to={ HOME_PATH } replace /> } index />
                <Route element={ <HomePage /> } path={ `/${HOME_PATH}/*` } />
            </Routes>
        </>
    );
}