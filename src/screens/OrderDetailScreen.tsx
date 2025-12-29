import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav, Button } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const BUYER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHMLxUXi0vOvWtx60JlhXNsWI-9QjydJS8l8yXmMoe96cuJBb0Hn0JF4W-To09wL0pxZiZGnAZrpX00wvJ2yLATIyj_lU7sY1msrYBqoE0fBppCHFYw727SxgOOQaTxaLBjpgaM5gXid5yi904FGU4_33FnGxjfjNIlIYWuFg77jZwSUceQxBOi02s9BVTJzzU27CMb1TytFGTgTuqZ5MnaGVjeLpOg6FAMhB04bnwtWL5JHgzLC-q52wZ8sCcTmBRmkdaiybqQZcQ';

const orderItems = [
    { id: '1', name: 'Late Night Surprise Bag', description: 'Contains assorted pastries and sandwiches.', quantity: 2, price: 8.00 },
    { id: '2', name: 'Surplus Bread Loaf', description: 'Whole wheat, sliced.', quantity: 1, price: 1.50 },
];

export const OrderDetailScreen = ({ navigation }: { navigation: any }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const subtotal = 9.50, serviceFee = 0.50, totalPayout = 9.00;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}><MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} /></TouchableOpacity>
                    <Text style={styles.headerTitle}>Order #8492</Text>
                    <TouchableOpacity><Text style={styles.helpBtn}>Help</Text></TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.statusSection}>
                        <View style={styles.statusRow}>
                            <View style={styles.statusBadge}><MaterialIcons name="hourglass-top" size={16} color={colors.primary} /><Text style={styles.statusText}>Pending Action</Text></View>
                            <Text style={styles.placedAt}>Placed at 14:20</Text>
                        </View>
                        <View style={styles.pickupCard}>
                            <View><Text style={styles.pickupLabel}>PICKUP WINDOW</Text><Text style={styles.pickupTime}>17:30 - 18:00</Text><Text style={styles.pickupDate}>Today, Oct 24</Text></View>
                            <View style={styles.pickupIcon}><MaterialIcons name="schedule" size={24} color={colors.primary} /></View>
                        </View>
                    </View>

                    <View style={styles.section}><Text style={styles.sectionTitle}>Buyer</Text>
                        <View style={styles.buyerCard}>
                            <View style={styles.buyerInfo}><Text style={styles.buyerName}>Alice M.</Text><Text style={styles.buyerRating}>4.9 ★ (24 orders)</Text><TouchableOpacity style={styles.contactBtn}><MaterialIcons name="call" size={16} color={colors.textPrimary} /><Text style={styles.contactText}>Contact</Text></TouchableOpacity></View>
                            <Image source={{ uri: BUYER_AVATAR }} style={styles.buyerAvatar} />
                        </View>
                    </View>

                    <View style={styles.section}><Text style={styles.sectionTitle}>Order Contents</Text>
                        <View style={styles.orderCard}>
                            {orderItems.map((item, index) => (
                                <View key={item.id} style={[styles.orderItem, index < orderItems.length - 1 && styles.orderItemBorder]}>
                                    <View style={styles.quantityBadge}><Text style={styles.quantityText}>{item.quantity}x</Text></View>
                                    <View style={styles.orderItemContent}><View style={styles.orderItemHeader}><Text style={styles.orderItemName}>{item.name}</Text><Text style={styles.orderItemPrice}>${item.price.toFixed(2)}</Text></View><Text style={styles.orderItemDesc}>{item.description}</Text></View>
                                </View>
                            ))}
                            <View style={styles.summarySection}>
                                <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text></View>
                                <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Service Fee (Merchant)</Text><Text style={styles.summaryValue}>-${serviceFee.toFixed(2)}</Text></View>
                                <View style={styles.divider} />
                                <View style={styles.payoutRow}><Text style={styles.payoutLabel}>Total Payout</Text><Text style={styles.payoutValue}>${totalPayout.toFixed(2)}</Text></View>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('MerchantDashboard')}><Text style={styles.confirmText}>Confirm Order</Text></TouchableOpacity>
                    <Text style={styles.confirmHint}>Confirming notifies Alice that the order is ready.</Text>
                </ScrollView>
            </SafeAreaView>
            <BottomNav activeTab={activeTab} onTabPress={(tab) => { setActiveTab(tab); if (tab === 'dashboard') navigation.navigate('MerchantDashboard'); }} type="merchant" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundDark },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    helpBtn: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    statusSection: { marginBottom: spacing.lg },
    statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
    statusBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surfaceHighlight, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full },
    statusText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
    placedAt: { fontSize: fontSize.sm, color: colors.textSecondary },
    pickupCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.surfaceHighlight },
    pickupLabel: { fontSize: fontSize.xs, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
    pickupTime: { fontSize: fontSize.xl, fontWeight: '700', color: colors.textPrimary },
    pickupDate: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
    pickupIcon: { width: 40, height: 40, borderRadius: borderRadius.full, backgroundColor: colors.surfaceHighlight, alignItems: 'center', justifyContent: 'center' },
    section: { marginBottom: spacing.lg },
    sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
    buyerCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.surfaceHighlight },
    buyerInfo: { flex: 1 },
    buyerName: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    buyerRating: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
    contactBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surfaceHighlight, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md, marginTop: spacing.md, alignSelf: 'flex-start' },
    contactText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textPrimary },
    buyerAvatar: { width: 80, height: 80, borderRadius: borderRadius.full, borderWidth: 2, borderColor: colors.surfaceHighlight },
    orderCard: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.surfaceHighlight },
    orderItem: { flexDirection: 'row', padding: spacing.lg, gap: spacing.md },
    orderItemBorder: { borderBottomWidth: 1, borderBottomColor: colors.surfaceHighlight },
    quantityBadge: { backgroundColor: colors.surfaceHighlight, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm, height: 32, alignItems: 'center', justifyContent: 'center' },
    quantityText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.textPrimary },
    orderItemContent: { flex: 1 },
    orderItemHeader: { flexDirection: 'row', justifyContent: 'space-between' },
    orderItemName: { fontSize: fontSize.md, fontWeight: '700', color: colors.textPrimary },
    orderItemPrice: { fontSize: fontSize.md, fontWeight: '700', color: colors.textPrimary },
    orderItemDesc: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
    summarySection: { backgroundColor: 'rgba(21, 43, 32, 1)', padding: spacing.lg },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
    summaryLabel: { fontSize: fontSize.sm, color: colors.textSecondary },
    summaryValue: { fontSize: fontSize.sm, color: colors.textPrimary },
    divider: { height: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)', marginVertical: spacing.sm },
    payoutRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
    payoutLabel: { fontSize: fontSize.lg, fontWeight: '700', color: colors.primary },
    payoutValue: { fontSize: fontSize.xl, fontWeight: '700', color: colors.primary },
    confirmButton: { height: 56, backgroundColor: colors.primary, borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center', marginTop: spacing.lg, shadowColor: colors.primary, shadowOpacity: 0.3, shadowRadius: 15, elevation: 8 },
    confirmText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.backgroundDark },
    confirmHint: { fontSize: fontSize.xs, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.md },
});
