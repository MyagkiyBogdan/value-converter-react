import React, { useEffect, useState } from 'react';
import converterApi from '../../services/exchangeRater';
const Converter = () => {
  const [allCurrency, setAllCurrency] = useState(['USD', 'UAH']);
  const [fromOption, setFromOption] = useState('USD');
  const [toOption, setToOption] = useState('UAH');
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('');
  const [frontConversion, setFrontConversion] = useState(true);

  useEffect(() => {
    converterApi()
      .then(result => {
        const CONVERSION_RATES = result.conversion_rates;
        setAllCurrency([...Object.keys(CONVERSION_RATES)]);

        const rate = CONVERSION_RATES[toOption] / CONVERSION_RATES[fromOption];
        console.log(CONVERSION_RATES[toOption], CONVERSION_RATES[fromOption], rate);

        if (frontConversion) {
          setToAmount((fromAmount * rate).toFixed(2));
        } else {
          setFromAmount((toAmount / rate).toFixed(2));
        }
      })
      .catch(error => console.log('error', error));
  }, [fromAmount, fromOption, frontConversion, toAmount, toOption]);

  const flip = () => {
    const timedData = fromAmount;
    const timedCurrency = fromOption;
    setFromAmount(toAmount);
    setToAmount(timedData);
    setFromOption(toOption);
    setToOption(timedCurrency);
  };
  return (
    <div>
      <h1>Converter</h1>

      <input
        type="text"
        placeholder="From"
        value={fromAmount}
        onChange={e => {
          setFrontConversion(true);
          setFromAmount(e.target.value);
        }}
      />
      <select
        value={fromOption}
        name="from"
        id="from"
        onChange={e => setFromOption(e.target.value)}
      >
        {allCurrency ? (
          allCurrency.map(element => (
            <option value={element} key={element}>
              {element}
            </option>
          ))
        ) : (
          <option>UAH</option>
        )}
      </select>
      <br />
      <button type="btn" onClick={flip}>
        arrows
      </button>
      <br />
      <input
        type="text"
        placeholder="To"
        value={toAmount}
        onChange={e => {
          setFrontConversion(false);
          setFromAmount(e.target.value);
        }}
      />
      <select value={toOption} name="to" id="to" onChange={e => setToOption(e.target.value)}>
        {allCurrency ? (
          allCurrency.map(element => (
            <option value={element} key={element}>
              {element}
            </option>
          ))
        ) : (
          <option>UAH</option>
        )}
      </select>
    </div>
  );
};

export default Converter;
