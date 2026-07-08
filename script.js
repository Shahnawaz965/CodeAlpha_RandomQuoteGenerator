// ===============================
// QuoteVerse Pro v4.0
// Developed by Mohammad Shahnawaz Faiyaz
// ===============================

// ---------- API ----------

const API_URL = "https://zenquotes.io/api/random";

// ---------- App Variables ----------

let currentQuote = {};

let favorites =
JSON.parse(localStorage.getItem("favorites")) || [];

let quotesViewed =
parseInt(localStorage.getItem("quotesViewed")) || 0;

let dailyChallenge = "";

let autoRefresh = null;

let speech = window.speechSynthesis;

let currentCategory = "All";

let currentSearch = "";

// ---------- Categories ----------

const categories = [

"All",

"Motivation",

"Success",

"Education",

"Life",

"Leadership"

];

// ---------- Daily Challenges ----------

const challenges = [

"📖 Read 20 pages today.",

"💧 Drink 3 litres of water.",

"🏃 Walk 5000 steps.",

"😊 Smile at five people.",

"📵 Stay away from social media for one hour.",

"🧘 Meditate for 10 minutes.",

"✍️ Write one page in your journal.",

"📚 Learn one new thing today.",

"❤️ Help someone without expecting anything back.",

"🌱 Plant or care for a tree."

];

// ---------- Random Challenge ----------

function loadChallenge(){

const random =
Math.floor(Math.random()*challenges.length);

dailyChallenge =
challenges[random];

document.getElementById("challenge").innerHTML =
dailyChallenge;

}

// ---------- Statistics ----------

function updateStats(){

document.getElementById("favCount").innerHTML =
favorites.length;

document.getElementById("readCount").innerHTML =
quotesViewed;

}

// ---------- Loading Screen ----------

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader").style.display="none";

},1800);

});
// ===============================
// Live Quote API (ZenQuotes)
// ===============================

async function fetchQuote(){

try{

const response = await fetch(API_URL);

const data = await response.json();

currentQuote = {

quote:data[0].q,

author:data[0].a,

category:"Online"

};

displayQuote();

quotesViewed++;

localStorage.setItem(

"quotesViewed",

quotesViewed

);

updateStats();

document.getElementById(

"onlineStatus"

).innerHTML="🟢 Online";

}

catch(error){

console.log(error);

document.getElementById(

"onlineStatus"

).innerHTML="🔴 Offline";

loadOfflineQuote();

}

}

// ===============================
// Display Quote
// ===============================

function displayQuote(){

const card=document.getElementById("quoteCard");

card.style.opacity="0";

card.style.transform="scale(.95)";

setTimeout(()=>{

document.getElementById("quote").innerHTML=

currentQuote.quote;

document.getElementById("author").innerHTML=

"— "+currentQuote.author;

card.style.opacity="1";

card.style.transform="scale(1)";

},250);

}

// ===============================
// New Quote Button
// ===============================

function newQuote(){

fetchQuote();

}

// ===============================
// Offline Backup
// ===============================

