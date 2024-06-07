import { JSX } from "react/jsx-runtime";
import { CONFIRM_EMPLOYMENT_PATH } from "../ConfirmEmployment/Path";
import { useNavigate } from "react-router-dom";
import { CONFIRM_CREATE_VACANCY_PATH } from "../ConfirmCreateVacancy/Path";
import { REPORTS_PATH } from "../Reports.tsx/Path";
import { Button } from "src/Common/Components/Button";
import { GENERAL_COLOR } from "src/Common/Consts";

export function Main (): JSX.Element {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: '100px', maxWidth: '500px' }}>
            <b style={{ color: GENERAL_COLOR, fontSize: '20px' }}>Панель администратора</b>
            <br /><br />

            <Button
                onClick={() => {
                    navigate(CONFIRM_EMPLOYMENT_PATH);
                }}
            >
                Подтверждение трудоустройства
            </Button>
            <br /><br />

            <Button
                onClick={() => {
                    navigate(CONFIRM_CREATE_VACANCY_PATH);
                }}
            >
                Подтверждение создаваемой вакансии
            </Button>
            <br /><br />

            <Button
                onClick={() => {
                    navigate(REPORTS_PATH);
                }}
            >
                Жалобы
            </Button>
        </div>
    );
}
