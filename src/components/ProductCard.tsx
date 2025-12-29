import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, borderRadius, spacing, fontSize } from '../theme';

interface ProductCardProps {
    title: string;
    merchant: string;
    distance: string;
    originalPrice: number;
    discountedPrice: number;
    rating?: number;
    reviewCount?: string;
    imageUrl: string;
    timeLeft?: string;
    itemsLeft?: number;
    isNew?: boolean;
    isHot?: boolean;
    onPress: () => void;
    onAddPress?: () => void;
    variant?: 'horizontal' | 'vertical';
    style?: ViewStyle;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    title,
    merchant,
    distance,
    originalPrice,
    discountedPrice,
    rating,
    reviewCount,
    imageUrl,
    timeLeft,
    itemsLeft,
    isNew,
    isHot,
    onPress,
    onAddPress,
    variant = 'vertical',
    style,
}) => {
    const discount = Math.round((1 - discountedPrice / originalPrice) * 100);

    if (variant === 'horizontal') {
        return (
            <TouchableOpacity
                style={[styles.horizontalContainer, style]}
                onPress={onPress}
                activeOpacity={0.9}
            >
                <View style={styles.horizontalImageContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.horizontalImage} />
                    {isNew && (
                        <View style={styles.newBadge}>
                            <Text style={styles.badgeText}>NEW</Text>
                        </View>
                    )}
                    {isHot && (
                        <View style={styles.hotBadge}>
                            <Text style={styles.badgeText}>HOT</Text>
                        </View>
                    )}
                </View>
                <View style={styles.horizontalContent}>
                    <View style={styles.horizontalHeader}>
                        <Text style={styles.title} numberOfLines={1}>{title}</Text>
                        <View style={styles.distanceContainer}>
                            <MaterialIcons name="place" size={14} color={colors.textSecondary} />
                            <Text style={styles.distance}>{distance}</Text>
                        </View>
                    </View>
                    <Text style={styles.merchant}>{merchant}</Text>
                    {rating && (
                        <View style={styles.ratingContainer}>
                            <MaterialIcons name="star" size={14} color="#f59e0b" />
                            <Text style={styles.rating}>{rating}</Text>
                            {reviewCount && <Text style={styles.reviewCount}>({reviewCount})</Text>}
                        </View>
                    )}
                    <View style={styles.horizontalFooter}>
                        <View>
                            <Text style={styles.originalPrice}>${originalPrice.toFixed(2)}</Text>
                            <Text style={styles.discountedPrice}>${discountedPrice.toFixed(2)}</Text>
                        </View>
                        {onAddPress && (
                            <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
                                <Text style={styles.addButtonText}>Add</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={[styles.verticalContainer, style]}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.verticalImageContainer}>
                {timeLeft && (
                    <View style={styles.timeBadge}>
                        <MaterialIcons name="timer" size={12} color="#fff" />
                        <Text style={styles.timeText}>{timeLeft}</Text>
                    </View>
                )}
                <Image source={{ uri: imageUrl }} style={styles.verticalImage} />
            </View>
            <View style={styles.verticalContent}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.merchant}>{merchant} • {distance}</Text>
                <View style={styles.priceRow}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.discountedPriceLarge}>${discountedPrice.toFixed(2)}</Text>
                        <Text style={styles.originalPriceSmall}>${originalPrice.toFixed(2)}</Text>
                    </View>
                    {itemsLeft !== undefined && (
                        <View style={styles.itemsLeftBadge}>
                            <Text style={styles.itemsLeftText}>{itemsLeft} left</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // Horizontal variant
    horizontalContainer: {
        flexDirection: 'row',
        backgroundColor: colors.cardDark,
        borderRadius: borderRadius.xl,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderMuted,
    },
    horizontalImageContainer: {
        width: 100,
        aspectRatio: 16 / 9,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        position: 'relative',
    },
    horizontalImage: {
        width: '100%',
        height: '100%',
    },
    horizontalContent: {
        flex: 1,
        marginLeft: spacing.md,
        justifyContent: 'space-between',
    },
    horizontalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    horizontalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: spacing.sm,
    },

    // Vertical variant
    verticalContainer: {
        width: 256,
        backgroundColor: colors.cardDark,
        borderRadius: borderRadius.xl,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderMuted,
    },
    verticalImageContainer: {
        aspectRatio: 4 / 3,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        position: 'relative',
    },
    verticalImage: {
        width: '100%',
        height: '100%',
    },
    verticalContent: {
        marginTop: spacing.md,
        gap: spacing.xs,
    },

    // Badges
    timeBadge: {
        position: 'absolute',
        top: spacing.sm,
        left: spacing.sm,
        zIndex: 10,
        backgroundColor: colors.error,
        borderRadius: borderRadius.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    timeText: {
        color: '#fff',
        fontSize: fontSize.xs,
        fontWeight: '700',
    },
    newBadge: {
        position: 'absolute',
        top: spacing.sm,
        left: spacing.sm,
        zIndex: 10,
        backgroundColor: colors.primary,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    hotBadge: {
        position: 'absolute',
        top: spacing.sm,
        left: spacing.sm,
        zIndex: 10,
        backgroundColor: '#f59e0b',
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    badgeText: {
        color: colors.backgroundDark,
        fontSize: fontSize.xs,
        fontWeight: '700',
    },
    itemsLeftBadge: {
        backgroundColor: colors.surfaceHighlight,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    itemsLeftText: {
        color: colors.primary,
        fontSize: fontSize.sm,
        fontWeight: '700',
    },

    // Common
    title: {
        color: colors.textPrimary,
        fontSize: fontSize.md,
        fontWeight: '700',
    },
    merchant: {
        color: colors.textSecondary,
        fontSize: fontSize.sm,
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    distance: {
        color: colors.textSecondary,
        fontSize: fontSize.xs,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginTop: spacing.xs,
    },
    rating: {
        color: colors.textPrimary,
        fontSize: fontSize.sm,
        fontWeight: '700',
    },
    reviewCount: {
        color: colors.textSecondary,
        fontSize: fontSize.sm,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: spacing.sm,
    },
    originalPrice: {
        color: colors.textSecondary,
        fontSize: fontSize.xs,
        textDecorationLine: 'line-through',
    },
    originalPriceSmall: {
        color: colors.textSecondary,
        fontSize: fontSize.xs,
        textDecorationLine: 'line-through',
    },
    discountedPrice: {
        color: colors.primary,
        fontSize: fontSize.xl,
        fontWeight: '700',
    },
    discountedPriceLarge: {
        color: colors.primary,
        fontSize: fontSize.lg,
        fontWeight: '700',
    },
    addButton: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
    },
    addButtonText: {
        color: colors.backgroundDark,
        fontSize: fontSize.sm,
        fontWeight: '700',
    },
});