function loadOfflineQuote(){

const offlineQuotes=[

{

quote:"Stay hungry. Stay foolish.",

author:"Steve Jobs"

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

quote:"Success is not final. Failure is not fatal.",

author:"Winston Churchill"

},

{

quote:"Education is the passport to the future.",

author:"Malcolm X"

},
  {
quote:"Success is not measured by what you accomplish, but by the obstacles you overcome.",
author:"Booker T. Washington",
category:"Success"
},
{
quote:"The roots of education are bitter, but the fruit is sweet.",
author:"Aristotle",
category:"Education"
},
{
quote:"Don't let yesterday take up too much of today.",
author:"Will Rogers",
category:"Life"
},
{
quote:"The best preparation for tomorrow is doing your best today.",
author:"H. Jackson Brown Jr.",
category:"Motivation"
},
{
quote:"What lies behind us and what lies before us are tiny matters compared to what lies within us.",
author:"Ralph Waldo Emerson",
category:"Life"
},
{
quote:"Everything you've ever wanted is waiting on the other side of consistency.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Discipline is remembering what you want.",
author:"David Campbell",
category:"Success"
},
{
quote:"The future starts today, not tomorrow.",
author:"Pope John Paul II",
category:"Motivation"
},
{
quote:"Success is built one day at a time.",
author:"Unknown",
category:"Success"
},
{
quote:"Knowledge grows when shared.",
author:"Unknown",
category:"Education"
},
{
quote:"Reading gives us someplace to go when we have to stay where we are.",
author:"Mason Cooley",
category:"Education"
},
{
quote:"Learn continuously. There is always one more thing to learn.",
author:"Steve Jobs",
category:"Education"
},
{
quote:"Don't fear failure. Fear being in the exact same place next year.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Nothing is impossible. The word itself says 'I'm possible.'",
author:"Audrey Hepburn",
category:"Motivation"
},
{
quote:"A winner is a dreamer who never gives up.",
author:"Nelson Mandela",
category:"Success"
},
{
quote:"The best teachers are those who show you where to look.",
author:"Alexandra K. Trenfor",
category:"Education"
},
{
quote:"Success comes from discipline and dedication.",
author:"Unknown",
category:"Success"
},
{
quote:"Great minds discuss ideas.",
author:"Eleanor Roosevelt",
category:"Education"
},
{
quote:"A person who never made a mistake never tried anything new.",
author:"Albert Einstein",
category:"Education"
},
{
quote:"The harder you work, the luckier you get.",
author:"Gary Player",
category:"Success"
},
{
quote:"Education opens doors that no one can close.",
author:"Unknown",
category:"Education"
},
{
quote:"One book, one pen, one child, and one teacher can change the world.",
author:"Malala Yousafzai",
category:"Education"
},
{
quote:"Believe in your infinite potential.",
author:"Roy T. Bennett",
category:"Motivation"
},
{
quote:"Do what is right, not what is easy.",
author:"Roy T. Bennett",
category:"Life"
},
{
quote:"Success is earned, not given.",
author:"Unknown",
category:"Success"
},
{
quote:"Your mindset determines your future.",
author:"Carol Dweck",
category:"Motivation"
},
{
quote:"Knowledge is the bridge to opportunity.",
author:"Unknown",
category:"Education"
},
{
quote:"Keep learning because the world keeps changing.",
author:"Unknown",
category:"Education"
},
{
quote:"Progress is impossible without change.",
author:"George Bernard Shaw",
category:"Life"
},
{
quote:"Failure is simply the opportunity to begin again.",
author:"Henry Ford",
category:"Success"
},
{
quote:"The secret of success is consistency of purpose.",
author:"Benjamin Disraeli",
category:"Success"
},
{
quote:"A little knowledge that acts is worth infinitely more than much knowledge that is idle.",
author:"Khalil Gibran",
category:"Education"
},
{
quote:"Every expert was once a beginner.",
author:"Helen Hayes",
category:"Education"
},
{
quote:"Stay patient and trust your journey.",
author:"Unknown",
category:"Life"
},
{
quote:"Life rewards those who stay committed.",
author:"Unknown",
category:"Life"
},
{
quote:"Success follows preparation.",
author:"Unknown",
category:"Success"
},
{
quote:"Learning is the beginning of wealth.",
author:"Jim Rohn",
category:"Education"
},
{
quote:"A positive mindset creates positive outcomes.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Your habits shape your future.",
author:"James Clear",
category:"Success"
},
{
quote:"Every sunrise is a new opportunity.",
author:"Unknown",
category:"Life"
},
{
quote:"The only limit to your impact is your imagination.",
author:"Tony Robbins",
category:"Motivation"
},
{
quote:"Growth begins where comfort ends.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Knowledge without action is meaningless.",
author:"Abu Bakr",
category:"Education"
},
{
quote:"Great achievements require great persistence.",
author:"Unknown",
category:"Success"
},
{
quote:"Leadership starts with leading yourself.",
author:"John C. Maxwell",
category:"Leadership"
},
{
quote:"The beautiful journey of today can only begin when we let go of yesterday.",
author:"Steve Maraboli",
category:"Life"
},
{
quote:"Small daily improvements lead to stunning results.",
author:"Robin Sharma",
category:"Success"
},
{
quote:"Your future is created by your daily decisions.",
author:"Unknown",
category:"Life"
},
{
quote:"Success belongs to those who never stop learning.",
author:"Brian Tracy",
category:"Education"
},
{
quote:"Make today count because it never comes again.",
author:"Unknown",
category:"Life"
},
  {
quote:"Education is the most powerful weapon which you can use to change the world.",
author:"Nelson Mandela",
category:"Education"
},
{
quote:"It always seems impossible until it's done.",
author:"Nelson Mandela",
category:"Motivation"
},
{
quote:"May your choices reflect your hopes, not your fears.",
author:"Nelson Mandela",
category:"Life"
},
{
quote:"Knowing yourself is the beginning of all wisdom.",
author:"Aristotle",
category:"Education"
},
{
quote:"Quality is not an act, it is a habit.",
author:"Aristotle",
category:"Success"
},
{
quote:"Happiness depends upon ourselves.",
author:"Aristotle",
category:"Life"
},
{
quote:"The only true wisdom is in knowing you know nothing.",
author:"Socrates",
category:"Education"
},
{
quote:"Wonder is the beginning of wisdom.",
author:"Socrates",
category:"Education"
},
{
quote:"He who is not contented with what he has would not be contented with what he would like to have.",
author:"Socrates",
category:"Life"
},
{
quote:"The journey of a thousand miles begins with one step.",
author:"Lao Tzu",
category:"Life"
},
{
quote:"Nature does not hurry, yet everything is accomplished.",
author:"Lao Tzu",
category:"Life"
},
{
quote:"When I let go of what I am, I become what I might be.",
author:"Lao Tzu",
category:"Motivation"
},
{
quote:"Victorious warriors win first and then go to war.",
author:"Sun Tzu",
category:"Leadership"
},
{
quote:"Appear weak when you are strong, and strong when you are weak.",
author:"Sun Tzu",
category:"Leadership"
},
{
quote:"Opportunities multiply as they are seized.",
author:"Sun Tzu",
category:"Success"
},
{
quote:"A goal is not always meant to be reached.",
author:"Bruce Lee",
category:"Motivation"
},
{
quote:"Knowing is not enough, we must apply.",
author:"Bruce Lee",
category:"Education"
},
{
quote:"The successful warrior is the average man with laser-like focus.",
author:"Bruce Lee",
category:"Success"
},
{
quote:"Be happy for this moment. This moment is your life.",
author:"Omar Khayyam",
category:"Life"
},
{
quote:"The future belongs to those who prepare for it today.",
author:"Malcolm X",
category:"Education"
},
{
quote:"Peace begins with a smile.",
author:"Mother Teresa",
category:"Life"
},
{
quote:"Kind words can be short and easy to speak, but their echoes are endless.",
author:"Mother Teresa",
category:"Life"
},
{
quote:"If you judge people, you have no time to love them.",
author:"Mother Teresa",
category:"Life"
},
{
quote:"The future rewards those who press on.",
author:"Barack Obama",
category:"Motivation"
},
{
quote:"The best way to not feel hopeless is to get up and do something.",
author:"Barack Obama",
category:"Motivation"
},
{
quote:"Change will not come if we wait for someone else.",
author:"Barack Obama",
category:"Leadership"
},
{
quote:"Look up at the stars and not down at your feet.",
author:"Stephen Hawking",
category:"Science"
},
{
quote:"Intelligence is the ability to adapt to change.",
author:"Stephen Hawking",
category:"Science"
},
{
quote:"However difficult life may seem, there is always something you can do.",
author:"Stephen Hawking",
category:"Life"
},
{
quote:"Innovation distinguishes between a leader and a follower.",
author:"Steve Jobs",
category:"Leadership"
},
{
quote:"Stay foolish to stay sane.",
author:"Maxime Lagacé",
category:"Life"
},
{
quote:"Turn your wounds into wisdom.",
author:"Oprah Winfrey",
category:"Life"
},
{
quote:"The biggest adventure you can take is to live the life of your dreams.",
author:"Oprah Winfrey",
category:"Motivation"
},
{
quote:"Do what you feel in your heart to be right.",
author:"Eleanor Roosevelt",
category:"Leadership"
},
{
quote:"With the new day comes new strength and new thoughts.",
author:"Eleanor Roosevelt",
category:"Motivation"
},
{
quote:"Keep your face always toward the sunshine and shadows will fall behind you.",
author:"Walt Whitman",
category:"Life"
},
{
quote:"Act as if what you do makes a difference. It does.",
author:"William James",
category:"Motivation"
},
{
quote:"Success is walking from failure to failure with no loss of enthusiasm.",
author:"Winston Churchill",
category:"Success"
},
{
quote:"Continuous effort, not strength or intelligence, is the key to unlocking our potential.",
author:"Winston Churchill",
category:"Success"
},
{
quote:"Never, never, never give up.",
author:"Winston Churchill",
category:"Motivation"
},
{
quote:"Everything has beauty, but not everyone sees it.",
author:"Confucius",
category:"Life"
},
{
quote:"Silence is a true friend who never betrays.",
author:"Confucius",
category:"Life"
},
{
quote:"He who learns but does not think is lost.",
author:"Confucius",
category:"Education"
},
{
quote:"Success is achieved by ordinary people with extraordinary determination.",
author:"Zig Ziglar",
category:"Success"
},
{
quote:"You don't have to be great to start, but you have to start to be great.",
author:"Zig Ziglar",
category:"Motivation"
},
{
quote:"Expect the best. Prepare for the worst. Capitalize on what comes.",
author:"Zig Ziglar",
category:"Success"
},
{
quote:"Life is really simple, but we insist on making it complicated.",
author:"Confucius",
category:"Life"
},
{
quote:"Everything you’ve ever wanted is on the other side of fear.",
author:"George Addair",
category:"Motivation"
},
{
quote:"Success begins with self-belief.",
author:"Unknown",
category:"Success"
},
{
quote:"Every day is another chance to improve yourself.",
author:"Unknown",
category:"Motivation"
},
  {
quote:"Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.",
author:"A.P.J. Abdul Kalam",
category:"Motivation"
},
{
quote:"Excellence happens not by accident. It is a process.",
author:"A.P.J. Abdul Kalam",
category:"Success"
},
{
quote:"You have to dream before your dreams can come true.",
author:"A.P.J. Abdul Kalam",
category:"Motivation"
},
{
quote:"Arise, awake and stop not till the goal is reached.",
author:"Swami Vivekananda",
category:"Motivation"
},
{
quote:"Take risks in your life. If you win, you can lead; if you lose, you can guide.",
author:"Swami Vivekananda",
category:"Leadership"
},
{
quote:"All power is within you; you can do anything.",
author:"Swami Vivekananda",
category:"Motivation"
},
{
quote:"The important thing is not to stop questioning.",
author:"Albert Einstein",
category:"Education"
},
{
quote:"Imagination is more important than knowledge.",
author:"Albert Einstein",
category:"Education"
},
{
quote:"Try not to become a person of success, but rather a person of value.",
author:"Albert Einstein",
category:"Life"
},
{
quote:"Anyone who has never made a mistake has never tried anything new.",
author:"Albert Einstein",
category:"Education"
},
{
quote:"Strive not to be a success, but rather to be of value.",
author:"Albert Einstein",
category:"Success"
},
{
quote:"I don't believe in taking right decisions. I take decisions and then make them right.",
author:"Ratan Tata",
category:"Leadership"
},
{
quote:"Ups and downs in life are very important to keep us going.",
author:"Ratan Tata",
category:"Life"
},
{
quote:"If you want to walk fast, walk alone. If you want to walk far, walk together.",
author:"Ratan Tata",
category:"Leadership"
},
{
quote:"Persistence is very important. You should not give up.",
author:"Elon Musk",
category:"Motivation"
},
{
quote:"Some people don't like change, but you need to embrace change.",
author:"Elon Musk",
category:"Success"
},
{
quote:"When something is important enough, you do it even if the odds are not in your favor.",
author:"Elon Musk",
category:"Motivation"
},
{
quote:"Patience is a key element of success.",
author:"Bill Gates",
category:"Success"
},
{
quote:"Success is a lousy teacher. It seduces smart people into thinking they can't lose.",
author:"Bill Gates",
category:"Success"
},
{
quote:"Your most unhappy customers are your greatest source of learning.",
author:"Bill Gates",
category:"Education"
},
{
quote:"The best investment you can make is in yourself.",
author:"Warren Buffett",
category:"Education"
},
{
quote:"Someone is sitting in the shade today because someone planted a tree a long time ago.",
author:"Warren Buffett",
category:"Life"
},
{
quote:"Price is what you pay. Value is what you get.",
author:"Warren Buffett",
category:"Success"
},
{
quote:"Nothing can dim the light which shines from within.",
author:"Maya Angelou",
category:"Life"
},
{
quote:"If you are always trying to be normal, you will never know how amazing you can be.",
author:"Maya Angelou",
category:"Motivation"
},
{
quote:"Success is liking yourself, liking what you do, and liking how you do it.",
author:"Maya Angelou",
category:"Success"
},
{
quote:"It does not matter how slowly you go as long as you do not stop.",
author:"Confucius",
category:"Motivation"
},
{
quote:"The man who moves a mountain begins by carrying away small stones.",
author:"Confucius",
category:"Motivation"
},
{
quote:"Our greatest glory is not in never falling, but in rising every time we fall.",
author:"Confucius",
category:"Life"
},
{
quote:"Knowing is not enough; we must apply.",
author:"Johann Wolfgang von Goethe",
category:"Education"
},
{
quote:"Whatever you are, be a good one.",
author:"Abraham Lincoln",
category:"Leadership"
},
{
quote:"The best way out is always through.",
author:"Robert Frost",
category:"Life"
},
{
quote:"Never confuse a single defeat with a final defeat.",
author:"F. Scott Fitzgerald",
category:"Motivation"
},
{
quote:"The only impossible journey is the one you never begin.",
author:"Tony Robbins",
category:"Motivation"
},
{
quote:"Focus on being productive instead of busy.",
author:"Tim Ferriss",
category:"Success"
},
{
quote:"Either you run the day or the day runs you.",
author:"Jim Rohn",
category:"Success"
},
{
quote:"Success is nothing more than a few simple disciplines practiced every day.",
author:"Jim Rohn",
category:"Success"
},
{
quote:"Don't wish it were easier. Wish you were better.",
author:"Jim Rohn",
category:"Motivation"
},
{
quote:"A river cuts through rock not because of its power, but because of its persistence.",
author:"James N. Watkins",
category:"Motivation"
},
{
quote:"The difference between ordinary and extraordinary is that little extra.",
author:"Jimmy Johnson",
category:"Success"
},
{
quote:"Everything you can imagine is real.",
author:"Pablo Picasso",
category:"Life"
},
{
quote:"Be so good they can't ignore you.",
author:"Steve Martin",
category:"Success"
},
{
quote:"Success is the product of daily habits.",
author:"James Clear",
category:"Success"
},
{
quote:"Habits are the compound interest of self-improvement.",
author:"James Clear",
category:"Education"
},
{
quote:"You do not rise to the level of your goals. You fall to the level of your systems.",
author:"James Clear",
category:"Success"
},
{
quote:"Consistency creates excellence.",
author:"Robin Sharma",
category:"Success"
},
{
quote:"Leadership begins with self-discipline.",
author:"Robin Sharma",
category:"Leadership"
},
{
quote:"Make each day your masterpiece.",
author:"John Wooden",
category:"Life"
},
{
quote:"The harder the battle, the sweeter the victory.",
author:"Les Brown",
category:"Motivation"
},
{
quote:"Shoot for the moon. Even if you miss, you'll land among the stars.",
author:"Norman Vincent Peale",
category:"Motivation"
},
  {
quote:"Success is getting what you want. Happiness is wanting what you get.",
author:"Dale Carnegie",
category:"Life"
},
{
quote:"Opportunities don't happen. You create them.",
author:"Chris Grosser",
category:"Success"
},
{
quote:"Everything you've ever wanted is on the other side of fear.",
author:"George Addair",
category:"Motivation"
},
{
quote:"A goal without a plan is just a wish.",
author:"Antoine de Saint-Exupéry",
category:"Success"
},
{
quote:"The journey of a thousand miles begins with one step.",
author:"Lao Tzu",
category:"Life"
},
{
quote:"The best revenge is massive success.",
author:"Frank Sinatra",
category:"Success"
},
{
quote:"Never let the fear of striking out keep you from playing the game.",
author:"Babe Ruth",
category:"Motivation"
},
{
quote:"Believe in yourself and all that you are.",
author:"Christian D. Larson",
category:"Motivation"
},
{
quote:"Hard work beats talent when talent doesn't work hard.",
author:"Tim Notke",
category:"Success"
},
{
quote:"Success is where preparation and opportunity meet.",
author:"Bobby Unser",
category:"Success"
},
{
quote:"If you want to achieve greatness stop asking for permission.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Everything is hard before it is easy.",
author:"Johann Wolfgang von Goethe",
category:"Life"
},
{
quote:"Don't be afraid to give up the good to go for the great.",
author:"John D. Rockefeller",
category:"Success"
},
{
quote:"The only limit is the one you set yourself.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Education breeds confidence. Confidence breeds hope.",
author:"Confucius",
category:"Education"
},
{
quote:"Reading is to the mind what exercise is to the body.",
author:"Joseph Addison",
category:"Education"
},
{
quote:"Learning is a treasure that will follow its owner everywhere.",
author:"Chinese Proverb",
category:"Education"
},
{
quote:"Success is the sum of small efforts repeated day in and day out.",
author:"Robert Collier",
category:"Success"
},
{
quote:"Do something today that your future self will thank you for.",
author:"Sean Patrick Flanery",
category:"Motivation"
},
{
quote:"Your only competition is who you were yesterday.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Discipline is the bridge between goals and accomplishment.",
author:"Jim Rohn",
category:"Success"
},
{
quote:"Life begins at the end of your comfort zone.",
author:"Neale Donald Walsch",
category:"Life"
},
{
quote:"Don't count the days. Make the days count.",
author:"Muhammad Ali",
category:"Motivation"
},
{
quote:"Every day is a chance to become better.",
author:"Unknown",
category:"Life"
},
{
quote:"A little progress each day adds up to big results.",
author:"Satya Nani",
category:"Motivation"
},
{
quote:"The successful warrior is the average man with laser-like focus.",
author:"Bruce Lee",
category:"Success"
},
{
quote:"Never stop learning because life never stops teaching.",
author:"Unknown",
category:"Education"
},
{
quote:"Knowledge speaks, but wisdom listens.",
author:"Jimi Hendrix",
category:"Education"
},
{
quote:"Today's accomplishments were yesterday's impossibilities.",
author:"Robert H. Schuller",
category:"Success"
},
{
quote:"Great leaders inspire greatness in others.",
author:"Lolly Daskal",
category:"Leadership"
},
{
quote:"Leadership is action, not position.",
author:"Donald McGannon",
category:"Leadership"
},
{
quote:"The greatest glory in living lies not in never falling, but in rising every time we fall.",
author:"Nelson Mandela",
category:"Motivation"
},
{
quote:"Turn your wounds into wisdom.",
author:"Oprah Winfrey",
category:"Life"
},
{
quote:"Success is not for the lazy.",
author:"Unknown",
category:"Success"
},
{
quote:"Never give up on a dream because of the time it will take.",
author:"Earl Nightingale",
category:"Motivation"
},
{
quote:"Small deeds done are better than great deeds planned.",
author:"Peter Marshall",
category:"Motivation"
},
{
quote:"Don't watch the clock; do what it does. Keep going.",
author:"Sam Levenson",
category:"Motivation"
},
{
quote:"Be stronger than your excuses.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Winners are not afraid of losing.",
author:"Robert Kiyosaki",
category:"Success"
},
{
quote:"The key to success is to focus on goals, not obstacles.",
author:"Unknown",
category:"Success"
},
{
quote:"Your attitude determines your direction.",
author:"Unknown",
category:"Life"
},
{
quote:"Difficult roads often lead to beautiful destinations.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Success doesn't come from what you do occasionally, but what you do consistently.",
author:"Marie Forleo",
category:"Success"
},
{
quote:"Knowledge has a beginning but no end.",
author:"Geeta Iyengar",
category:"Education"
},
{
quote:"Education is not preparation for life; education is life itself.",
author:"John Dewey",
category:"Education"
},
{
quote:"One day or day one. You decide.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Great things take time.",
author:"Unknown",
category:"Life"
},
{
quote:"Don't quit. Suffer now and live the rest of your life as a champion.",
author:"Muhammad Ali",
category:"Motivation"
},
{
quote:"Your dreams don't work unless you do.",
author:"John C. Maxwell",
category:"Success"
},
{
quote:"Every master was once a beginner.",
author:"Robin Sharma",
category:"Education"
},
  {
quote:"The future depends on what you do today.",
author:"Mahatma Gandhi",
category:"Motivation"
},
{
quote:"Stay hungry. Stay foolish.",
author:"Steve Jobs",
category:"Success"
},
{
quote:"Education is the passport to the future.",
author:"Malcolm X",
category:"Education"
},
{
quote:"Knowledge is power.",
author:"Francis Bacon",
category:"Education"
},
{
quote:"Dream big and dare to fail.",
author:"Norman Vaughan",
category:"Motivation"
},
{
quote:"Success is not final. Failure is not fatal.",
author:"Winston Churchill",
category:"Success"
},
{
quote:"Believe you can and you're halfway there.",
author:"Theodore Roosevelt",
category:"Motivation"
},
{
quote:"Do what you can, with what you have, where you are.",
author:"Theodore Roosevelt",
category:"Life"
},
{
quote:"Life is what happens while you are busy making other plans.",
author:"John Lennon",
category:"Life"
},
{
quote:"The only way to do great work is to love what you do.",
author:"Steve Jobs",
category:"Success"
},
{
quote:"It always seems impossible until it's done.",
author:"Nelson Mandela",
category:"Motivation"
},
{
quote:"Do one thing every day that scares you.",
author:"Eleanor Roosevelt",
category:"Motivation"
},
{
quote:"Action is the foundational key to all success.",
author:"Pablo Picasso",
category:"Success"
},
{
quote:"Success usually comes to those who are too busy to be looking for it.",
author:"Henry David Thoreau",
category:"Success"
},
{
quote:"Your limitation—it's only your imagination.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Push yourself because no one else is going to do it for you.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Great things never come from comfort zones.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Dream it. Wish it. Do it.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Don't stop when you're tired. Stop when you're done.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Wake up with determination. Go to bed with satisfaction.",
author:"Unknown",
category:"Life"
},
{
quote:"Little things make big days.",
author:"Unknown",
category:"Life"
},
{
quote:"Don't wait for opportunity. Create it.",
author:"George Bernard Shaw",
category:"Success"
},
{
quote:"It's going to be hard, but hard does not mean impossible.",
author:"Unknown",
category:"Motivation"
},
{
quote:"The harder you work for something, the greater you'll feel when you achieve it.",
author:"Unknown",
category:"Success"
},
{
quote:"Dream bigger. Do bigger.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Don't limit your challenges. Challenge your limits.",
author:"Unknown",
category:"Motivation"
},
{
quote:"Failure is another stepping stone to greatness.",
author:"Oprah Winfrey",
category:"Success"
},
{
quote:"Work hard in silence. Let success make the noise.",
author:"Frank Ocean",
category:"Success"
},
{
quote:"Learning never exhausts the mind.",
author:"Leonardo da Vinci",
category:"Education"
},
{
quote:"An investment in knowledge pays the best interest.",
author:"Benjamin Franklin",
category:"Education"
},
{
quote:"The beautiful thing about learning is nobody can take it away from you.",
author:"B.B. King",
category:"Education"
},
{
quote:"Live as if you were to die tomorrow. Learn as if you were to live forever.",
author:"Mahatma Gandhi",
category:"Education"
},
{
quote:"Education is the key to unlocking the world.",
author:"Oprah Winfrey",
category:"Education"
},
{
quote:"The expert in anything was once a beginner.",
author:"Helen Hayes",
category:"Education"
},
{
quote:"Every accomplishment starts with the decision to try.",
author:"John F. Kennedy",
category:"Motivation"
},
{
quote:"Small progress is still progress.",
author:"Unknown",
category:"Life"
},
{
quote:"Discipline is choosing between what you want now and what you want most.",
author:"Abraham Lincoln",
category:"Success"
},
{
quote:"Success is a journey, not a destination.",
author:"Arthur Ashe",
category:"Success"
},
{
quote:"Happiness depends upon ourselves.",
author:"Aristotle",
category:"Life"
},
{
quote:"The best way to predict the future is to create it.",
author:"Peter Drucker",
category:"Success"
},
{
quote:"The secret of getting ahead is getting started.",
author:"Mark Twain",
category:"Motivation"
},
{
quote:"Quality is not an act, it is a habit.",
author:"Aristotle",
category:"Success"
},
{
quote:"If opportunity doesn't knock, build a door.",
author:"Milton Berle",
category:"Success"
},
{
quote:"Be yourself; everyone else is already taken.",
author:"Oscar Wilde",
category:"Life"
},
{
quote:"In the middle of every difficulty lies opportunity.",
author:"Albert Einstein",
category:"Motivation"
},
{
quote:"If you can dream it, you can do it.",
author:"Walt Disney",
category:"Success"
},
{
quote:"Nothing will work unless you do.",
author:"Maya Angelou",
category:"Motivation"
},
{
quote:"Doubt kills more dreams than failure ever will.",
author:"Suzy Kassem",
category:"Motivation"
},
{
quote:"Your future is created by what you do today.",
author:"Robert Kiyosaki",
category:"Success"
},
{
quote:"Keep your face always toward the sunshine.",
author:"Walt Whitman",
category:"Life"
}

];

const random=

Math.floor(

Math.random()*offlineQuotes.length

);

currentQuote=offlineQuotes[random];

displayQuote();

}

