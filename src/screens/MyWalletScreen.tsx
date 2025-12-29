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
import { LinearGradient } from 'expo-linear-gradient';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

interface Transaction {
    id: string;
    title: string;
    date: string;
    amount: number;
    type: 'expense' | 'refund' | 'topup' | 'reward';
    icon: keyof typeof MaterialIcons.glyphMap;
}

const transactions: Transaction[] = [
    { id: '1', title: 'Jollibee Surplus', date: 'Yesterday, 6:30 PM', amount: -120.00, type: 'expense', icon: 'restaurant' },
    { id: '2', title: 'Refund: Starbucks', date: 'Oct 24, 2:15 PM', amount: 80.00, type: 'refund', icon: 'sync' },
    { id: '3', title: 'Top-up via GCash', date: 'Oct 20, 9:00 AM', amount: 500.00, type: 'topup', icon: 'add-circle' },
    { id: '4', title: 'Eco-Warrior Reward', date: 'Oct 15, 12:00 PM', amount: 15.00, type: 'reward', icon: 'eco' },
    { id: '5', title: 'Krispy Kreme', date: 'Oct 12, 5:45 PM', amount: -250.00, type: 'expense', icon: 'restaurant' },
];

interface MyWalletScreenProps {
    navigation: any;
}

export const MyWalletScreen: React.FC<MyWalletScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('wallet');
    const balance = 450.00;
    const rewardPoints = 1250;

    const getAmountColor = (type: Transaction['type']) => {
        if (type === 'expense') return colors.textPrimary;
        return colors.primary;
    };

    const getAmountPrefix = (amount: number) => {
        return amount >= 0 ? '+ ₱' : '- ₱';
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Wallet</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="help-outline" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Balance Card */}
                    <LinearGradient
                        colors={['#1a4d2e', '#0d2818']}
                        style={styles.balanceCard}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View style={styles.balanceHeader}>
                            <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
                            <View style={styles.walletIcon}>
                                <MaterialIcons name="account-balance-wallet" size={16} color={colors.primary} />
                            </View>
                        </View>
                        <Text style={styles.balanceAmount}>₱{balance.toFixed(2)}</Text>

                        <View style={styles.rewardRow}>
                            <View>
                                <Text style={styles.rewardLabel}>Reward Points</Text>
                                <View style={styles.rewardValue}>
                                    <Text style={styles.rewardPoints}>{rewardPoints.toLocaleString()}</Text>
                                    <MaterialIcons name="stars" size={14} color="#fbbf24" />
                                </View>
                            </View>
                            <View style={styles.activeBadge}>
                                <Text style={styles.activeText}>Active</Text>
                            </View>
                        </View>
                    </LinearGradient>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.topUpButton}
                            onPress={() => navigation.navigate('TopUp')}
                        >
                            <MaterialIcons name="account-balance-wallet" size={18} color={colors.backgroundDark} />
                            <Text style={styles.topUpText}>Top-Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.withdrawButton}>
                            <MaterialIcons name="north-east" size={18} color={colors.textPrimary} />
                            <Text style={styles.withdrawText}>Withdraw</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Info Card */}
                    <View style={styles.infoCard}>
                        <View style={styles.infoIcon}>
                            <MaterialIcons name="info" size={20} color={colors.primary} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoTitle}>How Credits Work</Text>
                            <Text style={styles.infoText}>
                                Credits are earned from refunds or eco-loyalty rewards. Use them automatically at checkout to save on your surplus food orders.
                            </Text>
                        </View>
                    </View>

                    {/* Recent Transactions */}
                    <View style={styles.transactionsSection}>
                        <View style={styles.transactionsHeader}>
                            <Text style={styles.transactionsTitle}>Recent Transactions</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>See All</Text>
                            </TouchableOpacity>
                        </View>

                        {transactions.map((transaction) => (
                            <View key={transaction.id} style={styles.transactionItem}>
                                <View style={styles.transactionLeft}>
                                    <View style={[
                                        styles.transactionIcon,
                                        {
                                            backgroundColor: transaction.type === 'reward'
                                                ? 'rgba(251, 191, 36, 0.2)'
                                                : transaction.type === 'topup'
                                                    ? 'rgba(19, 236, 109, 0.2)'
                                                    : transaction.type === 'refund'
                                                        ? 'rgba(59, 130, 246, 0.2)'
                                                        : 'rgba(255, 255, 255, 0.1)'
                                        }
                                    ]}>
                                        <MaterialIcons
                                            name={transaction.icon}
                                            size={20}
                                            color={
                                                transaction.type === 'reward'
                                                    ? '#fbbf24'
                                                    : transaction.type === 'topup' || transaction.type === 'refund'
                                                        ? colors.primary
                                                        : colors.textSecondary
                                            }
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.transactionTitle}>{transaction.title}</Text>
                                        <Text style={styles.transactionDate}>{transaction.date}</Text>
                                    </View>
                                </View>
                                <Text style={[
                                    styles.transactionAmount,
                                    { color: getAmountColor(transaction.type) }
                                ]}>
                                    {getAmountPrefix(transaction.amount)} {Math.abs(transaction.amount).toFixed(2)}
                                </Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
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
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    balanceCard: {
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        borderWidth: 1,
        borderColor: colors.borderDark,
    },
    balanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    balanceLabel: { fontSize: fontSize.xs, fontWeight: '600', color: colors.textSecondary, letterSpacing: 1 },
    walletIcon: {
        width: 32,
        height: 32,
        borderRadius: borderRadius.md,
        backgroundColor: 'rgba(19, 236, 109, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    balanceAmount: { fontSize: 40, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.lg },
    rewardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    rewardLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginBottom: spacing.xs },
    rewardValue: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    rewardPoints: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    activeBadge: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    activeText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.backgroundDark },
    actionButtons: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: spacing.lg,
    },
    topUpButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        backgroundColor: colors.primary,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.md,
    },
    topUpText: { fontSize: fontSize.md, fontWeight: '700', color: colors.backgroundDark },
    withdrawButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderDark,
    },
    withdrawText: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginTop: spacing.lg,
        gap: spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    infoIcon: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.full,
        backgroundColor: 'rgba(19, 236, 109, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContent: { flex: 1 },
    infoTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.xs },
    infoText: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 20 },
    transactionsSection: { marginTop: spacing.xl },
    transactionsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    transactionsTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    seeAll: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
    },
    transactionLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    transactionIcon: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    transactionTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    transactionDate: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    transactionAmount: { fontSize: fontSize.md, fontWeight: '600' },
});
