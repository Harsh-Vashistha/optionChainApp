import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import OptionChainTableView from '../components/OptionChainTable/OptionChainTableView';
import DateFilterSlider from '../components/DateFilterSlider';

const OptionChain = ({
    chainData,
    selectedExpiry,
    setSelectedExpiry,
    allOptionExpiries,
}) => {
    if (Object.keys(chainData).length == 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <DateFilterSlider
                selectedExpiry={selectedExpiry}
                setSelectedExpiry={setSelectedExpiry}
                allOptionExpiries={allOptionExpiries}
            />

            <OptionChainTableView
                data={chainData}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OptionChain; 