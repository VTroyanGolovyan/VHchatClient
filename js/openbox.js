function openbox(id){
    display = document.getElementById(id).style.display;
    if(display=='block'){
        document.getElementById(id).style.display='none';
    }else{
        document.getElementById(id).style.display='block';
    }
}
