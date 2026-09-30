$(function(){
    // 切换TOC目录展开收缩的相关操作.
  const expandedClass = 'expanded';
        let $tocAside = $('#toc-aside');
        let $mainContent = $('#main-content');
        $('#floating-toc-btn .btn-floating').click(function () {
            if ($tocAside.hasClass(expandedClass)) {
                $tocAside.removeClass(expandedClass).hide();
                $mainContent.removeClass('l9');
            } else {
                $tocAside.addClass(expandedClass).show();
                $mainContent.addClass('l9');
            }
            fixPostCardWidth('artDetail', 'prenext-posts');
        });
        let $itemHasChild = $(".toc-list-item:has(> .toc-list)");
        $itemHasChild.prepend("<i class='fa fa-caret-down'></i><i class='fa fa-caret-right'></i><span>&nbsp;</span>");
        let $iconToFold = $(".toc-list-item > .fa-caret-down");
        let $iconToExpand = $(".toc-list-item > .fa-caret-right");
        $iconToFold.addClass("hide");

        const targetNodes = document.getElementsByClassName("toc-list-item");
        const config = { attributes: true, childList: false, subtree: false };
        const callback = function(mutationsList, observer) {
          for(let mutation of mutationsList) {
            if (mutation.type === "attributes") {
              let target = $(mutation.target)
              if (target.hasClass("is-active-li")) {
                let $toFold = $(".toc-list-item > .fa-caret-down");
                let $toExpand = $(".toc-list-item > .fa-caret-right");
                $toFold.addClass("hide");
                $toExpand.removeClass("hide");
                target.children(".fa-caret-right").first().addClass("hide")
                target.children(".fa-caret-down").first().removeClass("hide")
                let parents = target.parents(".toc-list-item")
                for (p of parents) {
                  $(p).children(".fa-caret-right").first().addClass("hide")
                  $(p).children(".fa-caret-down").first().removeClass("hide")
                }
              }
            }
          }
        };
        const observer = new MutationObserver(callback);
        for (node of targetNodes) {
          observer.observe(node, config)
        }
  });
