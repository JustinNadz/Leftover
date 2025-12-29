import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const creditCards = [
    { id: '1', type: 'visa', last4: 'Visa ending in...', expires: 'Expires 12/25', isPrimary: true },
    { id: '2', type: 'mastercard', last4: 'Mastercard endin...', expires: 'Expires 09/26', isPrimary: false },
];

const eWallets = [
    { id: '1', provider: 'GCash', number: '(0917) ••• 1234', isLinked: true },
    { id: '2', provider: 'Maya', number: null, isLinked: false },
];

interface ManagePaymentScreenProps {
    navigation: any;
}

export const ManagePaymentScreen: React.FC<ManagePaymentScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [cashOnPickup, setCashOnPickup] = useState(true);

    const getCardColor = (type: string) => {
        if (type === 'visa') return '#1a1f71';
        if (type === 'mastercard') return '#eb001b';
        return colors.surfaceHighlight;
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Payment Methods</Text>
                    <TouchableOpacity style={styles.addBtn}>
                        <MaterialIcons name="add" size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Credit & Debit Cards */}
                    <Text style={styles.sectionTitle}>CREDIT & DEBIT CARDS</Text>
                    {creditCards.map((card) => (
                        <View key={card.id} style={styles.cardRow}>
                            <View style={[styles.cardIcon, { backgroundColor: getCardColor(card.type) }]}>
                                <Text style={styles.cardIconText}>{card.type === 'visa' ? 'VISA' : 'MC'}</Text>
                            </View>
                            <View style={styles.cardInfo}>
                                <View style={styles.cardNameRow}>
                                    <Text style={styles.cardName}>{card.last4}</Text>
                                    {card.isPrimary && (
                                        <View style={styles.primaryBadge}>
                                            <Text style={styles.primaryText}>PRIMARY</Text>
                                        </View>
                                    )}
                                </View>
                                <Text style={styles.cardExpires}>{card.expires}</Text>
                            </View>
                            <View style={styles.cardActions}>
                                <TouchableOpacity>
                                    <MaterialIcons name="edit" size={20} color={colors.textSecondary} />
                                </TouchableOpacity>
                                {!card.isPrimary && (
                                    <TouchableOpacity>
                                        <MaterialIcons name="delete" size={20} color={colors.textSecondary} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))}

                    {/* E-Wallets */}
                    <Text style={styles.sectionTitle}>E-WALLETS</Text>
                    {eWallets.map((wallet) => (
                        <View key={wallet.id} style={styles.cardRow}>
                            <View style={[styles.walletIcon, wallet.provider === 'GCash' ? styles.gcashBg : styles.mayaBg]}>
                                <Text style={styles.walletIconText}>{wallet.provider === 'GCash' ? 'GCash' : 'Maya'}</Text>
                            </View>
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardName}>{wallet.provider} {wallet.number}</Text>
                                {wallet.isLinked ? (
                                    <View style={styles.linkedRow}>
                                        <View style={styles.linkedDot} />
                                        <Text style={styles.linkedText}>Linked</Text>
                                    </View>
                                ) : (
                                    <Text style={styles.notLinkedText}>Not linked</Text>
                                )}
                            </View>
                            {wallet.isLinked ? (
                                <TouchableOpacity>
                                    <MaterialIcons name="settings" size={20} color={colors.textSecondary} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.linkBtn}>
                                    <Text style={styles.linkBtnText}>Link</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}

                    {/* Cash Options */}
                    <Text style={styles.sectionTitle}>CASH OPTIONS</Text>
                    <View style={styles.cardRow}>
                        <View style={styles.cashIcon}>
                            <MaterialIcons name="local-atm" size={24} color={colors.textPrimary} />
                        </View>
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardName}>Cash on Pickup</Text>
                            <Text style={styles.cardExpires}>Pay directly to merchant</Text>
                        </View>
                        <Switch
                            value={cashOnPickup}
                            onValueChange={setCashOnPickup}
                            trackColor={{ false: colors.surfaceHighlight, true: colors.primary + '55' }}
                            thumbColor={cashOnPickup ? colors.primary : colors.textSecondary}
                        />
                    </View>

                    {/* Security Note */}
                    <View style={styles.securityNote}>
                        <MaterialIcons name="lock" size={18} color={colors.textSecondary} />
                        <Text style={styles.securityText}>
                            Your payment information is encrypted and securely processed by Stripe.
                        </Text>
                    </View>
                </ScrollView>
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
    container: { flex: 1, backgroundColor: colors.backgroundDark },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.surfaceHighlight },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    addBtn: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    sectionTitle: { fontSize: fontSize.xs, fontWeight: '600', color: colors.textSecondary, marginTop: spacing.lg, marginBottom: spacing.md },
    cardRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.sm },
    cardIcon: { width: 48, height: 32, borderRadius: borderRadius.sm, alignItems: 'center', justifyContent: 'center' },
    cardIconText: { fontSize: 10, fontWeight: '700', color: '#fff' },
    cardInfo: { flex: 1, marginLeft: spacing.md },
    cardNameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    cardName: { fontSize: fontSize.md, fontWeight: '500', color: colors.textPrimary },
    primaryBadge: { backgroundColor: colors.surfaceHighlight, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
    primaryText: { fontSize: 8, fontWeight: '700', color: colors.textSecondary },
    cardExpires: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    cardActions: { flexDirection: 'row', gap: spacing.md },
    walletIcon: { width: 48, height: 32, borderRadius: borderRadius.sm, alignItems: 'center', justifyContent: 'center' },
    gcashBg: { backgroundColor: '#007dfe' },
    mayaBg: { backgroundColor: '#00d170' },
    walletIconText: { fontSize: 8, fontWeight: '700', color: '#fff' },
    linkedRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: 2 },
    linkedDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary },
    linkedText: { fontSize: fontSize.xs, color: colors.primary },
    notLinkedText: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    linkBtn: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.primary },
    linkBtnText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
    cashIcon: { width: 48, height: 32, backgroundColor: colors.surfaceHighlight, borderRadius: borderRadius.sm, alignItems: 'center', justifyContent: 'center' },
    securityNote: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.xl, justifyContent: 'center' },
    securityText: { fontSize: fontSize.xs, color: colors.textSecondary, textAlign: 'center' },
});
