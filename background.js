chrome.runtime.onInstalled.addListener(function () {
  checkAndSetIcon();
});

chrome.runtime.onStartup.addListener(function () {
  checkAndSetIcon();
});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.storage.sync.get("tanggal", function (data) {
    var today = new Date().toISOString().slice(0, 10); // Ambil tanggal hari ini (format YYYY-MM-DD)
    if (data.tanggal != today) {
      // Konfirmasi sebelum mengubah tanggal dan ikon
      if (confirm("Sudah posting materi bermanfaat di media sosial?")) {
        chrome.storage.sync.set({ tanggal: today }, function () {
          chrome.browserAction.setIcon({ path: "green.png", tabId: tab.id });
        });
      }
    }
  });
});

function checkAndSetIcon() {
  chrome.storage.sync.get("tanggal", function (data) {
    var today = new Date().toISOString().slice(0, 10); // Ambil tanggal hari ini (format YYYY-MM-DD)
    if (data.tanggal === today) {
      // Jika storage tanggal sama dengan hari ini, set ikon menjadi hijau
      chrome.browserAction.setIcon({ path: "green.png" });
    } else {
      // Jika tidak sama, set ikon menjadi merah
      chrome.browserAction.setIcon({ path: "red.png" });
    }
  });
}
