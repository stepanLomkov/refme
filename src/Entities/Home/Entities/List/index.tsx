import { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { DETAILS_PATH } from "../../Bootstrap/Pages/Details/Path";

export default function List (): JSX.Element {
    const navigate = useNavigate();
    const [date, setData] = useState([]);

    useEffect(() => {
        setData(
            [
                {
                    id: '1',
                    title: 'Uber',
                    description: 'Team Lead, Inside Sales - Uber Eats London',
                },
                {
                    id: '2',
                    title: 'Uber',
                    description: 'Team Lead, Inside Sales - Uber Eats London',
                },
                {
                    id: '3',
                    title: 'Uber',
                    description: 'Team Lead, Inside Sales - Uber Eats London',
                },
                {
                    id: '4',
                    title: 'Uber',
                    description: 'Team Lead, Inside Sales - Uber Eats London',
                },
                {
                    id: '5',
                    title: 'Uber',
                    description: 'Team Lead, Inside Sales - Uber Eats London',
                },
            ]
        );
    }, []);

    const handleClick = (id) => {
        navigate(generatePath(DETAILS_PATH, { id }));
    }

    return (
        <>
            Устройтесь на работу мечты уже сегодня.

            <ul>
                {date.map(({ id, title, description }) => {
                    return (
                        <li key={ id } onClick={ () => handleClick(id) }>
                            {title}
                            {description}
                            <button>
                                Получить рефералку
                            </button>
                        </li>
                    )
                })}
            </ul>
        </>
    );
}
