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

const roleFilters = ['All Roles', 'Managers', 'Packers', 'List'];

interface TeamMember {
    id: string;
    name: string;
    role: 'owner' | 'manager' | 'listing_creator' | 'order_packer' | 'suspended';
    contact: string;
    avatar?: string;
    initials?: string;
    status?: string;
}

const teamMembers: TeamMember[] = [
    {
        id: '1',
        name: 'Maria Santos',
        role: 'owner',
        contact: '+63 917 123 4567 • Owner',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHMLxUXi0vOvWtx60JlhXNsWI-9QjydJS8l8yXmMoe96cuJBb0Hn0JF4W-To09wL0pxZiZGnAZrpX00wvJ2yLATIyj_lU7sY1msrYBqoE0fBppCHFYw727SxgOOQaTxaLBjpgaM5gXid5yi904FGU4_33FnGxjfjNIlIYWuFg77jZwSUceQxBOi02s9BVTJzzU27CMb1TytFGTgTuqZ5MnaGVjeLpOg6FAMhB04bnwtWL5JHgzLC-q52wZ8sCcTmBRmkdaiybqQZcQ',
    },
    {
        id: '2',
        name: 'Juan Dela Cruz',
        role: 'manager',
        contact: 'juan.delacruz@gmail.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHXqKWieP7EFXume0cd2BIBDob5HrdudvzzIdjFcKJ3AbjewkZ81uKqRxwt-GTgVZK0U9oqpz6ZQWS6Y0n8vaU34NRODqnIRurUwS4lVqQwJHsQLNFRoK0ln3pgemeG_15jkEVJlcldEp_kSmi0wK9FDN_eRJkpzCkl_wL4GWM6S0xf44x6jRIBekwstHIT_usamoD57a6-MGKa0ZsxSFvc9sA2LJZ_BMLvNfmI8stcunbZCaz9Cn8lDUARt2Gcvx8jwS9uRzpwZWO',
    },
    {
        id: '3',
        name: 'Bea Alonzo',
        role: 'listing_creator',
        contact: '+63 922 555 1234',
        initials: 'BA',
    },
    {
        id: '4',
        name: 'Jose Reyes',
        role: 'order_packer',
        contact: 'Active • Last login 2m ago',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApCjs8UuWec7W3OHoAKmpRGFxOSQTTVsqBHOK0Nmcivk-CnkSWQFSkx_k3lEcZFNShlEKVD13jCKhH7qBBSN6A1I8zjnJ21JCrAiofeS-C3rXSkocrJdt64243WsF9mO-hwWLh0jL1QsiwSPKwgPFWPJ9f6MANOnIrD46GLQTfj4In2zxogtBKJsQZOTfDzpEvnbpleMyd4wX77zt3ugRhHfc9tY803fYb2MvK31yv6j39ADI6DWPmcEt-B947Lno7p_yHX4Gxorsv',
    },
    {
        id: '5',
        name: 'Ana Cruz',
        role: 'suspended',
        contact: '+63 915 888 9999',
        initials: 'AC',
    },
];

const getRoleBadge = (role: TeamMember['role']) => {
    switch (role) {
        case 'manager':
            return { label: 'Manager', bg: colors.primary, text: colors.backgroundDark };
        case 'listing_creator':
            return { label: 'Listing Creator', bg: 'rgba(139, 92, 246, 0.2)', text: '#8b5cf6' };
        case 'order_packer':
            return { label: 'Order Packer', bg: 'rgba(59, 130, 246, 0.2)', text: '#3b82f6' };
        case 'suspended':
            return { label: 'Suspended', bg: 'rgba(255, 255, 255, 0.1)', text: colors.textSecondary };
        default:
            return null;
    }
};

interface TeamManagementScreenProps {
    navigation: any;
}