// ===============================
// Quote of the Day
// ===============================

function quoteOfTheDay(){

const today=new Date().toDateString();

const savedDate=

localStorage.getItem("quoteDate");

if(savedDate===today){

const savedQuote=

JSON.parse(

localStorage.getItem("todayQuote")

);

if(savedQuote){

currentQuote=savedQuote;

displayQuote();

return;

}

}

fetchQuote();

setTimeout(()=>{

localStorage.setItem(

"quoteDate",

today

);

localStorage.setItem(

"todayQuote",

JSON.stringify(currentQuote)

);

},1200);

}
// ===============================
// Copy Quote
// ===============================

function copyQuote(){

const text =
currentQuote.quote + " — " + currentQuote.author;

navigator.clipboard.writeText(text);

alert("✅ Quote copied to clipboard!");

}

// ===============================
// Share Quote
// ===============================

function shareQuote(){

const text =
currentQuote.quote + " — " + currentQuote.author;

if(navigator.share){

navigator.share({

title:"QuoteVerse Pro",

text:text

});

}

else{

copyQuote();

alert("Sharing isn't supported on this browser.\nThe quote has been copied instead.");

}

}

// ===============================
// Text To Speech
// ===============================

function speakQuote(){

speech.cancel();

const message =
new SpeechSynthesisUtterance(

currentQuote.quote +

" by " +

currentQuote.author

);

message.lang="en-US";

message.rate=1;

message.pitch=1;

message.volume=1;

speech.speak(message);

}

