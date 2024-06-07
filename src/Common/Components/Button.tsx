import { GENERAL_COLOR } from "../Consts";

export function Button ({ children, onClick }) {
    return (
        <button onClick={ onClick } style={{ appearance: 'none', border: 0, borderRadius: '5px', background: GENERAL_COLOR, color: '#fff', padding: '8px 16px', fontSize: '16px' }}>
            {children}
        </ button>
    );
}