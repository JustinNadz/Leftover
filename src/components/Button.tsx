import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, borderRadius, fontSize, spacing } from '../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    icon?: keyof typeof MaterialIcons.glyphMap;
    iconRight?: keyof typeof MaterialIcons.glyphMap;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'lg',
    icon,
    iconRight,
    loading = false,
    disabled = false,
    style,
    textStyle,
    fullWidth = true,
}) => {
    const getContainerStyle = (): ViewStyle[] => {
        const base: ViewStyle[] = [styles.base];

        // Size
        if (size === 'sm') base.push(styles.sizeSm);
        else if (size === 'md') base.push(styles.sizeMd);
        else base.push(styles.sizeLg);

        // Variant
        if (variant === 'primary') base.push(styles.primary);
        else if (variant === 'secondary') base.push(styles.secondary);
        else base.push(styles.outline);

        if (fullWidth) base.push(styles.fullWidth);
        if (disabled) base.push(styles.disabled);
        if (style) base.push(style);

        return base;
    };

    const getTextStyle = (): TextStyle[] => {
        const base: TextStyle[] = [styles.text];

        if (size === 'sm') base.push(styles.textSm);
        else if (size === 'md') base.push(styles.textMd);
        else base.push(styles.textLg);

        if (variant === 'primary') base.push(styles.textPrimary);
        else if (variant === 'secondary') base.push(styles.textSecondary);
        else base.push(styles.textOutline);

        if (textStyle) base.push(textStyle);

        return base;
    };

    const getIconColor = (): string => {
        if (variant === 'primary') return colors.backgroundDark;
        return colors.textPrimary;
    };

    return (
        <TouchableOpacity
            style={getContainerStyle()}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={getIconColor()} />
            ) : (
                <>
                    {icon && (
                        <MaterialIcons
                            name={icon}
                            size={size === 'sm' ? 16 : size === 'md' ? 18 : 20}
                            color={getIconColor()}
                            style={{ marginRight: spacing.sm }}
                        />
                    )}
                    <Text style={getTextStyle()}>{title}</Text>
                    {iconRight && (
                        <MaterialIcons
                            name={iconRight}
                            size={size === 'sm' ? 16 : size === 'md' ? 18 : 20}
                            color={getIconColor()}
                            style={{ marginLeft: spacing.sm }}
                        />
                    )}
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.full,
    },
    fullWidth: {
        width: '100%',
    },
    sizeSm: {
        height: 36,
        paddingHorizontal: spacing.lg,
    },
    sizeMd: {
        height: 44,
        paddingHorizontal: spacing.xl,
    },
    sizeLg: {
        height: 56,
        paddingHorizontal: spacing.xxl,
    },
    primary: {
        backgroundColor: colors.primary,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    secondary: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.borderDark,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontWeight: '700',
    },
    textSm: {
        fontSize: fontSize.sm,
    },
    textMd: {
        fontSize: fontSize.md,
    },
    textLg: {
        fontSize: fontSize.lg,
    },
    textPrimary: {
        color: colors.backgroundDark,
    },
    textSecondary: {
        color: colors.textPrimary,
    },
    textOutline: {
        color: colors.textPrimary,
    },
});
