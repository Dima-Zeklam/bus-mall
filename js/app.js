
'use strict';

let firstImg = document.getElementById("Fimg");
let secoundImg = document.getElementById("Secimg");
let lastImg = document.getElementById("Limg");
let container = document.getElementById("container");
let productLi = [];
let attempts = 1;
let maxAattempts = 10;
let img = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let Pname = [];
let votes = [];
let seen = [];


function Products(nameOfimg) {
    this.imgName = nameOfimg.split('.')[0];
    this.exe = nameOfimg.split('.')[1];
    this.srcImg = 'img/' + nameOfimg;
    this.views = 0;
    this.clicks = 0;
    Pname.push(this.imgName);
    productLi.push(this);
    
}

for (let i = 0; i < img.length; i++) {
    new Products(img[i]);
}
console.log(productLi);
function getRandnum() {
    return Math.floor(Math.random() * productLi.length);
}

let fIndex;
let sIndex;
let lIndex;
let num1 = ' ';
let num2 = ' ';
let num3 = ' ';

function norepeat() {
    let condition = true;
    while (condition) {
        fIndex = getRandnum();
        sIndex = getRandnum();
        lIndex = getRandnum();
        if (fIndex === sIndex || fIndex === lIndex || sIndex === lIndex) {
console.log("first condition");
            fIndex = getRandnum();
            sIndex = getRandnum();
            lIndex = getRandnum();
        } else if (productLi[fIndex].imgName === num1 || productLi[fIndex].imgName === num2 || productLi[fIndex].imgName === num3) {
            fIndex = getRandnum();
            console.log("sec condition");
        } else if (productLi[sIndex].imgName === num2 || productLi[sIndex].imgName === num1 || productLi[sIndex].imgName === num3) {
            sIndex = getRandnum();
            console.log("third condition");
        } else if (productLi[lIndex].imgName === num3 || productLi[lIndex].imgName === num1 || productLi[lIndex].imgName === num2) {
            lIndex = getRandnum();
            console.log("last condition");
        }
        
         else{
            condition = false;
            console.log("else condition");
         }
            
       
            productLi[fIndex].views++;
            productLi[sIndex].views++;
            productLi[lIndex].views++;
       

    }
    
  
}

function SaveToLocalStorage() {
    let strObj = JSON.stringify(productLi);
    localStorage.setItem('product', strObj);

}

function ReadFromLocalStorage() {
    let strObj = localStorage.getItem('product');
    let normalObj = JSON.parse(strObj);
    if(normalObj !== null){
        productLi = normalObj;
        // setRender();
    }
   
}
ReadFromLocalStorage();

function setRender() {
    
    norepeat();

    console.log(fIndex + ' ' + sIndex + ' ' + lIndex);
    firstImg.setAttribute('src', productLi[fIndex].srcImg);
    secoundImg.setAttribute('src', productLi[sIndex].srcImg);
    lastImg.setAttribute('src', productLi[lIndex].srcImg);
    firstImg.setAttribute('alt', productLi[fIndex].imgName);
    secoundImg.setAttribute('alt', productLi[sIndex].imgName);
    lastImg.setAttribute('alt', productLi[lIndex].imgName);
    firstImg.setAttribute('title', productLi[fIndex].imgName);
    secoundImg.setAttribute('title', productLi[sIndex].imgName);
    lastImg.setAttribute('title', productLi[lIndex].imgName);

   
    console.log(productLi[fIndex].views);
    console.log(productLi[sIndex].views);
    console.log( productLi[lIndex].views);

    num1 = productLi[fIndex].imgName;
    num2 = productLi[sIndex].imgName;
    num3 = productLi[lIndex].imgName

}
setRender();
let button = document.createElement('button');

function clickbutton(event) {
    for (let i = 0; i < productLi.length; i++) {
        let p = document.createElement('p');
        p.textContent = `${productLi[i].imgName} had ${productLi[i].clicks} votes, and was seen ${productLi[i].views} times.`;
        votes.push(productLi[i].clicks);
        seen.push(productLi[i].views);
        container.appendChild(p);
        chartrender();
        console.log('yes');
      
    }
    button.removeEventListener('click', clickbutton);
}
firstImg.addEventListener('click', handl);
secoundImg.addEventListener('click', handl);
lastImg.addEventListener('click', handl);

function handl(event) {
    if (attempts <= maxAattempts) {
        let clicked = event.target.id;
        if ('Fimg' === clicked) {
            productLi[fIndex].clicks++;
        } else if ('Secimg' === clicked) {
            productLi[sIndex].clicks++;
        } else if ('Limg' === clicked) {
            productLi[lIndex].clicks++;
        }
        setRender();
        console.log(productLi);
    } else {
        button.textContent = "show result";
        container.appendChild(button);
        button.addEventListener('click', clickbutton);
        firstImg.removeEventListener('click', handl);
        secoundImg.removeEventListener('click', handl);
        lastImg.removeEventListener('click', handl);
        SaveToLocalStorage();
       
    } 
   
 
    attempts++;
}


function chartrender() {

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Pname,
            datasets: [{
                label: '# of Votes',
                data: votes,
                backgroundColor: 'red',

                borderWidth: 2
            }, {
                label: '# of views',
                data: seen,
                backgroundColor: 'green',

                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            yAxes: [{ ticks: { min: 0, max: 10 } }]
        }
    });
}

  