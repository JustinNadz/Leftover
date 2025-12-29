import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const categoryTabs = ['Top Deals', 'Merienda Favorites', 'Dinner'];

const recommendedItems = [
    { id: '1', name: 'Pork BBQ Sticks', merchant: 'Mang Inasal • 1km', price: 150, originalPrice: 250, rating: 4.8, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT8SXBB5rGVZf0YS1H9mtcZwNxNJeGqHTLKlJKyAEnJ0pOANnXd7lWfEWYaZ5jt8j5h9BRMYbqELrwQZn7Fb2Zy3zWqXsQF0wkYz8YwKbP0lQpFVZKVNdKLn3j9wRc0D5q-Q8' },
    { id: '2', name: 'Fried Chicken Meal', merchant: 'Jolibee • 0.5km', price: 85, originalPrice: null, badge: 'Selling Fast!', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkO4AmJmSk3__W3AklVco8zMmftp7mTgRbX8-NX6hG8Nk2LdAEdU0PdncW49rM35WKdg_d5XVbp-SfCH5E345KeukkX10IGksht997JyWFdsZG_oBjqOaxQThlUhnOM4L1V9GAuw3Dh1d36ADDkHfRuTbczQoMkIDcdfiC6mzY4dhAxAPbC8NO2bTyb_O7GbRdq1mATdtmzYcqr-bl_EufOKzL4fojD3-fDWg67xewuHA0EwWzX8BjnsZR2kAoTjBfwE5qXfAx8bpr' },
    { id: '3', name: 'Pancit Canton', merchant: 'Amber • 0.8km', price: 350, originalPrice: null, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeEKWS2w8xaVGNiRxfAwxKJ3PNpGRvcmPBa74CJRFHKqRsNFdEd8HBvIk2fPOl5yMxsaXRNNYQtQB8nBZCWFZWcq5yN2MLKJwWgQ0KlKIyLwvVKYlsAZ8CJQxTKM0pJv8q3v8' },
];

const topPickItems = [
    { id: '1', name: 'Chicken Adobo Rice Bowl', merchant: 'Tita Nene\'s Eatery • 0.5km away', price: 70, originalPrice: 185, itemsLeft: 3, tags: ['Pinoy Favorites', 'Hot Meal'], recentBuyers: 4, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT8SXBB5rGVZf0YS1H9mtcZwNxNJeGqHTLKlJKyAEnJ0pOANnXd7lWfEWYaZ5jt8j5h9BRMYbqELrwQZn7Fb2Zy3zWqXsQF0wkYz8YwKbP0lQpFVZKVNdKLn3j9wRc0D5q-Q8' },
    { id: '2', name: 'Assorted Pastry Mystery Bag', merchant: 'Pan de Manila • 0.3km away', price: 120, originalPrice: 270, rating: 4.9, reviews: '1.2k', isClosingSoon: true, tags: ['Bakery', 'Surplus Bag'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR-hBuMZnzy-zf7wEqgphKw8NTVfN5DgDoE99hdOrIoHmbupwEzOzrHMpRmM-jqG3ZXHryWXyniipk0294ybhVILc2kGLKu-todN5Bi_JboIBZ8aNgWloTQvdt2WKl84qb8SVLeoF_64_Oc2gtY73mXpw91bBlR4mlAMU6PvEGHFX1a_DZQa0vJ5ouigYMMXqMPAYI88zaEXot6xUjq8JvpEZjeHH4Ipa3S7s5CcQ9Qc6y_4JwIBrjTE5j5oLA5ap1qpNKqK4J4pVk' },
];

interface HomeDiscoverScreenProps {
    navigation: any;
}

export const HomeDiscoverScreen: React.FC<HomeDiscoverScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('home');
    const [selectedCategory, setSelectedCategory] = useState('Top Deals');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Location Header */}
                <View style={styles.header}>
                    <View style={styles.locationRow}>
                        <MaterialIcons name="location-on" size={18} color={colors.primary} />
                        <View>
                            <Text style={styles.locationLabel}>CURRENT LOCATION</Text>
                            <Text style={styles.locationValue}>Makati, Metro Manila</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.profileBtn}>
                        <MaterialIcons name="person" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Greeting */}
                    <Text style={styles.greeting}>Magandang gabi, Maria!</Text>
                    <Text style={styles.subtitle}>Hungry for a deal?</Text>

                    {/* Category Tabs */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryTabs}>
                        {categoryTabs.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.categoryTab, selectedCategory === tab && styles.categoryTabActive]}
                                onPress={() => setSelectedCategory(tab)}
                            >
                                <Text style={[styles.categoryText, selectedCategory === tab && styles.categoryTextActive]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Recommendations */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Because you liked <Text style={styles.highlight}>Chicken Inasal</Text></Text>
                        <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                        {recommendedItems.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.recCard} onPress={() => navigation.navigate('ProductDetail')}>
                                <View style={styles.recImageContainer}>
                                    <Image source={{ uri: item.imageUrl }} style={styles.recImage} />
                                    {item.rating && (
                                        <View style={styles.ratingBadge}>
                                            <MaterialIcons name="star" size={12} color="#fbbf24" />
                                            <Text style={styles.ratingText}>{item.rating}</Text>
                                        </View>
                                    )}
                                    {item.badge && (
                                        <View style={styles.sellingFastBadge}>
                                            <Text style={styles.sellingFastText}>{item.badge}</Text>
                                        </View>
                                    )}
                                </View>
                                <Text style={styles.recName} numberOfLines={1}>{item.name}</Text>
                                <Text style={styles.recMerchant}>{item.merchant}</Text>
                                <View style={styles.priceRow}>
                                    <Text style={styles.recPrice}>₱{item.price}</Text>
                                    {item.originalPrice && <Text style={styles.recOriginal}>₱{item.originalPrice}</Text>}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Top Picks */}
                    <Text style={styles.sectionTitle}>Top Picks Near You</Text>
                    {topPickItems.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.topPickCard} onPress={() => navigation.navigate('ProductDetail')}>
                            <View style={styles.topPickImageContainer}>
                                <Image source={{ uri: item.imageUrl }} style={styles.topPickImage} />
                                {item.itemsLeft && (
                                    <View style={styles.itemsLeftBadge}>
                                        <Text style={styles.itemsLeftText}>Only {item.itemsLeft} left!</Text>
                                    </View>
                                )}
                                {item.isClosingSoon && (
                                    <View style={[styles.itemsLeftBadge, styles.closingSoonBadge]}>
                                        <Text style={styles.closingSoonText}>Closing Soon</Text>
                                    </View>
                                )}
                                <View style={styles.tagsRow}>
                                    {(item.tags || []).map((tag, idx) => (
                                        <View key={idx} style={styles.tagChip}>
                                            <Text style={styles.tagText}>{tag}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <View style={styles.topPickContent}>
                                <View style={styles.topPickHeader}>
                                    <Text style={styles.topPickName}>{item.name}</Text>
                                    <View style={styles.priceColumn}>
                                        {item.originalPrice && <Text style={styles.topPickOriginal}>₱{item.originalPrice}</Text>}
                                        <Text style={styles.topPickPrice}>₱{item.price}</Text>
                                    </View>
                                </View>
                                <Text style={styles.topPickMerchant}>{item.merchant}</Text>
                                <View style={styles.topPickFooter}>
                                    {item.recentBuyers && (
                                        <View style={styles.buyersRow}>
                                            <View style={styles.avatarStack}>
                                                {[1, 2, 3].map((_, i) => <View key={i} style={[styles.miniAvatar, { marginLeft: i > 0 ? -8 : 0 }]} />)}
                                            </View>
                                            <Text style={styles.buyersText}>+{item.recentBuyers} bought recently</Text>
                                        </View>
                                    )}
                                    {item.rating && (
                                        <View style={styles.ratingRow}>
                                            <MaterialIcons name="star" size={16} color="#fbbf24" />
                                            <Text style={styles.ratingValue}>{item.rating}</Text>
                                            <Text style={styles.reviewCount}>({item.reviews})</Text>
                                        </View>
                                    )}
                                    <TouchableOpacity style={item.isClosingSoon ? styles.viewDealBtn : styles.addToCartBtn}>
                                        <Text style={item.isClosingSoon ? styles.viewDealText : styles.addToCartText}>
                                            {item.isClosingSoon ? 'View Deal' : 'Add to Cart'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>
            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
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
    locationRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    locationLabel: { fontSize: fontSize.xs, color: colors.textSecondary },
    locationValue: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    profileBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceDark, alignItems: 'center', justifyContent: 'center' },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 120 },
    greeting: { fontSize: 28, fontWeight: '700', color: colors.textPrimary, marginTop: spacing.md },
    subtitle: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: spacing.xs, marginBottom: spacing.lg },
    categoryTabs: { gap: spacing.sm, marginBottom: spacing.xl },
    categoryTab: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: borderRadius.full, backgroundColor: colors.surfaceDark },
    categoryTabActive: { backgroundColor: colors.primary },
    categoryText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary },
    categoryTextActive: { color: colors.backgroundDark, fontWeight: '600' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
    sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
    highlight: { color: colors.primary },
    viewAll: { fontSize: fontSize.sm, color: colors.primary },
    horizontalList: { gap: spacing.md, marginBottom: spacing.xl },
    recCard: { width: 140 },
    recImageContainer: { aspectRatio: 1, borderRadius: borderRadius.lg, overflow: 'hidden', marginBottom: spacing.sm, position: 'relative' },
    recImage: { width: '100%', height: '100%' },
    ratingBadge: { position: 'absolute', top: spacing.sm, left: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
    ratingText: { fontSize: 10, fontWeight: '600', color: '#fff' },
    sellingFastBadge: { position: 'absolute', bottom: spacing.sm, right: spacing.sm, backgroundColor: colors.error, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
    sellingFastText: { fontSize: 9, fontWeight: '600', color: '#fff' },
    recName: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textPrimary },
    recMerchant: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    priceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xs },
    recPrice: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary },
    recOriginal: { fontSize: fontSize.sm, color: colors.textSecondary, textDecorationLine: 'line-through' },
    topPickCard: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.xl, overflow: 'hidden', marginBottom: spacing.lg },
    topPickImageContainer: { aspectRatio: 16 / 9, position: 'relative' },
    topPickImage: { width: '100%', height: '100%' },
    itemsLeftBadge: { position: 'absolute', top: spacing.md, right: spacing.md, backgroundColor: colors.error, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
    itemsLeftText: { fontSize: fontSize.xs, fontWeight: '600', color: '#fff' },
    closingSoonBadge: { backgroundColor: '#f97316' },
    closingSoonText: { fontSize: fontSize.xs, fontWeight: '600', color: '#fff' },
    tagsRow: { position: 'absolute', bottom: spacing.md, left: spacing.md, flexDirection: 'row', gap: spacing.xs },
    tagChip: { backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
    tagText: { fontSize: 10, color: '#fff' },
    topPickContent: { padding: spacing.lg },
    topPickHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    topPickName: { flex: 1, fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    priceColumn: { alignItems: 'flex-end' },
    topPickOriginal: { fontSize: fontSize.sm, color: colors.textSecondary, textDecorationLine: 'line-through' },
    topPickPrice: { fontSize: fontSize.xl, fontWeight: '700', color: colors.primary },
    topPickMerchant: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
    topPickFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.md },
    buyersRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    avatarStack: { flexDirection: 'row' },
    miniAvatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.surfaceHighlight, borderWidth: 2, borderColor: colors.surfaceDark },
    buyersText: { fontSize: fontSize.xs, color: colors.textSecondary },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    ratingValue: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    reviewCount: { fontSize: fontSize.sm, color: colors.textSecondary },
    addToCartBtn: { backgroundColor: colors.surfaceHighlight, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.primary },
    addToCartText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
    viewDealBtn: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
    viewDealText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.backgroundDark },
});
