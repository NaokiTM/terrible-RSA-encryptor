// let gotpubkey = false;
// let gotprivkey = false;
let e = null; //no particular data type
let d = null;
let p = null;
let n = null;
let q = null;
let r = null;

function generateKeys() { 
    //generates random primes to use as p and q:
    //console.log('generate keys')
    const range = [2, 400]; //changing the range makes the numbers enormous and need to change range in the d and e variables
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
    
    
    p = (getRandomPrime(range)); //generates p
    q = (getRandomPrime(range)); //generates q

    n = p*q  //defines n
    r = (p-1) * (q-1) //defines r

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
    e = eval[eRandomIndex] //selects the value from the index

    for (let i= 0;i <= 100000; i++ ) { //candidates for d (the value of i must be bigger than 100 for the modulo of r to work, otherwise there are not enough candidates)
        if ((i * e) % r == 1) {
            // console.log("pushing",i,"to dval")
            dval.push(i)
        }
    }

    const dRandomIndex = Math.floor(Math.random() * dval.length)
    d = dval[dRandomIndex]

    const publickey = [e, n] 
    const privatekey = [d, n]
    
    //asynchronous meaning that other script is executed even if there is a timer

    setTimeout(() => { //makes it look like its thinking but in reality it is almost instantaenous
      document.getElementById("text1").innerHTML = "value of p = " + p
    },"500")

    setTimeout(() => {
      document.getElementById("text2").innerHTML = "value of q = " + q
    },"1000")

    setTimeout(() => {
      document.getElementById("text3").innerHTML = "value of n = " + n + " (value of n = p*q)"
    },"1500")

    setTimeout(() => {
      document.getElementById("text4").innerHTML = "value of r = " + r + " (value of r = (p-1) * (q-1)"
    },"2000")

    setTimeout(() => {
      document.getElementById("text5").innerHTML = "value of e = " + e + " (e must be 1 < e < r and e and r are coprime"
    },"2500")

    setTimeout(() => {
      document.getElementById("text6").innerHTML = "value of d = " + d + " (d must follow (d * e) % r = 1"
    },"3000")

    setTimeout(() => {
      document.getElementById("text7").innerHTML = "public key = " + publickey + " (public key = [e,n]" 
    },"3500")

    setTimeout(() => {
      document.getElementById("text8").innerHTML = "private key = " + privatekey + " (private key = [d,n]"
    },"4000")

    setTimeout(() => {
      createButtonPub();
    },"4500")

    setTimeout(() => {
      createButtonPriv();
    },"4500")

}

function createButtonPub() {
      // 1. Create the button
    var button = document.createElement("button");
    button.innerHTML = "copy public";

    // 2. Append somewhere
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(button);

    // 3. Add event handler
    button.addEventListener ("click", function() {
      copyPubKey()
      alert("copied public key");
    });

}

function createButtonPriv() { 
      var button = document.createElement("button");
      button.innerHTML = "copy private";

      var body = document.getElementsByTagName("body")[0];
      body.appendChild(button);

      button.addEventListener("click", function() {
      copyPrivKey()
      alert("copied private key");
      })
}


function encrypt() {

  let message = document.getElementById("message").value
  let numberMessage = []
  let cipher = []
  let eNew = document.getElementById("einput").value

  for (let i = 0; i < message.length; i++) { //loops to match the number of letters in the message
    numberMessage[i] = message.charCodeAt(i) //converts the letters to numbers one character at a time
    cipher[i] = numberMessage[i]^eNew % n; // so the first ciphered letter is the first number to the power of e % n
    // console.log(cipher[i]) //outputs the cipher one letter at a time 
    document.getElementById("messageoutput")
  }    
  
  document.getElementById("cipheroutput").innerHTML = (cipher)
  console.log("this works")
}

function decrypt() {
  let cipher = document.getElementById("cipher").value //takes the value inside the cipher tag
  let numbercipher = [] //this is required to convert letters to numbers before encrypting them
  let message = []

  for (let i = 0; i < cipher.length; i++) { //loops to match the length of the cipher
    numbercipher[i] = message.charCodeAt(i) //converts the letters to numbers one character at a time
    cipher[i] = numberMessage[i]^e % n; // so the first encrypted character is the first number to the power of e % n
    // console.log(message[i]) //prints each individual letter from the message
    document.getElementById("messageoutput").innerHTML(message.toString)
  }
  console.log("this works") 
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

function login() {
  var credentials = [
    { // Object @ 0 index
      username: "sam",
      password: "javascript"
    },
    { // Object @ 1 index
      username: "matt",
      password: "random"
    },
    { // Object @ 2 index
      username: "chris",
      password: "forever"
    }
  
  ]

	let username = document.getElementById('username').value
	let password = document.getElementById('password').value

  username = username
  password = password

  console.log("your username is " + username + "and your password is " + password)

	for(var i = 0; i < credentials.length; i++) { //loops to find a username and password that matches
  
		if(username == credentials[i].username && password == credentials[i].password /*&& i <= 5*/) { //i can be used twice here because the same numbers is used to store the index of both the username and password.
			console.log(username + " is logged in!!!")
      window.location.href = "./menu.html" //switches to the menu if the credentials are correct
			// stop the function if this is found to be true
			return
    
		}// else if (i > 5) {
    //   document.getElementById("invalidmsg").innerHTML = "5 invalid login attempts, next login attempt in 20 seconds"
    //   wait(20000)
    
    // }
	}

	// console.log("incorrect username or password")
  document.getElementById("invalidmsg").innerHTML = "invalid login!, try again"
}
