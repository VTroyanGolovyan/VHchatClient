if (localStorage.theme&&localStorage.theme!=''){
  var link = document.createElement('link');
  link.setAttribute('rel','stylesheet');
  link.setAttribute('type','text/css');
  link.setAttribute('href',localStorage.theme);
  document.head.appendChild(link);
}else{
  var link = document.createElement('link');
  link.setAttribute('rel','stylesheet');
  link.setAttribute('type','text/css');
  link.setAttribute('href','style/defolt/css/style.css');
  document.head.appendChild(link);
}
