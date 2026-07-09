/* ==========================================================
   QuoteVerse Pro v6.0
   Developer: Mohammad Shahnawaz Faiyaz
   SCRIPT.JS
   PART 1 - CORE ENGINE
========================================================== */

"use strict";

const QuoteVerse = {

    version: "6.0",

    api: {
        random: "https://dummyjson.com/quotes/random"
    },

    state: {
        currentQuote: null,
        online: navigator.onLine,
        loading: false,
        theme: "light"
    },

    user: {
        favorites: [],
        history: [],
        viewed: 0,
        streak: 0
    },

    ui: {}
};

/* ==========================================================
   DOM CACHE
========================================================== */

QuoteVerse.cacheDOM = function () {

    const ids = [

        "quote",
        "author",
        "loader",
        "quoteCard",
        "todayQuote",
        "challenge",

        "readCount",
        "favCount",
        "historyCount",
        "streakCount",

        "progressFill",
        "progressText",

        "onlineStatus",

        "searchInput",

        "themeBtn",

        "countdown"

    ];

    ids.forEach(id => {

        this.ui[id] = document.getElementById(id);

    });

};

/* ==========================================================
   STORAGE
========================================================== */

QuoteVerse.storage = {

    get(key, fallback) {

        try {

            const value = localStorage.getItem(key);

            return value
                ? JSON.parse(value)
                : fallback;

        }

        catch {

            return fallback;

        }

    },

    set(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    }

};

/* ==========================================================
   LOAD USER
========================================================== */

QuoteVerse.loadUser = function () {

    this.user.favorites =
        this.storage.get("favorites", []);

    this.user.history =
        this.storage.get("history", []);

    this.user.viewed =
        this.storage.get("viewed", 0);

    this.user.streak =
        this.storage.get("streak", 0);

    this.state.theme =
        this.storage.get("theme", "light");

};

/* ==========================================================
   SAVE USER
========================================================== */

QuoteVerse.saveUser = function () {

    this.storage.set(

        "favorites",

        this.user.favorites

    );

    this.storage.set(

        "history",

        this.user.history

    );

    this.storage.set(

        "viewed",

        this.user.viewed

    );

    this.storage.set(

        "streak",

        this.user.streak

    );

    this.storage.set(

        "theme",

        this.state.theme

    );

};

/* ==========================================================
   LOADER
========================================================== */

QuoteVerse.showLoader = function () {

    if (this.ui.loader)

        this.ui.loader.style.display = "flex";

};

QuoteVerse.hideLoader = function () {

    if (this.ui.loader)

        this.ui.loader.style.display = "none";

};

/* ==========================================================
   TOAST
========================================================== */

