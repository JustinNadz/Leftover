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

const categories = ['Bakery', 'Meals', 'Groceries', 'Pro'];
const fulfillmentMethods = ['Pickup Only', 'Delivery Only', 'Pickup & Delivery'];

interface NewListingScreenProps {
    navigation: any;
}

export const NewListingScreen: React.FC<NewListingScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('listings');
    const [selectedCategory, setSelectedCategory] = useState('Bakery');
    const [selectedFulfillment, setSelectedFulfillment] = useState('Pickup & Delivery');
    const [quantity, setQuantity] = useState(1);
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [originalPrice, setOriginalPrice] = useState('200.00');
    const [leftUberPrice, setLeftUberPrice] = useState('100.00');
    const [deliveryRadius, setDeliveryRadius] = useState('5km');
    const [packagingNotes, setPackagingNotes] = useState('');
    const [pickupStart, setPickupStart] = useState('02:00 PM');
    const [pickupEnd, setPickupEnd] = useState('06:00 PM');

    const savingsPercent = Math.round(
        ((parseFloat(originalPrice) - parseFloat(leftUberPrice)) / parseFloat(originalPrice)) * 100
    ) || 0;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="close" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>New Listing</Text>
                    <TouchableOpacity>
                        <Text style={styles.draftLink}>Draft</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Photo Upload */}
                    <TouchableOpacity style={styles.photoUpload}>
                        <View style={styles.photoIconContainer}>
                            <MaterialIcons name="add-a-photo" size={32} color={colors.primary} />
                        </View>
                        <Text style={styles.photoLabel}>Add Product Photo</Text>
                        <Text style={styles.photoHint}>Tap to upload</Text>
                    </TouchableOpacity>

                    {/* Product Details Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Product Details</Text>
                        <Text style={styles.inputLabel}>What are you saving today?</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="e.g., Assorted Pastry Box"
                            placeholderTextColor={colors.textSecondary}
                            value={productName}
                            onChangeText={setProductName}
                        />

                        <Text style={styles.inputLabel}>Category</Text>
                        <View style={styles.categoryContainer}>
                            {categories.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[
                                        styles.categoryChip,
                                        selectedCategory === cat && styles.categoryChipActive,
                                    ]}
                                    onPress={() => setSelectedCategory(cat)}
                                >
                                    <Text style={[
                                        styles.categoryText,
                                        selectedCategory === cat && styles.categoryTextActive,
                                    ]}>
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.inputLabel}>Description</Text>
                        <TextInput
                            style={[styles.textInput, styles.textArea]}
                            placeholder="Describe the contents, allergens, etc."
                            placeholderTextColor={colors.textSecondary}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                        />
                    </View>

                    {/* Logistics Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Logistics</Text>

                        <Text style={styles.inputLabel}>Quantity Available</Text>
                        <View style={styles.quantityRow}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <MaterialIcons name="remove" size={20} color={colors.textPrimary} />
                            </TouchableOpacity>
                            <Text style={styles.quantityValue}>{quantity}</Text>
                            <TouchableOpacity
                                style={[styles.quantityButton, styles.quantityButtonActive]}
                                onPress={() => setQuantity(quantity + 1)}
                            >
                                <MaterialIcons name="add" size={20} color={colors.backgroundDark} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.inputLabel}>Fulfillment Method</Text>
                        <View style={styles.fulfillmentContainer}>
                            {fulfillmentMethods.map((method) => (
                                <TouchableOpacity
                                    key={method}
                                    style={[
                                        styles.fulfillmentChip,
                                        selectedFulfillment === method && styles.fulfillmentChipActive,
                                    ]}
                                    onPress={() => setSelectedFulfillment(method)}
                                >
                                    <Text style={[
                                        styles.fulfillmentText,
                                        selectedFulfillment === method && styles.fulfillmentTextActive,
                                    ]}>
                                        {method}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Pickup Window */}
                        <View style={styles.pickupSection}>
                            <MaterialIcons name="schedule" size={18} color={colors.primary} />
                            <Text style={styles.pickupLabel}>Pickup Window</Text>
                        </View>
                        <View style={styles.timeRow}>
                            <View style={styles.timeInputWrapper}>
                                <Text style={styles.timeLabel}>Start</Text>
                                <TouchableOpacity style={styles.timeInput}>
                                    <Text style={styles.timeText}>{pickupStart}</Text>
                                    <MaterialIcons name="access-time" size={18} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.timeInputWrapper}>
                                <Text style={styles.timeLabel}>End Time</Text>
                                <TouchableOpacity style={styles.timeInput}>
                                    <Text style={styles.timeText}>{pickupEnd}</Text>
                                    <MaterialIcons name="access-time" size={18} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Delivery Settings */}
                    {selectedFulfillment !== 'Pickup Only' && (
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <MaterialIcons name="local-shipping" size={18} color={colors.primary} />
                                <Text style={styles.sectionTitle}>Delivery Settings</Text>
                            </View>

                            <Text style={styles.inputLabel}>Max Delivery Radius</Text>
                            <View style={styles.radiusRow}>
                                <TextInput
                                    style={[styles.textInput, styles.radiusInput]}
                                    placeholder="e.g., Nearest barangay, Tanglin..."
                                    placeholderTextColor={colors.textSecondary}
                                    value={deliveryRadius}
                                    onChangeText={setDeliveryRadius}
                                />
                                <Text style={styles.radiusUnit}>5km</Text>
                            </View>

                            <Text style={styles.inputLabel}>Special Packaging Instructions</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g., Needs thermal bag, fragile..."
                                placeholderTextColor={colors.textSecondary}
                                value={packagingNotes}
                                onChangeText={setPackagingNotes}
                            />
                        </View>
                    )}

                    {/* Value Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Value</Text>
                            <View style={styles.savingsBadge}>
                                <MaterialIcons name="local-offer" size={12} color={colors.backgroundDark} />
                                <Text style={styles.savingsText}>{savingsPercent}% SAVING</Text>
                            </View>
                        </View>

                        <View style={styles.priceRow}>
                            <View style={styles.priceInputWrapper}>
                                <Text style={styles.inputLabel}>Original Price</Text>
                                <View style={styles.priceInput}>
                                    <Text style={styles.currencySymbol}>₱</Text>
                                    <TextInput
                                        style={styles.priceField}
                                        value={originalPrice}
                                        onChangeText={setOriginalPrice}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                            <View style={styles.priceInputWrapper}>
                                <Text style={styles.inputLabel}>LeftUber Price</Text>
                                <View style={[styles.priceInput, styles.priceInputHighlight]}>
                                    <Text style={styles.currencySymbolHighlight}>₱</Text>
                                    <TextInput
                                        style={[styles.priceField, styles.priceFieldHighlight]}
                                        value={leftUberPrice}
                                        onChangeText={setLeftUberPrice}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                        </View>

                        <Text style={styles.priceNote}>
                            Platform Fee: ₱0.00. <Text style={styles.priceNoteHighlight}>Discount: ₱0.00</Text>
                        </Text>
                    </View>
                </ScrollView>

                {/* Bottom Button */}
                <View style={styles.bottomSection}>
                    <TouchableOpacity style={styles.publishButton}>
                        <Text style={styles.publishText}>Publish Listing</Text>
                        <MaterialIcons name="arrow-forward" size={18} color={colors.backgroundDark} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'dashboard') navigation.navigate('MerchantDashboard');
                    if (tab === 'support') navigation.navigate('HelpCenter');
                    if (tab === 'profile') navigation.navigate('Profile');
                }}
                type="merchant"
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
    draftLink: { fontSize: fontSize.md, fontWeight: '600', color: colors.textSecondary },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 200 },
    photoUpload: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.xl,
        padding: spacing.xxl,
        marginBottom: spacing.xl,
        borderWidth: 2,
        borderColor: colors.borderDark,
        borderStyle: 'dashed',
    },
    photoIconContainer: {
        width: 64,
        height: 64,
        borderRadius: borderRadius.lg,
        backgroundColor: 'rgba(19, 236, 109, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },
    photoLabel: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    photoHint: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
    section: { marginBottom: spacing.xl },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
    inputLabel: { fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.sm },
    textInput: {
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        fontSize: fontSize.md,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    textArea: { height: 100, textAlignVertical: 'top' },
    categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
    categoryChip: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        backgroundColor: colors.surfaceDark,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    categoryChipActive: {
        backgroundColor: 'rgba(19, 236, 109, 0.15)',
        borderColor: colors.primary,
    },
    categoryText: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: '500' },
    categoryTextActive: { color: colors.primary },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
    },
    quantityButton: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: colors.surfaceDark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonActive: { backgroundColor: colors.primary },
    quantityValue: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary },
    fulfillmentContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
    fulfillmentChip: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        backgroundColor: colors.surfaceDark,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    fulfillmentChipActive: {
        backgroundColor: 'rgba(19, 236, 109, 0.15)',
        borderColor: colors.primary,
    },
    fulfillmentText: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: '500' },
    fulfillmentTextActive: { color: colors.primary },
    pickupSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    pickupLabel: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    timeRow: { flexDirection: 'row', gap: spacing.md },
    timeInputWrapper: { flex: 1 },
    timeLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginBottom: spacing.xs },
    timeInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    timeText: { fontSize: fontSize.md, color: colors.textPrimary },
    radiusRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    radiusInput: { flex: 1, marginBottom: 0 },
    radiusUnit: { fontSize: fontSize.md, color: colors.primary, fontWeight: '600' },
    priceRow: { flexDirection: 'row', gap: spacing.md },
    priceInputWrapper: { flex: 1 },
    priceInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    priceInputHighlight: {
        backgroundColor: 'rgba(19, 236, 109, 0.15)',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    currencySymbol: { fontSize: fontSize.lg, color: colors.textSecondary, marginRight: spacing.sm },
    currencySymbolHighlight: { fontSize: fontSize.lg, color: colors.primary, marginRight: spacing.sm },
    priceField: { flex: 1, fontSize: fontSize.lg, color: colors.textPrimary, fontWeight: '600' },
    priceFieldHighlight: { color: colors.primary },
    priceNote: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.md },
    priceNoteHighlight: { color: colors.primary },
    savingsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    savingsText: { fontSize: 10, fontWeight: '800', color: colors.backgroundDark },
    bottomSection: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.lg,
        backgroundColor: 'rgba(16, 34, 24, 0.98)',
    },
    publishButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        backgroundColor: colors.primary,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.lg,
    },
    publishText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.backgroundDark },
});
