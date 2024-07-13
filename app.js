// let currentHref = window.location.href
// console.log(currentHref)
// if(currentHref.includes("view-source:")){
//     console.log("quiz is in the url")
// }


// document.oncontextmenu = () =>{
//     alert("right click band kiya huwa ha mene. :P")
//     return false
// }

// document.onkeydown = (e)=>{
//     if(e.key === "F12"){
//         alert("code nahi dekh sakty beta. koshish mat karo :P ")
//         return false
//     }
//     if(e.ctrlKey && e.key === "u"){
//         alert("Kyun try kar rho ho code dekhny ki. nahi dekh sakty :D")
//         return false
//     }
//     if(e.ctrlKey && e.key === "c"){
//         alert("Chori karna ha content? chal bhag yahan se.")
//         return false
//     }
//     if(e.ctrlKey && e.key === "v"){
//         alert("khud likhne me moat arhi ha kiya?")
//         return false
//     }
// }

// Register

if (window.location.pathname === "/register.html") {
    if (localStorage.getItem("userLoggedIn") === "true") {
        alert("Masti nahi karo, Logged In ho ap already")
        window.location.replace("/quiz.html")
    }
    else {
        const registerForm = document.querySelector("#registerForm")

        const registerUserDetails = {
            userName: registerForm.querySelector("#userName"),
            userEmail: registerForm.querySelector("#userEmail"),
            userPass: registerForm.querySelector("#userPass")
        }

        registerForm.addEventListener("submit", (e) => {
            e.preventDefault()

            const userDetails = {
                userName: registerUserDetails.userName.value,
                userEmail: registerUserDetails.userEmail.value,
                userPass: registerUserDetails.userPass.value
            }
            console.log("username = " + userName.value)
            console.log("useremail = " + userEmail.value)
            console.log("userpass = " + userPass.value)

            if (userDetails.userName !== "" && userDetails.userEmail !== "" && userDetails.userPass !== "") {

                let users = JSON.parse(localStorage.getItem('users')) || [];

                users.push(userDetails);

                localStorage.setItem('users', JSON.stringify(users))
                window.location.replace("/login.html")
            }
            else {
                alert("Pehle register ki details to dal do, bht jaldi ha apko")
            }

        })
    }


}

// Login

if (window.location.pathname === "/login.html") {

    if (localStorage.getItem("userLoggedIn") === "true") {
        alert("Masti nahi karo, Logged In ho ap already")
        window.location.replace("/quiz.html")
    }

    else {
        console.log(window.location.href)
        const loginForm = document.querySelector("#loginForm")

        const loginUserDetails = {
            userName: loginForm.querySelector("#userName"),
            userEmail: loginForm.querySelector("#userEmail"),
            userPass: loginForm.querySelector("#userPass")
        }

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault()

            // if(loginUserDetails.userName.value === "" && loginUserDetails.userEmail.value === "" && loginUserDetails.userPass.value === ""){
            //     alert("Please enter details to login")
            // }

            const userLoginDetails = {
                userName: loginUserDetails.userName.value,
                userEmail: loginUserDetails.userEmail.value,
                userPass: loginUserDetails.userPass.value
            }

            console.log("username = " + userName.value)
            console.log("useremail = " + userEmail.value)
            console.log("userpass = " + userPass.value)

            if (userLoginDetails.userName === "" && userLoginDetails.userEmail === "" && userLoginDetails.userPass === "") {
                alert("jis details se account banaya tha wohi dalo gy to login hoga na beta")
            }
            else {

                let users = JSON.parse(localStorage.getItem('users'));

                let user = users.findIndex((item)=>{
                    return item.userEmail == userLoginDetails.userEmail && item.userPass == userLoginDetails.userPass;
                })

                console.log({user});

                if ( user >= 0 ){
                    localStorage.setItem("userLoggedIn", JSON.stringify(users[user]));
                    alert("Welcome!")
                    window.location.replace("/quiz.html")
                }
                else {
                    alert("galat details kyun dal rhy ho? bhool gaye ho kiya jo dala tha? dekh lo na localstorage me :P")
                }
            }

        })
    }




}

// Quiz

