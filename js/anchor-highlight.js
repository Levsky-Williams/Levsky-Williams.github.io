(() => {
  const HIGHLIGHT_CLASS = "anchor-jump-highlight";

  let highlightTimer = null;

  function decodeHash(hash) {
    if (!hash) return "";

    try {
      return decodeURIComponent(hash.slice(1));
    } catch {
      return hash.slice(1);
    }
  }

  function findAnchor(hash) {
    const id = decodeHash(hash);
    if (!id) return null;

    return document.getElementById(id);
  }

  function findVisualTarget(anchor) {
    if (!anchor) return null;

    /*
     * Equation Citator:
     *
     * <div id="eq-1.1"
     *      class="equation-citator-target"></div>
     *
     * <实际公式元素>
     */
    if (anchor.classList.contains("equation-citator-target")) {
      let element = anchor.nextElementSibling;

      /*
       * 跳过其他空锚点。
       */
      while (
        element &&
        element.classList.contains("equation-citator-target")
      ) {
        element = element.nextElementSibling;
      }

      return element || anchor;
    }

    /*
     * Obsidian block reference:
     *
     * <p>
     *   正文
     *   <span id="^xxx"
     *         class="obsidian-block-id"></span>
     * </p>
     */
    if (anchor.classList.contains("obsidian-block-id")) {
      return (
        anchor.closest(
          "p, li, blockquote, h1, h2, h3, h4, h5, h6, table"
        ) ||
        anchor.parentElement ||
        anchor
      );
    }

    return anchor;
  }

  function highlightHash(hash) {
    const anchor = findAnchor(hash);
    if (!anchor) return;

    const target = findVisualTarget(anchor);
    if (!target) return;

    if (highlightTimer) {
      clearTimeout(highlightTimer);
    }

    /*
     * 允许连续点击同一个引用时重新播放动画。
     */
    target.classList.remove(HIGHLIGHT_CLASS);

    void target.offsetWidth;

    target.classList.add(HIGHLIGHT_CLASS);

    highlightTimer = setTimeout(() => {
      target.classList.remove(HIGHLIGHT_CLASS);
    }, 2000);
  }

  /*
   * 注意：
   *
   * 这里绝对不要 preventDefault()。
   * 让浏览器自己完成真正的锚点跳转。
   */
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!link) return;

    let url;

    try {
      url = new URL(link.href, window.location.href);
    } catch {
      return;
    }

    /*
     * 只处理当前页面内部的锚点。
     */
    if (
      url.origin !== window.location.origin ||
      url.pathname !== window.location.pathname ||
      !url.hash
    ) {
      return;
    }

    /*
     * 不干预浏览器滚动。
     *
     * 等当前 click 完成以后，
     * 再只负责高亮。
     */
    requestAnimationFrame(() => {
      highlightHash(url.hash);
    });
  });

  /*
   * 浏览器前进、后退或其他方式改变 hash。
   */
  window.addEventListener("hashchange", () => {
    requestAnimationFrame(() => {
      highlightHash(window.location.hash);
    });
  });

  /*
   * 直接打开 xxx/#anchor 时高亮。
   */
  window.addEventListener("load", () => {
    if (!window.location.hash) return;

    requestAnimationFrame(() => {
      highlightHash(window.location.hash);
    });
  });
})();
