import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const readyOrders = [
    { id: '1', merchant: "Joe's Bagels", price: '₱199.00', pickup: 'Pickup by 5:00 PM today', status: 'Ready', items: '1x Surplus Surprise Bag', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDazL-S56m1LGCDi2gkb5qcGG5lFoyqYByD_ipVB6-8DDDtcNPNvd5jsFqY6RTTSktKh5pjKXn11WI2-pcAuJpX2kggN9SZ-AZOo-OjTGjTStejgziMGvrpRAdkv6fe0HjipqqARVtLsqg_UcpX3S3q-hqIwNGDXGMFUfAZdO1vTidn0xX6vgjzkngRRPogkWsNoaWKQd7dy5eejslDSUVfkjH0LhCk58B4GR713v26NPW8bw2pesap33CRRiZ6dv6IQp40Gv2onZOJ' },
];

const preparingOrders = [
    { id: '2', merchant: 'Sushi Spot', price: '₱650.00', pickup: 'Pickup by 7:30 PM today', status: 'Preparing', statusNote: 'Confirmation pending', items: '2x items', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1FZK2PoAFkyElQjcsbuEXX17OpGjaNs_YJ8gI1LdP9NeVuXs3QpGNJua_N3l-3NIB0e47tn7gWWD8VyKRETA89gpJ3B4zIZEftZJSvoPIvCkbV-DlyY1yB3e8gBPBDrXxnCz-Gs0RyvS8sgJVyMBYJKEYSV02Qqkg1sYwMcV5j_O7bIM1lQWKG1Nn4KveO3wVNGY8076yU2I3Y1uNJqYQd04L-Q2gMabvWqJC7CDn3_UigTtx97HRTHNNERjbKaOECsXVg5CZePtF' },
    { id: '3', merchant: 'Green Leaf Salad', price: '₱280.00', pickup: 'Pickup tomorrow 10:00 AM', status: 'Preparing', statusNote: 'Merchant Preparing', items: '1x item', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeEKWS2w8xaVGNiRxfAwxKJ3PNpGRvcmPBa74CJRFHKqRsNFdEd8HBvIk2fPOl5yMxsaXRNNYQtQB8nBZCWFZWcq5yN2MLKJwWgQ0KlKIyLwvVKYlsAZ8CJQxTKM0pJv8q3v8' },
];

const completedOrders = [
    { id: '4', merchant: 'Pizza Palace', price: '₱125.00', date: 'Yesterday', status: 'Completed', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT8SXBB5rGVZf0YS1H9mtcZwNxNJeGqHTLKlJKyAEnJ0pOANnXd7lWfEWYaZ5jt8j5h9BRMYbqELrwQZn7Fb2Zy3zWqXsQF0wkYz8YwKbP0lQpFVZKVNdKLn3j9wRc0D5q-Q8' },
];

export const BuyerOrdersScreen = ({ navigation }: { navigation: any }) => {
    const [activeTab, setActiveTab] = useState('orders');
    const [orderTab, setOrderTab] = useState<'Active' | 'History'>('Active');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Your Orders</Text>
                    <TouchableOpacity style={styles.filterBtn}>
                        <MaterialIcons name="tune" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.tabContainer}>
                    {(['Active', 'History'] as const).map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, orderTab === tab && styles.tabActive]}
                            onPress={() => setOrderTab(tab)}
                        >
                            <Text style={[styles.tabText, orderTab === tab && styles.tabTextActive]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {orderTab === 'Active' ? (
                        <>
                            {readyOrders.length > 0 && (
                                <View style={styles.section}>
                                    <View style={styles.sectionHeader}>
                                        <Text style={styles.sectionTitle}>Ready for Pickup</Text>
                                        <View style={styles.countBadge}>
                                            <Text style={styles.countText}>{readyOrders.length} Order</Text>
                                        </View>
                                    </View>
                                    {readyOrders.map((order) => (
                                        <TouchableOpacity key={order.id} style={[styles.orderCard, styles.orderCardReady]}>
                                            <Image source={{ uri: order.imageUrl }} style={styles.orderImage} />
                                            <View style={styles.orderContent}>
                                                <View style={styles.orderHeader}>
                                                    <Text style={styles.merchantName}>{order.merchant}</Text>
                                                    <Text style={styles.orderPrice}>{order.price}</Text>
                                                </View>
                                                <Text style={styles.pickupText}>{order.pickup}</Text>
                                                <View style={styles.orderFooter}>
                                                    <View style={styles.itemsBadge}>
                                                        <MaterialIcons name="shopping-bag" size={14} color={colors.textSecondary} />
                                                        <Text style={styles.itemsText}>{order.items}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            {preparingOrders.length > 0 && (
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Preparing</Text>
                                    {preparingOrders.map((order) => (
                                        <TouchableOpacity key={order.id} style={styles.orderCard}>
                                            <Image source={{ uri: order.imageUrl }} style={styles.orderImage} />
                                            <View style={styles.orderContent}>
                                                <View style={styles.orderHeader}>
                                                    <Text style={styles.merchantName}>{order.merchant}</Text>
                                                    <Text style={styles.orderPrice}>{order.price}</Text>
                                                </View>
                                                <Text style={styles.pickupText}>{order.pickup}</Text>
                                                <View style={styles.orderFooter}>
                                                    <View style={styles.statusBadge}>
                                                        <MaterialIcons name="hourglass-top" size={12} color={colors.textSecondary} />
                                                        <Text style={styles.statusNote}>{order.statusNote}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </>
                    ) : (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Recently Completed</Text>
                            {completedOrders.map((order) => (
                                <TouchableOpacity key={order.id} style={[styles.orderCard, styles.orderCardCompleted]}>
                                    <Image source={{ uri: order.imageUrl }} style={styles.orderImage} />
                                    <View style={styles.orderContent}>
                                        <View style={styles.orderHeader}>
                                            <Text style={styles.merchantName}>{order.merchant}</Text>
                                            <Text style={styles.orderPrice}>{order.price}</Text>
                                        </View>
                                        <Text style={styles.completedDate}>{order.date}</Text>
                                        <View style={styles.completedBadge}>
                                            <MaterialIcons name="check-circle" size={14} color={colors.primary} />
                                            <Text style={styles.completedText}>Completed</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'home') navigation.navigate('BuyerHome');
                }}
                type="buyer"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundDark },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    headerTitle: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary },
    filterBtn: { width: 40, height: 40, borderRadius: borderRadius.full, backgroundColor: colors.surfaceDark, alignItems: 'center', justifyContent: 'center' },
    tabContainer: { flexDirection: 'row', marginHorizontal: spacing.lg, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.xs },
    tab: { flex: 1, paddingVertical: spacing.md, alignItems: 'center', borderRadius: borderRadius.md },
    tabActive: { backgroundColor: colors.surfaceHighlight },
    tabText: { fontSize: fontSize.md, fontWeight: '500', color: colors.textSecondary },
    tabTextActive: { color: colors.textPrimary, fontWeight: '700' },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 100 },
    section: { marginBottom: spacing.xl },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
    sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
    countBadge: { backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
    countText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.backgroundDark },
    orderCard: { flexDirection: 'row', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, overflow: 'hidden', marginBottom: spacing.md, borderWidth: 1, borderColor: colors.surfaceHighlight },
    orderCardReady: { borderColor: colors.primary, borderWidth: 2 },
    orderCardCompleted: { opacity: 0.7 },
    orderImage: { width: 80, height: 80 },
    orderContent: { flex: 1, padding: spacing.md },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    merchantName: { fontSize: fontSize.md, fontWeight: '700', color: colors.textPrimary },
    orderPrice: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary },
    pickupText: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
    orderFooter: { marginTop: spacing.sm },
    itemsBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    itemsText: { fontSize: fontSize.xs, color: colors.textSecondary },
    statusBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surfaceHighlight, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm, alignSelf: 'flex-start' },
    statusNote: { fontSize: fontSize.xs, color: colors.textSecondary },
    completedDate: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
    completedBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.sm },
    completedText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '500' },
});
