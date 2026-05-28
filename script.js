document.getElementById('claimForm').addEventListener('submit', function(e) {
    // Mencegah halaman refresh saat tombol diklik
    e.preventDefault(); 

    // Ambil data dari input (bisa digunakan nanti jika sudah pakai database)
    const userId = document.getElementById('userId').value.trim();
    const couponCode = document.getElementById('couponCode').value.trim();

    // 1. DAFTAR HADIAH DAN PERSENTASE PELUANG (TOTAL HARUS 100)
    const prizePool = [
        { amount: "Rp 50.000",  weight: 50 },  // Peluang 50%
        { amount: "Rp 75.000",  weight: 25 },  // Peluang 25%
        { amount: "Rp 100.000", weight: 14 },  // Peluang 14%
        { amount: "Rp 250.000", weight: 7 },   // Peluang 7%
        { amount: "Rp 500.000", weight: 3 },   // Peluang 3%
        { amount: "Rp 750.000", weight: 0.8 }, // Peluang 0.8%
        { amount: "Rp 1.000.000", weight: 0.2 }// Peluang 0.2% (Grand Prize)
    ];

    // 2. LOGIKA MATEMATIKA UNTUK MENENTUKAN HADIAH
    let randomNum = Math.random() * 100; // Mengacak angka dari 0 sampai 100
    let selectedPrize = prizePool[0].amount; // Default jika terjadi error
    let currentWeightSum = 0;

    for (let i = 0; i < prizePool.length; i++) {
        currentWeightSum += prizePool[i].weight;
        if (randomNum <= currentWeightSum) {
            selectedPrize = prizePool[i].amount;
            break;
        }
    }

    // 3. EFEK ANIMASI SAAT TOMBOL DIKLIK
    const btn = document.getElementById('btnClaim');
    const resultZone = document.getElementById('resultZone');
    const prizeAmount = document.getElementById('prizeAmount');

    // Ubah text tombol jadi loading
    btn.innerText = "MENGECEK KUPON...";
    btn.disabled = true;

    // Simulasi jeda waktu loading 1.5 detik biar dramatis dan seru
    setTimeout(() => {
        // Tampilkan nominal hadiah hasil acakan tadi
        prizeAmount.innerText = selectedPrize;
        
        // Munculkan zona hasil (menghilangkan class 'hidden')
        resultZone.classList.remove('hidden');
        
        // Kembalikan tombol ke semula
        btn.innerText = "KLAIM HADIAH SEKARANG";
        btn.disabled = false;

        // Kunci form agar tidak asal klik klaim terus-menerus tanpa ganti kupon
        document.getElementById('couponCode').value = ""; 
        
        alert(`Selamat untuk ID ${userId}! Anda berhasil mengklaim ${selectedPrize}`);
    }, 1500);
});
