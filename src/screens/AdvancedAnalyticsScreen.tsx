import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const timePeriods = ['7D', '30D', '3M', 'YTD', 'Custom'];
const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

interface TopCategory {
    id: string;
    name: string;
    orders: string;
    revenue: number;
    imageUrl: string;
}

const topCategories: TopCategory[] = [
    {
        id: '1',
        name: 'Pastries',
        orders: '42 orders',
        revenue: 8200,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDazL-S56m1LGCDi2gkb5qcGG5lFoyqYByD_ipVB6-8DDDtcNPNvd5jsFqY6RTTSktKh5pjKXn11WI2-pcAuJpX2kggN9SZ-AZOo-OjTGjTStejgziMGvrpRAdkv6fe0HjipqqARVtLsqg_UcpX3S3q-hqIwNGDXGMFUfAZdO1vTidn0xX6vgjzkngRRPogkWsNoaWKQd7dy5eejslDSUVfkjH0LhCk58B4GR713v26NPW8bw2pesap33CRRiZ6dv6IQp40Gv2onZOJ',
    },
    {
        id: '2',
        name: 'Salads',
        orders: '18 orders',
        revenue: 4500,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWg7O0MTy6b3vy7t2Y_lAd_EKCa2idvBQ0bjUSRmnvsGm8TQjFDsk0zIy1SCogmKUw0ymxoaaMB2N5loQQicIEu0gFOyQhayfjIYv2U7uJjsdFdG-0qhaSNYRCnyzyLAgO93QqAZDcIsL-9Y7vsepNwYSI671rJq0O5lmx8neq3opt2k1wni4e4ycVhvIgNXzw6z5MAmj-eJ6tNtVO6_VyFwht7tkLDLbV6bXNspuYGD5323APlrl6n2co1a3EnMgEg-pkTNuLbiQh',
    },
];

const peakHours = [
    { hour: '12PM', value: 30 },
    { hour: '2PM', value: 20 },
    { hour: '3PM', value: 25 },
    { hour: '5PM', value: 45 },
    { hour: '6PM', value: 90 },
    { hour: '7PM', value: 75 },
    { hour: '9PM', value: 40 },
];

interface AdvancedAnalyticsScreenProps {
    navigation: any;
}

