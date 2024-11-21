import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FaArrowRightFromBracket, FaRegPaperPlane } from 'react-icons/fa6';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi email" />
            <form className="text-start" onSubmit={submit}>
                Terima kasih telah mendaftar! Sebelum memulai, bisakah Anda memverifikasi alamat email Anda dengan mengklik tautan yang baru saja kami kirimkan ke email Anda? Jika Anda tidak menerima email tersebut, kami dengan senang hati akan mengirimkan email lainnya kepada Anda.

                {status === 'verification-link-sent' && (
                    <div className="mb-3 text-success">
                        Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran.
                    </div>
                )}

                <div className="mt-3">
                    <Button type='submit' disabled={processing} className='float-start'>{processing?<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>:<FaRegPaperPlane/>} Kirim Ulang Email verifikasi</Button>
                    <Link href={route('logout')} method="post" className="btn btn-danger float-end"><FaArrowRightFromBracket/> Keluar</Link>
                </div>
            </form>
        </GuestLayout>
    );
}
