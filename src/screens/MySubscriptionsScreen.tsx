import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const filterTabs = ['All', 'Active', 'Paused'];

interface Subscription {
    id: string;
    merchantName: string;
    productName: string;
    schedule: string;
    price: number;
    savedAmount: number;
    status: 'active' | 'paused';
    imageUrl: string;
}

const subscriptions: Subscription[] = [
    {
        id: '1',
        merchantName: 'Pan de Manila',
        productName: 'Surprise Pastry Box',
        schedule: 'Daily @ 7:00 PM',
        price: 120.00,
        savedAmount: 45.00,
        status: 'active',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDazL-S56m1LGCDi2gkb5qcGG5lFoyqYByD_ipVB6-8DDDtcNPNvd5jsFqY6RTTSktKh5pjKXn11WI2-pcAuJpX2kggN9SZ-AZOo-OjTGjTStejgziMGvrpRAdkv6fe0HjipqqARVtLsqg_UcpX3S3q-hqIwNGDXGMFUfAZdO1vTidn0xX6vgjzkngRRPogkWsNoaWKQd7dy5eejslDSUVfkjH0LhCk58B4GR713v26NPW8bw2pesap33CRRiZ6dv6IQp40Gv2onZOJ',
    },
    {
        id: '2',
        merchantName: 'Starbucks Reserve',
        productName: 'Coffee Grounds & Pastry',
        schedule: 'Fridays @ 5:00 PM',
        price: 250.00,
        savedAmount: 90.00,
        status: 'active',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoRFGU_akNPvQajq_met5UKG-CYvb1JBol1rIoTBma23v54ObxCcCi2XWY5pWmLSpZS9ykkPskjEtQmqUNUL_7cT5n-dVBHHdDYy-BPMCEaD99GXrmDfyqKdcSg2eIecmzdsi40ceS40SVB99Iiknwl_yjN6ksVmHlIcjYI84JSJx95VS-SS2EuNsZnaJh49KTKH2wHYw1jkqKgoeMRfUKVlgGHiVAyzSu1IKZcVU_6XGw5CbfJVI0dZBknGE-GLfG5ygn85Ccm6ch',
    },
    {
        id: '3',
        merchantName: "Conti's Bakeshop",
        productName: 'Mango Bravo Slice',
        schedule: 'Wednesdays @ 3:00 PM',
        price: 180.00,
        savedAmount: 60.00,
        status: 'paused',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2ldwsjF-n1jrUDIygKQrqQzHLw0OF_FDK67tVBi-bp5tfOqYDXu2WOQw5LvyHHUmUM91TOlg8mA7QRgthL-EiByaXCYzJgGaUu-Geh6eDI-Tf9yYOQnGdbSq5n5yUJM_SwS_CMr_hoR_0NjQmGOgfv-u2D1df1waoIbXpjvf1LBdS6GjGCDg1o8mxzJtrwU66IEPqhpIZ7MgegzHbYNM2N8SWaz0IQ94N0H6DBVMv6p6O11uCcOR3e9gLoELUqSB0aWuADnh60pM6',
    },
];

interface MySubscriptionsScreenProps {
    navigation: any;
}

