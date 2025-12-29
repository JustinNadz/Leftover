import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const filterTabs = ['All topics', 'Ordering', 'Payments'];

const faqItems = [
    { id: '1', question: 'How do I show proof of purchase?', answer: null },
    { id: '2', question: 'Do you accept GCash or Maya?', answer: 'Yes! We support major PH e-wallets including GCash and Maya, as well as credit/debit cards. You can manage your payment methods in your Profile under "Payment Options".' },
    { id: '3', question: 'What if the merchant is closed?', answer: null },
    { id: '4', question: 'How long is the food good for?', answer: null },
    { id: '5', question: 'When will I get my refund?', answer: null },
];

interface HelpCenterScreenProps {
    navigation: any;
}

export const HelpCenterScreen: React.FC<HelpCenterScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [selectedFilter, setSelectedFilter] = useState('All topics');
    const [expandedId, setExpandedId] = useState<string | null>('2');
    const [searchQuery, setSearchQuery] = useState('');

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Help Center</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Title */}
                    <Text style={styles.title}>How can we</Text>
                    <Text style={styles.titleGreen}>help you?</Text>

                    {/* Search */}
                    <View style={styles.searchContainer}>
                        <MaterialIcons name="search" size={20} color={colors.textSecondary} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search topics (e.g. 'refunds')"
                            placeholderTextColor={colors.placeholderGreen}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* Filter Tabs */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterTabs}>
                        {filterTabs.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.filterTab, selectedFilter === tab && styles.filterTabActive]}
                                onPress={() => setSelectedFilter(tab)}
                            >
                                <Text style={[styles.filterText, selectedFilter === tab && styles.filterTextActive]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* FAQ Section */}
                    <View style={styles.faqHeader}>
                        <MaterialIcons name="help" size={20} color={colors.primary} />
                        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
                    </View>

                    {faqItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.faqItem}
                            onPress={() => toggleExpand(item.id)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.faqQuestion}>
                                <Text style={styles.faqQuestionText}>{item.question}</Text>
                                <MaterialIcons
                                    name={expandedId === item.id ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                    size={24}
                                    color={colors.textSecondary}
                                />
                            </View>
                            {expandedId === item.id && item.answer && (
                                <Text style={styles.faqAnswer}>{item.answer}</Text>
                            )}
                        </TouchableOpacity>
                    ))}

                    {/* Still Stuck Card */}
                    <View style={styles.stuckCard}>
                        <View style={styles.chatIconContainer}>
                            <MaterialIcons name="chat-bubble" size={32} color={colors.primary} />
                        </View>
                        <Text style={styles.stuckTitle}>Still stuck?</Text>
                        <Text style={styles.stuckSubtitle}>
                            Our PH support team is available 24/7 to help you resolve any issues.
                        </Text>
                        <TouchableOpacity style={styles.chatBtn} onPress={() => navigation.navigate('SupportBot')}>
                            <MaterialIcons name="chat" size={18} color={colors.backgroundDark} />
                            <Text style={styles.chatBtnText}>Chat with Support</Text>
                        </TouchableOpacity>
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
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    title: { fontSize: 28, fontWeight: '700', color: colors.textPrimary },
    titleGreen: { fontSize: 28, fontWeight: '700', color: colors.primary, marginBottom: spacing.xl },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, height: 48, marginBottom: spacing.lg },
    searchInput: { flex: 1, marginLeft: spacing.md, fontSize: fontSize.md, color: colors.textPrimary },
    filterTabs: { gap: spacing.sm, marginBottom: spacing.xl },
    filterTab: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full, backgroundColor: colors.surfaceDark },
    filterTabActive: { backgroundColor: colors.primary },
    filterText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary },
    filterTextActive: { color: colors.backgroundDark },
    faqHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.lg },
    faqTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    faqItem: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, marginBottom: spacing.sm, overflow: 'hidden' },
    faqQuestion: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.lg },
    faqQuestionText: { fontSize: fontSize.md, color: colors.textPrimary, flex: 1 },
    faqAnswer: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 20, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
    stuckCard: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.xl, padding: spacing.xl, alignItems: 'center', marginTop: spacing.xl },
    chatIconContainer: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.primary + '22', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },
    stuckTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.sm },
    stuckSubtitle: { fontSize: fontSize.sm, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.lg, lineHeight: 20 },
    chatBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.primary, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: borderRadius.lg },
    chatBtnText: { fontSize: fontSize.md, fontWeight: '600', color: colors.backgroundDark },
});
