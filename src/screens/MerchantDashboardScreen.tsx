import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const MERCHANT_LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK9xzyP8Aa9138xozzmqSH6w6Diq00BLQvLsRyy7QLevbg55huxaKSGpSCWvJYJPCiMxS2xxMFvoDp9NcaBj55ue3zGifKIgRuXN-yCwNbv3ftv5igIwFd50jAaicgMMjOFmcbJ6OY9PYl8ao949bGMpbv-6BKAhjVrjZ-rbSsAJY6NHggpXbxrEgSjaSIoMJ8IQh3QdXnSoH1yH7fltoO4TJguyqtzxPEu8yvHimtsCqOTpYO4ohtQVv6ATobWvjY7vSLGakQSFxY';

const stats = [
    { id: 'revenue', label: "Today's Revenue", value: '$45.00', icon: 'payments', color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.2)', change: '+12%' },
    { id: 'meals', label: 'Meals Saved', value: '5 kg', icon: 'scale', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.2)' },
    { id: 'listings', label: 'Active Listings', value: '3', icon: 'storefront', color: '#f97316', bgColor: 'rgba(249, 115, 22, 0.2)' },
];

const pendingOrders = [
    { id: '1234', items: '2x Surprise Bags', time: '8:00 PM', customer: 'Alex D.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHXqKWieP7EFXume0cd2BIBDob5HrdudvzzIdjFcKJ3AbjewkZ81uKqRxwt-GTgVZK0U9oqpz6ZQWS6Y0n8vaU34NRODqnIRurUwS4lVqQwJHsQLNFRoK0ln3pgemeG_15jkEVJlcldEp_kSmi0wK9FDN_eRJkpzCkl_wL4GWM6S0xf44x6jRIBekwstHIT_usamoD57a6-MGKa0ZsxSFvc9sA2LJZ_BMLvNfmI8stcunbZCaz9Cn8lDUARt2Gcvx8jwS9uRzpwZWO', icon: 'shopping-bag' },
    { id: '1235', items: '1x Pastry Box', time: '8:15 PM', customer: 'Sarah M.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAESXl7__Kkccn_0qhm0K1ej-jThYQTIsJ_YCygTO_bmOSEj1leLwMklt8YNTwmR2WcmkwsqpQgIUOn6SlWqAo-KtuR6fUL0WHs8Hkk7u5Xe5p9kqtzso8QamhD1JwlYS3P393BRaLW9XoDwoEBkOUmDD134ALWxMQ9aCsYrtyBk5jNlvPxLcY7Ph1K-nI0FPepuN0zngnU9bpa0G2DV01VnGMEk7Q7XjmHSrz_FugYRXf6Or4Np9n713fU9h3H5YuKw_8wc6-5eoYg', icon: 'bakery-dining' },
];

