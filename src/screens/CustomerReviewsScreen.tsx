import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const overallRating = 4.8;
const totalReviews = 124;
const ratingBreakdown = [
    { stars: 5, percentage: 60 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 5 },
    { stars: 1, percentage: 5 },
];

const reviews = [
    {
        id: '1',
        name: 'Maria Clara',
        date: '2 hours ago',
        rating: 5,
        text: 'The pandesal was still warm! Great value for P50. Will definitely order again before it runs out.',
        productTag: 'Surplus Bakery Bag',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHMLxUXi0vOvWtx60JlhXNsWI-9QjydJS8l8yXmMoe96cuJBb0Hn0JF4W-To09wL0pxZiZGnAZrpX00wvJ2yLATIyj_lU7sY1msrYBqoE0fBppCHFYw727SxgOOQaTxaLBjpgaM5gXid5yi904FGU4_33FnGxjfjNIlIYWuFg77jZwSUceQxBOi02s9BVTJzzU27CMb1TytFGTgTuqZ5MnaGVjeLpOg6FAMhB04bnwtWL5JHgzLC-q52wZ8sCcTmBRmkdaiybqQZcQ',
    },
    {
        id: '2',
        name: 'Juan Dela Cruz',
        date: '1 day ago',
        rating: 3,
        text: 'Lechon belly was okay, but portion was smaller than expected for the "Large" bag.',
        productTag: 'Lechon Belly Portion',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHXqKWieP7EFXume0cd2BIBDob5HrdudvzzIdjFcKJ3AbjewkZ81uKqRxwt-GTgVZK0U9oqpz6ZQWS6Y0n8vaU34NRODqnIRurUwS4lVqQwJHsQLNFRoK0ln3pgemeG_15jkEVJlcldEp_kSmi0wK9FDN_eRJkpzCkl_wL4GWM6S0xf44x6jRIBekwstHIT_usamoD57a6-MGKa0ZsxSFvc9sA2LJZ_BMLvNfmI8stcunbZCaz9Cn8lDUARt2Gcvx8jwS9uRzpwZWO',
    },
    {
        id: '3',
        name: 'Liza Soberano',
        date: '2 days ago',
        rating: 4,
        text: 'Love the concept, very eco-friendly and affordable. The veggies were fresh enough for a stew!',
        productTag: 'Assorted Veggies',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAESXl7__Kkccn_0qhm0K1ej-jThYQTIsJ_YCygTO_bmOSEj1leLwMklt8YNTwmR2WcmkwsqpQgIUOn6SlWqAo-KtuR6fUL0WHs8Hkk7u5Xe5p9kqtzso8QamhD1JwlYS3P393BRaLW9XoDwoEBkOUmDD134ALWxMQ9aCsYrtyBk5jNlvPxLcY7Ph1K-nI0FPepuN0zngnU9bpa0G2DV01VnGMEk7Q7XjmHSrz_FugYRXf6Or4Np9n713fU9h3H5YuKw_8wc6-5eoYg',
    },
];

const filterTabs = ['All Reviews', '5 Stars', 'With Photos'];

interface CustomerReviewsScreenProps {
    navigation: any;
}

