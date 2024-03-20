// all global variables
let canvas = document.querySelector('.canvas'),
    allButton = document.querySelector('.allButton'),
    guessingWordUl = document.querySelector('.guessingWord ul'),
    output = document.querySelector('.output'),
    showGuessLeft = document.querySelector('.guessLeft'),
    playAgain = document.querySelector('.playAgain'),
    alreadyGuessed = document.querySelector('.alreadyGuessed'),
    hint = document.querySelector('.hint'),
    draw = canvas.getContext("2d"),
    upperLine,
    leftLine,
    lowerLine,
    rope,
    head,
    neck,
    rightArm,
    leftArm,
    body,
    bothLeg,
    guessLeft,
    trueGuess = 0;

// Guessing Words
let fruits = ['banana', 'apple', 'Lemon', 'mango', 'strawberry', 'orange', 'grape', 'watermelon', 'pineapple', 'peache', 'pear', 'cherrie', 'plum', 'kiwi', 'lemon', 'avocado', 'raspberrie', 'blueberrie', 'papaya', 'fig', 'lychee'];
let country = ["Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Chad", "Chile", "China", "Colombia", "Congo", "Croatia", "Cuba", "Cyprus", "Denmark", "Ecuador", "Egypt", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Namibia", "Nepal"];
let district = ['Barguna', 'Barisal', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur', 'Bandarban', 'Chandpur', 'Chattogram', 'Comilla', 'Coxs Bazar', 'Feni', 'Lakshmipur', 'Noakhali', 'Rangamati', 'Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Narsingdi', 'Rajbari', 'Shariatpur', 'Tangail', 'Mymensingh', 'Jamalpur', 'Sherpur', 'Netrokona', 'Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Khulna', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Shatkhira', 'Rajshahi', 'Bogra', 'Jaipurhat', 'Naogaon', 'Natore', 'Nawabganj', 'Pabna', 'Rajshahi', 'Sirajganj', 'Rangpur', 'Nilphamari', 'Dinajpur', 'Panchagarh', 'Gaibandha', 'Kurigram', 'Thakurgaon', 'Sylhet', 'Habiganj', 'Sunamganj', 'Sylhet'];

let arrayOfWords = [[fruits], [country], [district]];


// Whole play function
function play() {
    let currentWord = '',
        currentAlphabet = '';
    guessLeft = 10;

    let oneTimeFunc = function (myFunc) {
        let called = false;
        return function () {
            if (!called) {
                called = true;
                myFunc();
            }
        }
    };


    // all canvas art functions
    lowerLine = oneTimeFunc(() => {
        draw.strokeStyle = 'white';
        draw.beginPath();
        draw.moveTo(0, 130);
        draw.lineTo(300, 130);
        draw.stroke();
    });
    leftLine = oneTimeFunc(() => {
        draw.beginPath();
        draw.moveTo(100, 130);
        draw.lineTo(100, 12);
        draw.stroke();
    });
    upperLine = oneTimeFunc(() => {
        draw.beginPath();
        draw.moveTo(70, 12);
        draw.lineTo(195, 12);
        draw.stroke();
    });
    rope = oneTimeFunc(() => {
        draw.beginPath();
        draw.moveTo(150, 12);
        draw.lineTo(150, 25);
        draw.stroke();
    });
    head = oneTimeFunc(() => {
        draw.beginPath();
        draw.arc(150, 33, 8, 0, 2 * Math.PI);
        draw.stroke();
    });
    neck = oneTimeFunc(() => {
        draw.beginPath();
        draw.moveTo(150, 41);
        draw.lineTo(150, 53);
        draw.stroke();
    });
    rightArm = oneTimeFunc(() => {
        draw.beginPath();
        draw.moveTo(140, 53);
        draw.lineTo(117, 63);
        draw.stroke();
    });
    leftArm = oneTimeFunc(() => {
        draw.beginPath();
        draw.moveTo(160, 53);
        draw.lineTo(183, 63);
        draw.stroke();
    });
    body = oneTimeFunc(() => {
        draw.beginPath();
        draw.moveTo(150, 48);
        draw.lineTo(150, 80);
        draw.lineWidth = 22;
        draw.stroke();
    });
    bothLeg = oneTimeFunc(() => {
        draw.beginPath();
        draw.moveTo(144, 80);
        draw.lineTo(144, 102);
        draw.lineWidth = 1;
        draw.stroke();
        draw.beginPath();
        draw.moveTo(156, 80);
        draw.lineTo(156, 102);
        draw.stroke();
    });


    // Alphabet
    let allAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


    // defining the function that will invoked after clicking each of the 26 alphabets
    let alphabetClicked = function (e) {
        currentAlphabet = e.target.innerHTML;
        const span = document.createElement('span');
        span.innerHTML = e.target.innerHTML;
        alreadyGuessed.appendChild(span);

        // each true guess increasing value. So that we can end the game right after player guessed the right word
        for (let eachLetter of currentWord) {
            if (eachLetter === currentAlphabet) {
                trueGuess++;
            }
        }

        // Decreasing guesses every time player guesses wrong letter
        if (!currentWord.includes(currentAlphabet)) {
            guessLeft--;
        }

        if (guessLeft <= 0) {
            showGuessLeft.innerHTML = `You have lost, please try again!`;
            output.innerHTML = '';
            alreadyGuessed.innerHTML = '';
        }


        // Splitting current word so that i can apply forEach method
        currentWord.split('').forEach((element, index) => {
            if (element === currentAlphabet) {
                guessingWordUl.childNodes[index].innerHTML = element;
            }
        });


        // Calling/invoking canvas art functions
        switch (guessLeft) {
            case 9:
                lowerLine();
                break;
            case 8:
                leftLine();
                break;
            case 7:
                upperLine();
                break;
            case 6:
                rope();
                break;
            case 5:
                head();
                break;
            case 4:
                neck();
                break;
            case 3:
                rightArm();
                break;
            case 2:
                leftArm();
                break;
            case 1:
                body();
                break;
            case 0:
                bothLeg();
                break;
        }

        e.target.style.backgroundColor = '#9381ff';
    };


    // Dinamically adding all the button containing all 26 letters
    allAlphabet.forEach(alphabet => {
        let btn = document.createElement('button');
        btn.classList.add('alphabetClass');
        btn.innerHTML = alphabet;
        allButton.appendChild(btn);
        btn.addEventListener('click', alphabetClicked, { once: true });
    });






    // random name picking function
    function pickRandomName(ArrayOfName) {
        return Math.round(Math.random() * (ArrayOfName.length - 1));
    }

    let randomNumberForArrayOfWords = pickRandomName(arrayOfWords);
    let randomWordIndex = pickRandomName(arrayOfWords[randomNumberForArrayOfWords][0]);

    let randomWord = arrayOfWords[randomNumberForArrayOfWords][0][randomWordIndex].toLowerCase();


    // Adding dash dinamically according to the length of the word
    for (let fruitsAlphabet of randomWord) {
        let listOfFruitWord = document.createElement('li');
        currentWord += fruitsAlphabet;
        guessingWordUl.appendChild(listOfFruitWord);
    };


    // Hint
    hint.addEventListener('click', e => {
        switch (randomNumberForArrayOfWords) {
            case 0:
                output.innerHTML = `It's a Fruit!`;
                break;
            case 1:
                output.innerHTML = `It's a Country!`;
                break;
            case 2:
                output.innerHTML = `It's a of the District name of Bangladesh!`;
                break;
        }
    });


    // Game over after player have 0 guess left
    window.addEventListener('click', function () {
        showGuessLeft.innerHTML = `You have ${guessLeft} guess left`;

        if (guessLeft <= 0) {
            document.querySelectorAll('.alphabetClass').forEach(e => {
                e.removeEventListener('click', alphabetClicked);

                // revealing the name
                output.innerHTML = `Your word was ${randomWord}!`;

                // Showing lost message
                alreadyGuessed.innerHTML = `You've lost the game! Play Again`;
            });
        }
        if (trueGuess === randomWord.length) {
            showGuessLeft.innerHTML = `Congratulations! You've won the game.`;
            output.innerHTML = '';
            alreadyGuessed.innerHTML = '';
            document.querySelectorAll('.alphabetClass').forEach(e => {
                e.removeEventListener('click', alphabetClicked);
            });
        }
    });
};
play();



// Play again function
playAgain.addEventListener('click', function () {
    allButton.innerHTML = '';
    guessingWordUl.innerHTML = '';
    alreadyGuessed.innerHTML = '';
    output.innerHTML = '';


    draw.clearRect(0, 0, 400, 400);
    play();
});