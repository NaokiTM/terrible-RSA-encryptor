let gotpubkey = false;
let gotprivkey = false;

function generateKeys() { 
    //generates random primes to use as p and q:
    //console.log('generate keys')
    const range = [1, 400]; //changing the range makes the numbers enormous and need to change range in the d and e variables
    const getPrimes = (min, max) => {
    const result = Array(max + 1)
    .fill(0)
    .map((_, i) => i);
    for (let i = 2; i <= Math.sqrt(max + 1); i++) {
        for (let j = i ** 2; j < max + 1; j += i) delete result[j];
    }
    return Object.values(result.slice(min));
    };
    const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const getRandomPrime = ([min, max]) => {
    const primes = getPrimes(min, max);
    return primes[getRandomNum(0, primes.length - 1)];
    };//end of the random prime number algorithm


    const p = (getRandomPrime(range)); //generates p
    const q = (getRandomPrime(range)); //generates q

    const n = p*q  //defines n
    const r = (p-1) * (q-1) //defines r

    const areCoprimes = (num1, num2) => { //the algorithm used to check if 2 numbers are coprime
        const smaller = num1 > num2 ? num1 : num2;
        for(let ind = 2; ind < smaller; ind++){
           const condition1 = num1 % ind === 0;
           const condition2 = num2 % ind === 0;
           if(condition1 && condition2){
              return false;
           };
        };
        return true;
     };

    let eval = [] //defines array for all possible values for e between 2 limits
    let dval = [] //deifines array for all possible values for d between 2 limits

    for (let x= 0;x <= 10000; x++) { //prints all possible candidates for e between 1 and 100: make the range bigger later
       if (1 < x < r && areCoprimes(x, r) == true) {
        eval.push(x)
       }
    }

    const eRandomIndex = Math.floor(Math.random() * eval.length) //gets a random index from the length of the array
    const e = eval[eRandomIndex] //selects the value from the index

    for (let i= 0;i <= 100000; i++ ) { //candidates for d (the value of i must be bigger than 100 for the modulo of r to work, otherwise there are not enough candidates)
        if ((i * e) % r == 1) {
            // console.log("pushing",i,"to dval")
            dval.push(i)
        }
    }

    const dRandomIndex = Math.floor(Math.random() * dval.length)
    const d = dval[dRandomIndex]

    const publickey = [e, n] 
    const privatekey = [d, n]
    
    document.getElementById("text1").innerHTML = "value of p = " + p
    document.getElementById("text2").innerHTML = "value of q = " + q
    document.getElementById("text3").innerHTML = "value of n = " + n + " (value of n = p*q"
    document.getElementById("text4").innerHTML = "value of r = " + r + " (value of r = (p-1) * (q-1)"
    document.getElementById("text5").innerHTML = "value of e = " + e + " (e must be 1 < e < r and e and r are coprime"
    document.getElementById("text6").innerHTML = "value of d = " + d + " (d must follow (d * e) % r = 1"
    document.getElementById("text7").innerHTML = "public key = " + publickey + " (public key = [e,n]" 
    document.getElementById("text8").innerHTML = "private key = " + privatekey + " (private key = [d,n]"
}

function encrypt() {

  let message = document.getElementById("message").value
  let numberMessage = []
  let cipher = []

  for (let i = 0; i < message.length; i++) { //loops to match the number of letters in the message
    numberMessage[i] = message.charCodeAt(i) //converts the letters to numbers one character at a time
    cipher[i] = numberMessage[i]^e % n; // so the first ciphered letter is the first number to the power of e % n
    console.log(cipher[i]) //outputs the cipher one letter at a time 
  }    

}

function decrypt() {
  let cipher = document.getElementById("cipher").value //takes the value inside the cipher tag
  let numbercipher = [] //this is required to convert letters to numbers before encrypting them
  let message = []

  for (let i = 0; i < cipher.length; i++) { //loops to match the length of the cipher
    numbercipher[i] = message.charCodeAt(i) //converts the letters to numbers one character at a time
    cipher[i] = numberMessage[i]^e % n; // so the first encrypted character is the first number to the power of e % n
    console.log(message[i])
  } 
}

function copyPubKey() {
    // Get the text field
    var copyText = document.getElementById("text7");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
    //  Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  
    // Alert the copied text
    alert("Copied the text: " + copyText.value);

    gotpubkey = true
  }

function copyPrivKey() {
       // Get the text field
       var copyText2 = document.getElementById("text8");
  
       // Select the text field
       copyText2.select();
       copyText2.setSelectionRange(0, 99999); // For mobile devices
     
        // Copy the text inside the text field
       navigator.clipboard.writeText(copyText2.value);
     
       // Alert the copied text
       alert("Copied the text: " + copyText2.value);

       gotprivkey = true;
}

function checkForKeysEnc() {
  if (gotpubkey == true && gotprivkey == true) {
    encrypt()
  } else {
    console.error("copy the private and public keys first by pressing the copy buttons")
  }
}

function checkForKeysDec() {
  if (gotpubkey == true && gotprivkey == true) {
    decrypt()
  } else {
    console.error("copy the private and public keys first by pressing the copy buttons")
  }
}