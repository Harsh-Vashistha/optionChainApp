import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { sortByDate } from '../utils/sortObByDate';
import NavButton from './NavButton';
import FilterItem from './FilterItem';

const ITEM_WIDTH = 120; // Width of each filter item
const SCROLL_AMOUNT = 240; // Amount to scroll on button press

/**
 * DateFilterSlider component allows the user to select a specific expiry date
 * from a list of sorted option expiries. The user can scroll horizontally
 * to view all available expiry dates and select one to filter the options.
 */
const DateFilterSlider = ({
    selectedExpiry,
    setSelectedExpiry,
    allOptionExpiries,
}) => {
    const scrollViewRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState(selectedExpiry);

    // Sort the expiry dates in ascending order
    const sortedOPT = sortByDate(allOptionExpiries);
    const dates = Object.keys(sortedOPT);

    const windowWidth = Dimensions.get('window').width;
    const maxScroll = dates.length * ITEM_WIDTH - windowWidth;

    useEffect(() => {
        setSelectedFilter(selectedExpiry);
    }, [selectedExpiry]);

    const scroll = (direction) => {
        if (scrollViewRef.current) {
            const newPosition = direction === 'left'
                ? Math.max(0, scrollPosition - SCROLL_AMOUNT)
                : Math.min(maxScroll, scrollPosition + SCROLL_AMOUNT);

            scrollViewRef.current.scrollTo({
                x: newPosition,
                animated: true,
            });
            setScrollPosition(newPosition);
        }
    };

    const handleScroll = (event) => {
        const position = event.nativeEvent.contentOffset.x;
        setScrollPosition(position);
    };

    return (
        <View style={styles.container}>
            {/* Left Navigation Button */}
            {scrollPosition > 0 && (
                <TouchableOpacity
                    style={[styles.navButton, styles.leftButton]}
                    onPress={() => scroll('left')}
                >
                    <NavButton direction="left" />
                </TouchableOpacity>
            )}

            {/* Right Navigation Button */}
            {scrollPosition < maxScroll && (
                <TouchableOpacity
                    style={[styles.navButton, styles.rightButton]}
                    onPress={() => scroll('right')}
                >
                    <NavButton direction="right" />
                </TouchableOpacity>
            )}

            {/* ScrollView for Filter Items */}
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {dates.map((filter) => (
                    <FilterItem
                        key={filter}
                        date={filter}
                        isSelected={selectedFilter === filter}
                        onPress={() => setSelectedExpiry(filter)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingHorizontal: 16,
        gap: 16,
        alignItems: 'center',
    },
    navButton: {
        position: 'absolute',
        zIndex: 1,
        top: '50%',
        transform: [{ translateY: -20 }],
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    leftButton: {
        left: 8,
    },
    rightButton: {
        right: 8,
    },
});

export default DateFilterSlider; 