import { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { DETAILS_PATH } from "../../Bootstrap/Pages/Details/Path";
import { API_PREFIX } from "src/Common/Consts";

export default function List (): JSX.Element {
    const navigate = useNavigate();
    const [date, setData] = useState([]);

    useEffect(() => {
        const loadList = async () => {
            const response = await fetch(`${API_PREFIX}/list`, {
                method: "GET"
            })
    
            const data = await response.json();

            return data
        }
        
        loadList().then(listData => setData(listData))
    }, []);

    const handleClick = (id) => {
        navigate(generatePath(DETAILS_PATH, { id }));
    }

    return (
        <>
            Устройтесь на работу мечты уже сегодня.

            <ul>
                {date?.map(({ _id, title, description }) => {
                    return (
                        <li key={ _id }>
                            {title}
                            {description}
                            <button onClick={ () => handleClick(_id) } >
                                Посмотреть детали
                            </button>
                        </li>
                    )
                })}
            </ul>
        </>
    );
}
