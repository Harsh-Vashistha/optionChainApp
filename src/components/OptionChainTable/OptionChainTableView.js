import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import Header from './Header';
import Row from './Row';
import { useOptionChainViewModel } from './ViewModel/OptionChainViewModel';

const OptionChainTableView = ({ data = {}, atmStrike }) => {

    const { rowData } = useOptionChainViewModel({ data });

    const renderItem = ({ item }) => (
        <Row
            key={item?.strikePrice}
            strikePrice={item?.strikePrice}
            data={item}
            isATM={item?.strikePrice === atmStrike}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={rowData}
                renderItem={renderItem}
                keyExtractor={item => item?.strikePrice}
                ListHeaderComponent={() => (
                    <Header />
                )}
                initialNumToRender={20}
                maxToRenderPerBatch={20}
                windowSize={10}
                removeClippedSubviews={true}
                stickyHeaderIndices={[0]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        height: Dimensions.get('window').height,
    },
});

export default OptionChainTableView; 