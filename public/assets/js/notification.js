const isAndroidDevice = /Android/i.test(navigator.userAgent);
const showNotification = async (message) => {
  if (isAndroidDevice) return;
  if (Notification.permission === "default") {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;
  }
  if (Notification.permission === "granted") {
    const notification = new Notification(message);
    setTimeout(() => notification.close(), 3000);
  }
};
