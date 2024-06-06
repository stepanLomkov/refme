import { JSX } from "react/jsx-runtime";
import { CONFIRM_EMPLOYMENT_PATH } from "../ConfirmEmployment/Path";
import { useNavigate } from "react-router-dom";
import { CONFIRM_CREATE_VACANCY_PATH } from "../ConfirmCreateVacancy/Path";
import { REPORTS_PATH } from "../Reports.tsx/Path";

export function Main (): JSX.Element {
    const navigate = useNavigate();

    return (
        <>
            Панель администратора
            <br /><br />

            <button
                onClick={() => {
                    navigate(CONFIRM_EMPLOYMENT_PATH);
                }}
            >
                Подтверждение трудоустройства
            </button>
            <br /><br />

            <button
                onClick={() => {
                    navigate(CONFIRM_CREATE_VACANCY_PATH);
                }}
            >
                Подтверждение создаваемой вакансии
            </button>
            <br /><br />

            <button
                onClick={() => {
                    navigate(REPORTS_PATH);
                }}
            >
                Жалобы
            </button>
            <br /><br />
        </>
    );
}