if (window.location.pathname === "/quiz.html") {
    let userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"))

    console.log({userLoggedIn});

    if (userLoggedIn) {
        let container = document.querySelector(".container")
        container.style.background = ("#3da2ff");

        let menuDiv = document.createElement("div")
        menuDiv.classList.add("menu")
        container.appendChild(menuDiv)

        let result = document.createElement("a")
        result.innerText = "Result"
        result.setAttribute("href", "/result.html")
        menuDiv.appendChild(result)

        let logoutBtn = document.createElement("button")
        logoutBtn.innerText = "Logout"
        menuDiv.appendChild(logoutBtn)

        logoutBtn.addEventListener("click", () => {
            alert("bye bye. aaojo :D")
            localStorage.setItem("userLoggedIn", false);
            window.location.replace("/login.html")
        })


        let quizApp = document.createElement("div")
        quizApp.classList.add("quizApp")
        container.appendChild(quizApp)
        let h1 = document.createElement("h1")
        h1.innerText = "Welcome to the Quiz " + userLoggedIn.userName + "!"
        quizApp.appendChild(h1)

        let startQuiz = document.createElement("button")
        startQuiz.classList.add("startQuiz")
        startQuiz.innerText = "Start"
        quizApp.appendChild(startQuiz)

        startQuiz.addEventListener("click", () => {
            console.log("start clicked")
            startQuiz.classList.add("hide")
            let quizQuestions = [
                {
                    question: "what is today weather?",
                    option: ["40", "30", "24", "50"],
                    answer: "40"
                },
                {
                    question: "what is today date?",
                    option: ["40", "7", "24", "30"],
                    answer: "7"
                },
                {
                    question: "what is your age?",
                    option: ["40", "7", "24", "30"],
                    answer: "40"
                }
            ]

            let showedQuestions = []
            let userAnswers = []
            const randomIndex = getRandomIndex(quizQuestions, showedQuestions);
            addToShowedQuestions(showedQuestions,randomIndex);

            let quizQuestionsWrapper = document.createElement("div")
            quizQuestionsWrapper.classList.add("quizQuestionsWrapper")
            quizApp.appendChild(quizQuestionsWrapper)

            userAnswers = generateQuizDiv(quizQuestionsWrapper, quizQuestions, userAnswers, randomIndex);

            let numberOfQuestions = document.createElement("div")
            numberOfQuestions.classList.add("numberOfQuestions")
            quizApp.appendChild(numberOfQuestions)
            
            updateQuestionNumber(quizQuestions, showedQuestions);
                

            let nextBtn = document.createElement("button")
            nextBtn.classList.add("nextBtn")
            nextBtn.innerText = "Next"
            quizApp.appendChild(nextBtn)

            nextBtn.addEventListener("click", () => {

                console.log({showedQuestions: showedQuestions.length, userAnswers: userAnswers.length})
    
                if ( showedQuestions.length > userAnswers.length ){
                    alert('Chal beta jawab de pehlay!');
                }else{

                    if (quizQuestions.length === showedQuestions.length){
                        alert('quiz finished hoagya h ab result show bad me karwaonga, uske liye scoring banani paregi, abhi k liye local storage me se dekh kar khud result bana lo')

                        const stringify = JSON.stringify(userAnswers);

                        localStorage.setItem('userAnswers',stringify);

                        window.location.replace('/quiz.html');

                    }else{
                        console.log("next button is clicked")
        
                        const randomIndex = getRandomIndex(quizQuestions, showedQuestions);
                        addToShowedQuestions(showedQuestions,randomIndex);
                        userAnswers = generateQuizDiv(quizQuestionsWrapper, quizQuestions, userAnswers, randomIndex);
        
                        updateQuestionNumber(quizQuestions, showedQuestions);
        
                        if (quizQuestions.length === showedQuestions.length){
                            nextBtn.innerText = "Finish"
                        }
                    }

                }


            })
        })

    }
    else {
        alert("beta jakar pehle account banao, Shabash!")
        window.location.replace("/login.html")
    }
}

function addToShowedQuestions(showedQuestions, index) {
    console.log('addToShowedQuestions', index);
    showedQuestions.push(index);
}

function getRandomIndex(quizQuestions, showedQuestions){
    let randomIndex =  Math.floor(Math.random() * quizQuestions.length)
    
    if ( !showedQuestions.includes(randomIndex) ){
        console.log("ye random index generate huwa ha " + randomIndex)
    }else{
        randomIndex = getRandomIndex(quizQuestions, showedQuestions);
    }
    
    return randomIndex;
}

function generateQuizDiv(quizQuestionsWrapper, quizQuestions, userAnswers, index) {

    document.querySelectorAll('.quizDiv').forEach((item)=>{
        item.remove();
    })

    let quizDiv = document.createElement("div")
    quizDiv.classList.add("quizDiv")
    quizQuestionsWrapper.appendChild(quizDiv)

    const randomQuestions = quizQuestions[index]
    let h2 = document.createElement("h2")
    h2.innerText = randomQuestions.question
    quizDiv.appendChild(h2)

    let optionUl = document.createElement("ul")
    optionUl.classList.add("OptionUl")
    randomQuestions.option.forEach((option) => {

        let optionLi = document.createElement("li")
        optionLi.classList.add("OptionLi")

        optionUl.appendChild(optionLi)
        let optionLiAnchor = document.createElement("a")
        optionLiAnchor.innerText = option
        optionLiAnchor.setAttribute("href", "javaScript:;")

        optionLi.appendChild(optionLiAnchor)

        optionLiAnchor.addEventListener("click", () => {
            console.log(optionLiAnchor.innerText)
            
            let optionLis = Array.from(optionUl.children)

            if (optionLiAnchor.innerText === randomQuestions.answer) {
                console.log("Correct Answer")
                optionLi.classList.add("correct")

                optionLis.forEach(li => {
                    li.classList.add("pointerNone")
                })
            }
            else {
                console.log("Wrong Answer")
                optionLi.classList.add("wrong")
                optionLis.forEach(li => {
                    li.classList.add("pointerNone")
                })
                optionLis.forEach(li => {
                    if (li.querySelector('a').innerText === randomQuestions.answer) {
                        li.classList.add("correct")
                    }
                })
            }

            let isCorrect = false;

            if ( optionLiAnchor.innerText === randomQuestions.answer ){
                isCorrect = true;
            }

            userAnswers.push({
                question: randomQuestions.question,
                answer: optionLiAnchor.innerText,
                correct: isCorrect
            });

            console.log({userAnswers});
        })
    })
    
    quizDiv.appendChild(optionUl)

    return userAnswers;
}

