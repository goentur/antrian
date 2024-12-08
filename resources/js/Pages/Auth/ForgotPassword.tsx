import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FaRegPaperPlane } from 'react-icons/fa6';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Password" />

            <form className="text-start" onSubmit={submit}>
                <div className="f-14">Lupa kata sandi Anda? Tidak masalah. Cukup beri tahu kami alamat email Anda dan kami akan mengirimkan email berisi tautan pengaturan ulang kata sandi sehingga Anda dapat memilih yang baru.</div>
                <hr className='mt-1 mb-1 p-1' />
                <Form.Group className="mb-3" controlId="validationFormEmail">
                    <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Masukan email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        isInvalid={!!errors.email}
                        autoFocus
                        autoComplete="off"
                        required
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type='submit' disabled={processing}>{processing?<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>:<FaRegPaperPlane/>} Kirim</Button>
                {status && <div className="mb-3 f-14 text-success float-end">{status}</div>}
            </form>
        </GuestLayout>
    );
}
