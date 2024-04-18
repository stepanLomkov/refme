import { JSX } from "react/jsx-runtime";
import { Auth } from "../Entities/Auth";

// сделать React.lazy
export function AuthPage (): JSX.Element {
    return <Auth />;
}
