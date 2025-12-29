import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav, ProductCard } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const AVATAR_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuApCjs8UuWec7W3OHoAKmpRGFxOSQTTVsqBHOK0Nmcivk-CnkSWQFSkx_k3lEcZFNShlEKVD13jCKhH7qBBSN6A1I8zjnJ21JCrAiofeS-C3rXSkocrJdt64243WsF9mO-hwWLh0jL1QsiwSPKwgPFWPJ9f6MANOnIrD46GLQTfj4In2zxogtBKJsQZOTfDzpEvnbpleMyd4wX77zt3ugRhHfc9tY803fYb2MvK31yv6j39ADI6DWPmcEt-B947Lno7p_yHX4Gxorsv';

const categories = [
    { id: 'all', label: 'All', icon: null },
    { id: 'meals', label: 'Meals', icon: 'restaurant' },
    { id: 'bakery', label: 'Bakery', icon: 'bakery-dining' },
    { id: 'groceries', label: 'Groceries', icon: 'local-grocery-store' },
];

const endingSoonItems = [
    {
        id: '1',
        title: 'Sushi Surprise Box',
        merchant: 'Tokyo Diner',
        distance: '0.8km',
        originalPrice: 24.00,
        discountedPrice: 8.99,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2d8XNvsAlq4CaY-t1D9b2UeLR4THOzJbKMhS3gMgEMtRkdKY1mFEgfzLbXmWm5V9kWcMtKR_yvvo3VCjxvvnnDTDv4PuC3cG0Un9As7pnvJ7_hBQaxRvfTvFZWbx0P1EqhobtpGI0b43aYSq0QtvFie5I9vJIhfQa-41FsUMoyRPYI50v5iD-3eLW341gBoj-WRdwB24sYn0HmCwg7D0VqJCy7XbZE7g98fEwzgXB0r6pG6S-sS48JORVEsaejicFIWLr0MH4QxF8',
        timeLeft: '25m left',
        itemsLeft: 3,
    },
    {
        id: '2',
        title: 'Donut Delight Pack',
        merchant: 'Sweet Tooth Bakery',
        distance: '1.2km',
        originalPrice: 12.00,
        discountedPrice: 4.50,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoRFGU_akNPvQajq_met5UKG-CYvb1JBol1rIoTBma23v54ObxCcCi2XWY5pWmLSpZS9ykkPskjEtQmqUNUL_7cT5n-dVBHHdDYy-BPMCEaD99GXrmDfyqKdcSg2eIecmzdsi40ceS40SVB99Iiknwl_yjN6ksVmHlIcjYI84JSJx95VS-SS2EuNsZnaJh49KTKH2wHYw1jkqKgoeMRfUKVlgGHiVAyzSu1IKZcVU_6XGw5CbfJVI0dZBknGE-GLfG5ygn85Ccm6ch',
        timeLeft: '40m left',
        itemsLeft: 1,
    },
];

