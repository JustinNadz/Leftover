import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const inventoryItems = [
    { id: '1', name: 'Chicken Adobo Rice Meal', price: 99.00, originalPrice: 180.00, isLive: true, quantity: 5, status: 'live', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT8SXBB5rGVZf0YS1H9mtcZwNxNJeGqHTLKlJKyAEnJ0pOANnXd7lWfEWYaZ5jt8j5h9BRMYbqELrwQZn7Fb2Zy3zWqXsQF0wkYz8YwKbP0lQpFVZKVNdKLn3j9wRc0D5q-Q8' },
    { id: '2', name: 'Beef Tapa & Egg', price: 120.00, originalPrice: null, isLive: true, quantity: 2, status: 'low', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkO4AmJmSk3__W3AklVco8zMmftp7mTgRbX8-NX6hG8Nk2LdAEdU0PdncW49rM35WKdg_d5XVbp-SfCH5E345KeukkX10IGksht997JyWFdsZG_oBjqOaxQThlUhnOM4L1V9GAuw3Dh1d36ADDkHfRuTbczQoMkIDcdfiC6mzY4dhAxAPbC8NO2bTyb_O7GbRdq1mATdtmzYcqr-bl_EufOKzL4fojD3-fDWg67xewuHA0EwWzX8BjnsZR2kAoTjBfwE5qXfAx8bpr' },
    { id: '3', name: 'Ube Cheese Pandesal (6pcs)', price: 75.00, originalPrice: null, isLive: false, quantity: 0, status: 'sold', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR-hBuMZnzy-zf7wEqgphKw8NTVfN5DgDoE99hdOrIoHmbupwEzOzrHMpRmM-jqG3ZXHryWXyniipk0294ybhVILc2kGLKu-todN5Bi_JboIBZ8aNgWloTQvdt2WKl84qb8SVLeoF_64_Oc2gtY73mXpw91bBlR4mlAMU6PvEGHFX1a_DZQa0vJ5ouigYMMXqMPAYI88zaEXot6xUjq8JvpEZjeHH4Ipa3S7s5CcQ9Qc6y_4JwIBrjTE5j5oLA5ap1qpNKqK4J4pVk' },
];

const filterTabs = ['All Items', 'Low Stock', 'Sold Out', 'Paused'];

interface InventoryScreenProps {
    navigation: any;
}

export const InventoryScreen: React.FC<InventoryScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('listings');
    const [selectedFilter, setSelectedFilter] = useState('All Items');
    const [items, setItems] = useState(inventoryItems);

    const toggleLive = (id: string) => {
        setItems(items.map(item => item.id === id ? { ...item, isLive: !item.isLive } : item));
    };

    const updateQuantity = (id: string, delta: number) => {
        setItems(items.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item));
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Inventory</Text>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.headerBtn}>
                            <MaterialIcons name="search" size={24} color={colors.textPrimary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerBtn}>
                            <MaterialIcons name="filter-list" size={24} color={colors.textPrimary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>3</Text>
                        <Text style={styles.statLabel}>ACTIVE LISTINGS</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>ITEMS AVAILABLE</Text>
                    </View>
                </View>

                {/* Filter Tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
                    {filterTabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.filterTab, selectedFilter === tab && styles.filterTabActive]}
                            onPress={() => setSelectedFilter(tab)}
                        >
                            <Text style={[styles.filterText, selectedFilter === tab && styles.filterTextActive]}>{tab}</Text>
                            {tab === 'Low Stock' && <View style={styles.filterBadge}><Text style={styles.filterBadgeText}>2</Text></View>}
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {items.map((item) => (
                        <View key={item.id} style={styles.itemCard}>
                            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                            <View style={styles.itemContent}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    {item.status === 'low' && (
                                        <View style={styles.lowStockBadge}><Text style={styles.lowStockText}>LOW STOCK</Text></View>
                                    )}
                                    <TouchableOpacity><MaterialIcons name="more-vert" size={20} color={colors.textSecondary} /></TouchableOpacity>
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.itemPrice}>₱{item.price.toFixed(2)}</Text>
                                    {item.originalPrice && <Text style={styles.itemOriginal}>₱{item.originalPrice.toFixed(2)}</Text>}
                                </View>
                                <View style={styles.controlsRow}>
                                    <View style={styles.liveToggle}>
                                        <Switch
                                            value={item.isLive}
                                            onValueChange={() => toggleLive(item.id)}
                                            trackColor={{ false: colors.surfaceHighlight, true: colors.primary + '55' }}
                                            thumbColor={item.isLive ? colors.primary : colors.textSecondary}
                                        />
                                        <Text style={styles.liveText}>{item.isLive ? 'Live' : 'Sold Out'}</Text>
                                    </View>
                                    {item.status !== 'sold' ? (
                                        <View style={styles.quantityControls}>
                                            <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, -1)}>
                                                <MaterialIcons name="remove" size={18} color={colors.textPrimary} />
                                            </TouchableOpacity>
                                            <Text style={styles.qtyValue}>{item.quantity}</Text>
                                            <TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnActive]} onPress={() => updateQuantity(item.id, 1)}>
                                                <MaterialIcons name="add" size={18} color={colors.backgroundDark} />
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <TouchableOpacity style={styles.restockBtn}>
                                            <Text style={styles.restockText}>Restock</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                {item.status === 'low' && (
                                    <TouchableOpacity style={styles.markSoldBtn}>
                                        <Text style={styles.markSoldText}>MARK SOLD OUT</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* FAB */}
                <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('PostListing')}>
                    <MaterialIcons name="add" size={28} color={colors.backgroundDark} />
                </TouchableOpacity>
            </SafeAreaView>
            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'dashboard') navigation.navigate('MerchantDashboard');
                }}
                type="merchant"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundDark },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    headerTitle: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary },
    headerActions: { flexDirection: 'row', gap: spacing.sm },
    headerBtn: { width: 40, height: 40, borderRadius: borderRadius.full, backgroundColor: colors.surfaceDark, alignItems: 'center', justifyContent: 'center' },
    statsRow: { flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.lg },
    statCard: { flex: 1, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, alignItems: 'center' },
    statValue: { fontSize: 32, fontWeight: '700', color: colors.textPrimary },
    statLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: spacing.xs },
    filterContainer: { paddingHorizontal: spacing.lg, gap: spacing.sm, marginBottom: spacing.lg },
    filterTab: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.surfaceHighlight, marginRight: spacing.sm },
    filterTabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    filterText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary },
    filterTextActive: { color: colors.backgroundDark },
    filterBadge: { backgroundColor: '#f97316', width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
    filterBadgeText: { fontSize: 10, fontWeight: '700', color: '#fff' },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 180 },
    itemCard: { flexDirection: 'row', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, overflow: 'hidden', marginBottom: spacing.md },
    itemImage: { width: 100, height: 120 },
    itemContent: { flex: 1, padding: spacing.md },
    itemHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: spacing.xs },
    itemName: { flex: 1, fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    lowStockBadge: { backgroundColor: '#f97316', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm, marginLeft: spacing.sm },
    lowStockText: { fontSize: 8, fontWeight: '700', color: '#fff' },
    priceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
    itemPrice: { fontSize: fontSize.lg, fontWeight: '700', color: colors.primary },
    itemOriginal: { fontSize: fontSize.sm, color: colors.textSecondary, textDecorationLine: 'line-through' },
    controlsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    liveToggle: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    liveText: { fontSize: fontSize.sm, color: colors.textSecondary },
    quantityControls: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    qtyBtn: { width: 32, height: 32, borderRadius: borderRadius.md, backgroundColor: colors.surfaceHighlight, alignItems: 'center', justifyContent: 'center' },
    qtyBtnActive: { backgroundColor: colors.primary },
    qtyValue: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary, minWidth: 24, textAlign: 'center' },
    restockBtn: { backgroundColor: colors.surfaceHighlight, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
    restockText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textPrimary },
    markSoldBtn: { marginTop: spacing.md, paddingVertical: spacing.sm, borderTopWidth: 1, borderTopColor: colors.surfaceHighlight },
    markSoldText: { fontSize: fontSize.sm, fontWeight: '600', color: '#f97316', textAlign: 'center' },
    fab: { position: 'absolute', bottom: 100, right: spacing.lg, width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
});
