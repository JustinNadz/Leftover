import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const PRODUCT_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2d8XNvsAlq4CaY-t1D9b2UeLR4THOzJbKMhS3gMgEMtRkdKY1mFEgfzLbXmWm5V9kWcMtKR_yvvo3VCjxvvnnDTDv4PuC3cG0Un9As7pnvJ7_hBQaxRvfTvFZWbx0P1EqhobtpGI0b43aYSq0QtvFie5I9vJIhfQa-41FsUMoyRPYI50v5iD-3eLW341gBoj-WRdwB24sYn0HmCwg7D0VqJCy7XbZE7g98fEwzgXB0r6pG6S-sS48JORVEsaejicFIWLr0MH4QxF8';

const reviews = [
    { id: '1', name: 'Miguel Santos', rating: 5, date: '2 days ago', text: "Honestly, it was amazing! Love how much food was in the bag! Tastes just like ordering fresh. Definitely saving me next.", avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHXqKWieP7EFXume0cd2BIBDob5HrdudvzzIdjFcKJ3AbjewkZ81uKqRxwt-GTgVZK0U9oqpz6ZQWS6Y0n8vaU34NRODqnIRurUwS4lVqQwJHsQLNFRoK0ln3pgemeG_15jkEVJlcldEp_kSmi0wK9FDN_eRJkpzCkl_wL4GWM6S0xf44x6jRIBekwstHIT_usamoD57a6-MGKa0ZsxSFvc9sA2LJZ_BMLvNfmI8stcunbZCaz9Cn8lDUARt2Gcvx8jwS9uRzpwZWO' },
    { id: '2', name: 'Ana Reyes', rating: 4, date: '5 days ago', text: "Pickup was smooth, but the packaging was a bit flimsy. Food quality was great though!", avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAESXl7__Kkccn_0qhm0K1ej-jThYQTIsJ_YCygTO_bmOSEj1leLwMklt8YNTwmR2WcmkwsqpQgIUOn6SlWqAo-KtuR6fUL0WHs8Hkk7u5Xe5p9kqtzso8QamhD1JwlYS3P393BRaLW9XoDwoEBkOUmDD134ALWxMQ9aCsYrtyBk5jNlvPxLcY7Ph1K-nI0FPepuN0zngnU9bpa0G2DV01VnGMEk7Q7XjmHSrz_FugYRXf6Or4Np9n713fU9h3H5YuKw_8wc6-5eoYg' },
];

interface RateOrderScreenProps {
    navigation: any;
}

export const RateOrderScreen: React.FC<RateOrderScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('orders');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Rate Order #2849</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Order Info */}
                    <View style={styles.orderInfo}>
                        <Image source={{ uri: PRODUCT_IMAGE }} style={styles.orderImage} />
                        <View style={styles.orderDetails}>
                            <Text style={styles.merchantName}>Maram Comfort Filipino</Text>
                            <Text style={styles.orderMeta}>Oct 24 • ₱120.00</Text>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>Success/Delivery Successful</Text>
                            </View>
                        </View>
                    </View>

                    {/* Rating Section */}
                    <View style={styles.ratingSection}>
                        <Text style={styles.ratingTitle}>How was the food quality?</Text>
                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                    <MaterialIcons
                                        name={star <= rating ? 'star' : 'star-border'}
                                        size={48}
                                        color={star <= rating ? '#fbbf24' : colors.textSecondary}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TextInput
                            style={styles.reviewInput}
                            placeholder="Write your review... (e.g. Was the food fresh? How was the pickup?)"
                            placeholderTextColor={colors.placeholderGreen}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            value={reviewText}
                            onChangeText={setReviewText}
                        />
                        <TouchableOpacity style={styles.addPhotoBtn}>
                            <MaterialIcons name="add-a-photo" size={20} color={colors.primary} />
                            <Text style={styles.addPhotoText}>Add Photos</Text>
                            <Text style={styles.optionalText}>(Optional)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.submitText}>Submit Review</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Other Reviews */}
                    <View style={styles.reviewsSection}>
                        <View style={styles.reviewsHeader}>
                            <Text style={styles.reviewsTitle}>What others are saying</Text>
                            <View style={styles.overallRating}>
                                <Text style={styles.overallScore}>4.8</Text>
                                <Text style={styles.overallCount}>(124)</Text>
                            </View>
                        </View>
                        {reviews.map((review) => (
                            <View key={review.id} style={styles.reviewCard}>
                                <View style={styles.reviewHeader}>
                                    <Image source={{ uri: review.avatar }} style={styles.reviewerAvatar} />
                                    <View style={styles.reviewerInfo}>
                                        <Text style={styles.reviewerName}>{review.name}</Text>
                                        <View style={styles.reviewMeta}>
                                            <View style={styles.reviewStars}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <MaterialIcons
                                                        key={star}
                                                        name={star <= review.rating ? 'star' : 'star-border'}
                                                        size={14}
                                                        color={star <= review.rating ? '#fbbf24' : colors.textSecondary}
                                                    />
                                                ))}
                                            </View>
                                            <Text style={styles.reviewDate}>{review.date}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.reviewText}>{review.text}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'home') navigation.navigate('BuyerHome');
                    if (tab === 'orders') navigation.navigate('BuyerOrders');
                }}
                type="buyer"
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
    scrollContent: { paddingBottom: 120 },
    orderInfo: { flexDirection: 'row', padding: spacing.lg, gap: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.surfaceHighlight },
    orderImage: { width: 80, height: 80, borderRadius: borderRadius.lg },
    orderDetails: { flex: 1 },
    merchantName: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    orderMeta: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
    statusBadge: { backgroundColor: colors.primary + '22', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm, alignSelf: 'flex-start', marginTop: spacing.sm },
    statusText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '500' },
    ratingSection: { padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.surfaceHighlight },
    ratingTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.textPrimary, textAlign: 'center', marginBottom: spacing.lg },
    starsContainer: { flexDirection: 'row', justifyContent: 'center', gap: spacing.md, marginBottom: spacing.xl },
    reviewInput: { backgroundColor: colors.inputDark, borderRadius: borderRadius.lg, padding: spacing.lg, color: colors.textPrimary, fontSize: fontSize.md, minHeight: 100, marginBottom: spacing.md },
    addPhotoBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md },
    addPhotoText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
    optionalText: { fontSize: fontSize.sm, color: colors.textSecondary },
    submitButton: { backgroundColor: colors.primary, borderRadius: borderRadius.lg, height: 56, alignItems: 'center', justifyContent: 'center', marginTop: spacing.md },
    submitText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.backgroundDark },
    reviewsSection: { padding: spacing.lg },
    reviewsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
    reviewsTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    overallRating: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    overallScore: { fontSize: fontSize.lg, fontWeight: '700', color: colors.primary },
    overallCount: { fontSize: fontSize.sm, color: colors.textSecondary },
    reviewCard: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md },
    reviewHeader: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
    reviewerAvatar: { width: 40, height: 40, borderRadius: 20 },
    reviewerInfo: { flex: 1 },
    reviewerName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    reviewMeta: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 2 },
    reviewStars: { flexDirection: 'row' },
    reviewDate: { fontSize: fontSize.xs, color: colors.textSecondary },
    reviewText: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 20 },
});
