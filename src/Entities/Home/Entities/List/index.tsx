import { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { DETAILS_PATH } from "../../Bootstrap/Pages/Details/Path";
import { API_PREFIX } from "src/Common/Consts";

export default function List (): JSX.Element {
    const navigate = useNavigate();
    const [date, setData] = useState([]);
    const [descriptionFilter, setDescriptionFilter] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');

    const loadList = async () => {
        const params = !!descriptionFilter || !!companyFilter || !!cityFilter ? new URLSearchParams({
            description: descriptionFilter,
            company: companyFilter,
            city: cityFilter,
        }) : null;

        const response = await fetch(`${API_PREFIX}/list${params ? `?${params}` : ''}`, {
            method: "GET"
        })

        const data = await response.json();

        return data
    }

    useEffect(() => {        
        loadList().then(listData => setData(listData))
    }, []);

    const handleClick = (id) => {
        navigate(generatePath(DETAILS_PATH, { id }));
    }

    const updateFiltersHandle = () => {
        loadList().then(listData => setData(listData));
    }

    return (
        <>
            Устройтесь на работу мечты уже сегодня.
            <br />

            Поиск по описанию
            <input onChange={ (e) => setDescriptionFilter(e.target.value)}/>
            <br />

            Компания
            <input onChange={ (e) => setCompanyFilter(e.target.value)}/>
            <br />

            Город
            <input onChange={ (e) => setCityFilter(e.target.value)}/>
            <br />

            <button onClick={ updateFiltersHandle }>
                Обновить фильтрацию          
            </button>
            <br />

            <ul>
                {date.length === 0 && 'нет данных'}
                {date?.map(({ _id, city, company, description }) => {
                    return (
                        <li key={ _id }>
                            {company}
                            {description}
                            {city}
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
