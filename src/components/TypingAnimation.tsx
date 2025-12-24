import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { SPACING } from '../constants/theme';
import { useTheme } from '../hooks/useTheme';

const TypingAnimation = () => {
    const { colors } = useTheme();
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = (dot: Animated.Value, delay: number) => {
            return Animated.sequence([
                Animated.delay(delay),
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(dot, {
                            toValue: 1,
                            duration: 400,
                            useNativeDriver: true,
                        }),
                        Animated.timing(dot, {
                            toValue: 0,
                            duration: 400,
                            useNativeDriver: true,
                        }),
                    ])
                ),
            ]);
        };

        const animation = Animated.parallel([
            animate(dot1, 0),
            animate(dot2, 200),
            animate(dot3, 400),
        ]);

        animation.start();

        return () => animation.stop();
    }, [dot1, dot2, dot3]);

    const dotStyle = (dot: Animated.Value) => ({
        opacity: dot,
        transform: [
            {
                translateY: dot.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -4],
                }),
            },
        ],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.dot, { backgroundColor: colors.textSecondary }, dotStyle(dot1)]} />
            <Animated.View style={[styles.dot, { backgroundColor: colors.textSecondary }, dotStyle(dot2)]} />
            <Animated.View style={[styles.dot, { backgroundColor: colors.textSecondary }, dotStyle(dot3)]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.sm,
        height: 20,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 2,
    },
});

export default TypingAnimation;
