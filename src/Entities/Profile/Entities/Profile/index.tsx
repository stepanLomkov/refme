import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { API_PREFIX } from "src/Common/Consts";

export function Profile (): JSX.Element {
    const [profile, setProfile] = useState();

    useEffect(() => {
        const getProfile = async () => {
            const response = await fetch(`${API_PREFIX}/profile`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
    
            const data = await response.json();

            return data
        }

        getProfile().then(profileData => setProfile(profileData))
    }, []);

    return (
        <>
            {JSON.stringify(profile)}
        </>
    );
}