// ===============================
// Daily Challenge
// ===============================

function loadTodayChallenge(){

const today =
new Date().toDateString();

const savedDate =
localStorage.getItem("challengeDate");

if(savedDate===today){

document.getElementById("challenge").innerHTML=

localStorage.getItem("challengeText");

return;

}

loadChallenge();

localStorage.setItem(

"challengeDate",

today

);

localStorage.setItem(

"challengeText",

dailyChallenge

);

}
// ===============================
// Favorite Quotes
// ===============================

function favoriteQuote(){

if(!currentQuote.quote){

alert("No quote loaded!");

return;

}

const alreadyExists = favorites.some(item =>

item.quote === currentQuote.quote

&&

item.author === currentQuote.author

);

if(alreadyExists){

alert("❤️ This quote is already in Favorites!");

return;

}

favorites.push(currentQuote);

localStorage.setItem(

"favorites",

JSON.stringify(favorites)

);

updateStats();

alert("⭐ Added to Favorites!");

}

// ===============================
// Remove Favorite
// ===============================

function removeFavorite(index){

favorites.splice(index,1);

localStorage.setItem(

"favorites",

JSON.stringify(favorites)

);

updateStats();

showFavorites();

}

// ===============================
// Show Favorite Quotes
// ===============================

function showFavorites(){

if(favorites.length===0){

alert("You don't have any favorite quotes yet.");

return;

}

let list="❤️ Favorite Quotes\n\n";

favorites.forEach((item,index)=>{

list +=

(index+1)+". "

+ item.quote

+"\n— "

+ item.author

+"\n\n";

});

alert(list);

}

