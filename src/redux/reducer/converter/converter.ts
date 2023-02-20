import { createSlice } from "@reduxjs/toolkit";
import {ActionType} from "../../interface";
import {StoreState} from "../../../interface/Iprops.input";

const initialState = {
    ...(JSON.parse(
        localStorage.getItem("currency") ||
        JSON.stringify({ dataCurrency: [] })
    ) as StoreState),
};

const converter = createSlice({
    name: "converter",
    initialState,
    reducers: {
        saveData: (state, action: ActionType) => {
            state.dataCurrency = action.payload;
            localStorage.setItem("currency", JSON.stringify(state));
        },
        editValueCurrency: (state, action:ActionType) => {
            const {buy, sale} = action.payload;
            state.dataCurrency = state.dataCurrency.map(item => action.payload.ccy === item.ccy ? {...item, buy, sale} : {...item});
            localStorage.setItem("currency", JSON.stringify(state));
        },
    },
});

export const { saveData, editValueCurrency} = converter.actions;

export default converter.reducer;