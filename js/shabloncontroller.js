var shablonController = {
     activeShablon:'reg',
     loadedShablones:new Array(),
     changeShablon:function(shablonName,callback){
         document.getElementById(shablonController.activeShablon).className = 'hidden';
         document.getElementById(shablonName).className = shablonName;
         shablonController.activeShablon = shablonName;
         if (shablonController.loadedShablones[shablonName] == undefined){
           VHquery.GETHTML('views/'+shablonName+'.html',shablonName,callback,function(){
          });
           shablonController.loadedShablones[shablonName] = shablonName;
         }else callback();
     }
}
