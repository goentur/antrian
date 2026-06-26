import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  HelpCircle, 
  ArrowRight,
  Clock,
  TicketCheck,
  Building2,
  Info
} from 'lucide-react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Welcome({ services = [] }) {
  const [currentTime, setCurrentTime] = useState(new Date());

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

  // DATA LAYANAN DENGAN KODE UNIK
  const defaultServices = [
    { id: 1, code: 'A', name: 'Pelayanan KTP & Dokumen', description: 'Pengurusan KTP, KK, Akta Kelahiran, dan dokumen kependudukan lainnya.', icon: <FileText className="h-8 w-8 text-blue-600" /> },
    { id: 2, code: 'B', name: 'Pembayaran Pajak & Retribusi', description: 'Pembayaran PBB, retribusi daerah, dan pengurusan administrasi keuangan.', icon: <CreditCard className="h-8 w-8 text-cyan-500" /> },
    { id: 3, code: 'C', name: 'Konsultasi & Pengaduan', description: 'Ruang konsultasi dan pelaporan pengaduan kepada pemerintah daerah.', icon: <HelpCircle className="h-8 w-8 text-indigo-600" /> },
    { id: 4, code: 'D', name: 'Legalitas Usaha', description: 'Pengurusan izin usaha mikro, kecil, dan menengah (UMKM).', icon: <Building2 className="h-8 w-8 text-sky-600" /> },
    { id: 5, code: 'E', name: 'Informasi Publik', description: 'Layanan permintaan informasi publik dan dokumentasi.', icon: <Info className="h-8 w-8 text-blue-400" /> },
    { id: 6, code: 'F', name: 'Pengukuran Tanah', description: 'Layanan teknis pengukuran dan pemetaan tanah daerah.', icon: <ShieldCheck className="h-8 w-8 text-cyan-700" /> },
  ];

  const listServices = services.length > 0 ? services : defaultServices;

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
          
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 shadow-xl shadow-blue-500/15 mb-10">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-cyan-300/20 rounded-full blur-xl"></div>
            
            <div className="relative px-0 py-8 sm:px-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-sm">
                  Selamat Datang
                </h2>
                <p className="text-blue-50 text-base sm:text-lg max-w-xl leading-relaxed">
                  Silakan pilih jenis layanan yang Anda butuhkan untuk mengambil nomor antrian.
                </p>
              </div>
              
              <div className="hidden sm:flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-inner">
                 <TicketCheck className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Grid Services - Centered Layout */}
          <div className="flex flex-wrap justify-center gap-6">
            {listServices.map((service) => (
              <div 
                key={service.id} 
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
              >
                <Card 
                  onClick={() => console.log('Navigasi ke halaman ambil antrian ID:', service.id)}
                  className="group relative flex flex-col items-start p-6 bg-white border border-slate-100 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-cyan-300 hover:-translate-y-1 h-full"
                >
                  
                  {/* UPDATED: Header Card with Icon Left & Code Right */}
                  <div className="flex justify-between items-center mb-2 w-full">
                    {/* Left: Icon Container */}
                    <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-cyan-50 transition-colors duration-300 border border-transparent group-hover:border-cyan-100 shrink-0">
                      {service.icon || <FileText className="h-8 w-8 text-slate-400" />}
                    </div>
                    
                    {/* Right: Unique Code (Large & Gradient) */}
                    <div className="text-right">
                      <span className="py-3 px-4 rounded-xl bg-slate-50 group-hover:bg-cyan-50 transition-colors duration-300 border border-transparent group-hover:border-cyan-100 shrink-0 block text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-cyan-500 leading-none">
                        {service.code}
                      </span>
                    </div>
                  </div>

                  <div className="w-full mt-0">
                    <CardTitle className="text-lg font-bold text-slate-800 mb-2 group-hover:text-cyan-700 transition-colors">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="h-5 w-5 text-cyan-600" />
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