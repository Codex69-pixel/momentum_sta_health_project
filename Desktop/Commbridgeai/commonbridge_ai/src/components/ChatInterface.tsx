import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Send, Mic, Image, Languages } from 'lucide-react';
import { generateAIResponse } from '../services/aiService';
import { setLanguage } from '../store/slice';
import LanguageSelector from './LanguageSelector';
import type { RootState } from '../store/store';

interface AIResponse {
  translations?: Record<string, string>;
  copyVariants?: { short: string; standard: string; expanded: string };
  insights?: string[];
  hashtags?: string[];
  imageBriefs?: string[];
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isComplete?: boolean;
  aiResponse?: AIResponse;
}

const ChatInterface: React.FC = () => {
  const dispatch = useDispatch();
  const targetLanguage = useSelector((state: RootState) => state.app.targetLanguage);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, streamingText]);

  // Initialize with welcome
  useEffect(() => {
    const welcomeMsg: Message = {
      id: '0',
      role: 'assistant',
      content: `👋 Hello! I'm CommBridge AI, your personal communication companion.

I'm here to help you craft, optimize, and share your message across any platform, in any language.

**What I can help with:**
• 📱 Tweets, threads, and social media posts
• 💼 Professional emails and LinkedIn content
• 🌍 Multilingual communication (Spanish, French, Portuguese, etc.)
• 💡 Content optimization for maximum engagement
• 🎯 Platform-specific messaging (Twitter, LinkedIn, Blog)
• 🏷️ Hashtag suggestions and trending topics
• 🖼️ Visual content ideas and image briefs

**Just start typing!** Share your message, and I'll help you communicate it better to reach your exact audience. 🚀`,
      timestamp: new Date(),
      isComplete: true
    };
    setConversation([welcomeMsg]);
  }, []);

  const simulateTyping = async (text: string, onChar: (char: string) => void) => {
    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2));
      onChar(text[i]);
    }
  };

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
      isComplete: true
    };

    setConversation(prev => [...prev, userMsg]);
    setMessage('');
    setIsLoading(true);
    setStreamingText('');

    try {
      const aiResponse = await generateAIResponse(message, targetLanguage);
      const assistantId = (Date.now() + 1).toString();

      let formattedResponse = `📊 **Communication Analysis**\n\n`;

      if (aiResponse.translations) {
        formattedResponse += `🌍 **Primary Language Version:**\n`;
        formattedResponse += `  ${aiResponse.translations[targetLanguage] || aiResponse.translations.en}\n\n`;
        formattedResponse += `**Alternative Translations:**\n`;
        Object.entries(aiResponse.translations).forEach(([lang, text]) => {
          if (lang !== targetLanguage && lang !== 'en') {
            const langName = { en: 'English', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', ja: 'Japanese', zh: 'Chinese', ko: 'Korean', ar: 'Arabic', hi: 'Hindi' }[lang] || lang;
            formattedResponse += `  • **${langName}:** ${text}\n`;
          }
        });
        if (targetLanguage !== 'en' && aiResponse.translations.en) {
          formattedResponse += `  • **English:** ${aiResponse.translations.en}\n`;
        }
        formattedResponse += '\n';
      }

      if (aiResponse.copyVariants) {
        formattedResponse += `✏️ **Platform-Optimized Versions:**\n`;
        formattedResponse += `  • **📱 Twitter/Short:** ${aiResponse.copyVariants.short}\n`;
        formattedResponse += `  • **💼 LinkedIn/Professional:** ${aiResponse.copyVariants.standard}\n`;
        formattedResponse += `  • **📝 Blog/Expanded:** ${aiResponse.copyVariants.expanded}\n\n`;
      }

      if (aiResponse.insights && aiResponse.insights.length > 0) {
        formattedResponse += `💡 **Engagement Insights:**\n`;
        aiResponse.insights.forEach(insight => {
          formattedResponse += `  • ${insight}\n`;
        });
        formattedResponse += '\n';
      }

      if (aiResponse.hashtags && aiResponse.hashtags.length > 0) {
        formattedResponse += `#️⃣ **Suggested Hashtags:**\n`;
        formattedResponse += `  ${aiResponse.hashtags.join('  ')}\n\n`;
      }

      if (aiResponse.imageBriefs && aiResponse.imageBriefs.length > 0) {
        formattedResponse += `🖼️ **Visual Content Ideas:**\n`;
        aiResponse.imageBriefs.forEach(brief => {
          formattedResponse += `  • ${brief}\n`;
        });
      }

      const assistantMsg: Message = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isComplete: false,
        aiResponse
      };

      setConversation(prev => [...prev, assistantMsg]);

      await simulateTyping(formattedResponse, (char) => {
        setStreamingText(prev => prev + char);
      });

      setConversation(prev =>
        prev.map(msg =>
          msg.id === assistantId
            ? { ...msg, content: formattedResponse, isComplete: true }
            : msg
        )
      );

      setStreamingText('');
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '😕 Sorry, something went wrong. Please try again.',
        timestamp: new Date(),
        isComplete: true
      };
      setConversation(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Language Selector */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-sm text-gray-600">Select target language for responses:</div>
          <LanguageSelector 
            label="Target Language" 
            value={targetLanguage}
            onChange={(lang) => {
              dispatch(setLanguage({ target: lang }));
            }}
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="max-w-5xl mx-auto space-y-4">
          {conversation.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              {msg.role === 'user' ? (
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-3xl rounded-tr-none max-w-2xl p-4 shadow-md">
                  <p className="text-base leading-relaxed break-words">{msg.content}</p>
                  <p className="text-xs text-blue-100 mt-2 opacity-70">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ) : (
                <div className="bg-white border-2 border-gray-200 rounded-3xl rounded-tl-none max-w-3xl p-6 shadow-md">
                  {isLoading && index === conversation.length - 1 && streamingText ? (
                    <div className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                      {streamingText}
                      <span className="animate-pulse ml-1">▊</span>
                    </div>
                  ) : (
                    <div className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                      {msg.content.split('\n').map((line, lineIdx) => {
                        const parts = line.split(/(\*\*[^*]+\*\*)/);
                        return (
                          <div key={lineIdx}>
                            {parts.map((part, partIdx) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                  <strong key={partIdx} className="font-bold text-gray-900">
                                    {part.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return <span key={partIdx}>{part}</span>;
                            })}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {msg.isComplete && msg.content && (
                    <button
                      onClick={() => copyToClipboard(msg.content)}
                      className="mt-4 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium transition-all"
                    >
                      📋 Copy All
                    </button>
                  )}

                  <p className="text-xs text-gray-500 mt-3 opacity-70">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              )}
            </div>
          ))}

          {isLoading && !streamingText && (
            <div className="flex justify-start">
              <div className="bg-white border-2 border-gray-200 rounded-3xl rounded-tl-none p-6">
                <div className="flex items-center gap-2">
                  <div className="animate-bounce bg-blue-600 rounded-full w-2 h-2" style={{ animationDelay: '0s' }} />
                  <div className="animate-bounce bg-blue-600 rounded-full w-2 h-2" style={{ animationDelay: '0.2s' }} />
                  <div className="animate-bounce bg-blue-600 rounded-full w-2 h-2" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 shadow-2xl">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end gap-3 mb-2">
            <div className="flex gap-2">
              <button
                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                title="Voice input (coming soon)"
              >
                <Mic size={20} />
              </button>
              <button
                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                title="Image upload (coming soon)"
              >
                <Image size={20} />
              </button>
              <button
                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                title="Language selection (coming soon)"
              >
                <Languages size={20} />
              </button>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="What do you want to communicate? (Shift+Enter for new line)"
              className="flex-1 bg-gray-50 border-2 border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 transition-all resize-none max-h-24 font-medium"
              rows={1}
            />

            <button
              onClick={handleSend}
              disabled={isLoading || !message.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message (Enter)"
            >
              <Send size={20} />
            </button>
          </div>

          <p className="text-xs text-gray-500 px-3">
            💡 Tip: Describe what you want to say, who you're reaching, and the context. I'll help optimize it for any platform or language!
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatInterface;
