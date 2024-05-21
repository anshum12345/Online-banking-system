
// Get the modal
var modal = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// $ (document).ready function(){
  
// }
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




// -------------------hero============

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


const acctBalanceLbl = document.getElementById("acctBalanceLbl");
const deposits = [];
const withdrawals = [];
let totalBalance = 25;
const userDeposit = document.getElementById("userDeposit");
const btnDeposit = document.getElementById("btnDeposit");
const userWithdraw = document.getElementById("userWithdraw");
const btnWithdraw = document.getElementById("btnWithdraw");

// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    /* 
    the default value for minimumFractionDigits depends on the currency
    and is usually already 2
    */
  });

// accept deposits from user, store deposits in array
btnDeposit.addEventListener('click', () => {

    // checks if deposit is a number
    if (isNaN(userDeposit.value)) {
        alert("Please enter a number.");
        return userDeposit.value = '';
    } else {

    // checks if deposit meets parameters
        if (userDeposit.value < 0.01 || userDeposit.value > 10000) {
            alert("You can only deposit between $0.01 and $10,000.")
            return userDeposit.value = '';
        } else {
    
        // push deposit to array
        deposits.push(Number(userDeposit.value));
        // calculate Total Balance
        totalBalance += (Number(userDeposit.value));

        // format TotalBalance to show $ XX.XX (2 decimal places)
        let totalBalanceFormatted = formatter.format(totalBalance);
        document.getElementById("acctBalanceLbl").innerHTML = totalBalanceFormatted;

    // print deposit to console to verify success
    console.log("$" + userDeposit.value);
    return userDeposit.value = '';
    }
}
    
});

// accept withdrawals from user, store withdrawals in array
btnWithdraw.addEventListener('click', () => {

    // checks if withdrawal is a number
    if (isNaN(userWithdraw.value)) {
        alert("Please enter a number.");
        return userWithdraw.value = '';
    } else {

        // checks if withdrawal meets parameters
        if (userWithdraw.value > totalBalance - 5) {
            alert("Your total balance cannot drop below $5.");
            return userWithdraw.value = '';
        } else {

        // push withdrawal to array
        withdrawals.push(Number(userWithdraw.value));
        // calculate Total Balance
        totalBalance -= (Number(userWithdraw.value));

        // format TotalBalance to show $ XX.XX (2 decimal places)
        let totalBalanceFormatted = formatter.format(totalBalance);
        document.getElementById("acctBalanceLbl").innerHTML = totalBalanceFormatted;

    // print withdrawal to console to verfify success
    console.log("$" + userWithdraw.value);
    return userWithdraw.value = '';
    }
}
});

// format TotalBalance to show $ XX.XX (2 decimal places)

let totalBalanceFormatted = formatter.format(totalBalance);
document.getElementById("acctBalanceLbl").innerHTML = totalBalanceFormatted;

// I hope this over-commenting helps. Let's do this!
// Let's use the 'active' variable to let us know when we're using it
let active = false;
// and define our dom elements to make it easier to read
let scrollerMiddle = document.querySelector('.scroller-middle');
let scrollerTop = document.querySelector('.scroller-top');


// First we'll have to set up our event listeners
// We want to watch for clicks on our scroller
scrollerMiddle.addEventListener('mousedown',function(){
  active = "middle";
  // Add our scrolling class so the scroller has full opacity while active
  scrollerMiddle.classList.add('scrolling');
});
// We also want to watch the body for changes to the state,
// like moving around and releasing the click
// so let's set up our event listeners
document.body.addEventListener('mouseup',function(){
  active = false;
  scrollerMiddle.classList.remove('scrolling');
});
document.body.addEventListener('mouseleave',function(){
  active = false;
  scrollerMiddle.classList.remove('scrolling');
});
// We'll have to do the same for our top scroller
scrollerTop.addEventListener('mousedown',function(){
    active = "top";
    scrollerTop.classList.add('scrolling');
});
document.body.addEventListener('mouseup',function(){
  active = false;
  scrollerTop.classList.remove('scrolling');
});
document.body.addEventListener('mouseleave',function(){
  active = false;
  scrollerTop.classList.remove('scrolling');
});

// Let's figure out where their mouse is at
document.body.addEventListener('mousemove',function(e){
  if (!active) return;
  // Their mouse is here...
  let x = e.pageX;
  // but we want it relative to our wrapper
  x -= document.querySelector('.wrapper').getBoundingClientRect().left;
  // Okay let's change our state
  scrollIt(x);
});

// Let's use this function
function scrollIt(x){
  // Calculate our transform
  let transform = Math.max(0,(Math.min(x,document.querySelector('.wrapper').offsetWidth)));
  // we show all our bottom image but how much of our middle and top,
  // that'll depend on what we're dragging
  // if we're dragging the middle slider
  if (active==="middle"){
    document.querySelector('.middle').style.width = transform+"px";
    scrollerMiddle.style.left = transform-25+"px";
    // if we're using scroller-middle, middle must always be to the right of top
    if (scrollerTop.getBoundingClientRect().left>scrollerMiddle.getBoundingClientRect().left-5){
      document.querySelector('.top').style.width = transform-5+"px";
      scrollerTop.style.left = transform-30+"px";
    }
  }
  // if we're dragging the top slider
  if (active==="top"){
    document.querySelector('.top').style.width = transform+"px";
    scrollerTop.style.left = transform-25+"px";
    // if we're using scroller-top, top must always be to the left
    if (scrollerTop.getBoundingClientRect().left>scrollerMiddle.getBoundingClientRect().left-5){
      document.querySelector('.middle').style.width = transform+5+"px";
      scrollerMiddle.style.left = transform-20+"px";
    }
  }
}

// Let's set our opening state based off the width, 
// we want to show a bit of both images so the user can see what's going on
active = "middle";
scrollIt(460);
active = "top";
scrollIt(230);
active = false;


// And finally let's repeat the process for touch events
// first our middle scroller...
scrollerMiddle.addEventListener('touchstart',function(){
    active = "middle";
    scrollerMiddle.classList.add('scrolling');
});
document.body.addEventListener('touchend',function(){
    active = false;
    scrollerMiddle.classList.remove('scrolling');
});
document.body.addEventListener('touchcancel',function(){
    active = false;
    scrollerMiddle.classList.remove('scrolling');
});

// then scroller top, our second scroller
scrollerTop.addEventListener('touchstart',function(){
    active = "top";
    scrollerTop.classList.add('scrolling');
});
document.body.addEventListener('touchend',function(){
    active = false;
    scrollerTop.classList.remove('scrolling');
});
document.body.addEventListener('touchcancel',function(){
    active = false;
    scrollerTop.classList.remove('scrolling');
});

document.querySelector('.wrapper').addEventListener('touchmove',function(e){
    if (!active) return;
    e.preventDefault();
    let x = e.touches[0].pageX;
    x -= document.querySelector('.wrapper').getBoundingClientRect().left;
    scrollIt(x);
});




