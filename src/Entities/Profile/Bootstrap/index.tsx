import { JSX } from "react/jsx-runtime";
import { Profile } from "../Entities/Profile";
import { Navigate } from "react-router-dom";

// сделать React.lazy
export function ProfilePage (): JSX.Element {
    const hasAccess = localStorage.getItem('accessToken')
    const COMPONENT = hasAccess ? <Profile /> : <Navigate to='..' replace />

    return COMPONENT;
}
