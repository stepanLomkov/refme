import { JSX } from "react/jsx-runtime";
import { ConfirmEmployment } from "../Entities/ConfirmEmployment";
import { Navigate } from "react-router-dom";

export function ConfirmEmploymentPage (): JSX.Element {
    const hasAccess = localStorage.getItem('accessToken')
    const COMPONENT = hasAccess ? <ConfirmEmployment /> : <Navigate to='..' replace />

    return COMPONENT;
}
