import { JSX } from "react/jsx-runtime";
import { ListPage } from './Pages/ListPage';
import { Route, Routes } from "react-router-dom";
import { DetailsPage } from "./Pages/Details";
import { DETAILS_PATH } from "./Pages/Details/Path";

export function HomePage (): JSX.Element {
    return (
        <Routes>
            <Route element={ <ListPage /> } index />
            <Route element={ <DetailsPage /> } path={ `${DETAILS_PATH}/*`} />
        </Routes>
    );
}
