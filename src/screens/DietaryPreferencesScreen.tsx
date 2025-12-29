import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const lifestyleOptions = [
    { id: 'vegetarian', label: 'Vegetarian', selected: true },
    { id: 'vegan', label: 'Vegan', selected: false },
    { id: 'pescatarian', label: 'Pescatarian', selected: false },
    { id: 'halal', label: 'Halal', selected: true },
    { id: 'kosher', label: 'Kosher', selected: false },
    { id: 'nopork', label: 'No Pork', selected: false },
];

const allergyOptions = [
    { id: 'gluten', label: 'Gluten-Free', selected: false },
    { id: 'peanut', label: 'Peanut-Free', selected: false },
    { id: 'dairy', label: 'Dairy-Free', selected: false },
    { id: 'soy', label: 'Soy-Free', selected: false },
    { id: 'shellfish', label: 'Shellfish-Free', selected: false },
    { id: 'egg', label: 'Egg-Free', selected: false },
    { id: 'treenut', label: 'Tree Nut-Free', selected: false },
];

interface DietaryPreferencesScreenProps {
    navigation: any;
}

export const DietaryPreferencesScreen: React.FC<DietaryPreferencesScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [searchQuery, setSearchQuery] = useState('');
    const [lifestyle, setLifestyle] = useState(lifestyleOptions);
    const [allergies, setAllergies] = useState(allergyOptions);

    const toggleLifestyle = (id: string) => {
        setLifestyle(lifestyle.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
    };

    const toggleAllergy = (id: string) => {
        setAllergies(allergies.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Dietary Preferences</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.subtitle}>
                        Select all that apply. We'll filter your food rescue feed based on these choices.
                    </Text>

                    {/* Search */}
                    <View style={styles.searchContainer}>
                        <MaterialIcons name="search" size={20} color={colors.textSecondary} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search allergies or diets"
                            placeholderTextColor={colors.placeholderGreen}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* Lifestyle & Religious */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Lifestyle & Religious</Text>
                        <View style={styles.chipsContainer}>
                            {lifestyle.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[styles.chip, item.selected && styles.chipSelected]}
                                    onPress={() => toggleLifestyle(item.id)}
                                >
                                    {item.selected && <MaterialIcons name="check" size={16} color={colors.backgroundDark} />}
                                    <Text style={[styles.chipText, item.selected && styles.chipTextSelected]}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Allergies & Intolerances */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Allergies & Intolerances</Text>
                        <View style={styles.chipsContainer}>
                            {allergies.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[styles.chip, item.selected && styles.chipSelected]}
                                    onPress={() => toggleAllergy(item.id)}
                                >
                                    {item.selected && <MaterialIcons name="check" size={16} color={colors.backgroundDark} />}
                                    <Text style={[styles.chipText, item.selected && styles.chipTextSelected]}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Disclaimer */}
                    <View style={styles.disclaimer}>
                        <View style={styles.disclaimerIcon}>
                            <MaterialIcons name="info" size={18} color={colors.primary} />
                        </View>
                        <Text style={styles.disclaimerText}>
                            We do our best to filter items, but please always double-check with the merchant or read the item description carefully, especially for severe allergies.
                        </Text>
                    </View>
                </ScrollView>

                {/* Save Button */}
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.saveButtonText}>Save Preferences</Text>
                    </TouchableOpacity>
                </View>
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
    scrollContent: { padding: spacing.lg, paddingBottom: 180 },
    subtitle: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 20, marginBottom: spacing.xl },
    searchContainer: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.inputDark, borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, height: 48, marginBottom: spacing.xl },
    searchInput: { flex: 1, fontSize: fontSize.md, color: colors.textPrimary },
    section: { marginBottom: spacing.xl },
    sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
    chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    chip: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.surfaceHighlight, backgroundColor: colors.surfaceDark },
    chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
    chipText: { fontSize: fontSize.sm, color: colors.textSecondary },
    chipTextSelected: { color: colors.backgroundDark, fontWeight: '600' },
    disclaimer: { flexDirection: 'row', gap: spacing.md, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg },
    disclaimerIcon: { width: 32, height: 32, borderRadius: borderRadius.full, backgroundColor: colors.primary + '22', alignItems: 'center', justifyContent: 'center' },
    disclaimerText: { flex: 1, fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 18 },
    bottomContainer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.surfaceHighlight },
    saveButton: { backgroundColor: colors.primary, borderRadius: borderRadius.lg, height: 56, alignItems: 'center', justifyContent: 'center' },
    saveButtonText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.backgroundDark },
});
