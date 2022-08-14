const dropList = document.querySelectorAll(".drop-list select");
fromCurrency = document.querySelector(".from select");
tocurrency = document.querySelector(".to select");
getButton = document.querySelector("form button");
const apikey = `78076fbde6ded74c073875af`;
for(let i =0; i< dropList.length; i++)
{
    for(currency_code in country_code)
    {
        //making default selection
        let selected;
        if(i == 0)
        {
            selected = currency_code == "USD" ? "selected" :"";
        }
        else if(i == 1)
        {
            selected = currency_code == "NGN" ? "selected" :"";
        }

       //Creating Option tag with passing currency code as text and value
       let optionTag = `<option value = "${currency_code}" ${selected} >${currency_code}</option>`;
       dropList[i].insertAdjacentHTML("beforeend",optionTag);
    }
    dropList[i].addEventListener("change", e =>{

        loadFlag(e.target); //calling loadflag with passing target element as an argument
    });
}
function loadFlag(element)
{
    for(code in country_code)
    {
        //if country doe of country list is equal to option value
        if(code == element.value)
        {
            let imgtag = element.parentElement.querySelector("img"); 
            //selecting img tag of the particular droplist
            imgtag.src = `https://countryflagsapi.com/png/${country_code[code]}`;
            //passing country code of a selected currency code in a img url
        }
    }
}
window.addEventListener("load",() =>{
   
    FlagCallii();
    getExchangeRate();
});

getButton.addEventListener("click",e =>{

    e.preventDefault(); // prevent form from submitting
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", ()=>{

    FlagCall();
    getExchangeRate();
});

function FlagCallii()
{
    loadFlag(fromCurrency);
    loadFlag(tocurrency);
}
function FlagCall()
{
    let tempCode = fromCurrency.value; //temporary currency copde of FROM drop list
    fromCurrency.value = tocurrency.value; // passing TO currency code to FROM currency code
    tocurrency.value =tempCode; // passing temporary currency code to TO currency code
    loadFlag(fromCurrency);
    loadFlag(tocurrency);
}
function getExchangeRate()
{
    const amount = document.querySelector(".amount input");
    const exchangeRateTxt =  document.querySelector(".exchange-rate");
    let amountVal = amount.value;

    //if user doesnt enter a value will put 1 value in the default

    if(amountVal == "" || amountVal == "0")
    {
        amount.value = "1";
        amountVal =1;
    }

    exchangeRateTxt.innerText = "Getting exchange-rate...";
    let url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then (result => 
        {
            let exchangerate = result.conversion_rates[tocurrency.value];
            console.log(exchangerate);
            let totalExchangeRate = (amountVal * exchangerate).toFixed(2);
            
          
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${tocurrency.value}`;

        }).catch(() =>{
            exchangeRateTxt.innerText ="Something went wrong";
        } )
}