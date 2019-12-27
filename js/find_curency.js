let conteiner = document.querySelector('.input-cryptocurrency');
let inputCurency = document.createElement('input');
let btnInput = document.createElement('a');
let names=[];
let ul = document.querySelector('#dropdown');
// class
inputCurency.classList.add("validate");
inputCurency.placeholder = 'Enter currency';
btnInput.classList.add('waves-effect', 'waves-light', 'btn','cryptocurrency');
btnInput.textContent = 'find cryptocurrency';
//append
conteiner.prepend(inputCurency);
 // conteiner.append(btnInput);

// find
const currencyList1 = 'https://api.coinmarketcap.com/v1/ticker/?limit=30';
    fetch(currencyList1)
        .then( function (responce) {
            return responce.json();
        })
        .then(function (data) {
            // let inputToLover = inputCurency.value.toLowerCase();
            // let rezolt  = data.filter(function (temp) {
            //     if(inputToLover === temp.id.toLowerCase() || inputToLover ===  temp.symbol.toLowerCase()  ){
            //         return  temp;
            //     }
            // });
            // createCard(rezolt);
            names = names.concat(data);
            return data;
        }).then(function (arr) {
        let findCyrrency =(search,currencyNames)=> {
            let filterArr =   currencyNames.filter(item => {
                let reg = new RegExp(`^${search}`,'gi');
                return item.name.match(reg) || item.symbol.match(reg);
            });
            return filterArr;
        };
        function showResult() {
            let resultArr = findCyrrency(this.value,names);
            console.log(this.value);
            let html =  resultArr.map(item =>{
                const regex = new RegExp(this.value, 'gi');
                const nameCurrency = item.name.replace(regex, `<span class="hl">${this.value}</span>`);
                const symbolCurrency = item.symbol.replace(regex, `<span class="hl">${this.value}</span>`);
                return `<li>
        <span class="name">${nameCurrency}</span> 
        </li>`
            }).join('');
            ul.innerHTML = html;
        }
         const input = document.querySelector('.validate');
                input.addEventListener('input',showResult);
        ul.addEventListener('click',function () {
              input.value = event.target.textContent.toLowerCase();
               ul.innerHTML= '';
            let rezolt  = arr.filter(function (temp) {
                if(input.value === temp.id.toLowerCase() || input.value ===  temp.symbol.toLowerCase()  ){
                    return  temp;
                }
            });
            createCard(rezolt);
      });
        // странно ,но не срабатует ентер,
        window.addEventListener('keypress', function () {
            if (event.keyCode === 13) {
               input.value = event.target.textContent.toLowerCase();
                    ul.innerHTML= '';
                let rezolt  = arr.filter(function (temp) {
                    if(input.value === temp.id.toLowerCase() || input.value ===  temp.symbol.toLowerCase()  ){
                        return  temp;
                    }
                });
                createCard(rezolt);
            }});
        // странно ,но не срабатует
    });
// create function filter (name,symbol)
