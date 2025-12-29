import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const categories = ['Restaurant', 'Bakery', 'Grocery', 'Cafe', 'Other'];

interface MerchantRegistrationScreenProps {
    navigation: any;
}

export const MerchantRegistrationScreen: React.FC<MerchantRegistrationScreenProps> = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const [storeName, setStoreName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [mobile, setMobile] = useState('');
    const [payoutMethod, setPayoutMethod] = useState<'gcash' | 'bank'>('gcash');
    const [accountNumber, setAccountNumber] = useState('');

    const progress = (step / 4) * 100;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Merchant Registration</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressInfo}>
                        <Text style={styles.stepText}>Step {step} of 4</Text>
                        <Text style={styles.progressPercent}>{Math.round(progress)}% Completed</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {step === 1 && (
                        <>
                            <Text style={styles.sectionTitle}>Let's get your store set up</Text>
                            <Text style={styles.sectionSubtitle}>Fill in your business details to start selling surplus food.</Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Store Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="e.g. Mama Leni's Bakeshop"
                                    placeholderTextColor={colors.placeholderGreen}
                                    value={storeName}
                                    onChangeText={setStoreName}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Business Type</Text>
                                <TouchableOpacity style={styles.selectInput}>
                                    <Text style={businessType ? styles.selectValue : styles.selectPlaceholder}>
                                        {businessType || 'Select category'}
                                    </Text>
                                    <MaterialIcons name="expand-more" size={24} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Store Logo / Permit</Text>
                                <TouchableOpacity style={styles.imageUploader}>
                                    <MaterialIcons name="cloud-upload" size={32} color={colors.primary} />
                                    <Text style={styles.uploadHint}>Click to upload or drag and drop</Text>
                                    <Text style={styles.uploadSubhint}>PNG, JPG up to 5MB</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <Text style={styles.sectionTitle}>Location & Contact</Text>

                            <TouchableOpacity style={styles.pinButton}>
                                <MaterialIcons name="location-on" size={20} color={colors.textPrimary} />
                                <Text style={styles.pinButtonText}>Pin Location</Text>
                            </TouchableOpacity>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Street Address</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="1345, Building, Street"
                                    placeholderTextColor={colors.placeholderGreen}
                                    value={address}
                                    onChangeText={setAddress}
                                />
                            </View>

                            <View style={styles.row}>
                                <View style={[styles.inputGroup, { flex: 1 }]}>
                                    <Text style={styles.inputLabel}>Barangay</Text>
                                    <TextInput style={styles.textInput} placeholder="Brgy" placeholderTextColor={colors.placeholderGreen} />
                                </View>
                                <View style={[styles.inputGroup, { flex: 1 }]}>
                                    <Text style={styles.inputLabel}>City</Text>
                                    <TextInput style={styles.textInput} placeholder="City" placeholderTextColor={colors.placeholderGreen} value={city} onChangeText={setCity} />
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Contact Person</Text>
                                <View style={styles.iconInput}>
                                    <MaterialIcons name="person" size={20} color={colors.textSecondary} />
                                    <TextInput style={styles.iconInputField} placeholder="Full Name" placeholderTextColor={colors.placeholderGreen} value={contactPerson} onChangeText={setContactPerson} />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Mobile Number</Text>
                                <View style={styles.iconInput}>
                                    <MaterialIcons name="phone" size={20} color={colors.textSecondary} />
                                    <TextInput style={styles.iconInputField} placeholder="XXX XXX XXXX" placeholderTextColor={colors.placeholderGreen} keyboardType="phone-pad" value={mobile} onChangeText={setMobile} />
                                </View>
                            </View>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <Text style={styles.sectionTitle}>Operations</Text>
                            <Text style={styles.sectionSubtitle}>Set your operating hours for pickup availability.</Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Operating Hours</Text>
                                <View style={styles.row}>
                                    <View style={[styles.timeInput, { flex: 1 }]}>
                                        <MaterialIcons name="access-time" size={20} color={colors.textSecondary} />
                                        <TextInput style={styles.timeInputField} placeholder="09:00 AM" placeholderTextColor={colors.placeholderGreen} />
                                    </View>
                                    <View style={[styles.timeInput, { flex: 1 }]}>
                                        <MaterialIcons name="access-time" size={20} color={colors.textSecondary} />
                                        <TextInput style={styles.timeInputField} placeholder="06:00 PM" placeholderTextColor={colors.placeholderGreen} />
                                    </View>
                                </View>
                            </View>
                        </>
                    )}

                    {step === 4 && (
                        <>
                            <Text style={styles.sectionTitle}>Payout Details</Text>
                            <Text style={styles.sectionSubtitle}>Where should we send your earnings?</Text>

                            <View style={styles.payoutToggle}>
                                <TouchableOpacity
                                    style={[styles.payoutBtn, payoutMethod === 'gcash' && styles.payoutBtnActive]}
                                    onPress={() => setPayoutMethod('gcash')}
                                >
                                    <MaterialIcons name="account-balance-wallet" size={18} color={payoutMethod === 'gcash' ? colors.backgroundDark : colors.textSecondary} />
                                    <Text style={[styles.payoutBtnText, payoutMethod === 'gcash' && styles.payoutBtnTextActive]}>GCash / Maya</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.payoutBtn, payoutMethod === 'bank' && styles.payoutBtnActive]}
                                    onPress={() => setPayoutMethod('bank')}
                                >
                                    <MaterialIcons name="account-balance" size={18} color={payoutMethod === 'bank' ? colors.backgroundDark : colors.textSecondary} />
                                    <Text style={[styles.payoutBtnText, payoutMethod === 'bank' && styles.payoutBtnTextActive]}>Bank Transfer</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Account Number</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="0XXX XXX XXXX or Account #"
                                    placeholderTextColor={colors.placeholderGreen}
                                    value={accountNumber}
                                    onChangeText={setAccountNumber}
                                    keyboardType="numeric"
                                />
                            </View>
                        </>
                    )}

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => {
                            if (step < 4) {
                                setStep(step + 1);
                            } else {
                                navigation.navigate('MerchantDashboard');
                            }
                        }}
                    >
                        <Text style={styles.submitText}>{step === 4 ? 'Submit Application' : 'Continue'}</Text>
                        <MaterialIcons name="arrow-forward" size={20} color={colors.backgroundDark} />
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundDark },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.surfaceHighlight },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    progressContainer: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    progressInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
    stepText: { fontSize: fontSize.sm, color: colors.textSecondary },
    progressPercent: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },
    progressBar: { height: 6, backgroundColor: colors.surfaceHighlight, borderRadius: 3 },
    progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 40 },
    sectionTitle: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.sm },
    sectionSubtitle: { fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.xl },
    inputGroup: { marginBottom: spacing.lg },
    inputLabel: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary, marginBottom: spacing.sm },
    textInput: { height: 56, backgroundColor: colors.inputDark, borderRadius: borderRadius.md, paddingHorizontal: spacing.lg, color: colors.textPrimary, fontSize: fontSize.md },
    selectInput: { height: 56, backgroundColor: colors.inputDark, borderRadius: borderRadius.md, paddingHorizontal: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    selectValue: { fontSize: fontSize.md, color: colors.textPrimary },
    selectPlaceholder: { fontSize: fontSize.md, color: colors.placeholderGreen },
    imageUploader: { height: 160, backgroundColor: colors.inputDark, borderRadius: borderRadius.lg, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.surfaceHighlight, alignItems: 'center', justifyContent: 'center' },
    uploadHint: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.md },
    uploadSubhint: { fontSize: fontSize.xs, color: colors.placeholderGreen, marginTop: spacing.xs },
    pinButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.surfaceHighlight },
    pinButtonText: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    row: { flexDirection: 'row', gap: spacing.md },
    divider: { height: 1, backgroundColor: colors.surfaceHighlight, marginVertical: spacing.lg },
    iconInput: { height: 56, backgroundColor: colors.inputDark, borderRadius: borderRadius.md, paddingHorizontal: spacing.lg, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    iconInputField: { flex: 1, fontSize: fontSize.md, color: colors.textPrimary },
    timeInput: { height: 56, backgroundColor: colors.inputDark, borderRadius: borderRadius.md, paddingHorizontal: spacing.lg, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    timeInputField: { flex: 1, fontSize: fontSize.md, color: colors.textPrimary },
    payoutToggle: { flexDirection: 'row', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.xs, marginBottom: spacing.xl },
    payoutBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md, borderRadius: borderRadius.md },
    payoutBtnActive: { backgroundColor: colors.primary },
    payoutBtnText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textSecondary },
    payoutBtnTextActive: { color: colors.backgroundDark },
    submitButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, height: 56, backgroundColor: colors.primary, borderRadius: borderRadius.lg, marginTop: spacing.xl },
    submitText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.backgroundDark },
});
