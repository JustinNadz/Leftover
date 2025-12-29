
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZpE8hLNV3TvshAzb3Nyyd5JyHcZzMMdPxc12ZouHnBKY032Mz6lQIA44I-yikGY2ehWDW5TbVDpMW9Savddbe6P4Dt4iLy_XdeZnvclffN1L-OcTcyWBtJ1We7AEAXoXb-y2UvuZo5CeQazjkiu9W7wBvUkTkLH8jtO-fX_9RqbtzBgZ-aQaM_Tkd-M-VskiPbRUIPFeM4qbCDJpxZqF8ogN2hAlJfjMPT4nv-lTgQZaCutfMunqARtBA2ESfCZAsJ9GDMDgKgMWo';

const features = [
    {
        id: 'rescue',
        title: 'RESCUE FOOD',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNL-Y55zK3YgK1Uh-uK7AqlI0v5QQt5-DHOSNOYjOhH5gUUxh99G0t7m10_zSwDSH_WT9ZgTm57HmsKKm8avx3Kr5TohDfA-bejbkZ6lcUHqUR5kk2JHNOCmoN4dyyozVLnl5IZoo0lP7JOJlM4Rt7LaqhQaQUPOdcbTfyGIuqbenx7xhIN0ZLv_i9ieTAmtVzpIHbgjTDlqguGoTiAe3hZc4fwl4-R-gdGTjG2h9LgfIDRgG3dBDBo4R3WmJat3dwLV6mqqWMfH8u',
    },
    {
        id: 'save',
        title: 'SAVE MONEY',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxsHRNolVlG8-RIeksmgvqIZXhxE_m2ffyPF-IPWEFsO5bQRSicXZkBXjkO2U5NueZNRggX-zjd9lIuRYCHllv3ylv5viVMKJGYEyKrrhPrhDNaGUh2rtwrGZ7Ophi4o8KhDeCHAYsS4KSNBsgaaQ1FBluIkMajjoGKdsWfOgNllQhxv8WgeorHXqhuRGwtSOgyj8jwyobt0IEItX-GUlvJfRIMUsWyBlq6J9bpUHGh43ptOds3q4hGMoBQp7j6eTkLg7dkaYhGKbk',
    },
    {
        id: 'planet',
        title: 'HELP PLANET',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiIg7ZLSPuOQLBAxTPYxdh1zeBunHhMAqrwUYRXQYpw-2qD9NFJD9uk-3UHbUCZEtU6KN7jNPHiRhzv1GErPZ_NZc35O7XyKGjTdsiG1nnSw-IJ-DswesKpr6teS9QRJlXV9UefWEaDXrFExo3WdLms2kJHszZiz0EksK69QrXHNvo-jvFKIpPD_pHZKAvz8dcpD-7PLEQ_4AQUt2ajJuMQYY0Mhxodqcr0oPIiWH2EHZenf6jYzO37b1FRn2rIXO6x_wLPst7JsRV',
    },
];

interface WelcomeScreenProps {
    navigation: any;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Hero Background */}
            <View style={styles.heroContainer}>
                <ImageBackground
                    source={{ uri: HERO_IMAGE }}
                    style={styles.heroImage}
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={['rgba(16, 34, 24, 0.6)', 'rgba(16, 34, 24, 0)', colors.backgroundDark]}
                        style={styles.heroGradient}
                    />
                </ImageBackground>

                {/* Logo */}
                <SafeAreaView style={styles.logoContainer}>
                    <Text style={styles.logo}>
                        Left<Text style={styles.logoAccent}>Uber</Text>
                    </Text>
                </SafeAreaView>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* Feature Carousel */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.featuresContainer}
                >
                    {features.map((feature) => (
                        <View key={feature.id} style={styles.featureItem}>
                            <View style={styles.featureImageContainer}>
                                <Image source={{ uri: feature.image }} style={styles.featureImage} />
                                <View style={styles.featureOverlay} />
                            </View>
                            <Text style={styles.featureTitle}>{feature.title}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Headline */}
                <View style={styles.headlineContainer}>
                    <Text style={styles.headline}>
                        Delicious food,{'\n'}
                        <Text style={styles.headlineAccent}>zero waste.</Text>
                    </Text>
                    <Text style={styles.subheadline}>
                        Join the movement to rescue surplus meals from local favorites at a fraction of the price.
                    </Text>
                </View>

                {/* CTAs */}
                <View style={styles.ctaContainer}>
                    <Button
                        title="Find Deals Near Me"
                        onPress={() => navigation.navigate('PhoneAuth')}
                        icon="restaurant"
                        iconRight="arrow-forward"
                        variant="primary"
                    />

                    <Button
                        title="Become a Partner"
                        onPress={() => navigation.navigate('MerchantDashboard')}
                        icon="storefront"
                        variant="secondary"
                    />
                </View>

                {/* Login Link */}
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                        Already a member?{' '}
                        <Text style={styles.loginLink} onPress={() => navigation.navigate('BuyerHome')}>
                            Log In
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark,
    },
    heroContainer: {
        height: SCREEN_HEIGHT * 0.55,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    logoContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingTop: spacing.xl,
    },
    logo: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.textPrimary,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    logoAccent: {
        color: colors.primary,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.xxl,
        marginTop: -spacing.xxxl,
    },
    featuresContainer: {
        paddingVertical: spacing.lg,
        gap: spacing.md,
    },
    featureItem: {
        alignItems: 'center',
        width: 112,
        marginRight: spacing.md,
    },
    featureImageContainer: {
        width: '100%',
        aspectRatio: 4 / 5,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    featureImage: {
        width: '100%',
        height: '100%',
    },
    featureOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    featureTitle: {
        color: colors.primary,
        fontSize: fontSize.xs,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: spacing.sm,
    },
    headlineContainer: {
        alignItems: 'center',
        marginVertical: spacing.lg,
    },
    headline: {
        fontSize: fontSize.display,
        fontWeight: '700',
        color: colors.textPrimary,
        textAlign: 'center',
        lineHeight: 36,
    },
    headlineAccent: {
        color: colors.primary,
    },
    subheadline: {
        fontSize: fontSize.md,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: spacing.md,
        lineHeight: 22,
        maxWidth: 320,
    },
    ctaContainer: {
        gap: spacing.md,
        marginTop: 'auto',
        marginBottom: spacing.lg,
    },
    loginContainer: {
        alignItems: 'center',
        paddingBottom: spacing.xxxl,
    },
    loginText: {
        fontSize: fontSize.sm,
        color: colors.textSecondary,
    },
    loginLink: {
        color: colors.textPrimary,
        fontWeight: '600',
    },
});
