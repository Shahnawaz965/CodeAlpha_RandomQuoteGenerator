const quotes = [
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
}
];

function newQuote(){

const random = Math.floor(Math.random()*quotes.length);

document.getElementById("quote").innerHTML =
quotes[random].quote;

document.getElementById("author").innerHTML =
"- " + quotes[random].author;

}

newQuote();