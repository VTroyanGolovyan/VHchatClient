function mini_spiner(container){
  var spiner = document.createElement('div');
  var spinerBlock = document.createElement('div'),
      spinerBlockBottom = document.createElement('div');
  spinerBlock.className = 'spinerBlock';

  spinerBlockBottom.className = 'spinerBlockBottom';


  var spinerBlockBottomLeft = document.createElement('span');
  spinerBlockBottomLeft.className = 'spinerBlockBottomLeft';
  spinerBlockBottomLeft.innerHTML = 'VH';
  var spinerBlockBottomRight = document.createElement('span');
  spinerBlockBottomRight.className = 'spinerBlockBottomRight';
  spinerBlockBottomRight.innerHTML = 'chat';
  spiner.appendChild(spinerBlock);
  spinerBlockBottom.appendChild(spinerBlockBottomLeft);
  spinerBlockBottom.appendChild(spinerBlockBottomRight);
  spinerBlock.appendChild(spinerBlockBottom);
  container.appendChild(spiner);
}
function spiner(){
  var spiner = document.createElement('div');
  spiner.className = 'spiner';
  var spinerBlock = document.createElement('div'),
      spinerBlockTop = document.createElement('div'),
      spinerBlockCenter = document.createElement('div'),
      spinerBlockBottom = document.createElement('div');
  spinerBlock.className = 'spinerBlock';
  spinerBlockTop.className = 'spinerBlockTop';
  spinerBlockBottom.className = 'spinerBlockBottom';
  spinerBlockCenter.className = 'spinerBlockCenter';
  spinerBlockCenter.innerHTML = '';
  spinerBlockTop.innerHTML = '';

  var spinerBlockBottomLeft = document.createElement('span');
  spinerBlockBottomLeft.className = 'spinerBlockBottomLeft';
  spinerBlockBottomLeft.innerHTML = 'VH';
  var spinerBlockBottomRight = document.createElement('span');
  spinerBlockBottomRight.className = 'spinerBlockBottomRight';
  spinerBlockBottomRight.innerHTML = 'chat';
  spiner.appendChild(spinerBlock);
  spinerBlock.appendChild(spinerBlockTop);
  spinerBlock.appendChild(spinerBlockCenter);
  spinerBlockBottom.appendChild(spinerBlockBottomLeft);
  spinerBlockBottom.appendChild(spinerBlockBottomRight);
  spinerBlock.appendChild(spinerBlockBottom);
  document.body.appendChild(spiner);

  return {
    spiner:spiner,
    interval:interval
  }
}
/*
var spiner = spiner();
document.body.onload = function(){
      setTimeout(function(){
          spiner.spiner.remove();
          clearInterval(spiner.interval);
      },500);
}
*/
