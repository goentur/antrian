import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };
    const sendVerifiedEmail: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Informasi Profil</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Perbarui informasi profil dan alamat email akun Anda.
                </p>
            </header>
            {mustVerifyEmail && user.email_verified_at === null && (
                <div>
                    <p className="text-sm mt-2 text-red-600 dark:text-red-400">
                        Alamat email Anda belum diverifikasi.
                        <br />
                        <PrimaryButton className="mt-3" onClick={sendVerifiedEmail} disabled={processing}>Kirim Email verifikasi</PrimaryButton>
                    </p>

                    {status === 'verification-link-sent' && (
                        <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                            Tautan verifikasi baru telah dikirimkan ke alamat email Anda.
                        </div>
                    )}
                </div>
            )}
            <form onSubmit={submit} className={`mt-6 space-y-6 ${mustVerifyEmail && user.email_verified_at === null ? 'hidden' : ''}`}>
                <div>
                    <InputLabel htmlFor="name" value="Nama" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                        placeholder="Masukan nama"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        readOnly
                        placeholder="Masukan email"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Simpan</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 dark:text-green-400">Tersimpan.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
