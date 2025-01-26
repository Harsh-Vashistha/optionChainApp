import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Row = ({ data, strikePrice, isATM }) => {
    return (
        <View style={[styles.row, isATM && styles.atmRow]}>
            {/* CALLS Section */}
            <View style={styles.section}>
                <Text style={styles.dataText} numberOfLines={1}>{data['CE']?.ltp || '-'}</Text>
            </View>

            {/* Strike Price Section */}
            <View style={[styles.section, styles.borderSection]}>
                <Text style={[styles.strikeText, isATM && styles.atmText]} numberOfLines={1}>
                    {strikePrice}
                </Text>
            </View>

            {/* PUTS Section */}
            <View style={styles.section}>
                <Text style={styles.dataText} numberOfLines={1}>{data['PE']?.ltp || '-'}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        backgroundColor: '#ffffff',
        height: 50,
    },
    atmRow: {
        backgroundColor: '#fefce8',
    },
    section: {
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    borderSection: {
        width: 120,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#e9ecef',
    },
    dataText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'right',
        width: 100,
        paddingRight: 8,
    },
    strikeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#212529',
        textAlign: 'center',
        width: 100,
    },
    atmText: {
        fontWeight: '700',
        color: '#007bff',
    },
});

export default Row; 