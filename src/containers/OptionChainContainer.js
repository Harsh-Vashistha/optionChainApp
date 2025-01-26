import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import OptionChain from '../pages/OptionChain';
import {
    getLatestOptions,
    getValidContracts,
    OptionChainController,
} from '../controllers/OptionChainController';
import WebSocketController from '../controllers/WebSocketController';
import { useAppContext } from '../../store/OptionChainContext';
import { sortByDate } from '../utils/sortObByDate';

export default function OptionChainContainer() {

    const { store, dispatch } = useAppContext();
    const [selectedExpiry, setSelectedExpiry] = useState(null);


    const realTimeController = useRef(null);

    const chainData = store?.chainData ?? {}; //data to be displayed in the table
    const allOptionExpiries = store?.validContracts?.NIFTY?.OPT ?? []; //all the expiries for the selected underlying

    const sortedOPT = sortByDate(allOptionExpiries);//sort the expiries by date
    const dates = Object.keys(sortedOPT);//get the dates

    const chainLatestData = store?.contractLatestData?.options?.[selectedExpiry] ?? {};
    const validContractData = store?.validContracts;

    useEffect(() => {
        setSelectedExpiry(dates[0]);
    }, [dates[0]]);

    useEffect(() => {
        getValidContracts({ dispatch, selectedExpiry });
        getLatestOptions({ dispatch, selectedExpiry });
    }, []);

    const initializeWebSocket = () => {
        if (realTimeController.current) {
            realTimeController.current.destroy();
            realTimeController.current = null;
        }

        realTimeController.current = new WebSocketController(
            'wss://prices.algotest.xyz/mock/updates',
            {
                type: 'subscribe',
                datatypes: ['ltp'],
                underlyings: [
                    {
                        underlying: 'NIFTY',
                        cash: true,
                        options: [selectedExpiry],
                    },
                ],
            },
            (newData) => {
                dispatch({
                    type: 'UPADATE_TRIGGER',
                    payload: { newData: newData, dispatch: dispatch },
                });
            },
            (error) => {
                console.error('WebSocket Error:', error);
            }
        );
        realTimeController.current.initialize();
    };

    useEffect(() => {
        if (chainLatestData && validContractData && selectedExpiry) {
            initializeWebSocket();

            OptionChainController({
                dispatch,
                validContractData,
                selectedExpiryData: chainLatestData,
                selectedExpiry,
            });
        }

        return () => {
            if (realTimeController.current) {
                realTimeController.current.destroy();
            }
        };
    }, [selectedExpiry]);

    return (
        <View style={{ height: '100%' }}>
            <OptionChain
                chainData={chainData}
                selectedExpiry={selectedExpiry}
                setSelectedExpiry={setSelectedExpiry}
                allOptionExpiries={allOptionExpiries}
            />
        </View>
    );
} 