import { JSX } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { AdminPanel } from "../Entities/AdminPanel";

export function AdminPanelPage (): JSX.Element {
    const hasAccess = localStorage.getItem('accessToken')
    const COMPONENT = hasAccess ? <AdminPanel /> : <Navigate to='..' replace />

    return COMPONENT;
}
