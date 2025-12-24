import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../api/groqService';
import { SPACING } from '../constants/theme';
import { useTheme } from '../hooks/useTheme';

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.role === 'user';
    const { colors } = useTheme();

    return (
        <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
            <View
                style={[
                    styles.bubble,
                    isUser
                        ? { backgroundColor: colors.userBubble, borderBottomRightRadius: 4 }
                        : { backgroundColor: colors.aiBubble, borderBottomLeftRadius: 4 },
                ]}
            >
                <Text style={[styles.text, isUser ? { color: colors.userText } : { color: colors.aiText }]}>
                    {message.content}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: SPACING.xs,
        flexDirection: 'row',
        width: '100%',
    },
    userContainer: {
        justifyContent: 'flex-end',
    },
    aiContainer: {
        justifyContent: 'flex-start',
    },
    bubble: {
        padding: SPACING.sm + 4,
        borderRadius: 20,
        maxWidth: '80%',
    },
    text: {
        fontSize: 16,
        lineHeight: 20,
    },
});

export default MessageBubble;
