import {IProps} from "../../interface/Iprops.input";
import React from "react";
//import {nanoid} from "nanoid";

export const Input = (
    {
        text,
        value,
        currencyArray = ['UAH'],
        handleValue,
        setSelectCurrency,
        selectCurrency,
        handleChangeSelect
    }:IProps
):JSX.Element => {
    return (
        <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                {text}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    min={0}
                    max={1000000}
                    type="number"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-gray-300 pl-4 pr-[70px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="0.00"
                    value={value?.value}
                    onChange={event => handleValue?.(event.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <select
                        id="currency"
                        name="currency"
                        className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={selectCurrency}
                        onChange={(event) => {
                            setSelectCurrency?.((prev) => ({...prev, currency: event.target.value}));
                            handleChangeSelect?.(event.target.value);
                        }}
                    >
                        {currencyArray.map(item =>
                            <option
                                key={(Math.random()).toString()}
                                //key={nanoid()}
                            >{item}</option>)}
                    </select>
                </div>
            </div>
        </div>
    )
}
