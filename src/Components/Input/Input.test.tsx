import {render} from "@testing-library/react";
import React from "react";
import {Input} from "./Input";

const currencyArray = ['UAH', 'USD', 'EUR'];
describe('Input renders', () => {
    it('Input renders without someone parameters', () => {
        render(<Input text="TEXT" currencyArray={currencyArray}/>)
    });

    it('Input snapshot without someone parameters', () => {
        expect(
            render(<Input text="TEXT" currencyArray={currencyArray} />)
        ).toMatchSnapshot();
    })
})