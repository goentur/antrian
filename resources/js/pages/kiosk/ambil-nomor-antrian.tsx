import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import * as LucideIcons from 'lucide-react'; // Mengimpor semua komponen ikon Lucide
import {
  ArrowRight,
  Clock,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Interface jika Anda menggunakan TypeScript (Hapus blok interface ini jika menggunakan JavaScript standar)
interface ServiceItem {
  id: number;
  prefix: string;
  nama: string;
  keterangan: string;
  icon?: string;
}

export default function AmbilNomorAntrian({ pelayanan = [] }: { pelayanan: ServiceItem[] }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

  // Fungsi Helper untuk merender ikon berdasarkan string dari database secara dinamis
  const renderDynamicIcon = (iconName: string | undefined) => {
    if (!iconName) return <FileText className="h-8 w-8 text-slate-400" />;
    
    // Mencari komponen ikon di dalam paket Lucide berdasarkan string nama ikon
    const IconComponent = (LucideIcons as any)[iconName];
    
    if (IconComponent) {
      return <IconComponent className="h-8 w-8 text-blue-600 group-hover:text-cyan-600 transition-colors duration-300" />;
    }
    
    // Fallback/Ikon cadangan jika nama di database tidak cocok dengan koleksi Lucide
    return <FileText className="h-8 w-8 text-slate-400" />;
  };

  const handleAmbilAntrian = async (pelayananId: number) => {
    // Jika sedang memproses, hentikan fungsi agar tidak dobel request
    if (isProcessing) return;

    // 1. Kunci tombol/card (set ke true)
    setIsProcessing(true);
    console.log('Sedang memproses antrean...');

    try {
      // 2. Tembak endpoint menggunakan Axios
      const response = await axios.post('simpan-nomor-antrian', {
        id: pelayananId
      });

      if (response.data.success) {
        const dataTiket = response.data.tiket;
        console.log('Antrean berhasil diambil dan siap dicetak!', dataTiket);
        
        // TEMPATKAN FUNGSI CETAK PRINTER DI SINI
        // contoh: kirimKePrinterThermal(dataTiket);
        
        // toast.success(`Nomor antrean Anda: ${dataTiket.nomor}`);
      }
    } catch (error) {
      console.error('Gagal mengambil antrean:', error);
      // toast.error('Terjadi kesalahan sistem, silakan coba lagi.');
    } finally {
      // 3. Buka kembali kunci tombol setelah selesai (sukses maupun gagal)
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Head title="Pilih Layanan" />

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-cyan-100 selection:text-cyan-900">
        
        {/* Header Section */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-lg shadow-lg shadow-blue-600/20">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">BPKAD KOTA PEKALONGAN</h1>
                  <p className="text-xs text-slate-500 hidden sm:block">Sistem Antrian Pelayanan Terpadu</p>
                </div>
              </div>
              
              <Badge variant="outline" className="hidden md:flex items-center gap-2 px-3 py-1 text-slate-600 border-cyan-200 bg-cyan-50/50 font-mono">
                <Clock className="h-3 w-3 text-cyan-600" />
                <span className="text-cyan-900 font-semibold">{formattedTime}</span>
              </Badge>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-10">
          
          {/* Grid Services - Centered Layout */}
          <div className="flex flex-wrap justify-center gap-6">
            {pelayanan.map((service) => (
              <div 
                key={service.id} 
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
              >
                <Card 
                  onClick={() => handleAmbilAntrian(service.id)}
                  // MODIFIKASI CLASSNAME DI SINI:
                  className={`group relative flex flex-col items-start p-6 bg-white border border-slate-100 rounded-2xl cursor-pointer transition-all duration-300 h-full pb-14 ${
                    isProcessing 
                      ? 'pointer-events-none opacity-50 bg-slate-50 border-slate-200 select-none' 
                      : 'hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-cyan-300 hover:-translate-y-1'
                  }`}
                >
                  
                  {/* Header Card with Icon Left & Code Right */}
                  <div className="flex justify-between items-center mb-4 w-full">
                    {/* Left: Dynamic Icon Container */}
                    <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-cyan-50 transition-colors duration-300 border border-transparent group-hover:border-cyan-100 shrink-0">
                      {renderDynamicIcon(service.icon)}
                    </div>
                    
                    {/* Right: Unique Code */}
                    <div className="text-right">
                      <span className="py-2 px-4 rounded-xl bg-slate-50 group-hover:bg-cyan-50 transition-colors duration-300 border border-transparent group-hover:border-cyan-100 shrink-0 block text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-cyan-500 leading-none">
                        {service.prefix}
                      </span>
                    </div>
                  </div>

                  <div className="w-full mt-2">
                    <CardTitle className="text-lg font-bold text-slate-800 mb-2 group-hover:text-cyan-700 transition-colors">
                      {service.nama}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                      {service.keterangan}
                    </CardDescription>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                    <div className="bg-cyan-50 p-1.5 rounded-lg border border-cyan-100">
                      <ArrowRight className="h-4 w-4 text-cyan-600" />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center border-t border-slate-200 pt-8">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} BPKAD Kota Pekalongan. All rights reserved.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}