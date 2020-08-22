const quoteContainer=document.getElementById('quote_container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new_quote');
const loader = document.getElementById('loader');


function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false; 
        loader.hidden = true;
    }
}

// Get Quote from API
async function getQuote(){
    // showLoadingSpinner()
    // We need to use a proxy url to make our API call in order to avoid CORS
    const proxyUrl='https://cors-anywhere.herokuapp.com/'
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const response= await fetch (proxyUrl + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor === ''){
            authorText.innerHTML ='Unknown' 
        }else{
            authorText.innerHTML = data.quoteAuthor;
        }
        // Reduce font size for long quote;
        if(data.quoteText.legth > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote'); 
        }
        quoteText.innerHTML=data.quoteText;

        console.log(data);
        // Stop Loader and show the quote
        // removeLoadingSpinner();
    }catch(error){
        getQuote();
        console.log('whoops,no quote',error);
    }
}

// Tweet Quote
function tweetQuote(){
    const quote=quoteText.innerHTML;
    const author=authorText.innerHTML;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);
// On  Load
getQuote();
