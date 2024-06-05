import { JSX } from "react/jsx-runtime";
import { CONFIRM_EMPLOYMENT_PATH } from "../ConfirmEmployment/Path";
import { useNavigate } from "react-router-dom";

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
        </>
    );
}
