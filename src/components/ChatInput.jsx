import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard, Text } from 'react-native';
import { SPACING } from '../constants/theme';
import { useTheme } from '../hooks/useTheme';

const ChatInput = ({ onSendMessage, disabled }) => {
    const [text, setText] = useState('');
    const { colors } = useTheme();

    const handleSend = () => {
        if (text.trim()) {
            onSendMessage(text.trim());
            setText('');
            Keyboard.dismiss();
        }
    };

    return (
        <View style={[styles.container, { borderTopColor: colors.border, backgroundColor: colors.background }]}>
            <TextInput
                style={[styles.input, { backgroundColor: colors.secondary, color: colors.text }]}
                placeholder="Type a message..."
                placeholderTextColor={colors.textSecondary}
                value={text}
                onChangeText={setText}
                multiline
                editable={!disabled}
            />
            <TouchableOpacity
                style={[
                    styles.sendButton,
                    { backgroundColor: colors.primary },
                    (!text.trim() || disabled) && { backgroundColor: colors.textSecondary },
                ]}
                onPress={handleSend}
                disabled={!text.trim() || disabled}
            >
                <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: SPACING.sm,
        borderTopWidth: 1,
        alignItems: 'flex-end',
    },
    input: {
        flex: 1,
        borderRadius: 20,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        paddingTop: SPACING.sm,
        fontSize: 16,
        marginRight: SPACING.sm,
        maxHeight: 100,
    },
    sendButton: {
        borderRadius: 20,
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default ChatInput;
