var VHquery = {
    createRequest:function(){

                var http;
                if ( window.XMLHttpRequest ){
                    http = new XMLHttpRequest();
                  }else if( window.ActiveXObject ){
                    http = new ActiveXObject('Microsoft.XMLHTTP');
                  }else if(!http){
                    http = new ActiveXObject('Msxml2.XMLHTTP');
                  }
                return http;

              },
    loadScript:function(url){
                'use strict';
                var http = VHquery.createRequest();
                http.open('GET',url,false);
                http.send();
                eval(http.responseText);
               },
    GET:function(url,callback,loading = function(){}){
                loading();
                var http = VHquery.createRequest();
                http.open('GET',url,true)
                http.onreadystatechange=function(){
                  if (http.readyState==4){
                      callback();
                    }
                }
                http.send();
    },
    POST:function(url,body,callback,loading = function(){}){
                loading();
                var http = VHquery.createRequest();
                http.open('POST',url,true);
                http.onreadystatechange=function(){
                  if (http.readyState==4){
                      callback();
                    }
                }
                http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                http.send(body);
    },
    POSTJSON:function(url,body = '',callback = function(response){},error = function(){},loading = function(){}){
                loading();
                var http = VHquery.createRequest();
                http.open('POST',url,true)
                http.onreadystatechange=function(){
                  if (http.readyState==4){
                    if (http.responseText !=''){
                        callback(JSON.parse(http.responseText));
                    }else{
                        error();
                    }
                  }
                }
                http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                http.send(body);
    },
    GETJSON:function(url,callback,error = function(){},loading = function(){}){
                loading();
                var http = VHquery.createRequest();
                http.open('GET',url,true)
                http.onreadystatechange=function(){
                  if (http.readyState==4){
                    if (http.responseText !=''){
                       callback(JSON.parse(http.responseText));
                    }else{
                        error();
                    }
                  }
                }
                http.send();
    },
    GETHTML:function(url,id,callback,loading = function(){}){
                loading();
                var http = VHquery.createRequest();
                http.open('GET',url,true)
                http.onreadystatechange=function(){
                  if (http.readyState==4){
                    document.getElementById(id).innerHTML = http.responseText;
                    callback();
                  }
                }
                http.send();
    },
    POSTHTML:function(url,id,body,callback,loading = function(){}){
                loading();
                var http = VHquery.createRequest();
                http.open('POST',url,true)
                http.onreadystatechange=function(){
                  if (http.readyState==4){
                    document.getElementById(id).innerHTML = http.responseText;
                    callback();
                  }
                }
                http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                http.send(body);
    },
    uploadFile:function(url,file,onload = function(){},onprogress = function(evt){}){
                var xhr = new XMLHttpRequest();
                // обработчик для закачки
                xhr.upload.onprogress = function(event) {
                    onprogress(event);
                //log(event.loaded + ' / ' + event.total);
                }
                // обработчики успеха и ошибки
                // если status == 200, то это успех, иначе ошибка
                xhr.onload = function() {
                    if (this.status == 200) {
                      if( xhr.responseText!=''){
                         onload(JSON.parse(xhr.responseText));
                      }else{
                         onload('');
                      }
                    } else {
                    }
                };
                xhr.open("POST", url, true);
                xhr.send(file);
    }
}
