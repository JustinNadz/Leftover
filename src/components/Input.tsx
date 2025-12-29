import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps,
    ViewStyle,
    Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, borderRadius, spacing, fontSize } from '../theme';

interface InputProps extends TextInputProps {
    icon?: keyof typeof MaterialIcons.glyphMap;
    iconRight?: keyof typeof MaterialIcons.glyphMap;
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
    icon,
    iconRight,
    label,
    error,
    containerStyle,
    style,
    ...props
}) => {
    return (
        <View style={containerStyle}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.container, error && styles.containerError]}>
                {icon && (
                    <MaterialIcons
                        name={icon}
                        size={20}
                        color={colors.textSecondary}
                        style={styles.iconLeft}
                    />
                )}
                <TextInput
                    style={[
                        styles.input,
                        icon ? styles.inputWithIconLeft : undefined,
                        iconRight ? styles.inputWithIconRight : undefined,
                        style,
                    ]}
                    placeholderTextColor={colors.placeholderGreen}
                    {...props}
                />
                {iconRight && (
                    <MaterialIcons
                        name={iconRight}
                        size={20}
                        color={colors.textSecondary}
                        style={styles.iconRight}
                    />
                )}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surfaceDark,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.borderDark,
        height: 56,
    },
    containerError: {
        borderColor: colors.error,
    },
    label: {
        color: colors.textSecondary,
        fontSize: fontSize.sm,
        fontWeight: '600',
        marginBottom: spacing.sm,
    },
    input: {
        flex: 1,
        height: '100%',
        color: colors.textPrimary,
        fontSize: fontSize.md,
        paddingHorizontal: spacing.lg,
    },
    inputWithIconLeft: {
        paddingLeft: 0,
    },
    inputWithIconRight: {
        paddingRight: 0,
    },
    iconLeft: {
        marginLeft: spacing.lg,
        marginRight: spacing.sm,
    },
    iconRight: {
        marginRight: spacing.lg,
        marginLeft: spacing.sm,
    },
    error: {
        color: colors.error,
        fontSize: fontSize.sm,
        marginTop: spacing.xs,
    },
});
