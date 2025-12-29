import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const MAP_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAljbbz6QipqoNn3qL-qZPTip19KBeT1Eh3W2cRdUJ5451BGG9zSzkXCFRdkGjqoAcoYsPREMPS1yZAhoo08QobRIaItfJuqYP6loYERXAJ3MrZGwCzuwB7jFVQCrt22SRss3SL4md73Op6JLEKnYtRjLLHcK93q3gxC5lO4AHv6LWrU6vsaRsLSXFJ6LoTDaAvW37PS1_EkgzUaPVKGkkR8z0a8tR3gaftieByK0Ama4usLMaKl8d4bxPNc6hwhFLIgOHdcU0mag7_';

const timeline = [
    { id: '1', status: 'Order Placed', time: '5:45 PM', completed: true, message: null },
    { id: '2', status: 'Merchant Preparing', time: '5:50 PM', completed: true, message: 'The merchant is currently packing your assorted pastry box.' },
    { id: '3', status: 'Ready for Pickup', time: 'Est. 6:30 PM', completed: false, message: null },
    { id: '4', status: 'Completed', time: '', completed: false, message: null },
];

interface OrderTrackingScreenProps {
    navigation: any;
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('orders');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Order #12345</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Status Badge */}
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>IN PROGRESS</Text>
                    </View>

                    {/* Main Status */}
                    <Text style={styles.mainStatus}>Preparing your meal</Text>
                    <Text style={styles.pickupTime}>Pickup by <Text style={styles.pickupTimeHighlight}>6:30 PM</Text></Text>

                    {/* Map */}
                    <View style={styles.mapContainer}>
                        <Image source={{ uri: MAP_IMAGE }} style={styles.mapImage} />
                        <View style={styles.distanceBadge}>
                            <MaterialIcons name="location-on" size={14} color={colors.primary} />
                            <Text style={styles.distanceText}>1.2km away</Text>
                        </View>
                    </View>