export const CustomerReviewsScreen: React.FC<CustomerReviewsScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('reviews');
    const [selectedFilter, setSelectedFilter] = useState('All Reviews');

    const renderStars = (rating: number, size: number = 14) => {
        return (
            <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <MaterialIcons
                        key={star}
                        name={star <= rating ? 'star' : 'star-border'}
                        size={size}
                        color={star <= rating ? '#fbbf24' : colors.textSecondary}
                    />
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Customer Reviews</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Overall Rating */}
                    <View style={styles.overallSection}>
                        <View style={styles.overallLeft}>
                            <Text style={styles.overallRating}>{overallRating}</Text>
                            {renderStars(Math.round(overallRating), 18)}
                            <Text style={styles.totalReviews}>{totalReviews} reviews</Text>
                        </View>
                        <View style={styles.breakdownContainer}>
                            {ratingBreakdown.map((item) => (
                                <View key={item.stars} style={styles.breakdownRow}>
                                    <Text style={styles.breakdownStar}>{item.stars}</Text>
                                    <View style={styles.breakdownBarBg}>
                                        <View style={[styles.breakdownBarFill, { width: `${item.percentage}%` }]} />
                                    </View>
                                    <Text style={styles.breakdownPercent}>{item.percentage}%</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Filter Tabs */}
                    <View style={styles.filterContainer}>
                        {filterTabs.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.filterTab, selectedFilter === tab && styles.filterTabActive]}
                                onPress={() => setSelectedFilter(tab)}
                            >
                                <Text style={[styles.filterText, selectedFilter === tab && styles.filterTextActive]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Reviews List */}
                    {reviews.map((review) => (
                        <View key={review.id} style={styles.reviewCard}>
                            <View style={styles.reviewHeader}>
                                <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
                                <View style={styles.reviewHeaderInfo}>
                                    <Text style={styles.reviewName}>{review.name}</Text>
                                    <Text style={styles.reviewDate}>{review.date}</Text>
                                </View>
                                <TouchableOpacity>
                                    <MaterialIcons name="more-horiz" size={24} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>
                            {renderStars(review.rating)}
                            <Text style={styles.reviewText}>{review.text}</Text>
                            <View style={styles.productTagContainer}>
                                <Text style={styles.productTag}>{review.productTag}</Text>
                            </View>
                            <View style={styles.reviewActions}>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <MaterialIcons name="reply" size={16} color={colors.textSecondary} />
                                    <Text style={styles.actionText}>Reply</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <MaterialIcons name="thumb-up-off-alt" size={16} color={colors.textSecondary} />
                                    <Text style={styles.actionText}>Helpful</Text>
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
                    if (tab === 'dashboard') navigation.navigate('MerchantDashboard');
                    if (tab === 'listings') navigation.navigate('PostListing');
                }}
                type="merchant"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundDark },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.surfaceHighlight },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    overallSection: { flexDirection: 'row', gap: spacing.xl, marginBottom: spacing.xl, paddingBottom: spacing.xl, borderBottomWidth: 1, borderBottomColor: colors.surfaceHighlight },
    overallLeft: { alignItems: 'center', justifyContent: 'center' },
    overallRating: { fontSize: 48, fontWeight: '700', color: colors.textPrimary },
    totalReviews: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
    breakdownContainer: { flex: 1, gap: spacing.sm },
    breakdownRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    breakdownStar: { fontSize: fontSize.sm, color: colors.textSecondary, width: 16 },
    breakdownBarBg: { flex: 1, height: 8, backgroundColor: colors.surfaceHighlight, borderRadius: 4 },
    breakdownBarFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
    breakdownPercent: { fontSize: fontSize.xs, color: colors.textSecondary, width: 32 },
    filterContainer: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
    filterTab: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.surfaceHighlight },
    filterTabActive: { backgroundColor: colors.textPrimary, borderColor: colors.textPrimary },
    filterText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary },
    filterTextActive: { color: colors.backgroundDark },
    reviewCard: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md },
    reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
    reviewAvatar: { width: 44, height: 44, borderRadius: 22 },
    reviewHeaderInfo: { flex: 1, marginLeft: spacing.md },
    reviewName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    reviewDate: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    starsRow: { flexDirection: 'row', marginBottom: spacing.sm },
    reviewText: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 20, marginBottom: spacing.md },
    productTagContainer: { marginBottom: spacing.md },
    productTag: { fontSize: fontSize.xs, color: colors.primary, backgroundColor: colors.primary + '22', paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.sm, alignSelf: 'flex-start' },
    reviewActions: { flexDirection: 'row', gap: spacing.xl, borderTopWidth: 1, borderTopColor: colors.surfaceHighlight, paddingTop: spacing.md },
    actionBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    actionText: { fontSize: fontSize.sm, color: colors.textSecondary },
});
