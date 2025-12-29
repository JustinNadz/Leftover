import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const filterTabs = ['All', 'Discounts', 'Free Food', 'Partner'];

const hotDeals = [
    { id: '1', title: '₱100 Off Next Order', subtitle: 'Valid for any order above ₱300', points: 1000, badge: 'Limited Time', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeEKWS2w8xaVGNiRxfAwxKJ3PNpGRvcmPBa74CJRFHKqRsNFdEd8HBvIk2fPOl5yMxsaXRNNYQtQB8nBZCWFZWcq5yN2MLKJwWgQ0KlKIyLwvVKYlsAZ8CJQxTKM0pJv8q3v8' },
    { id: '2', title: 'Free Fries', subtitle: 'Get a free side of fries', points: 1200, badge: null, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT8SXBB5rGVZf0YS1H9mtcZwNxNJeGqHTLKlJKyAEnJ0pOANnXd7lWfEWYaZ5jt8j5h9BRMYbqELrwQZn7Fb2Zy3zWqXsQF0wkYz8YwKbP0lQpFVZKVNdKLn3j9wRc0D5q-Q8' },
];

const moreRewards = [
    { id: '1', title: '10% Off Bakery Items', subtitle: 'Partner: Pan De Manila', points: 500, currentPoints: 500, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR-hBuMZnzy-zf7wEqgphKw8NTVfN5DgDoE99hdOrIoHmbupwEzOzrHMpRmM-jqG3ZXHryWXyniipk0294ybhVILc2kGLKu-todN5Bi_JboIBZ8aNgWloTQvdt2WKl84qb8SVLeoF_64_Oc2gtY73mXpw91bBlR4mlAMU6PvEGHFX1a_DZQa0vJ5ouigYMMXqMPAYI88zaEXot6xUjq8JvpEZjeHH4Ipa3S7s5CcQ9Qc6y_4JwIBrjTE5j5oLA5ap1qpNKqK4J4pVk' },
    { id: '2', title: 'Free Delivery', subtitle: 'Up to 3km distance', points: 800, currentPoints: 800, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkO4AmJmSk3__W3AklVco8zMmftp7mTgRbX8-NX6hG8Nk2LdAEdU0PdncW49rM35WKdg_d5XVbp-SfCH5E345KeukkX10IGksht997JyWFdsZG_oBjqOaxQThlUhnOM4L1V9GAuw3Dh1d36ADDkHfRuTbczQoMkIDcdfiC6mzY4dhAxAPbC8NO2bTyb_O7GbRdq1mATdtmzYcqr-bl_EufOKzL4fojD3-fDWg67xewuHA0EwWzX8BjnsZR2kAoTjBfwE5qXfAx8bpr' },
    { id: '3', title: 'Surprise Grocery Bag', subtitle: 'Value approx ₱500', points: 2000, currentPoints: 1250, progress: 67, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj3eGhnRBsKJm-PLD1MDEM_2F8Vsg5vDLeIhbIdZ0ID2xt_TzDRqy5jWJkILIona4nuP4Dq-Zake9nz0Z4AQvCIUlEropdB1d8pYS4JyPLoewQsOzj8JwTn_oatnRQsGonQ19GpHzEEzrDUfTCTpdRk5pVVznPs64ppU2vk7h4u_YHpxlAnDMRu9na2zJS3yATqmIellczsNmNYPlp3qaXdsMo3tDwtL68einH_cjIKv-LK7rdkafSauFND4KntSrFS2wb-uWoqkcu' },
    { id: '4', title: '₱500 Dining Credit', subtitle: 'Valid at participating cafes', points: 5000, currentPoints: 1250, progress: 25, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT8SXBB5rGVZf0YS1H9mtcZwNxNJeGqHTLKlJKyAEnJ0pOANnXd7lWfEWYaZ5jt8j5h9BRMYbqELrwQZn7Fb2Zy3zWqXsQF0wkYz8YwKbP0lQpFVZKVNdKLn3j9wRc0D5q-Q8' },
];

interface RewardRedemptionScreenProps {
    navigation: any;
}

export const RewardRedemptionScreen: React.FC<RewardRedemptionScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('rewards');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const userPoints = 1250;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Reward Redemption</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity><MaterialIcons name="notifications" size={24} color={colors.textPrimary} /></TouchableOpacity>
                        <TouchableOpacity><MaterialIcons name="help-outline" size={24} color={colors.textPrimary} /></TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Points Card */}
                    <View style={styles.pointsCard}>
                        <View style={styles.goldBadge}>
                            <Text style={styles.goldBadgeText}>GOLD SAVER</Text>
                        </View>
                        <Text style={styles.pointsValue}>{userPoints.toLocaleString()}</Text>
                        <View style={styles.pointsLabelRow}>
                            <MaterialIcons name="stars" size={16} color={colors.primary} />
                            <Text style={styles.pointsLabel}>Points Available</Text>
                        </View>
                        <Text style={styles.earnText}>Earn 50 pts for every rescued meal.</Text>
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

                    {/* Hot Deals */}
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleRow}>
                            <MaterialIcons name="local-fire-department" size={20} color="#f97316" />
                            <Text style={styles.sectionTitle}>Hot Deals</Text>
                        </View>
                        <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hotDealsRow}>
                        {hotDeals.map((deal) => (
                            <TouchableOpacity key={deal.id} style={styles.hotDealCard} onPress={() => navigation.navigate('ConfirmRedemption')}>
                                <View style={styles.hotDealImageContainer}>
                                    <Image source={{ uri: deal.imageUrl }} style={styles.hotDealImage} />
                                    {deal.badge && (
                                        <View style={styles.limitedBadge}>
                                            <Text style={styles.limitedText}>{deal.badge}</Text>
                                        </View>
                                    )}
                                </View>
                                <Text style={styles.hotDealTitle}>{deal.title}</Text>
                                <Text style={styles.hotDealSubtitle}>{deal.subtitle}</Text>
                                <View style={styles.hotDealFooter}>
                                    <Text style={styles.hotDealPoints}>{deal.points.toLocaleString()} Pts</Text>
                                    <TouchableOpacity style={styles.redeemBtn}>
                                        <Text style={styles.redeemBtnText}>Redeem</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* More Rewards */}
                    <Text style={styles.sectionTitle}>More Rewards</Text>
                    {moreRewards.map((reward) => (
                        <View key={reward.id} style={styles.rewardCard}>
                            <Image source={{ uri: reward.imageUrl }} style={styles.rewardImage} />
                            <View style={styles.rewardContent}>
                                <Text style={styles.rewardTitle}>{reward.title}</Text>
                                <Text style={styles.rewardSubtitle}>{reward.subtitle}</Text>
                                {reward.progress ? (
                                    <View style={styles.progressContainer}>
                                        <Text style={styles.progressText}>{reward.currentPoints.toLocaleString()} / {reward.points.toLocaleString()} Pts</Text>
                                        <View style={styles.progressBar}>
                                            <View style={[styles.progressFill, { width: `${reward.progress}%` }]} />
                                        </View>
                                        <Text style={styles.progressPercent}>{reward.progress}%</Text>
                                    </View>
                                ) : (
                                    <Text style={styles.rewardPoints}>{reward.points} Pts</Text>
                                )}
                            </View>
                            <TouchableOpacity style={reward.progress ? styles.redeemBtnDisabled : styles.redeemBtnSmall}>
                                <Text style={reward.progress ? styles.redeemBtnDisabledText : styles.redeemBtnSmallText}>Redeem</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'home') navigation.navigate('BuyerHome');
                    if (tab === 'orders') navigation.navigate('BuyerOrders');
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
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    headerTitle: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary },
    headerIcons: { flexDirection: 'row', gap: spacing.md },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    pointsCard: { alignItems: 'center', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.xl, padding: spacing.xl, marginBottom: spacing.xl },
    goldBadge: { backgroundColor: '#d97706', paddingHorizontal: spacing.lg, paddingVertical: spacing.xs, borderRadius: borderRadius.full, marginBottom: spacing.md },
    goldBadgeText: { fontSize: fontSize.xs, fontWeight: '700', color: '#fff' },
    pointsValue: { fontSize: 56, fontWeight: '700', color: colors.textPrimary },
    pointsLabelRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.xs },
    pointsLabel: { fontSize: fontSize.md, color: colors.primary },
    earnText: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.sm },
    filterTabs: { gap: spacing.sm, marginBottom: spacing.xl },
    filterTab: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full, backgroundColor: colors.surfaceDark },
    filterTabActive: { backgroundColor: colors.primary },
    filterText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary },
    filterTextActive: { color: colors.backgroundDark },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
    sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
    seeAll: { fontSize: fontSize.sm, color: colors.primary },
    hotDealsRow: { gap: spacing.md, marginBottom: spacing.xl },
    hotDealCard: { width: 200, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.xl, overflow: 'hidden' },
    hotDealImageContainer: { height: 100, position: 'relative' },
    hotDealImage: { width: '100%', height: '100%' },
    limitedBadge: { position: 'absolute', top: spacing.sm, left: spacing.sm, backgroundColor: colors.primary, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
    limitedText: { fontSize: 10, fontWeight: '600', color: colors.backgroundDark },
    hotDealTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary, paddingHorizontal: spacing.md, paddingTop: spacing.md },
    hotDealSubtitle: { fontSize: fontSize.xs, color: colors.textSecondary, paddingHorizontal: spacing.md, marginTop: 2 },
    hotDealFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md },
    hotDealPoints: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary },
    redeemBtn: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
    redeemBtnText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.backgroundDark },
    rewardCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, overflow: 'hidden', marginBottom: spacing.md },
    rewardImage: { width: 70, height: 70 },
    rewardContent: { flex: 1, padding: spacing.md },
    rewardTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    rewardSubtitle: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    rewardPoints: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary, marginTop: spacing.sm },
    progressContainer: { marginTop: spacing.sm },
    progressText: { fontSize: fontSize.xs, color: colors.textSecondary },
    progressBar: { height: 4, backgroundColor: colors.surfaceHighlight, borderRadius: 2, marginTop: spacing.xs },
    progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 2 },
    progressPercent: { fontSize: fontSize.xs, color: colors.textSecondary, position: 'absolute', right: 0, top: 0 },
    redeemBtnSmall: { backgroundColor: colors.surfaceHighlight, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md, marginRight: spacing.md },
    redeemBtnSmallText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
    redeemBtnDisabled: { borderWidth: 1, borderColor: colors.textSecondary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md, marginRight: spacing.md, opacity: 0.5 },
    redeemBtnDisabledText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textSecondary },
});
