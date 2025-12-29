import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const filterTabs = ['Highest Urgency', 'Best Value', 'Meals'];

const recommendations = [
    { id: '1', name: 'Tuna Pesto Pasta (Qty: 5)', originalPrice: 180, suggestedPrice: 110, discount: 39, badge: 'Lunch rush active', badgeColor: '#22c55e', timeLeft: '3h left', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT8SXBB5rGVZf0YS1H9mtcZwNxNJeGqHTLKlJKyAEnJ0pOANnXd7lWfEWYaZ5jt8j5h9BRMYbqELrwQZn7Fb2Zy3zWqXsQF0wkYz8YwKbP0lQpFVZKVNdKLn3j9wRc0D5q-Q8' },
    { id: '2', name: 'Assorted Pastries (Qty: 8)', originalPrice: 250, suggestedPrice: 150, discount: 40, badge: 'Expires soon', badgeColor: '#f97316', timeLeft: '1h left', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj3eGhnRBsKJm-PLD1MDEM_2F8Vsg5vDLeIhbIdZ0ID2xt_TzDRqy5jWJkILIona4nuP4Dq-Zake9nz0Z4AQvCIUlEropdB1d8pYS4JyPLoewQsOzj8JwTn_oatnRQsGonQ19GpHzEEzrDUfTCTpdRk5pVVznPs64ppU2vk7h4u_YHpxlAnDMRu9na2zJS3yATqmIellczsNmNYPlp3qaXdsMo3tDwtL68einH_cjIKv-LK7rdkafSauFND4KntSrFS2wb-uWoqkcu' },
    { id: '3', name: 'Chicken Adobo Rice (Qty...', originalPrice: 165, suggestedPrice: 120, discount: 27, badge: 'Overstock', badgeColor: '#a855f7', timeLeft: '4h left', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkO4AmJmSk3__W3AklVco8zMmftp7mTgRbX8-NX6hG8Nk2LdAEdU0PdncW49rM35WKdg_d5XVbp-SfCH5E345KeukkX10IGksht997JyWFdsZG_oBjqOaxQThlUhnOM4L1V9GAuw3Dh1d36ADDkHfRuTbczQoMkIDcdfiC6mzY4dhAxAPbC8NO2bTyb_O7GbRdq1mATdtmzYcqr-bl_EufOKzL4fojD3-fDWg67xewuHA0EwWzX8BjnsZR2kAoTjBfwE5qXfAx8bpr' },
];

interface PriceOptimizerScreenProps {
    navigation: any;
}

export const PriceOptimizerScreen: React.FC<PriceOptimizerScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('listings');
    const [selectedFilter, setSelectedFilter] = useState('Highest Urgency');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Price Optimizer</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="refresh" size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <View style={styles.statIconGreen}>
                                <MaterialIcons name="show-chart" size={18} color={colors.primary} />
                            </View>
                            <Text style={styles.statLabel}>Potential{'\n'}Revenue</Text>
                            <Text style={styles.statValueGreen}>+₱1,250</Text>
                            <Text style={styles.statSubtext}>+15% from yesterday</Text>
                        </View>
                        <View style={styles.statCard}>
                            <View style={styles.statIconGreen}>
                                <MaterialIcons name="eco" size={18} color={colors.primary} />
                            </View>
                            <Text style={styles.statLabel}>Waste Saved</Text>
                            <Text style={styles.statValue}>12 kg</Text>
                            <Text style={styles.statSubtext}>On track for goal</Text>
                        </View>
                    </View>

                    {/* Filter Tabs */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterTabs}>
                        {filterTabs.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.filterTab, selectedFilter === tab && styles.filterTabActive]}
                                onPress={() => setSelectedFilter(tab)}
                            >
                                <Text style={[styles.filterText, selectedFilter === tab && styles.filterTextActive]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Recommendations Header */}
                    <Text style={styles.sectionTitle}>{recommendations.length} Recommendations</Text>
                    <Text style={styles.sectionSubtitle}>AI-driven suggestions based on current demand.</Text>

                    {/* Recommendation Cards */}
                    {recommendations.map((item) => (
                        <View key={item.id} style={styles.recCard}>
                            <View style={styles.recHeader}>
                                <Image source={{ uri: item.imageUrl }} style={styles.recImage} />
                                <View style={styles.recInfo}>
                                    <View style={styles.badgeRow}>
                                        <View style={[styles.badge, { backgroundColor: item.badgeColor + '22' }]}>
                                            <Text style={[styles.badgeText, { color: item.badgeColor }]}>{item.badge}</Text>
                                        </View>
                                        <View style={styles.timeLeft}>
                                            <MaterialIcons name="schedule" size={12} color={colors.primary} />
                                            <Text style={styles.timeLeftText}>{item.timeLeft}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.recName}>{item.name}</Text>
                                    <View style={styles.priceRow}>
                                        <Text style={styles.originalPrice}>₱{item.originalPrice}</Text>
                                        <Text style={styles.suggestedPrice}>₱{item.suggestedPrice}</Text>
                                        <View style={styles.discountBadge}>
                                            <Text style={styles.discountText}>-{item.discount}%</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.recActions}>
                                <TouchableOpacity style={styles.rejectBtn}>
                                    <MaterialIcons name="close" size={20} color={colors.textSecondary} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.editBtn}>
                                    <MaterialIcons name="edit" size={20} color={colors.textSecondary} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.acceptBtn}>
                                    <MaterialIcons name="check" size={18} color={colors.backgroundDark} />
                                    <Text style={styles.acceptText}>Accept ₱{item.suggestedPrice}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'home') navigation.navigate('MerchantDashboard');
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
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    headerTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.textPrimary },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.lg },
    statCard: { flex: 1, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.xl, padding: spacing.lg },
    statIconGreen: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary + '22', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
    statLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginBottom: spacing.xs },
    statValue: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary },
    statValueGreen: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.primary },
    statSubtext: { fontSize: fontSize.xs, color: colors.primary, marginTop: spacing.xs },
    filterTabs: { gap: spacing.sm, marginBottom: spacing.xl },
    filterTab: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.surfaceHighlight },
    filterTabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    filterText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary },
    filterTextActive: { color: colors.backgroundDark },
    sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    sectionSubtitle: { fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.lg },
    recCard: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.xl, padding: spacing.lg, marginBottom: spacing.md },
    recHeader: { flexDirection: 'row', marginBottom: spacing.lg },
    recImage: { width: 80, height: 80, borderRadius: borderRadius.lg },
    recInfo: { flex: 1, marginLeft: spacing.md },
    badgeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
    badge: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
    badgeText: { fontSize: 10, fontWeight: '600' },
    timeLeft: { flexDirection: 'row', alignItems: 'center', gap: 2 },
    timeLeftText: { fontSize: fontSize.xs, color: colors.primary },
    recName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.sm },
    priceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    originalPrice: { fontSize: fontSize.sm, color: colors.textSecondary, textDecorationLine: 'line-through' },
    suggestedPrice: { fontSize: fontSize.lg, fontWeight: '700', color: colors.primary },
    discountBadge: { backgroundColor: colors.primary + '22', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
    discountText: { fontSize: fontSize.xs, fontWeight: '600', color: colors.primary },
    recActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    rejectBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceHighlight, alignItems: 'center', justifyContent: 'center' },
    editBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceHighlight, alignItems: 'center', justifyContent: 'center' },
    acceptBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.primary, height: 40, borderRadius: borderRadius.lg },
    acceptText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.backgroundDark },
});