function updateQuestionNumber(quizQuestions, showedQuestions) {
    document.querySelector('.numberOfQuestions').innerText = ( (showedQuestions.length) + " of " + quizQuestions.length);
}


// Admin

if (window.location.pathname === "/admin.html") {
   

    let usersDiv = document.querySelector(".usersDiv")
    let resusltsDiv = document.querySelector(".resusltsDiv")
    let quizQuestionsDiv = document.querySelector(".quizQuestionsDiv")

    let userMenuLink = document.querySelector(".userMenuLink")
    userMenuLink.addEventListener("click", ()=>{
        let userList = document.createElement("div")
        userList.classList.add("userList")
        let  storedUsers = JSON.parse(localStorage.getItem('users'));
        storedUsers.forEach(user => {
        
            console.log(user.userName)
            console.log(user.userEmail)
            // userList.innerText = "User Name " + user.userName + "User Email " + user.userEmail
            userList.innerHTML = '<div class="showUsers"><p class="userName">' + "User Name: " + user.userName + '</p><p class="userEmail">' + "User Email: " + user.userEmail + '</p></div>'
        });
        usersDiv.appendChild(userList)
    })


    // let container = document.querySelector(".container")
    // container.style.background = ("#3da2ff");
    // container.style.display = ("flex")

    // let leftPanel = document.createElement("div")
    // leftPanel.classList.add("leftPanel")
    // let rightPanel = document.createElement("div")
    // rightPanel.classList.add("rightPanel")
    // let adminMenu = document.createElement("div")
    // adminMenu.classList.add("admin-menu")

    // // adminMenu.innerHTML = "<div>Users</div><div></div>"

    // let menuBar = ["Users", "Results", "Quiz Questions"]
    // let menuIcons = {
    //     "Users": '<i class="fa-regular fa-user"></i>',
    //     "Results": '<i class="fa-solid fa-percent"></i>',
    //     "Quiz Questions": '<i class="fa-solid fa-list-check"></i>'
    // }
    // let menuLinks = {
    //     "Users": '/users.html',
    //     "Results": '/results.html',
    //     "Quiz Questions": '/quiz-questions.html'
    // }
    // menuBar.forEach(elem =>{
    //     let menuP = document.createElement("p")
    //     console.log(menuIcons[elem])
    //     let menuPAnchor = document.createElement("a")
    //     menuPAnchor.setAttribute("href", menuLinks[elem])
    //     menuP.appendChild(menuPAnchor)
    //     menuPAnchor.innerHTML = menuIcons[elem]
    //     menuPAnchor.innerHTML += elem
    //     adminMenu.appendChild(menuP)

        
    //     menuPAnchor.addEventListener("click", (e)=> {
    //         e.preventDefault()
    //         console.log("menu Link clicked" + elem)
    //         rightPanel.appendChild(elem)
    //     })
    // })

    // container.appendChild(leftPanel)
    // container.appendChild(rightPanel)
    // leftPanel.appendChild(adminMenu)

}

// let container = document.querySelector(".container")
// let h1 = document.createElement("h1")
// let questionDiv = document.createElement("div")
// let optionul = document.createElement("ul")
// let optionulli = document.createElement("li")
// let question = [
//     {
//         question: "what is today weather?",
//         options: ["40", "30", "24", "50"],
//         answer: "40"
//     },
//     {
//         question: "what is today date?",
//         options: ["40", "7", "24", "30"],
//         answer: "7"
//     }
// ]

// h1.innerText = "Quiz"
// container.appendChild(h1)

// question.forEach((element, index) => {

//     questionDiv.classList.add("question")
//     questionDiv.innerText = element.question
//     container.appendChild(questionDiv)

//     question.forEach((element, index) => {

//         optionul.classList.add("optionul")
//         optionulli.classList.add("optionulli")

//         optionulli.innerText = element.options
//         container.appendChild(optionul)
//         optionul.appendChild(optionulli)

//     })

// })

