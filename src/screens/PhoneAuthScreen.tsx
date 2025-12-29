import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbHVFhU8qFQfydJbvLjFBt1Ku9TcFMO5lW2XVh5xTWsiJ3TQA3PX4e8cwG5R-3KexDTvTiJPckFNxDd_7nSNu-1NKDaaX_i0LYe_I_lmRpOJT3NYuaW0SDtGeS7M2UX_zDjYMMy5i3atgRDmH_nObMkydU-1DSbBn7ff1hApp2orZx0g8sar33ZphjAdw0OSzXGm_LXO8e7RJB8UabaMNjksiV8niaBIDJ8_fdaLa91L94ysqTfn7PoW-s44Ottvaa7Lw3iA3fUUok';

interface PhoneAuthScreenProps {
    navigation: any;
}

export const PhoneAuthScreen: React.FC<PhoneAuthScreenProps> = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [countryCode] = useState('+1');

    const handleContinue = () => {
        // Navigate to home after "verification"
        navigation.navigate('BuyerHome');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
                        </TouchableOpacity>
                        <Text style={styles.step}>Step 1 of 3</Text>
                    </View>

                    {/* Hero Image */}
                    <View style={styles.heroContainer}>
                        <Image source={{ uri: HERO_IMAGE }} style={styles.heroImage} />
                        <LinearGradient
                            colors={['rgba(16, 34, 24, 0)', colors.backgroundDark]}
                            style={styles.heroGradient}
                        />
                    </View>

                    {/* Headlines */}
                    <View style={styles.headlines}>
                        <Text style={styles.title}>Let's get started</Text>
                        <Text style={styles.subtitle}>
                            Enter your phone number to find surplus food near you and start saving money while saving the planet.
                        </Text>
                    </View>

                    {/* Phone Input */}
                    <View style={styles.phoneContainer}>
                        <Text style={styles.inputLabel}>Phone Number</Text>
                        <View style={styles.phoneRow}>
                            {/* Country Code */}
                            <View style={styles.countryCodeContainer}>
                                <Text style={styles.flag}>🇺🇸</Text>
                                <Text style={styles.countryCode}>{countryCode}</Text>
                            </View>

                            {/* Phone Input */}
                            <View style={styles.phoneInputContainer}>
                                <Input
                                    placeholder="(555) 000-0000"
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                    containerStyle={styles.phoneInput}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Continue Button */}
                    <Button
                        title="Send Verification Code"
                        onPress={handleContinue}
                        iconRight="arrow-forward"
                        variant="primary"
                    />

                    <Text style={styles.disclaimer}>
                        By tapping "Send Verification Code", an SMS may be sent. Message & data rates may apply.
                    </Text>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>Or continue with</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Social Buttons */}
                    <View style={styles.socialContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Image
                                source={{ uri: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' }}
                                style={styles.socialIcon}
                            />
                            <Text style={styles.socialText}>Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton}>
                            <MaterialIcons name="apple" size={20} color={colors.textPrimary} />
                            <Text style={styles.socialText}>Apple</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Terms */}
                    <Text style={styles.terms}>
                        By continuing you agree to our{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text>
                        {' '}and{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>.
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.xxl,
        paddingBottom: spacing.xxxl,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.full,
    },
    step: {
        fontSize: fontSize.sm,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    heroContainer: {
        height: 180,
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        marginBottom: spacing.xxl,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
    },
    headlines: {
        marginBottom: spacing.xxl,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    subtitle: {
        fontSize: fontSize.md,
        color: colors.textSecondary,
        lineHeight: 22,
    },
    phoneContainer: {
        marginBottom: spacing.xxl,
    },
    inputLabel: {
        fontSize: fontSize.sm,
        fontWeight: '600',
        color: colors.textSecondary,
        marginBottom: spacing.sm,
        marginLeft: spacing.xs,
    },
    phoneRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    countryCodeContainer: {
        width: 88,
        height: 56,
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.borderDark,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
    },
    flag: {
        fontSize: 18,
    },
    countryCode: {
        fontSize: fontSize.md,
        fontWeight: '500',
        color: colors.textPrimary,
    },
    phoneInputContainer: {
        flex: 1,
    },
    phoneInput: {
        flex: 1,
    },
    disclaimer: {
        fontSize: fontSize.xs,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.xxl,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.borderDark,
    },
    dividerText: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
        paddingHorizontal: spacing.lg,
    },
    socialContainer: {
        flexDirection: 'row',
        gap: spacing.lg,
        marginBottom: spacing.xxl,
    },
    socialButton: {
        flex: 1,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.md,
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.borderDark,
    },
    socialIcon: {
        width: 20,
        height: 20,
    },
    socialText: {
        fontSize: fontSize.sm,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    terms: {
        fontSize: fontSize.xs,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
    },
    termsLink: {
        color: colors.primary,
    },
});
