import { SVGAttributes } from 'react';
import iconAplication from "../assets/images/logo/icon.png";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <img src={iconAplication} className='img-fluid col-lg-4 mb-3' alt="Icon Aplication"/>
    );
}