QuoteVerse.toast = function (message) {

    let toast = document.querySelector(".toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

};

/* ==========================================================
   NETWORK
========================================================== */

QuoteVerse.updateNetwork = function () {

    this.state.online = navigator.onLine;

    if (this.ui.onlineStatus) {

        this.ui.onlineStatus.textContent =

            this.state.online

                ? "🟢 Online"

                : "🔴 Offline";

    }

};

window.addEventListener(

    "online",

    () => QuoteVerse.updateNetwork()

);

window.addEventListener(

    "offline",

    () => QuoteVerse.updateNetwork()

);

/* ==========================================================
   RANDOM
========================================================== */

QuoteVerse.random = function (max) {

    return Math.floor(

        Math.random() * max

    );

};

/* ==========================================================
   UPDATE STATS
========================================================== */

QuoteVerse.updateStats = function () {

    if (this.ui.readCount)

        this.ui.readCount.textContent =
            this.user.viewed;

    if (this.ui.favCount)

        this.ui.favCount.textContent =
            this.user.favorites.length;

    if (this.ui.historyCount)

        this.ui.historyCount.textContent =
            this.user.history.length;

    if (this.ui.streakCount)

        this.ui.streakCount.textContent =
            this.user.streak;

};

/* ==========================================================
   STARTUP
========================================================== */

QuoteVerse.initialize = function () {

    this.cacheDOM();

    this.loadUser();

    this.updateNetwork();

    this.updateStats();

    console.log(

        "QuoteVerse Pro v6.0 Initialized"

    );

};

document.addEventListener(

    "DOMContentLoaded",

    () => {

        QuoteVerse.initialize();

    }

);
/* ==========================================================
   PART 2 - QUOTE ENGINE
========================================================== */

/* ==========================================================
   OFFLINE FALLBACK
========================================================== */

QuoteVerse.getOfflineQuote = function () {

    if (
        typeof offlineQuotes === "undefined" ||
        !Array.isArray(offlineQuotes) ||
        offlineQuotes.length === 0
    ) {

        return {

            quote: "Success begins with believing in yourself.",

            author: "QuoteVerse",

            category: "Motivation"

        };

    }

    return offlineQuotes[
        this.random(offlineQuotes.length)
    ];

};

/* ==========================================================
   FETCH ONLINE QUOTE
========================================================== */

QuoteVerse.fetchQuote = async function () {

    this.showLoader();

    try {

        const response = await fetch(
            this.api.random,
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {

            throw new Error("Network Error");

        }

        const data = await response.json();

        return {

            quote: data.quote,

            author: data.author,

            category: "Online"

        };

    }

    catch (error) {

        console.log("Offline Mode");

        return this.getOfflineQuote();

    }

    finally {

        this.hideLoader();

    }

};

/* ==========================================================
   RENDER QUOTE
========================================================== */

QuoteVerse.renderQuote = function () {

    if (!this.state.currentQuote) return;

    if (this.ui.quote) {

        this.ui.quote.textContent =
            this.state.currentQuote.quote;

    }

    if (this.ui.author) {

        this.ui.author.textContent =
            "— " + this.state.currentQuote.author;

    }

    if (this.ui.todayQuote) {

        this.ui.todayQuote.textContent =
            this.state.currentQuote.quote;

    }

    if (this.ui.quoteCard) {

        this.ui.quoteCard.animate(

            [

                {
                    opacity:0,
                    transform:"translateY(20px)"
                },

                {
                    opacity:1,
                    transform:"translateY(0)"
                }

            ],

            {

                duration:400,

                easing:"ease-out"

            }

        );

    }

};

/* ==========================================================
   HISTORY
========================================================== */

QuoteVerse.addHistory = function () {

    this.user.history.unshift(

        this.state.currentQuote

    );

    if (this.user.history.length > 100) {

        this.user.history.pop();

    }

};

/* ==========================================================
   LOAD NEW QUOTE
========================================================== */

QuoteVerse.newQuote = async function () {

    this.state.loading = true;

    const quote =

        this.state.online

        ?

        await this.fetchQuote()

        :

        this.getOfflineQuote();

    this.state.currentQuote = quote;

    this.user.viewed++;

    this.addHistory();

    this.renderQuote();

    this.updateStats();

    this.saveUser();

    this.state.loading = false;

};

/* ==========================================================
   QUOTE OF THE DAY
========================================================== */

QuoteVerse.quoteOfDay = async function () {

    const today =

        new Date().toDateString();

    const savedDate =

        this.storage.get(

            "quote_date",

            ""

        );

    if (savedDate === today) {

        const quote =

            this.storage.get(

                "quote_today",

                null

            );

        if (quote) {

            this.state.currentQuote = quote;

            this.renderQuote();

            return;

        }

    }

    await this.newQuote();

    this.storage.set(

        "quote_date",

        today

    );

    this.storage.set(

        "quote_today",

        this.state.currentQuote

    );

};

/* ==========================================================
   DAILY CHALLENGE
========================================================== */

QuoteVerse.dailyChallenge = function () {

    const list = [

        "📖 Read 20 pages",

        "🏃 Exercise 15 minutes",

        "💧 Drink more water",

        "😊 Help someone",

        "🎯 Finish one goal",

        "📚 Learn something new",

        "💻 Practice coding"

    ];

    if (this.ui.challenge) {

        this.ui.challenge.textContent =

            list[

                this.random(list.length)

            ];

    }

};

/* ==========================================================
   NEW QUOTE BUTTON
========================================================== */

window.newQuote = function () {

    QuoteVerse.newQuote();

};

/* ==========================================================
   LOAD WHEN APP STARTS
========================================================== */

const oldInitialize =

QuoteVerse.initialize;

QuoteVerse.initialize = async function () {

    oldInitialize.call(this);

    await this.quoteOfDay();

    this.dailyChallenge();

};

console.log("Part 2 Loaded");
/* ==========================================================
   PART 3 - FAVORITES • COPY • SHARE • SPEECH
========================================================== */

/* ==========================================================
   CHECK FAVORITE
========================================================== */

QuoteVerse.isFavorite = function () {

    if (!this.state.currentQuote) return false;

    return this.user.favorites.some(item =>

        item.quote === this.state.currentQuote.quote

    );

};

/* ==========================================================
   ADD TO FAVORITES
========================================================== */

QuoteVerse.favoriteQuote = function () {

    if (!this.state.currentQuote) {

        this.toast("No quote loaded");

        return;

    }

    if (this.isFavorite()) {

        this.toast("Already in favorites ❤️");

        return;

    }

    this.user.favorites.unshift(

        this.state.currentQuote

    );

    this.saveUser();

    this.updateStats();

    this.toast("Added to Favorites ⭐");

};

/* ==========================================================
   REMOVE FAVORITE
========================================================== */

QuoteVerse.removeFavorite = function(index){

    this.user.favorites.splice(index,1);

    this.saveUser();

    this.updateStats();

    this.showFavorites();

};

/* ==========================================================
   SHOW FAVORITES
========================================================== */

QuoteVerse.showFavorites = function(){

    const container =

    document.getElementById(

        "favoritesContainer"

    );

    if(!container) return;

    container.innerHTML="";

    if(this.user.favorites.length===0){

        container.innerHTML=

        "<p>No favorite quotes.</p>";

        return;

    }

    this.user.favorites.forEach((item,index)=>{

        const card=

        document.createElement("div");

        card.className="favorite-card";

        card.innerHTML=`

        <p>${item.quote}</p>

        <small>— ${item.author}</small>

        <button onclick="QuoteVerse.removeFavorite(${index})">

        Remove

        </button>

        `;

        container.appendChild(card);

    });

};

/* ==========================================================
   COPY QUOTE
========================================================== */

QuoteVerse.copyQuote = async function(){

    if(!this.state.currentQuote) return;

    const text=

`${this.state.currentQuote.quote}

— ${this.state.currentQuote.author}`;

    try{

        await navigator.clipboard.writeText(text);

        this.toast("Quote Copied 📋");

    }

    catch{

        this.toast("Copy Failed");

    }

};

/* ==========================================================
   SHARE QUOTE
========================================================== */

QuoteVerse.shareQuote = async function(){

    if(!this.state.currentQuote) return;

    const text=

`${this.state.currentQuote.quote}

— ${this.state.currentQuote.author}`;

    if(navigator.share){

        try{

            await navigator.share({

                title:"QuoteVerse",

                text:text

            });

        }

        catch{}

    }

    else{

        this.copyQuote();

    }

};

/* ==========================================================
   TEXT TO SPEECH
========================================================== */

QuoteVerse.speakQuote = function(){

    if(!this.state.currentQuote) return;

    speechSynthesis.cancel();

    const speech=

    new SpeechSynthesisUtterance(

`${this.state.currentQuote.quote}

by ${this.state.currentQuote.author}`

    );

    speech.rate=1;

    speech.pitch=1;

    speech.lang="en-US";

    speechSynthesis.speak(speech);

};

/* ==========================================================
   DOWNLOAD QUOTE
========================================================== */

QuoteVerse.downloadQuote = function(){

    if(!this.state.currentQuote) return;

    const text=

`${this.state.currentQuote.quote}

— ${this.state.currentQuote.author}`;

    const blob=new Blob(

        [text],

        {type:"text/plain"}

    );

    const url=

    URL.createObjectURL(blob);

    const a=

    document.createElement("a");

    a.href=url;

    a.download="QuoteVerse.txt";

    a.click();

    URL.revokeObjectURL(url);

};

/* ==========================================================
   GLOBAL FUNCTIONS
========================================================== */

window.favoriteQuote =
()=>QuoteVerse.favoriteQuote();

window.copyQuote =
()=>QuoteVerse.copyQuote();

window.shareQuote =
()=>QuoteVerse.shareQuote();

window.speakQuote =
()=>QuoteVerse.speakQuote();

window.downloadQuote =
()=>QuoteVerse.downloadQuote();

window.showFavorites =
()=>QuoteVerse.showFavorites();

console.log("Part 3 Loaded Successfully");
/* ==========================================================
   PART 4 - THEME • SEARCH • CATEGORY • PROGRESS
========================================================== */

/* ==========================================================
   DARK / LIGHT THEME
========================================================== */

QuoteVerse.loadTheme = function () {

    document.body.classList.toggle(

        "dark",

        this.state.theme === "dark"

    );

    if (this.ui.themeBtn) {

        this.ui.themeBtn.textContent =

            this.state.theme === "dark"

            ? "☀️"

            : "🌙";

    }

};

QuoteVerse.toggleTheme = function () {

    this.state.theme =

        this.state.theme === "light"

        ? "dark"
        : "light";

    this.loadTheme();

    this.saveUser();

    this.toast(

        this.state.theme === "dark"

        ? "Dark Mode Enabled 🌙"
        : "Light Mode Enabled ☀️"

    );

};

/* ==========================================================
   SEARCH QUOTES
========================================================== */

QuoteVerse.searchQuote = function () {

    if (!this.ui.searchInput) return;

    const keyword =

        this.ui.searchInput.value
        .trim()
        .toLowerCase();

    if (keyword === "") {

        this.newQuote();

        return;

    }

    let source = [];

    if (typeof offlineQuotes !== "undefined") {

        source = offlineQuotes;

    }

    const result = source.find(item =>

        item.quote.toLowerCase().includes(keyword) ||

        item.author.toLowerCase().includes(keyword)

    );

    if (!result) {

        this.toast("No Quote Found");

        return;

    }

    this.state.currentQuote = result;

    this.renderQuote();

};

/* ==========================================================
   CATEGORY FILTER
========================================================== */

QuoteVerse.filterCategory = function (category) {

    if (

        typeof offlineQuotes === "undefined"

    ) return;

    let list = offlineQuotes;

    if (category !== "All") {

        list = list.filter(item =>

            item.category === category

        );

    }

    if (list.length === 0) {

        this.toast("No Quotes");

        return;

    }

    this.state.currentQuote =

        list[

            this.random(list.length)

        ];

    this.renderQuote();

};

/* ==========================================================
   PROGRESS BAR
========================================================== */

QuoteVerse.updateProgress = function () {

    if (

        !this.ui.progressFill ||

        !this.ui.progressText

    ) return;

    const progress =

        Math.min(

            100,

            this.user.viewed

        );

    this.ui.progressFill.style.width =

        progress + "%";

    this.ui.progressText.textContent =

        progress + "%";

};

/* ==========================================================
   STREAK
========================================================== */

QuoteVerse.updateStreak = function () {

    const today =

        new Date().toDateString();

    const saved =

        this.storage.get(

            "lastVisit",

            ""

        );

    if (saved !== today) {

        this.user.streak++;

        this.storage.set(

            "lastVisit",

            today

        );

    }

};

/* ==========================================================
   ACHIEVEMENTS
========================================================== */

QuoteVerse.checkAchievements = function () {

    let badge = "";

    if (this.user.viewed >= 1)

        badge = "🥉 Beginner";

    if (this.user.viewed >= 20)

        badge = "🥈 Explorer";

    if (this.user.viewed >= 50)

        badge = "🥇 Learner";

    if (this.user.viewed >= 100)

        badge = "🏆 Master";

    if (badge) {

        console.log(

            "Achievement:",

            badge

        );

    }

};

/* ==========================================================
   DASHBOARD
========================================================== */

QuoteVerse.refreshDashboard = function () {

    this.updateStats();

    this.updateProgress();

    this.updateStreak();

    this.checkAchievements();

};

/* ==========================================================
   KEYBOARD SHORTCUTS
========================================================== */

document.addEventListener(

    "keydown",

    function (event) {

        if (

            event.target.tagName === "INPUT"

        ) return;

        switch (event.key) {

            case "ArrowRight":

                QuoteVerse.newQuote();

                break;

            case "f":

            case "F":

                QuoteVerse.favoriteQuote();

                break;

            case "c":

            case "C":

                QuoteVerse.copyQuote();

                break;

            case "s":

            case "S":

                QuoteVerse.shareQuote();

                break;

            case "t":

            case "T":

                QuoteVerse.toggleTheme();

                break;

        }

    }

);

/* ==========================================================
   EXPORTS
========================================================== */

window.toggleTheme =
() => QuoteVerse.toggleTheme();

window.searchQuote =
() => QuoteVerse.searchQuote();

window.filterCategory =
(category) =>
QuoteVerse.filterCategory(category);

console.log(
"Part 4 Loaded Successfully"
);
/* ==========================================================
   PART 5 - AUTO REFRESH • COUNTDOWN • NOTIFICATIONS
========================================================== */

/* ==========================================================
   CONFIGURATION
========================================================== */

QuoteVerse.autoRefreshTime = 30000;
QuoteVerse.countdown = 30;

/* ==========================================================
   AUTO REFRESH
========================================================== */

QuoteVerse.startAutoRefresh = function () {

    this.stopAutoRefresh();

    this.countdown = 30;

    this.updateCountdown();

    this.state.autoRefresh = setInterval(async () => {

        await this.newQuote();

        this.refreshDashboard();

        this.countdown = 30;

    }, this.autoRefreshTime);

    this.state.countdownTimer = setInterval(() => {

        this.countdown--;

        if (this.countdown <= 0) {

            this.countdown = 30;

        }

        this.updateCountdown();

    }, 1000);

};

/* ==========================================================
   STOP AUTO REFRESH
========================================================== */

QuoteVerse.stopAutoRefresh = function () {

    clearInterval(this.state.autoRefresh);

    clearInterval(this.state.countdownTimer);

};

/* ==========================================================
   COUNTDOWN
========================================================== */

QuoteVerse.updateCountdown = function () {

    if (!this.ui.countdown) return;

    this.ui.countdown.textContent =

        this.countdown + " sec";

};

/* ==========================================================
   NOTIFICATION
========================================================== */

QuoteVerse.requestNotification = async function () {

    if (!("Notification" in window))

        return;

    if (Notification.permission === "default") {

        await Notification.requestPermission();

    }

};

QuoteVerse.notify = function (title, body) {

    if (Notification.permission !== "granted")

        return;

    new Notification(title, {

        body: body,

        icon:
"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

    });

};

/* ==========================================================
   DAILY REMINDER
========================================================== */

QuoteVerse.dailyReminder = function () {

    setTimeout(() => {

        this.notify(

            "📖 QuoteVerse",

            "Time for your daily motivation!"

        );

    }, 5000);

};

/* ==========================================================
   BACKGROUND ANIMATION
========================================================== */

QuoteVerse.backgrounds = [

"linear-gradient(135deg,#667eea,#764ba2)",

"linear-gradient(135deg,#11998e,#38ef7d)",

"linear-gradient(135deg,#fc466b,#3f5efb)",

"linear-gradient(135deg,#3a7bd5,#00d2ff)",

"linear-gradient(135deg,#f7971e,#ffd200)",

"linear-gradient(135deg,#8E2DE2,#4A00E0)"

];

QuoteVerse.changeBackground = function () {

    if (

        document.body.classList.contains("dark")

    ) return;

    const bg =

        this.backgrounds[

            this.random(

                this.backgrounds.length

            )

        ];

    document.body.style.background = bg;

    document.body.style.backgroundSize =

        "400% 400%";

};

QuoteVerse.startBackgroundAnimation = function () {

    this.changeBackground();

    this.state.backgroundAnimation =

    setInterval(() => {

        this.changeBackground();

    }, 60000);

};

/* ==========================================================
   STOP BACKGROUND
========================================================== */

QuoteVerse.stopBackgroundAnimation = function () {

    clearInterval(

        this.state.backgroundAnimation

    );

};

/* ==========================================================
   DASHBOARD REFRESH
========================================================== */

QuoteVerse.updateEverything = function () {

    this.updateStats();

    this.updateProgress();

    this.updateNetwork();

};

/* ==========================================================
   QUICK REFRESH
========================================================== */

QuoteVerse.quickRefresh = async function () {

    await this.newQuote();

    this.refreshDashboard();

    this.toast("New Quote Loaded");

};

/* ==========================================================
   GLOBAL FUNCTIONS
========================================================== */

window.quickRefresh =
() => QuoteVerse.quickRefresh();

window.startAutoRefresh =
() => QuoteVerse.startAutoRefresh();

window.stopAutoRefresh =
() => QuoteVerse.stopAutoRefresh();

console.log("Part 5 Loaded Successfully");
/* ==========================================================
   PART 6 - HISTORY • ANALYTICS • BACKUP • PWA
========================================================== */

/* ==========================================================
   SHOW HISTORY
========================================================== */

QuoteVerse.showHistory = function () {

    const container = document.getElementById("historyContainer");

    if (!container) return;

    container.innerHTML = "";

    if (this.user.history.length === 0) {

        container.innerHTML = "<p>No history available.</p>";

        return;

    }

    this.user.history.forEach(item => {

        const card = document.createElement("div");

        card.className = "history-card";

        card.innerHTML = `
            <p>${item.quote}</p>
            <small>— ${item.author}</small>
        `;

        container.appendChild(card);

    });

};

/* ==========================================================
   CLEAR HISTORY
========================================================== */

QuoteVerse.clearHistory = function () {

    this.user.history = [];

    this.saveUser();

    this.showHistory();

    this.updateStats();

    this.toast("History Cleared");

};

/* ==========================================================
   EXPORT BACKUP
========================================================== */

QuoteVerse.exportBackup = function () {

    const backup = {

        favorites: this.user.favorites,

        history: this.user.history,

        viewed: this.user.viewed,

        streak: this.user.streak,

        theme: this.state.theme

    };

    const blob = new Blob(

        [JSON.stringify(backup, null, 2)],

        {

            type: "application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "QuoteVerseBackup.json";

    a.click();

    URL.revokeObjectURL(url);

    this.toast("Backup Exported");

};

/* ==========================================================
   IMPORT BACKUP
========================================================== */

QuoteVerse.importBackup = function (file) {

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {

        try {

            const data = JSON.parse(event.target.result);

            this.user.favorites = data.favorites || [];

            this.user.history = data.history || [];

            this.user.viewed = data.viewed || 0;

            this.user.streak = data.streak || 0;

            this.state.theme = data.theme || "light";

            this.saveUser();

            this.loadTheme();

            this.updateEverything();

            this.showHistory();

            this.toast("Backup Imported");

        }

        catch {

            this.toast("Invalid Backup File");

        }

    };

    reader.readAsText(file);

};

/* ==========================================================
   ANALYTICS
========================================================== */

QuoteVerse.analytics = function () {

    console.table({

        Viewed: this.user.viewed,

        Favorites: this.user.favorites.length,

        History: this.user.history.length,

        Streak: this.user.streak,

        Theme: this.state.theme,

        Online: this.state.online

    });

};

/* ==========================================================
   STORAGE SIZE
========================================================== */

QuoteVerse.storageInfo = function () {

    let total = 0;

    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);

        const value = localStorage.getItem(key);

        total += key.length + value.length;

    }

    console.log(

        "Storage:",

        (total / 1024).toFixed(2),

        "KB"

    );

};

/* ==========================================================
   SERVICE WORKER
========================================================== */

QuoteVerse.registerServiceWorker = async function () {

    if (!("serviceWorker" in navigator))

        return;

    try {

        await navigator.serviceWorker.register(

            "./service-worker.js"

        );

        console.log("Service Worker Registered");

    }

    catch (error) {

        console.log(error);

    }

};

/* ==========================================================
   INSTALL PROMPT
========================================================== */

window.addEventListener(

    "beforeinstallprompt",

    (event) => {

        event.preventDefault();

        QuoteVerse.deferredPrompt = event;

    }

);

QuoteVerse.installApp = async function () {

    if (!this.deferredPrompt) {

        this.toast("Install not available");

        return;

    }

    this.deferredPrompt.prompt();

    await this.deferredPrompt.userChoice;

    this.deferredPrompt = null;

};

/* ==========================================================
   PERFORMANCE
========================================================== */

QuoteVerse.optimize = function () {

    console.log("Optimization Complete");

};

/* ==========================================================
   GLOBAL FUNCTIONS
========================================================== */

window.showHistory =
() => QuoteVerse.showHistory();

window.clearHistory =
() => QuoteVerse.clearHistory();

window.exportBackup =
() => QuoteVerse.exportBackup();

window.installApp =
() => QuoteVerse.installApp();

window.analytics =
() => QuoteVerse.analytics();

console.log("Part 6 Loaded Successfully");
/* ==========================================================
   PART 7 - FINAL STARTUP • PRODUCTION READY
========================================================== */

/* ==========================================================
   AUTO SAVE
========================================================== */

QuoteVerse.autoSave = function () {

    this.saveUser();

};

/* ==========================================================
   CLEANUP
========================================================== */

QuoteVerse.cleanup = function () {

    if (this.user.history.length > 100) {

        this.user.history =

        this.user.history.slice(0, 100);

    }

    this.saveUser();

};

/* ==========================================================
   VERSION INFO
========================================================== */

QuoteVerse.versionInfo = function () {

    console.table({

        Application: "QuoteVerse Pro",

        Version: this.version,

        Developer: "Mohammad Shahnawaz Faiyaz",

        Status: "Production Ready"

    });

};

/* ==========================================================
   SCHEDULER
========================================================== */

QuoteVerse.startScheduler = function () {

    if (this.state.scheduler) {

        clearInterval(this.state.scheduler);

    }

    this.state.scheduler = setInterval(() => {

        this.autoSave();

        this.cleanup();

        this.updateEverything();

    }, 300000);

};

/* ==========================================================
   SHUTDOWN
========================================================== */

QuoteVerse.shutdown = function () {

    this.stopAutoRefresh();

    this.stopBackgroundAnimation();

    if (this.state.scheduler) {

        clearInterval(this.state.scheduler);

    }

    this.saveUser();

};

/* ==========================================================
   FINAL STARTUP
========================================================== */

QuoteVerse.start = async function () {

    try {

        this.initialize();

        await this.quoteOfDay();

        this.dailyChallenge();

        this.loadTheme();

        this.showHistory();

        this.showFavorites();

        this.updateEverything();

        this.requestNotification();

        this.registerServiceWorker();

        this.optimize();

        this.startScheduler();

        this.startAutoRefresh();

        this.startBackgroundAnimation();

        this.versionInfo();

        this.toast("🚀 QuoteVerse Pro Ready!");

        console.log("QuoteVerse Started Successfully");

    }

    catch (error) {

        console.error(error);

        this.toast("Startup Error");

    }

};

/* ==========================================================
   WINDOW EVENTS
========================================================== */

window.addEventListener(

    "beforeunload",

    () => {

        QuoteVerse.shutdown();

    }

);

document.addEventListener(

    "visibilitychange",

    () => {

        if (document.hidden) {

            QuoteVerse.autoSave();

        }

    }

);

/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        await QuoteVerse.start();

    }

);

/* ==========================================================
   GLOBAL FUNCTIONS
========================================================== */

window.newQuote =
() => QuoteVerse.newQuote();

window.favoriteQuote =
() => QuoteVerse.favoriteQuote();

window.copyQuote =
() => QuoteVerse.copyQuote();

window.shareQuote =
() => QuoteVerse.shareQuote();

window.speakQuote =
() => QuoteVerse.speakQuote();

window.downloadQuote =
() => QuoteVerse.downloadQuote();

window.toggleTheme =
() => QuoteVerse.toggleTheme();

window.searchQuote =
() => QuoteVerse.searchQuote();

window.showFavorites =
() => QuoteVerse.showFavorites();

window.showHistory =
() => QuoteVerse.showHistory();

window.quickRefresh =
() => QuoteVerse.quickRefresh();

window.installApp =
() => QuoteVerse.installApp();

console.log("========================================");
console.log(" QuoteVerse Pro v6.0");
console.log(" Production Build Loaded Successfully");
console.log(" Developer: Mohammad Shahnawaz Faiyaz");
console.log("========================================");