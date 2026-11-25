> **Önce `RELEASE_CHECKLIST.md` dosyasını oku** – yayın için kalan adımlar orada, sırayla.

# Superdoku – Google Play paketi

Bu klasör, oyunu Android uygulamasına (AAB) çeviren hazır Capacitor projesidir.

## Gerekenler (bilgisayarında, bir kez)
1. **Node.js** (nodejs.org, LTS)
2. **Android Studio** (developer.android.com/studio) – kurulumda "Android SDK" seçili olsun
3. **Google Play Console** hesabı (tek seferlik 25 USD) – play.google.com/console
4. **AdMob** hesabı (admob.google.com) – reklam gelirleri için

## 1) Projeyi kur
Bu klasörde terminal aç:

    node scripts/setup.js

Komut; Capacitor + AdMob eklentilerini kurar, `android/` klasörünü oluşturur, ikon/açılış görsellerini üretir, AndroidManifest'i ayarlar (dikey ekran + AdMob **test** kimliği) ve senkronlar.

## 2) Telefonda dene
    npx cap open android
Android Studio açılır → telefonunu USB ile bağla (geliştirici modu açık) → ▶ Run.
Bu aşamada reklamlar **Google test reklamlarıdır** (güvenli, para kazandırmaz).

## 3) Yayın öncesi yapılacaklar
1. **AdMob'da** uygulamanı ekle; bir **Ödüllü** ve bir **Geçiş (interstitial)** reklam birimi oluştur.
2. AdMob ID'leri `www/admob-bridge.js` ve `scripts/setup.js` içine HAZIR yazıldı (TEST=false); ekstra bir şey yapmana gerek yok.
3. AdMob **Uygulama ID**'sini şöyle ver ve tekrar kur:  
   Windows: `set ADMOB_APP_ID=ca-app-pub-XXXX~YYYY && node scripts/setup.js`  
   Mac/Linux: `ADMOB_APP_ID=ca-app-pub-XXXX~YYYY node scripts/setup.js`  
   (ya da `android/app/src/main/AndroidManifest.xml` içindeki `APPLICATION_ID` değerini elle değiştir)
4. `store/privacy.html` içindeki [E-POSTA] ve [TARİH]'i doldur, bir web adresine yükle (GitHub Pages ücretsiz olur). Bu adres Play Console'da **gizlilik politikası URL'si** olarak istenir.
5. Android Studio → **Build > Generate Signed Bundle / APK → Android App Bundle**. Yeni bir **keystore** oluştur ve dosyayı + şifreyi **yedekle** (kaybedersen uygulamayı güncelleyemezsin).
6. `android/app/build.gradle` içinde `versionCode` / `versionName` değerlerini her güncellemede artır.

## 4) Play Console
- Yeni uygulama oluştur → `.aab` dosyasını "Internal testing"e yükle, önce kendin dene.
- Mağaza görselleri: `store/icon-512.png`, `store/feature-graphic-1024x500.jpg`, `store/screenshots/` (1080×1920, .jpg).
- Metinler: `store/listing.md`. Hedef kitle olarak **13+** seçmeni öneririm (çocuk uygulaması kuralları çok katıdır).
- Doldurulacak formlar: İçerik derecelendirme, Veri güvenliği (taslak `listing.md`'de), Reklam içeriyor = Evet.
- Yeni kişisel geliştirici hesaplarında yayından önce **kapalı test** (belirli sayıda test kullanıcısı, belirli gün) şartı olabilir; güncel kuralı Play Console'da kontrol et.

## Bilmen gerekenler
- **Reklamsız satın alma** henüz yok (Google Play Faturalandırma eklentisi gerekir). Oyundaki "Reklamsız oyna" düğmesi yalnızca test reklam ekranında görünür; uygulamada gerçek reklam açılır.
- **Sıralama** Supabase'e bağlı; sunucu `sd_players` tablosunu kullanıyor. Skorlar sunucuda doğrulanmıyor (hile mümkün) ve takma adlarda küfür filtresi yok; canlıya çıkınca takip et, gerekirse filtre/şikâyet yolu ekle.
- `www/admob-bridge.js` gerçek cihazda **denenmedi** (burada Android derlenemiyor); eklenti sürümüne göre olay adları değişirse ilk testte düzeltilir.
- Oyun yazı tipleri Google Fonts'tan internetle yüklenir; internet yoksa sistem yazı tipi kullanılır.
- Prototip modu uygulama sürümünde kapalıdır.