                    {/* Merchant Info */}
                    <View style={styles.merchantCard}>
                        <View style={styles.merchantInfo}>
                            <Text style={styles.merchantName}>Manila Bakery</Text>
                            <Text style={styles.merchantAddress}>Salcedo Village, Makati City</Text>
                        </View>
                        <TouchableOpacity style={styles.chatBtn}>
                            <MaterialIcons name="chat-bubble" size={20} color={colors.primary} />
                        </TouchableOpacity>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionsRow}>
                        <TouchableOpacity style={styles.actionBtn}>
                            <MaterialIcons name="call" size={18} color={colors.textPrimary} />
                            <Text style={styles.actionText}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutline]}>
                            <MaterialIcons name="chat" size={18} color={colors.textPrimary} />
                            <Text style={styles.actionText}>Chat</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Timeline */}
                    <View style={styles.timelineContainer}>
                        {timeline.map((item, index) => (
                            <View key={item.id} style={styles.timelineItem}>
                                <View style={styles.timelineLeft}>
                                    <View style={[styles.timelineDot, item.completed && styles.timelineDotCompleted]}>
                                        {item.completed && <MaterialIcons name="check" size={12} color={colors.backgroundDark} />}
                                    </View>
                                    {index < timeline.length - 1 && <View style={[styles.timelineLine, item.completed && styles.timelineLineCompleted]} />}
                                </View>
                                <View style={styles.timelineContent}>
                                    <Text style={[styles.timelineStatus, item.completed && styles.timelineStatusActive]}>{item.status}</Text>
                                    {item.time && <Text style={styles.timelineTime}>{item.time}</Text>}
                                    {item.message && (
                                        <View style={styles.messageBubble}>
                                            <MaterialIcons name="chat-bubble-outline" size={14} color={colors.textSecondary} />
                                            <Text style={styles.messageText}>{item.message}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Order Summary */}
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryHeader}>
                            <MaterialIcons name="receipt-long" size={18} color={colors.textSecondary} />
                            <Text style={styles.summaryTitle}>ORDER SUMMARY</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryItem}>1x</Text>
                            <Text style={styles.summaryName}>Assorted Pastry Box</Text>
                            <Text style={styles.summaryPrice}>₱150.00</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>₱150.00</Text>
                        </View>
                    </View>

                    {/* Help Link */}
                    <TouchableOpacity style={styles.helpLink}>
                        <MaterialIcons name="help-outline" size={18} color={colors.textSecondary} />
                        <Text style={styles.helpText}>Need help with this order?</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'home') navigation.navigate('BuyerHome');
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
    scrollContent: { padding: spacing.lg, paddingBottom: 120, alignItems: 'center' },
    statusBadge: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full },
    statusText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.backgroundDark },
    mainStatus: { fontSize: 28, fontWeight: '700', color: colors.textPrimary, marginTop: spacing.lg, textAlign: 'center' },
    pickupTime: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: spacing.sm },
    pickupTimeHighlight: { color: colors.primary, fontWeight: '600', textDecorationLine: 'underline' },
    mapContainer: { width: '100%', height: 180, borderRadius: borderRadius.xl, overflow: 'hidden', marginTop: spacing.xl, position: 'relative' },
    mapImage: { width: '100%', height: '100%' },
    distanceBadge: { position: 'absolute', bottom: spacing.md, left: spacing.md, flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.backgroundDark, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full },
    distanceText: { fontSize: fontSize.sm, color: colors.textPrimary },
    merchantCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: spacing.lg },
    merchantInfo: { flex: 1 },
    merchantName: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    merchantAddress: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
    chatBtn: { width: 44, height: 44, borderRadius: borderRadius.full, backgroundColor: colors.surfaceDark, alignItems: 'center', justifyContent: 'center' },
    actionsRow: { flexDirection: 'row', gap: spacing.md, width: '100%', marginTop: spacing.lg },
    actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg },
    actionBtnOutline: { borderWidth: 1, borderColor: colors.surfaceHighlight },
    actionText: { fontSize: fontSize.md, fontWeight: '500', color: colors.textPrimary },
    timelineContainer: { width: '100%', marginTop: spacing.xl },
    timelineItem: { flexDirection: 'row', minHeight: 60 },
    timelineLeft: { alignItems: 'center', width: 24, marginRight: spacing.md },
    timelineDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.surfaceHighlight, alignItems: 'center', justifyContent: 'center' },
    timelineDotCompleted: { backgroundColor: colors.primary },
    timelineLine: { flex: 1, width: 2, backgroundColor: colors.surfaceHighlight, marginVertical: spacing.xs },
    timelineLineCompleted: { backgroundColor: colors.primary },
    timelineContent: { flex: 1, paddingBottom: spacing.lg },
    timelineStatus: { fontSize: fontSize.md, fontWeight: '500', color: colors.textSecondary },
    timelineStatusActive: { color: colors.primary, fontWeight: '600' },
    timelineTime: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
    messageBubble: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, backgroundColor: colors.surfaceDark, padding: spacing.md, borderRadius: borderRadius.lg, marginTop: spacing.sm },
    messageText: { flex: 1, fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 18 },
    summaryCard: { width: '100%', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, marginTop: spacing.lg },
    summaryHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
    summaryTitle: { fontSize: fontSize.xs, fontWeight: '700', color: colors.textSecondary },
    summaryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
    summaryItem: { fontSize: fontSize.sm, color: colors.textSecondary, marginRight: spacing.sm },
    summaryName: { flex: 1, fontSize: fontSize.sm, color: colors.textPrimary },
    summaryPrice: { fontSize: fontSize.sm, color: colors.textSecondary },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.surfaceHighlight, paddingTop: spacing.md },
    totalLabel: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    totalValue: { fontSize: fontSize.lg, fontWeight: '700', color: colors.primary },
    helpLink: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xl },
    helpText: { fontSize: fontSize.sm, color: colors.textSecondary },
});
