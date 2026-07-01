export function panggilAntrian(teks: string, options?: {
	dingdong?: string;
	notifikasiAkhir?: string;
	gender?: 'male' | 'female';
	rate?: number;
	pitch?: number;
}) {
	const { dingdong, notifikasiAkhir, gender, rate = 1, pitch = 1 } = options || {};

	const speak = (voices: SpeechSynthesisVoice[]) => {
		const suara = new SpeechSynthesisUtterance(teks);
		suara.lang = 'id-ID';
		suara.rate = rate;
		suara.pitch = pitch;
		const indoVoices = voices.filter(v => v.lang === 'id-ID');
		if (gender === 'male') {
			suara.voice = indoVoices.find(v =>
			v.name.toLowerCase().includes('male') ||
			v.name.toLowerCase().includes('google bahasa indonesia')
			) || indoVoices[0];
		} else if (gender === 'female') {
			suara.voice = indoVoices.find(v => v.name.toLowerCase().includes('female')) || indoVoices[0];
		} else {
			suara.voice = indoVoices[0];
		}
		suara.onend = () => {
			if (notifikasiAkhir) {
			const notif = new Audio(notifikasiAkhir);
			notif.play();
			}
		};
		window.speechSynthesis.speak(suara);
	};

	const startSpeak = () => {
	const voices = window.speechSynthesis.getVoices();
	if (voices.length > 0) {
		speak(voices);
	} else {
		window.speechSynthesis.onvoiceschanged = () => {
			const newVoices = window.speechSynthesis.getVoices();
			speak(newVoices);
		};
	}
	};

	if (dingdong) {
		const ding = new Audio(dingdong);
		ding.play();
		ding.onended = startSpeak;
	} else {
		startSpeak();
	}
}