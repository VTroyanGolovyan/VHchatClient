function accountController(){
     if (localStorage.getItem('data')){
            if( !JSON.parse(localStorage.getItem('data')) ){
              localStorage.clear();
              location.reload();
            }
            var data = JSON.parse(localStorage.getItem('data'));
            openbox('controllerDIV');
            if (!data[0]){
              localStorage.clear();
              location.reload();
            }
            document.getElementById('controllerProfilesContainer').innerHTML = '';
            for (var i = 0; i < data.length; i++){
                 var accountDiv = document.createElement('div');
                 accountDiv.className = "accountDiv";
                 accountDiv.innerHTML = data[i].name_and_second_name;
                 accountDiv.setAttribute('data-info',i);
                 accountDiv.onclick = function(){
                      var i = this.getAttribute('data-info');
                      data = JSON.parse(localStorage.getItem('data'));
                      userData = data[i];
                      var tmp = data[i];
                      data[i] = data[0];
                      data[0] = tmp;
                      location.hash = '#profile/' + userData.id;
                 }
                 document.getElementById('controllerProfilesContainer').appendChild(accountDiv);
            }
     }
}
