import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const suggestedTopics = ['Order Issue', 'Listing Update', 'Payouts'];
const quickActions = ['Report Issue', 'Attach Order', 'Listing Detail'];

const messages = [
    { id: '1', type: 'system', text: 'Today, 10:23 AM' },
    { id: '2', type: 'bot', sender: 'Support Bot', text: "Hi! I'm the LeftUber automated assistant. Please select a topic or type your question below.", avatar: '🤖' },
    { id: '3', type: 'user', text: 'I have an issue with Order #PH-9921.' },
    { id: '4', type: 'order', orderId: '#PH-9921', items: '5x Rice Meals', price: '₱450.00', status: 'Pending Pickup' },
    { id: '5', type: 'agent', sender: 'Jay (Support)', time: 'Just now', text: 'I see that order. Is the issue regarding:' },
];

interface SupportBotScreenProps {
    navigation: any;
}

export const SupportBotScreen: React.FC<SupportBotScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('chat');
    const [message, setMessage] = useState('');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>LeftUber Support</Text>
                        <View style={styles.onlineRow}>
                            <View style={styles.onlineDot} />
                            <Text style={styles.onlineText}>Agent Online</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.faqLink}>FAQs</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
                    {messages.map((msg) => {
                        if (msg.type === 'system') {
                            return (
                                <View key={msg.id} style={styles.systemMessage}>
                                    <Text style={styles.systemText}>{msg.text}</Text>
                                </View>
                            );
                        }
                        if (msg.type === 'bot') {
                            return (
                                <View key={msg.id} style={styles.botMessage}>
                                    <Text style={styles.senderLabel}>{msg.sender}</Text>
                                    <View style={styles.botBubbleRow}>
                                        <View style={styles.botAvatar}>
                                            <Text style={styles.botAvatarText}>{msg.avatar}</Text>
                                        </View>
                                        <View style={styles.botBubble}>
                                            <Text style={styles.botText}>{msg.text}</Text>
                                        </View>
                                    </View>
                                    {/* Suggested Topics */}
                                    <View style={styles.suggestedContainer}>
                                        <Text style={styles.suggestedLabel}>Suggested Topics</Text>
                                        <View style={styles.suggestedRow}>
                                            {suggestedTopics.map((topic, idx) => (
                                                <TouchableOpacity key={idx} style={styles.topicChip}>
                                                    <Text style={styles.topicText}>{topic}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            );
                        }
                        if (msg.type === 'user') {
                            return (
                                <View key={msg.id} style={styles.userMessage}>
                                    <Text style={styles.youLabel}>You</Text>
                                    <View style={styles.userBubbleRow}>
                                        <View style={styles.userBubble}>
                                            <Text style={styles.userText}>{msg.text}</Text>
                                        </View>
                                        <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHMLxUXi0vOvWtx60JlhXNsWI-9QjydJS8l8yXmMoe96cuJBb0Hn0JF4W-To09wL0pxZiZGnAZrpX00wvJ2yLATIyj_lU7sY1msrYBqoE0fBppCHFYw727SxgOOQaTxaLBjpgaM5gXid5yi904FGU4_33FnGxjfjNIlIYWuFg77jZwSUceQxBOi02s9BVTJzzU27CMb1TytFGTgTuqZ5MnaGVjeLpOg6FAMhB04bnwtWL5JHgzLC-q52wZ8sCcTmBRmkdaiybqQZcQ' }} style={styles.userAvatar} />
                                    </View>
                                </View>
                            );
                        }
                        if (msg.type === 'order') {
                            return (
                                <View key={msg.id} style={styles.orderCard}>
                                    <Text style={styles.attachedLabel}>Attached Order</Text>
                                    <View style={styles.orderContent}>
                                        <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT8SXBB5rGVZf0YS1H9mtcZwNxNJeGqHTLKlJKyAEnJ0pOANnXd7lWfEWYaZ5jt8j5h9BRMYbqELrwQZn7Fb2Zy3zWqXsQF0wkYz8YwKbP0lQpFVZKVNdKLn3j9wRc0D5q-Q8' }} style={styles.orderImage} />
                                        <View style={styles.orderDetails}>
                                            <Text style={styles.orderId}>Order {msg.orderId}</Text>
                                            <Text style={styles.orderItems}>{msg.items} • {msg.price}</Text>
                                            <Text style={styles.orderStatus}>{msg.status}</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.viewDetails}>View Details →</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            );
                        }
                        if (msg.type === 'agent') {
                            return (
                                <View key={msg.id} style={styles.agentMessage}>
                                    <Text style={styles.agentSender}>{msg.sender} • {msg.time}</Text>
                                    <View style={styles.agentBubble}>
                                        <Text style={styles.agentText}>{msg.text}</Text>
                                    </View>
                                </View>
                            );
                        }
                        return null;
                    })}
                </ScrollView>

                {/* Quick Actions */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActions}>
                    {quickActions.map((action, idx) => (
                        <TouchableOpacity key={idx} style={styles.quickActionBtn}>
                            <MaterialIcons name={idx === 0 ? 'flag' : idx === 1 ? 'attach-file' : 'list-alt'} size={16} color={colors.primary} />
                            <Text style={styles.quickActionText}>{action}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Input */}
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={styles.inputContainer}>
                        <TouchableOpacity style={styles.addBtn}>
                            <MaterialIcons name="add" size={24} color={colors.textSecondary} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder="Type your message..."
                            placeholderTextColor={colors.placeholderGreen}
                            value={message}
                            onChangeText={setMessage}
                        />
                        <TouchableOpacity style={styles.sendBtn}>
                            <MaterialIcons name="send" size={20} color={colors.backgroundDark} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
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
    headerCenter: { alignItems: 'center' },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    onlineRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: 2 },
    onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
    onlineText: { fontSize: fontSize.xs, color: colors.textSecondary },
    faqLink: { fontSize: fontSize.md, fontWeight: '600', color: colors.primary },
    chatContainer: { flex: 1 },
    chatContent: { padding: spacing.lg },
    systemMessage: { alignItems: 'center', marginVertical: spacing.md },
    systemText: { fontSize: fontSize.xs, color: colors.textSecondary },
    botMessage: { marginBottom: spacing.lg },
    senderLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginBottom: spacing.xs },
    botBubbleRow: { flexDirection: 'row', alignItems: 'flex-end' },
    botAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surfaceHighlight, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
    botAvatarText: { fontSize: fontSize.lg },
    botBubble: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, borderBottomLeftRadius: borderRadius.sm, padding: spacing.md, maxWidth: '80%' },
    botText: { fontSize: fontSize.sm, color: colors.textPrimary, lineHeight: 20 },
    suggestedContainer: { marginTop: spacing.md, marginLeft: 40 },
    suggestedLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginBottom: spacing.sm },
    suggestedRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    topicChip: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.surfaceHighlight },
    topicText: { fontSize: fontSize.sm, color: colors.textPrimary },
    userMessage: { alignItems: 'flex-end', marginBottom: spacing.lg },
    youLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginBottom: spacing.xs },
    userBubbleRow: { flexDirection: 'row', alignItems: 'flex-end' },
    userBubble: { backgroundColor: colors.primary, borderRadius: borderRadius.lg, borderBottomRightRadius: borderRadius.sm, padding: spacing.md, maxWidth: '75%', marginRight: spacing.sm },
    userText: { fontSize: fontSize.sm, color: colors.backgroundDark, lineHeight: 20 },
    userAvatar: { width: 32, height: 32, borderRadius: 16 },
    orderCard: { marginBottom: spacing.lg },
    attachedLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginBottom: spacing.sm },
    orderContent: { flexDirection: 'row', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.primary + '44' },
    orderImage: { width: 60, height: 60, borderRadius: borderRadius.md },
    orderDetails: { marginLeft: spacing.md, flex: 1 },
    orderId: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    orderItems: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
    orderStatus: { fontSize: fontSize.xs, fontWeight: '600', color: '#fbbf24', marginTop: spacing.xs },
    viewDetails: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary, marginTop: spacing.xs },
    agentMessage: { marginBottom: spacing.lg },
    agentSender: { fontSize: fontSize.xs, color: colors.textSecondary, marginBottom: spacing.xs },
    agentBubble: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.md },
    agentText: { fontSize: fontSize.sm, color: colors.textPrimary, lineHeight: 20 },
    quickActions: { paddingHorizontal: spacing.lg, gap: spacing.sm, paddingVertical: spacing.md },
    quickActionBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full, backgroundColor: colors.surfaceDark, borderWidth: 1, borderColor: colors.surfaceHighlight },
    quickActionText: { fontSize: fontSize.sm, color: colors.textPrimary },
    inputContainer: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.surfaceHighlight },
    addBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surfaceDark, alignItems: 'center', justifyContent: 'center' },
    input: { flex: 1, height: 44, backgroundColor: colors.inputDark, borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, color: colors.textPrimary, fontSize: fontSize.md },
    sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
