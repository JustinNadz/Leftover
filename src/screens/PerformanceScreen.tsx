import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PerformanceScreenProps {
    navigation: any;
}

export const PerformanceScreen: React.FC<PerformanceScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [timeRange, setTimeRange] = useState<'This Week' | 'Custom Range'>('This Week');

    const chartData = [1200, 1800, 2200, 2800, 4250, 3800, 4500];
    const chartDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxValue = Math.max(...chartData);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Performance</Text>
                    <TouchableOpacity style={styles.notificationBtn}>
                        <MaterialIcons name="notifications" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                {/* Time Range Toggle */}
                <View style={styles.timeToggle}>
                    {(['This Week', 'Custom Range'] as const).map((range) => (
                        <TouchableOpacity
                            key={range}
                            style={[styles.timeBtn, timeRange === range && styles.timeBtnActive]}
                            onPress={() => setTimeRange(range)}
                        >
                            <Text style={[styles.timeText, timeRange === range && styles.timeTextActive]}>
                                {range}
                            </Text>
                            {range === 'This Week' && <MaterialIcons name="expand-more" size={18} color={timeRange === range ? colors.backgroundDark : colors.textSecondary} />}
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Stats Cards */}
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <View style={styles.statIcon}>
                                <MaterialIcons name="payments" size={20} color={colors.primary} />
                            </View>
                            <Text style={styles.statLabel}>Total Sales</Text>
                            <Text style={styles.statValue}>₱15,450</Text>
                            <View style={styles.statChange}>
                                <MaterialIcons name="trending-up" size={14} color={colors.primary} />
                                <Text style={styles.statChangeText}>+12%</Text>
                                <Text style={styles.statPeriod}>vs last week</Text>
                            </View>
                        </View>
                        <View style={styles.statCard}>
                            <View style={[styles.statIcon, { backgroundColor: colors.primary + '22' }]}>
                                <MaterialIcons name="eco" size={20} color={colors.primary} />
                            </View>
                            <Text style={styles.statLabel}>Rescued</Text>
                            <Text style={styles.statValue}>85 Meals</Text>
                            <View style={styles.statChange}>
                                <MaterialIcons name="trending-up" size={14} color={colors.primary} />
                                <Text style={styles.statChangeText}>+5%</Text>
                                <Text style={styles.statPeriod}>vs last week</Text>
                            </View>
                        </View>
                    </View>

                    {/* Sales Trends Chart */}
                    <View style={styles.chartCard}>
                        <View style={styles.chartHeader}>
                            <View>
                                <Text style={styles.chartTitle}>Sales Trends</Text>
                                <Text style={styles.chartSubtitle}>Revenue over time</Text>
                            </View>
                            <TouchableOpacity>
                                <MaterialIcons name="more-horiz" size={24} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chartContainer}>
                            {chartData.map((value, index) => (
                                <View key={index} style={styles.chartBarContainer}>
                                    <View style={styles.chartBar}>
                                        <View style={[styles.chartBarFill, { height: `${(value / maxValue) * 100}%` }]}>
                                            {index === 4 && (
                                                <View style={styles.chartTooltip}>
                                                    <Text style={styles.tooltipText}>₱4,250</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                    <Text style={[styles.chartLabel, index === 4 && styles.chartLabelActive]}>{chartDays[index]}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Top Savers Section */}
                    <View style={styles.topSaversSection}>
                        <View style={styles.topSaversHeader}>
                            <Text style={styles.topSaversTitle}>Top Savers</Text>
                            <TouchableOpacity style={styles.addBtn}>
                                <MaterialIcons name="add" size={24} color={colors.backgroundDark} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'listings') navigation.navigate('Inventory');
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
    notificationBtn: { width: 40, height: 40, borderRadius: borderRadius.full, backgroundColor: colors.surfaceDark, alignItems: 'center', justifyContent: 'center' },
    timeToggle: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.lg, marginBottom: spacing.lg },
    timeBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.surfaceHighlight },
    timeBtnActive: { backgroundColor: colors.textPrimary, borderColor: colors.textPrimary },
    timeText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary },
    timeTextActive: { color: colors.backgroundDark },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
    statCard: { flex: 1, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.xl, padding: spacing.lg },
    statIcon: { width: 40, height: 40, borderRadius: borderRadius.md, backgroundColor: colors.surfaceHighlight, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
    statLabel: { fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.xs },
    statValue: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary },
    statChange: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.sm },
    statChangeText: { fontSize: fontSize.xs, fontWeight: '600', color: colors.primary },
    statPeriod: { fontSize: fontSize.xs, color: colors.textSecondary },
    chartCard: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.xl, padding: spacing.lg, marginBottom: spacing.xl },
    chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.xl },
    chartTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    chartSubtitle: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
    chartContainer: { flexDirection: 'row', alignItems: 'flex-end', height: 150, gap: spacing.sm },
    chartBarContainer: { flex: 1, alignItems: 'center' },
    chartBar: { width: '100%', height: 120, backgroundColor: colors.surfaceHighlight, borderRadius: borderRadius.sm, justifyContent: 'flex-end', overflow: 'visible' },
    chartBarFill: { width: '100%', backgroundColor: colors.primary, borderRadius: borderRadius.sm, position: 'relative' },
    chartTooltip: { position: 'absolute', top: -28, left: '50%', transform: [{ translateX: -25 }], backgroundColor: colors.backgroundDark, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
    tooltipText: { fontSize: fontSize.xs, fontWeight: '600', color: colors.primary },
    chartLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: spacing.sm },
    chartLabelActive: { color: colors.primary, fontWeight: '600' },
    topSaversSection: { marginTop: spacing.md },
    topSaversHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    topSaversTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    addBtn: { width: 48, height: 48, borderRadius: borderRadius.full, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
