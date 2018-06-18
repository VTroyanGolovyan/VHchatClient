function changeTheme(href){
  var link = document.createElement('link');
  link.setAttribute('rel','stylesheet');
  link.setAttribute('type','text/css');
  link.setAttribute('href',href);
  document.head.appendChild(link);
  localStorage.theme = href;
}
var render = {
     hash:'nivund vindicjcifjoi giudioio ji cejsircjcijgrjmtiumx,le.p,ico4r98mum9c8tcw8r cce',
     interval:'',
     lastDialog:'',
     msglist:function(response,msgcontainer){
       for (var i = 0;i<response.length;i++){
            var messageBlock,messageLeft,messageRight,antifloat,link,time,name,top,bottom,messageText;
            messageBlock = document.createElement('div');
            messageBlock.className = 'messageBlock';
            messageLeft = document.createElement('div');
            messageLeft.className = 'messageBlockLeft';

            link = document.createElement('a');
            link.href = '#profile/'+response[i].senderid;
            messageAvatar = new Image();
            if (response[i].avatar!=''){
                messageAvatar.src = serverURL + response[i].avatar;
            }else{
                messageAvatar.src = serverURL + 'avatars/defolt.jpg';
            }
            messageAvatar.onload = function(){
              if (this.height < this.width){
                 this.style.width = 'auto';
                 this.style.height = '50px';
              }
            }
            link.appendChild(messageAvatar);
            messageLeft.appendChild(link);

            messageRight = document.createElement('div');
            messageRight.className = 'messageBlockRight';

            name = document.createElement('div');
            name.innerHTML = response[i].sender;


            time = document.createElement('div');
            time.innerHTML = response[i].send_time;

            top = document.createElement('div');
            top.className = 'messageRightTop';
            top.appendChild(name);
            top.appendChild(time);


            bottom = document.createElement('div');
            bottom.className = 'messageRightBottom';


            messageText = document.createElement('div');
            messageText.className = 'messageText';
            messageText.innerHTML = render.linker(response[i].message);
            var links = render.getLinks(response[i].message);
            if (links){
                for (var j =0; j<links.length;j++){
                  if (links[j].search("youtube.com/watch") != -1){
                    if (links[j].search("https://") == -1){
                      links[j] = 'https://' + links[j];
                    }
                    var arr=links[j].split('=');
                    var video_id = '';
                    for (var d = 1;d<arr.length;d++){
                      video_id = video_id + arr[d] + '=';
                    }
                    video_id = video_id.substring(0, video_id.length - 1)
                    var video = document.createElement('div');
                    video.innerHTML = '<iframe width="100%" height="400" src="http://www.youtube.com/embed/'+video_id+'" frameborder="0" allowfullscreen>тщпп</iframe>';
                    messageText.appendChild(video);
                  }
                }
            }
            if (response[i].attachments && response[i].attachments!=''){
              attachments = JSON.parse(response[i].attachments);
              if (attachments.images[0]){
                     var imgcontainer = document.createElement('div');
                     imgcontainer.setAttribute('data-imgsrc',imageServer + 'img.php?image_key='+attachments.images[0].key);
                     imgcontainer.innerHTML = 'Load image';
                     imgcontainer.className = 'LoadImgBotton';
                     imgcontainer.onclick = function(){
                       this.className = 'LoadImgBlock';
                       this.innerHTML = '';
                       var imgMsgAttach = new Image();
                       imgMsgAttach.onclick = function(){
                         bigImage(this);
                       }
                       imgMsgAttach.className = 'imgMsgAttach';
                       imgMsgAttach.src = this.getAttribute('data-imgsrc');
                       this.appendChild(imgMsgAttach);
                     }
                     if (!localStorage.getItem('photos')){
                       imgcontainer.click();
                     }
                     messageText.appendChild(imgcontainer);

              }
            }
            bottom.appendChild(messageText);
            messageRight.appendChild(top);
            messageRight.appendChild(bottom);
            messageBlock.appendChild(messageLeft);
            messageBlock.appendChild(messageRight);
            antifloat =  document.createElement('div');
            antifloat.className = 'antifloat';
            messageBlock.appendChild(antifloat);
            msgcontainer.appendChild(messageBlock);
       }
     },
     userlist:function(response,containerid,href,onclickUser = function(){}){
       var container = document.getElementById(containerid);

       for(var i = 0 ; i < response.length ; i++){
            if (href){
              var contact = document.createElement('a');
              contact.href = '#profile/' + response[i].id;
            }else{
              var contact = document.createElement('div');
            }
            contact.setAttribute('data-contactid',response[i].id);
            contact.className = 'contactDivObertka';
            contact.onclick = function(){
              var id = this.getAttribute('data-contactid');
              onclickUser(id);
            }
            var contactdiv = document.createElement('div');
            contactdiv.className = 'contactdiv';

            var contactAvatar = document.createElement('div');
            var img = new Image();
            contactAvatar.className = 'contact_image';
            contactAvatar.appendChild(img);
            img.className = 'miniImgContact';
            if (response[i].avatar == ''){
              img.src = serverURL + 'avatars/defolt.jpg';
            }else{
              img.src = serverURL + response[i].avatar;
            }
            img.onload = function(){
              if (this.height <= this.width){
                 this.style.width = 'auto';
                 this.style.height = '60px';
              }
            }
            var contactname = document.createElement('div');
            contactname.className = 'contact_name';
            var contactNameLeft = document.createElement('div');
            contactNameLeft.className = 'contactNameLeft';
            var usrName = document.createElement('div');
            usrName.className = 'usrName';
            var usrStatus = document.createElement('div');
            usrStatus.className = 'usrStatus';
            usrName.innerHTML = response[i].name + ' ' + response[i].second_name;
            usrStatus.innerHTML = response[i].status;
            var contactNameRight = document.createElement('div');
            contactNameRight.className = 'contactNameRight';
            var online = '';
            if (response[i].online == 1){
                online = 'online';
            }else online = 'offline';
            contactNameRight.innerHTML = online;
            var antifloat = document.createElement('div');
            antifloat.className='antifloat';

            contactNameLeft.appendChild(usrName);
            contactNameLeft.appendChild(usrStatus);
            contactname.appendChild(contactNameLeft);
            contactname.appendChild(contactNameRight);
            contactdiv.appendChild(contactAvatar);
            contactdiv.appendChild(contactname);
            contactdiv.appendChild(antifloat);
            contact.appendChild(contactdiv);
            container.appendChild(contact);
       }

     },
     userListDialog:function(response,containerid,href,onclickUser = function(){}){
       var container = document.getElementById(containerid);
       for(var i = 0 ; i < response.length ; i++){

           if(response[i].id == userData.id){
             if (href){
               var contact = document.createElement('a');
               contact.href = '#profile/' + response[i].id;
             }else{
               var contact = document.createElement('div');
             }
             contact.setAttribute('data-contactid',response[i].id);
             contact.className = 'contactDivObertka';
             contact.onclick = function(){
               var id = this.getAttribute('data-contactid');
               onclickUser(id);
             }
             var contactdiv = document.createElement('div');
             contactdiv.className = 'contactdiv';


             var contactAvatar = document.createElement('div');
             var img = new Image();
             contactAvatar.className = 'contact_image';
             contactAvatar.appendChild(img);
             img.className = 'miniImgContact';
             if (response[i].avatar == ''){
               img.src = serverURL + 'avatars/defolt.jpg';
             }else{
               img.src = serverURL + response[i].avatar;
             }
             img.onload = function(){
               if (this.height < this.width){
                  this.style.width = 'auto';
                  this.style.height = '50px';
               }
             }
             var contactname = document.createElement('div');
             contactname.className = 'contact_name';
             var online = '';
             if (response[i].online == 1){
                 online = '*';
             }
             contactname.innerHTML = response[i].name + ' ' + response[i].second_name+' '+online;

             var antifloat = document.createElement('div');
             antifloat.className='antifloat';

             contactdiv.appendChild(contactAvatar);
             contactdiv.appendChild(contactname);
             contactdiv.appendChild(antifloat);
             contact.appendChild(contactdiv);
             container.appendChild(contact);
           }else{
             var contact = document.createElement('div');
             var href = document.createElement('a');
             href.href = '#profile/' + response[i].id;
             var contactdiv = document.createElement('div');
             contactdiv.className = 'contactdiv2';
             var contactAvatar = new Image();
             contactAvatar.className = 'contact_image';

             if (response[i].avatar == ''){
               contactAvatar.src = serverURL + 'avatars/defolt.jpg';
             }else{
               contactAvatar.src = serverURL + response[i].avatar;
             }

             var contactname = document.createElement('div');
             contactname.className = 'contact_name';
             contactname.innerHTML = response[i].name + ' ' + response[i].second_name;

             var userDelete = document.createElement('div');
             userDelete.setAttribute('data-userid',response[i].id);
             userDelete.className = 'userDeleteFromDialog';
             userDelete.onclick = function(){
                 onclickUser(this.getAttribute('data-userid'));
             }
             var antifloat = document.createElement('div');
             antifloat.className='antifloat';
             contactdiv.appendChild(contactAvatar);
             contactdiv.appendChild(contactname);
             contactdiv.appendChild(antifloat);
             href.appendChild(contactdiv);
             contact.appendChild(href);
             var obertka = document.createElement('div');
             obertka.className = 'userDeleteFromDialogObertka';
             obertka.appendChild(userDelete)
             contact.appendChild(obertka);
             antifloat = document.createElement('div');
             antifloat.className='antifloat';
             contact.appendChild(antifloat);
             container.appendChild(contact);
           }

       }

     },
     dialogList:function(response,containerid){
            var container = document.getElementById(containerid);
            var link,dialogBlock,dialogBlockLeft,dialogBlockRight,dialogImg,antifloat,nameDialoglastMSG,count;
            for (var i = 0; i<response.length; i++){
                 link = document.createElement('a');
                 link.href = '#dialog/'+response[i].dialog_table;
                 dialogBlock = document.createElement('div');
                 dialogBlock.className = 'dialogBlock';
                 dialogBlockLeft = document.createElement('div');
                 dialogBlockLeft.className = 'dialogBlockLeft';
                 dialogImg = new Image();
                 dialogImg.className = 'dialogImage';
                 dialogImg.src = serverURL+response[i].dialog_img;
                 dialogImg.onload = function(){
                   if (this.height < this.width){
                      this.style.width = 'auto';
                      this.style.height = '60px';
                   }
                 }
                 dialogBlockRight = document.createElement('div');
                 dialogBlockRight.className = 'dialogBlockRight';

                 dialogBlockRightTop = document.createElement('div');
                 dialogBlockRightTop.className = 'dialogBlockRightTop';
                 dialogBlockRightTop.innerHTML = response[i].dialog_name;

                 if (response[i].unread > 0){
                    count = document.createElement('span');
                    count.innerHTML = response[i].unread;
                    count.className = 'dialogCounter';
                    dialogBlockRightTop.appendChild(count);

                 }
                 dialogBlockRightBottom = document.createElement('div');
                 dialogBlockRightBottom.className = response[i].last_msg == 'photo' ? 'dialogBlockRightBottom blue' : 'dialogBlockRightBottom';
                 dialogBlockRightBottom.innerHTML = render.linker(response[i].last_msg);

                 antifloat = document.createElement('div');
                 antifloat.className = 'antifloat';
                 dialogBlockLeft.appendChild(dialogImg);
                 dialogBlock.appendChild(dialogBlockLeft);
                 dialogBlockRight.appendChild(dialogBlockRightTop);
                 dialogBlockRight.appendChild(dialogBlockRightBottom);
                 dialogBlock.appendChild(dialogBlockRight);
                 dialogBlock.appendChild(antifloat);
                 link.appendChild(dialogBlock);
                 container.appendChild(link);
            }
     },
     userprofile:function(response,containerid){
            var container = document.getElementById(containerid);
            container.innerHTML = '';
            var avatar = new Image();
            var avatarOblojka = document.createElement('div');
            if (response.avatar == ''){
              avatar.src = serverURL + 'avatars/defolt.jpg';
            }else{
              avatar.src = serverURL + response.avatar;
            }
            avatar.onclick = function(){
              bigImage(this);
            }
            avatar.className = 'big_avatar';
            avatarOblojka.className = "avatarOblojka";
            avatarOblojka.appendChild(avatar);

            var avatarBlock = document.createElement('div');
            avatarBlock.className='avatar_block';
            avatarBlock.appendChild(avatarOblojka);
            if (response.id == userData.id){
                var counter = document.createElement('div');
                counter.className = 'uploadAvatarCounter';
                var updateAvatarSelect = document.createElement('input');
                updateAvatarSelect.onchange = function(){
                  var file = updateAvatarSelect.files[0];
                  if (file){
                      var data = new FormData();
                      data.append('avatar',file);
                      VHquery.uploadFile(serverURL+'index.php?hash='+userData.hash+'&module=update_avatar',data,function(response){
                            avatar.src = serverURL + response.src  + '?'+Math.random();
                            counter.innerHTML = 'OK';
                        },function(evt){
                            counter.innerHTML = Math.floor(evt.loaded/1000) + ' / ' +
                                                Math.floor(evt.total/1000) + 'KB';
                        });
                      }
                }
                updateAvatarSelect.setAttribute('type','file');
                updateAvatarSelect.setAttribute('id','updateAvatarSelect');
                updateAvatarSelect.style.display = 'none';
                var updateAvatarBotton = document.createElement('label');
                updateAvatarBotton.className = 'addContactBotton';
                updateAvatarBotton.innerHTML = 'Поменять аватар';
                updateAvatarBotton.setAttribute('for','updateAvatarSelect');
                avatarBlock.appendChild(counter);
                avatarBlock.appendChild(updateAvatarSelect);
                avatarBlock.appendChild(updateAvatarBotton);
            }


            var bottons = document.createElement('div');
            var addContactBotton = document.createElement('div');

            if (response.contact){
                addContactBotton.className = 'addContactBotton';
                addContactBotton.innerHTML = 'Удалить контакт';
                addContactBotton.onclick = function(){
                     VHquery.GET(serverURL+'index.php?hash='+userData.hash+'&module=deletecontact&id='+response.id,function(){
                       addContactBotton.innerHTML = 'Добавить контакт';
                     })
                };
            }else{
               if (response.id != userData.id){
                  addContactBotton.className = 'addContactBotton';
                  addContactBotton.innerHTML = 'Добавить контакт';
                  addContactBotton.onclick = function(){
                       VHquery.GET(serverURL+'index.php?hash='+userData.hash+'&module=addcontact&id='+response.id,function(){
                         addContactBotton.innerHTML = 'Удалить контакт';
                       });
                  }
               }
            }
            bottons.appendChild(addContactBotton);

            if (response.id != userData.id){
                 var createDialogBotton = document.createElement('div');
                 createDialogBotton.className = 'addContactBotton';
                 createDialogBotton.innerHTML = 'Create dialog';
                 createDialogBotton.onclick = function(){
                      var sendArr = new Array();
                      sendArr[0] = response.id;
                      VHquery.POST(serverURL+'index.php?hash='+userData.hash+'&module=dialogescontroller&type=create',
                                       'users='+JSON.stringify(sendArr),function(){
                                            location.hash = '#messages';
                                        });
                 }
                 bottons.appendChild(createDialogBotton);
            }

            avatarBlock.appendChild(bottons);

            container.appendChild(avatarBlock);

            var infoBlock = document.createElement('div'),
                infoBlockTop = document.createElement('div'),
                infoBlockBottom = document.createElement('div'),
                infoBlockCenter = document.createElement('div'),
                infoBlockCenter2 = document.createElement('div');
            infoBlockTop.className = 'info_block_section';
            infoBlockBottom.className = 'info_block_section1';
            infoBlockCenter.className = 'info_block_section';
            infoBlock.className = 'info_block';

            var infoBlockHeader = document.createElement('div');
            infoBlockHeader.className = 'infoBlockHeader';
            infoBlockHeader.innerHTML = response.name +' '+response.second_name;


            var statusDiv = document.createElement('div');
            statusDiv.className = 'info_block_section';
            var statusInput = document.createElement('input');
            statusInput.className = 'statusInput';
            statusInput.value = response.userstatus;
            if (response.id == userData.id && response.userstatus == ''){
              statusInput.setAttribute('placeholder','Ваш статус');
            }

            if (response.id != userData.id){
              statusInput.setAttribute('readonly','');
              statusInput.className = 'statusInputReadonly';
            }
            statusInput.onchange = function(){
                VHquery.POST(serverURL + 'index.php?hash='+userData.hash+'&module=profilecontroller&type=changestatus','status=' + statusInput.value,function(){

                });
            }
            statusDiv.appendChild(statusInput);

            infoBlockTop.appendChild(infoBlockHeader);
            infoBlock.appendChild(infoBlockTop);
            infoBlock.appendChild(statusDiv);
            render.infoUser(infoBlockCenter2,response);



            if (response.id != userData.id && response.userstatus == ''){
              statusDiv.remove();
            }


            var userGalery = document.createElement('div');
            var userIdId = response.id;
            VHquery.POSTJSON(serverURL + 'index.php?hash='+userData.hash+'&module=photocontroller&type=get&userid='+response.id,'',function(response){
              render.galery(userGalery,response,userIdId);
            },function(){

            });

            infoBlock.appendChild(infoBlockCenter2);

            infoBlock.appendChild(userGalery);


            infoBlock.appendChild(infoBlockCenter);

            infoBlock.appendChild(infoBlockBottom);
            container.appendChild(infoBlock);

            var antifloat = document.createElement('div');
            antifloat.className='antifloat';
            container.appendChild(antifloat);
            if (response.id == userData.id){
                render.sendPanel(infoBlockCenter,userData.id);
            }
            render.wall(infoBlockBottom,response.id);
     },
     dialog:function(response,containerid,dialoghash){
           render.lastDialog = location.hash;

           var container = document.getElementById(containerid);
           var msgcontainer = document.createElement('div');
           msgcontainer.className = 'msgContainer';
           container.innerHTML = '';
           var dialogHeader = document.createElement('div');
           dialogHeader.className = 'dialogHeader';

           var dialogSettingsPanel = document.createElement('div');
           dialogSettingsPanel.setAttribute('id','dialogSettingsPanel');
           dialogSettingsPanel.className = 'dialogSettingsPanel';
           dialogSettingsPanel.innerHTML = 'dialogSettingsPanel';

           container.appendChild(dialogSettingsPanel);

           var dialogHeaderLeft = document.createElement('div');
           dialogHeaderLeft.innerHTML = response.dialog_name;
           dialogHeaderLeft.className = 'dialogHeaderLeft';

           var dialogHeaderRight = document.createElement('div');
           dialogHeaderRight.className = 'dialogHeaderRight';
           dialogHeaderRight.onclick = function(){

               if (dialogSettingsPanel.style.display == 'block'){
                 dialogSettingsPanel.style.display = 'none';
               }else{
                 dialogSettingsPanel.style.display = 'block';
                 dialogSettingsPanel.innerHTML = '';

                 var gapNameDialogName = document.createElement('div');
                 gapNameDialogName.innerHTML = 'Dialog name';
                 gapNameDialogName.className = 'gapName';
                 dialogSettingsPanel.appendChild(gapNameDialogName);
                 var changeDialogName = document.createElement('form');
                 var changeInput = document.createElement('input');
                 changeInput.className = 'changeDialogNameInput';
                 var changeSubmit = document.createElement('input');
                 changeSubmit.value = 'Save';
                 changeSubmit.className = 'changeDialogNameSubmit';
                 changeInput.value = response.dialog_name;
                 changeSubmit.setAttribute('type','submit')
                 changeDialogName.appendChild(changeInput);
                 changeDialogName.appendChild(changeSubmit);
                 dialogSettingsPanel.appendChild(changeDialogName);
                 changeDialogName.onsubmit = function(){
                    VHquery.POST(serverURL+'index.php?hash='+userData.hash+'&module=dialogescontroller&dialog='+response.table_name+'&type=change_name','name='+changeInput.value,function(){
                          onhashchange();
                    })
                    return false;
                 }

                 var gapNameImg = document.createElement('div');
                 gapNameImg.innerHTML = 'Image';
                 gapNameImg.className = 'gapName';
                 changeImgButton = document.createElement('label');
                 changeImgButton.setAttribute('for','updateDialogImage')
                 changeImgButton.className = 'addContactBotton';
                 changeImgButton.innerHTML = 'Update';
                 var dialogTableName = response.table_name;
                 var updateDialogImage = document.createElement('input');
                 updateDialogImage.setAttribute('id','updateDialogImage');
                 updateDialogImage.setAttribute('type','file');
                 updateDialogImage.style.display = 'none';
                 updateDialogImage.onchange = function(){
                   //tuta
                   var file = updateDialogImage.files[0];
                   if (file){
                       var data = new FormData();
                       data.append('image',file);
                       VHquery.uploadFile(serverURL+'index.php?hash='+userData.hash+'&module=dialogescontroller&dialog='+dialogTableName+'&type=update_dialog_image',data,function(responseimg){
                            dialogImg.src =serverURL + responseimg.src;
                            response.dialog_img = responseimg.src;
                         },function(evt){
                             //counter.innerHTML = Math.floor(evt.loaded/1000) + ' / ' +
                             //                   MatstatusDivh.floor(evt.total/1000) + 'KB';
                         });
                       }
                 }
                 dialogSettingsPanel.appendChild(gapNameImg);
                 dialogSettingsPanel.appendChild(changeImgButton);
                 dialogSettingsPanel.appendChild(updateDialogImage);
                 var avatarSection = document.createElement('div');
                 var dialogImg = new Image();
                 dialogImg.src = serverURL + response.dialog_img;
                 dialogImg.className = 'dialogBigImg';
                 avatarSection.appendChild(dialogImg);
                 dialogSettingsPanel.appendChild(avatarSection);

                 var gapName = document.createElement('div');
                 gapName.innerHTML = 'Users';
                 gapName.className = 'gapName';
                 dialogSettingsPanel.appendChild(gapName);
                 var usersInDialog = document.createElement('div');
                 usersInDialog.setAttribute('id','usersInDialog');
                 dialogSettingsPanel.appendChild(usersInDialog);
                 var tablename = response.table_name;
                 var access = response.myaccess;
                 VHquery.POSTJSON(serverURL+'index.php?hash='+userData.hash+'&module=getusersfromdialog&dialog='+response.table_name,'',function(response){
                    if (access>=255){
                      render.userListDialog(response,'usersInDialog',true,function(id){
                        VHquery.GET(serverURL + 'index.php?hash='+userData.hash+'&module=dialogescontroller&dialog='+tablename+'&type=delete_user&userid='+id,function(){
                              onhashchange();
                        })
                      });
                    }else{
                      render.userlist(response,'usersInDialog',true);
                    }

                 })
                 var leaveDialogBotton = document.createElement('div');
                 leaveDialogBotton.innerHTML = 'Leave dialog';
                 leaveDialogBotton.className = 'LeaveDialogBotton';
                 leaveDialogBotton.onclick = function(){
                       VHquery.GET(serverURL + 'index.php?hash='+userData.hash+'&module=dialogescontroller&dialog='+response.table_name+'&type=delete_user&userid='+userData.id,function(){
                          location.hash = '#messages/';
                       })
                 }
                 dialogSettingsPanel.appendChild(leaveDialogBotton);
                 var addUserBotton = document.createElement('div');
                 addUserBotton.innerHTML = 'Add users';
                 addUserBotton.className = 'LeaveDialogBotton';
                 dialogSettingsPanel.appendChild(addUserBotton);
                 addUserBotton.onclick = function(){changestatus
                       var container = document.getElementById('dialogSettingsPanel');
                       container.innerHTML = '';
                       var table = response.table_name;
                       VHquery.POSTJSON(serverURL+'index.php?hash='+userData.hash+'&module=contacts','',function(response){
                         render.userlist(response,'dialogSettingsPanel',false,function(iduser){
                                var id = iduser;
                                var users = new Array();
                                users[0] = id;
                                VHquery.GET(serverURL+'index.php?hash='+userData.hash+'&module=dialogescontroller&dialog='+table
                                      +'&type=add_users'+'&users='+JSON.stringify(users),function(){
                                           dialogSettingsPanel.style.display = 'none';
                                      });
                         });
                       },function(){
                         var container = document.getElementById('allcontent');
                         container.innerHTML = 'Ничего не найдено';
                       })


                 }
               }
           }

           dialogHeader.appendChild(dialogHeaderLeft);
           dialogHeader.appendChild(dialogHeaderRight);
           container.appendChild(dialogHeader);
           if (response.messages == null || response.messages == undefined){

           }else{
                render.msglist(response.messages,msgcontainer);
                var scroller = document.createElement('div');
                container.appendChild(msgcontainer);
                container.appendChild(scroller);
                scroller.scrollIntoView(true);
                if (response.messages != ''){
                var mnid = response.messages[0].id;
                render.hash = location.hash;
                dh = response.table_name;
                var lastid = response.messages[0].id;
                document.getElementById('home').onscroll=function(){
                  if (this.scrollTop === 0 && render.hash == location.hash) {
                    VHquery.POSTJSON(serverURL + 'index.php?hash='+userData.hash+'&module=messages&dialog='+dh+'&max_id='+mnid,'',function(response){
                            mnid = response[0].id;
                            if (response[0].id != lastid){
                                lastid = response[0].id;
                                var tcon = document.createElement('div');
                                render.msglist(response,tcon);
                                var scroller = document.createElement('div');
                                var first0=msgcontainer.childNodes[0];
                                msgcontainer.insertBefore(scroller,first0);

                                var first=msgcontainer.childNodes[0];
                                msgcontainer.insertBefore(tcon,first);
                                scroller.scrollIntoView(true);
                            }
                    });
                  }
                }
              }
           }

           var sendpanel = document.createElement('div');
           sendpanel.className = "sendMessagePanel";
           var writing = document.createElement('div');
           writing.setAttribute('id','writingUsers');
           writing.className = 'writingUsers';
           sendpanel.appendChild(writing);
           var sendform = document.createElement('form');
           sendform.setAttribute('name','upload');
           var attachments = document.createElement('label');
           attachments.className = 'labelMessageAttachments';
           attachments.onclick = function(){
                openbox('attachmentsDiv');
           }

           var attachmentsDiv = document.createElement('div');
           attachmentsDiv.setAttribute('id','attachmentsDiv');
           attachmentsDiv.className = 'attachmentsDiv';
           attachmentsDiv.style.display = 'none';
           var photoSend = document.createElement('label');
           photoSend.className = 'photoSend';
           photoSend.setAttribute('for','attachPhoto');
           attachmentsDiv.appendChild(photoSend);
           container.appendChild(attachmentsDiv);


           var textarea = document.createElement('textarea');
           textarea.setAttribute('id',"msgTextArea");
           textarea.setAttribute('placeholder','Напишите ваше сообщение');
           var lastUpdate =new Date().getTime();
           textarea.oninput = function(){
             if (new Date().getTime() - lastUpdate >800){
               VHquery.POST(serverURL+'index.php?hash='+userData.hash+'&module=dialogescontroller&dialog='+response.table_name+'&type=typing','name='+userData.name_and_second_name,function() {
                 lastUpdate =new Date().getTime();
               })
             }
           }
           var attachPhotoInput = document.createElement('input');
           attachPhotoInput.setAttribute('type','file');
           attachPhotoInput.setAttribute('id','attachPhoto');
           attachPhotoInput.setAttribute('name','file');
           sendform.setAttribute('enctype','multipart/form-data');
           attachPhotoInput.style.display = 'none';
           var label = document.createElement('label');
           label.className = 'labelSubmitMessage';
           var submit = document.createElement('input');
           submit.setAttribute('type','submit');
           submit.value = 'send';
           submit.style.display = 'none';
           var openSmile = document.createElement('div');
           openSmile.className = "openSmileButton";
           openSmile.innerHTML = ":)"
           openSmile.onclick = function(){
             openbox("smileBar");
           }
           var smileBar = document.createElement('div');
           smileBar.style.display = "none";
           smileBar.className = "smileBar";
           smileBar.setAttribute("id","smileBar");
           render.smileBar(smileBar);
           container.appendChild(smileBar);
           label.appendChild(submit);
           sendform.appendChild(attachments);
           sendform.appendChild(textarea);
           sendform.appendChild(attachPhotoInput);
           sendform.appendChild(openSmile);
           sendform.appendChild(label);
           sendpanel.appendChild(sendform);
           container.appendChild(sendpanel);
           if (response.messages != ''){
             var min_id = response.messages[response.messages.length - 1].id;
           }else{
             var min_id = 0;
           }
           var flag = true;
           function getNewMessages(f){
             if (flag == true){
              flag = false;
              VHquery.POSTJSON(serverURL + 'index.php?hash='+userData.hash+'&module=messages&dialog='+dialoghash+'&min_id=' + min_id,'',function(response){
                if (response && response != ''){
                    min_id=response[response.length - 1].id;
                    render.msglist(response,msgcontainer);
                  }
                  if(f == true){
                    scroller.scrollIntoView(true);
                  }
                  flag = true;
              });
              }
           }

           sendform.onsubmit = function(){
                if (document.getElementById('attachmentsDiv').style.display == 'block'){
                    openbox('attachmentsDiv');
                }
                var file = attachPhotoInput.files[0];
                if (file){
                    var data = new FormData();
                    data.append('file',file);
                    openbox('progressBar');
                    VHquery.uploadFile(imageServer + 'save.php',data,function(response){
                      var attachments = {
                            images:new Array()
                      }
                      attachments.images[0] = {
                        key:response.key,
                        width:response.width,
                        height:response.height
                      };
                      var message = textarea.value;
                      textarea.value = '';

                      if(response.status){
                        VHquery.POST(serverURL + 'index.php?hash='+userData.hash+'&module=dialogescontroller&dialog='+dialoghash+'&type=send',
                               'message='+encodeURIComponent(message)+'&attachments='+JSON.stringify(attachments),function(){
                                    getNewMessages(true);
                                    attachPhotoInput.remove();
                                    attachPhotoInput = document.createElement('input');
                                    attachPhotoInput.setAttribute('type','file');
                                    attachPhotoInput.setAttribute('id','attachPhoto');
                                    attachPhotoInput.setAttribute('name','file');
                                    attachPhotoInput.style.display = 'none';
                                    sendform.appendChild(attachPhotoInput);
                               });
                      }else{
                        VHquery.POST(serverURL + 'index.php?hash='+userData.hash+'&module=dialogescontroller&dialog='+dialoghash+'&type=send',
                               'message='+encodeURIComponent(message),function(){
                                    getNewMessages(true);
                               });
                      }

                    },function(evt){
                      counter = document.getElementById('progressBarCouter');
                      counter.innerHTML = Math.floor(evt.loaded/1024) + ' KB / ' +
                                          Math.floor(evt.total/1024) + 'KB';
                      if (evt.loaded == evt.total)
                        openbox('progressBar');
                    });
                }else{
                    var message = textarea.value;
                    textarea.value = '';
                    VHquery.POST(serverURL + 'index.php?hash='+userData.hash+'&module=dialogescontroller&dialog='+dialoghash+'&type=send',
                           'message='+encodeURIComponent(message),function(){
                               getNewMessages(true);
                           });
                }
                return false;
           }
           if (window.innerWidth >= 480){
               textarea.onkeydown  = function(e){
                   if (((e.keyCode == 13) || (e.keyCode == 10)) && (e.shiftKey == false)){
                       label.click();   //enter
                   }
                   if (((e.keyCode == 13) || (e.keyCode == 10)) && (e.shiftKey == true)){
                       textarea.value += "\n" ; //enter+shift
                   }
                }
           }


           var input1 = document.createElement('input');
           input1.style.display = 'none';
           input1.setAttribute('id','hidden_input');
           input1.setAttribute('type','checkbox');
           container.appendChild(input1);
           render.interval = setInterval(function(){
             if (input1.checked){
               getNewMessages(false);
               input1.checked = false;
             }
           },200);
     },
     settings:function(container){
         container.innerHTML = '';

         var sessionsheader = render.header('Активные сессии:');
         container.appendChild(sessionsheader);
         var sessionsContainer = document.createElement('div');
         VHquery.POSTJSON(serverURL + 'index.php?hash='+userData.hash+'&module=sessionscontroller&type=print','',function(response){
           if (response.length > 0){
             render.sessionList(sessionsContainer,response);
           }else{
             sessionsheader.style.display = 'none';
           }
         })
         container.appendChild(sessionsContainer);

         if (localStorage.getItem('data')){
                headerTheme = render.header('Аккаунты:');
                container.appendChild(headerTheme);

                var data = JSON.parse(localStorage.getItem('data'));

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
                     container.appendChild(accountDiv);
                }
                var link = document.createElement('a');
                var linkDiv = document.createElement('div');
                linkDiv.innerHTML = 'Other account';
                link.setAttribute('href','#login/');
                link.appendChild(linkDiv);
                container.appendChild(link);
                var settingsPunct = render.button('Предзагрузка изображений');
                settingsPunct.onclick = function(){
                      if (localStorage.getItem('photos')){
                           localStorage.removeItem('photos');
                      }else{
                           localStorage.setItem('photos','VHchat');
                      }
                }
                settingsPunct.className = "accountDiv";
                container.appendChild(settingsPunct);
         }
     },
     header:function(text){
         var header = document.createElement('div');
         header.innerHTML = text;
         header.className = 'headerMini';
         return header;
     },
     sessionList:function(container,response){
         for (var i = 0; i<response.length ;i++){
            var sessionBlock = document.createElement('div');
            sessionBlock.className = 'whitediv';
            var sessionIp = document.createElement('div');
            sessionIp.className = 'sessioIp';
            var deleteButton = document.createElement('div');
            var x = document.createElement('div');
            x.className = 'sessionDelete';
            x.appendChild(deleteButton)
            deleteButton.setAttribute('session_id',response[i].id);
            deleteButton.className = 'userDeleteFromDialog';
            deleteButton.onclick = function(){
                var id = this.getAttribute('session_id');
                VHquery.GET(serverURL + 'index.php?hash='+userData.hash+'&module=sessionscontroller&type=delete&session_id='+id,function(){
                    onhashchange();
                })
            }
            sessionIp.innerHTML = response[i].session_ip + '<br/>' + response[i].user_agent;
            sessionBlock.appendChild(sessionIp);
            sessionBlock.appendChild(x);
            var antifloat = document.createElement('div');
            antifloat.className = 'antifloat';
            sessionBlock.appendChild(antifloat);
            container.appendChild(sessionBlock);
         }
     },
     button:function(text){
          var button = document.createElement('div');
          button.className = 'changeThemeBotton';
          button.innerHTML = text;
          return button;
     },
     sendPanel:function(container,id){
       var sendpanel = document.createElement('div');
       sendpanel.className = "sendMessagePanelNF";
       var sendform = document.createElement('form');
       sendform.setAttribute('name','upload');
       var attachments = document.createElement('label');
       attachments.className = 'labelMessageAttachments';
       attachments.onclick = function(){
            openbox('attachmentsDiv');
       }

       var attachmentsDiv = document.createElement('div');
       attachmentsDiv.setAttribute('id','attachmentsDiv');
       attachmentsDiv.className = 'attachmentsDiv2';
       attachmentsDiv.style.display = 'none';
       var photoSend = document.createElement('label');
       photoSend.className = 'photoSend';
       photoSend.setAttribute('for','attachPhoto');
       attachmentsDiv.appendChild(photoSend);



       var textarea = document.createElement('textarea');
       textarea.setAttribute('placeholder','Что у вас нового?')
       var attachPhotoInput = document.createElement('input');
       attachPhotoInput.setAttribute('type','file');
       attachPhotoInput.setAttribute('id','attachPhoto');
       attachPhotoInput.setAttribute('name','file');
       sendform.setAttribute('enctype','multipart/form-data');
       attachPhotoInput.style.display = 'none';
       var label = document.createElement('label');
       label.className = 'labelSubmitMessage';
       var submit = document.createElement('input');
       submit.setAttribute('type','submit');
       submit.value = 'send';
       submit.style.display = 'none';
       label.appendChild(submit);
       sendform.appendChild(attachments);
       sendform.appendChild(textarea);
       sendform.appendChild(attachPhotoInput);
       sendform.appendChild(label);
       sendpanel.appendChild(sendform);
       var antifloat = document.createElement('div');
       antifloat.className = 'antifloat';
       sendpanel.appendChild(antifloat);
       container.appendChild(sendpanel);
       container.appendChild(attachmentsDiv);
     sendform.onsubmit = function(){
          if (document.getElementById('attachmentsDiv').style.display == 'block'){
              openbox('attachmentsDiv');
          }
          var file = attachPhotoInput.files[0];
          if (file){
              var data = new FormData();
              data.append('file',file);
              openbox('progressBar');
              VHquery.uploadFile(imageServer + 'save.php',data,function(response){
                var attachments = {
                      images:new Array()
                }
                attachments.images[0] = {
                  key:response.key,
                  width:response.width,
                  height:response.height
                };
                var message = textarea.value;
                textarea.value = '';

                if(response.status){
                  VHquery.POST(serverURL + 'index.php?hash='+userData.hash+'&module=wallcontroller&type=push',
                         'text='+encodeURIComponent(message)+'&attachments='+JSON.stringify(attachments),function(){
                              attachPhotoInput.remove();
                              attachPhotoInput = document.createElement('input');
                              attachPhotoInput.setAttribute('type','file');
                              attachPhotoInput.setAttribute('id','attachPhoto');
                              attachPhotoInput.setAttribute('name','file');
                              attachPhotoInput.style.display = 'none';
                              sendform.appendChild(attachPhotoInput);
                              onhashchange();
                         });
                }else{

                }

              },function(evt){
                counter = document.getElementById('progressBarCouter');
                counter.innerHTML = Math.floor(evt.loaded/1024) + ' KB / ' +
                                    Math.floor(evt.total/1024) + 'KB';
                if (evt.loaded == evt.total)
                  openbox('progressBar');
              });
          }else{
              var message = textarea.value;
              textarea.value = '';
              VHquery.POST(serverURL + 'index.php?hash='+userData.hash+'&module=wallcontroller&type=push',
                     'text='+encodeURIComponent(message),function(){
                       onhashchange();
                     });
          }
          return false;
     }
     },
     wall:function(container,id){
         var wallcontainer = document.createElement('div');
         VHquery.POSTJSON(serverURL + 'index.php?hash='+userData.hash+'&module=wall&user=' + id,'',function(response){
                  for (var i = 0; i<response.length; i++){
                      var wall = render.note(response[i]);
                      wallcontainer.appendChild(wall);

                  }
                  container.appendChild(wallcontainer);
         })
     },
     note:function(response){
       var wall = document.createElement('div');
       wall.className = 'wall';
       var wallHeader = document.createElement('div');
       var wallHeaderLink = document.createElement('a');
       wallHeaderLink.href = '#profile/' + response.owner;
       var wallHeaderLinkDiv = document.createElement('div');
       var wallHeaderLeft = document.createElement('div');
       var wallHeaderRight = document.createElement('div');
       var wallHeaderRightTop = document.createElement('div');
       var wallHeaderRightBottom = document.createElement('div');

       wallHeader.className = 'wallHeader';
       wallHeaderLeft.className = 'wallHeaderLeft';
       wallHeaderRight.className = 'wallHeaderRight';
       wallHeaderRightBottom.className = 'wallHeaderRightBottom';
       wallHeaderRightTop.innerHTML = response.username;
       wallHeaderRightBottom.innerHTML = response.datetime;
       wallHeaderRight.appendChild(wallHeaderRightTop);
       wallHeaderRight.appendChild(wallHeaderRightBottom);
       wallHeaderLinkDiv.appendChild(wallHeaderLeft);
       var ava = new Image();
       ava.className = 'noteAvatar';
       if (response.avatar == ''){
         ava.src = serverURL + 'avatars/defolt.jpg';
       }else{
         ava.src = serverURL + response.avatar;
       }
       ava.onload = function(){
         if (this.height < this.width){
            this.style.width = 'auto';
            this.style.height = '60px';
         }else{
           this.style.width = '60px';
           this.style.height = 'auto';
         }
       }
       wallHeaderLeft.appendChild(ava);
       wallHeaderLinkDiv.appendChild(wallHeaderRight);
       wallHeaderLink.appendChild(wallHeaderLinkDiv);
       wallHeader.appendChild(wallHeaderLink);
       var x = document.createElement('div');
       x.className = 'antifloat';
       wallHeader.appendChild(x);
       wall.appendChild(wallHeader);

       var wallBody = document.createElement('div');
       wallBody.className = 'wallBody';
       wallBody.innerHTML = render.linker(response.text);
       var links = render.getLinks(response.text);
       if (links){
           for (var j =0; j<links.length;j++){
             if (links[j].search("youtube.com/watch") != -1){
               if (links[j].search("https://") == -1){
                 links[j] = 'https://' + links[j];
               }
               var arr=links[j].split('=');
               var video_id = '';
               for (var d = 1;d<arr.length;d++){
                 video_id = video_id + arr[d] + '=';
               }
               video_id = video_id.substring(0, video_id.length - 1)
               var video = document.createElement('div');
               video.innerHTML = '<iframe width="100%" height="400" src="http://www.youtube.com/embed/'+video_id+'" frameborder="0" allowfullscreen>тщпп</iframe>';
               wallBody.appendChild(video);
             }
           }
       }
       if (response.attachments && response.attachments!=''){
         attachments = JSON.parse(response.attachments);
         if (attachments.images[0]){
                var imgcontainer = document.createElement('div');
                imgcontainer.setAttribute('data-imgsrc',imageServer + 'img.php?image_key='+attachments.images[0].key);
                imgcontainer.innerHTML = 'Load image';
                imgcontainer.className = 'LoadImgBotton';
                imgcontainer.onclick = function(){
                  this.className = 'LoadImgBlock';
                  this.innerHTML = '';
                  var imgMsgAttach = new Image();
                  imgMsgAttach.onclick = function(){
                    bigImage(this);
                  }
                  imgMsgAttach.className = 'imgMsgAttach';
                  imgMsgAttach.src = this.getAttribute('data-imgsrc');
                  this.appendChild(imgMsgAttach);
                }
                wallBody.appendChild(imgcontainer);
                if (!localStorage.getItem('photos')){
                  imgcontainer.click();
                }
         }
       }
       wall.appendChild(wallBody);
       return wall;
     },
     news_max_id:0,
     news_flag:0,
     news:function(response,container){
       var wallcontainer = document.createElement('div');
       for (var i = 0; i<response.length; i++){
                    var wall = render.note(response[i]);
                    wallcontainer.appendChild(wall);

      }
      render.news_flag = 0;
      container.appendChild(wallcontainer);
      render.news_max_id = response[response.length - 1].id;
      document.getElementById('home').onscroll=function(){
        if ( this.scrollTop === this.scrollHeight - this.offsetHeight && render.news_flag == 0 && location.hash == '#news/'){
          render.news_flag = 1;
          VHquery.POSTJSON(serverURL + 'index.php?hash='+userData.hash+'&module=news&max_id=' + render.news_max_id,'',function(response){
            if (response.length >0){
                var wallcontainer = document.createElement('div');
                for (var i = 0; i<response.length; i++){
                         var wall = render.note(response[i]);
                         wallcontainer.appendChild(wall);

                }
                container.appendChild(wallcontainer);
                render.news_max_id = response[response.length - 1].id;
                render.news_flag = 0;
            }
          });
        }
      }
    },
    rightBlock:function(container){
      var rightBlock = document.createElement('div');
      rightBlock.className = 'rightBlockInfo';
      rightBlock.innerHTML = '<big>Мы еще не решили что прицепить в данном блоке.</big><p>Если у вас есть идеи что разместить в данном блоке ,пишите:<a href = "#profile/1">Vladislav Hacker</a></p>';
      container.appendChild(rightBlock);
    },
    forbiden:function(container){
      var x = document.createElement('div');
      x.style.background = 'white';
      var img1 = new Image();
      img1.src = "img/403-2.jpg";
      img1.className = "forbidenImg";
      img1.height = document.body.clientHeight - 60;
      x.appendChild(img1);
      var forbidenBlock = document.createElement('div');
      forbidenBlock.className = 'forbidenBlock';
      forbidenBlock.innerHTML = '403 !!!<br>Go on dick!';
      x.appendChild(forbidenBlock);
      container.appendChild(x);
    },
    oneWall:function(response,container){
        var wall = render.note(response);
        container.appendChild(wall);
    },
    linker : function(str){
        var reg = str.match('(?:(?:ht|f)tps?://)?(?:[\\-\\w]+:[\\-\\w]+@)?(?:[0-9a-z][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(?::\\d{1,5})?(?:[?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\wА-Яа-я]*)?');
        for (var key = 0;reg && key<reg.length;key++){
            str = str.replace(reg[key],'<a href="'+reg[key]+'" target=\"_blank\">'+reg[key]+'</a>');
        }
        for (var i = 1; i <= 189; i++){
            str = str.split("(s"+ i +")").join("<img class = 'smileImg' src = 'emoji/smiles/"+i+".png'>");
        }
        for (var i = 1; i <= 230; i++){
            str = str.split("(o"+ i +")").join("<img class = 'smileImg' src = 'emoji/objects/"+i+".png'>");
        }
        return(str);
    },
    getLinks : function(str){
        var reg = str.match('(?:(?:ht|f)tps?://)?(?:[\\-\\w]+:[\\-\\w]+@)?(?:[0-9a-z][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(?::\\d{1,5})?(?:[?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\wА-Яа-я]*)?');
        return(reg);
    },
    countries : function (container){
        VHquery.POSTJSON(serverURL + 'index.php?module=location&type=countries','',function(response){
          for(var i = 0; i<response.length; i++){
            var option = document.createElement('option');
            option.innerHTML = response[i].country_name;
            option.value = response[i].country_id;
            container.appendChild(option);
          }
        });
    },
    cities : function (container,country_id){
      VHquery.POSTJSON(serverURL + 'index.php?module=location&type=cities&country_id='+country_id,'',function(response){
        container.innerHTML = '';
        for(var i = 0; i<response.length; i++){
          var option = document.createElement('option');
          option.innerHTML = response[i].city_name;
          option.value = response[i].city_id;
          container.appendChild(option);
        }
      });
    },
    infoUser : function(container , response){
      if (response.country != ''){
        container.className = 'info_block_section';
        render.infoPunct(container ,'Страна:' , response.country);
      }
      if (response.city != ''){
        container.className = 'info_block_section';
        render.infoPunct(container ,'Город:' , response.city);
      }
    },
    infoPunct : function(container,gapNameText,text){
      var gap = document.createElement('div');
      var gapName = document.createElement('div');
      gapName.className = 'gapNameUserInfo';

      var gapText = document.createElement('div');
        gapText.className = 'gapTextUsernfo';
      gapName.innerHTML = gapNameText;
      gapText.innerHTML = text;
      gap.appendChild(gapName);
      gap.appendChild(gapText);
      var antifloat = document.createElement('div');
      antifloat.className = 'antifloat';
      gap.appendChild(antifloat);
      container.appendChild(gap);
    },
    galery : function(container,response = [],id){

      imgBox.clear();
      for (var i = 0;response && i < response.length;i++){
        imgBox.append(serverURL + response[i].url)
      }

      var photoInput = document.createElement('input');
      photoInput.setAttribute('id','photoInput');
      photoInput.setAttribute('type','file');
      photoInput.style.display = 'none';
      container.appendChild(photoInput);
      photoInput.onchange = function(){
        var file = photoInput.files[0];
        if (file){
            var data = new FormData();
            data.append('photo',file);
            openbox('progressBar');
            VHquery.uploadFile(serverURL+'index.php?hash='+userData.hash+'&module=photocontroller&type=load',data,function(response){
                  onhashchange();
              },function(evt){
                  counter = document.getElementById('progressBarCouter');
                  counter.innerHTML = Math.floor(evt.loaded/1024) + ' KB / ' +
                                      Math.floor(evt.total/1024) + 'KB';
                  if (evt.loaded == evt.total)
                    openbox('progressBar');
              });
            }
      }
      var galeryHeader = document.createElement('div');
      galeryHeader.className = 'galeryHeader';
      var galeryHeaderLeft = document.createElement('div');
      galeryHeaderLeft.className = 'galeryHeaderLeft';
      galeryHeaderLeft.innerHTML = 'Фотографии';
      var galeryRight = document.createElement('label');
      if (id == userData.id){
        galeryRight.className = 'galeryRight';
        galeryRight.setAttribute('for','photoInput');
        galeryRight.innerHTML = 'Загрузить';
      }

      galeryHeader.appendChild(galeryHeaderLeft);
      galeryHeader.appendChild(galeryRight);
      render.antifloat(galeryHeader);
      var galeryDiv = document.createElement('div');
      galeryDiv.appendChild(galeryHeader);
      galeryDiv.className = 'galeryDiv';
      if (response && response.length > 0){

        var imgcontainer = document.createElement('div');
        imgcontainer.className = 'imgcontainer'
        for(var i = 0; i < response.length; i++){
            var ImageDiv = document.createElement('div');
            ImageDiv.className ='galeryImageDiv';
            var image = new Image();
            image.onload = function(){
              if(this.width < this.height){
                 this.style.width = '100px';
                 this.style.height = 'auto';
              }else{
                 this.style.width = 'auto';
                 this.style.height = '100px';
              }
            }
            image.src = serverURL + response[i].url;
            image.onclick = function(){
              imgBox.open(this);
            }
            ImageDiv.appendChild(image);
            imgcontainer.appendChild(ImageDiv);
        }
        galeryDiv.appendChild(imgcontainer);
      }else{
        var x = document.createElement('div');
        x.innerHTML = 'Фотографии отсутствуют';
        galeryDiv.appendChild(x);

        galeryDiv.style.color = "white";
      }
      container.appendChild(galeryDiv);
    },
    antifloat:function (container) {
      var div = document.createElement('div');
      div.className = 'antifloat';
      container.appendChild(div);
    },
    smileBar:function(container){
      for (var i = 1; i <= 189; i++){
          var img = new Image();
          img.className = "smileImg";
          img.src = "emoji/smiles/"+i+".png";
          img.setAttribute("code","(s"+ i +")");
          img.onclick = function(){
            document.getElementById('msgTextArea').value+=this.getAttribute('code');
          }
          container.appendChild(img);
      }
      for (var i = 1; i <= 230; i++){
        var img = new Image();
        img.className = "smileImg";
        img.src = "emoji/objects/"+i+".png";
        img.setAttribute("code","(o"+ i +")");
        img.onclick = function(){
          document.getElementById('msgTextArea').value+=this.getAttribute('code');
        }
        container.appendChild(img);
      }
    }
}
