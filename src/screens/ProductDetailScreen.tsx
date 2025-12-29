import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav, Button } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const DEFAULT_PRODUCT = {
    id: '1',
    title: 'Spicy Tuna Roll Set',
    merchant: 'Sushi Zen',
    distance: '0.4 mi',
    rating: 4.8,
    reviewCount: '124',
    originalPrice: 12.00,
    discountedPrice: 4.99,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj3eGhnRBsKJm-PLD1MDEM_2F8Vsg5vDLeIhbIdZ0ID2xt_TzDRqy5jWJkILIona4nuP4Dq-Zake9nz0Z4AQvCIUlEropdB1d8pYS4JyPLoewQsOzj8JwTn_oatnRQsGonQ19GpHzEEzrDUfTCTpdRk5pVVznPs64ppU2vk7h4u_YHpxlAnDMRu9na2zJS3yATqmIellczsNmNYPlp3qaXdsMo3tDwtL68einH_cjIKv-LK7rdkafSauFND4KntSrFS2wb-uWoqkcu',
    merchantLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBemLk3xIDqgLOCwbBKXPRhBwR6WtK97qL6VaBRPYa1IYSau1LfUqBb3F_9qPx0Qedihd3CxBdCC9TkHmyXutxOGUHsvnP9PUfKFfd6b1BnYMErgGI6lSgN1pmBaBbVNnm2kut0RAv2IIKrIuQcN0b0OVzNZp_XKI96W1FPVCmjzhDJE5qEHgoJVTrlcd2NMSdgabRw76mhUonN8AX5tjJl4Phol3WJiuEfSRLARRVRspp8PAWd4XpqfKoSJKBWxentNFaMuGSPyNhM',
    pickupWindow: '8:30 PM - 9:30 PM',
    description: 'Fresh surplus sushi rolls prepared for the dinner rush. This set includes spicy tuna rolls, pickled ginger, and wasabi. Best consumed immediately for peak freshness.',
    allergens: ['Contains Fish', 'Gluten Free', 'Spicy'],
    itemsLeft: 3,
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAljbbz6QipqoNn3qL-qZPTip19KBeT1Eh3W2cRdUJ5451BGG9zSzkXCFRdkGjqoAcoYsPREMPS1yZAhoo08QobRIaItfJuqYP6loYERXAJ3MrZGwCzuwB7jFVQCrt22SRss3SL4md73Op6JLEKnYtRjLLHcK93q3gxC5lO4AHv6LWrU6vsaRsLSXFJ6LoTDaAvW37PS1_EkgzUaPVKGkkR8z0a8tR3gaftieByK0Ama4usLMaKl8d4bxPNc6hwhFLIgOHdcU0mag7_',
    address: '123 Market St, Downtown Seattle, WA • Pickup at the main counter',
};

