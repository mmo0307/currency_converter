import {render, screen} from "@testing-library/react";
import React from "react";
import {TableItem} from "./ListTableItem";

const data = [{
        ccy: 'UAH',
        base_ccy: 'USD',
        buy: "20",
        sale: "27",
    },
    {
        ccy: "YAH",
        base_ccy: "UAH",
        buy: "4",
        sale: "6",
    }];

describe('Table Component', () => {
    it('Table renders', () => {
        render(<TableItem data={data}/>);

        expect(screen.getByRole('tr')).toBeInTheDocument();
        expect(screen.getByText(/usd/i)).toBeInTheDocument();
    })
})