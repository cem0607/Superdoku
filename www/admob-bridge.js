/* Superdoku - AdMob köprüsü (yalnızca yüklü Android uygulamasında çalışır).
   Tarayıcıda çalışmaz; oyun orada test reklamı ekranını kullanır.
   YAYINA ÇIKMADAN ÖNCE: TEST = false yapın ve aşağıdaki ID'leri kendi AdMob ID'lerinizle değiştirin. */
(function () {
  var C = window.Capacitor;
  if (!C || !C.isNativePlatform || !C.isNativePlatform()) return;
  var P = C.Plugins || {};
  var A = P.AdMob, App = P.App;

  /* ---- Android geri tuşu ---- */
  if (App && App.addListener) {
    App.addListener("backButton", function () {
      function vis(el) { return el && el.offsetParent !== null; }
      var ov = ["adOv", "infoOv", "lbOv", "profOv"].map(function (i) { return document.getElementById(i); }).filter(Boolean).pop();
      if (ov) { ov.remove(); return; }
      var open = [].slice.call(document.querySelectorAll(".overlay")).filter(function (o) { return !o.hidden && o.offsetParent !== null; }).pop();
      if (open) return; /* kazanma/kaybetme/ayarlar ekranları kendi düğmeleriyle kapanır */
      var b = document.getElementById("backBtn"); if (vis(b)) { b.click(); return; }
      b = document.getElementById("iBack"); if (vis(b)) { b.click(); return; }
      b = document.getElementById("homeBtn"); if (vis(b)) { b.click(); return; }
      if (App.exitApp) App.exitApp();
    });
  }
  if (!A) return;

  var TEST = true; /* geliştirme/test APK: Google test reklamları. Play yayını öncesi false yapın */
  var IDS = {
    interstitial: TEST ? "ca-app-pub-3940256099942544/1033173712" : "ca-app-pub-7957599182937129/9390407764",
    rewarded: TEST ? "ca-app-pub-3940256099942544/5224354917" : "ca-app-pub-7957599182937129/2190700905"
  };

  var ready = Promise.resolve()
    .then(function () { return A.initialize({ initializeForTesting: TEST }); })
    .then(function () {
      /* Avrupa/Birleşik Krallık için onay (UMP) formu */
      if (!A.requestConsentInfo) return;
      return A.requestConsentInfo().then(function (info) {
        if (info && info.isConsentFormAvailable && info.status === "REQUIRED" && A.showConsentForm) return A.showConsentForm();
      });
    })
    .catch(function () {});

  function listen(names, handlers) {
    return Promise.all(names.map(function (n, i) { return A.addListener(n, handlers[i]); }));
  }
  function clean(hs) { (hs || []).forEach(function (h) { try { h.remove(); } catch (e) {} }); }

  function rewarded(done) {
    var got = false, hs = [], finished = false;
    function fin(ok, why) { if (finished) return; finished = true; clean(hs); done(ok, why); }
    ready.then(function () {
      return listen(["onRewardedVideoAdReward", "onRewardedVideoAdDismissed", "onRewardedVideoAdFailedToLoad", "onRewardedVideoAdFailedToShow"],
        [function () { got = true; }, function () { setTimeout(function () { fin(got); }, 60); }, function () { fin(false, "fail"); }, function () { fin(false, "fail"); }]);
    }).then(function (h) { hs = h; return A.prepareRewardVideoAd({ adId: IDS.rewarded, isTesting: TEST }); })
      .then(function () { return A.showRewardVideoAd(); })
      .then(function (r) { if (r) got = true; })
      .catch(function () { fin(false, "fail"); });
  }

  function interstitial(done) {
    var hs = [], finished = false;
    function fin() { if (finished) return; finished = true; clean(hs); done(); }
    ready.then(function () {
      return listen(["interstitialAdDismissed", "interstitialAdFailedToLoad", "interstitialAdFailedToShow"], [fin, fin, fin]);
    }).then(function (h) { hs = h; return A.prepareInterstitial({ adId: IDS.interstitial, isTesting: TEST }); })
      .then(function () { return A.showInterstitial(); })
      .catch(fin);
  }

  window.SD_ADS = { rewarded: rewarded, interstitial: interstitial };
})();