export const MySubscriptionsScreen: React.FC<MySubscriptionsScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('subs');
    const [selectedFilter, setSelectedFilter] = useState('All');

    const filteredSubscriptions = subscriptions.filter((sub) => {
        if (selectedFilter === 'All') return true;
        if (selectedFilter === 'Active') return sub.status === 'active';
        if (selectedFilter === 'Paused') return sub.status === 'paused';
        return true;
    });

    const totalRescued = 5.2;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="tune" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Title */}
                    <Text style={styles.title}>My Subscriptions</Text>

                    {/* Filter Tabs */}
                    <View style={styles.filterTabs}>
                        {filterTabs.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[
                                    styles.filterTab,
                                    selectedFilter === tab && styles.filterTabActive,
                                ]}
                                onPress={() => setSelectedFilter(tab)}
                            >
                                <Text style={[
                                    styles.filterText,
                                    selectedFilter === tab && styles.filterTextActive,
                                ]}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Impact Card */}
                    <View style={styles.impactCard}>
                        <View style={styles.impactContent}>
                            <Text style={styles.impactLabel}>TOTAL IMPACT</Text>
                            <Text style={styles.impactText}>
                                You've rescued <Text style={styles.impactHighlight}>{totalRescued} kg</Text> of food this month!
                            </Text>
                        </View>
                        <View style={styles.impactIcon}>
                            <MaterialIcons name="eco" size={24} color={colors.primary} />
                        </View>
                    </View>

                    {/* Subscription Cards */}
                    {filteredSubscriptions.map((sub) => (
                        <View key={sub.id} style={styles.subscriptionCard}>
                            <View style={styles.cardHeader}>
                                <Image source={{ uri: sub.imageUrl }} style={styles.cardImage} />
                                <View style={styles.cardInfo}>
                                    <View style={styles.cardTitleRow}>
                                        <Text style={styles.merchantName}>{sub.merchantName}</Text>
                                        <View style={[
                                            styles.statusBadge,
                                            sub.status === 'active' ? styles.statusActive : styles.statusPaused,
                                        ]}>
                                            <Text style={[
                                                styles.statusText,
                                                sub.status === 'active' ? styles.statusTextActive : styles.statusTextPaused,
                                            ]}>
                                                {sub.status === 'active' ? 'Active' : 'Paused'}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.productName}>{sub.productName}</Text>
                                    <Text style={styles.schedule}>{sub.schedule}</Text>
                                    <View style={styles.priceRow}>
                                        <Text style={styles.price}>₱{sub.price.toFixed(2)}</Text>
                                        <Text style={styles.perOrder}>/order</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardFooter}>
                                <View style={styles.savedBadge}>
                                    <MaterialIcons name="savings" size={14} color={colors.primary} />
                                    <Text style={styles.savedText}>Saved ₱{sub.savedAmount.toFixed(2)}</Text>
                                </View>
                                <View style={styles.cardActions}>
                                    <TouchableOpacity>
                                        <Text style={styles.pauseText}>
                                            {sub.status === 'active' ? 'Pause' : 'Resume'}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.editButton}>
                                        <Text style={styles.editText}>Edit</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 120 },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.lg,
    },
    filterTabs: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    filterTab: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        backgroundColor: colors.surfaceDark,
    },
    filterTabActive: {
        backgroundColor: colors.primary,
    },
    filterText: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    filterTextActive: {
        color: colors.backgroundDark,
        fontWeight: '700',
    },
    impactCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(19, 236, 109, 0.1)',
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.xl,
        borderWidth: 1,
        borderColor: 'rgba(19, 236, 109, 0.2)',
    },
    impactContent: { flex: 1 },
    impactLabel: {
        fontSize: fontSize.xs,
        fontWeight: '600',
        color: colors.primary,
        letterSpacing: 1,
        marginBottom: spacing.xs,
    },
    impactText: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
    },
    impactHighlight: {
        color: colors.primary,
        fontWeight: '700',
    },
    impactIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.full,
        backgroundColor: 'rgba(19, 236, 109, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subscriptionCard: {
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    cardHeader: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    cardImage: {
        width: 64,
        height: 64,
        borderRadius: borderRadius.md,
    },
    cardInfo: { flex: 1 },
    cardTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    merchantName: {
        fontSize: fontSize.md,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    statusBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    statusActive: {
        backgroundColor: colors.primary,
    },
    statusPaused: {
        backgroundColor: colors.surfaceHighlight,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
    },
    statusTextActive: {
        color: colors.backgroundDark,
    },
    statusTextPaused: {
        color: colors.textSecondary,
    },
    productName: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    schedule: {
        fontSize: fontSize.xs,
        color: colors.textSecondary,
        marginBottom: spacing.sm,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    price: {
        fontSize: fontSize.lg,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    perOrder: {
        fontSize: fontSize.xs,
        color: colors.textSecondary,
        marginLeft: spacing.xs,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacing.lg,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    savedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    savedText: {
        fontSize: fontSize.sm,
        color: colors.primary,
        fontWeight: '600',
    },
    cardActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    pauseText: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    editButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
    },
    editText: {
        fontSize: fontSize.sm,
        fontWeight: '700',
        color: colors.backgroundDark,
    },
});
