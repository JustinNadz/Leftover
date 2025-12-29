import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

interface Address {
    id: string;
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    address: string;
    isDefault?: boolean;
}

const addresses: Address[] = [
    {
        id: '1',
        label: 'Home',
        icon: 'home',
        address: 'Unit 402, Raya Garden Condominiums, West Service Road, Merville, Parañaque City',
        isDefault: true,
    },
    {
        id: '2',
        label: 'Office',
        icon: 'business',
        address: '12th Floor, Ayala Triangle Tower, Makati Ave, Makati City',
    },
    {
        id: '3',
        label: "Mom's House",
        icon: 'favorite',
        address: 'Block 5 Lot 2, Camella Homes, Bacoor, Cavite',
    },
];

interface MyAddressesScreenProps {
    navigation: any;
}

export const MyAddressesScreen: React.FC<MyAddressesScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Addresses</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="add" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Address Cards */}
                    {addresses.map((address) => (
                        <View key={address.id} style={styles.addressCard}>
                            <View style={styles.addressLeft}>
                                <View style={styles.iconContainer}>
                                    <MaterialIcons name={address.icon} size={20} color={colors.primary} />
                                </View>
                                <View style={styles.addressContent}>
                                    <View style={styles.labelRow}>
                                        <Text style={styles.addressLabel}>{address.label}</Text>
                                        {address.isDefault && (
                                            <View style={styles.defaultBadge}>
                                                <Text style={styles.defaultText}>Default</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={styles.addressText}>{address.address}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.moreButton}>
                                <MaterialIcons name="more-vert" size={20} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                    ))}

                    {/* Add Another Address Link */}
                    <TouchableOpacity style={styles.addAnotherLink}>
                        <MaterialIcons name="add-location-alt" size={20} color={colors.textSecondary} />
                        <Text style={styles.addAnotherText}>Add another address</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Add New Address Button */}
                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity style={styles.addButton}>
                        <MaterialIcons name="add" size={20} color={colors.backgroundDark} />
                        <Text style={styles.addButtonText}>Add New Address</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'home') navigation.navigate('BuyerHome');
                    if (tab === 'orders') navigation.navigate('BuyerOrders');
                }}
                type="buyer"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    headerTitle: {
        fontSize: fontSize.lg,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.lg,
        paddingBottom: 180,
    },
    addressCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    addressLeft: {
        flexDirection: 'row',
        flex: 1,
        gap: spacing.md,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.full,
        backgroundColor: 'rgba(19, 236, 109, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addressContent: {
        flex: 1,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.xs,
    },
    addressLabel: {
        fontSize: fontSize.md,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    defaultBadge: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    defaultText: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.backgroundDark,
    },
    addressText: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    moreButton: {
        padding: spacing.xs,
    },
    addAnotherLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        paddingVertical: spacing.xl,
    },
    addAnotherText: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        paddingHorizontal: spacing.lg,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        backgroundColor: colors.primary,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.lg,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    addButtonText: {
        fontSize: fontSize.md,
        fontWeight: '700',
        color: colors.backgroundDark,
    },
});
