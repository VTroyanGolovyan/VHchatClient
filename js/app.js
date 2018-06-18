var serverURL='http://vh.biz.ua/vh/server/';
var imageServer='http://vh.biz.ua/vh/image_server/';
var   pollingInerval;
function UserData(response){
    this.hash = response.hash;
    this.id = response.id;
    this.name_and_second_name = response.name_and_second_name;
    this.avatar = response.avatar;
    this.dialoges = new Array();
    this.contacts = new Array();
    this.users = new Array();
}
window.addEventListener('hashchange',onhashchange);

var userData;
if (localStorage.getItem('data')){
     if( !JSON.parse(localStorage.getItem('data')) ){
       localStorage.clear();
       location.href = 'index.html';
     }
     data = JSON.parse(localStorage.getItem('data'));
     if (!data[0]){
       localStorage.clear();
       location.href = 'index.html';
     }
     userData = data[0];
     chek();
     if (location.hash == ''){
         location.hash = '#messages/';
     }else{
         onhashchange();
     }
}else{
  if (location.hash == ''){
      location.hash = '#login/';
  }else{
        onhashchange();
  }
}

function onhashchange(){
        if (location.hash != render.lastDialog){
             clearInterval(render.interval);
        }
        var hash = location.hash.slice(1);
        var arr=hash.split('/');

        switch(arr[0]){
            case 'find':
              shablonController.changeShablon('home',function(){
                  var container = document.getElementById('allcontent');
                  container.innerHTML = '';
                  VHquery.POSTJSON(serverURL+'index.php?hash='+userData.hash+'&module=find','text='+arr[1],function(response){
                    var container = document.getElementById('allcontent');
                    container.innerHTML = '';
                    render.userlist(response,'allcontent',true);
                  },function(){
                    var container = document.getElementById('allcontent');
                    container.innerHTML = 'Ничего не найдено';
                  },function(){
                    var container = document.getElementById('allcontent');
                    container.innerHTML = '';
                    mini_spiner(container);
                  })
              });
              break
            case 'messages':
              shablonController.changeShablon('home',function(){
                var container = document.getElementById('allcontent');
                container.innerHTML = '';
                VHquery.POSTJSON(serverURL+'index.php?hash='+userData.hash+'&module=getuserdialogs','',function(response){
                    var container = document.getElementById('allcontent');
                    container.innerHTML = '';
                    var dialogsContainer = document.createElement('div');
                    container.appendChild(dialogsContainer);
                    dialogsContainer.className = "contactContainer"
                    dialogsContainer.id = "dialogsContainer";
                    render.dialogList(response,'dialogsContainer');
                },function(){

                    var container = document.getElementById('allcontent');
                    container.innerHTML = '';
                    var hint = document.createElement('div')
                    hint.innerHTML = 'Пусто, cоздайте диалог c кем либо!';
                    hint.className = 'hintUser';
                    container.appendChild(hint);
                },function(){
                    var container = document.getElementById('allcontent');
                    container.innerHTML = '';
                    mini_spiner(container);
                })
              });
              break
            case 'contacts':
              shablonController.changeShablon('home',function(){
                 var container = document.getElementById('allcontent');
                 container.innerHTML = '';
                 VHquery.GETJSON(serverURL+'index.php?hash='+userData.hash+'&module=contacts',function(response){
                   var container = document.getElementById('allcontent');
                   container.innerHTML = '';
                   var contactContainer = document.createElement('div');
                   container.appendChild(contactContainer);
                   contactContainer.className = "contactContainer"
                   contactContainer.id = "contactContainer";
                   render.userlist(response,'contactContainer',true);
                 },function(){
                   var container = document.getElementById('allcontent');
                   container.innerHTML = '';
                   var hint = document.createElement('div')
                   hint.innerHTML = 'Пусто, воспользуйтесь поиском! Для этого введите имя пользователя,'+
                                      'которого ищете(например Vladislav Hacker) в форму слева вверху и нажмите увеличительное стекло.';
                   hint.className = 'hintUser';
                   container.appendChild(hint);

                 },function(){
                     var container = document.getElementById('allcontent');
                     container.innerHTML = '';
                     mini_spiner(container);
                 })
              });
              break
            case 'profile':
              if (arr[1]==''){
                if (userData.id){
                   id = userData.id;
                 }
              }else id = arr[1];
              shablonController.changeShablon('home',function(){
                VHquery.GETJSON(serverURL+'index.php?hash='+userData.hash+'&module=getuserinfo'+'&id='+id,function(response){
                  render.userprofile(response,'allcontent');
                },
                function(){},
                function(){
                    var container = document.getElementById('allcontent');
                    container.innerHTML = '';
                    mini_spiner(container);
                })
              });
              break
            case 'settings':
              shablonController.changeShablon('home',function(){
                  var container = document.getElementById('allcontent');
                  render.settings(container);
              })
              break
            case 'reg':
              shablonController.changeShablon('reg',function(){
                  var form = document.getElementById('regform');
                  form.onsubmit = function(){
                    var form = document.getElementById('regform');
                    var body = 'name='+form.name.value+'&second_name='+form.second_name.value
                    +'&gmail='+form.gmail.value+'&password='+form.password.value+'&chek='+form.chek.value +
                     '&country=' + form.country.value + '&city=' + form.city.value;
                    VHquery.POSTJSON(serverURL+'index.php?module=reg',body,function(response){
                      if (response.status){
                        location.hash = '#login/';
                      }else{
                        document.getElementById('regerror').innerHTML = response.text;
                      }
                    });
                    return false;
                  }
                  render.countries(document.getElementById('countrySelect'));
                  document.getElementById('countrySelect').onchange = function(){
                    render.cities(document.getElementById('citySelect'),this.value);
                  }
                });

              break
            case 'login':
              shablonController.changeShablon('login',function(){
                var form = document.getElementById('sendform');

                form.onsubmit = function(){
                  var form = document.getElementById('sendform');
                  var body = 'gmail='+form.gmail.value+'&password='+form.password.value;
                  VHquery.POSTJSON(serverURL+'index.php?module=login',body,function(response){
                    if (response.status){
                      userData = new UserData(response);
                      var newData = new Array();
                      newData.push(userData);
                      if (localStorage.getItem('data')){
                            var oldData = JSON.parse(localStorage.getItem('data'));
                            for (var i = 0; i < oldData.length; i++){
                                 newData.push(oldData[i]);
                            }
                      }
                      localStorage.setItem('data',JSON.stringify(newData));
                      location.hash = '#profile/'+userData.id;

                      pollingInerval = setInterval(function(){
                          eventGetter();
                      },10000);
                    }else{
                      document.getElementById('error').innerHTML = response.text;
                    }
                  });
                  return false;
                }

              });
              break
            case 'dialog':
                shablonController.changeShablon('home',function(){
                    VHquery.POSTJSON(serverURL+'index.php?hash='+userData.hash+'&module=getdialog&dialog='+arr[1],'',function(response){
                        render.dialog(response,'allcontent',arr[1]);
                    },function(){
                      var container = document.getElementById('allcontent');
                      container.innerHTML = '';
                      render.forbiden(container);
                    },function(){
                      var container = document.getElementById('allcontent');
                      container.innerHTML = '';
                      mini_spiner(container);
                    });
                });
              break
              case 'news':

                shablonController.changeShablon('home',function(){
                    VHquery.POSTJSON(serverURL+'index.php?hash='+userData.hash+'&module=news','',function(response){
                        var container = document.getElementById('allcontent');
                        container.innerHTML = '';
                        var newsContainer = document.createElement('div');
                        newsContainer.className = 'newsContainer';
                        var infoBlockCenter = document.createElement('div');
                        infoBlockCenter.className = 'info_block_section';

                        render.sendPanel(infoBlockCenter,userData.id);
                        newsContainer.appendChild(infoBlockCenter);
                        render.news(response, newsContainer);

                        container.appendChild(newsContainer);
                    },function(){
                      var container = document.getElementById('allcontent');
                      container.innerHTML = '';
                      var newsContainer = document.createElement('div');
                      newsContainer.className = 'newsContainer';
                      var infoBlockCenter = document.createElement('div');
                      infoBlockCenter.className = 'info_block_section';

                      render.sendPanel(infoBlockCenter,userData.id);
                      newsContainer.appendChild(infoBlockCenter);

                      container.appendChild(newsContainer);
                    },function(){
                      var container = document.getElementById('allcontent');
                      container.innerHTML = '';
                      mini_spiner(container);
                    });
                });
                break
              case 'wall':
                shablonController.changeShablon('home',function(){
                    VHquery.POSTJSON(serverURL+'index.php?hash='+userData.hash+'&module=onewall','',function(response){
                        var container = document.getElementById('allcontent');
                        container.innerHTML = '';
                        var newsContainer = document.createElement('div');
                        newsContainer.className = 'newsContainer';
                        var infoBlockCenter = document.createElement('div');
                        infoBlockCenter.className = 'info_block_section';

                        render.sendPanel(infoBlockCenter,userData.id);
                        newsContainer.appendChild(infoBlockCenter);
                        render.oneWall(response, newsContainer);

                        container.appendChild(newsContainer);
                    },function(){
                      var container = document.getElementById('allcontent');
                      container.innerHTML = '';
                      var newsContainer = document.createElement('div');
                      newsContainer.className = 'newsContainer';
                      var infoBlockCenter = document.createElement('div');
                      infoBlockCenter.className = 'info_block_section';

                      render.sendPanel(infoBlockCenter,userData.id);
                      newsContainer.appendChild(infoBlockCenter);

                      container.appendChild(newsContainer);
                    },function(){
                      var container = document.getElementById('allcontent');
                      container.innerHTML = '';
                      mini_spiner(container);
                    });
                });
                break
              default:
                shablonController.changeShablon('home',function(){
                  var container = document.getElementById('allcontent');
                  container.innerHTML = '';
                  var cccont = document.createElement('div');
                  cccont.className = 'cccont';
                  cccont.innerHTML = '404 not found :(';
                  container.appendChild(cccont);
                  var text = document.createElement('div');
                  text.className = 'cctext';
                  text.innerHTML = '';
                  container.appendChild(text);
                });
                break
        }
}
