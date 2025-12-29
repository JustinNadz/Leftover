import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const frequencies = ['Daily', 'Weekly', 'Bi-Weekly'];
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

interface SetupSubscriptionScreenProps {
    navigation: any;
}

export const SetupSubscriptionScreen: React.FC<SetupSubscriptionScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('orders');
    const [selectedFrequency, setSelectedFrequency] = useState('Weekly');
    const [selectedDays, setSelectedDays] = useState([0, 2, 4]); // M, W, F
    const [quantity, setQuantity] = useState(1);
    const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');

    const toggleDay = (index: number) => {
        setSelectedDays((prev) =>
            prev.includes(index)
                ? prev.filter((d) => d !== index)
                : [...prev, index]
        );
    };

    const productImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDazL-S56m1LGCDi2gkb5qcGG5lFoyqYByD_ipVB6-8DDDtcNPNvd5jsFqY6RTTSktKh5pjKXn11WI2-pcAuJpX2kggN9SZ-AZOo-OjTGjTStejgziMGvrpRAdkv6fe0HjipqqARVtLsqg_UcpX3S3q-hqIwNGDXGMFUfAZdO1vTidn0xX6vgjzkngRRPogkWsNoaWKQd7dy5eejslDSUVfkjH0LhCk58B4GR713v26NPW8bw2pesap33CRRiZ6dv6IQp40Gv2onZOJ';
    const originalPrice = 250.00;
    const discountedPrice = 150.00;
    const subscriptionSaving = 10.00;
    const totalPerOrder = 140.00;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Setup Subscription</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Product Card */}
                    <View style={styles.productCard}>
                        <View style={styles.productInfo}>
                            <View style={styles.priceRow}>
                                <Text style={styles.discountedPrice}>₱{discountedPrice.toFixed(2)}</Text>
                                <Text style={styles.originalPrice}>₱{originalPrice.toFixed(2)}</Text>
                            </View>
                            <Text style={styles.productName}>Surplus Pastries Box</Text>
                            <View style={styles.merchantRow}>
                                <MaterialIcons name="storefront" size={14} color={colors.textSecondary} />
                                <Text style={styles.merchantName}>Boulangerie Manila</Text>
                            </View>
                        </View>
                        <Image source={{ uri: productImage }} style={styles.productImage} />
                    </View>

                    {/* Frequency */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>FREQUENCY</Text>
                        <View style={styles.frequencyButtons}>
                            {frequencies.map((freq) => (
                                <TouchableOpacity
                                    key={freq}
                                    style={[
                                        styles.frequencyButton,
                                        selectedFrequency === freq && styles.frequencyButtonActive,
                                    ]}
                                    onPress={() => setSelectedFrequency(freq)}
                                >
                                    <Text style={[
                                        styles.frequencyText,
                                        selectedFrequency === freq && styles.frequencyTextActive,
                                    ]}>
                                        {freq}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Preferred Days */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>PREFERRED DAYS</Text>
                        <View style={styles.daysRow}>
                            {days.map((day, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.dayButton,
                                        selectedDays.includes(index) && styles.dayButtonActive,
                                    ]}
                                    onPress={() => toggleDay(index)}
                                >
                                    <Text style={[
                                        styles.dayText,
                                        selectedDays.includes(index) && styles.dayTextActive,
                                    ]}>
                                        {day}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Pickup Time */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>PICKUP TIME</Text>
                        <TouchableOpacity style={styles.timeSelector}>
                            <Text style={styles.timeText}>5:00 PM - 6:00 PM</Text>
                            <MaterialIcons name="schedule" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    {/* Quantity */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>QUANTITY</Text>
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
                    </View>

                    {/* Fulfillment */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>FULFILLMENT</Text>
                        <View style={styles.fulfillmentRow}>
                            <TouchableOpacity
                                style={[
                                    styles.fulfillmentButton,
                                    fulfillment === 'pickup' && styles.fulfillmentButtonActive,
                                ]}
                                onPress={() => setFulfillment('pickup')}
                            >
                                <MaterialIcons
                                    name="store"
                                    size={16}
                                    color={fulfillment === 'pickup' ? colors.backgroundDark : colors.textSecondary}
                                />
                                <Text style={[
                                    styles.fulfillmentText,
                                    fulfillment === 'pickup' && styles.fulfillmentTextActive,
                                ]}>
                                    Pickup
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.fulfillmentButton,
                                    fulfillment === 'delivery' && styles.fulfillmentButtonActive,
                                ]}
                                onPress={() => setFulfillment('delivery')}
                            >
                                <MaterialIcons
                                    name="local-shipping"
                                    size={16}
                                    color={fulfillment === 'delivery' ? colors.backgroundDark : colors.textSecondary}
                                />
                                <Text style={[
                                    styles.fulfillmentText,
                                    fulfillment === 'delivery' && styles.fulfillmentTextActive,
                                ]}>
                                    Delivery
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Store Location */}
                    <TouchableOpacity style={styles.locationCard}>
                        <MaterialIcons name="location-on" size={20} color={colors.primary} />
                        <View style={styles.locationContent}>
                            <Text style={styles.locationTitle}>Store Location</Text>
                            <Text style={styles.locationAddress}>123 Rizal Ave, Santa Cruz, Manila</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.savingLabel}>Subscription Saving</Text>
                        <Text style={styles.savingValue}>-₱{subscriptionSaving.toFixed(2)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total per order</Text>
                        <Text style={styles.totalValue}>₱{totalPerOrder.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={styles.confirmButton}>
                        <Text style={styles.confirmButtonText}>Confirm Subscription</Text>
                    </TouchableOpacity>
                    <Text style={styles.cancelNote}>You can pause or cancel anytime.</Text>
                </View>
            </SafeAreaView>

            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'home') navigation.navigate('BuyerHome');
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
    scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 280 },
    productCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.xl,
    },
    productInfo: { flex: 1 },
    priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm, marginBottom: spacing.xs },
    discountedPrice: { fontSize: fontSize.xl, fontWeight: '700', color: colors.primary },
    originalPrice: { fontSize: fontSize.sm, color: colors.textSecondary, textDecorationLine: 'line-through' },
    productName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.xs },
    merchantRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    merchantName: { fontSize: fontSize.sm, color: colors.textSecondary },
    productImage: { width: 72, height: 72, borderRadius: borderRadius.md },
    section: { marginBottom: spacing.xl },
    sectionLabel: { fontSize: fontSize.xs, fontWeight: '600', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.md },
    frequencyButtons: { flexDirection: 'row', gap: spacing.sm },
    frequencyButton: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        backgroundColor: colors.surfaceDark,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    frequencyButtonActive: { backgroundColor: 'rgba(19, 236, 109, 0.15)', borderColor: colors.primary },
    frequencyText: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: '500' },
    frequencyTextActive: { color: colors.primary, fontWeight: '600' },
    daysRow: { flexDirection: 'row', justifyContent: 'space-between' },
    dayButton: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.full,
        backgroundColor: colors.surfaceDark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayButtonActive: { backgroundColor: colors.primary },
    dayText: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: '600' },
    dayTextActive: { color: colors.backgroundDark },
    timeSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
    },
    timeText: { fontSize: fontSize.md, color: colors.textPrimary },
    quantityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
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
    fulfillmentRow: { flexDirection: 'row', gap: spacing.sm },
    fulfillmentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        backgroundColor: colors.surfaceDark,
    },
    fulfillmentButtonActive: { backgroundColor: colors.primary },
    fulfillmentText: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: '500' },
    fulfillmentTextActive: { color: colors.backgroundDark, fontWeight: '600' },
    locationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    locationContent: { flex: 1 },
    locationTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    locationAddress: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
    bottomSection: {
        position: 'absolute',
        bottom: 84,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(16, 34, 24, 0.98)',
        padding: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
    savingLabel: { fontSize: fontSize.sm, color: colors.textSecondary },
    savingValue: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg },
    totalLabel: { fontSize: fontSize.md, color: colors.textSecondary },
    totalValue: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary },
    confirmButton: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.lg,
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    confirmButtonText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.backgroundDark },
    cancelNote: { fontSize: fontSize.xs, color: colors.textSecondary, textAlign: 'center' },
});
