import React, {useEffect, useState} from 'react';
import {Input} from "./Components/Input/Input";
import {Exchange} from "./Icons/SvgItem/Exchange";

import './App.css';

import {ICourseData, ICurrency, ICurrencyData} from "./interface/Iprops.input";
import {AppDispatch} from "./redux";
import {useDispatch, useSelector} from "react-redux";
import {saveData} from "./redux/reducer/converter/converter";
import {TableItem} from "./Components/ListTable/ListTableItem";
import {dataCurrency} from "./redux/selector/converter";
import axios from "axios";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const currencyData = useSelector(dataCurrency);
    const [loader, setLoader] = useState<boolean>(true);
    const [exchangeValue, setExchangeValue] = useState<ICurrencyData>({
        value: '',
        currency: 'UAH'
    });
    const [getExchangeValue, setGetExchangeValue] = useState<ICurrencyData>({
        value: '',
        currency: 'USD'
    });
    const [courseData, setCourseData] = useState<ICourseData[]>([]);
    const [rates, setRates] = useState<ICurrency>({ 'UAH': 1, 'USD': 0, 'EUR': 0 });
    const [currencyArray, setCurrencyArray] = useState<string[]>([]);
    const handleChangeFirstValue = (value: string) => {
        setExchangeValue((prev) => ({ ...prev, value }));
        converter(
            value,
            null,
            exchangeValue.currency,
            getExchangeValue.currency
        );
    }
    const handleChangeSecondValue = (value: string) => {
        setGetExchangeValue((prev) => ({ ...prev, value }));
        converter(
            null,
            value,
            exchangeValue.currency,
            getExchangeValue.currency
        );
    }
    const handleChangeFirstSelect = (value:string) => {
        setExchangeValue((prev) => ({ ...prev, currency: value }));
        converter(exchangeValue.value, null, value, getExchangeValue.currency);
    };
    const handleChangeSecondSelect = (value:string) => {
        setGetExchangeValue((prev) => ({ ...prev, currency: value }));
        converter(exchangeValue.value, null, exchangeValue.currency, value);
    };
    const switchCurrency = () => {
        setExchangeValue({value: getExchangeValue.value, currency: getExchangeValue.currency});
        setGetExchangeValue({value: exchangeValue.value, currency: exchangeValue.currency});
    }
    const converter = (firstValue: any, secondValue: any, firstSelect:string, secondSelect:string) => {
        if (firstSelect === secondSelect) {
            return setGetExchangeValue((prev) => ({...prev, value: firstValue}));
        } else {
            let z = 0;
            if (firstValue) {
                if (firstSelect !== 'UAH') {
                    z = +firstValue * rates[firstSelect];
                    return setGetExchangeValue((prev) => ({
                        ...prev,
                        value: (Math.ceil((z / rates[secondSelect]) * 100) / 100).toString(),
                    }));
                } else {
                    return setGetExchangeValue((prev) => ({
                        ...prev,
                        value: (Math.ceil((+firstValue / rates[secondSelect]) * 100) / 100).toString(),
                    }));
                }
            }
            if (secondValue) {
                z = secondValue * rates[secondSelect];
                return setExchangeValue((prev) => ({
                    ...prev,
                    value: (Math.ceil((z / rates[firstSelect]) * 100) / 100).toString(),
                }));
            } else {
                return setExchangeValue((prev) => ({
                    ...prev,
                    value: (Math.ceil((secondValue / rates[firstSelect]) * 100) / 100).toString(),
                }));
            }
        }
    };

    useEffect(() => {
        const getData = async() => {
            let currency:string[] = ['UAH'];
            try {
                const result = await axios('https://server-currency-a4pg.vercel.app/currency/currency');
                const data = await result.data.api;
                setCourseData(data);
                setLoader(false);
                data.forEach((item:ICourseData) => {
                    currency.push(item.ccy);
                    switch (item.ccy) {
                        case 'USD':{
                            return setRates((prev) => ({ ...prev, USD: +item.buy }));
                        }
                        case 'EUR':{
                            return setRates((prev) => ({ ...prev, EUR: +item.buy }));
                        }
                        default: return;
                    }
                });
                setCurrencyArray(currency);
                dispatch(saveData(data));
            } catch (error) {
                console.log('error', error);
                const dataStorage = JSON.parse(localStorage.getItem("currency") || '');
                setCourseData(dataStorage);
                setLoader(false);
                dataStorage.forEach((item: ICourseData) => {
                    currency.push(item.ccy);
                    switch (item.ccy) {
                        case 'USD': {
                            return setRates((prev) => ({...prev, USD: +item.buy}));
                        }
                        case 'EUR': {
                            return setRates((prev) => ({...prev, EUR: +item.buy}));
                        }
                        default:
                            return;
                    }
                });
                setCurrencyArray(currency);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        setCourseData(currencyData.dataCurrency);
        currencyData.dataCurrency.forEach((item:ICourseData) => {
            switch (item.ccy) {
                case 'USD':{
                    return setRates((prev) => ({ ...prev, USD: +item.buy }));
                }
                case 'EUR':{
                    return setRates((prev) => ({ ...prev, EUR: +item.buy }));
                }
                default: return;
            }
        });
    }, [currencyData]);

    if(loader){
        return <div>Loading...</div>
    }

  return (
      <div className="wrapper">
          <header className="logo">
              <Exchange /> Converter Currency
          </header>
          <main>
              {
                  courseData.length ?
                  <>
                      <div className="currency-table relative overflow-x-auto">
                          <TableItem
                              data={courseData}
                          />
                      </div>

                      <div className="container">
                          <Input
                              text="Change"
                              value={exchangeValue}
                              currencyArray={currencyArray}
                              handleValue={handleChangeFirstValue}
                              setSelectCurrency={setExchangeValue}
                              selectCurrency={exchangeValue.currency}
                              handleChangeSelect={handleChangeFirstSelect}
                          />
                          <Exchange
                              switchCurrency={switchCurrency}
                          />
                          <Input
                              text="Get"
                              value={getExchangeValue}
                              currencyArray={currencyArray}
                              handleValue={handleChangeSecondValue}
                              setSelectCurrency={setGetExchangeValue}
                              selectCurrency={getExchangeValue.currency}
                              handleChangeSelect={handleChangeSecondSelect}
                          />
                      </div>
                  </>
                  : <div className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-7 py-3 mr-2 mb-2">Error</div>
              }

          </main>

          <footer className="footer">
                2022 All right reversed
          </footer>
      </div>
  );
}

export default App;