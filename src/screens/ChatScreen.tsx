import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Text,
    Alert,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import TypingAnimation from '../components/TypingAnimation';
import { Message, sendMessageToGroq } from '../api/groqService';
import { SPACING } from '../constants/theme';
import { useTheme } from '../hooks/useTheme';

const STORAGE_KEY = '@chat_messages';

const ChatScreen: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Hello! I am your AI assistant powered by Groq. How can I help you today?',
        },
    ]);
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef<FlatList>(null);
    const { colors, isDarkMode } = useTheme();

    useEffect(() => {
        loadMessages();
    }, []);

    useEffect(() => {
        saveMessages(messages);
    }, [messages]);

    const loadMessages = async () => {
        try {
            const savedMessages = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            }
        } catch (error) {
            console.error('Failed to load messages', error);
        }
    };

    const saveMessages = async (msgs: Message[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
        } catch (error) {
            console.error('Failed to save messages', error);
        }
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSendMessage = async (content: string) => {
        const userMessage: Message = { role: 'user', content };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setLoading(true);

        try {
            const response = await sendMessageToGroq(updatedMessages);
            setMessages([...updatedMessages, response]);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        Alert.alert('Clear Chat', 'Are you sure you want to clear the conversation history?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Clear',
                style: 'destructive',
                onPress: async () => {
                    const initialMessage: Message[] = [
                        {
                            role: 'assistant',
                            content: 'Hello! I am your AI assistant powered by Groq. How can I help you today?',
                        },
                    ];
                    setMessages(initialMessage);
                    await AsyncStorage.removeItem(STORAGE_KEY);
                },
            },
        ]);
    };

    const renderItem = ({ item }: { item: Message }) => <MessageBubble message={item} />;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />
            <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>GPTClone</Text>
            </View>

            <View style={[styles.actionBar, { backgroundColor: colors.secondary, borderBottomColor: colors.border }]}>
                <Text style={[styles.modelInfo, { color: colors.textSecondary }]}>Model: llama-3.3-70b</Text>
                <TouchableOpacity onPress={clearChat} style={styles.clearButton}>
                    <Text style={[styles.clearButtonText, { color: colors.error }]}>Clear Chat</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={styles.messageList}
                    onContentSizeChange={scrollToBottom}
                />

                {loading && (
                    <View style={styles.loadingContainer}>
                        <TypingAnimation />
                        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>AI is thinking...</Text>
                    </View>
                )}

                <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: SPACING.md,
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    actionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderBottomWidth: 1,
    },
    modelInfo: {
        fontSize: 12,
        fontWeight: '500',
    },
    clearButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    clearButtonText: {
        fontSize: 12,
        fontWeight: '600',
    },
    keyboardView: {
        flex: 1,
    },
    messageList: {
        padding: SPACING.md,
        paddingBottom: SPACING.xl,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
    },
    loadingText: {
        marginLeft: SPACING.sm,
        fontStyle: 'italic',
    },
});

export default ChatScreen;
