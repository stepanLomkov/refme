import { BrowserRouter as Router } from 'react-router-dom';
import { MainLayout } from './Layout';
import { JSX } from 'react/jsx-runtime';

/** Роутер приложения. */
export function RouterApp (): JSX.Element {
    return (
        <Router>
            <MainLayout />
        </Router>
    );
}
