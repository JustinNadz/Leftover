import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const achievements = [
    { id: '1', name: 'First Saver', icon: 'flash-on', unlocked: true },
    { id: '2', name: 'Zero Waste', icon: 'eco', unlocked: true },
    { id: '3', name: 'Night Owl', icon: 'bedtime', unlocked: false },
    { id: '4', name: 'Community', icon: 'people', unlocked: false },
];

const rewards = [
    { id: '1', title: 'Voucher', subtitle: null, points: 500, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj3eGhnRBsKJm-PLD1MDEM_2F8Vsg5vDLeIhbIdZ0ID2xt_TzDRqy5jWJkILIona4nuP4Dq-Zake9nz0Z4AQvCIUlEropdB1d8pYS4JyPLoewQsOzj8JwTn_oatnRQsGonQ19GpHzEEzrDUfTCTpdRk5pVVznPs64ppU2vk7h4u_YHpxlAnDMRu9na2zJS3yATqmIellczsNmNYPlp3qaXdsMo3tDwtL68einH_cjIKv-LK7rdkafSauFND4KntSrFS2wb-uWoqkcu', badge: null },
    { id: '2', title: 'Free Delivery', subtitle: 'Up to 2km distance', points: 300, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT8SXBB5rGVZf0YS1H9mtcZwNxNJeGqHTLKlJKyAEnJ0pOANnXd7lWfEWYaZ5jt8j5h9BRMYbqELrwQZn7Fb2Zy3zWqXsQF0wkYz8YwKbP0lQpFVZKVNdKLn3j9wRc0D5q-Q8', badge: 'Service' },
    { id: '3', title: 'Mystery Bag', subtitle: 'Get a surprise surplus bag from a top rated merchant', points: 800, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkO4AmJmSk3__W3AklVco8zMmftp7mTgRbX8-NX6hG8Nk2LdAEdU0PdncW49rM35WKdg_d5XVbp-SfCH5E345KeukkX10IGksht997JyWFdsZG_oBjqOaxQThlUhnOM4L1V9GAuw3Dh1d36ADDkHfRuTbczQoMkIDcdfiC6mzY4dhAxAPbC8NO2bTyb_O7GbRdq1mATdtmzYcqr-bl_EufOKzL4fojD3-fDWg67xewuHA0EwWzX8BjnsZR2kAoTjBfwE5qXfAx8bpr', badge: 'POPULAR' },
];

interface MyRewardsScreenProps {
    navigation: any;
}

export const MyRewardsScreen: React.FC<MyRewardsScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('rewards');
    const points = 850;
    const level = 'Eco Warrior';
    const levelNumber = 2;
    const nextLevel = 'Planet Protector';
    const pointsToNext = 450;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Rewards</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="help-outline" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Points Display */}
                    <View style={styles.pointsCard}>
                        <Text style={styles.pointsValue}>{points} Pts</Text>
                        <Text style={styles.pointsLabel}>Current Balance</Text>
                    </View>

                    {/* Level */}
                    <View style={styles.levelCard}>
                        <View style={styles.levelLeft}>
                            <MaterialIcons name="eco" size={24} color={colors.primary} />
                            <Text style={styles.levelName}>{level}</Text>
                        </View>
                        <View style={styles.levelBadge}>
                            <Text style={styles.levelBadgeText}>LEVEL {levelNumber}</Text>
                        </View>
                    </View>

                    <Text style={styles.progressText}>
                        Spend <Text style={styles.highlight}>₱{pointsToNext}</Text> more to reach <Text style={styles.highlight}>{nextLevel}</Text>
                    </Text>

                    {/* Stats */}
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <MaterialIcons name="restaurant" size={24} color={colors.primary} />
                            <Text style={styles.statValue}>12</Text>
                            <Text style={styles.statLabel}>Meals Saved</Text>
                        </View>
                        <View style={styles.statCard}>
                            <MaterialIcons name="co2" size={24} color={colors.primary} />
                            <Text style={styles.statValue}>15kg</Text>
                            <Text style={styles.statLabel}>Emissions Prevented</Text>
                        </View>
                    </View>

                    {/* Achievements */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Achievements</Text>
                        <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.achievementsRow}>
                        {achievements.map((ach) => (
                            <View key={ach.id} style={[styles.achievementCard, !ach.unlocked && styles.achievementLocked]}>
                                <View style={[styles.achievementIcon, !ach.unlocked && styles.achievementIconLocked]}>
                                    <MaterialIcons name={ach.icon as any} size={24} color={ach.unlocked ? colors.primary : colors.textSecondary} />
                                </View>
                                <Text style={[styles.achievementName, !ach.unlocked && styles.achievementNameLocked]}>{ach.name}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Redeem Rewards */}
                    <Text style={styles.sectionTitle}>Redeem Rewards</Text>
                    {rewards.map((reward) => (
                        <View key={reward.id} style={styles.rewardCard}>
                            <View style={styles.rewardImageContainer}>
                                <Image source={{ uri: reward.imageUrl }} style={styles.rewardImage} />
                                {reward.badge && (
                                    <View style={[styles.rewardBadge, reward.badge === 'POPULAR' && styles.popularBadge]}>
                                        <Text style={styles.rewardBadgeText}>{reward.badge}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.rewardContent}>
                                <Text style={styles.rewardTitle}>{reward.title}</Text>
                                {reward.subtitle && <Text style={styles.rewardSubtitle}>{reward.subtitle}</Text>}
                                <Text style={styles.rewardPoints}>{reward.points} Pts</Text>
                            </View>
                            <TouchableOpacity style={styles.redeemBtn}>
                                <Text style={styles.redeemBtnText}>Redeem</Text>
                            </TouchableOpacity>
                        </View>
                    ))}

                    {/* Invite Friends */}
                    <View style={styles.inviteCard}>
                        <Text style={styles.inviteTitle}>Invite friends, earn more!</Text>
                        <Text style={styles.inviteSubtitle}>Get <Text style={styles.highlight}>100 Pts</Text> for every friend who rescues their first meal.</Text>
                    </View>
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
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    pointsCard: { alignItems: 'center', marginBottom: spacing.lg },
    pointsValue: { fontSize: 48, fontWeight: '700', color: colors.primary },
    pointsLabel: { fontSize: fontSize.sm, color: colors.textSecondary },
    levelCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md },
    levelLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    levelName: { fontSize: fontSize.lg, fontWeight: '600', color: colors.textPrimary },
    levelBadge: { backgroundColor: colors.surfaceHighlight, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
    levelBadgeText: { fontSize: fontSize.xs, fontWeight: '600', color: colors.textSecondary },
    progressText: { fontSize: fontSize.sm, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.xl },
    highlight: { color: colors.primary, fontWeight: '600' },
    statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
    statCard: { flex: 1, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, alignItems: 'center' },
    statValue: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary, marginTop: spacing.sm },
    statLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: spacing.xs, textAlign: 'center' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
    sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
    viewAll: { fontSize: fontSize.sm, color: colors.primary },
    achievementsRow: { gap: spacing.md, marginBottom: spacing.xl },
    achievementCard: { width: 80, alignItems: 'center' },
    achievementLocked: { opacity: 0.5 },
    achievementIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary + '22', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
    achievementIconLocked: { backgroundColor: colors.surfaceHighlight },
    achievementName: { fontSize: fontSize.xs, color: colors.textPrimary, textAlign: 'center' },
    achievementNameLocked: { color: colors.textSecondary },
    rewardCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, overflow: 'hidden', marginBottom: spacing.md },
    rewardImageContainer: { position: 'relative' },
    rewardImage: { width: 100, height: 80 },
    rewardBadge: { position: 'absolute', top: spacing.sm, left: spacing.sm, backgroundColor: colors.surfaceHighlight, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
    popularBadge: { backgroundColor: colors.primary },
    rewardBadgeText: { fontSize: 8, fontWeight: '700', color: colors.textPrimary },
    rewardContent: { flex: 1, padding: spacing.md },
    rewardTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    rewardSubtitle: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    rewardPoints: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary, marginTop: spacing.sm },
    redeemBtn: { backgroundColor: colors.surfaceHighlight, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md, marginRight: spacing.md },
    redeemBtnText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
    inviteCard: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, marginTop: spacing.md },
    inviteTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.textPrimary },
    inviteSubtitle: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
});