const activeListings = [
    { id: '1', name: 'Mystery Pastry Bag', ends: '2h', price: '$4.99', stock: 3, stockPercent: 40, status: 'Live', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDazL-S56m1LGCDi2gkb5qcGG5lFoyqYByD_ipVB6-8DDDtcNPNvd5jsFqY6RTTSktKh5pjKXn11WI2-pcAuJpX2kggN9SZ-AZOo-OjTGjTStejgziMGvrpRAdkv6fe0HjipqqARVtLsqg_UcpX3S3q-hqIwNGDXGMFUfAZdO1vTidn0xX6vgjzkngRRPogkWsNoaWKQd7dy5eejslDSUVfkjH0LhCk58B4GR713v26NPW8bw2pesap33CRRiZ6dv6IQp40Gv2onZOJ' },
    { id: '2', name: 'Sourdough Loaf', ends: '45m', price: '$3.50', stock: 1, stockPercent: 15, status: 'Low', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1FZK2PoAFkyElQjcsbuEXX17OpGjaNs_YJ8gI1LdP9NeVuXs3QpGNJua_N3l-3NIB0e47tn7gWWD8VyKRETA89gpJ3B4zIZEftZJSvoPIvCkbV-DlyY1yB3e8gBPBDrXxnCz-Gs0RyvS8sgJVyMBYJKEYSV02Qqkg1sYwMcV5j_O7bIM1lQWKG1Nn4KveO3wVNGY8076yU2I3Y1uNJqYQd04L-Q2gMabvWqJC7CDn3_UigTtx97HRTHNNERjbKaOECsXVg5CZePtF' },
];

export const MerchantDashboardScreen = ({ navigation }: { navigation: any }) => {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.logoContainer}><Image source={{ uri: MERCHANT_LOGO }} style={styles.logo} /><View style={styles.onlineIndicator} /></View>
                        <View><Text style={styles.merchantName}>Joe's Bakery</Text><Text style={styles.accountType}>Merchant Account</Text></View>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}><MaterialIcons name="notifications" size={24} color={colors.textPrimary} /><View style={styles.notificationDot} /></TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.greeting}>
                        <View><Text style={styles.date}>Thursday, Oct 24</Text><Text style={styles.greetingTitle}>Ready to{'\n'}save food?</Text></View>
                        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('PostListing')}><MaterialIcons name="add" size={32} color={colors.primaryContent} /></TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsContainer}>
                        {stats.map((stat) => (
                            <View key={stat.id} style={styles.statCard}>
                                <View style={styles.statHeader}><View style={[styles.statIcon, { backgroundColor: stat.bgColor }]}><MaterialIcons name={stat.icon as any} size={24} color={stat.color} /></View>{stat.change && <View style={styles.changeBadge}><Text style={styles.changeText}>{stat.change}</Text></View>}</View>
                                <Text style={styles.statLabel}>{stat.label}</Text><Text style={styles.statValue}>{stat.value}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.section}>
                        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Action Required</Text><View style={styles.pendingBadge}><Text style={styles.pendingText}>2 Pending</Text></View></View>
                        {pendingOrders.map((order, index) => (
                            <TouchableOpacity key={order.id} style={[styles.orderCard, index === 0 && styles.orderCardHighlight]} onPress={() => navigation.navigate('OrderDetail')}>
                                <View style={styles.orderHeader}><View style={styles.orderLeft}><View style={styles.orderIcon}><MaterialIcons name={order.icon as any} size={20} color={colors.textSecondary} /></View><View><Text style={styles.orderId}>Order #{order.id}</Text><Text style={styles.orderItems}>{order.items}</Text></View></View><Text style={styles.orderTime}>{order.time}</Text></View>
                                <View style={styles.orderFooter}><View style={styles.customerInfo}><Image source={{ uri: order.avatar }} style={styles.customerAvatar} /><Text style={styles.customerName}>{order.customer}</Text></View><View style={styles.orderActions}><TouchableOpacity><Text style={styles.declineBtn}>Decline</Text></TouchableOpacity><TouchableOpacity style={styles.acceptBtn}><Text style={styles.acceptBtnText}>Accept</Text></TouchableOpacity></View></View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Active Listings</Text><TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity></View>
                        {activeListings.map((listing) => (
                            <View key={listing.id} style={[styles.listingCard, listing.status === 'Low' && styles.listingCardLow]}>
                                <Image source={{ uri: listing.imageUrl }} style={styles.listingImage} />
                                <View style={styles.listingContent}>
                                    <View style={styles.listingHeader}><Text style={styles.listingName}>{listing.name}</Text><View style={[styles.statusBadge, listing.status === 'Live' ? styles.statusLive : styles.statusLow]}><Text style={[styles.statusText, listing.status === 'Live' ? styles.statusTextLive : styles.statusTextLow]}>{listing.status.toUpperCase()}</Text></View></View>
                                    <Text style={styles.listingMeta}>Ends in {listing.ends} • {listing.price}</Text>
                                    <View style={styles.stockRow}><View style={styles.stockLabels}><Text style={styles.stockLabel}>Stock</Text><Text style={styles.stockValue}>{listing.stock} left</Text></View><View style={styles.stockBar}><View style={[styles.stockFill, { width: `${listing.stockPercent}%`, backgroundColor: listing.status === 'Live' ? colors.primary : '#f97316' }]} /></View></View>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
            <BottomNav activeTab={activeTab} onTabPress={(tab) => { setActiveTab(tab); if (tab === 'listings') navigation.navigate('PostListing'); }} type="merchant" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundDark },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    logoContainer: { position: 'relative' },
    logo: { width: 40, height: 40, borderRadius: borderRadius.full, borderWidth: 2, borderColor: colors.primary + '55' },
    onlineIndicator: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary, borderWidth: 2, borderColor: colors.backgroundDark },
    merchantName: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textPrimary },
    accountType: { fontSize: fontSize.xs, color: colors.textSecondary },
    notificationButton: { width: 40, height: 40, borderRadius: borderRadius.full, backgroundColor: colors.surfaceDark, alignItems: 'center', justifyContent: 'center', position: 'relative' },
    notificationDot: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444' },
    scrollView: { flex: 1 },
    scrollContent: { paddingBottom: 100 },
    greeting: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.sm },
    date: { fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.xs },
    greetingTitle: { fontSize: 28, fontWeight: '700', color: colors.textPrimary, lineHeight: 32 },
    addButton: { width: 56, height: 56, borderRadius: borderRadius.full, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
    statsContainer: { paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, gap: spacing.lg },
    statCard: { minWidth: 160, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg },
    statHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: spacing.md },
    statIcon: { padding: spacing.sm, borderRadius: borderRadius.md },
    changeBadge: { backgroundColor: 'rgba(19, 236, 109, 0.1)', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
    changeText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.primary },
    statLabel: { fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.xs },
    statValue: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary },
    section: { paddingHorizontal: spacing.lg, marginBottom: spacing.lg },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
    sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    pendingBadge: { backgroundColor: 'rgba(239, 68, 68, 0.1)', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
    pendingText: { fontSize: fontSize.xs, fontWeight: '700', color: '#ef4444' },
    viewAll: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
    orderCard: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md, borderLeftWidth: 4, borderLeftColor: 'transparent' },
    orderCardHighlight: { borderLeftColor: colors.primary },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md },
    orderLeft: { flexDirection: 'row', gap: spacing.md },
    orderIcon: { width: 48, height: 48, borderRadius: borderRadius.md, backgroundColor: colors.backgroundDark, alignItems: 'center', justifyContent: 'center' },
    orderId: { fontSize: fontSize.md, fontWeight: '700', color: colors.textPrimary },
    orderItems: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
    orderTime: { fontSize: fontSize.xs, color: colors.textSecondary, backgroundColor: colors.backgroundDark, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.05)' },
    customerInfo: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    customerAvatar: { width: 24, height: 24, borderRadius: borderRadius.full },
    customerName: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: '500' },
    orderActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    declineBtn: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
    acceptBtn: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md, shadowColor: colors.primary, shadowOpacity: 0.2, shadowRadius: 4, elevation: 2 },
    acceptBtnText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primaryContent },
    listingCard: { flexDirection: 'row', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, overflow: 'hidden', marginBottom: spacing.md },
    listingCardLow: { opacity: 0.75 },
    listingImage: { width: 96, height: '100%' },
    listingContent: { flex: 1, padding: spacing.md },
    listingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    listingName: { fontSize: fontSize.sm, fontWeight: '700', color: colors.textPrimary },
    statusBadge: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
    statusLive: { backgroundColor: 'rgba(19, 236, 109, 0.2)' },
    statusLow: { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
    statusText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
    statusTextLive: { color: colors.primary },
    statusTextLow: { color: colors.textSecondary },
    listingMeta: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: spacing.xs },
    stockRow: { marginTop: spacing.md },
    stockLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
    stockLabel: { fontSize: fontSize.xs, color: colors.textSecondary },
    stockValue: { fontSize: fontSize.xs, color: colors.textPrimary, fontWeight: '500' },
    stockBar: { height: 6, backgroundColor: colors.backgroundDark, borderRadius: borderRadius.full },
    stockFill: { height: '100%', borderRadius: borderRadius.full },
});
