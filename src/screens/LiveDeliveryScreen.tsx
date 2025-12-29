import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const { width } = Dimensions.get('window');

interface LiveDeliveryScreenProps {
    navigation: any;
}

export const LiveDeliveryScreen: React.FC<LiveDeliveryScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('orders');

    const orderId = '#4592';
    const eta = 12;
    const driverName = 'Juan Dela Cruz';
    const vehicle = 'Honda Click 125i • ABC-1234';
    const driverRating = 4.9;
    const orderItems = '2x Spicy Chicken Surplus';
    const orderTotal = '₱180.00';
    const merchantName = 'Mang Inasal';

    return (
        <View style={styles.container}>
            {/* Map Background */}
            <View style={styles.mapContainer}>
                <Image
                    source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=14.5995,120.9842&zoom=12&size=600x400&maptype=roadmap&style=feature:all|element:geometry|color:0x242f3e&style=feature:all|element:labels.text.stroke|color:0x242f3e&style=feature:all|element:labels.text.fill|color:0x746855&style=feature:water|element:geometry|color:0x17263c&key=demo' }}
                    style={styles.mapImage}
                    resizeMode="cover"
                />
                {/* Fake overlay for map look */}
                <View style={styles.mapOverlay}>
                    {/* Route line representation */}
                    <View style={styles.routeLine} />

                    {/* Merchant Marker */}
                    <View style={styles.merchantMarker}>
                        <View style={styles.merchantBadge}>
                            <MaterialIcons name="store" size={12} color={colors.backgroundDark} />
                            <Text style={styles.merchantMarkerText}>{merchantName}</Text>
                        </View>
                    </View>

                    {/* Driver Marker */}
                    <View style={styles.driverMarker}>
                        <MaterialIcons name="delivery-dining" size={20} color={colors.backgroundDark} />
                    </View>
                </View>

                {/* Header */}
                <SafeAreaView style={styles.headerOverlay}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                        </TouchableOpacity>
                        <Text style={styles.orderId}>Order {orderId}</Text>
                        <TouchableOpacity style={styles.helpBtn}>
                            <MaterialIcons name="help-outline" size={24} color={colors.textPrimary} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                {/* Map Controls */}
                <View style={styles.mapControls}>
                    <TouchableOpacity style={styles.mapControlBtn}>
                        <MaterialIcons name="my-location" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mapControlBtn}>
                        <MaterialIcons name="add" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mapControlBtn}>
                        <MaterialIcons name="remove" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom Sheet */}
            <View style={styles.bottomSheet}>
                {/* ETA Header */}
                <View style={styles.etaRow}>
                    <View>
                        <Text style={styles.etaTitle}>Arriving in {eta} mins</Text>
                        <Text style={styles.etaSubtitle}>Driver Juan is nearby with your surplus meal.</Text>
                    </View>
                    <View style={styles.onTheWayBadge}>
                        <Text style={styles.onTheWayText}>ON THE{'\n'}WAY</Text>
                    </View>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressBar}>
                    <View style={styles.progressDotActive} />
                    <View style={styles.progressLineActive} />
                    <View style={styles.progressDotActive} />
                    <View style={styles.progressLineActive} />
                    <View style={styles.progressDotActive} />
                    <View style={styles.progressLine} />
                    <View style={styles.progressDot} />
                </View>

                {/* Driver Info */}
                <View style={styles.driverCard}>
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHMLxUXi0vOvWtx60JlhXNsWI-9QjydJS8l8yXmMoe96cuJBb0Hn0JF4W-To09wL0pxZiZGnAZrpX00wvJ2yLATIyj_lU7sY1msrYBqoE0fBppCHFYw727SxgOOQaTxaLBjpgaM5gXid5yi904FGU4_33FnGxjfjNIlIYWuFg77jZwSUceQxBOi02s9BVTJzzU27CMb1TytFGTgTuqZ5MnaGVjeLpOg6FAMhB04bnwtWL5JHgzLC-q52wZ8sCcTmBRmkdaiybqQZcQ' }}
                        style={styles.driverAvatar}
                    />
                    <View style={styles.driverInfo}>
                        <Text style={styles.driverName}>{driverName}</Text>
                        <Text style={styles.vehicleInfo}>{vehicle}</Text>
                        <View style={styles.ratingRow}>
                            <MaterialIcons name="star" size={14} color="#fbbf24" />
                            <Text style={styles.ratingText}>{driverRating}</Text>
                        </View>
                    </View>
                    <View style={styles.contactButtons}>
                        <TouchableOpacity style={styles.contactBtn}>
                            <MaterialIcons name="chat" size={20} color={colors.backgroundDark} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.contactBtn, styles.callBtn]}>
                            <MaterialIcons name="call" size={20} color={colors.backgroundDark} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Order Summary */}
                <View style={styles.orderSummary}>
                    <View style={styles.summaryLeft}>
                        <MaterialIcons name="shopping-bag" size={18} color={colors.primary} />
                        <Text style={styles.summaryText}>{orderItems}</Text>
                    </View>
                    <Text style={styles.summaryPrice}>{orderTotal}</Text>
                </View>
            </View>

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
    mapContainer: { flex: 1, position: 'relative' },
    mapImage: { width: '100%', height: '100%', backgroundColor: '#1a2634' },
    mapOverlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
    routeLine: { position: 'absolute', width: 4, height: '60%', backgroundColor: colors.primary, borderRadius: 2, transform: [{ rotate: '-30deg' }] },
    merchantMarker: { position: 'absolute', top: '25%', right: '30%' },
    merchantBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.md },
    merchantMarkerText: { fontSize: fontSize.xs, fontWeight: '600', color: colors.backgroundDark },
    driverMarker: { position: 'absolute', bottom: '40%', left: '35%', width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
    headerOverlay: { position: 'absolute', top: 0, left: 0, right: 0 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceDark + 'dd', alignItems: 'center', justifyContent: 'center' },
    orderId: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    helpBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceDark + 'dd', alignItems: 'center', justifyContent: 'center' },
    mapControls: { position: 'absolute', right: spacing.lg, bottom: spacing.xl, gap: spacing.sm },
    mapControlBtn: { width: 40, height: 40, borderRadius: borderRadius.md, backgroundColor: colors.surfaceDark + 'dd', alignItems: 'center', justifyContent: 'center' },
    bottomSheet: { backgroundColor: colors.backgroundDark, borderTopLeftRadius: borderRadius.xl, borderTopRightRadius: borderRadius.xl, padding: spacing.lg, paddingBottom: 100, marginTop: -spacing.xl },
    etaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.lg },
    etaTitle: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary },
    etaSubtitle: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs, maxWidth: width * 0.65 },
    onTheWayBadge: { backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
    onTheWayText: { fontSize: 10, fontWeight: '700', color: colors.backgroundDark, textAlign: 'center', lineHeight: 14 },
    progressBar: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
    progressDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.surfaceHighlight },
    progressDotActive: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
    progressLine: { flex: 1, height: 4, backgroundColor: colors.surfaceHighlight },
    progressLineActive: { flex: 1, height: 4, backgroundColor: colors.primary },
    driverCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.lg },
    driverAvatar: { width: 50, height: 50, borderRadius: 25 },
    driverInfo: { flex: 1, marginLeft: spacing.md },
    driverName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    vehicleInfo: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.xs },
    ratingText: { fontSize: fontSize.sm, color: colors.textPrimary },
    contactButtons: { flexDirection: 'row', gap: spacing.sm },
    contactBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
    callBtn: { backgroundColor: '#22c55e' },
    orderSummary: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg },
    summaryLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    summaryText: { fontSize: fontSize.sm, color: colors.textPrimary },
    summaryPrice: { fontSize: fontSize.md, fontWeight: '700', color: colors.textPrimary },
});
