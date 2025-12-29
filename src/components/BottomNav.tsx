import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, borderRadius, spacing, fontSize } from '../theme';

interface BottomNavProps {
    activeTab: string;
    onTabPress: (tab: string) => void;
    type?: 'buyer' | 'merchant';
}

const buyerTabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'orders', icon: 'receipt-long', label: 'Orders' },
    { id: 'profile', icon: 'person', label: 'Profile' },
];

const merchantTabs = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'listings', icon: 'list-alt', label: 'Listings' },
    { id: 'profile', icon: 'person', label: 'Profile' },
];

export const BottomNav: React.FC<BottomNavProps> = ({
    activeTab,
    onTabPress,
    type = 'buyer',
}) => {
    const tabs = type === 'buyer' ? buyerTabs : merchantTabs;

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <TouchableOpacity
                            key={tab.id}
                            style={styles.tab}
                            onPress={() => onTabPress(tab.id)}
                            activeOpacity={0.7}
                        >
                            <MaterialIcons
                                name={tab.icon as keyof typeof MaterialIcons.glyphMap}
                                size={26}
                                color={isActive ? colors.primary : colors.textSecondary}
                            />
                            <Text
                                style={[
                                    styles.label,
                                    isActive ? styles.labelActive : styles.labelInactive,
                                ]}
                            >
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(17, 34, 24, 0.95)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
        paddingBottom: 24,
        paddingTop: 8,
    },
    inner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 56,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: 4,
    },
    label: {
        fontSize: fontSize.xs,
        fontWeight: '500',
    },
    labelActive: {
        color: colors.primary,
        fontWeight: '700',
    },
    labelInactive: {
        color: colors.textSecondary,
    },
});
