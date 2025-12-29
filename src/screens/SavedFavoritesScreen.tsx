import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const favoriteItems = [
    { id: '1', name: 'Chicken Adobo Meal', merchant: 'LeftUber Eats • 1.2km away', price: 89, originalPrice: 150, discount: 40, isSoldOut: false, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT8SXBB5rGVZf0YS1H9mtcZwNxNJeGqHTLKlJKyAEnJ0pOANnXd7lWfEWYaZ5jt8j5h9BRMYbqELrwQZn7Fb2Zy3zWqXsQF0wkYz8YwKbP0lQpFVZKVNdKLn3j9wRc0D5q-Q8' },
    { id: '2', name: 'Tuna Pesto Pasta', merchant: 'Mama Lou\'s • 2.0km away', price: 120, originalPrice: 250, discount: 52, isSoldOut: false, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkO4AmJmSk3__W3AklVco8zMmftp7mTgRbX8-NX6hG8Nk2LdAEdU0PdncW49rM35WKdg_d5XVbp-SfCH5E345KeukkX10IGksht997JyWFdsZG_oBjqOaxQThlUhnOM4L1V9GAuw3Dh1d36ADDkHfRuTbczQoMkIDcdfiC6mzY4dhAxAPbC8NO2bTyb_O7GbRdq1mATdtmzYcqr-bl_EufOKzL4fojD3-fDWg67xewuHA0EwWzX8BjnsZR2kAoTjBfwE5qXfAx8bpr' },
    { id: '3', name: 'Assorted Pastries Box', merchant: 'Pan de Manila • 3.5km away', price: 199, originalPrice: 400, discount: null, isSoldOut: true, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR-hBuMZnzy-zf7wEqgphKw8NTVfN5DgDoE99hdOrIoHmbupwEzOzrHMpRmM-jqG3ZXHryWXyniipk0294ybhVILc2kGLKu-todN5Bi_JboIBZ8aNgWloTQvdt2WKl84qb8SVLeoF_64_Oc2gtY73mXpw91bBlR4mlAMU6PvEGHFX1a_DZQa0vJ5ouigYMMXqMPAYI88zaEXot6xUjq8JvpEZjeHH4Ipa3S7s5CcQ9Qc6y_4JwIBrjTE5j5oLA5ap1qpNKqK4J4pVk' },
    { id: '4', name: 'Pepperoni Pizza Slice', merchant: 'Yellow Cab • 0.8km away', price: 84, originalPrice: 120, discount: 30, isSoldOut: false, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeEKWS2w8xaVGNiRxfAwxKJ3PNpGRvcmPBa74CJRFHKqRsNFdEd8HBvIk2fPOl5yMxsaXRNNYQtQB8nBZCWFZWcq5yN2MLKJwWgQ0KlKIyLwvVKYlsAZ8CJQxTKM0pJv8q3v8' },
];

interface SavedFavoritesScreenProps {
    navigation: any;
}

export const SavedFavoritesScreen: React.FC<SavedFavoritesScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('favorites');
    const [selectedTab, setSelectedTab] = useState<'Items' | 'Merchants'>('Items');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Saved Favorites</Text>
                    <TouchableOpacity>
                        <Text style={styles.editBtn}>Edit</Text>
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    {(['Items', 'Merchants'] as const).map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, selectedTab === tab && styles.tabActive]}
                            onPress={() => setSelectedTab(tab)}
                        >
                            <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {favoriteItems.map((item) => (
                        <View key={item.id} style={styles.itemCard}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                                {item.discount && (
                                    <View style={styles.discountBadge}>
                                        <Text style={styles.discountText}>-{item.discount}%</Text>
                                    </View>
                                )}
                                {item.isSoldOut && (
                                    <View style={styles.soldOutOverlay}>
                                        <Text style={styles.soldOutText}>Sold Out</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.itemContent}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <TouchableOpacity>
                                        <MaterialIcons name="favorite" size={20} color={colors.primary} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.itemMerchant}>{item.merchant}</Text>
                                <View style={styles.itemFooter}>
                                    <View>
                                        <Text style={styles.originalPrice}>₱{item.originalPrice}</Text>
                                        <Text style={styles.currentPrice}>₱{item.price}</Text>
                                    </View>
                                    <TouchableOpacity style={item.isSoldOut ? styles.viewBtn : styles.addBtn}>
                                        <Text style={item.isSoldOut ? styles.viewBtnText : styles.addBtnText}>
                                            {item.isSoldOut ? 'View' : 'Add'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
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
    headerTitle: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary },
    editBtn: { fontSize: fontSize.md, fontWeight: '600', color: colors.primary },
    tabContainer: { flexDirection: 'row', marginHorizontal: spacing.lg, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.xs },
    tab: { flex: 1, paddingVertical: spacing.md, alignItems: 'center', borderRadius: borderRadius.md },
    tabActive: { backgroundColor: colors.surfaceHighlight },
    tabText: { fontSize: fontSize.md, fontWeight: '500', color: colors.textSecondary },
    tabTextActive: { color: colors.textPrimary, fontWeight: '600' },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    itemCard: { flexDirection: 'row', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.xl, overflow: 'hidden', marginBottom: spacing.md },
    imageContainer: { position: 'relative' },
    itemImage: { width: 100, height: 100 },
    discountBadge: { position: 'absolute', top: spacing.sm, left: spacing.sm, backgroundColor: colors.error, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
    discountText: { fontSize: 10, fontWeight: '700', color: '#fff' },
    soldOutOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center' },
    soldOutText: { fontSize: fontSize.sm, fontWeight: '600', color: '#fff' },
    itemContent: { flex: 1, padding: spacing.md },
    itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    itemName: { flex: 1, fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    itemMerchant: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' },
    originalPrice: { fontSize: fontSize.sm, color: colors.textSecondary, textDecorationLine: 'line-through' },
    currentPrice: { fontSize: fontSize.lg, fontWeight: '700', color: colors.primary },
    addBtn: { backgroundColor: colors.primary, paddingHorizontal: spacing.xl, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
    addBtnText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.backgroundDark },
    viewBtn: { backgroundColor: colors.surfaceHighlight, paddingHorizontal: spacing.xl, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
    viewBtnText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textPrimary },
});
