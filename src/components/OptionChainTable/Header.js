import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            {/* CALLS Section */}
            <View style={styles.section}>
                <Text style={[styles.headerText]} numberOfLines={1}>CALLS</Text>
                <Text style={styles.columnHeader} numberOfLines={1}>LTP</Text>
            </View>

            {/* Strike Price Section */}
            <View style={[styles.section, styles.borderSection]}>
                <Text style={[styles.headerText]} numberOfLines={1}>Strike Price</Text>
            </View>

            {/* PUTS Section */}
            <View style={styles.section}>
                <Text style={[styles.headerText]} numberOfLines={1}>PUTS</Text>
                <Text style={styles.columnHeader} numberOfLines={1}>LTP</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        height: 70,
    },
    section: {
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    borderSection: {
        width: 120,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#e9ecef',
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#343a40',
        marginBottom: 4,
        textAlign: 'center',
    },
    columnHeader: {
        fontSize: 14,
        color: '#6c757d',
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default Header; 