// ===============================
// Clear Favorites
// ===============================

function clearFavorites(){

const confirmDelete =

confirm("Delete all favorite quotes?");

if(!confirmDelete){

return;

}

favorites=[];

localStorage.removeItem("favorites");

updateStats();

alert("✅ Favorites cleared successfully!");

}
// ===============================
// Search Quotes
// ===============================

function searchQuote(){

const search=document
.getElementById("searchInput")
.value
.toLowerCase();

if(search===""){

fetchQuote();

return;

}

if(currentQuote.quote.toLowerCase().includes(search)

||

currentQuote.author.toLowerCase().includes(search)){

displayQuote();

}

else{

document.getElementById("quote").innerHTML=

"No matching quote found.";

document.getElementById("author").innerHTML="";

}

}

// ===============================
// Categories
// ===============================

function filterCategory(category){

currentCategory=category;

fetchQuote();

}

// ===============================
// Online / Offline Detection
// ===============================

window.addEventListener("online",()=>{

document.getElementById("onlineStatus").innerHTML=

"🟢 Online";

});

window.addEventListener("offline",()=>{

document.getElementById("onlineStatus").innerHTML=

"🔴 Offline";

});

// ===============================
// Auto Refresh Quotes
// ===============================

function startAutoRefresh(){

if(autoRefresh){

clearInterval(autoRefresh);

}

autoRefresh=setInterval(()=>{

fetchQuote();

},30000);

}

