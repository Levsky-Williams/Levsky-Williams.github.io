document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".markdown-body a[href]").forEach(link => {
    const href = link.getAttribute("href");

    // 排除页内锚点、mailto、tel、javascript 等
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) {
      return;
    }

    try {
      const url = new URL(link.href);

      if (url.origin !== window.location.origin) {
        link.classList.add("external-link");
      }
    } catch (_) {}
  });
});
