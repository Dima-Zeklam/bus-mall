
'use strict';


let firstImg = document.getElementById("Fimg");
let secoundImg = document.getElementById("Secimg");
let lastImg = document.getElementById("Limg");
let container=document.getElementById("container");
let productLi =[];
let attempts = 1;
let maxAattempts = 10;
let img = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];
function Products(nameOfimg){
this.imgName = nameOfimg.split('.')[0];
this.exe = nameOfimg.split('.')[1];
this.srcImg= 'img/' + nameOfimg ;
this.views = 0;
this.clicks=0;
productLi.push(this);

}

for(let i =0;i<img.length;i++){
    new Products(img[i]);
}
console.log(productLi);
function getRandnum(){
    return Math.floor(Math.random()*productLi.length);
}

let fIndex ;
let sIndex;
let lIndex ;


function setRender(){
    fIndex = getRandnum();
    sIndex = getRandnum();
    lIndex = getRandnum();

while(fIndex === sIndex || fIndex === lIndex || sIndex === lIndex){

        fIndex=getRandnum();
        sIndex=getRandnum();
    }

    firstImg.setAttribute('src',productLi[fIndex].srcImg);
    secoundImg.setAttribute('src',productLi[sIndex].srcImg);
    lastImg.setAttribute('src',productLi[lIndex].srcImg);
     firstImg.setAttribute('alt',productLi[fIndex].imgName);
     secoundImg.setAttribute('alt',productLi[sIndex].imgName);
     lastImg.setAttribute('alt',productLi[lIndex].imgName);
    firstImg.setAttribute('title',productLi[lIndex].imgName);
    secoundImg.setAttribute('title',productLi[lIndex].imgName);
    lastImg.setAttribute('title',productLi[lIndex].imgName);
      
    
    productLi[fIndex].views++;
    productLi[sIndex].views++;
    productLi[lIndex].views++;
        

}
setRender();
let button = document.createElement('button');

function clickbutton(event){
    for(let i=0;i<productLi.length;i++){
    let p= document.createElement('p');
    p.textContent = `${productLi[i].imgName} had ${productLi[i].clicks} votes, and was seen ${productLi[i].views} times.`;
    container.appendChild(p);

    }

}
firstImg.addEventListener('click',handl);
secoundImg.addEventListener('click',handl);
lastImg.addEventListener('click',handl);

function handl(event){
  if(attempts <= maxAattempts){
        let clicked= event.target.id;
       if('Fimg' === clicked){
        productLi[fIndex].clicks++;
       }else if('Secimg' === clicked){
        productLi[sIndex].clicks++;
       }else if('Limg' === clicked){
        productLi[lIndex].clicks++;
       }
       setRender();
       console.log(productLi);
    }else{
        button.textContent="show result";
        container.appendChild(button);
       button.addEventListener('click',clickbutton);
       firstImg.removeEventListener('click',handl);
       secoundImg.removeEventListener('click',handl);
       lastImg.removeEventListener('click',handl);
       }
       
    
    attempts++;
}
