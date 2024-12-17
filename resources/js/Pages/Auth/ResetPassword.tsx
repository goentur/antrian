import NewPasswordInfo from '@/Components/Info/NewPasswordInfo';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { FaRegEye, FaRegEyeSlash, FaRegPaperPlane } from 'react-icons/fa6';

export default function ResetPassword({ token, email }: { token: string, email: string }) {
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Mengatur Ulang Password" />
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
                        readOnly
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
                            isInvalid={!!errors.password}
                            autoComplete="off"
                            required
                        />
                        <div className="input-group-text" onClick={() => setShowPassword(!showPassword)}>{showPassword?<FaRegEyeSlash/>:<FaRegEye/>}</div>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                    <NewPasswordInfo/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationFormUlangi Password">
                    <Form.Label>Ulangi Password <span className="text-danger">*</span></Form.Label>
                    <InputGroup>
                        <Form.Control
                            type={showPasswordConfirmation?"text":"password"}
                            placeholder="Ulangi Password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            isInvalid={!!errors.password_confirmation}
                            autoComplete="off"
                            required
                        />
                        <div className="input-group-text" onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}>{showPasswordConfirmation?<FaRegEyeSlash/>:<FaRegEye/>}</div>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                        {errors.password_confirmation}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type='submit' disabled={processing}>{processing?<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>:<FaRegPaperPlane/>} Mengatur Ulang Password</Button>
            </form>
        </GuestLayout>
    );
}
