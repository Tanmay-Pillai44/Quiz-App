// crreating an array and passing the nnumber, queestions, options, and answers.

let questions = [
    {
        num: 1,
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language"
        ]
    },
    {
        num: 2,
        question: "Javascript is an _______ language?",
        answer: `Object-Oriented`,
        options: [
            `Object-Oriented`,
            `Object-Based`,
            `Procedural`,
            `None of the above`
        ]
    },
    {
        num: 3,
        question: `Which of the following methods is used to access HTML elements using Javascript?`,
        answer: "Both A and B",
        options: [
            "getElementById()",
            "getElementByClassName()",
            "Both A and B",
            "None of the above"
        ]
    },
    {
        num: 4,
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        answer: `All of the above`,
        options: [
            `document.write()`,
            `console.log()`,
            `window.alert()`,
            "All of the above"
        ]
    },
    {
        num: 5,
        question: "What is the correct syntax of border property in CSS?",
        answer: `border: border-width border-style border-color`,
        options: [
            `border: border-width border-style border-color`,
            `border: border-color border-width border-style`,
            `border: border-style border-width border-color`,
            "All of the above"
        ]
    },
    {
        num: 6,
        question: "How can you check your current git version?",
        answer: `git --version`,
        options: [
            `git --v`,
            `git --version`,
            `git --option`,
            `git --current`
        ]
    },
    {
        num: 7,
        question: "What command lets you create a connection between a local and remote repository?",
        answer: `git remote add origin`,
        options: [
            `git status`,
            `git remote add origin`,
            `git init`,
            `git commit`
        ]
    },
    {
        num: 8,
        question: "Which of the following command line environment is used for interacting with Git ?",
        answer: `Git Bash`,
        options: [
            `Git Bash`,
            `Git Lab`,
            `Git Boot`,
            `GitHub`
        ]
    },
    {
        num: 9,
        question: "Which of the following shortcut to staging all the changes you have?",
        answer: `git add .`,
        options: [
            `git push -am "Message"`,
            `git add .`,
            `git commit`,
            `git commit add`
        ]
    },
    {
        num: 10,
        question: `What's the output? <br>
        console.log(typeof typeof 1);`,
        answer: `"string"`,
        options: [
            `"number"`,
            `"string"`,
            `"object"`,
            `"undefined"`
        ]
    },
];