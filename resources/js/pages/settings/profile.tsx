import { Form, Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';
import type { Auth } from '@/types';
import { Spinner } from '@/components/ui/spinner';
import { AlertTriangle, CheckCircle, SendIcon } from 'lucide-react';

type PageProps = {
    auth: Auth;
};

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Pengaturan profil" />

            <h1 className="sr-only">Pengaturan profil</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Profil"
                    description="Perbarui nama dan alamat email Anda"
                />

                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.name}
                                    name="name"
                                    required
                                    autoComplete="nama"
                                    placeholder="Nama"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.email}
                                    name="email"
                                    required
                                    readOnly
                                    autoComplete="username"
                                    placeholder="Email address"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-profile-button"
                                >
                                    {processing ? <Spinner /> : <SendIcon/>} Simpan
                                </Button>
                            </div>
                            {mustVerifyEmail && auth.user.email_verified_at === null && (
                                <div className="space-y-4">
                                    {/* Box Peringatan Utama (Alert) */}
                                    <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
                                        <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                                        <div className="space-y-1">
                                            <h5 className="font-semibold text-amber-900 dark:text-amber-300 text-sm">
                                                Verifikasi email diperlukan
                                            </h5>
                                            <p className="text-sm text-amber-800/90 dark:text-amber-400/90 leading-relaxed">
                                                Alamat email Anda belum diverifikasi. Untuk alasan keamanan akun Anda, mohon lakukan verifikasi terlebih dahulu.{' '}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="font-medium text-amber-900 underline underline-offset-4 hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-200 cursor-pointer transition-colors"
                                                >
                                                    Klik di sini untuk mengirim ulang email verifikasi.
                                                </Link>
                                            </p>
                                        </div>
                                    </div>

                                    {status === 'verification-link-sent' && (
                                        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-900/30 dark:bg-emerald-950/20 dark:text-emerald-400 animate-in fade-in slide-in-from-top-1 duration-300">
                                            <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                            <span className="font-medium">
                                                Tautan verifikasi baru berhasil dikirim! Silakan periksa folder kotak masuk atau spam email Anda.
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </Form>
            </div>

            <DeleteUser />
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Pengaturan profil',
            href: edit(),
        },
    ],
};
