document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.classList.add("loading");
  document.body.classList.add("loading");

  window.loaderStartTime = Date.now();
});

window.hideCustomLoader = function () {
  if (!document.body.classList.contains("loading")) return;

  const loadTime = Date.now() - window.loaderStartTime;
  const minWaitTime = 1000;
  const waitTime = Math.max(0, minWaitTime - loadTime);

  setTimeout(() => {
    document.documentElement.classList.remove("loading");
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");

    delete window.loaderStartTime;
  }, waitTime);
};
