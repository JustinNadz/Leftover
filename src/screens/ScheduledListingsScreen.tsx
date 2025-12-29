import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const upcomingListings = [
    { id: '1', name: 'Chicken Adobo Meal', packs: '5 packs remaining', originalPrice: 150, price: 75, scheduleTime: 'Today, 5:30 PM', discount: 50, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT8SXBB5rGVZf0YS1H9mtcZwNxNJeGqHTLKlJKyAEnJ0pOANnXd7lWfEWYaZ5jt8j5h9BRMYbqELrwQZn7Fb2Zy3zWqXsQF0wkYz8YwKbP0lQpFVZKVNdKLn3j9wRc0D5q-Q8' },
    { id: '2', name: 'Assorted Pastry Box', packs: '2 boxes remaining', originalPrice: 200, price: 100, scheduleTime: 'Tom, 8:00 AM', discount: null, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj3eGhnRBsKJm-PLD1MDEM_2F8Vsg5vDLeIhbIdZ0ID2xt_TzDRqy5jWJkILIona4nuP4Dq-Zake9nz0Z4AQvCIUlEropdB1d8pYS4JyPLoewQsOzj8JwTn_oatnRQsGonQ19GpHzEEzrDUfTCTpdRk5pVVznPs64ppU2vk7h4u_YHpxlAnDMRu9na2zJS3yATqmIellczsNmNYPlp3qaXdsMo3tDwtL68einH_cjIKv-LK7rdkafSauFND4KntSrFS2wb-uWoqkcu' },
    { id: '3', name: 'Tuna Sandwich', packs: '8 pcs remaining', originalPrice: 90, price: 45, scheduleTime: 'Oct 26', discount: null, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkO4AmJmSk3__W3AklVco8zMmftp7mTgRbX8-NX6hG8Nk2LdAEdU0PdncW49rM35WKdg_d5XVbp-SfCH5E345KeukkX10IGksht997JyWFdsZG_oBjqOaxQThlUhnOM4L1V9GAuw3Dh1d36ADDkHfRuTbczQoMkIDcdfiC6mzY4dhAxAPbC8NO2bTyb_O7GbRdq1mATdtmzYcqr-bl_EufOKzL4fojD3-fDWg67xewuHA0EwWzX8BjnsZR2kAoTjBfwE5qXfAx8bpr' },
];

interface ScheduledListingsScreenProps {
    navigation: any;
}

export const ScheduledListingsScreen: React.FC<ScheduledListingsScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('listings');
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedHour, setSelectedHour] = useState('5');
    const [selectedMinute, setSelectedMinute] = useState('30');
    const [selectedPeriod, setSelectedPeriod] = useState('PM');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Scheduled Listings</Text>
                    <TouchableOpacity style={styles.addBtn}>
                        <MaterialIcons name="add" size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Schedule New Listing */}
                    <View style={styles.scheduleCard}>
                        <View style={styles.scheduleHeader}>
                            <MaterialIcons name="schedule" size={20} color={colors.primary} />
                            <Text style={styles.scheduleTitle}>Schedule New Listing</Text>
                        </View>

                        <Text style={styles.inputLabel}>SURPLUS ITEM</Text>
                        <TouchableOpacity style={styles.selectInput}>
                            <Text style={selectedItem ? styles.selectText : styles.placeholderText}>
                                {selectedItem || 'Select food item...'}
                            </Text>
                            <MaterialIcons name="expand-more" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>

                        <Text style={styles.inputLabel}>GO-LIVE TIME</Text>
                        <View style={styles.timePickerRow}>
                            <TouchableOpacity style={[styles.timePicker, styles.timePickerActive]}>
                                <Text style={styles.timePickerTextActive}>Today</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.timePicker}>
                                <Text style={styles.timePickerText}>{selectedHour}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.timePicker}>
                                <Text style={styles.timePickerText}>{selectedMinute}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.timePicker, styles.timePickerActive]}>
                                <Text style={styles.timePickerTextActive}>{selectedPeriod}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.scheduleBtn}>
                            <MaterialIcons name="schedule" size={18} color={colors.backgroundDark} />
                            <Text style={styles.scheduleBtnText}>Schedule Publication</Text>
                        </TouchableOpacity>
                    </View>

                    {/* View Toggle */}
                    <View style={styles.viewToggle}>
                        <TouchableOpacity
                            style={[styles.viewToggleBtn, viewMode === 'list' && styles.viewToggleBtnActive]}
                            onPress={() => setViewMode('list')}
                        >
                            <MaterialIcons name="view-list" size={18} color={viewMode === 'list' ? colors.backgroundDark : colors.textSecondary} />
                            <Text style={[styles.viewToggleText, viewMode === 'list' && styles.viewToggleTextActive]}>List View</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.viewToggleBtn, viewMode === 'calendar' && styles.viewToggleBtnActive]}
                            onPress={() => setViewMode('calendar')}
                        >
                            <MaterialIcons name="calendar-today" size={18} color={viewMode === 'calendar' ? colors.backgroundDark : colors.textSecondary} />
                            <Text style={[styles.viewToggleText, viewMode === 'calendar' && styles.viewToggleTextActive]}>Calendar</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Upcoming Listings */}
                    <Text style={styles.sectionTitle}>UPCOMING</Text>
                    {upcomingListings.map((item) => (
                        <View key={item.id} style={styles.listingCard}>
                            {item.discount && (
                                <View style={styles.discountBadge}>
                                    <Text style={styles.discountText}>-{item.discount}%</Text>
                                </View>
                            )}
                            <Image source={{ uri: item.imageUrl }} style={styles.listingImage} />
                            <View style={styles.listingInfo}>
                                <Text style={styles.listingName}>{item.name}</Text>
                                <Text style={styles.listingPacks}>{item.packs}</Text>
                                <View style={styles.priceRow}>
                                    <Text style={styles.originalPrice}>₱{item.originalPrice}.00</Text>
                                    <Text style={styles.discountPrice}>₱{item.price}.00</Text>
                                </View>
                            </View>
                            <View style={styles.scheduleInfo}>
                                <MaterialIcons name="schedule" size={14} color={colors.primary} />
                                <Text style={styles.scheduleTime}>{item.scheduleTime}</Text>
                            </View>
                            <TouchableOpacity>
                                <MaterialIcons name="more-vert" size={20} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'home') navigation.navigate('MerchantDashboard');
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
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.surfaceHighlight },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    addBtn: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    scheduleCard: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.xl, padding: spacing.lg, marginBottom: spacing.lg },
    scheduleHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.lg },
    scheduleTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    inputLabel: { fontSize: fontSize.xs, fontWeight: '600', color: colors.textSecondary, marginBottom: spacing.sm },
    selectInput: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.inputDark, borderRadius: borderRadius.md, height: 48, paddingHorizontal: spacing.lg, marginBottom: spacing.lg },
    selectText: { fontSize: fontSize.md, color: colors.textPrimary },
    placeholderText: { fontSize: fontSize.md, color: colors.placeholderGreen },
    timePickerRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
    timePicker: { flex: 1, height: 44, backgroundColor: colors.inputDark, borderRadius: borderRadius.md, alignItems: 'center', justifyContent: 'center' },
    timePickerActive: { backgroundColor: colors.primary },
    timePickerText: { fontSize: fontSize.md, fontWeight: '500', color: colors.textPrimary },
    timePickerTextActive: { fontSize: fontSize.md, fontWeight: '600', color: colors.backgroundDark },
    scheduleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.primary, borderRadius: borderRadius.lg, height: 48 },
    scheduleBtnText: { fontSize: fontSize.md, fontWeight: '600', color: colors.backgroundDark },
    viewToggle: { flexDirection: 'row', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.xs, marginBottom: spacing.xl },
    viewToggleBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, height: 40, borderRadius: borderRadius.md },
    viewToggleBtnActive: { backgroundColor: colors.primary },
    viewToggleText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary },
    viewToggleTextActive: { color: colors.backgroundDark },
    sectionTitle: { fontSize: fontSize.xs, fontWeight: '600', color: colors.textSecondary, marginBottom: spacing.md },
    listingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.sm, position: 'relative' },
    discountBadge: { position: 'absolute', top: spacing.sm, left: spacing.sm, backgroundColor: '#ef4444', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm, zIndex: 1 },
    discountText: { fontSize: 10, fontWeight: '700', color: '#fff' },
    listingImage: { width: 60, height: 60, borderRadius: borderRadius.md },
    listingInfo: { flex: 1, marginLeft: spacing.md },
    listingName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    listingPacks: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    priceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xs },
    originalPrice: { fontSize: fontSize.sm, color: colors.textSecondary, textDecorationLine: 'line-through' },
    discountPrice: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary },
    scheduleInfo: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primary + '22', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm, marginRight: spacing.sm },
    scheduleTime: { fontSize: fontSize.xs, color: colors.primary },
});
