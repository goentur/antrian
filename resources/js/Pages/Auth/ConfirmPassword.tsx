import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { FaArrowRightFromBracket, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

export default function ConfirmPassword() {
    const [showPassword, setShowPassword] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Konfirmasi Password" />
            <form  onSubmit={submit}>
                Ini adalah area aplikasi yang aman. Harap konfirmasi kata sandi Anda sebelum melanjutkan.
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
                </Form.Group>
                <Button type='submit' disabled={processing}>{processing?<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>:<FaArrowRightFromBracket/>} Masuk</Button>
            </form>
        </GuestLayout>
    );
}