// ===============================
// Stop Auto Refresh
// ===============================

function stopAutoRefresh(){

clearInterval(autoRefresh);

}

// ===============================
// Update Statistics
// ===============================

function increaseQuoteCount(){

quotesViewed++;

localStorage.setItem(

"quotesViewed",

quotesViewed

);

updateStats();

}
// ===============================
// Dark Mode
// ===============================

function toggleTheme(){

document.body.classList.toggle("dark");

const isDark=document.body.classList.contains("dark");

localStorage.setItem("theme",isDark?"dark":"light");

document.getElementById("themeBtn").innerHTML=

isDark?"☀️":"🌙";

}

// ===============================
// Load Saved Theme
// ===============================

function loadTheme(){

const savedTheme=localStorage.getItem("theme");

if(savedTheme==="dark"){

document.body.classList.add("dark");

document.getElementById("themeBtn").innerHTML="☀️";

}

}

// ===============================
// Animated Backgrounds
// ===============================

const gradients=[

"linear-gradient(135deg,#667eea,#764ba2)",

"linear-gradient(135deg,#ff6a00,#ee0979)",

"linear-gradient(135deg,#00c9ff,#92fe9d)",

"linear-gradient(135deg,#fc466b,#3f5efb)",

"linear-gradient(135deg,#11998e,#38ef7d)",

"linear-gradient(135deg,#ff9966,#ff5e62)",

"linear-gradient(135deg,#7f00ff,#e100ff)",

"linear-gradient(135deg,#2193b0,#6dd5ed)"

];

