export interface IProps {
    value?: ICurrencyData;
    handleValue?: (value:string) => void | undefined;
    text: string;
    currencyArray: string[];
    setSelectCurrency?: (changeValue: (prev: ICurrencyData) => ICurrencyData) => void | undefined;
    selectCurrency?: string;
    handleChangeSelect?: (value:string) => void | undefined;
}
export interface ICourseData {
    ccy: string;
    base_ccy: string;
    buy: string;
    sale: string;
}
export interface IEditCourseData extends ICourseData {
    id: string;
    editBuy: boolean;
    editSale: boolean;
}
export interface StoreState {
    dataCurrency: ICourseData[]
}
export interface ICurrencyData{
    value:string;
    currency: string;
}
export interface ICurrency{
    UAH: number,
    USD: number,
    EUR: number
    [key:string]: number
}
export interface ISwitchCurrency {
    switchCurrency?: () => void
}
export interface IListTableItem {
    data: ICourseData[]
}