const nearbyItems = [
    {
        id: '3',
        title: 'Artisan Bread Bag',
        merchant: 'Crust & Crumb',
        category: 'Bakery',
        distance: '0.5km',
        originalPrice: 15.00,
        discountedPrice: 5.99,
        rating: 4.8,
        reviewCount: '120+',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2ldwsjF-n1jrUDIygKQrqQzHLw0OF_FDK67tVBi-bp5tfOqYDXu2WOQw5LvyHHUmUM91TOlg8mA7QRgthL-EiByaXCYzJgGaUu-Geh6eDI-Tf9yYOQnGdbSq5n5yUJM_SwS_CMr_hoR_0NjQmGOgfv-u2D1df1waoIbXpjvf1LBdS6GjGCDg1o8mxzJtrwU66IEPqhpIZ7MgegzHbYNM2N8SWaz0IQ94N0H6DBVMv6p6O11uCcOR3e9gLoELUqSB0aWuADnh60pM6',
        isNew: true,
    },
    {
        id: '4',
        title: 'Veggie Mixed Box',
        merchant: 'Green Grocers',
        category: 'Produce',
        distance: '1.2km',
        originalPrice: 20.00,
        discountedPrice: 7.50,
        rating: 4.5,
        reviewCount: '85',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWg7O0MTy6b3vy7t2Y_lAd_EKCa2idvBQ0bjUSRmnvsGm8TQjFDsk0zIy1SCogmKUw0ymxoaaMB2N5loQQicIEu0gFOyQhayfjIYv2U7uJjsdFdG-0qhaSNYRCnyzyLAgO93QqAZDcIsL-9Y7vsepNwYSI671rJq0O5lmx8neq3opt2k1wni4e4ycVhvIgNXzw6z5MAmj-eJ6tNtVO6_VyFwht7tkLDLbV6bXNspuYGD5323APlrl6n2co1a3EnMgEg-pkTNuLbiQh',
    },
    {
        id: '5',
        title: 'Late Night Pizza',
        merchant: "Luigi's",
        category: 'Pizza',
        distance: '0.2km',
        originalPrice: 18.00,
        discountedPrice: 6.00,
        rating: 4.2,
        reviewCount: '200+',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQDa3UuO1sQdT6a8a1wzR27_wt3qKBiV5N28ru1Fm5pFhAjVjyWd1shaivclsqvilrounmlMYDsqEdjMVVc2eGWprehxM71TE9dAKsBesKhhotSAmVAK0bMRFnkCFcm_ho-0BMlszsHmxNEJOCm7nZvPp0gChLMUeiwHDyd9EbZ7SoC5qNnxGRi7dvgCs9F6sZUZ1xBDGszu4iH2BlqpuBvg-vHAt1clNAfzoOJQpAE8FzranDkoF27Sw_mbteqXhSfubg1L4ZIE_c',
        isHot: true,
    },
];

interface BuyerHomeScreenProps {
    navigation: any;
}

