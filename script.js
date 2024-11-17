"use strict";

function LotteryCart(index, isWinning) {
   this.index = index;
   this.isWinning = isWinning;
}  

LotteryCart.prototype.trySelect = function (item, count, subtitle) {
   if (this.isWinning) {
      item.classList.add("lottery__item--correct");
      subtitle.innerHTML = `Congrats! You have won!`;
   } else {
      if (count === 3) {
         item.classList.add("lottery__item--wrong");
         subtitle.innerHTML = `Sorry, it was your last turn!`;
         return;
      }
      item.classList.add("lottery__item--wrong");
      subtitle.innerHTML = `Sorry, try one more time!`;
   }
}

const cart = [];
for (let i = 0; i < 9; i++) {
   cart.push(new LotteryCart(i+1, false));
}
cart[(Math.random() * (9 - 1) + 1).toFixed(0)].isWinning = true;
console.log(cart);

function randerLottary(cartArray) {
   const lotteryContainer = document.querySelector(".lottery__container");
   const lotterySubtitle = document.querySelector(".lottery__subtitle");

   let count = 0;
   cartArray.forEach((item) => {
      const lotteryItem = document.createElement("div");
      lotteryItem.classList.add("lottery__item");

      const lotteryIndex = document.createElement("h4");
      lotteryIndex.classList.add("lottery__index");
      lotteryIndex.innerHTML = item.index;

      lotteryItem.appendChild(lotteryIndex);
      lotteryContainer.appendChild(lotteryItem);
      
      lotteryItem.addEventListener('click', () => {
         if ((lotteryItem.classList.contains("lottery__item--wrong") === false) &&
            (lotteryItem.classList.contains("lottery__item--correct") === false)) {
            if(count < 3) {
               item.trySelect(lotteryItem, ++count, lotterySubtitle);            
            }
            if(item.isWinning === true) {
               count = 3;
            }
         }                        
      });     
   });
}

randerLottary(cart);

