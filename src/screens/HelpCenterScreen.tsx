import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const popularTopics = ['Payout Status', 'Cancel Order', 'Update Menu', 'Store Hours'];

interface FAQSection {
    id: string;
    title: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    questions: { id: string; question: string; answer: string }[];
}

const faqSections: FAQSection[] = [
    {
        id: 'listings',
        title: 'Managing Listings',
        icon: 'restaurant-menu',
        questions: [
            {
                id: '1',
                question: 'How do I update my surplus inventory?',
                answer: 'Go to your Dashboard, tap on Listings, and select the item you want to update. You can modify quantity, price, and availability times.',
            },
            {
                id: '2',
                question: 'Can I change pickup times?',
                answer: 'Yes! In your listing settings, you can adjust pickup windows. Changes will apply to future orders only.',
            },
        ],
    },
    {
        id: 'payouts',
        title: 'Orders & Payouts',
        icon: 'payments',
        questions: [
            {
                id: '3',
                question: 'When will I receive my payout?',
                answer: 'Payouts are processed every Monday and Thursday. Funds typically arrive within 1-2 business days.',
            },
            {
                id: '4',
                question: 'How to handle a customer no-show?',
                answer: 'If a customer doesn\'t pick up within the window, mark the order as "No Show" in your dashboard. You\'ll still receive payment.',
            },
        ],
    },
    {
        id: 'account',
        title: 'Account Settings',
        icon: 'settings',
        questions: [
            {
                id: '5',
                question: 'How do I change my store address?',
                answer: 'Go to Profile > Store Settings > Location. Update your address and save. Changes may require verification.',
            },
        ],
    },
];

interface HelpCenterScreenProps {
    navigation: any;
}

export const HelpCenterScreen: React.FC<HelpCenterScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('support');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

    const toggleQuestion = (questionId: string) => {
        setExpandedQuestions((prev) =>
            prev.includes(questionId)
                ? prev.filter((id) => id !== questionId)
                : [...prev, questionId]
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Help Center</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SupportChat')}>
                        <Text style={styles.chatLink}>Chat</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <MaterialIcons name="search" size={20} color={colors.textSecondary} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search issues (e.g. payouts, no-show...)"
                            placeholderTextColor={colors.placeholderGreen}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* Popular Topics */}
                    <View style={styles.topicsSection}>
                        <Text style={styles.topicsLabel}>POPULAR TOPICS</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.topicsContainer}
                        >
                            {popularTopics.map((topic, index) => (
                                <TouchableOpacity key={index} style={styles.topicChip}>
                                    <Text style={styles.topicText}>{topic}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* FAQ Sections */}
                    {faqSections.map((section) => (
                        <View key={section.id} style={styles.faqSection}>
                            <View style={styles.sectionHeader}>
                                <MaterialIcons name={section.icon} size={20} color={colors.primary} />
                                <Text style={styles.sectionTitle}>{section.title}</Text>
                            </View>

                            {section.questions.map((q) => (
                                <TouchableOpacity
                                    key={q.id}
                                    style={styles.questionCard}
                                    onPress={() => toggleQuestion(q.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.questionHeader}>
                                        <Text style={styles.questionText}>{q.question}</Text>
                                        <MaterialIcons
                                            name={expandedQuestions.includes(q.id) ? 'expand-less' : 'expand-more'}
                                            size={24}
                                            color={colors.textSecondary}
                                        />
                                    </View>
                                    {expandedQuestions.includes(q.id) && (
                                        <Text style={styles.answerText}>{q.answer}</Text>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}

                    {/* Still Need Help */}
                    <View style={styles.needHelpCard}>
                        <View style={styles.chatIconContainer}>
                            <MaterialIcons name="headset-mic" size={32} color={colors.primary} />
                        </View>
                        <Text style={styles.needHelpTitle}>Still need help?</Text>
                        <Text style={styles.needHelpText}>
                            Our support team is available daily from 9 AM to 9 PM PHT.
                        </Text>
                        <TouchableOpacity
                            style={styles.startChatButton}
                            onPress={() => navigation.navigate('SupportChat')}
                        >
                            <Text style={styles.startChatText}>Start a Chat</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>

            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'dashboard') navigation.navigate('MerchantDashboard');
                    if (tab === 'listings') navigation.navigate('PostListing');
                    if (tab === 'profile') navigation.navigate('Profile');
                }}
                type="merchant"
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
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    headerTitle: {
        fontSize: fontSize.lg,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    chatLink: {
        fontSize: fontSize.md,
        fontWeight: '600',
        color: colors.primary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.lg,
        paddingBottom: 120,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.lg,
        height: 48,
        marginBottom: spacing.xl,
    },
    searchInput: {
        flex: 1,
        color: colors.textPrimary,
        fontSize: fontSize.sm,
        marginLeft: spacing.sm,
    },
    topicsSection: {
        marginBottom: spacing.xl,
    },
    topicsLabel: {
        fontSize: fontSize.xs,
        fontWeight: '600',
        color: colors.textSecondary,
        letterSpacing: 1,
        marginBottom: spacing.md,
    },
    topicsContainer: {
        gap: spacing.sm,
    },
    topicChip: {
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderWidth: 1,
        borderColor: colors.borderDark,
        marginRight: spacing.sm,
    },
    topicText: {
        fontSize: fontSize.sm,
        color: colors.textPrimary,
        fontWeight: '500',
    },
    faqSection: {
        marginBottom: spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    questionCard: {
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    questionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    questionText: {
        flex: 1,
        fontSize: fontSize.md,
        color: colors.textPrimary,
        fontWeight: '500',
        marginRight: spacing.md,
    },
    answerText: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
        lineHeight: 22,
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    needHelpCard: {
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        alignItems: 'center',
        marginTop: spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    chatIconContainer: {
        width: 64,
        height: 64,
        borderRadius: borderRadius.full,
        backgroundColor: 'rgba(19, 236, 109, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.lg,
    },
    needHelpTitle: {
        fontSize: fontSize.lg,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    needHelpText: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    startChatButton: {
        width: '100%',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.md,
        alignItems: 'center',
    },
    startChatText: {
        fontSize: fontSize.md,
        fontWeight: '600',
        color: colors.primary,
    },
});
