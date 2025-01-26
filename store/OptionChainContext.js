import React, { createContext, useContext, useReducer } from 'react';
import { updateOptionChain } from '../src/utils/optionChainUtils';

// Initial state of the app
const initialState = {
    chainData: null,
    tokenStrikePriceMap: null,
    contractLatestData: null,
    validContracts: null,
    positions: [],
};

// Action Types
export const UPDATE = 'UPDATE';
export const TOKEN_STRIKE_MAP = 'TOKEN_STRIKE_MAP';
export const LATEST_CONTRACT = 'LATEST_CONTRACT';
export const DATA_UPDATE = 'DATA_UPDATE';
export const UPADATE_TRIGGER = 'UPADATE_TRIGGER';
export const UPDATE_CHAIN_DATA = 'UPDATE_CHAIN_DATA';
export const SAVE_VALID_CONTRACTS = 'SAVE_VALID_CONTRACTS';
export const UPDATE_POSITIONS = 'UPDATE_POSITIONS';

// Reducer function to handle state changes
function reducer(state, action) {
    switch (action.type) {
        case UPDATE:
            return { ...state };
        case TOKEN_STRIKE_MAP:
            return { ...state, tokenStrikePriceMap: action?.payload };
        case LATEST_CONTRACT:
            return { ...state, contractLatestData: action?.payload };
        case DATA_UPDATE:
            return { ...state, chainData: action?.payload };
        case UPDATE_POSITIONS:
            return { ...state, positions: [...state.positions, action?.payload] };
        case UPADATE_TRIGGER:
            updateOptionChain({
                data: action.payload?.newData,
                state: state,
                dispatch: action.payload?.dispatch,
            });
            return { ...state };
        case SAVE_VALID_CONTRACTS:
            return { ...state, validContracts: action?.payload };
        case UPDATE_CHAIN_DATA:
            return { ...state, chainData: action?.payload };
        default:
            return state;
    }
}

// Create the context
const OptionChainContext = createContext();

// Context Provider component
export function OptionChainDataProvider({ children }) {
    const [store, dispatch] = useReducer(reducer, initialState);

    return (
        <OptionChainContext.Provider value={{ store, dispatch }}>
            {children}
        </OptionChainContext.Provider>
    );
}

// Custom hook to use the context

// Custom hook to use the global state and dispatch actions
export const useAppContext = () => useContext(OptionChainContext);
