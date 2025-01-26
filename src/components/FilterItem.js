import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { calculateDaysLeft, formatDate } from '../utils/dateUtils';

const FilterItem = ({ date, isSelected, onPress }) => {
    // Format the date to a more readable format
    const formattedDate = formatDate(date);
    const daysLeft = calculateDaysLeft(date);

    return (
        <TouchableOpacity
            style={[
                styles.container,
                isSelected && styles.selectedContainer,
            ]}
            onPress={onPress}
        >
            <Text style={[
                styles.text,
                isSelected && styles.selectedText,
            ]}>
                {formattedDate}
            </Text>
            <Text style={[
                styles.text,
                isSelected && styles.selectedText,
            ]}>
                {daysLeft}d
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        minWidth: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedContainer: {
        backgroundColor: '#007AFF',
    },
    text: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    selectedText: {
        color: '#fff',
    },
});

export default FilterItem; 