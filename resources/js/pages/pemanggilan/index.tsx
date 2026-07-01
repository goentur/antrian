import DataTablePagination from '@/components/data-table/pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import pemanggilan from '@/routes/pemanggilan';
import { InfoDataTabel } from '@/types';
import { appAlert } from '@/utils/AppAlert';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { CheckCircle, RefreshCw, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from './components/data-table';

export default function Index() {
    const title = 'Pemanggilan'
    const [loading, setLoading] = useState(false)
    const [dataTable, setDataTable] = useState<[]>([])
    const [isEdit, setIsEdit] = useState(false)
    const [linksPagination, setLinksPagination] = useState([])
    const [infoDataTabel, setInfoDataTabel] = useState<InfoDataTabel>({
        page: 1,
        from: 0,
        to: 0,
        total: 0,
        perPage: 25,
        search: null,
    })

    const { data, setData, errors, post, patch, delete: destroy, reset, processing } = useForm()

    useEffect(() => {
        getData()
    }, [infoDataTabel.page, infoDataTabel.search, infoDataTabel.perPage])

    const getData = async () => {
        setLoading(true)
        try {
            const response = await axios.post(
                pemanggilan.data().url,
                {
                    page: infoDataTabel.page,
                    search: infoDataTabel.search,
                    perPage: infoDataTabel.perPage,
                }
            )
            setDataTable(response.data.data)
            setLinksPagination(response.data.links)
            setInfoDataTabel((prev) => ({
                ...prev,
                page: response.data.current_page,
                from: response.data.from,
                to: response.data.to,
                total: response.data.total,
                perPage: response.data.per_page,
            }))
        } catch (error: any) {
            appAlert.success('Error', error.message)
        } finally {
            setLoading(false)
        }
    }

    const antreanBerikutnya = dataTable.find((a: any) => a.status.label === 'MENUNGGU')?.nama || '-';
    const antreanAktif = dataTable.find((a: any) => a.status.label === 'DILAYANI')?.nama || '-';

    // 3. Handler Panggil Antrean Selanjutnya
    const handlePanggil = async () => {
        setLoading(true);
        try {
            const url = pemanggilan.panggilBerikutnya().url;
            const response = await axios.post(url);
            
            if (response.data.success) {
                appAlert.success('Sukses', `Memanggil antrean ${response.data.nomorAntrian}`);
                // PENTING: Ambil data terbaru setelah backend sukses memproses data
                getData();
            }
        } catch (error: any) {
            const msg = error.response?.data?.message || error.message;
            appAlert.error('Error', msg);
        } finally {
            setLoading(false);
        }
    };

    // // 4. Handler Panggil Ulang (Mengulang Suara)
    // const handlePanggilUlang = async () => {
    //     if (antreanAktif === '-') return;
    //     setLoading(true);
    //     try {
    //         // Sesuaikan route endpoint backend untuk panggil ulang Anda
    //         const url = pemanggilan.panggilUlang?.().url || '/pemanggilan/panggil-ulang'; 
    //         const response = await axios.post(url, { nomor: antreanAktif });
            
    //         if (response.data.success) {
    //             appAlert.success('Sukses', `Memanggil ulang antrean ${antreanAktif}`);
    //             // Jika backend tidak mem-broadcast ulang, kita bisa paksa bunyikan langsung dari client:
    //             // putarSuaraPanggilan(antreanAktif, response.data.nomorLoket || '1');
    //         }
    //     } catch (error: any) {
    //         const msg = error.response?.data?.message || error.message;
    //         appAlert.error('Error', msg);
    //     } finaly {
    //         setLoading(false);
    //     }
    // };

    // // 5. Handler Menyelesaikan Pelayanan
    // const handleAkhiri = async () => {
    //     if (antreanAktif === '-') return;
    //     setLoading(true);
    //     try {
    //         // Sesuaikan route endpoint backend untuk akhiri pelayanan Anda
    //         const url = pemanggilan.akhiri?.().url || '/pemanggilan/akhiri';
    //         const response = await axios.post(url, { nomor: antreanAktif });
            
    //         if (response.data.success) {
    //             appAlert.success('Sukses', `Antrean ${antreanAktif} selesai dilayani.`);
    //             getData(); // Refresh tabel untuk membersihkan antrean aktif
    //         }
    //     } catch (error: any) {
    //         const msg = error.response?.data?.message || error.message;
    //         appAlert.error('Error', msg);
    //     } finaly {
    //         setLoading(false);
    //     }
    // };

    return (
        <>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* CARD PANGGUL SEKARANG */}
                    <Card className="flex flex-col justify-between border-emerald-500/20 bg-emerald-50/10 dark:bg-emerald-950/5">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                <Volume2 className="h-5 w-5" />
                                Panggil Antrean
                            </CardTitle>
                            <CardDescription>Maju ke nomor antrean berikutnya di daftar tunggu</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2 flex flex-col gap-4 text-center">
                            <div className="py-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                                <span className="block text-xs font-medium text-emerald-600/70 uppercase tracking-wider mb-1">Selanjutnya</span>
                                <span className="text-5xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 font-mono">
                                    {antreanBerikutnya}
                                </span>
                            </div>
                            
                            <Button 
                                onClick={handlePanggil}
                                size="lg" 
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base h-14 shadow-lg shadow-emerald-600/10 transition-all"
                                disabled={antreanBerikutnya === '-' || loading}
                            >
                                PANGGIL SEKARANG
                            </Button>
                        </CardContent>
                    </Card>

                    {/* CARD PANGGUL ULANG */}
                    <Card className="flex flex-col justify-between border-amber-500/20 bg-amber-50/10 dark:bg-amber-950/5">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-lg font-bold text-amber-600 dark:text-amber-400">
                                <RefreshCw className="h-5 w-5" />
                                Panggil Ulang
                            </CardTitle>
                            <CardDescription>Panggil kembali nomor antrean aktif jika orangnya tidak terdengar</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2 flex flex-col gap-4 text-center">
                            <div className="py-4 bg-amber-500/5 rounded-xl border border-amber-500/10">
                                <span className="block text-xs font-medium text-amber-600/70 uppercase tracking-wider mb-1">Dipanggil Kembali</span>
                                <span className="text-5xl font-black tracking-tight text-amber-600 dark:text-amber-400 font-mono">
                                    {antreanAktif}
                                </span>
                            </div>
                            
                            <Button 
                                // onClick={handlePanggilUlang}
                                variant="outline"
                                size="lg" 
                                className="w-full border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white dark:hover:text-amber-950 font-bold text-base h-14 transition-all"
                                disabled={antreanAktif === '-' || loading}
                            >
                                ULANGI PANGGILAN
                            </Button>
                        </CardContent>
                    </Card>

                    {/* CARD AKHIRI PELAYANAN */}
                    <Card className="flex flex-col justify-between border-destructive/20 bg-destructive/5">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-lg font-bold text-destructive">
                                <CheckCircle className="h-5 w-5" />
                                Akhiri Pelayanan
                            </CardTitle>
                            <CardDescription>Selesaikan sesi dan tandai nomor ini sebagai Selesai</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2 flex flex-col gap-4 text-center">
                            <div className="py-4 bg-destructive/5 rounded-xl border border-destructive/10">
                                <span className="block text-xs font-medium text-destructive/70 uppercase tracking-wider mb-1">Sesi Aktif</span>
                                <span className="text-5xl font-black tracking-tight text-destructive font-mono">
                                    {antreanAktif}
                                </span>
                            </div>
                            
                            <Button 
                                // onClick={handleAkhiri}
                                variant="destructive"
                                size="lg" 
                                className="w-full font-bold text-base h-14 shadow-lg shadow-destructive/10 transition-all"
                                disabled={antreanAktif === '-' || loading}
                            >
                                SELESAIKAN / AKHIRI
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* DATA TABLE */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            loading={loading}
                            data={dataTable}
                            from={infoDataTabel.from}
                            setIsEdit={setIsEdit}
                        />
                        <DataTablePagination
                            infoDataTabel={infoDataTabel}
                            setInfoDataTabel={setInfoDataTabel}
                            linksPagination={linksPagination}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

Index.layout = {
    breadcrumbs: [
        { title: 'Pemanggilan', href: pemanggilan.index() },
        { title: 'Data', href: pemanggilan.index() },
    ],
};