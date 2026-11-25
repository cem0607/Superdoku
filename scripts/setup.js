// Tek komutla Android projesini kurar:  node scripts/setup.js
const { execSync } = require("child_process");
const fs = require("fs"), path = require("path");
const sh = (c) => { console.log("\n> " + c); execSync(c, { stdio: "inherit" }); };
const ROOT = path.join(__dirname, "..");
process.chdir(ROOT);

sh("npm install @capacitor/core @capacitor/app @capacitor-community/admob");
sh("npm install -D @capacitor/cli @capacitor/android @capacitor/assets");
if (!fs.existsSync("android")) sh("npx cap add android");
sh("npx capacitor-assets generate --android --assetPath assets");

// AndroidManifest: AdMob uygulama kimliği + dikey yön
const mf = path.join("android", "app", "src", "main", "AndroidManifest.xml");
let x = fs.readFileSync(mf, "utf8");
const ADMOB_APP_ID = process.env.ADMOB_APP_ID || "ca-app-pub-7957599182937129~4166001246"; // Superdoku AdMob uygulama kimliği
if (!x.includes("com.google.android.gms.ads.APPLICATION_ID")) {
  x = x.replace("</application>", `    <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${ADMOB_APP_ID}"/>\n    </application>`);
}
if (!x.includes("screenOrientation")) x = x.replace("<activity", '<activity android:screenOrientation="portrait"');
fs.writeFileSync(mf, x);
sh("npx cap sync android");
console.log("\nHazır. Android Studio'yu açmak için:  npx cap open android");
