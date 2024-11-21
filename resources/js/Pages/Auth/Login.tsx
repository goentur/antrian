import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { FaArrowRightToBracket, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const [showPassword, setShowPassword] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk" />            
            <form className="text-start" onSubmit={submit}>
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
                <Form.Group className="mb-3" controlId="validationFormPassword">
                    <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                    <InputGroup>
                        <Form.Control
                            type={showPassword?"text":"password"}
                            placeholder="Masukan password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            required
                        />
                        <div className="input-group-text" onClick={() => setShowPassword(!showPassword)}>{showPassword?<FaRegEyeSlash/>:<FaRegEye/>}</div>
                    </InputGroup>
                </Form.Group>
                {canResetPassword && (
                    <Link href={route('password.request')} className="text-decoration-none float-end text-reset">Lupa Password?</Link>
                )}
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" name="remember" onChange={(e) => setData("remember", data.remember?false:true)} label="Ingat Saya" />
                </Form.Group>
                <Button type='submit' disabled={processing}>{processing?<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>:<FaArrowRightToBracket/>} Masuk</Button>
                {status && <div className="mb-3 f-14 text-success float-end">{status}</div>}
            </form>
        </GuestLayout>
    );
}
