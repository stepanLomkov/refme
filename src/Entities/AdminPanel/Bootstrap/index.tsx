import { JSX } from "react/jsx-runtime";
import { Navigate, Route, Routes } from "react-router-dom";
import { Main } from "../Entities/Main";
import { ConfirmEmployment } from "../Entities/ConfirmEmployment";
import { CONFIRM_EMPLOYMENT_PATH } from "../Entities/ConfirmEmployment/Path";
import { CONFIRM_CREATE_VACANCY_PATH } from "../Entities/ConfirmCreateVacancy/Path";
import { ConfirmCreateVacancy } from "../Entities/ConfirmCreateVacancy";

export function AdminPanelPage (): JSX.Element {
    const hasAccess = localStorage.getItem('accessToken')
    const COMPONENT = hasAccess ? <Main /> : <Navigate to='..' replace />

    return (
        <Routes>
            <Route element={ COMPONENT } index />
            <Route element={ <ConfirmEmployment /> } path={ CONFIRM_EMPLOYMENT_PATH } />
            <Route element={ <ConfirmCreateVacancy /> } path={ CONFIRM_CREATE_VACANCY_PATH } />
        </Routes>
    );
}
