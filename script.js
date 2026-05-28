document.getElementById('claimForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const userId = document.getElementById('userId').value.trim();
    const couponCode = document.getElementById('couponCode').value.trim();

    // === VALIDASI FORMAT KUPON WAJIB: KUPON-XXXX ===
    if (!couponCode.toUpperCase().startsWith("KUPON-")) {
        alert("Gagal! Format Kode Kupon salah. Contoh format yang benar: KUPON-7821");
        return; // Menghentikan proses klaim jika tidak sesuai format
    }

    // List Hadiah sesuai bobot peluang (Weighted Random)
    const prizePool = [
        { amount: "Rp 50.000",  weight: 45 },  
        { amount: "Rp 75.000",  weight: 25 },  
        { amount: "Rp 100.000", weight: 15 },  
        { amount: "Rp 250.000", weight: 8 },   
        { amount: "Rp 500.000", weight: 4 },   
        { amount: "Rp 750.000", weight: 2 },   
        { amount: "Rp 1.000.000", weight: 1 }  
    ];

    let randomNum = Math.random() * 100;
    let selectedPrize = prizePool[0].amount;
    let currentWeightSum = 0;

    for (let i = 0; i < prizePool.length; i++) {
        currentWeightSum += prizePool[i].weight;
        if (randomNum <= currentWeightSum) {
            selectedPrize = prizePool[i].amount;
            break;
        }
    }

    const btn = document.getElementById('btnClaim');

    // Efek loading tombol
    btn.innerText = "MENGECEK KODE KUPON...";
    btn.disabled = true;

    // Jeda dramatis 1.5 detik
    setTimeout(() => {
        // Masukkan hasil nominal uang ke halaman hasil
        document.getElementById('prizeAmount').innerText = selectedPrize;
        
        // Sembunyikan halaman input, munculkan halaman hadiah dengan mulus
        document.getElementById('formPage').classList.remove('active');
        document.getElementById('resultPage').classList.add('active');
        
        // Kembalikan tombol ke semula jika di-reset
        btn.innerText = "KLAIM HADIAH SEKARANG";
        btn.disabled = false;

        alert(`Selamat untuk ID ${userId}! Anda berhasil mengklaim hadiah sebesar ${selectedPrize}`);
    }, 1500);
});
