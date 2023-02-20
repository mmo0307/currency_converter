import React, {useEffect, useState} from 'react';
// import {nanoid} from "nanoid";
import {IEditCourseData, IListTableItem} from "../../interface/Iprops.input";
import './listTable.css';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux";
import {editValueCurrency} from "../../redux/reducer/converter/converter";
export const TableItem = ({data}:IListTableItem):JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
     const [notes, setNotes] = useState<IEditCourseData[]>([]);

     useEffect(() => {
         setNotes(data.map((item) => ({
                 ...item,
                 //id: nanoid(),
             id: (Math.random()).toString(),
                 editBuy: false,
                 editSale: false
             })))
     }, []);

    const resultView = notes.map(item => {
            let elemBuy:JSX.Element = <></>;
            let elemSale:JSX.Element = <></>;

            if (!item.editBuy) {
                elemBuy =
                    <span onClick={() => editBuy(item.id)}>
                        {item.buy}
                    </span>;
            } else {
                elemBuy =
                    <div className="edit-price-block">
                        <input
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-2 py-2"
                            value={item.buy}
                            onChange={(event) => changeCell('buy', item.buy, item.id, event)}
                            onBlur={() => endEdit(item.id, 'buy')}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg"
                             height="15px"
                             width="15px"
                             version="1.1"
                             viewBox="0 0 512 512"
                             onClick={() => endEdit(item.id, 'buy')}
                        >
                            <g className="st2" id="cross"><g className="st0"><line className="st1" x1="112.5" x2="401" y1="112.5" y2="401"/><line
                                className="st1" x1="401" x2="112.5" y1="112.5" y2="401"/></g></g>
                            <g id="cross_copy"><path d="M268.064,256.75l138.593-138.593c3.124-3.124,3.124-8.189,0-11.313c-3.125-3.124-8.189-3.124-11.314,0L256.75,245.436   L118.157,106.843c-3.124-3.124-8.189-3.124-11.313,0c-3.125,3.124-3.125,8.189,0,11.313L245.436,256.75L106.843,395.343   c-3.125,3.125-3.125,8.189,0,11.314c1.562,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343L256.75,268.064l138.593,138.593   c1.563,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343c3.124-3.125,3.124-8.189,0-11.314L268.064,256.75z"/>
                            </g>
                        </svg>
                    </div>
            }

            if (!item.editSale) {
                elemSale =
                    <span onClick={() => editSale(item.id)}>
                        {item.sale}
                    </span>;
            } else {
                elemSale =
                    <div className="edit-price-block">
                        <input
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-2 py-2"
                            value={item.sale}
                            onChange={(event) => changeCell('sale', item.sale, item.id, event)}
                            onBlur={() => endEdit(item.id, 'sale')}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg"
                             height="15px"
                             width="15px"
                             version="1.1"
                             viewBox="0 0 512 512"
                             onClick={() => endEdit(item.id, 'sale')}
                        >
                            <g className="st2" id="cross"><g className="st0"><line className="st1" x1="112.5" x2="401" y1="112.5" y2="401"/><line
                                className="st1" x1="401" x2="112.5" y1="112.5" y2="401"/></g></g>
                            <g id="cross_copy"><path d="M268.064,256.75l138.593-138.593c3.124-3.124,3.124-8.189,0-11.313c-3.125-3.124-8.189-3.124-11.314,0L256.75,245.436   L118.157,106.843c-3.124-3.124-8.189-3.124-11.313,0c-3.125,3.124-3.125,8.189,0,11.313L245.436,256.75L106.843,395.343   c-3.125,3.125-3.125,8.189,0,11.314c1.562,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343L256.75,268.064l138.593,138.593   c1.563,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343c3.124-3.125,3.124-8.189,0-11.314L268.064,256.75z"/>
                            </g>
                        </svg>
                    </div>

            }

             return (
                 <tr
                     className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                     key={(Math.random()).toString()}
                     //key={nanoid()}
                 >
                     <th scope="row"
                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                         {item.ccy}/{item.base_ccy}
                     </th>
                     <td className="px-6 py-4">
                         {elemBuy}
                     </td>
                     <td className="px-6 py-4">
                         {elemSale}
                     </td>
                 </tr>
             );
        });
    const editBuy = (id:string) => {
        setNotes(
            notes.map(note => {
                if (note.id === id) {
                    return {...note, editBuy: true};
                } else {
                    return note;
                }
            })
        );
    }
    const editSale = (id:string) => {
        setNotes(
            notes.map(note => {
                if (note.id === id) {
                    return {...note, editSale: true};
                } else {
                    return note;
                }
            })
        );
    }
    const endEdit = (id:string, type:string) => {
        switch(type) {
            case 'buy': {
                setNotes(
                    notes.map(note => {
                        if (note.id === id) {
                            return {...note, editBuy: false};
                        } else {
                            return note;
                        }
                    })
                );
                    notes.forEach(note => {
                        if(id === note.id) {
                            dispatch(editValueCurrency(note));
                        }
                    });
                break;
            }
            case 'sale': {
                setNotes(
                    notes.map(note => {
                        if (note.id === id) {
                            return {...note, editSale: false};
                        } else {
                            return note;
                        }
                    })
                );

                notes.forEach(note => {
                    if(id === note.id) {
                        dispatch(editValueCurrency(note));
                    }
                });
                break;
            }
            default: return;
        }
    }
    const changeCell = (type:string, price:string, id:string, event:any) => {
        switch(type){
            case 'buy': {
                setNotes(notes.map(note => {
                        if (note.buy === price) {
                            return {...note, buy: event.target.value}
                        } else {
                            return note;
                        }
                    }
                ));
                break;
            }
            case 'sale': {
                setNotes(notes.map(note => {
                        if (note.sale === price) {
                            return {...note, sale: event.target.value}
                        } else {
                            return note;
                        }
                    }
                ));
                break;
            }
            default: return notes;
        }
    }

    return (
        <table className="table-auto text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Currency/Current
                </th>
                <th scope="col" className="px-6 py-3">
                    Buy
                </th>
                <th scope="col" className="px-6 py-3">
                    Sell
                </th>
            </tr>
            </thead>
            <tbody>
                {resultView}
            </tbody>
        </table>
    );
}