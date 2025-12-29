import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const presetAmounts = [100, 500, 1000, 2000];

interface PaymentMethod {
    id: string;
    name: string;
    subtitle: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    iconColor: string;
    iconBg: string;
}

const paymentMethods: PaymentMethod[] = [
    { id: 'gcash', name: 'GCash', subtitle: 'Linked •••• 9382', icon: 'account-balance-wallet', iconColor: '#0093dd', iconBg: '#0093dd' },
    { id: 'maya', name: 'Maya', subtitle: 'Balance: ₱2,450.00', icon: 'account-balance-wallet', iconColor: '#00d68f', iconBg: '#00d68f' },
    { id: 'card', name: 'Debit Card', subtitle: 'Visa •••• 4242', icon: 'credit-card', iconColor: colors.textSecondary, iconBg: colors.surfaceHighlight },
];

interface TopUpScreenProps {
    navigation: any;
}

export const TopUpScreen: React.FC<TopUpScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('wallet');
    const [amount, setAmount] = useState('500');
    const [selectedPayment, setSelectedPayment] = useState('gcash');
    const currentBalance = 45.50;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Wallet</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Current Balance */}
                    <View style={styles.balanceSection}>
                        <Text style={styles.balanceLabel}>Current Balance</Text>
                        <Text style={styles.balanceAmount}>₱{currentBalance.toFixed(2)}</Text>
                    </View>

                    {/* Top-up Amount */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Top-up Amount</Text>
                        <View style={styles.amountInput}>
                            <Text style={styles.currencySymbol}>₱</Text>
                            <TextInput
                                style={styles.amountField}
                                value={amount}
                                onChangeText={setAmount}
                                keyboardType="numeric"
                                placeholderTextColor={colors.textSecondary}
                            />
                        </View>

                        <View style={styles.presetButtons}>
                            {presetAmounts.map((preset) => (
                                <TouchableOpacity
                                    key={preset}
                                    style={[
                                        styles.presetButton,
                                        amount === preset.toString() && styles.presetButtonActive,
                                    ]}
                                    onPress={() => setAmount(preset.toString())}
                                >
                                    <Text style={[
                                        styles.presetText,
                                        amount === preset.toString() && styles.presetTextActive,
                                    ]}>
                                        ₱{preset.toLocaleString()}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Payment Method */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Payment Method</Text>

                        {paymentMethods.map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                style={[
                                    styles.paymentCard,
                                    selectedPayment === method.id && styles.paymentCardActive,
                                ]}
                                onPress={() => setSelectedPayment(method.id)}
                            >
                                <View style={styles.paymentLeft}>
                                    <View style={[
                                        styles.paymentIcon,
                                        { backgroundColor: method.id === 'card' ? method.iconBg : method.iconBg }
                                    ]}>
                                        {method.id === 'gcash' ? (
                                            <Text style={styles.gcashText}>GCash</Text>
                                        ) : method.id === 'maya' ? (
                                            <Text style={styles.mayaText}>Maya</Text>
                                        ) : (
                                            <MaterialIcons name={method.icon} size={20} color={method.iconColor} />
                                        )}
                                    </View>
                                    <View>
                                        <Text style={styles.paymentName}>{method.name}</Text>
                                        <Text style={styles.paymentSubtitle}>{method.subtitle}</Text>
                                    </View>
                                </View>
                                <View style={[
                                    styles.radioButton,
                                    selectedPayment === method.id && styles.radioButtonActive,
                                ]}>
                                    {selectedPayment === method.id && (
                                        <MaterialIcons name="check" size={16} color={colors.backgroundDark} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                    <TouchableOpacity style={styles.topUpButton}>
                        <Text style={styles.topUpButtonText}>
                            Top Up ₱{parseInt(amount || '0').toLocaleString()}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.secureNote}>
                        <MaterialIcons name="lock" size={14} color={colors.textSecondary} />
                        <Text style={styles.secureText}>
                            Transactions are secured and processed in PHP
                        </Text>
                    </View>
                </View>
            </SafeAreaView>

            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'home') navigation.navigate('BuyerHome');
                    if (tab === 'orders') navigation.navigate('BuyerOrders');
                    if (tab === 'profile') navigation.navigate('Profile');
                }}
                type="buyer"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundDark },
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '600', color: colors.textPrimary },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 200 },
    balanceSection: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    balanceLabel: { fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.sm },
    balanceAmount: { fontSize: 48, fontWeight: '700', color: colors.textPrimary },
    section: { marginBottom: spacing.xl },
    sectionTitle: { fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.md },
    amountInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.lg,
        height: 56,
        marginBottom: spacing.md,
    },
    currencySymbol: { fontSize: fontSize.xl, color: colors.textSecondary, marginRight: spacing.sm },
    amountField: { flex: 1, fontSize: fontSize.xl, color: colors.textPrimary, fontWeight: '600' },
    presetButtons: { flexDirection: 'row', gap: spacing.sm },
    presetButton: {
        flex: 1,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
        backgroundColor: colors.surfaceDark,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    presetButtonActive: {
        backgroundColor: 'rgba(19, 236, 109, 0.15)',
        borderColor: colors.primary,
    },
    presetText: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: '600' },
    presetTextActive: { color: colors.primary },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    paymentCardActive: {
        borderColor: colors.primary,
        backgroundColor: 'rgba(19, 236, 109, 0.08)',
    },
    paymentLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    paymentIcon: {
        width: 44,
        height: 28,
        borderRadius: borderRadius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gcashText: { fontSize: 10, fontWeight: '800', color: '#fff' },
    mayaText: { fontSize: 10, fontWeight: '800', color: '#fff' },
    paymentName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    paymentSubtitle: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: borderRadius.full,
        borderWidth: 2,
        borderColor: colors.borderDark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    bottomSection: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        paddingHorizontal: spacing.lg,
        backgroundColor: 'rgba(16, 34, 24, 0.95)',
        paddingTop: spacing.lg,
        paddingBottom: spacing.md,
    },
    topUpButton: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.lg,
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    topUpButtonText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.backgroundDark },
    secureNote: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        marginTop: spacing.md,
    },
    secureText: { fontSize: fontSize.xs, color: colors.textSecondary },
});