export const TeamManagementScreen: React.FC<TeamManagementScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [selectedFilter, setSelectedFilter] = useState('All Roles');

    const totalStaff = 7;
    const managers = 2;
    const packers = 4;

    const owner = teamMembers.find((m) => m.role === 'owner');
    const members = teamMembers.filter((m) => m.role !== 'owner');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Team Management</Text>
                    <TouchableOpacity>
                        <Text style={styles.helpLink}>Help</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>{totalStaff}</Text>
                            <Text style={styles.statLabel}>TOTAL{'\n'}STAFF</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>{managers}</Text>
                            <Text style={styles.statLabel}>MANAGERS</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>{packers}</Text>
                            <Text style={styles.statLabel}>PACKERS</Text>
                        </View>
                    </View>

                    {/* Add New Member Button */}
                    <TouchableOpacity style={styles.addButton}>
                        <MaterialIcons name="add" size={20} color={colors.backgroundDark} />
                        <Text style={styles.addButtonText}>Add New Member</Text>
                    </TouchableOpacity>

                    {/* Role Filters */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.filterContainer}
                    >
                        {roleFilters.map((filter) => (
                            <TouchableOpacity
                                key={filter}
                                style={[
                                    styles.filterButton,
                                    selectedFilter === filter && styles.filterButtonActive,
                                ]}
                                onPress={() => setSelectedFilter(filter)}
                            >
                                <Text style={[
                                    styles.filterText,
                                    selectedFilter === filter && styles.filterTextActive,
                                ]}>
                                    {filter}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Account Owner */}
                    {owner && (
                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>ACCOUNT OWNER</Text>
                            <View style={styles.ownerCard}>
                                <View style={styles.memberLeft}>
                                    <View style={styles.avatarContainer}>
                                        {owner.avatar ? (
                                            <Image source={{ uri: owner.avatar }} style={styles.avatar} />
                                        ) : (
                                            <View style={styles.avatarInitials}>
                                                <Text style={styles.initialsText}>{owner.initials}</Text>
                                            </View>
                                        )}
                                        <View style={styles.onlineIndicator} />
                                    </View>
                                    <View>
                                        <Text style={styles.memberName}>{owner.name}</Text>
                                        <Text style={styles.memberContact}>{owner.contact}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.editButton}>
                                    <MaterialIcons name="edit" size={18} color={colors.textPrimary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* Team Members */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>TEAM MEMBERS</Text>
                        {members.map((member) => {
                            const badge = getRoleBadge(member.role);
                            return (
                                <View key={member.id} style={styles.memberCard}>
                                    <View style={styles.memberLeft}>
                                        {member.avatar ? (
                                            <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
                                        ) : (
                                            <View style={[styles.avatarInitials, styles.memberAvatarSize]}>
                                                <Text style={styles.initialsText}>{member.initials}</Text>
                                            </View>
                                        )}
                                        <View style={styles.memberInfo}>
                                            <View style={styles.memberNameRow}>
                                                <Text style={styles.memberName}>{member.name}</Text>
                                                {badge && (
                                                    <View style={[styles.roleBadge, { backgroundColor: badge.bg }]}>
                                                        <Text style={[styles.roleBadgeText, { color: badge.text }]}>
                                                            {badge.label}
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>
                                            <Text style={styles.memberContact}>{member.contact}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity>
                                        <MaterialIcons name="more-vert" size={20} color={colors.textSecondary} />
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>

            <BottomNav
                activeTab={activeTab}
                onTabPress={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'dashboard') navigation.navigate('MerchantDashboard');
                    if (tab === 'listings') navigation.navigate('PostListing');
                    if (tab === 'support') navigation.navigate('HelpCenter');
                }}
                type="merchant"
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
    headerTitle: { fontSize: fontSize.lg, fontWeight: '600', color: colors.textPrimary },
    helpLink: { fontSize: fontSize.md, fontWeight: '600', color: colors.primary },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 120 },
    statsRow: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    statCard: {
        flex: 1,
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    statValue: { fontSize: 28, fontWeight: '700', color: colors.textPrimary },
    statLabel: { fontSize: fontSize.xs, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        backgroundColor: colors.primary,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.md,
        marginBottom: spacing.lg,
    },
    addButtonText: { fontSize: fontSize.md, fontWeight: '700', color: colors.backgroundDark },
    filterContainer: { gap: spacing.sm, marginBottom: spacing.xl },
    filterButton: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        backgroundColor: colors.surfaceDark,
        marginRight: spacing.sm,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    filterButtonActive: {
        backgroundColor: 'rgba(19, 236, 109, 0.15)',
        borderColor: colors.primary,
    },
    filterText: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: '500' },
    filterTextActive: { color: colors.primary },
    section: { marginBottom: spacing.xl },
    sectionLabel: {
        fontSize: fontSize.xs,
        fontWeight: '600',
        color: colors.primary,
        letterSpacing: 1,
        marginBottom: spacing.md,
    },
    ownerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(19, 236, 109, 0.2)',
    },
    memberLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    avatarContainer: { position: 'relative' },
    avatar: { width: 48, height: 48, borderRadius: borderRadius.full },
    onlineIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: colors.primary,
        borderWidth: 2,
        borderColor: colors.surfaceDark,
    },
    avatarInitials: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.full,
        backgroundColor: colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    memberAvatarSize: { width: 48, height: 48 },
    initialsText: { fontSize: fontSize.md, fontWeight: '700', color: colors.textPrimary },
    memberName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    memberContact: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
    editButton: {
        width: 36,
        height: 36,
        borderRadius: borderRadius.md,
        backgroundColor: colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
    },
    memberAvatar: { width: 48, height: 48, borderRadius: borderRadius.full },
    memberInfo: { marginLeft: spacing.md, flex: 1 },
    memberNameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' },
    roleBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    roleBadgeText: { fontSize: 10, fontWeight: '700' },
});