interface ProductDetailScreenProps {
    navigation: any;
    route?: any;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ navigation, route }) => {
    const product = route?.params?.product || DEFAULT_PRODUCT;
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('home');
    const discount = Math.round((1 - product.discountedPrice / product.originalPrice) * 100);

    return (
        <View style={styles.container}>
            {/* Header Buttons */}
            <SafeAreaView style={styles.headerButtons}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-back-ios-new" size={20} color={colors.textPrimary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                    <MaterialIcons name="favorite-border" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
            </SafeAreaView>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Hero Image */}
                <View style={styles.heroContainer}>
                    <Image source={{ uri: product.imageUrl }} style={styles.heroImage} />
                    <LinearGradient
                        colors={['rgba(16, 34, 24, 0.8)', 'rgba(16, 34, 24, 0)', colors.backgroundDark]}
                        style={styles.heroGradient}
                    />
                </View>

                {/* Content Sheet */}
                <View style={styles.contentSheet}>
                    {/* Title & Status */}
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{product.title}</Text>
                        <View style={styles.itemsLeftBadge}>
                            <MaterialIcons name="timer" size={12} color="#ef4444" />
                            <Text style={styles.itemsLeftText}>Only {product.itemsLeft} left</Text>
                        </View>
                    </View>

                    {/* Merchant Info */}
                    <View style={styles.merchantRow}>
                        <View style={styles.merchantLeft}>
                            <Image source={{ uri: product.merchantLogo }} style={styles.merchantLogo} />
                            <View>
                                <Text style={styles.merchantName}>{product.merchant}</Text>
                                <View style={styles.merchantMeta}>
                                    <MaterialIcons name="star" size={14} color={colors.primary} />
                                    <Text style={styles.rating}>{product.rating}</Text>
                                    <Text style={styles.reviewCount}>({product.reviewCount})</Text>
                                    <Text style={styles.distance}>• {product.distance}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.pickupContainer}>
                            <Text style={styles.pickupLabel}>Pickup window</Text>
                            <Text style={styles.pickupTime}>{product.pickupWindow}</Text>
                        </View>
                    </View>

                    {/* Pricing */}
                    <View style={styles.pricingRow}>
                        <Text style={styles.price}>${product.discountedPrice.toFixed(2)}</Text>
                        <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>Save {discount}%</Text>
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About this meal</Text>
                        <Text style={styles.description}>{product.description}</Text>

                        <View style={styles.allergensContainer}>
                            {(product.allergens || []).map((allergen: string, index: number) => (
                                <View key={index} style={styles.allergenTag}>
                                    <Text style={styles.allergenText}>{allergen}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Location */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Location</Text>
                        <View style={styles.mapContainer}>
                            <Image source={{ uri: product.mapImage }} style={styles.mapImage} />
                            <View style={styles.mapOverlay}>
                                <View style={styles.mapPin}>
                                    <MaterialIcons name="location-on" size={24} color={colors.primary} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.addressRow}>
                            <MaterialIcons name="near-me" size={18} color={colors.textSecondary} />
                            <Text style={styles.addressText}>{product.address}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Action Bar */}
            <View style={styles.actionBar}>
                <View style={styles.actionBarInner}>
                    {/* Quantity */}
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            <MaterialIcons name="remove" size={20} color={colors.textPrimary} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => setQuantity(quantity + 1)}
                        >
                            <MaterialIcons name="add" size={20} color={colors.textPrimary} />
                        </TouchableOpacity>
                    </View>

                    {/* Add Button */}
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('Checkout')}
                    >
                        <Text style={styles.addButtonText}>Add to Order</Text>
                        <Text style={styles.addButtonPrice}>• ${(product.discountedPrice * quantity).toFixed(2)}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'home') navigation.navigate('BuyerHome');
                    if (tab === 'orders') navigation.navigate('Checkout');
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
    headerButtons: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.full,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 200,
    },
    heroContainer: {
        height: SCREEN_HEIGHT * 0.45,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    contentSheet: {
        marginTop: -40,
        backgroundColor: colors.backgroundDark,
        borderTopLeftRadius: borderRadius.xxl,
        borderTopRightRadius: borderRadius.xxl,
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xxl,
        borderTopWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: spacing.lg,
        marginBottom: spacing.lg,
    },
    title: {
        flex: 1,
        fontSize: 28,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    itemsLeftBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.2)',
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    itemsLeftText: {
        fontSize: fontSize.xs,
        fontWeight: '700',
        color: '#ef4444',
    },
    merchantRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: spacing.lg,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: spacing.lg,
    },
    merchantLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    merchantLogo: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.md,
        backgroundColor: colors.surfaceDark,
    },
    merchantName: {
        fontSize: fontSize.sm,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    merchantMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginTop: spacing.xs,
    },
    rating: {
        fontSize: fontSize.xs,
        color: colors.primary,
        fontWeight: '500',
    },
    reviewCount: {
        fontSize: fontSize.xs,
        color: colors.textSecondary,
    },
    distance: {
        fontSize: fontSize.xs,
        color: colors.textSecondary,
    },
    pickupContainer: {
        alignItems: 'flex-end',
    },
    pickupLabel: {
        fontSize: fontSize.xs,
        color: colors.textSecondary,
    },
    pickupTime: {
        fontSize: fontSize.sm,
        fontWeight: '600',
        color: colors.primary,
        marginTop: spacing.xs,
    },
    pricingRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    price: {
        fontSize: 32,
        fontWeight: '700',
        color: colors.primary,
    },
    originalPrice: {
        fontSize: fontSize.lg,
        color: colors.textSecondary,
        textDecorationLine: 'line-through',
    },
    discountBadge: {
        marginLeft: 'auto',
        backgroundColor: colors.primary,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    discountText: {
        fontSize: fontSize.sm,
        fontWeight: '700',
        color: colors.backgroundDark,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    description: {
        fontSize: fontSize.md,
        color: colors.textSecondary,
        lineHeight: 24,
    },
    allergensContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginTop: spacing.md,
    },
    allergenTag: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    allergenText: {
        fontSize: fontSize.xs,
        color: colors.textSecondary,
    },
    mapContainer: {
        height: 160,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        position: 'relative',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapPin: {
        backgroundColor: colors.backgroundDark,
        padding: spacing.sm,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing.sm,
        marginTop: spacing.md,
    },
    addressText: {
        flex: 1,
        fontSize: fontSize.sm,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    actionBar: {
        position: 'absolute',
        bottom: 84,
        left: 0,
        right: 0,
        paddingHorizontal: spacing.lg,
    },
    actionBarInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.lg,
        backgroundColor: 'rgba(26, 46, 36, 0.95)',
        borderRadius: borderRadius.xl,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.primary + '33',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 12,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.lg,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    quantityButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        fontSize: fontSize.lg,
        fontWeight: '700',
        color: colors.textPrimary,
        minWidth: 24,
        textAlign: 'center',
    },
    addButton: {
        flex: 1,
        height: 48,
        backgroundColor: colors.primary,
        borderRadius: borderRadius.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    addButtonText: {
        fontSize: fontSize.md,
        fontWeight: '700',
        color: colors.backgroundDark,
    },
    addButtonPrice: {
        fontSize: fontSize.sm,
        fontWeight: '500',
        color: colors.backgroundDark,
        opacity: 0.7,
    },
});
