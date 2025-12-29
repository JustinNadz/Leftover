import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const AVATAR_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHMLxUXi0vOvWtx60JlhXNsWI-9QjydJS8l8yXmMoe96cuJBb0Hn0JF4W-To09wL0pxZiZGnAZrpX00wvJ2yLATIyj_lU7sY1msrYBqoE0fBppCHFYw727SxgOOQaTxaLBjpgaM5gXid5yi904FGU4_33FnGxjfjNIlIYWuFg77jZwSUceQxBOi02s9BVTJzzU27CMb1TytFGTgTuqZ5MnaGVjeLpOg6FAMhB04bnwtWL5JHgzLC-q52wZ8sCcTmBRmkdaiybqQZcQ';

interface ProfileScreenProps {
    navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Profile Header */}
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            <Image source={{ uri: AVATAR_URL }} style={styles.avatar} />
                            <View style={styles.onlineIndicator} />
                        </View>
                        <Text style={styles.userName}>Maria Santos</Text>
                        <Text style={styles.userPhone}>+63 917 123 4567</Text>
                        <Text style={styles.userEmail}>maria.santos@email.com</Text>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit Profile Information</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Payment Methods Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Payment Methods</Text>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentMethods')}>
                            <View style={styles.menuItemLeft}>
                                <View style={[styles.menuIcon, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]}>
                                    <MaterialIcons name="account-balance-wallet" size={20} color="#3b82f6" />
                                </View>
                                <View>
                                    <Text style={styles.menuItemTitle}>GCash</Text>
                                    <Text style={styles.menuItemSubtitle}>0917****1234</Text>
                                </View>
                            </View>
                            <View style={styles.defaultBadge}><Text style={styles.defaultText}>DEFAULT</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuItemLeft}>
                                <View style={[styles.menuIcon, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                                    <MaterialIcons name="credit-card" size={20} color="#8b5cf6" />
                                </View>
                                <View>
                                    <Text style={styles.menuItemTitle}>Visa</Text>
                                    <Text style={styles.menuItemSubtitle}>****1250</Text>
                                </View>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    {/* Preferences Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Preferences</Text>
                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuItemLeft}>
                                <View style={[styles.menuIcon, { backgroundColor: 'rgba(34, 197, 94, 0.2)' }]}>
                                    <MaterialIcons name="location-on" size={20} color={colors.primary} />
                                </View>
                                <View>
                                    <Text style={styles.menuItemTitle}>Saved Addresses</Text>
                                    <Text style={styles.menuItemSubtitle}>Home, Office - Makati</Text>
                                </View>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
                        </TouchableOpacity>
                        <View style={styles.menuItem}>
                            <View style={styles.menuItemLeft}>
                                <View style={[styles.menuIcon, { backgroundColor: 'rgba(251, 191, 36, 0.2)' }]}>
                                    <MaterialIcons name="notifications" size={20} color="#fbbf24" />
                                </View>
                                <View>
                                    <Text style={styles.menuItemTitle}>Notifications</Text>
                                    <Text style={styles.menuItemSubtitle}>Push, SMS, Email</Text>
                                </View>
                            </View>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ false: colors.surfaceHighlight, true: colors.primary + '55' }}
                                thumbColor={notificationsEnabled ? colors.primary : colors.textSecondary}
                            />
                        </View>
                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuItemLeft}>
                                <View style={[styles.menuIcon, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                                    <MaterialIcons name="security" size={20} color="#ef4444" />
                                </View>
                                <View>
                                    <Text style={styles.menuItemTitle}>Security</Text>
                                    <Text style={styles.menuItemSubtitle}>Password, Biometrics</Text>
                                </View>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Welcome')}>
                        <MaterialIcons name="logout" size={20} color="#ef4444" />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>

                    <Text style={styles.version}>Version 2.4.0 (Build 892)</Text>
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
    scrollView: { flex: 1 },
    scrollContent: { paddingBottom: 120 },
    profileHeader: { alignItems: 'center', paddingVertical: spacing.xl, borderBottomWidth: 1, borderBottomColor: colors.surfaceHighlight },
    avatarContainer: { position: 'relative', marginBottom: spacing.md },
    avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: colors.primary + '55' },
    onlineIndicator: { position: 'absolute', bottom: 4, right: 4, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.primary, borderWidth: 3, borderColor: colors.backgroundDark },
    userName: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary },
    userPhone: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: spacing.xs },
    userEmail: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
    editButton: { marginTop: spacing.lg, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.surfaceHighlight },
    editButtonText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textSecondary },
    section: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
    sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
    menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surfaceDark, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md },
    menuItemLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    menuIcon: { width: 40, height: 40, borderRadius: borderRadius.md, alignItems: 'center', justifyContent: 'center' },
    menuItemTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
    menuItemSubtitle: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
    defaultBadge: { backgroundColor: colors.primary, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
    defaultText: { fontSize: 10, fontWeight: '700', color: colors.backgroundDark },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginHorizontal: spacing.lg, marginTop: spacing.xl, padding: spacing.lg, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.1)' },
    logoutText: { fontSize: fontSize.md, fontWeight: '600', color: '#ef4444' },
    version: { textAlign: 'center', marginTop: spacing.lg, fontSize: fontSize.xs, color: colors.textSecondary },
});
