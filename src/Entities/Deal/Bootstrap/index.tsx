import { JSX } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { Deal } from "../Entities/Deal";

export function DealPage (): JSX.Element {
    const hasAccess = localStorage.getItem('accessToken')
    const COMPONENT = hasAccess ? <Deal /> : <Navigate to='..' replace />

    return COMPONENT;
}