export const BuyerHomeScreen: React.FC<BuyerHomeScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('home');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [distance, setDistance] = useState(5);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image source={{ uri: AVATAR_URL }} style={styles.avatar} />
                        <View>
                            <Text style={styles.greeting}>Hi, Alex</Text>
                            <Text style={styles.subGreeting}>Let's rescue some food!</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}>
                        <MaterialIcons name="notifications" size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <MaterialIcons name="search" size={24} color={colors.textSecondary} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for pizza, sushi, pastries..."
                            placeholderTextColor={colors.placeholderGreen}
                        />
                        <TouchableOpacity style={styles.filterButton}>
                            <MaterialIcons name="tune" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Distance Slider */}
                <View style={styles.distanceContainer}>
                    <View style={styles.distanceHeader}>
                        <View style={styles.distanceLabel}>
                            <MaterialIcons name="location-on" size={18} color={colors.primary} />
                            <Text style={styles.distanceText}>Within {distance}km</Text>
                        </View>
                        <Text style={styles.locationText}>Current Location</Text>
                    </View>
                    <View style={styles.sliderTrack}>
                        <View style={[styles.sliderFill, { width: `${(distance / 30) * 100}%` }]} />
                        <View style={[styles.sliderThumb, { left: `${(distance / 30) * 100}%` }]} />
                    </View>
                    <View style={styles.sliderLabels}>
                        <Text style={styles.sliderLabel}>1km</Text>
                        <Text style={styles.sliderLabel}>30km</Text>
                    </View>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Categories */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContainer}
                    >
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                style={[
                                    styles.categoryChip,
                                    selectedCategory === category.id && styles.categoryChipActive,
                                ]}
                                onPress={() => setSelectedCategory(category.id)}
                            >
                                {category.icon && (
                                    <MaterialIcons
                                        name={category.icon as keyof typeof MaterialIcons.glyphMap}
                                        size={18}
                                        color={selectedCategory === category.id ? colors.backgroundDark : colors.textSecondary}
                                    />
                                )}
                                <Text
                                    style={[
                                        styles.categoryText,
                                        selectedCategory === category.id && styles.categoryTextActive,
                                    ]}
                                >
                                    {category.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Ending Soon Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Ending Soon</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>See all</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.horizontalListContainer}
                        >
                            {endingSoonItems.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    {...item}
                                    variant="vertical"
                                    onPress={() => navigation.navigate('ProductDetail', { product: item })}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    {/* Nearby Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Surplus near you</Text>
                        <View style={styles.nearbyList}>
                            {nearbyItems.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    {...item}
                                    variant="horizontal"
                                    onPress={() => navigation.navigate('ProductDetail', { product: item })}
                                    onAddPress={() => navigation.navigate('Checkout')}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {/* Map Toggle FAB */}
                <TouchableOpacity style={styles.mapFab}>
                    <MaterialIcons name="map" size={20} color={colors.primary} />
                    <Text style={styles.mapFabText}>Map View</Text>
                </TouchableOpacity>
            </SafeAreaView>

            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'orders') navigation.navigate('BuyerOrders');
                    if (tab === 'wallet') navigation.navigate('MyWallet');
                    if (tab === 'profile') navigation.navigate('Profile');
                }}
                type="buyer"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.full,
        borderWidth: 2,
        borderColor: colors.primary + '33',
    },
    greeting: {
        fontSize: fontSize.md,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    subGreeting: {
        fontSize: fontSize.xs,
        color: colors.textSecondary,
    },
    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.full,
        backgroundColor: colors.surfaceDark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchContainer: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        height: 48,
        paddingHorizontal: spacing.lg,
    },
    searchInput: {
        flex: 1,
        color: colors.textPrimary,
        fontSize: fontSize.sm,
        marginLeft: spacing.sm,
    },
    filterButton: {
        padding: spacing.sm,
    },
    distanceContainer: {
        marginHorizontal: spacing.lg,
        backgroundColor: colors.cardDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
    },
    distanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    distanceLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    distanceText: {
        fontSize: fontSize.sm,
        fontWeight: '700',
        color: colors.primary,
    },
    locationText: {
        fontSize: fontSize.xs,
        color: colors.textSecondary,
    },
    sliderTrack: {
        height: 6,
        backgroundColor: colors.borderDark,
        borderRadius: borderRadius.full,
        position: 'relative',
    },
    sliderFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: borderRadius.full,
    },
    sliderThumb: {
        position: 'absolute',
        top: -7,
        width: 20,
        height: 20,
        borderRadius: borderRadius.full,
        backgroundColor: colors.primary,
        borderWidth: 3,
        borderColor: colors.backgroundDark,
        marginLeft: -10,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.xs,
    },
    sliderLabel: {
        fontSize: fontSize.xs,
        color: colors.textSecondary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    categoriesContainer: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        gap: spacing.md,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        backgroundColor: colors.surfaceDark,
        marginRight: spacing.sm,
    },
    categoryChipActive: {
        backgroundColor: colors.primary,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    categoryText: {
        fontSize: fontSize.sm,
        fontWeight: '500',
        color: colors.textPrimary,
    },
    categoryTextActive: {
        color: colors.backgroundDark,
        fontWeight: '700',
    },
    section: {
        marginTop: spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    sectionTitle: {
        fontSize: fontSize.xl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    seeAll: {
        fontSize: fontSize.sm,
        fontWeight: '500',
        color: colors.primary,
    },
    horizontalListContainer: {
        paddingHorizontal: spacing.lg,
        gap: spacing.lg,
    },
    nearbyList: {
        paddingHorizontal: spacing.lg,
        gap: spacing.lg,
        marginTop: spacing.sm,
    },
    mapFab: {
        position: 'absolute',
        bottom: 100,
        right: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderDark,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    mapFabText: {
        fontSize: fontSize.sm,
        fontWeight: '700',
        color: colors.textPrimary,
    },
});
