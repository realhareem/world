const words = [
"apple","banana","cherry","date","elderberry","fig","grape","honey","ice","juice",
"kite","lemon","mango","nectar","orange","peach","quince","rose","sun","tree",
"umbrella","violet","water","xray","yellow","zebra","ant","ball","cat","dog",
"eagle","fish","goat","hat","ink","jar","king","lion","moon","nest",
"owl","pen","queen","ring","star","table","unit","van","wind","xenon",
"yak","zoo","arch","brick","cloud","drum","earth","flame","glass","hill",
"island","jungle","knife","ladder","metal","night","ocean","plant","quiet","river",
"stone","train","urban","valley","wood","xerox","yarn","zone","angle","beach",
"circle","dream","energy","forest","gold","heart","idea","jewel","karma","light",
"magic","nature","order","peace","quest","road","sound","time","unity","voice",
"world","xylem","youth","zen","actor","builder","creator","driver","engineer","farmer",
"guard","hunter","inventor","judge","knight","leader","maker","nurse","officer","pilot",
"queenly","rider","sailor","teacher","user","vendor","worker","yodeler","zoologist",
"amber","bronze","copper","diamond","emerald","fossil","granite","helium","iron","jade",
"kelp","lava","marble","nickel","opal","pearl","quartz","ruby","silver","topaz",
"uranium","vapor","waterfall","xenolith","yellowish","zircon","alpha","beta","gamma","delta",
"epsilon","zeta","eta","theta","iota","kappa","lambda","mu","nu","xi",
"omicron","pi","rho","sigma","tau","upsilon","phi","chi","psi","omega",
"april","may","june","july","august","september","october","november","december","january",
"february","march","spring","summer","autumn","winter","morning","noon","evening","nighttime",
"happy","sad","angry","brave","calm","eager","fancy","gentle","honest","jolly",
"kind","lucky","nice","proud","quick","rich","shy","tough","wise","young",
"ancient","bright","clean","dark","early","fast","giant","high","icy","juicy",
"keen","large","modern","new","old","plain","rapid","small","tall","vast"
];

const textContainer = document.getElementById('text-container');
const timerElement = document.getElementById('timer');
const tryAgainButton = document.getElementById('try-again');
const finalScoreElement = document.getElementById('final-score');


  let totalTyped = '';
  let currentCharIndex = 0;
  let errors = 0;
  let longText = generateLongText();
  let timeLeft = 60;
  let timerInterval;
  let typingStarted = false;

// shuffle the word of array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// console.log(shuffleArray(words));

// combine shuffle words into one long string with spaces
  function generateLongText() {
    const shuffleWords = shuffleArray([...words]);
    return shuffleWords.join(' ');
  }

  // start countdown timer
  function startTimer() {
    if (!typingStarted) {
      typingStarted = true;
      timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          endTest();
        }
      }, 1000);
    }
  }

  // End the test and final display score
  function endTest() {
    timerElement.textContent = `Time's up!`;
    finalScoreElement.textContent = `Final WPM: ${CalculateWPM()}`;
    textContainer.style.display = 'none';
    tryAgainButton.style.display = 'block';
   
  }

// Calculate the words-per-min with error adjustment
function CalculateWPM() {
  const wordsTyped = totalTyped.trim().split(/\s+/).length;
  const baseWPM = Math.round((wordsTyped / 60) * 60);
  const adjustedWPM = Math.max(baseWPM - errors, 0);
  return adjustedWPM;
  
}

// Handle typing over the displayed text and scrolling 
document.addEventListener('keydown', (e) => {
    startTimer();
  if (e.key === 'backspace') {
    if (totalTyped.length > 0){
      currentCharIndex = Math.max(currentCharIndex - 1, 0);
      totalTyped = totalTyped.slice(0, -1);
    }
  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    totalTyped += e.key;
    currentCharIndex ++;
  }

  // console.log('e.key', e.key, 'totalTyped', totalTyped, 'currentCharIndex', currentCharIndex);

   const textArray = longText.split('');
   console.log(textArray);
   textContainer.innerText = '';

   errors = 0;

   for (let i = 0; i < textArray.length; i++) {
     const span = document.createElement('span');

     if (i < totalTyped.length){
       if (totalTyped[i] === textArray[i]) {
        span.classList.add('correct');
       } else {
        span.classList.add('error');
        errors++;
       }
     }

     span.textContent = textArray[i];
     textContainer.appendChild(span);
   }
  
  // scroll the container only after 20 characters
  if (totalTyped.length >= 20) {
    const scrollAmount = (totalTyped.length - 20) * 14;
    textContainer.scrollLeft = scrollAmount;
  }

});

// Reset the test
function resetTest(){
  clearInterval(timerInterval);
  timeLeft = 60;
  timerElement.textContent = `Time left: ${timeLeft}s`;
  finalScoreElement.textContent = '';
  textContainer.style.display = 'block';
  tryAgainButton.style.display = 'none';
  totalTyped = '';
  typingStarted = false;
  currentCharIndex = 0;
  errors = 0;
  textContainer.scrollLeft = 0;
  longText = generateLongText();
  init();
}

// Initialize the test
function init(){
  if (isMobileDevice()) {
    showMobileMessage();
  } else {
       textContainer.innerText = longText;
       timerElement.textContent = `Time left: ${timeLeft}s`;
  }
}

// try again button lister
tryAgainButton.addEventListener('click', resetTest);

// detect if the device is mobile
function isMobileDevice() {
  return /Mobile|Android/i.test(navigator.userAgent) || window.innerWidth < 800;
}

// show message for mobile user
 function showMobileMessage() {
  textContainer.textContent = 'This typing test is designed for desktop use only';
 }

//startup
init();
  