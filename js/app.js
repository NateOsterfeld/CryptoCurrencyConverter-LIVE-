// Instantiate the classes

const cryptoAPI = new CryptoAPI();
const ui = new UI();

//Create variables

const form = document.getElementById('form');


//Add event listener
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //read currency
    const currencySelect = document.getElementById('currency').value;
    //read cryptocurrency
    const cryptoCurrencySelect = document.getElementById('cryptocurrency').value;

    //Validate that the selects have values
    if(currencySelect === '' || cryptoCurrencySelect === ''){
        //displays error message
        ui.printMessage('All the fields are mandatory', 'deep-orange center darken-4 card panel');
    }
    else{
        //Query the REST API
        cryptoAPI.queryAPI(currencySelect, cryptoCurrencySelect)
            .then(data => {
                ui.displayResult(data.result[0], currencySelect );
            })
    }

})
