import { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { DETAILS_PATH } from "../../Bootstrap/Pages/Details/Path";
import { API_PREFIX, GENERAL_COLOR } from "src/Common/Consts";
import { Button } from "src/Common/Components/Button";

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
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: '30px', maxWidth: '500px', alignItems: 'center' }}>
            <b style={{ fontSize: '24px', color: GENERAL_COLOR }}>Устройтесь на работу мечты уже сегодня.</b>
            <br />

            <div style={{ display: 'flex', flexDirection: 'row', gap: '50px 10px' }}>
                <div>
                    <b style={{ color: GENERAL_COLOR, fontSize: '20px' }}>Название</b>
                    <input style={{ height: '25px' }} onChange={ (e) => setDescriptionFilter(e.target.value)}/>
                </div>

                <div>
                    <b style={{ color: GENERAL_COLOR, fontSize: '20px' }}>Компания</b>
                    <input style={{ height: '25px' }} onChange={ (e) => setCompanyFilter(e.target.value)}/>
                </div>

                <div>
                    <b style={{ color: GENERAL_COLOR, fontSize: '20px' }}>Город работы</b>
                    <input style={{ height: '25px' }} onChange={ (e) => setCityFilter(e.target.value)}/>
                </div>
            </div>
            <br />

            <Button onClick={ updateFiltersHandle }>
                Обновить фильтрацию          
            </Button>

            <br />

            {date.length === 0 && <div style={{ fontSize: '18px', color: GENERAL_COLOR, fontWeight: 600 }}>нет данных</div>}
            {date?.map(({ _id, city, company, description }) => {
                return (
                    <div key={ _id } onClick={ () => handleClick(_id) } style={{ width: '100%', padding: '4px', margin: '6px 0', fontSize: '16px', color: GENERAL_COLOR, backgroundColor: '#D8BFD8', fontWeight: 600 }} >
                        {`Название: ${description}`}<br />
                        {`Компания: ${company}, Город: ${city}`}<br />
                    </div>
                )
            })}
        </div>
    );
}
