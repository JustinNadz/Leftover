import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const paymentMethods = [
    { id: '1', type: 'gcash', name: 'GCash', detail: '0917****1234', isDefault: true, icon: 'account-balance-wallet', color: '#3b82f6' },
    { id: '2', type: 'visa', name: 'Visa', detail: '****1250', isDefault: false, icon: 'credit-card', color: '#8b5cf6' },
];

interface PaymentMethodsScreenProps {
    navigation: any;
}

export const PaymentMethodsScreen: React.FC<PaymentMethodsScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Payment Methods</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {paymentMethods.map((method) => (
                        <TouchableOpacity key={method.id} style={styles.paymentCard}>
                            <View style={styles.paymentLeft}>
                                <View style={[styles.paymentIcon, { backgroundColor: method.color + '33' }]}>
                                    <MaterialIcons name={method.icon as any} size={24} color={method.color} />
                                </View>
                                <View>
                                    <View style={styles.paymentNameRow}>
                                        <Text style={styles.paymentName}>{method.name}</Text>
                                        {method.isDefault && (
                                            <View style={styles.defaultBadge}>
                                                <Text style={styles.defaultText}>DEFAULT</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={styles.paymentDetail}>{method.detail}</Text>
                                </View>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddPaymentMethod')}>
                        <View style={styles.addIcon}>
                            <MaterialIcons name="add" size={24} color={colors.primary} />
                        </View>
                        <Text style={styles.addText}>Add Payment Method</Text>
                    </TouchableOpacity>
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
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.surfaceHighlight },
    headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    paymentCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md },
    paymentLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    paymentIcon: { width: 48, height: 48, borderRadius: borderRadius.md, alignItems: 'center', justifyContent: 'center' },
    paymentNameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    paymentName: { fontSize: fontSize.md, fontWeight: '700', color: colors.textPrimary },
    paymentDetail: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
    defaultBadge: { backgroundColor: colors.primary, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
    defaultText: { fontSize: 9, fontWeight: '700', color: colors.backgroundDark },
    addButton: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.surfaceHighlight },
    addIcon: { width: 48, height: 48, borderRadius: borderRadius.md, backgroundColor: colors.surfaceHighlight, alignItems: 'center', justifyContent: 'center' },
    addText: { fontSize: fontSize.md, fontWeight: '600', color: colors.textSecondary },
});