export const AdvancedAnalyticsScreen: React.FC<AdvancedAnalyticsScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('analytics');
    const [selectedPeriod, setSelectedPeriod] = useState('7D');
    const [selectedDay, setSelectedDay] = useState('SAT');

    const totalRevenue = 45200.00;
    const revenueChange = 12.5;
    const mealsSaved = 142;
    const wasteSaved = 68;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Advanced Analytics</Text>
                        <Text style={styles.headerSubtitle}>Business Optimization</Text>
                    </View>
                    <TouchableOpacity>
                        <MaterialIcons name="ios-share" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Time Period Selector */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.periodContainer}
                    >
                        {timePeriods.map((period) => (
                            <TouchableOpacity
                                key={period}
                                style={[
                                    styles.periodButton,
                                    selectedPeriod === period && styles.periodButtonActive,
                                ]}
                                onPress={() => setSelectedPeriod(period)}
                            >
                                <Text style={[
                                    styles.periodText,
                                    selectedPeriod === period && styles.periodTextActive,
                                ]}>
                                    {period}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Total Revenue */}
                    <View style={styles.revenueSection}>
                        <Text style={styles.revenueLabel}>Total Revenue</Text>
                        <View style={styles.revenueRow}>
                            <Text style={styles.revenueAmount}>₱{totalRevenue.toLocaleString()}</Text>
                            <View style={styles.changeBadge}>
                                <MaterialIcons name="trending-up" size={14} color={colors.primary} />
                                <Text style={styles.changeText}>+{revenueChange}%</Text>
                            </View>
                        </View>
                    </View>

                    {/* Revenue Trend Chart */}
                    <View style={styles.chartCard}>
                        <View style={styles.chartHeader}>
                            <Text style={styles.chartTitle}>Revenue Trend</Text>
                            <View style={styles.liveIndicator}>
                                <View style={styles.liveDot} />
                                <Text style={styles.liveText}>Live Data</Text>
                            </View>
                        </View>

                        {/* Simple Chart Visualization */}
                        <View style={styles.chartArea}>
                            <View style={styles.chartTooltip}>
                                <Text style={styles.tooltipText}>₱12,450</Text>
                            </View>
                            <View style={styles.chartLine}>
                                {/* Simplified line chart representation */}
                                <View style={[styles.chartPoint, { left: '10%', bottom: '30%' }]} />
                                <View style={[styles.chartPoint, { left: '25%', bottom: '45%' }]} />
                                <View style={[styles.chartPoint, { left: '40%', bottom: '35%' }]} />
                                <View style={[styles.chartPoint, { left: '55%', bottom: '55%' }]} />
                                <View style={[styles.chartPoint, styles.chartPointActive, { left: '70%', bottom: '70%' }]} />
                                <View style={[styles.chartPoint, { left: '85%', bottom: '50%' }]} />
                            </View>
                        </View>

                        {/* Day Selector */}
                        <View style={styles.daySelector}>
                            {days.map((day) => (
                                <TouchableOpacity
                                    key={day}
                                    style={[
                                        styles.dayButton,
                                        selectedDay === day && styles.dayButtonActive,
                                    ]}
                                    onPress={() => setSelectedDay(day)}
                                >
                                    <Text style={[
                                        styles.dayText,
                                        selectedDay === day && styles.dayTextActive,
                                    ]}>
                                        {day}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <View style={styles.statIcon}>
                                <MaterialIcons name="restaurant" size={20} color={colors.primary} />
                            </View>
                            <Text style={styles.statLabel}>MEALS SAVED</Text>
                            <Text style={styles.statValue}>{mealsSaved}</Text>
                            <Text style={styles.statChange}>+12% vs last week</Text>
                        </View>
                        <View style={styles.statCard}>
                            <View style={styles.statIcon}>
                                <MaterialIcons name="delete-outline" size={20} color={colors.primary} />
                            </View>
                            <Text style={styles.statLabel}>WASTE SAVED</Text>
                            <Text style={styles.statValue}>{wasteSaved}kg</Text>
                            <Text style={styles.statChange}>+5% efficiency</Text>
                        </View>
                    </View>

                    {/* Top Selling Categories */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Top Selling Categories</Text>
                        {topCategories.map((category) => (
                            <View key={category.id} style={styles.categoryCard}>
                                <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
                                <View style={styles.categoryInfo}>
                                    <Text style={styles.categoryName}>{category.name}</Text>
                                    <Text style={styles.categoryOrders}>{category.orders}</Text>
                                </View>
                                <Text style={styles.categoryRevenue}>₱{category.revenue.toLocaleString()}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Peak Order Times */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Peak Order Times</Text>
                            <TouchableOpacity>
                                <MaterialIcons name="fullscreen" size={20} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.sectionSubtitle}>Based on anonymized customer data</Text>

                        {/* Bar Chart */}
                        <View style={styles.barChart}>
                            {peakHours.map((item, index) => (
                                <View key={index} style={styles.barContainer}>
                                    <View style={[
                                        styles.bar,
                                        { height: item.value },
                                        item.hour === '6PM' && styles.barHighlight,
                                    ]} />
                                    <Text style={styles.barLabel}>{item.hour}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.insightCard}>
                            <Text style={styles.insightText}>
                                Your busiest time is <Text style={styles.insightHighlight}>8:00 PM - 9:00 PM</Text>.{'\n'}
                                Consider offering flash deals around 7 PM to boost early sales.
                            </Text>
                        </View>
                    </View>

                    {/* Download Button */}
                    <TouchableOpacity style={styles.downloadButton}>
                        <MaterialIcons name="file-download" size={20} color={colors.primary} />
                        <Text style={styles.downloadText}>Download CSV Report</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>

            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'dashboard') navigation.navigate('MerchantDashboard');
                    if (tab === 'listings') navigation.navigate('PostListing');
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    headerSubtitle: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 120 },
    periodContainer: { gap: spacing.sm, marginBottom: spacing.lg },
    periodButton: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
        backgroundColor: colors.surfaceDark,
        marginRight: spacing.sm,
    },
    periodButtonActive: { backgroundColor: colors.primary },
    periodText: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: '600' },
    periodTextActive: { color: colors.backgroundDark },
    revenueSection: { marginBottom: spacing.lg },
    revenueLabel: { fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.xs },
    revenueRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    revenueAmount: { fontSize: 36, fontWeight: '700', color: colors.textPrimary },
    changeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        backgroundColor: 'rgba(19, 236, 109, 0.15)',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    changeText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600' },
    chartCard: {
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    chartTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    liveIndicator: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
    liveText: { fontSize: fontSize.xs, color: colors.primary },
    chartArea: {
        height: 120,
        marginBottom: spacing.lg,
        position: 'relative',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    chartTooltip: {
        position: 'absolute',
        top: 10,
        right: '20%',
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    tooltipText: { fontSize: fontSize.xs, color: colors.backgroundDark, fontWeight: '600' },
    chartLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    chartPoint: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
        opacity: 0.5,
    },
    chartPointActive: {
        width: 12,
        height: 12,
        borderRadius: 6,
        opacity: 1,
        borderWidth: 2,
        borderColor: colors.backgroundDark,
    },
    daySelector: { flexDirection: 'row', justifyContent: 'space-between' },
    dayButton: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    dayButtonActive: { backgroundColor: 'rgba(19, 236, 109, 0.2)' },
    dayText: { fontSize: fontSize.xs, color: colors.textSecondary, fontWeight: '500' },
    dayTextActive: { color: colors.primary },
    statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
    statCard: {
        flex: 1,
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
    },
    statIcon: {
        width: 36,
        height: 36,
        borderRadius: borderRadius.md,
        backgroundColor: 'rgba(19, 236, 109, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    statLabel: { fontSize: 10, color: colors.textSecondary, letterSpacing: 0.5, marginBottom: spacing.xs },
    statValue: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary },
    statChange: { fontSize: fontSize.xs, color: colors.primary, marginTop: spacing.xs },
    section: { marginBottom: spacing.xl },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.sm },
    sectionSubtitle: { fontSize: fontSize.xs, color: colors.textSecondary, marginBottom: spacing.lg },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    categoryImage: { width: 48, height: 48, borderRadius: borderRadius.md },
    categoryInfo: { flex: 1, marginLeft: spacing.md },
    categoryName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    categoryOrders: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    categoryRevenue: { fontSize: fontSize.lg, fontWeight: '700', color: colors.primary },
    barChart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 100,
        marginBottom: spacing.lg,
    },
    barContainer: { alignItems: 'center', flex: 1 },
    bar: {
        width: 24,
        backgroundColor: 'rgba(19, 236, 109, 0.3)',
        borderRadius: borderRadius.sm,
        marginBottom: spacing.xs,
    },
    barHighlight: { backgroundColor: colors.primary },
    barLabel: { fontSize: 10, color: colors.textSecondary },
    insightCard: {
        backgroundColor: 'rgba(19, 236, 109, 0.1)',
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(19, 236, 109, 0.2)',
    },
    insightText: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 20 },
    insightHighlight: { color: colors.primary, fontWeight: '600' },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        backgroundColor: 'rgba(19, 236, 109, 0.15)',
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.lg,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    downloadText: { fontSize: fontSize.md, fontWeight: '600', color: colors.primary },
});
