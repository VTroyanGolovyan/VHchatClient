function sound() {
  window.navigator.vibrate(500);
  var audio = document.getElementById('audio');
  audio.play();
}
function chek(){
    if (!userData.hash){
      localStorage.clear();
      location.href = 'index.html';
    }
    var xhr = VHquery.createRequest();
    xhr.open('GET',serverURL + 'index.php?hash='+ userData.hash + '&module=chek',false);
    xhr.send();
    if (xhr.responseText == '' || userData == undefined){
        localStorage.clear();
        location.hash = '#login/';
    }else{
      pollingInerval = setInterval(function(){
         eventGetter();
      },1000);
    }
}
function findusers(){
   var input = document.getElementById('findusers');
   location.hash = '#find/'+input.value;
}

function exit(){
  clearInterval(  pollingInerval );
  var data = JSON.parse(localStorage.getItem('data'));
  localStorage.removeItem('data');
  if (data.length >1){
       var newData = new Array();
       for (var i = 0; i < data.length; i++){
           if (data[i].hash != userData.hash){
                newData.push(data[i]);
           }
       }
       localStorage.setItem('data',JSON.stringify(newData));
  }
  VHquery.GET(serverURL+'index.php?hash='+userData.hash+'&module=logout',function(){
     location.hash = '#login';
  })
}
var getterUpdate = new Date().getTime() - 1000;

function eventGetter(){
     VHquery.POSTJSON(serverURL + 'index.php?hash='+ userData.hash + '&module=events','',function(response){
         for (var i = 0;i<response.length;i++){
           if (response[i].type == 'msg'){
             var hash = location.hash.slice(1);
             var arr=hash.split('/');
             if(arr[1] == response[i].href){
               document.getElementById('hidden_input').checked = true;
             }else{
                sound();
                var eventDiv = document.createElement('div');
                eventDiv.className = 'eventDiv';
                var left = document.createElement('div');
                left.className = 'eventDivLeft';
                var leftHeader = document.createElement('div');
                leftHeader.className = 'eventDivLeftHeader';
                var leftFooter = document.createElement('div');
                var right = document.createElement('div');
                right.setAttribute('data-href',response[i].href);
                leftHeader.innerHTML = 'new message:';
                right.innerHTML = 'look';
                leftFooter.innerHTML = response[i].text;
                right.className = 'showEvt';
                right.onclick = function(){
                  location.hash = '#dialog/' + this.getAttribute('data-href');
                  eventDiv.remove();
                }
                left.appendChild(leftHeader);
                left.appendChild(leftFooter);
                var x = document.createElement('div');
                x.className = 'antifloat';
                eventDiv.appendChild(left);
                eventDiv.appendChild(right);
                eventDiv.appendChild(x);
                document.body.appendChild(eventDiv);
                setTimeout(function(){
                  eventDiv.remove();
                },6000);
             }
         }else if(response[i].type == 'typing'){
           var hash = location.hash.slice(1);
           var arr=hash.split('/');
           if(arr[1] == response[i].href){
             getterUpdate = new Date().getTime();
             document.getElementById('writingUsers').innerHTML = response[i].text + ' typing';
             setTimeout(function(){
               if (new Date().getTime() - getterUpdate >= 1000){
                 document.getElementById('writingUsers').innerHTML = '';
               }
             },1000);
           }
         }
       }
     });
}
