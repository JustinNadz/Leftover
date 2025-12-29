import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const orderInfo = {
    id: '#2910',
    product: 'Mixed Pastries',
    merchant: 'Jollibee Surplus - Branch 2',
    price: '₱150.00',
    pickup: 'Pickup by 5:00 PM',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR-hBuMZnzy-zf7wEqgphKw8NTVfN5DgDoE99hdOrIoHmbupwEzOzrHMpRmM-jqG3ZXHryWXyniipk0294ybhVILc2kGLKu-todN5Bi_JboIBZ8aNgWloTQvdt2WKl84qb8SVLeoF_64_Oc2gtY73mXpw91bBlR4mlAMU6PvEGHFX1a_DZQa0vJ5ouigYMMXqMPAYI88zaEXot6xUjq8JvpEZjeHH4Ipa3S7s5CcQ9Qc6y_4JwIBrjTE5j5oLA5ap1qpNKqK4J4pVk',
};

const messages = [
    { id: '1', type: 'system', text: 'Today, 4:23 PM' },
    { id: '2', type: 'agent', sender: 'Support Agent', text: 'Hi! How can we help you save food today?', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHMLxUXi0vOvWtx60JlhXNsWI-9QjydJS8l8yXmMoe96cuJBb0Hn0JF4W-To09wL0pxZiZGnAZrpX00wvJ2yLATIyj_lU7sY1msrYBqoE0fBppCHFYw727SxgOOQaTxaLBjpgaM5gXid5yi904FGU4_33FnGxjfjNIlIYWuFg77jZwSUceQxBOi02s9BVTJzzU27CMb1TytFGTgTuqZ5MnaGVjeLpOg6FAMhB04bnwtWL5JHgzLC-q52wZ8sCcTmBRmkdaiybqQZcQ' },
    { id: '3', type: 'user', text: "I'm at the location but the store seems closed. The lights are off.", time: 'Read 4:25 PM' },
    { id: '4', type: 'agent', sender: 'Support Agent', text: 'I apologize for the inconvenience. Let me contact the merchant for you immediately. Could you please send a photo of the storefront?', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHMLxUXi0vOvWtx60JlhXNsWI-9QjydJS8l8yXmMoe96cuJBb0Hn0JF4W-To09wL0pxZiZGnAZrpX00wvJ2yLATIyj_lU7sY1msrYBqoE0fBppCHFYw727SxgOOQaTxaLBjpgaM5gXid5yi904FGU4_33FnGxjfjNIlIYWuFg77jZwSUceQxBOi02s9BVTJzzU27CMb1TytFGTgTuqZ5MnaGVjeLpOg6FAMhB04bnwtWL5JHgzLC-q52wZ8sCcTmBRmkdaiybqQZcQ' },
];

const quickReplies = ['Cancel Order', "I can't find the place", 'Merchant Unrespo...'];

interface SupportChatScreenProps {
    navigation: any;
}

export const SupportChatScreen: React.FC<SupportChatScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('orders');
    const [message, setMessage] = useState('');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>Support</Text>
                        <Text style={styles.headerSubtitle}>Order {orderInfo.id}</Text>
                    </View>
                    <TouchableOpacity>
                        <MaterialIcons name="info-outline" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                {/* Order Card */}
                <View style={styles.orderCard}>
                    <Image source={{ uri: orderInfo.imageUrl }} style={styles.orderImage} />
                    <View style={styles.orderContent}>
                        <Text style={styles.orderName}>{orderInfo.product}</Text>
                        <Text style={styles.orderMerchant}>{orderInfo.merchant}</Text>
                        <Text style={styles.orderPrice}>{orderInfo.price}</Text>
                        <Text style={styles.orderPickup}>{orderInfo.pickup}</Text>
                    </View>
                    <TouchableOpacity style={styles.viewBtn}>
                        <Text style={styles.viewBtnText}>View</Text>
                    </TouchableOpacity>
                </View>

                {/* Chat Messages */}
                <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
                    {messages.map((msg) => {
                        if (msg.type === 'system') {
                            return (
                                <View key={msg.id} style={styles.systemMessage}>
                                    <Text style={styles.systemText}>{msg.text}</Text>
                                </View>
                            );
                        }
                        if (msg.type === 'agent') {
                            return (
                                <View key={msg.id} style={styles.agentMessage}>
                                    <Text style={styles.senderLabel}>{msg.sender}</Text>
                                    <View style={styles.agentBubbleRow}>
                                        <Image source={{ uri: msg.avatar }} style={styles.agentAvatar} />
                                        <View style={styles.agentBubble}>
                                            <Text style={styles.agentText}>{msg.text}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        }
                        return (
                            <View key={msg.id} style={styles.userMessage}>
                                <View style={styles.userBubble}>
                                    <Text style={styles.userText}>{msg.text}</Text>
                                </View>
                                <Text style={styles.readTime}>{msg.time}</Text>
                            </View>
                        );
                    })}
                </ScrollView>

                {/* Quick Replies */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickReplies}>
                    {quickReplies.map((reply, idx) => (
                        <TouchableOpacity key={idx} style={styles.quickReplyBtn}>
                            <Text style={styles.quickReplyText}>{reply}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Input */}
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={styles.inputContainer}>
                        <TouchableOpacity style={styles.attachBtn}>
                            <MaterialIcons name="add-a-photo" size={24} color={colors.textSecondary} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder="Type a message..."
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
                    if (tab === 'home') navigation.navigate('BuyerHome');
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
    headerCenter: { alignItems: 'center' },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    headerSubtitle: { fontSize: fontSize.sm, color: colors.primary },
    orderCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceDark, marginHorizontal: spacing.lg, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md },
    orderImage: { width: 60, height: 60, borderRadius: borderRadius.md },
    orderContent: { flex: 1, marginLeft: spacing.md },
    orderName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    orderMerchant: { fontSize: fontSize.xs, color: colors.textSecondary },
    orderPrice: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary, marginTop: 2 },
    orderPickup: { fontSize: fontSize.xs, color: colors.textSecondary },
    viewBtn: { backgroundColor: colors.surfaceHighlight, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
    viewBtnText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textPrimary },
    chatContainer: { flex: 1 },
    chatContent: { padding: spacing.lg },
    systemMessage: { alignItems: 'center', marginVertical: spacing.md },
    systemText: { fontSize: fontSize.xs, color: colors.textSecondary, backgroundColor: colors.surfaceDark, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
    agentMessage: { marginBottom: spacing.lg },
    senderLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginBottom: spacing.xs },
    agentBubbleRow: { flexDirection: 'row', alignItems: 'flex-end' },
    agentAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: spacing.sm },
    agentBubble: { backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, borderBottomLeftRadius: borderRadius.sm, padding: spacing.md, maxWidth: '80%' },
    agentText: { fontSize: fontSize.sm, color: colors.textPrimary, lineHeight: 20 },
    userMessage: { alignItems: 'flex-end', marginBottom: spacing.lg },
    userBubble: { backgroundColor: colors.primary, borderRadius: borderRadius.lg, borderBottomRightRadius: borderRadius.sm, padding: spacing.md, maxWidth: '80%' },
    userText: { fontSize: fontSize.sm, color: colors.backgroundDark, lineHeight: 20 },
    readTime: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: spacing.xs },
    quickReplies: { paddingHorizontal: spacing.lg, gap: spacing.sm, paddingBottom: spacing.md },
    quickReplyBtn: { backgroundColor: colors.surfaceDark, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.surfaceHighlight },
    quickReplyText: { fontSize: fontSize.sm, color: colors.textPrimary },
    inputContainer: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.surfaceHighlight },
    attachBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surfaceDark, alignItems: 'center', justifyContent: 'center' },
    input: { flex: 1, height: 44, backgroundColor: colors.inputDark, borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, color: colors.textPrimary, fontSize: fontSize.md },
    sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
