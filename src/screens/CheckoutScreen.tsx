import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const MERCHANT_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtA0TXQgp-8ZcFnnDdbQaYbyRTa8uFvleKVU1-QgbB0c4EzcyzWDLgPGA5dE8xK6BahPsmY8e6CDPLlGJDwE7wscor-WBfQY93INZ6Yc564n8la8AzzK8va-z7KUEjIFhzCqaKTCIX0C_dsL69X4yMQn9lgwPskETwTaHS6E-JAEMnJEWdchDQLiPyIICHhYwAkYei_jxYYrc-UbZXhI0xUnYBTuQLB3g-h3nYGgcSahsOarD8-s2OdNpJA2UNHBz2cEfcx8owKMwD';

const orderItems = [
    { id: '1', name: 'Mystery Bag (Pastries)', quantity: 1, price: 4.99, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR-hBuMZnzy-zf7wEqgphKw8NTVfN5DgDoE99hdOrIoHmbupwEzOzrHMpRmM-jqG3ZXHryWXyniipk0294ybhVILc2kGLKu-todN5Bi_JboIBZ8aNgWloTQvdt2WKl84qb8SVLeoF_64_Oc2gtY73mXpw91bBlR4mlAMU6PvEGHFX1a_DZQa0vJ5ouigYMMXqMPAYI88zaEXot6xUjq8JvpEZjeHH4Ipa3S7s5CcQ9Qc6y_4JwIBrjTE5j5oLA5ap1qpNKqK4J4pVk' },
    { id: '2', name: 'Surplus Loaf', quantity: 1, price: 2.50, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkO4AmJmSk3__W3AklVco8zMmftp7mTgRbX8-NX6hG8Nk2LdAEdU0PdncW49rM35WKdg_d5XVbp-SfCH5E345KeukkX10IGksht997JyWFdsZG_oBjqOaxQThlUhnOM4L1V9GAuw3Dh1d36ADDkHfRuTbczQoMkIDcdfiC6mzY4dhAxAPbC8NO2bTyb_O7GbRdq1mATdtmzYcqr-bl_EufOKzL4fojD3-fDWg67xewuHA0EwWzX8BjnsZR2kAoTjBfwE5qXfAx8bpr' },
];

export const CheckoutScreen = ({ navigation }: { navigation: any }) => {
    const [activeTab, setActiveTab] = useState('orders');
    const subtotal = 7.49, taxesAndFees = 1.05, savings = 15.00, total = 8.54;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}><MaterialIcons name="arrow-back-ios-new" size={20} color={colors.textPrimary} /></TouchableOpacity>
                    <Text style={styles.headerTitle}>Checkout</Text>
                    <View style={{ width: 40 }} />
                </View>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.merchantCard}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.merchantBadge}><MaterialIcons name="storefront" size={14} color={colors.primary} /><Text style={styles.merchantLabel}>MERCHANT</Text></View>
                            <Text style={styles.merchantName}>Joe's Bagel Shop</Text>
                            <View style={styles.merchantMeta}><MaterialIcons name="star" size={14} color="#f59e0b" /><Text style={styles.rating}>4.8</Text><Text style={styles.reviewCount}>(120+)</Text></View>
                            <View style={styles.pickupRow}><MaterialIcons name="schedule" size={14} color={colors.textSecondary} /><Text style={styles.pickupText}>Pick up today 4:00 - 5:00 PM</Text></View>
                        </View>
                        <Image source={{ uri: MERCHANT_IMAGE }} style={styles.merchantImage} />
                    </View>
                    <View style={styles.section}><Text style={styles.sectionTitle}>Your Order</Text>
                        {orderItems.map((item) => (
                            <View key={item.id} style={styles.orderItem}>
                                <View style={styles.orderItemLeft}><Image source={{ uri: item.imageUrl }} style={styles.orderItemImage} /><View><Text style={styles.orderItemName}>{item.name}</Text><Text style={styles.orderItemQuantity}>x{item.quantity}</Text></View></View>
                                <Text style={styles.orderItemPrice}>${item.price.toFixed(2)}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.section}><Text style={styles.sectionTitle}>Payment Method</Text>
                        <TouchableOpacity style={styles.paymentCard}><View style={styles.paymentLeft}><View style={styles.paymentIcon}><MaterialIcons name="contactless" size={20} color="#fff" /></View><View><Text style={styles.paymentName}>Apple Pay</Text><Text style={styles.paymentDefault}>Default</Text></View></View><Text style={styles.paymentChange}>Change</Text></TouchableOpacity>
                    </View>
                    <View style={styles.priceCard}>
                        <View style={styles.priceRow}><Text style={styles.priceLabel}>Subtotal</Text><Text style={styles.priceValue}>${subtotal.toFixed(2)}</Text></View>
                        <View style={styles.priceRow}><Text style={styles.priceLabel}>Taxes & Fees</Text><Text style={styles.priceValue}>${taxesAndFees.toFixed(2)}</Text></View>
                        <View style={styles.savingsRow}><View style={styles.savingsLeft}><MaterialIcons name="savings" size={18} color={colors.primary} /><Text style={styles.savingsLabel}>You Saved</Text></View><Text style={styles.savingsValue}>${savings.toFixed(2)}</Text></View>
                        <View style={styles.divider} />
                        <View style={styles.totalRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>${total.toFixed(2)}</Text></View>
                        <View style={styles.co2Badge}><MaterialIcons name="eco" size={14} color={colors.primary} /><Text style={styles.co2Text}>1.5kg CO2e saved with this order</Text></View>
                    </View>
                </ScrollView>
                <View style={styles.placeOrderContainer}><TouchableOpacity style={styles.placeOrderButton} onPress={() => navigation.navigate('BuyerHome')}><Text style={styles.placeOrderText}>Place Order</Text><View style={styles.placeOrderRight}><Text style={styles.placeOrderPrice}>${total.toFixed(2)}</Text><MaterialIcons name="arrow-forward" size={20} color={colors.backgroundDark} /></View></TouchableOpacity></View>
            </SafeAreaView>
            <BottomNav activeTab={activeTab} onTabPress={(tab) => { setActiveTab(tab); if (tab === 'home') navigation.navigate('BuyerHome'); }} type="buyer" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundDark },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 200 },
    merchantCard: { flexDirection: 'row', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)', marginBottom: spacing.lg },
    merchantBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.sm },
    merchantLabel: { fontSize: fontSize.xs, fontWeight: '600', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
    merchantName: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.sm },
    merchantMeta: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    rating: { fontSize: fontSize.xs, fontWeight: '500', color: colors.textPrimary },
    reviewCount: { fontSize: fontSize.xs, color: colors.textSecondary },
    pickupRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
    pickupText: { fontSize: fontSize.sm, color: colors.textSecondary },
    merchantImage: { width: 96, height: 96, borderRadius: borderRadius.md },
    section: { marginBottom: spacing.lg },
    sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
    orderItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md },
    orderItemLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    orderItemImage: { width: 48, height: 48, borderRadius: borderRadius.md },
    orderItemName: { fontSize: fontSize.md, fontWeight: '500', color: colors.textPrimary },
    orderItemQuantity: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: spacing.xs },
    orderItemPrice: { fontSize: fontSize.md, fontWeight: '500', color: colors.textPrimary },
    paymentCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg },
    paymentLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    paymentIcon: { width: 40, height: 24, backgroundColor: '#000', borderRadius: borderRadius.sm, alignItems: 'center', justifyContent: 'center' },
    paymentName: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textPrimary },
    paymentDefault: { fontSize: fontSize.xs, color: colors.textSecondary },
    paymentChange: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
    priceCard: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm },
    priceLabel: { fontSize: fontSize.sm, color: colors.textSecondary },
    priceValue: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textPrimary },
    savingsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.1)', marginTop: spacing.sm },
    savingsLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    savingsLabel: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
    savingsValue: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
    divider: { height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', marginVertical: spacing.sm },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm },
    totalLabel: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    totalValue: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    co2Badge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.lg, backgroundColor: 'rgba(19, 236, 109, 0.1)', borderWidth: 1, borderColor: colors.primary + '33', borderRadius: borderRadius.full, paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
    co2Text: { fontSize: fontSize.xs, fontWeight: '500', color: colors.primary },
    placeOrderContainer: { position: 'absolute', bottom: 84, left: 0, right: 0, padding: spacing.lg, backgroundColor: 'rgba(16, 34, 24, 0.9)' },
    placeOrderButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.primary, borderRadius: borderRadius.lg, paddingVertical: spacing.lg, paddingHorizontal: spacing.xl, shadowColor: colors.primary, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 8 },
    placeOrderText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.backgroundDark },
    placeOrderRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    placeOrderPrice: { fontSize: fontSize.md, fontWeight: '700', color: colors.backgroundDark },
});
