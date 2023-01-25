function generateKeys() { 
    //generates random primes to use as p and q:
    const range = [1, 100];
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

    for (let x= 0;x <= 100; x++) { //prints all possible candidates for e between 1 and 100: make the range bigger later
       if (1 < x < r && areCoprimes(x, r) == true) {
        eval.push(x)
       }
    }

    const eRandomIndex = Math.floor(Math.random() * eval.length) //gets a random index from the length of the array
    const e = eval[eRandomIndex] //selects the value from the index

    for (let i= 0;i <= 100; i++ ) { //candidates for d
        if ((i * e) % r == 1) {
         dval.push(i)
        }
    }

    const dRandomIndex = Math.floor(Math.random() * eval.length)
    const d = dval[dRandomIndex]

    const publickey = [e, n] 
    const privatekey = [d, n]
    
    document.getElementById("text1").innerHTML = "value of p = " & p
    document.getElementById("text2").innerHTML = "value of q = " & q
    document.getElementById("text3").innerHTML = "value of n = " & n & "(value of n = p*q"
    document.getElementById("text4").innerHTML = "value of r = " & r & "(value of r = (p-1) * (q-1)"
    document.getElementById("text5").innerHTML = "value of e = " & e & "(e must be 1 < e < r and e and r are coprime"
    document.getElementById("text6").innerHTML = "value of d = " & d & "(d must follow (d * e) % r = 1"
    document.getElementById("text7").innerHTML = "public key = " & publickey & "(public key = [e,n]"
    document.getElementById("text8").innerHTML = "private key = " & privatekey & "(private key = [d,n]"
}

function checkForKeysEnc() {
    if (gotKeys = true) {
        encrypt()
    } else {
        alert("you need to generate a key pair first!")
    }
}

function checkForKeysDec() {
    if (gotKeys = true) {
        decrypt()
    } else {
        alert("you need to have a key pair first!")
    }
}

function encrypt() {
   //using letter to number cipher
   const lettersMessage = document.getElementById(messageinput).value
   const MessageToNumbers = (a) => {
    a = text.charCodeAt(0) //convert string of letters to numbers
    let code = text.charCodeAt(text.length-1);
   }
   
}

function decrypt() {

}

test

