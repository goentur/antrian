import { panggilAntrian } from '@/utils/PanggilSuara';
import { useEffect, useState } from 'react';

export default function MonitorNomorAntrian() {
    const [currentAntrian, setCurrentAntrian] = useState<string>('-');
    const [currentLoket, setCurrentLoket] = useState<string>('-');

    useEffect(() => {
        if (window.Echo) {
            window.Echo.channel('jalur-antrian').listen('PanggilAntrian', (e: any) => {
                setCurrentAntrian(e.nomorAntrian);
                setCurrentLoket(e.nomorLoket);
                panggilAntrian(`Nomor antrian ${e.nomorAntrian}, silahkan menuju loket ${e.nomorLoket}`, {
                    dingdong: "/start.mp3",
                    notifikasiAkhir: "/end.mp3",
                    gender: "female",
                    rate: 1,
                    pitch: 1
                });
            });
        }

        return () => {
            if (window.Echo) {
                window.Echo.leaveChannel('jalur-antrian');
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-12 tracking-wide text-center">MONITOR ANTREAN PELAYANAN PUBLIK</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                {/* Card Nomor Antrean */}
                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-10 flex flex-col items-center justify-center shadow-2xl">
                    <span className="text-xl text-slate-400 font-medium tracking-widest uppercase mb-4">Nomor Antrean</span>
                    <div className="text-8xl font-black text-emerald-400 animate-pulse">{currentAntrian}</div>
                </div>

                {/* Card Loket */}
                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-10 flex flex-col items-center justify-center shadow-2xl">
                    <span className="text-xl text-slate-400 font-medium tracking-widest uppercase mb-4">Menuju Loket</span>
                    <div className="text-8xl font-black text-sky-400">{currentLoket}</div>
                </div>
            </div>
        </div>
    );
}