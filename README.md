# **Financee** 


---
## **Overview**
---

Financee is a webapp built on the basis of a [Django](https://www.djangoproject.com/) backend and a [ReactJS](https://reactjs.org/) frontend. 
<br> It is a great tool made for traders and investors who strive for efficient risk and trade management. Additionally, its other features that will greatly help traders and investors in their hunt for new trade opportunities. 

All of the stock information comes from two external APIs, [twelvedata](https://twelvedata.com/) and [marketstack](https://marketstack.com/).

### Helpful Backend Packages
* `djangorestframework` : Simplified the process of making a REST API.
* `django-rest-auth` : For setting up registration/login/logout API endpoints for User Authentication
* `django-allauth` : Configuring authentication to use username instead of email. 


### Helpful Frontend Libraries
* `redux` : Used in managing authentication state
* `react-router-dom` : Creating routes for navigation through the app.
* `styled-components` : For easy CSS styling of react components
* `chart.js` : Creating minimalistic stock charts

<br>

![Home](https://i.imgur.com/uP38aeT.png?2)

---
## **Features**
---
<!-- * [Trade Calculator](#1.-Trade-Calculator)
* [Tradebills](#2.-Tradebills) -->

## **1. Trade Calculator**
The trade calculator, in short, allows a trader to input some properties and get the maximum amount of shares they can buy of a specific stock. The properties from which this number is derived from include:
* Stock symbol
* Risk percentage
* Total Capital
* Stop Loss

Some fields are not editable as they are dynamically filled when the editable fields are changed. This is easily done with state in reactjs.
* Total risk field is calculated and filled based on Total capital and Risk %
* Share price field is filled when the user selects a stock symbol (Real time price)

<br>

![Trade Calculator](https://i.imgur.com/r9FfcBl.png?1 "Trade Calculator")

<br>

---
## **2. Tradebills**

Inspired by Alexander Elder's Tradebill showcased in his book, The New Trading for a Living. The tradebill concept provides traders with a way to make their trades more objective rather than emotional. It makes sure that you focus on the most important aspects about a trade.

It consists of three sections:
* First section gives your trade a score based on 5 properties related to the stock. A trade with a score lower than 7 is considered a bad one and shouldn't be acted upon
* Second section involves information about the trade itself and risk control, so things like the stock symbol, the dollar risk, size, etc. Some of the fields are not editable as they're dynamically changed such as the stop loss and entry price.
* Third section involves more details about the trade, specfically breakevens, stop losess, A-target.

Not only do tradebills eliminate emotional trading but they also make the process of choosing trades way more efficient as you can quickly decide to abandon a trade after seeing its score in the first section. 

<br>

![Tradebills](https://i.imgur.com/JBTyyp3.png?1 "Tradebills")

<br>

---

## **3. Notes**

Traders like to keep notes to keep track of certain movements and opportunities that they predict will come up in the future. 

Minimalistic notes UI with just title and content.

<br>

![Notes](https://i.imgur.com/D6XSBru.png "Notes")

<br>

---

## **4. Stock Lookup**

Using End-of-Day stock chart data from [marketstack's API](https://marketstack.com/documentation) and [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2), a chart building javascript framework integrated in react, I was able to build a simple stock lookup page where you can quickly search for a ticker symbol and get the last 100 days worth of price data.

For registered and logged in users, you are also able to add the ticker that to your Watchlist. 

**Developer's Note:** I would definitely want to improve on the chart's functionality in the future however I chose to go with this one as I think it's quite easy to understand and does a great job for a "quick stock lookup" which was the aim. Not a full blown charting setup.

<br>

![Stock Lookup](https://i.imgur.com/fFhvPFL.png "Stock Lookup")

<br>

---

## **5. Watchlist**

Last but not least, the Watchlist is where all your ticker symbols of choice are saved for future lookups instead of having to search for them repeatedly in the Stock Lookup section.

Watchlists are a common thing amongst any stock related web app, they help traders keep an eye on the most important tickers for them. 


<br>

![Watchlist](https://i.imgur.com/y7sJRl0.png "Watchlist")

<br>

---

<br>


## **What makes this project more complex than the others?**

This project has challenged me in ways that no other project in this course has done. Forcing me to dive more into Django and Reactjs to achieve the things I needed. Some of the noteable obstacles that I had to go over in this project are:

* Converting [undraw](https://undraw.co/illustrations) SVGs to Reactjs components to be used as neat illustrations for things like 404 Errors, etc.
* Dynamically produce field in one of my django models using properties 
* Creating custom django Charfield that always capitalizes input
* Not using any CSS frameworks for any major elements in my app. 
* Dealing with full Mobile Responsiveness

<br> 

---

<br>

## **Things to work on**

I'm proud of and satisfied with what this project has turned out to be however there's definitely some things that need some tweaking and advancement if I were to persue this as a serious project and think about deploying. I did not see them as serious enough for now. These include:
* Upgrading the APIs used so that the call limit isnt as low as it is currently (8 calls per minute)
* Improving the responsiveness of the stock charts as the charts are currently smaller than what a user would prefer them to be on smaller screen sizes
* Expanding the pool of stocks that can be selected fromas it's currently limited to 3 major exchanges. 
* Improving the autocomplete stock symbol search field as the options can be a bit buggy in certain cases. 

<br>

---

<br>

## **How to run**


### 1. Clone this repo or just download the code ZIP file.

<br>

### 2. Initialize a virtual environment and activate it (optional)
```
python -m venv financee-venv 
financee-venv\Scripts\activate.bat
```
<br>


### 3. Download all packages from requirements.txt
```
pip install -r requirements.txt
```

<br>


### 4. Sign in to [twelvedata](https://twelvedata.com/) and [marketstack](https://marketstack.com/signup/free) to acquire API keys.

<br>


### 5. Open the `.env` file in `frontend\financee-app` and replace  `YOUR_TWELVEDATA_KEY` and `YOUR_MARKETSTACK_KEY` with your respective API keys.

<br>


### 6. Run the django server
```
cd backend
python manage.py runserver
```

<br>


### 7. Open second terminal in root and run this to activate venv and then install node packages
```
financee-venv\Scripts\activate.bat 
cd frontend\financee-app
npm install
```

### 8. Run react app
```
npm start
```

### 9. Open the url specified and Enjoy!

<br>

---
<style>
table {
    width:100%;
    border-collapse: collapse;
    border: solid grey 1px;
    
}

th {
    text-align: center
}


td {
    width:50%;
    border: solid grey 1px;
}

th {
    border: none;
}

</style>

## **File Analysis**

<br> 

| File/Directory                                     | Description                                                                                                                                           |
|----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `./requirements.txt`                               | Contains a list of python packages used                                                                                                               |
| `./backend/api`                                    | Folder containing all files for setting up my REST API django app                                                                                     |
| `./backend/api/models.py`                          | Models associated with my API                                                                                                                         |
| `./backend/api/serializers.py`                     | Serializer methods for my models                                                                                                                      |
| `./backend/api/views.py`                           | All of the API endpoints                                                                                                                              |
| `./frontend/financee-app`                          | Folder that holds everything related to the React app                                                                                                 |
| `./frontend/financee-app/package.json`             | Holds information about all the additional node dependencies used and other react info                                                                |
| `./frontend/financee-app/index.js`                 | Main file where app is run from, redux store created, etc.                                                                                            |
| `./frontend/financee-app/src/components`           | Contains all of the react components                                                                                                                  |
| `./frontend/financee-app/src/components/styles`    | Contains files, each for styling specific components                                                                                                  |
| `./frontend/financee-app/src/redux`                | Has all the actions and reducer functions needed to manage authentication states                                                                      |
| `./frontend/financee-app/src/middlemen/imports.js` | A place for exporting all my components so they can all be imported from one file                                                                     |
| `./frontend/financee-app/src/middlemen/Routes.js`  | For creating all the routes for the app. Also contains some state logic which is needed to be passed in to some of the the route components as props. |