function changeBackground(){

if(document.body.classList.contains("dark")){

return;

}

const random=

Math.floor(Math.random()*gradients.length);

document.body.style.background=

gradients[random];

document.body.style.backgroundSize="400% 400%";

}

// ===============================
// Fade Animation
// ===============================

function animateQuote(){

const card=document.getElementById("quoteCard");

card.style.opacity="0";

card.style.transform="translateY(20px)";

setTimeout(()=>{

card.style.opacity="1";

card.style.transform="translateY(0px)";

},250);

}

// ===============================
// Refresh UI
// ===============================

function refreshUI(){

changeBackground();

animateQuote();

updateStats();

}

// ===============================
// Initialize Theme
// ===============================

loadTheme();
// ===============================
// Quote of the Day
// ===============================

function saveQuoteOfTheDay(){

const today = new Date().toDateString();

localStorage.setItem("quoteDate", today);

localStorage.setItem("todayQuote", JSON.stringify(currentQuote));

}

function loadQuoteOfTheDay(){

const today = new Date().toDateString();

const savedDate = localStorage.getItem("quoteDate");

if(savedDate===today){

const savedQuote = JSON.parse(localStorage.getItem("todayQuote"));

if(savedQuote){

currentQuote = savedQuote;

displayQuote();

return true;

}

}

return false;

}

