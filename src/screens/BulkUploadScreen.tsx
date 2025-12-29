import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const steps = ['Upload', 'Preview', 'Submit'];

const parsedItems = [
    { id: '1', name: 'Chicken Adobo Meal', originalPrice: 150, price: 75, status: 'valid', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT8SXBB5rGVZf0YS1H9mtcZwNxNJeGqHTLKlJKyAEnJ0pOANnXd7lWfEWYaZ5jt8j5h9BRMYbqELrwQZn7Fb2Zy3zWqXsQF0wkYz8YwKbP0lQpFVZKVNdKLn3j9wRc0D5q-Q8' },
    { id: '2', name: 'Pork Sinigang', originalPrice: 200, price: null, status: 'error', error: 'Missing Price', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj3eGhnRBsKJm-PLD1MDEM_2F8Vsg5vDLeIhbIdZ0ID2xt_TzDRqy5jWJkILIona4nuP4Dq-Zake9nz0Z4AQvCIUlEropdB1d8pYS4JyPLoewQsOzj8JwTn_oatnRQsGonQ19GpHzEEzrDUfTCTpdRk5pVVznPs64ppU2vk7h4u_YHpxlAnDMRu9na2zJS3yATqmIellczsNmNYPlp3qaXdsMo3tDwtL68einH_cjIKv-LK7rdkafSauFND4KntSrFS2wb-uWoqkcu' },
    { id: '3', name: 'Veggie Stir Fry', originalPrice: 120, price: 60, status: 'valid', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkO4AmJmSk3__W3AklVco8zMmftp7mTgRbX8-NX6hG8Nk2LdAEdU0PdncW49rM35WKdg_d5XVbp-SfCH5E345KeukkX10IGksht997JyWFdsZG_oBjqOaxQThlUhnOM4L1V9GAuw3Dh1d36ADDkHfRuTbczQoMkIDcdfiC6mzY4dhAxAPbC8NO2bTyb_O7GbRdq1mATdtmzYcqr-bl_EufOKzL4fojD3-fDWg67xewuHA0EwWzX8BjnsZR2kAoTjBfwE5qXfAx8bpr' },
];

interface BulkUploadScreenProps {
    navigation: any;
}

export const BulkUploadScreen: React.FC<BulkUploadScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('listings');
    const [currentStep, setCurrentStep] = useState(1);
    const itemsFound = parsedItems.length;
    const totalValue = parsedItems.reduce((sum, item) => sum + (item.price || 0), 0);
    const errorCount = parsedItems.filter(i => i.status === 'error').length;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Bulk Upload</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Progress Steps */}
                <View style={styles.stepsRow}>
                    {steps.map((step, idx) => (
                        <React.Fragment key={step}>
                            <View style={styles.stepItem}>
                                <View style={[styles.stepCircle, currentStep > idx && styles.stepCircleActive]}>
                                    <Text style={[styles.stepNumber, currentStep > idx && styles.stepNumberActive]}>{idx + 1}</Text>
                                </View>
                                <Text style={[styles.stepLabel, currentStep > idx && styles.stepLabelActive]}>{step}</Text>
                            </View>
                            {idx < steps.length - 1 && <View style={[styles.stepLine, currentStep > idx + 1 && styles.stepLineActive]} />}
                        </React.Fragment>
                    ))}
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.sectionTitle}>Upload Inventory File</Text>
                    <Text style={styles.sectionSubtitle}>
                        Import your daily surplus list. Use the official LeftUber template to ensure data is parsed correctly.
                    </Text>

                    {/* CSV Template */}
                    <View style={styles.templateCard}>
                        <View style={styles.templateLeft}>
                            <MaterialIcons name="description" size={24} color={colors.primary} />
                            <View>
                                <Text style={styles.templateTitle}>CSV Template</Text>
                                <Text style={styles.templateSubtitle}>Required format for bulk uploads.</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.downloadBtn}>
                            <Text style={styles.downloadText}>Download</Text>
                            <MaterialIcons name="file-download" size={16} color={colors.primary} />
                        </TouchableOpacity>
                    </View>

                    {/* Upload Area */}
                    <TouchableOpacity style={styles.uploadArea}>
                        <MaterialIcons name="cloud-upload" size={48} color={colors.primary} />
                        <Text style={styles.uploadTitle}>Tap to browse</Text>
                        <Text style={styles.uploadSubtitle}>or drag file here (CSV, XLSX)</Text>
                    </TouchableOpacity>

                    {/* Preview Draft */}
                    <Text style={styles.previewLabel}>PREVIEW DRAFT</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Items Found</Text>
                            <Text style={styles.statValue}>{itemsFound}</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Total Value</Text>
                            <Text style={styles.statValueGreen}>₱ {totalValue.toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Parsed Items */}
                    <View style={styles.parsedHeader}>
                        <Text style={styles.parsedTitle}>Parsed Items</Text>
                        {errorCount > 0 && (
                            <View style={styles.errorBadge}>
                                <MaterialIcons name="warning" size={12} color="#ef4444" />
                                <Text style={styles.errorBadgeText}>{errorCount} Error</Text>
                            </View>
                        )}
                    </View>
                    {parsedItems.map((item) => (
                        <View key={item.id} style={styles.itemCard}>
                            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <View style={styles.priceRow}>
                                    <Text style={styles.originalPrice}>₱{item.originalPrice}</Text>
                                    {item.price ? (
                                        <Text style={styles.discountPrice}>₱ {item.price}.00</Text>
                                    ) : (
                                        <Text style={styles.missingPrice}>{item.error}</Text>
                                    )}
                                </View>
                            </View>
                            {item.status === 'valid' ? (
                                <MaterialIcons name="check-circle" size={20} color={colors.primary} />
                            ) : (
                                <TouchableOpacity style={styles.fixBtn}>
                                    <Text style={styles.fixBtnText}>Fix</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </ScrollView>

                {/* Process Button */}
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.processBtn}>
                        <Text style={styles.processBtnText}>Process File</Text>
                        <MaterialIcons name="arrow-forward" size={20} color={colors.backgroundDark} />
                    </TouchableOpacity>
                </View>
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
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    stepsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
    stepItem: { alignItems: 'center' },
    stepCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.surfaceDark, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.surfaceHighlight },
    stepCircleActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    stepNumber: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textSecondary },
    stepNumberActive: { color: colors.backgroundDark },
    stepLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: spacing.xs },
    stepLabelActive: { color: colors.primary },
    stepLine: { flex: 1, height: 2, backgroundColor: colors.surfaceHighlight, marginHorizontal: spacing.sm },
    stepLineActive: { backgroundColor: colors.primary },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 180 },
    sectionTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.sm },
    sectionSubtitle: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 20, marginBottom: spacing.lg },
    templateCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.lg },
    templateLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    templateTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    templateSubtitle: { fontSize: fontSize.xs, color: colors.textSecondary },
    downloadBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, borderWidth: 1, borderColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
    downloadText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
    uploadArea: { alignItems: 'center', justifyContent: 'center', height: 150, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, borderWidth: 2, borderColor: colors.primary + '44', borderStyle: 'dashed', marginBottom: spacing.xl },
    uploadTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary, marginTop: spacing.md },
    uploadSubtitle: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: spacing.xs },
    previewLabel: { fontSize: fontSize.xs, fontWeight: '600', color: colors.textSecondary, marginBottom: spacing.md },
    statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
    statBox: { flex: 1, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, alignItems: 'center' },
    statLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginBottom: spacing.sm },
    statValue: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary },
    statValueGreen: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.primary },
    parsedHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
    parsedTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    errorBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    errorBadgeText: { fontSize: fontSize.xs, color: '#ef4444' },
    itemCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.sm },
    itemImage: { width: 50, height: 50, borderRadius: borderRadius.md },
    itemInfo: { flex: 1, marginLeft: spacing.md },
    itemName: { fontSize: fontSize.md, fontWeight: '500', color: colors.textPrimary },
    priceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xs },
    originalPrice: { fontSize: fontSize.sm, color: colors.textSecondary, textDecorationLine: 'line-through' },
    discountPrice: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
    missingPrice: { fontSize: fontSize.sm, color: '#ef4444' },
    fixBtn: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, backgroundColor: '#fbbf24', borderRadius: borderRadius.sm },
    fixBtnText: { fontSize: fontSize.xs, fontWeight: '600', color: colors.backgroundDark },
    bottomContainer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.surfaceHighlight },
    processBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.primary, borderRadius: borderRadius.lg, height: 56 },
    processBtnText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.backgroundDark },
});
