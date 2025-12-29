import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav, Button } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const categories = ['Bakery', 'Meals', 'Groceries', 'Produce'];

export const PostListingScreen = ({ navigation }: { navigation: any }) => {
    const [activeTab, setActiveTab] = useState('listings');
    const [selectedCategory, setSelectedCategory] = useState('Bakery');
    const [quantity, setQuantity] = useState(1);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}><MaterialIcons name="close" size={24} color={colors.textPrimary} /></TouchableOpacity>
                    <Text style={styles.headerTitle}>New Listing</Text>
                    <TouchableOpacity><Text style={styles.draftBtn}>Draft</Text></TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <TouchableOpacity style={styles.imageUploader}>
                        <View style={styles.uploaderContent}><View style={styles.uploaderIcon}><MaterialIcons name="add-a-photo" size={28} color={colors.primary} /></View><Text style={styles.uploaderTitle}>Add Product Photo</Text><Text style={styles.uploaderSubtitle}>Tap to upload</Text></View>
                    </TouchableOpacity>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Product Details</Text>
                        <View style={styles.inputGroup}><Text style={styles.inputLabel}>What are you saving today?</Text><TextInput style={styles.textInput} placeholder="e.g., Assorted Pastry Box" placeholderTextColor={colors.placeholderGreen} /></View>
                        <View style={styles.inputGroup}><Text style={styles.inputLabel}>Category</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>{categories.map((cat) => (<TouchableOpacity key={cat} style={[styles.categoryPill, selectedCategory === cat && styles.categoryPillActive]} onPress={() => setSelectedCategory(cat)}><Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat}</Text></TouchableOpacity>))}</ScrollView></View>
                        <View style={styles.inputGroup}><Text style={styles.inputLabel}>Description</Text><TextInput style={[styles.textInput, styles.textArea]} placeholder="Describe the contents, allergens, etc." placeholderTextColor={colors.placeholderGreen} multiline numberOfLines={4} textAlignVertical="top" /></View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Logistics</Text>
                        <View style={styles.quantityRow}><Text style={styles.quantityLabel}>Quantity Available</Text><View style={styles.quantityControls}><TouchableOpacity style={styles.quantityBtn} onPress={() => setQuantity(Math.max(1, quantity - 1))}><MaterialIcons name="remove" size={18} color={colors.textPrimary} /></TouchableOpacity><Text style={styles.quantityValue}>{quantity}</Text><TouchableOpacity style={styles.quantityBtn} onPress={() => setQuantity(quantity + 1)}><MaterialIcons name="add" size={18} color={colors.textPrimary} /></TouchableOpacity></View></View>
                        <View style={styles.timeRow}><View style={styles.timeInput}><Text style={styles.inputLabel}>Pickup Start</Text><TextInput style={styles.textInput} value="02:00 PM" /></View><View style={styles.timeInput}><Text style={styles.inputLabel}>Pickup End</Text><TextInput style={styles.textInput} value="06:00 PM" /></View></View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.section}>
                        <View style={styles.valueHeader}><Text style={styles.sectionTitle}>Value</Text><View style={styles.saveBadge}><MaterialIcons name="savings" size={14} color={colors.backgroundDark} /><Text style={styles.saveBadgeText}>50% SAVED</Text></View></View>
                        <View style={styles.priceRow}><View style={styles.priceInput}><Text style={styles.priceLabelMuted}>Original Price</Text><View style={styles.priceInputContainer}><Text style={styles.dollarSign}>$</Text><TextInput style={styles.priceValue} value="20.00" keyboardType="numeric" /></View></View><View style={styles.priceInput}><Text style={styles.priceLabelPrimary}>LeftUber Price</Text><View style={[styles.priceInputContainer, styles.priceInputPrimary]}><Text style={styles.dollarSignPrimary}>$</Text><TextInput style={styles.priceValuePrimary} value="10.00" keyboardType="numeric" /></View></View></View>
                        <Text style={styles.feeText}>Platform fee: $1.00. You earn <Text style={styles.feeEarn}>$9.00</Text>.</Text>
                    </View>

                    <TouchableOpacity style={styles.publishButton} onPress={() => navigation.navigate('MerchantDashboard')}><Text style={styles.publishText}>Publish Listing</Text><MaterialIcons name="arrow-forward" size={20} color={colors.backgroundDark} /></TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
            <BottomNav activeTab={activeTab} onTabPress={(tab) => { setActiveTab(tab); if (tab === 'dashboard') navigation.navigate('MerchantDashboard'); }} type="merchant" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundDark },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderColor: colors.surfaceHighlight },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    draftBtn: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary, opacity: 0.8 },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    imageUploader: { height: 220, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.surfaceHighlight, borderRadius: borderRadius.lg, backgroundColor: colors.surfaceDark, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl },
    uploaderContent: { alignItems: 'center' },
    uploaderIcon: { width: 64, height: 64, borderRadius: borderRadius.full, backgroundColor: 'rgba(19, 236, 109, 0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
    uploaderTitle: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: '500' },
    uploaderSubtitle: { fontSize: fontSize.xs, color: colors.placeholderGreen, marginTop: spacing.xs },
    section: { marginBottom: spacing.lg },
    sectionTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.lg },
    inputGroup: { marginBottom: spacing.lg },
    inputLabel: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary, marginBottom: spacing.sm },
    textInput: { height: 56, backgroundColor: colors.inputDark, borderRadius: borderRadius.md, paddingHorizontal: spacing.lg, color: colors.textPrimary, fontSize: fontSize.md },
    textArea: { height: 120, paddingTop: spacing.lg },
    categoryContainer: { gap: spacing.md },
    categoryPill: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: borderRadius.full, backgroundColor: colors.inputDark },
    categoryPillActive: { backgroundColor: colors.primary },
    categoryText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textPrimary },
    categoryTextActive: { color: colors.backgroundDark, fontWeight: '700' },
    divider: { height: 1, backgroundColor: colors.surfaceHighlight, marginVertical: spacing.lg },
    quantityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.inputDark, borderRadius: borderRadius.md, padding: spacing.lg, marginBottom: spacing.lg },
    quantityLabel: { fontSize: fontSize.md, fontWeight: '500', color: colors.textPrimary },
    quantityControls: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, backgroundColor: colors.surfaceDark, padding: spacing.xs, borderRadius: borderRadius.md },
    quantityBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceHighlight, borderRadius: borderRadius.sm },
    quantityValue: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary, minWidth: 24, textAlign: 'center' },
    timeRow: { flexDirection: 'row', gap: spacing.md },
    timeInput: { flex: 1 },
    valueHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
    saveBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primary, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
    saveBadgeText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.backgroundDark },
    priceRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
    priceInput: { flex: 1 },
    priceLabelMuted: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary, marginBottom: spacing.sm },
    priceLabelPrimary: { fontSize: fontSize.sm, fontWeight: '500', color: colors.primary, marginBottom: spacing.sm },
    priceInputContainer: { flexDirection: 'row', alignItems: 'center', height: 56, backgroundColor: colors.inputDark, borderRadius: borderRadius.md, paddingHorizontal: spacing.lg },
    priceInputPrimary: { borderWidth: 2, borderColor: colors.primary + '55' },
    dollarSign: { fontSize: fontSize.lg, color: colors.placeholderGreen, marginRight: spacing.sm },
    dollarSignPrimary: { fontSize: fontSize.lg, color: colors.primary, fontWeight: '700', marginRight: spacing.sm },
    priceValue: { flex: 1, fontSize: fontSize.lg, color: colors.textSecondary },
    priceValuePrimary: { flex: 1, fontSize: fontSize.xl, color: colors.primary, fontWeight: '700' },
    feeText: { fontSize: fontSize.xs, color: colors.textSecondary },
    feeEarn: { color: colors.textPrimary, fontWeight: '700' },
    publishButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, height: 56, backgroundColor: colors.primary, borderRadius: borderRadius.lg, shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8, marginTop: spacing.lg },
    publishText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.backgroundDark },
});
