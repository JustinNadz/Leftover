import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHMLxUXi0vOvWtx60JlhXNsWI-9QjydJS8l8yXmMoe96cuJBb0Hn0JF4W-To09wL0pxZiZGnAZrpX00wvJ2yLATIyj_lU7sY1msrYBqoE0fBppCHFYw727SxgOOQaTxaLBjpgaM5gXid5yi904FGU4_33FnGxjfjNIlIYWuFg77jZwSUceQxBOi02s9BVTJzzU27CMb1TytFGTgTuqZ5MnaGVjeLpOg6FAMhB04bnwtWL5JHgzLC-q52wZ8sCcTmBRmkdaiybqQZcQ';

const dietaryFilters = ['Vegan', 'Gluten-Free'];
const quickFilters = ['All', 'Meals', 'Bakery'];

const endingSoonItems = [
    { id: '1', name: 'Sushi Surprise Box', price: 199.00, originalPrice: 450.00, timeLeft: '2h', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj3eGhnRBsKJm-PLD1MDEM_2F8Vsg5vDLeIhbIdZ0ID2xt_TzDRqy5jWJkILIona4nuP4Dq-Zake9nz0Z4AQvCIUlEropdB1d8pYS4JyPLoewQsOzj8JwTn_oatnRQsGonQ19GpHzEEzrDUfTCTpdRk5pVVznPs64ppU2vk7h4u_YHpxlAnDMRu9na2zJS3yATqmIellczsNmNYPlp3qaXdsMo3tDwtL68einH_cjIKv-LK7rdkafSauFND4KntSrFS2wb-uWoqkcu' },
    { id: '2', name: 'Bread Only...', price: 120.00, originalPrice: null, timeLeft: '3h', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR-hBuMZnzy-zf7wEqgphKw8NTVfN5DgDoE99hdOrIoHmbupwEzOzrHMpRmM-jqG3ZXHryWXyniipk0294ybhVILc2kGLKu-todN5Bi_JboIBZ8aNgWloTQvdt2WKl84qb8SVLeoF_64_Oc2gtY73mXpw91bBlR4mlAMU6PvEGHFX1a_DZQa0vJ5ouigYMMXqMPAYI88zaEXot6xUjq8JvpEZjeHH4Ipa3S7s5CcQ9Qc6y_4JwIBrjTE5j5oLA5ap1qpNKqK4J4pVk' },
];

const surplusItems = [
    { id: '1', name: 'Artisan Bread Bag', merchant: 'Pan de Manila • Bakery', rating: 4.5, price: null, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR-hBuMZnzy-zf7wEqgphKw8NTVfN5DgDoE99hdOrIoHmbupwEzOzrHMpRmM-jqG3ZXHryWXyniipk0294ybhVILc2kGLKu-todN5Bi_JboIBZ8aNgWloTQvdt2WKl84qb8SVLeoF_64_Oc2gtY73mXpw91bBlR4mlAMU6PvEGHFX1a_DZQa0vJ5ouigYMMXqMPAYI88zaEXot6xUjq8JvpEZjeHH4Ipa3S7s5CcQ9Qc6y_4JwIBrjTE5j5oLA5ap1qpNKqK4J4pVk' },
    { id: '2', name: 'Veggie Mixed Box', merchant: 'Fresh Farms • Grocery', rating: 4.3, left: 0, price: 150.00, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeEKWS2w8xaVGNiRxfAwxKJ3PNpGRvcmPBa74CJRFHKqRsNFdEd8HBvIk2fPOl5yMxsaXRNNYQtQB8nBZCWFZWcq5yN2MLKJwWgQ0KlKIyLwvVKYlsAZ8CJQxTKM0pJv8q3v8' },
    { id: '3', name: 'Late Night Pizza', merchant: 'Pizza Avenue • Manila • Pizza', rating: 4.1, price: 129.00, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT8SXBB5rGVZf0YS1H9mtcZwNxNJeGqHTLKlJKyAEnJ0pOANnXd7lWfEWYaZ5jt8j5h9BRMYbqELrwQZn7Fb2Zy3zWqXsQF0wkYz8YwKbP0lQpFVZKVNdKLn3j9wRc0D5q-Q8' },
];

interface ExploreScreenProps {
    navigation: any;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('home');
    const [selectedQuickFilter, setSelectedQuickFilter] = useState('All');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <Image source={{ uri: USER_AVATAR }} style={styles.avatar} />
                        <View>
                            <Text style={styles.greeting}>Hi, Alex</Text>
                            <Text style={styles.subtitle}>Surplus hunter level!</Text>
                        </View>
                    </View>
                </View>

                {/* Search */}
                <View style={styles.searchRow}>
                    <View style={styles.searchContainer}>
                        <MaterialIcons name="search" size={20} color={colors.textSecondary} />
                        <TextInput style={styles.searchInput} placeholder="Search or enter address here" placeholderTextColor={colors.placeholderGreen} />
                    </View>
                </View>

                {/* Location & Filters */}
                <View style={styles.filtersRow}>
                    <TouchableOpacity style={styles.filterChip}>
                        <Text style={styles.filterChipText}>Within</Text>
                        <MaterialIcons name="expand-more" size={18} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterChip}>
                        <MaterialIcons name="my-location" size={16} color={colors.textSecondary} />
                        <Text style={styles.filterChipText}>Current Location</Text>
                    </TouchableOpacity>
                </View>

                {/* Dietary Preferences */}
                <View style={styles.dietaryRow}>
                    <Text style={styles.dietaryLabel}>DIETARY PREFERENCES</Text>
                    <View style={styles.dietaryChips}>
                        {dietaryFilters.map((filter) => (
                            <View key={filter} style={styles.dietaryChip}>
                                <Text style={styles.dietaryChipText}>{filter}</Text>
                                <TouchableOpacity><MaterialIcons name="close" size={14} color={colors.textSecondary} /></TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Quick Filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickFilters}>
                    {quickFilters.map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            style={[styles.quickFilter, selectedQuickFilter === filter && styles.quickFilterActive]}
                            onPress={() => setSelectedQuickFilter(filter)}
                        >
                            <Text style={[styles.quickFilterText, selectedQuickFilter === filter && styles.quickFilterTextActive]}>{filter}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.quickFilter}>
                        <MaterialIcons name="tune" size={18} color={colors.textSecondary} />
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Ending Soon */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Ending Soon</Text>
                        <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                        {endingSoonItems.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.endingCard} onPress={() => navigation.navigate('ProductDetail')}>
                                <View style={styles.endingImageContainer}>
                                    <Image source={{ uri: item.imageUrl }} style={styles.endingImage} />
                                    <View style={styles.timeBadge}>
                                        <MaterialIcons name="timer" size={12} color="#fff" />
                                        <Text style={styles.timeText}>{item.timeLeft}</Text>
                                    </View>
                                </View>
                                <Text style={styles.endingName} numberOfLines={1}>{item.name}</Text>
                                <View style={styles.priceRow}>
                                    <Text style={styles.endingPrice}>₱{item.price.toFixed(2)}</Text>
                                    {item.originalPrice && <Text style={styles.originalPrice}>₱{item.originalPrice.toFixed(2)}</Text>}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Surplus Near You */}
                    <Text style={styles.sectionTitle}>Surplus near you</Text>
                    {surplusItems.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.surplusCard} onPress={() => navigation.navigate('ProductDetail')}>
                            <Image source={{ uri: item.imageUrl }} style={styles.surplusImage} />
                            <View style={styles.surplusContent}>
                                <Text style={styles.surplusName}>{item.name}</Text>
                                <Text style={styles.surplusMerchant}>{item.merchant}</Text>
                                <View style={styles.surplusFooter}>
                                    <View style={styles.ratingBadge}>
                                        <MaterialIcons name="star" size={14} color="#fbbf24" />
                                        <Text style={styles.ratingText}>{item.rating}</Text>
                                    </View>
                                    {item.price && <Text style={styles.surplusPrice}>₱{item.price.toFixed(2)}</Text>}
                                </View>
                            </View>
                            <TouchableOpacity style={styles.addBtn}>
                                <MaterialIcons name="add" size={20} color={colors.backgroundDark} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Map View Button */}
                <TouchableOpacity style={styles.mapViewBtn}>
                    <MaterialIcons name="map" size={18} color={colors.backgroundDark} />
                    <Text style={styles.mapViewText}>Map View</Text>
                </TouchableOpacity>
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
    userInfo: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    avatar: { width: 44, height: 44, borderRadius: 22 },
    greeting: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    subtitle: { fontSize: fontSize.sm, color: colors.textSecondary },
    searchRow: { paddingHorizontal: spacing.lg, marginBottom: spacing.md },
    searchContainer: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.inputDark, borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, height: 48 },
    searchInput: { flex: 1, fontSize: fontSize.md, color: colors.textPrimary },
    filtersRow: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.lg, marginBottom: spacing.md },
    filterChip: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full, backgroundColor: colors.surfaceDark },
    filterChipText: { fontSize: fontSize.sm, color: colors.textSecondary },
    dietaryRow: { paddingHorizontal: spacing.lg, marginBottom: spacing.md },
    dietaryLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginBottom: spacing.sm },
    dietaryChips: { flexDirection: 'row', gap: spacing.sm },
    dietaryChip: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full, backgroundColor: colors.primary + '22' },
    dietaryChipText: { fontSize: fontSize.xs, color: colors.primary },
    quickFilters: { paddingHorizontal: spacing.lg, gap: spacing.sm, marginBottom: spacing.lg },
    quickFilter: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full, backgroundColor: colors.surfaceDark },
    quickFilterActive: { backgroundColor: colors.primary },
    quickFilterText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary },
    quickFilterTextActive: { color: colors.backgroundDark },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 180 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
    sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
    seeAll: { fontSize: fontSize.sm, color: colors.primary },
    horizontalList: { gap: spacing.md, marginBottom: spacing.xl },
    endingCard: { width: 160 },
    endingImageContainer: { aspectRatio: 1, borderRadius: borderRadius.lg, overflow: 'hidden', marginBottom: spacing.sm, position: 'relative' },
    endingImage: { width: '100%', height: '100%' },
    timeBadge: { position: 'absolute', top: spacing.sm, left: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.error, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
    timeText: { fontSize: fontSize.xs, fontWeight: '600', color: '#fff' },
    endingName: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textPrimary },
    priceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xs },
    endingPrice: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary },
    originalPrice: { fontSize: fontSize.sm, color: colors.textSecondary, textDecorationLine: 'line-through' },
    surplusCard: { flexDirection: 'row', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, overflow: 'hidden', marginBottom: spacing.md },
    surplusImage: { width: 80, height: 80 },
    surplusContent: { flex: 1, padding: spacing.md },
    surplusName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    surplusMerchant: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    surplusFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm },
    ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    ratingText: { fontSize: fontSize.sm, color: colors.textPrimary },
    surplusPrice: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary },
    addBtn: { alignSelf: 'center', marginRight: spacing.md, width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
    mapViewBtn: { position: 'absolute', bottom: 100, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.primary, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: borderRadius.full },
    mapViewText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.backgroundDark },
});