// ===============================
// Daily Reading Streak
// ===============================

function updateReadingStreak(){

const today = new Date().toDateString();

const lastVisit = localStorage.getItem("lastVisit");

let streak = parseInt(localStorage.getItem("streak")) || 0;

if(lastVisit!==today){

streak++;

localStorage.setItem("streak",streak);

localStorage.setItem("lastVisit",today);

}

console.log("🔥 Reading Streak:",streak,"days");

}

// ===============================
// Browser Notifications
// ===============================

function requestNotificationPermission(){

if("Notification" in window){

if(Notification.permission==="default"){

Notification.requestPermission();

}

}

}

function showNotification(){

if("Notification" in window && Notification.permission==="granted"){

new Notification("📖 QuoteVerse Pro",{

body:"Your daily inspiration is ready!",

icon:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

});

}

}

// ===============================
// Auto Notification
// ===============================

function dailyReminder(){

setTimeout(()=>{

showNotification();

},5000);

}

// ===============================
// Advanced Statistics
// ===============================

function saveStatistics(){

localStorage.setItem("quotesViewed",quotesViewed);

localStorage.setItem("favorites",JSON.stringify(favorites));

}

function loadStatistics(){

quotesViewed =

parseInt(localStorage.getItem("quotesViewed")) || 0;

favorites =

JSON.parse(localStorage.getItem("favorites")) || [];

updateStats();

}
// ===============================
// QuoteVerse Pro v4.0
// Part 8 - App Initialization
// ===============================

function initializeApp(){

loadTheme();

loadStatistics();

loadTodayChallenge();

updateReadingStreak();

requestNotificationPermission();

if(!loadQuoteOfTheDay()){

fetchQuote();

}

updateStats();

refreshUI();

startAutoRefresh();

}

// ===============================
// App Started
// ===============================

window.onload=()=>{

initializeApp();

};

// ===============================
// Refresh Background Every Minute
// ===============================

setInterval(()=>{

changeBackground();

},60000);

// ===============================
// Refresh Statistics
// ===============================

setInterval(()=>{

updateStats();

},5000);

// ===============================
// Save Data Before Closing
// ===============================

window.addEventListener("beforeunload",()=>{

saveStatistics();

});

// ===============================
// Keyboard Shortcuts
// ===============================

document.addEventListener("keydown",(event)=>{

switch(event.key){

case "ArrowRight":

newQuote();

break;

case "c":

copyQuote();

break;

case "s":

shareQuote();

break;

case "f":

favoriteQuote();

break;

case "d":

toggleTheme();

break;

}

});

// ===============================
// Welcome Message
// ===============================

console.log("===================================");

console.log("📖 QuoteVerse Pro v4.0");

console.log("Developed by Mohammad Shahnawaz Faiyaz");

console.log("Live Quotes Enabled");

console.log("Daily Challenge Enabled");

console.log("Speech Enabled");

console.log("Dark Mode Enabled");

console.log("Statistics Enabled");

console.log("Favorites Enabled");

console.log("===================================");

alert("🎉 Welcome to QuoteVerse Pro v4.0!");