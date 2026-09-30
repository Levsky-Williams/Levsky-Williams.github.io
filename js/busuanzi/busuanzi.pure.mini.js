(() => {
  "use strict";

  function show(data) {
    ["site_pv", "page_pv", "site_uv"].forEach((name) => {
      const value = document.getElementById(
        `busuanzi_value_${name}`
      );

      const container = document.getElementById(
        `busuanzi_container_${name}`
      );

      if (value && data[name] !== undefined) {
        value.textContent = data[name];
      }

      if (container) {
        container.style.display = "inline";
      }
    });
  }

  function hide() {
    ["site_pv", "page_pv", "site_uv"].forEach((name) => {
      const container = document.getElementById(
        `busuanzi_container_${name}`
      );

      if (container) {
        container.style.display = "none";
      }
    });
  }

  function request() {
    const callback =
      "BusuanziCallback_" +
      Math.floor(Math.random() * 1e12);

    const script = document.createElement("script");

    window[callback] = (data) => {
      try {
        show(data);
      } finally {
        delete window[callback];
        script.remove();
      }
    };

    script.src =
      "https://busuanzi.ibruce.info/busuanzi" +
      "?jsonpCallback=" +
      callback;

    /*
     * 关键：
     * 只针对不蒜子的统计请求发送完整页面 URL。
     */
    script.referrerPolicy = "unsafe-url";

    script.async = true;

    script.onerror = () => {
      hide();
      delete window[callback];
      script.remove();
    };

    document.head.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      request,
      { once: true }
    );
  } else {
    request();
  }
})();
