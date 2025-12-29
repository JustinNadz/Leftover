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

interface DeliveryCheckoutScreenProps {
    navigation: any;
}

export const DeliveryCheckoutScreen: React.FC<DeliveryCheckoutScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('orders');
    const [fulfillmentMode, setFulfillmentMode] = useState<'pickup' | 'delivery'>('delivery');

    const deliveryAddress = 'Unit 402, Makati City';
    const estimatedTime = '25-35 mins';
    const subtotal = 150.00;
    const deliveryFee = 55.00;
    const platformFee = 0.00;
    const totalAmount = subtotal + deliveryFee + platformFee;

    const mapImage = 'https://maps.googleapis.com/maps/api/staticmap?center=Manila,Philippines&zoom=12&size=400x200&maptype=roadmap&style=feature:all|element:geometry|color:0x242f3e&style=feature:water|color:0x17263c&key=demo';

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Checkout</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Fulfillment Toggle */}
                    <View style={styles.toggleContainer}>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                fulfillmentMode === 'pickup' && styles.toggleButtonActive,
                            ]}
                            onPress={() => setFulfillmentMode('pickup')}
                        >
                            <Text style={[
                                styles.toggleText,
                                fulfillmentMode === 'pickup' && styles.toggleTextActive,
                            ]}>
                                Pickup
                            </Text>
                            <View style={styles.ecoBadge}>
                                <Text style={styles.ecoBadgeText}>ECO</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                fulfillmentMode === 'delivery' && styles.toggleButtonActive,
                            ]}
                            onPress={() => setFulfillmentMode('delivery')}
                        >
                            <Text style={[
                                styles.toggleText,
                                fulfillmentMode === 'delivery' && styles.toggleTextActive,
                            ]}>
                                Delivery
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Map Section */}
                    {fulfillmentMode === 'delivery' && (
                        <View style={styles.mapContainer}>
                            <View style={styles.mapPlaceholder}>
                                <View style={styles.mapOverlay}>
                                    <View style={styles.routeLine} />
                                    <View style={styles.startPoint}>
                                        <MaterialIcons name="storefront" size={16} color={colors.primary} />
                                    </View>
                                    <View style={styles.endPoint}>
                                        <MaterialIcons name="location-on" size={16} color={colors.primary} />
                                    </View>
                                </View>
                                <Text style={styles.mapCityLabel}>Quezon City</Text>
                                <Text style={styles.mapCityLabel2}>Manila</Text>
                            </View>
                            <View style={styles.etaBadge}>
                                <MaterialIcons name="schedule" size={14} color={colors.primary} />
                                <Text style={styles.etaText}>Est: {estimatedTime}</Text>
                            </View>
                        </View>
                    )}

                    {/* Delivery Address */}
                    {fulfillmentMode === 'delivery' && (
                        <View style={styles.addressSection}>
                            <View style={styles.addressLeft}>
                                <MaterialIcons name="location-on" size={24} color={colors.primary} />
                                <View style={styles.addressInfo}>
                                    <Text style={styles.addressLabel}>Delivering to</Text>
                                    <Text style={styles.addressText}>{deliveryAddress}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={styles.editButtonText}>EDIT</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Logistics Partner */}
                    {fulfillmentMode === 'delivery' && (
                        <View style={styles.logisticsSection}>
                            <Text style={styles.sectionLabel}>LOGISTICS PARTNER</Text>
                            <View style={styles.logisticsCard}>
                                <View style={styles.logisticsLeft}>
                                    <View style={styles.logisticsIcon}>
                                        <MaterialIcons name="local-shipping" size={24} color="#f97316" />
                                    </View>
                                    <View>
                                        <Text style={styles.logisticsName}>Lalamove Delivery</Text>
                                        <Text style={styles.logisticsType}>Standard motorbike</Text>
                                    </View>
                                </View>
                                <Text style={styles.logisticsPrice}>₱{deliveryFee.toFixed(2)}</Text>
                            </View>
                        </View>
                    )}

                    {/* Payment Details */}
                    <View style={styles.paymentSection}>
                        <Text style={styles.sectionLabel}>PAYMENT DETAILS</Text>
                        <View style={styles.paymentCard}>
                            <View style={styles.paymentRow}>
                                <Text style={styles.paymentLabel}>Subtotal (3 items)</Text>
                                <Text style={styles.paymentValue}>₱{subtotal.toFixed(2)}</Text>
                            </View>
                            {fulfillmentMode === 'delivery' && (
                                <View style={styles.paymentRow}>
                                    <Text style={styles.paymentLabel}>Delivery Fee</Text>
                                    <Text style={styles.paymentValue}>₱{deliveryFee.toFixed(2)}</Text>
                                </View>
                            )}
                            <View style={styles.paymentRow}>
                                <Text style={styles.paymentLabel}>Platform Fee</Text>
                                <Text style={styles.paymentValue}>₱{platformFee.toFixed(2)}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.paymentRow}>
                                <Text style={styles.totalLabel}>Total Amount</Text>
                                <Text style={styles.totalValue}>
                                    ₱{fulfillmentMode === 'delivery' ? totalAmount.toFixed(2) : subtotal.toFixed(2)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                    <View style={styles.bottomLeft}>
                        <Text style={styles.totalToPayLabel}>Total to pay</Text>
                        <Text style={styles.totalToPayValue}>
                            ₱{fulfillmentMode === 'delivery' ? totalAmount.toFixed(2) : subtotal.toFixed(2)}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.placeOrderButton}
                        onPress={() => navigation.navigate('DeliveryTracking')}
                    >
                        <Text style={styles.placeOrderText}>Place Order</Text>
                        <MaterialIcons name="arrow-forward" size={18} color={colors.backgroundDark} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'home') navigation.navigate('BuyerHome');
                    if (tab === 'wallet') navigation.navigate('MyWallet');
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
    scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 200 },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.full,
        padding: spacing.xs,
        marginBottom: spacing.lg,
    },
    toggleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.full,
    },
    toggleButtonActive: {
        backgroundColor: colors.primary,
    },
    toggleText: { fontSize: fontSize.md, color: colors.textSecondary, fontWeight: '600' },
    toggleTextActive: { color: colors.backgroundDark },
    ecoBadge: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.xs,
        paddingVertical: 2,
        borderRadius: borderRadius.xs,
    },
    ecoBadgeText: { fontSize: 8, fontWeight: '800', color: colors.backgroundDark },
    mapContainer: {
        backgroundColor: '#1a3a2e',
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        marginBottom: spacing.lg,
        position: 'relative',
    },
    mapPlaceholder: {
        height: 160,
        backgroundColor: '#1a3a2e',
        position: 'relative',
        padding: spacing.lg,
    },
    mapOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    routeLine: {
        position: 'absolute',
        width: '60%',
        height: 2,
        backgroundColor: colors.primary,
        transform: [{ rotate: '-15deg' }],
    },
    startPoint: {
        position: 'absolute',
        left: '20%',
        top: '40%',
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.surfaceDark,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.primary,
    },
    endPoint: {
        position: 'absolute',
        right: '20%',
        bottom: '35%',
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.surfaceDark,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.primary,
    },
    mapCityLabel: {
        position: 'absolute',
        right: spacing.lg,
        top: spacing.md,
        fontSize: fontSize.sm,
        color: colors.textSecondary,
    },
    mapCityLabel2: {
        position: 'absolute',
        left: spacing.lg,
        bottom: spacing.xl,
        fontSize: fontSize.sm,
        color: colors.textSecondary,
    },
    etaBadge: {
        position: 'absolute',
        left: spacing.md,
        bottom: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        backgroundColor: colors.surfaceDark,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
    },
    etaText: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },
    addressSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },
    addressLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    addressInfo: {},
    addressLabel: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textPrimary },
    addressText: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
    editButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.sm,
    },
    editButtonText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.backgroundDark },
    logisticsSection: { marginBottom: spacing.lg },
    sectionLabel: {
        fontSize: fontSize.xs,
        fontWeight: '600',
        color: colors.textSecondary,
        letterSpacing: 1,
        marginBottom: spacing.md,
    },
    logisticsCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
    },
    logisticsLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    logisticsIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: 'rgba(249, 115, 22, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logisticsName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    logisticsType: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
    logisticsPrice: { fontSize: fontSize.lg, fontWeight: '700', color: colors.primary },
    paymentSection: { marginBottom: spacing.lg },
    paymentCard: {
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    paymentLabel: { fontSize: fontSize.sm, color: colors.textSecondary },
    paymentValue: { fontSize: fontSize.sm, color: colors.textPrimary },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: spacing.md,
    },
    totalLabel: { fontSize: fontSize.md, fontWeight: '700', color: colors.textPrimary },
    totalValue: { fontSize: fontSize.lg, fontWeight: '700', color: colors.primary },
    bottomSection: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.lg,
        backgroundColor: 'rgba(16, 34, 24, 0.98)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    bottomLeft: {},
    totalToPayLabel: { fontSize: fontSize.xs, color: colors.textSecondary },
    totalToPayValue: { fontSize: fontSize.xl, fontWeight: '700', color: colors.textPrimary },
    placeOrderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,
    },
    placeOrderText: { fontSize: fontSize.md, fontWeight: '700', color: colors.backgroundDark },
});
