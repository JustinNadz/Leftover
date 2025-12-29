import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, fontSize, borderRadius } from '../theme';

interface PartnerRegistrationScreenProps {
    navigation: any;
}

export const PartnerRegistrationScreen: React.FC<PartnerRegistrationScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [storeName, setStoreName] = useState('');
    const [category, setCategory] = useState('');
    const [legalClassification, setLegalClassification] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [payoutMethod, setPayoutMethod] = useState<'ewallet' | 'bank'>('ewallet');
    const [providerBank, setProviderBank] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const renderSection = (number: string, title: string, children: React.ReactNode) => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionNumber}>
                    <Text style={styles.sectionNumberText}>{number}</Text>
                </View>
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>
            {children}
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>Partner Registration</Text>
                        <Text style={styles.headerSubtitle}>Step 1 of 5</Text>
                    </View>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.mainTitle}>Create your Merchant Account</Text>
                    <Text style={styles.mainSubtitle}>
                        Join the movement to reduce food waste in the Philippines. Complete the steps below to get approved.
                    </Text>

                    {renderSection('01', 'Account Credentials', (
                        <>
                            <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
                            <TextInput style={styles.input} placeholder="partner@business.com" placeholderTextColor={colors.placeholderGreen} value={email} onChangeText={setEmail} keyboardType="email-address" />
                            <Text style={styles.inputLabel}>PASSWORD</Text>
                            <View style={styles.passwordRow}>
                                <TextInput style={[styles.input, styles.passwordInput]} placeholder="••••••••" placeholderTextColor={colors.placeholderGreen} value={password} onChangeText={setPassword} secureTextEntry />
                                <TextInput style={[styles.input, styles.passwordInput]} placeholder="CONFIRM" placeholderTextColor={colors.placeholderGreen} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
                            </View>
                        </>
                    ))}

                    {renderSection('02', 'Business Profile', (
                        <>
                            <Text style={styles.inputLabel}>STORE NAME</Text>
                            <TextInput style={styles.input} placeholder="e.g. Mama Lena's Eatery" placeholderTextColor={colors.placeholderGreen} value={storeName} onChangeText={setStoreName} />
                            <View style={styles.row}>
                                <View style={styles.halfInput}>
                                    <Text style={styles.inputLabel}>CATEGORY</Text>
                                    <TouchableOpacity style={styles.selectInput}>
                                        <Text style={styles.selectText}>{category || 'Select'}</Text>
                                        <MaterialIcons name="expand-more" size={20} color={colors.textSecondary} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.halfInput}>
                                    <Text style={styles.inputLabel}>SIZE</Text>
                                    <TouchableOpacity style={styles.selectInput}>
                                        <Text style={styles.selectText}>e.g. 10sqm</Text>
                                        <MaterialIcons name="expand-more" size={20} color={colors.textSecondary} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={styles.inputLabel}>OPERATING HOURS</Text>
                            <View style={styles.row}>
                                <TouchableOpacity style={[styles.selectInput, styles.halfInput]}>
                                    <Text style={styles.selectText}>09:00 AM</Text>
                                    <MaterialIcons name="schedule" size={18} color={colors.textSecondary} />
                                </TouchableOpacity>
                                <Text style={styles.toText}>to</Text>
                                <TouchableOpacity style={[styles.selectInput, styles.halfInput]}>
                                    <Text style={styles.selectText}>09:00 PM</Text>
                                    <MaterialIcons name="schedule" size={18} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>
                        </>
                    ))}

                    {renderSection('03', 'Legal Compliance', (
                        <>
                            <Text style={styles.inputLabel}>LEGAL CLASSIFICATION</Text>
                            <TouchableOpacity style={styles.selectInput}>
                                <Text style={styles.selectText}>{legalClassification || 'Select Classification'}</Text>
                                <MaterialIcons name="expand-more" size={20} color={colors.textSecondary} />
                            </TouchableOpacity>
                            <View style={styles.uploadRow}>
                                <TouchableOpacity style={styles.uploadBox}>
                                    <MaterialIcons name="cloud-upload" size={24} color={colors.primary} />
                                    <Text style={styles.uploadText}>DTI / SEC Certificate</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.uploadBox}>
                                    <MaterialIcons name="cloud-upload" size={24} color={colors.primary} />
                                    <Text style={styles.uploadText}>BIR Form 2303</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ))}

                    {renderSection('04', 'Location & Contact', (
                        <>
                            <View style={styles.mapPlaceholder}>
                                <TouchableOpacity style={styles.setPinBtn}>
                                    <MaterialIcons name="add-location" size={18} color={colors.backgroundDark} />
                                    <Text style={styles.setPinText}>Set Pin</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.row}>
                                <TextInput style={[styles.input, styles.thirdInput]} placeholder="Barangay" placeholderTextColor={colors.placeholderGreen} />
                                <TextInput style={[styles.input, styles.thirdInput]} placeholder="Street" placeholderTextColor={colors.placeholderGreen} />
                                <TextInput style={[styles.input, styles.thirdInput]} placeholder="City / Municipality" placeholderTextColor={colors.placeholderGreen} />
                            </View>
                            <Text style={styles.inputLabel}>CONTACT PERSON</Text>
                            <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor={colors.placeholderGreen} value={fullName} onChangeText={setFullName} />
                            <Text style={styles.inputLabel}>MOBILE NUMBER</Text>
                            <View style={styles.phoneRow}>
                                <View style={styles.countryCode}>
                                    <Text style={styles.countryCodeText}>🇵🇭 +63</Text>
                                </View>
                                <TextInput style={[styles.input, styles.phoneInput]} placeholder="9XX XXX XXXX" placeholderTextColor={colors.placeholderGreen} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                            </View>
                        </>
                    ))}

                    {renderSection('05', 'Payout Details', (
                        <>
                            <View style={styles.payoutToggle}>
                                <TouchableOpacity style={[styles.payoutOption, payoutMethod === 'ewallet' && styles.payoutOptionActive]} onPress={() => setPayoutMethod('ewallet')}>
                                    <MaterialIcons name="account-balance-wallet" size={18} color={payoutMethod === 'ewallet' ? colors.backgroundDark : colors.textSecondary} />
                                    <Text style={[styles.payoutText, payoutMethod === 'ewallet' && styles.payoutTextActive]}>E-Wallet</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.payoutOption, payoutMethod === 'bank' && styles.payoutOptionActive]} onPress={() => setPayoutMethod('bank')}>
                                    <MaterialIcons name="account-balance" size={18} color={payoutMethod === 'bank' ? colors.backgroundDark : colors.textSecondary} />
                                    <Text style={[styles.payoutText, payoutMethod === 'bank' && styles.payoutTextActive]}>Bank Transfer</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.inputLabel}>PROVIDER / BANK</Text>
                            <TextInput style={styles.input} placeholder="GCash" placeholderTextColor={colors.placeholderGreen} value={providerBank} onChangeText={setProviderBank} />
                            <Text style={styles.inputLabel}>ACCOUNT NAME</Text>
                            <TextInput style={styles.input} placeholder="Account Name" placeholderTextColor={colors.placeholderGreen} value={accountName} onChangeText={setAccountName} />
                            <Text style={styles.inputLabel}>ACCOUNT NUMBER</Text>
                            <TextInput style={styles.input} placeholder="Account Number" placeholderTextColor={colors.placeholderGreen} value={accountNumber} onChangeText={setAccountNumber} keyboardType="number-pad" />
                        </>
                    ))}

                    {/* Terms */}
                    <View style={styles.termsRow}>
                        <Switch value={acceptTerms} onValueChange={setAcceptTerms} trackColor={{ false: colors.surfaceHighlight, true: colors.primary + '55' }} thumbColor={acceptTerms ? colors.primary : colors.textSecondary} />
                        <Text style={styles.termsText}>
                            I have read the information above and accept the Terms of Service and Privacy Policy.
                        </Text>
                    </View>
                </ScrollView>

                {/* Submit Button */}
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit for Approval</Text>
                        <MaterialIcons name="check" size={20} color={colors.backgroundDark} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundDark },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.surfaceHighlight },
    headerCenter: { alignItems: 'center' },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    headerSubtitle: { fontSize: fontSize.sm, color: colors.primary },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    mainTitle: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.sm },
    mainSubtitle: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 20, marginBottom: spacing.xl },
    section: { marginBottom: spacing.xl, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.lg },
    sectionNumber: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
    sectionNumberText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.backgroundDark },
    sectionTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    inputLabel: { fontSize: fontSize.xs, fontWeight: '600', color: colors.textSecondary, marginBottom: spacing.xs, marginTop: spacing.md },
    input: { backgroundColor: colors.inputDark, borderRadius: borderRadius.md, height: 48, paddingHorizontal: spacing.lg, color: colors.textPrimary, fontSize: fontSize.md },
    passwordRow: { flexDirection: 'row', gap: spacing.sm },
    passwordInput: { flex: 1 },
    row: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
    halfInput: { flex: 1 },
    thirdInput: { flex: 1 },
    selectInput: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.inputDark, borderRadius: borderRadius.md, height: 48, paddingHorizontal: spacing.lg },
    selectText: { fontSize: fontSize.md, color: colors.textSecondary },
    toText: { fontSize: fontSize.sm, color: colors.textSecondary },
    uploadRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
    uploadBox: { flex: 1, height: 80, backgroundColor: colors.inputDark, borderRadius: borderRadius.md, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.primary + '44', borderStyle: 'dashed' },
    uploadText: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: spacing.xs, textAlign: 'center' },
    mapPlaceholder: { height: 120, backgroundColor: colors.inputDark, borderRadius: borderRadius.md, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
    setPinBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full },
    setPinText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.backgroundDark },
    phoneRow: { flexDirection: 'row', gap: spacing.sm },
    countryCode: { backgroundColor: colors.inputDark, borderRadius: borderRadius.md, height: 48, paddingHorizontal: spacing.lg, justifyContent: 'center' },
    countryCodeText: { fontSize: fontSize.md, color: colors.textPrimary },
    phoneInput: { flex: 1 },
    payoutToggle: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
    payoutOption: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, height: 44, backgroundColor: colors.inputDark, borderRadius: borderRadius.md },
    payoutOptionActive: { backgroundColor: colors.primary },
    payoutText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary },
    payoutTextActive: { color: colors.backgroundDark },
    termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md, marginTop: spacing.lg },
    termsText: { flex: 1, fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 18 },
    bottomContainer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.surfaceHighlight },
    submitButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.primary, borderRadius: borderRadius.lg, height: 56 },
    submitButtonText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.backgroundDark },
});
