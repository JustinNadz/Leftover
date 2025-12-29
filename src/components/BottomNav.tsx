import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, fontSize, layout } from '../theme';

interface BottomNavProps {
    activeTab: string;
    onTabPress: (tab: string) => void;
    type?: 'buyer' | 'merchant';
}

const buyerTabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'orders', icon: 'receipt-long', label: 'Orders' },
    { id: 'wallet', icon: 'account-balance-wallet', label: 'Wallet' },
    { id: 'profile', icon: 'person', label: 'Profile' },
];

const merchantTabs = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'listings', icon: 'list-alt', label: 'Listings' },
    { id: 'support', icon: 'help-outline', label: 'Support' },
    { id: 'profile', icon: 'person', label: 'Profile' },
];

export const BottomNav: React.FC<BottomNavProps> = ({
    activeTab,
    onTabPress,
    type = 'buyer',
}) => {
    const insets = useSafeAreaInsets();
    const tabs = type === 'buyer' ? buyerTabs : merchantTabs;

    // Calculate safe bottom padding (minimum 16 for devices without notch)
    const bottomPadding = Math.max(insets.bottom, 16);

    return (
        <View style={[styles.container, { paddingBottom: bottomPadding }]}>
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
                                size={24}
                                color={isActive ? colors.primary : colors.textSecondary}
                            />
                            <Text
                                style={[
                                    styles.label,
                                    isActive ? styles.labelActive : styles.labelInactive,
                                ]}
                                numberOfLines={1}
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
        backgroundColor: 'rgba(17, 34, 24, 0.98)',
        borderTopWidth: 1,
        borderTopColor: colors.borderMuted,
        paddingTop: spacing.sm,
        // Ensure minimum height for touch targets
        minHeight: layout.bottomNavHeight,
    },
    inner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 52,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: 4,
        paddingVertical: spacing.xs,
        // Minimum touch target size (44pt recommended by Apple/Google)
        minWidth: 44,
        minHeight: 44,
    },
    label: {
        fontSize: fontSize.xs,
        fontWeight: '500',
        textAlign: 'center',
    },
    labelActive: {
        color: colors.primary,
        fontWeight: '700',
    },
    labelInactive: {
        color: colors.textSecondary,
    },
});
