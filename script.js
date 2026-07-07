const quotes=[

{
quote:"The future depends on what you do today.",
author:"Mahatma Gandhi"
},

{
quote:"Success is not final. Failure is not fatal.",
author:"Winston Churchill"
},

{
quote:"Dream big and dare to fail.",
author:"Norman Vaughan"
},

{
quote:"Believe you can and you're halfway there.",
author:"Theodore Roosevelt"
},

{
quote:"Stay hungry. Stay foolish.",
author:"Steve Jobs"
},

{
quote:"Education is the passport to the future.",
author:"Malcolm X"
},

{
quote:"Knowledge is power.",
author:"Francis Bacon"
},

{
quote:"Never stop learning.",
author:"Unknown"
}

];

let currentQuote={};

function newQuote(){

const random=Math.floor(Math.random()*quotes.length);

currentQuote=quotes[random];

document.getElementById("quote").innerHTML=currentQuote.quote;

document.getElementById("author").innerHTML="- "+currentQuote.author;

}

function copyQuote(){

const text=currentQuote.quote+" - "+currentQuote.author;

navigator.clipboard.writeText(text);

alert("Quote copied successfully!");

}

function shareQuote(){

const text=currentQuote.quote+" - "+currentQuote.author;

if(navigator.share){

navigator.share({

title:"Random Quote",

text:text

});

}

else{

alert("Sharing is not supported on your browser.");

}

}

newQuote();