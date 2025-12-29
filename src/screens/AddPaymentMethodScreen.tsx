import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

interface AddPaymentMethodScreenProps {
    navigation: any;
}

export const AddPaymentMethodScreen: React.FC<AddPaymentMethodScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [paymentType, setPaymentType] = useState<'Card' | 'E-Wallet'>('Card');
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [saveCard, setSaveCard] = useState(true);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add Payment Method</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Payment Type Toggle */}
                    <View style={styles.toggleContainer}>
                        {(['Card', 'E-Wallet'] as const).map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[styles.toggleBtn, paymentType === type && styles.toggleBtnActive]}
                                onPress={() => setPaymentType(type)}
                            >
                                <MaterialIcons
                                    name={type === 'Card' ? 'credit-card' : 'account-balance-wallet'}
                                    size={18}
                                    color={paymentType === type ? colors.backgroundDark : colors.textSecondary}
                                />
                                <Text style={[styles.toggleText, paymentType === type && styles.toggleTextActive]}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Card Preview */}
                    <View style={styles.cardPreview}>
                        <View style={styles.cardChip}>
                            <View style={styles.chipGold} />
                        </View>
                        <Text style={styles.cardNumberDisplay}>
                            {cardNumber ? cardNumber.replace(/(.{4})/g, '$1 ').trim() : '•••• •••• •••• 1234'}
                        </Text>
                        <View style={styles.cardBottom}>
                            <View>
                                <Text style={styles.cardLabel}>CARD HOLDER</Text>
                                <Text style={styles.cardHolderDisplay}>{cardHolder || 'JUAN DELA CRUZ'}</Text>
                            </View>
                            <View style={styles.cardLogoContainer}>
                                <View style={styles.cardLogo} />
                            </View>
                        </View>
                    </View>

                    {/* Form Fields */}
                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Card Number</Text>
                            <View style={styles.inputContainer}>
                                <MaterialIcons name="credit-card" size={20} color={colors.textSecondary} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="0000 0000 0000 0000"
                                    placeholderTextColor={colors.placeholderGreen}
                                    value={cardNumber}
                                    onChangeText={setCardNumber}
                                    keyboardType="numeric"
                                    maxLength={16}
                                />
                                <View style={styles.visaBadge}><Text style={styles.visaText}>VISA</Text></View>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Cardholder Name</Text>
                            <View style={styles.inputContainer}>
                                <MaterialIcons name="person" size={20} color={colors.textSecondary} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Juan dela Cruz"
                                    placeholderTextColor={colors.placeholderGreen}
                                    value={cardHolder}
                                    onChangeText={setCardHolder}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.inputLabel}>Expiry Date</Text>
                                <View style={styles.inputContainer}>
                                    <MaterialIcons name="event" size={20} color={colors.textSecondary} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="MM/YY"
                                        placeholderTextColor={colors.placeholderGreen}
                                        value={expiryDate}
                                        onChangeText={setExpiryDate}
                                        maxLength={5}
                                    />
                                </View>
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.inputLabel}>CVV</Text>
                                <View style={styles.inputContainer}>
                                    <MaterialIcons name="lock" size={20} color={colors.textSecondary} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="123"
                                        placeholderTextColor={colors.placeholderGreen}
                                        value={cvv}
                                        onChangeText={setCvv}
                                        keyboardType="numeric"
                                        maxLength={4}
                                        secureTextEntry
                                    />
                                    <MaterialIcons name="help-outline" size={18} color={colors.primary} />
                                </View>
                            </View>
                        </View>

                        <View style={styles.saveRow}>
                            <View>
                                <Text style={styles.saveTitle}>Save this card securely</Text>
                                <Text style={styles.saveSubtitle}>For faster checkout next time</Text>
                            </View>
                            <Switch
                                value={saveCard}
                                onValueChange={setSaveCard}
                                trackColor={{ false: colors.surfaceHighlight, true: colors.primary + '55' }}
                                thumbColor={saveCard ? colors.primary : colors.textSecondary}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.submitText}>Add Payment Method</Text>
                    </TouchableOpacity>
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
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    toggleContainer: { flexDirection: 'row', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.xs, marginBottom: spacing.xl },
    toggleBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md, borderRadius: borderRadius.md },
    toggleBtnActive: { backgroundColor: colors.primary },
    toggleText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textSecondary },
    toggleTextActive: { color: colors.backgroundDark },
    cardPreview: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.xl, padding: spacing.xl, marginBottom: spacing.xl, borderWidth: 1, borderColor: colors.primary + '33' },
    cardChip: { alignSelf: 'flex-end', marginBottom: spacing.xl },
    chipGold: { width: 40, height: 30, backgroundColor: '#fbbf24', borderRadius: borderRadius.sm },
    cardNumberDisplay: { fontSize: 22, fontWeight: '600', color: colors.textPrimary, letterSpacing: 2 },
    cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: spacing.xl },
    cardLabel: { fontSize: fontSize.xs, color: colors.textSecondary, letterSpacing: 1 },
    cardHolderDisplay: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary, marginTop: spacing.xs },
    cardLogoContainer: { flexDirection: 'row', alignItems: 'center' },
    cardLogo: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.2)' },
    form: { marginBottom: spacing.lg },
    inputGroup: { marginBottom: spacing.lg },
    inputLabel: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary, marginBottom: spacing.sm },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.inputDark, borderRadius: borderRadius.md, paddingHorizontal: spacing.lg, height: 56 },
    input: { flex: 1, fontSize: fontSize.md, color: colors.textPrimary, marginLeft: spacing.md },
    visaBadge: { backgroundColor: colors.surfaceHighlight, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
    visaText: { fontSize: 10, fontWeight: '700', color: colors.textSecondary },
    row: { flexDirection: 'row', gap: spacing.md },
    saveRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surfaceDark, padding: spacing.lg, borderRadius: borderRadius.lg },
    saveTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    saveSubtitle: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
    submitButton: { backgroundColor: colors.primary, borderRadius: borderRadius.lg, height: 56, alignItems: 'center', justifyContent: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
    submitText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.backgroundDark },
});
