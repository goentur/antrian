import { SVGAttributes } from 'react';
import iconAplication from "../assets/images/logo/logo.webp";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <img src={iconAplication} className='img-fluid col-lg-3 mb-3' alt="Icon Aplication"/>
    );
}
