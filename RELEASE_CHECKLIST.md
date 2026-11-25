# Superdoku – Yayın kontrol listesi (kalan adımlar)

Kod tarafı hazır. Aşağıdakiler **senin hesaplarınla** yapılacak adımlar; sırayla ilerle.

## A. Supabase (10 dk)
1. SQL Editor'de sırayla çalıştır: `supabase/1-setup.sql` (zaten çalıştırdıysan atla), sonra **`supabase/2-moderation.sql`**.
2. Daha önce paylaştığın **secret anahtarı** Project Settings > API Keys'ten sil/yenile.
3. Bildirimler `sd_reports` tablosuna düşer. Uygunsuz oyuncuyu gizlemek için `sd_players` tablosunda o satırın `hidden` kutusunu işaretle.

## B. AdMob (30 dk)
1. admob.google.com → hesap aç → **Uygulama ekle** (Android, "henüz yayında değil").
2. İki **reklam birimi** oluştur: *Ödüllü* ve *Geçiş (Interstitial)*.
3. AdMob ID'leri hazır yazıldı (TEST=false); bu adımı atla.
4. Uygulama ID'sini ver ve yeniden kur:  
   Windows (CMD): `set ADMOB_APP_ID=ca-app-pub-XXXX~YYYY && node scripts/setup.js`  
   Mac/Linux: `ADMOB_APP_ID=ca-app-pub-XXXX~YYYY node scripts/setup.js`
5. AdMob > Gizlilik ve mesajlaşma: **Avrupa/UK onay (GDPR) mesajını** oluşturup yayınla (uygulama formu bunu kullanır).

## C. Gizlilik politikası (10 dk)
1. `store/privacy.html` e-posta ve tarihle dolduruldu; yalnızca bir web adresine yüklemen kalıyor.
2. Bir web adresine yükle (ör. GitHub Pages: yeni repo → dosyayı `index.html` yap → Settings > Pages). Adresi not et.

## D. Paketi üret (30 dk)
1. `node scripts/setup.js` (B.4'teki gibi) → `npx cap open android`.
2. Android Studio: **Build > Generate Signed App Bundle / APK > Android App Bundle**. *Create new keystore* ile anahtar oluştur; **keystore dosyasını ve şifreleri yedekle** (kaybedersen güncelleme yapamazsın).
3. `release` seçip bitir → `app-release.aab` çıkar.
4. Her güncellemede `android/app/build.gradle` içinde `versionCode` +1.

## E. Google Play Console (1-2 saat + bekleme)
1. play.google.com/console → geliştirici hesabı (25 USD, kimlik doğrulama).
2. **Uygulama oluştur:** ad "Superdoku: Kedi Bulmaca", dil, Uygulama, Ücretsiz.
3. **Mağaza girişi:** `store/listing.md` metinleri; `store/icon-512.png`; `store/feature-graphic-1024x500.jpg`; `store/screenshots/*.jpg` (en az 2 telefon ekran görüntüsü).
4. **Uygulama içeriği:** Gizlilik politikası URL'si (C.2) · Reklam içeriyor: Evet · Hedef kitle: **13+** · İçerik derecelendirme anketi (şiddet/müstehcenlik yok; kullanıcılar arası etkileşim: sıralama takma adları) · **Veri güvenliği** (taslak: `store/listing.md`) · Kullanıcı tarafından oluşturulan içerik: bildir/engelle var.
5. **Test > Dahili test:** `.aab` dosyasını yükle, kendini test kullanıcısı ekle, telefonda dene.
6. Yeni kişisel hesaplarda yayından önce **kapalı test** (belirli sayıda test kullanıcısı, belirli gün) zorunlu olabilir; ekranda ne yazıyorsa onu uygula.
7. **Üretime çıkış** için inceleme gönder (birkaç gün sürebilir).

## Bu kodla bilinçli olarak bırakılanlar
- Reklamsız satın alma yok (sonraki sürüm).
- Skorlar istemciden geliyor; hile mümkün. Oyuncu artınca Supabase anonim giriş + sunucu doğrulaması eklenmeli.
- Çeviriler anadil konuşuru tarafından kontrol edilmedi.
- Hem Android'in kendi açılış ekranı hem oyunun 5 sn'lik stüdyo sahnesi görünür (ikisi art arda).
