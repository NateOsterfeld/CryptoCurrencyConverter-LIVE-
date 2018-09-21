class UI {
    constructor() {
        this.init();
    }
    init(){
        this.printCryptoCurrencies();
        //this.othermethods        
    }
    //Prints <options> for form
    printCryptoCurrencies(){
        cryptoAPI.getCryptoCurrenciesList()
            .then(data => {
                const cryptoCurrencies = data.cryptoCurrencies;

                //build the <select> from the REST API
                const select = document.getElementById('cryptocurrency');

                cryptoCurrencies.forEach(currency => {
                    //add the <option>
                    const option = document.createElement('option');
                    option.value = currency.id;
                    option.appendChild(document.createTextNode
                    (currency.name));
                    select.appendChild(option);
                })
            })
    }

    //Prints a message 2 parameters, message and classes

    printMessage(message, className) {
        const div = document.createElement('div');

        //add the classes
        div.className = className;

        //add the message
        div.appendChild(document.createTextNode(message));

        const messagesDiv = document.querySelector('.messages');

        messagesDiv.appendChild(div);

        //Remove message after 3 seconds
        setTimeout(() => {
            document.querySelector('.messages div').remove();
        }, 3000);
    }

    //Prints the result of the valuation/rate
    displayResult(result, currency) {
        
        console.log(result);
        //Read the currency
        let currencyName;
        currencyName = 'price_' + currency.toLowerCase();
        //Read the result from the object
        const value = result[currencyName];

        //Remove the previous result
        const prevResult = document.querySelector('#result > div');
        if(prevResult) {
            prevResult.remove();
        }

        let HTMLTemplate = '';

        HTMLTemplate += `
            <div class="card cyan darken-3">
                <div class="card-content black-text">
                    <span class="rank card-title"><i class="fa fa-trophy" aria-hidden="true"></i>Ranked: #${result.rank}</i></span>                    
                    <h4>The price of ${result.name} in ${currency} is <h4 class="amount green-text">$${value}</h4></h4>  
                    <p class="percent white-text">Percent Changes:</p>                  
                    <p class="white-text">Last Hour: ${result.percent_change_1h}%</p>
                    <p class="white-text">Last Day: ${result.percent_change_24h}%</p>
                    <p class="white-text">Last Week: ${result.percent_change_7d}%</p>
                </div>
            </div>
        `;

        //Print spinner
        this.showSpinner();

        //After 3 seconds print the result and remove the spinner
        setTimeout(() => {
            //Print result
            const divResult = document.querySelector('#result');
            divResult.innerHTML = HTMLTemplate;

            //Hide spinner
            document.querySelector('.spinner img').remove();
        }, 1000);

    }

    //Prints spinner
    showSpinner() {
        const spinnerGIF = document.createElement('img');
        spinnerGIF.src = 'img/spinner.gif';
        document.querySelector('.spinner').appendChild(spinnerGIF);
    }
}