function openmenu(id){
  if(window.innerWidth <= 480){
    display = document.getElementById(id).style.left;
    if(display != '0px'){
        document.getElementById(id).style.left='0px';
    }

    else{
      document.getElementById(id).style.left='-100%';
}
  }
}
window.onresize = function(){
  if(window.innerWidth > 480){
    if (document.getElementById('menu')){
      display = document.getElementById('menu').style.left;
      if(display != '0px'){
          document.getElementById('menu').style.left='0px';
      }
    }
  }
}
