# Google Play mağaza metni

**Uygulama adı (30 karakter):** Superdoku: Kedi Bulmaca
**Kısa açıklama (80):** Renkli bölgelerde mantıkla kedi yerleştir. 760 seviye, 13 ada!
**Kategori:** Bulmaca · **Etiketler:** mantık, bulmaca, zeka

## Uzun açıklama (TR)
Superdoku, her satıra, sütuna ve renk bölgesine tam bir hayvan yerleştirdiğin sevimli bir mantık bulmacası.
Hayvanlar birbirine değemez; tahmin yok, sadece akıl yürütme!

🐱 760 seviye, 13 farklı ada: Çayır'dan Dondurma Adası'na
🧠 Her ada biraz daha zor; mantık yürüterek çözülür
🔥 Hatasız seri yap, unvanlar kazan
🏆 Sıralamada en iyi serileri yapan oyuncularla yarış
📅 Her gün yeni bir günlük bulmaca
🌍 10 dil: Türkçe, English, Deutsch, Español, Français, Português, Русский, العربية, हिन्दी, 中文

## Long description (EN)
Superdoku is a cute logic puzzle: place exactly one animal in every row, column and colour region. Animals can't touch each other — no guessing, only logic!
760 levels across 13 islands · flawless-streak titles · leaderboard · daily puzzle · 10 languages.

## Data safety (Play Console) taslağı
- Toplanan veri: Kullanıcı adı (takma ad, isteğe bağlı), Fotoğraf (yalnızca kullanıcı paylaşırsa), Oyun içi etkinlik (skor), Reklam kimliği (AdMob), Cihaz/diğer kimlikler (AdMob)
- Amaç: Uygulama işlevi (sıralama), Reklamcılık
- Veri şifreli aktarılır: Evet (HTTPS) · Silme talebi: e-posta ile
- Hedef kitle: 13+ önerilir (Families politikası gereksinimlerinden kaçınmak için)

## Kullanıcı içeriği (UGC) beyanı
- Sıralamada takma ad (ve isteğe bağlı fotoğraf) başkalarına görünür.
- Önlemler: takma ad filtresi, oyun içi "bildir ve gizle", yönetici tarafında `hidden` ile kaldırma (supabase/2-moderation.sql).
- Bildirimleri Supabase > Table Editor > `sd_reports` tablosundan oku; uygunsuz oyuncu için `sd_players` içinde `hidden = true` yap.
