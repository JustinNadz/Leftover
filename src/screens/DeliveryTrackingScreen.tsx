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

interface DeliveryTrackingScreenProps {
    navigation: any;
}

export const DeliveryTrackingScreen: React.FC<DeliveryTrackingScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('orders');

    const driverName = 'Juan dela Cruz';
    const vehicleInfo = 'Yamaha NMAX • ABC 1234';
    const driverAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHXqKWieP7EFXume0cd2BIBDob5HrdudvzzIdjFcKJ3AbjewkZ81uKqRxwt-GTgVZK0U9oqpz6ZQWS6Y0n8vaU34NRODqnIRurUwS4lVqQwJHsQLNFRoK0ln3pgemeG_15jkEVJlcldEp_kSmi0wK9FDN_eRJkpzCkl_wL4GWM6S0xf44x6jRIBekwstHIT_usamoD57a6-MGKa0ZsxSFvc9sA2LJZ_BMLvNfmI8stcunbZCaz9Cn8lDUARt2Gcvx8jwS9uRzpwZWO';

    const orderItem = 'Surplus Meal Pack (x2)';
    const orderPrice = 405.00;
    const deliveryFee = 45.00;
    const total = 450.00;
    const arrivalTime = 12;
    const progressPercent = 65;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Delivery Tracking</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="share" size={22} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                {/* Map Section */}
                <View style={styles.mapContainer}>
                    <View style={styles.mapPlaceholder}>
                        {/* Map visual elements */}
                        <Text style={styles.mapLabel}>Valenzuela</Text>
                        <Text style={[styles.mapLabel, { top: 40, left: 100 }]}>Malabon</Text>
                        <Text style={[styles.mapLabel, { top: 60, right: 40 }]}>Caloocan</Text>
                        <Text style={[styles.mapLabel, { bottom: 80, left: '40%' }]}>Manila</Text>

                        {/* Route line */}
                        <View style={styles.routePath} />

                        {/* Store marker */}
                        <View style={[styles.marker, styles.storeMarker]}>
                            <MaterialIcons name="storefront" size={18} color={colors.textPrimary} />
                        </View>

                        {/* Driver marker */}
                        <View style={[styles.marker, styles.driverMarker]}>
                            <Image source={{ uri: driverAvatar }} style={styles.driverMarkerAvatar} />
                            <View style={styles.driverNameBubble}>
                                <Text style={styles.driverNameBubbleText}>Juan</Text>
                            </View>
                        </View>

                        {/* Destination marker */}
                        <View style={[styles.marker, styles.destinationMarker]}>
                            <MaterialIcons name="location-on" size={20} color={colors.primary} />
                        </View>
                    </View>
                </View>

                {/* Status Card */}
                <View style={styles.statusCard}>
                    <View style={styles.statusHeader}>
                        <View style={styles.statusLeft}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusLabel}>ON THE WAY</Text>
                        </View>
                        <Text style={styles.updatedText}>Updated 1m ago</Text>
                    </View>
                    <Text style={styles.arrivalTime}>Arriving in {arrivalTime} mins</Text>

                    {/* Progress Bar */}
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBg}>
                            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                        </View>
                        <View style={styles.progressDots}>
                            <View style={[styles.progressDot, styles.progressDotActive]} />
                            <View style={[styles.progressDot, styles.progressDotActive]} />
                            <View style={[styles.progressDot, styles.progressDotActive]} />
                            <View style={styles.progressDot} />
                        </View>
                    </View>

                    {/* Driver Info */}
                    <View style={styles.driverSection}>
                        <View style={styles.driverLeft}>
                            <Image source={{ uri: driverAvatar }} style={styles.driverAvatar} />
                            <View style={styles.driverInfo}>
                                <View style={styles.driverNameRow}>
                                    <Text style={styles.driverNameText}>{driverName}</Text>
                                    <MaterialIcons name="verified" size={16} color={colors.primary} />
                                </View>
                                <Text style={styles.vehicleText}>{vehicleInfo}</Text>
                            </View>
                        </View>
                        <View style={styles.driverActions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <MaterialIcons name="chat-bubble" size={20} color={colors.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
                                <MaterialIcons name="phone" size={20} color={colors.backgroundDark} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Order Details */}
                    <View style={styles.orderSection}>
                        <View style={styles.orderItem}>
                            <View style={styles.orderItemIcon}>
                                <MaterialIcons name="shopping-bag" size={18} color={colors.primary} />
                            </View>
                            <View style={styles.orderItemInfo}>
                                <Text style={styles.orderItemName}>{orderItem}</Text>
                                <Text style={styles.orderItemLabel}>Delivery Fee</Text>
                            </View>
                            <View style={styles.orderItemPrices}>
                                <Text style={styles.orderItemPrice}>₱{orderPrice.toFixed(2)}</Text>
                                <Text style={styles.orderItemFee}>₱{deliveryFee.toFixed(2)}</Text>
                            </View>
                        </View>

                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>₱{total.toFixed(2)}</Text>
                        </View>
                    </View>
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
        backgroundColor: 'rgba(26, 58, 46, 0.95)',
    },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '600', color: colors.textPrimary },
    mapContainer: {
        height: 260,
        backgroundColor: '#2d4a5e',
        position: 'relative',
    },
    mapPlaceholder: {
        flex: 1,
        backgroundColor: '#3d5a6e',
        position: 'relative',
    },
    mapLabel: {
        position: 'absolute',
        fontSize: fontSize.sm,
        color: 'rgba(255,255,255,0.5)',
        top: 20,
        left: 20,
    },
    routePath: {
        position: 'absolute',
        left: '25%',
        top: '30%',
        width: '50%',
        height: 100,
        borderLeftWidth: 3,
        borderBottomWidth: 3,
        borderColor: colors.primary,
        borderBottomLeftRadius: 20,
    },
    marker: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    storeMarker: {
        top: '20%',
        left: '20%',
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.surfaceDark,
        borderWidth: 2,
        borderColor: colors.textSecondary,
    },
    driverMarker: {
        top: '35%',
        left: '40%',
    },
    driverMarkerAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 3,
        borderColor: colors.primary,
    },
    driverNameBubble: {
        position: 'absolute',
        bottom: -20,
        backgroundColor: colors.surfaceDark,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    driverNameBubbleText: { fontSize: fontSize.xs, color: colors.textPrimary, fontWeight: '500' },
    destinationMarker: {
        bottom: '25%',
        right: '20%',
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.backgroundDark,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    statusCard: {
        flex: 1,
        backgroundColor: colors.backgroundLight,
        borderTopLeftRadius: borderRadius.xxl,
        borderTopRightRadius: borderRadius.xxl,
        padding: spacing.xl,
        marginTop: -20,
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    statusLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
    },
    statusLabel: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
    updatedText: { fontSize: fontSize.xs, color: '#6b7280' },
    arrivalTime: { fontSize: 28, fontWeight: '700', color: '#1f2937', marginBottom: spacing.lg },
    progressContainer: { marginBottom: spacing.xl },
    progressBg: {
        height: 6,
        backgroundColor: '#e5e7eb',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 3,
    },
    progressDots: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -9,
        paddingHorizontal: spacing.sm,
    },
    progressDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#e5e7eb',
        borderWidth: 2,
        borderColor: colors.backgroundLight,
    },
    progressDotActive: { backgroundColor: colors.primary },
    driverSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f3f4f6',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },
    driverLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    driverAvatar: { width: 48, height: 48, borderRadius: 24 },
    driverInfo: {},
    driverNameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    driverNameText: { fontSize: fontSize.md, fontWeight: '700', color: '#1f2937' },
    vehicleText: { fontSize: fontSize.sm, color: '#6b7280', marginTop: 2 },
    driverActions: { flexDirection: 'row', gap: spacing.sm },
    actionButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(19, 236, 109, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    callButton: { backgroundColor: colors.primary },
    orderSection: {
        backgroundColor: '#f3f4f6',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    orderItemIcon: {
        width: 36,
        height: 36,
        borderRadius: borderRadius.md,
        backgroundColor: 'rgba(19, 236, 109, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderItemInfo: { flex: 1, marginLeft: spacing.md },
    orderItemName: { fontSize: fontSize.md, fontWeight: '600', color: '#1f2937' },
    orderItemLabel: { fontSize: fontSize.sm, color: '#6b7280', marginTop: spacing.xs },
    orderItemPrices: { alignItems: 'flex-end' },
    orderItemPrice: { fontSize: fontSize.md, fontWeight: '600', color: '#1f2937' },
    orderItemFee: { fontSize: fontSize.sm, color: '#6b7280', marginTop: spacing.xs },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    totalLabel: { fontSize: fontSize.md, fontWeight: '600', color: '#1f2937' },
    totalValue: { fontSize: fontSize.lg, fontWeight: '700', color: colors.primary },
});
