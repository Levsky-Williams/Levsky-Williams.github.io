cardLink.server = 'https://api.allorigins.win/raw?url='
cardLink(document.querySelectorAll('article a[target=_blank]'))
// 兼容以前的文章
cardLink(document.querySelectorAll('article a[rel=noopener]'))

