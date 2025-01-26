import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NavButton = ({ direction }) => {
    return (
        <View style={styles.container}>
            <Icon
                name={direction === 'left' ? 'keyboard-arrow-left' : 'keyboard-arrow-right'}
                size={24}
                color="#333"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NavButton; 