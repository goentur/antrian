import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div style={{height:'90vh'}} className="d-flex justify-content-center">
            <div className="col-3 align-self-center text-center card">
                <div className="card-body">
                    <Link href="/"><ApplicationLogo className="col-3" /></Link>
                    {children}
                </div>
            </div>
        </div>
    );
}
