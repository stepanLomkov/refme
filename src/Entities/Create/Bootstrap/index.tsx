import { JSX } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { Create } from "../Entities/Create";

export function CreatePage (): JSX.Element {
    const hasAccess = localStorage.getItem('accessToken')
    const COMPONENT = hasAccess ? <Create /> : <Navigate to='..' replace />

    return COMPONENT;
}
