const axios = require("axios");
const models = require('./models');
require('dotenv').config();


const currencyConversion = (symb, amt) => {
    const currency = {"USD":1,"AED":3.6725,"AFN":78.1861,"ALL":101.1122,"AMD":520.0300,"ANG":1.7900,"AOA":646.8518,"ARS":94.8405,"AUD":1.2894,"AWG":1.7900,"AZN":1.6987,"BAM":1.6020,"BBD":2.0000,"BDT":84.7929,"BGN":1.6039,"BHD":0.3760,"BIF":1960.7799,"BMD":1.0000,"BND":1.3222,"BOB":6.8791,"BRL":5.0476,"BSD":1.0000,"BTN":72.8178,"BWP":10.5873,"BYN":2.5259,"BZD":2.0000,"CAD":1.2062,"CDF":1989.1920,"CHF":0.8982,"CLP":718.0306,"CNY":6.3965,"COP":3598.9876,"CRC":617.8797,"CUC":1.0000,"CUP":25.7500,"CVE":90.3179,"CZK":20.9166,"DJF":177.7210,"DKK":6.1108,"DOP":56.7605,"DZD":133.4935,"EGP":15.6899,"ERN":15.0000,"ETB":43.5728,"EUR":0.8192,"FJD":2.0360,"FKP":0.7053,"FOK":6.1108,"GBP":0.7054,"GEL":3.1649,"GGP":0.7053,"GHS":5.8007,"GIP":0.7053,"GMD":51.6236,"GNF":9812.6361,"GTQ":7.7104,"GYD":209.0657,"HKD":7.7573,"HNL":24.0211,"HRK":6.1715,"HTG":90.7353,"HUF":285.2231,"IDR":14260.2435,"ILS":3.2611,"IMP":0.7053,"INR":72.8181,"IQD":1459.3753,"IRR":41850.1303,"ISK":120.7045,"JMD":148.9504,"JOD":0.7090,"JPY":109.3226,"KES":107.8046,"KGS":84.6954,"KHR":4075.8500,"KID":1.2894,"KMF":402.9702,"KRW":1112.3165,"KWD":0.2996,"KYD":0.8333,"KZT":427.0159,"LAK":9442.8706,"LBP":1507.5000,"LKR":197.2411,"LRD":171.1743,"LSL":13.4991,"LYD":4.4473,"MAD":8.8216,"MDL":17.6469,"MGA":3765.7996,"MKD":50.9037,"MMK":1646.4277,"MNT":2850.5555,"MOP":7.9899,"MRU":36.1671,"MUR":40.4792,"MVR":15.3160,"MWK":796.6139,"MXN":19.8204,"MYR":4.1274,"MZN":61.4921,"NAD":13.4991,"NGN":426.2620,"NIO":34.9162,"NOK":8.2771,"NPR":116.5085,"NZD":1.3844,"OMR":0.3845,"PAB":1.0000,"PEN":3.8673,"PGK":3.5118,"PHP":47.6882,"PKR":154.6858,"PLN":3.6696,"PYG":6662.7130,"QAR":3.6400,"RON":4.0439,"RSD":96.6184,"RUB":72.8344,"RWF":995.5457,"SAR":3.7500,"SBD":7.8885,"SCR":14.9255,"SDG":425.5946,"SEK":8.2674,"SGD":1.3222,"SHP":0.7053,"SLL":10223.7801,"SOS":578.5826,"SRD":14.1536,"SSP":177.5690,"STN":20.0679,"SYP":1262.3571,"SZL":13.4991,"THB":31.2118,"TJS":11.3050,"TMT":3.5000,"TND":2.7252,"TOP":2.2209,"TRY":8.6262,"TTD":6.7599,"TVD":1.2894,"TWD":27.6913,"TZS":2315.4300,"UAH":27.1581,"UGX":3529.2905,"UYU":43.4689,"UZS":10612.8571,"VES":3111041.0500,"VND":22980.7957,"VUV":107.9928,"WST":2.5217,"XAF":537.2936,"XCD":2.7000,"XDR":0.6937,"XOF":537.2936,"XPF":97.7447,"YER":250.0000,"ZAR":13.4993,"ZMW":22.5207}

    if (symb === "USD") {
        return amt;
    }

    else {
        const rate = 1/currency[symb];
     
        return (amt * rate).toFixed(2);

    }



}

const seedData = async () => {

    const response = await axios.get(`https://openapi.etsy.com/v2/listings/active?api_key=${process.env.KEY}&includes=Images&limit=100&offset=0`)
    const items = response.data.results;
    console.log(items.length);
    for (const item of items) {
     

        const item = await models.item.create({
            uuid: item["listing_id"],
            name: item["title"],
            desc: item["description"],
            price: currencyConversion(item["currency_code"],item["price"])
        });


    }
}

seedData();