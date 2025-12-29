import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

interface ConfirmRedemptionScreenProps {
    navigation: any;
}

export const ConfirmRedemptionScreen: React.FC<ConfirmRedemptionScreenProps> = ({ navigation }) => {
    const currentPoints = 1750;
    const cost = 500;
    const balance = currentPoints - cost;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Confirm Redemption</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Reward Image */}
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj3eGhnRBsKJm-PLD1MDEM_2F8Vsg5vDLeIhbIdZ0ID2xt_TzDRqy5jWJkILIona4nuP4Dq-Zake9nz0Z4AQvCIUlEropdB1d8pYS4JyPLoewQsOzj8JwTn_oatnRQsGonQ19GpHzEEzrDUfTCTpdRk5pVVznPs64ppU2vk7h4u_YHpxlAnDMRu9na2zJS3yATqmIellczsNmNYPlp3qaXdsMo3tDwtL68einH_cjIKv-LK7rdkafSauFND4KntSrFS2wb-uWoqkcu' }}
                            style={styles.rewardImage}
                        />
                        <View style={styles.rewardBadge}>
                            <Text style={styles.rewardBadgeText}>Reward</Text>
                        </View>
                    </View>

                    {/* Reward Details */}
                    <View style={styles.detailsCard}>
                        <Text style={styles.detailsLabel}>REWARD DETAILS</Text>
                        <View style={styles.titleRow}>
                            <Text style={styles.rewardTitle}>₱50 Off Your Next Meal</Text>
                            <MaterialIcons name="local-offer" size={24} color={colors.primary} />
                        </View>
                        <Text style={styles.rewardDescription}>
                            Save ₱50 on any order over ₱200 from participating merchants.
                        </Text>
                    </View>

                    {/* Points Breakdown */}
                    <View style={styles.pointsRow}>
                        <View style={styles.pointsBox}>
                            <Text style={styles.pointsBoxLabel}>CURRENT</Text>
                            <Text style={styles.pointsBoxValue}>{currentPoints.toLocaleString()}</Text>
                        </View>
                        <View style={[styles.pointsBox, styles.pointsBoxCost]}>
                            <Text style={styles.pointsBoxLabel}>COST</Text>
                            <Text style={[styles.pointsBoxValue, styles.costValue]}>-{cost}</Text>
                        </View>
                        <View style={styles.pointsBox}>
                            <Text style={styles.pointsBoxLabel}>BALANCE</Text>
                            <Text style={styles.pointsBoxValue}>{balance.toLocaleString()}</Text>
                        </View>
                    </View>

                    {/* Method & Validity */}
                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <View style={styles.infoLeft}>
                                <MaterialIcons name="flash-on" size={18} color={colors.primary} />
                                <Text style={styles.infoLabel}>Method</Text>
                            </View>
                            <Text style={styles.infoValue}>Auto-applied at checkout</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.infoRow}>
                            <View style={styles.infoLeft}>
                                <MaterialIcons name="schedule" size={18} color={colors.primary} />
                                <Text style={styles.infoLabel}>Validity</Text>
                            </View>
                            <Text style={styles.infoValue}>30 days from redemption</Text>
                        </View>
                    </View>

                    {/* Terms */}
                    <View style={styles.termsCard}>
                        <Text style={styles.termsTitle}>Terms & Conditions</Text>
                        <Text style={styles.termsText}>
                            By redeeming this reward, 500 points will be deducted from your account. This voucher is non-refundable and cannot be exchanged for cash.
                        </Text>
                    </View>
                </ScrollView>

                {/* Confirm Button */}
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.confirmButtonText}>Confirm Redemption</Text>
                        <MaterialIcons name="check-circle" size={20} color={colors.backgroundDark} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <BottomNav
                activeTab="rewards"
                onTabPress={(tab) => {
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
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    scrollView: { flex: 1 },
    scrollContent: { paddingBottom: 180 },
    imageContainer: { height: 200, position: 'relative' },
    rewardImage: { width: '100%', height: '100%' },
    rewardBadge: { position: 'absolute', bottom: spacing.lg, left: spacing.lg, backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
    rewardBadgeText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.backgroundDark },
    detailsCard: { padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.surfaceHighlight },
    detailsLabel: { fontSize: fontSize.xs, fontWeight: '600', color: colors.textSecondary, marginBottom: spacing.sm },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm },
    rewardTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.textPrimary },
    rewardDescription: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 20 },
    pointsRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, gap: spacing.sm },
    pointsBox: { flex: 1, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.md, alignItems: 'center' },
    pointsBoxCost: { backgroundColor: colors.primary + '22' },
    pointsBoxLabel: { fontSize: fontSize.xs, fontWeight: '600', color: colors.textSecondary, marginBottom: spacing.xs },
    pointsBoxValue: { fontSize: fontSize.xl, fontWeight: '700', color: colors.textPrimary },
    costValue: { color: colors.primary },
    infoCard: { marginHorizontal: spacing.lg, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    infoLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    infoLabel: { fontSize: fontSize.sm, color: colors.textSecondary },
    infoValue: { fontSize: fontSize.sm, color: colors.textPrimary },
    divider: { height: 1, backgroundColor: colors.surfaceHighlight, marginVertical: spacing.md },
    termsCard: { margin: spacing.lg, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg },
    termsTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.sm },
    termsText: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 18 },
    bottomContainer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.surfaceHighlight },
    confirmButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.primary, borderRadius: borderRadius.lg, height: 56 },
    confirmButtonText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.backgroundDark },
});
