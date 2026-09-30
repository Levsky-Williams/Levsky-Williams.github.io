(() => {
  const script = document.createElement("script");

  script.src = "https://busuanzi.9420.ltd/js";

  // 让新版不蒜子继续使用 Fluid 原来的 ID：
  // busuanzi_value_page_pv
  // busuanzi_value_site_pv
  // busuanzi_value_site_uv
  script.dataset.prefix = "busuanzi_value";

  script.addEventListener("load", () => {
    [
      "page_pv",
      "site_pv",
      "site_uv"
    ].forEach((name) => {
      const value = document.getElementById(
        `busuanzi_value_${name}`
      );

      const container = document.getElementById(
        `busuanzi_container_${name}`
      );

      if (!value || !container) return;

      const show = () => {
        if (value.textContent.trim() !== "") {
          container.style.display = "inline";
          return true;
        }
        return false;
      };

      if (show()) return;

      const observer = new MutationObserver(() => {
        if (show()) {
          observer.disconnect();
        }
      });

      observer.observe(value, {
        childList: true,
        subtree: true,
        characterData: true
      });
    });
  });

  document.head.appendChild(script);
})();
