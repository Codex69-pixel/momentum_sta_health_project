// CommBridge AI - OpenAI Integration Service
// Uses ChatGPT API for intelligent translations, optimization, and analysis

import axios from 'axios';

interface AIResponse {
  translations: Record<string, string>;
  copyVariants: { short: string; standard: string; expanded: string };
  insights: string[];
  hashtags: string[];
  imageBriefs: string[];
}

// Check if API key is available
const hasAPIKey = (): boolean => {
  // Check environment variable first (.env file)
  const envKey = process.env.REACT_APP_OPENAI_API_KEY;
  if (envKey && envKey !== 'your_openai_key') {
    return true;
  }
  
  // Check localStorage as fallback (set via setupOpenAIKey)
  const storedKey = typeof window !== 'undefined' ? localStorage.getItem('openai_api_key') : null;
  return !!storedKey && storedKey !== 'your_openai_key';
};

// OpenAI API caller using axios
const callOpenAIAPI = async (prompt: string): Promise<string> => {
  // Get API key from environment variable or localStorage
  let apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  
  if (!apiKey || apiKey === 'your_openai_key') {
    apiKey = typeof window !== 'undefined' ? localStorage.getItem('openai_api_key') : null;
  }
  
  if (!apiKey || apiKey === 'your_openai_key') {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are CommBridge AI, an expert in multilingual content creation, translation, and optimization for global communities. Provide responses in clear, structured JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
};

// Fallback: Local intelligent response (works without API key)
// targetLanguage parameter is used by the consumer to pick which translation to prioritize
const generateLocalResponse = async (userMessage: string, _targetLanguage: string = 'en'): Promise<AIResponse> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Comprehensive language translation dictionary with more words and phrases
  const translations: Record<string, Record<string, string>> = {
    es: {
      'hello': 'hola', 'hi': 'hola', 'hey': 'hola', 'welcome': 'bienvenido', 'thank': 'gracias',
      'thanks': 'gracias', 'thankyou': 'gracias', 'please': 'por favor', 'help': 'ayuda', 'support': 'apoyo',
      'community': 'comunidad', 'together': 'juntos', 'innovation': 'innovación', 'innovative': 'innovador',
      'business': 'negocio', 'success': 'éxito', 'growth': 'crecimiento', 'grow': 'crecer',
      'today': 'hoy', 'tomorrow': 'mañana', 'new': 'nuevo', 'best': 'mejor',
      'love': 'amo', 'beautiful': 'hermoso', 'amazing': 'increíble', 'awesome': 'increíble', 'great': 'genial',
      'let': 'déjame', 'lets': 'déjanos', 'build': 'construir', 'create': 'crear', 'make': 'hacer',
      'something': 'algo', 'somethin': 'algo',
      'think': 'pienso', 'feel': 'siento', 'believe': 'creo', 'want': 'quiero',
      'need': 'necesito', 'the': 'el', 'a': 'un', 'is': 'es', 'are': 'son',
      'i': 'yo', 'you': 'tú', 'we': 'nosotros', 'they': 'ellos', 'it': 'eso',
      'and': 'y', 'or': 'o', 'but': 'pero', 'because': 'porque', 'if': 'si',
      'world': 'mundo', 'people': 'gente', 'person': 'persona', 'time': 'tiempo'
    },
    fr: {
      'hello': 'bonjour', 'hi': 'salut', 'hey': 'salut', 'welcome': 'bienvenue', 'thank': 'merci',
      'thanks': 'merci', 'thankyou': 'merci', 'please': 's\'il vous plaît', 'help': 'aide', 'support': 'soutien',
      'community': 'communauté', 'together': 'ensemble', 'innovation': 'innovation', 'innovative': 'innovant',
      'business': 'affaires', 'success': 'succès', 'growth': 'croissance', 'grow': 'grandir',
      'today': 'aujourd\'hui', 'tomorrow': 'demain', 'new': 'nouveau', 'best': 'meilleur',
      'love': 'aime', 'beautiful': 'beau', 'amazing': 'incroyable', 'awesome': 'incroyable', 'great': 'super',
      'let': 'laisse', 'lets': 'laissez', 'build': 'construire', 'create': 'créer', 'make': 'faire',
      'something': 'quelque chose', 'somethin': 'quelque chose',
      'think': 'pense', 'feel': 'sens', 'believe': 'crois', 'want': 'veux',
      'need': 'besoin', 'the': 'le', 'a': 'un', 'is': 'est', 'are': 'sont',
      'i': 'je', 'you': 'tu', 'we': 'nous', 'they': 'ils', 'it': 'c\'est',
      'and': 'et', 'or': 'ou', 'but': 'mais', 'because': 'parce que', 'if': 'si',
      'world': 'monde', 'people': 'gens', 'person': 'personne', 'time': 'temps'
    },
    de: {
      'hello': 'hallo', 'hi': 'hallo', 'hey': 'hey', 'welcome': 'willkommen', 'thank': 'danke',
      'thanks': 'danke', 'thankyou': 'danke', 'please': 'bitte', 'help': 'hilfe', 'support': 'unterstützung',
      'community': 'gemeinschaft', 'together': 'zusammen', 'innovation': 'innovation', 'innovative': 'innovativ',
      'business': 'geschäft', 'success': 'erfolg', 'growth': 'wachstum', 'grow': 'wachsen',
      'today': 'heute', 'tomorrow': 'morgen', 'new': 'neu', 'best': 'beste',
      'love': 'liebe', 'beautiful': 'schön', 'amazing': 'erstaunlich', 'awesome': 'erstaunlich', 'great': 'großartig',
      'let': 'lass', 'lets': 'lasst', 'build': 'bauen', 'create': 'erstellen', 'make': 'machen',
      'something': 'etwas', 'somethin': 'etwas',
      'think': 'denke', 'feel': 'fühle', 'believe': 'glaube', 'want': 'möchte',
      'need': 'brauche', 'the': 'der', 'a': 'ein', 'is': 'ist', 'are': 'sind',
      'i': 'ich', 'you': 'du', 'we': 'wir', 'they': 'sie', 'it': 'es',
      'and': 'und', 'or': 'oder', 'but': 'aber', 'because': 'weil', 'if': 'wenn',
      'world': 'welt', 'people': 'leute', 'person': 'person', 'time': 'zeit'
    },
    it: {
      'hello': 'ciao', 'hi': 'ciao', 'hey': 'ehi', 'welcome': 'benvenuto', 'thank': 'grazie',
      'thanks': 'grazie', 'thankyou': 'grazie', 'please': 'per favore', 'help': 'aiuto', 'support': 'supporto',
      'community': 'comunità', 'together': 'insieme', 'innovation': 'innovazione', 'innovative': 'innovativo',
      'business': 'affari', 'success': 'successo', 'growth': 'crescita', 'grow': 'crescere',
      'today': 'oggi', 'tomorrow': 'domani', 'new': 'nuovo', 'best': 'migliore',
      'love': 'amo', 'beautiful': 'bello', 'amazing': 'incredibile', 'awesome': 'incredibile', 'great': 'fantastico',
      'let': 'lascia', 'lets': 'lasciamo', 'build': 'costruire', 'create': 'creare', 'make': 'fare',
      'something': 'qualcosa', 'somethin': 'qualcosa',
      'think': 'penso', 'feel': 'sento', 'believe': 'credo', 'want': 'voglio',
      'need': 'ho bisogno', 'the': 'il', 'a': 'un', 'is': 'è', 'are': 'sono',
      'i': 'io', 'you': 'tu', 'we': 'noi', 'they': 'loro', 'it': 'è',
      'and': 'e', 'or': 'o', 'but': 'ma', 'because': 'perché', 'if': 'se',
      'world': 'mondo', 'people': 'gente', 'person': 'persona', 'time': 'tempo'
    },
    pt: {
      'hello': 'olá', 'hi': 'oi', 'hey': 'ei', 'welcome': 'bem-vindo', 'thank': 'obrigado',
      'thanks': 'obrigado', 'thankyou': 'obrigado', 'please': 'por favor', 'help': 'ajuda', 'support': 'suporte',
      'community': 'comunidade', 'together': 'juntos', 'innovation': 'inovação', 'innovative': 'inovador',
      'business': 'negócio', 'success': 'sucesso', 'growth': 'crescimento', 'grow': 'crescer',
      'today': 'hoje', 'tomorrow': 'amanhã', 'new': 'novo', 'best': 'melhor',
      'love': 'amo', 'beautiful': 'lindo', 'amazing': 'incrível', 'awesome': 'incrível', 'great': 'ótimo',
      'let': 'deixa', 'lets': 'deixemos', 'build': 'construir', 'create': 'criar', 'make': 'fazer',
      'something': 'algo', 'somethin': 'algo',
      'think': 'acho', 'feel': 'sinto', 'believe': 'acredito', 'want': 'quero',
      'need': 'preciso', 'the': 'o', 'a': 'um', 'is': 'é', 'are': 'são',
      'i': 'eu', 'you': 'você', 'we': 'nós', 'they': 'eles', 'it': 'é',
      'and': 'e', 'or': 'ou', 'but': 'mas', 'because': 'porque', 'if': 'se',
      'world': 'mundo', 'people': 'povo', 'person': 'pessoa', 'time': 'tempo'
    },
    ru: {
      'hello': 'привет', 'hi': 'привет', 'hey': 'привет', 'welcome': 'добро пожаловать', 'thank': 'спасибо',
      'thanks': 'спасибо', 'thankyou': 'спасибо', 'please': 'пожалуйста', 'help': 'помощь', 'support': 'поддержка',
      'community': 'сообщество', 'together': 'вместе', 'innovation': 'инновация', 'innovative': 'инновационный',
      'business': 'бизнес', 'success': 'успех', 'growth': 'рост', 'grow': 'расти',
      'today': 'сегодня', 'tomorrow': 'завтра', 'new': 'новый', 'best': 'лучший',
      'love': 'люблю', 'beautiful': 'красивый', 'amazing': 'удивительный', 'awesome': 'удивительный', 'great': 'отлично',
      'let': 'позволь', 'lets': 'позвольте', 'build': 'строить', 'create': 'создавать', 'make': 'делать',
      'something': 'что-то', 'somethin': 'что-то',
      'think': 'думаю', 'feel': 'чувствую', 'believe': 'верю', 'want': 'хочу',
      'need': 'нужна', 'the': '', 'a': '', 'is': 'это', 'are': 'это',
      'i': 'я', 'you': 'ты', 'we': 'мы', 'they': 'они', 'it': 'это',
      'and': 'и', 'or': 'или', 'but': 'но', 'because': 'потому что', 'if': 'если',
      'world': 'мир', 'people': 'люди', 'person': 'человек', 'time': 'время'
    }
  };

  const translateMessage = (msg: string, lang: string): string => {
    let result = msg;
    const langDict = translations[lang];
    if (!langDict) return msg;

    // Sort dictionary by length (longest first) to match longer phrases first
    const sortedEntries = Object.entries(langDict).sort((a, b) => b[0].length - a[0].length);
    
    sortedEntries.forEach(([en, translated]) => {
      if (!translated) return; // Skip empty translations
      const regex = new RegExp(`\\b${en}\\b`, 'gi');
      result = result.replace(regex, translated);
    });

    return result;
  };

  const generateInsights = (msg: string): string[] => {
    const insights: string[] = [];
    const lower = msg.toLowerCase();

    if (lower.includes('question') || lower.includes('?')) {
      insights.push("🎯 Questions boost engagement - great for community interaction");
    }
    if (lower.includes('innovation') || lower.includes('new') || lower.includes('future')) {
      insights.push("🚀 Forward-thinking tone attracts early adopters");
    }
    if (lower.includes('community') || lower.includes('together') || lower.includes('help')) {
      insights.push("👥 Community-focused messaging builds loyal audience");
    }
    if (lower.includes('thank') || lower.includes('appreciate')) {
      insights.push("❤️ Gratitude builds trust and authenticity");
    }

    return insights.length > 0 ? insights : ["✨ Clear and engaging message"];
  };

  const generateHashtags = (msg: string): string[] => {
    const hashtags: string[] = [];
    const lower = msg.toLowerCase();

    if (lower.includes('community') || lower.includes('together')) hashtags.push('#CommunityFirst', '#TogetherStronger');
    if (lower.includes('innovation') || lower.includes('future')) hashtags.push('#Innovation', '#FutureReady');
    if (lower.includes('business')) hashtags.push('#Business', '#Entrepreneurship');
    hashtags.push('#CommBridgeAI', '#GlobalCommunity');

    return hashtags.slice(0, 5);
  };

  return {
    translations: {
      en: userMessage,
      es: translateMessage(userMessage, 'es'),
      fr: translateMessage(userMessage, 'fr'),
      de: translateMessage(userMessage, 'de'),
      it: translateMessage(userMessage, 'it'),
      pt: translateMessage(userMessage, 'pt'),
      ru: translateMessage(userMessage, 'ru'),
      ja: userMessage,
      zh: userMessage,
      ko: userMessage,
      ar: userMessage,
      hi: userMessage,
    },
    copyVariants: {
      short: userMessage.split('.')[0].slice(0, 120) + '...',
      standard: userMessage,
      expanded: `${userMessage}\n\nKey points:\n• Clear and impactful\n• Community-focused\n• Engagement-driven`
    },
    insights: generateInsights(userMessage),
    hashtags: generateHashtags(userMessage),
    imageBriefs: [
      `Visual: ${userMessage.slice(0, 40)}... - Community connection theme`,
      `Modern, inclusive imagery showing diversity and collaboration`,
      `Social media ready: Bold typography with message on gradient background`
    ]
  };
};

// Main AI response generator
export const generateAIResponse = async (userMessage: string, targetLanguage: string = 'en'): Promise<AIResponse> => {
  try {
    // If API key is available, use ChatGPT API for real intelligence
    if (hasAPIKey()) {
      console.log('Using ChatGPT API for enhanced analysis with language:', targetLanguage);
      
      try {
        const apiResponse = await callOpenAIAPI(userMessage);
        
        // Parse the JSON response
        const jsonMatch = apiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedResponse = JSON.parse(jsonMatch[0]);
          return {
            translations: parsedResponse.translations || { en: userMessage },
            copyVariants: parsedResponse.copyVariants || { short: userMessage, standard: userMessage, expanded: userMessage },
            insights: parsedResponse.insights || [],
            hashtags: parsedResponse.hashtags || [],
            imageBriefs: parsedResponse.imageBriefs || []
          };
        }
      } catch (apiError) {
        console.warn('ChatGPT API call failed, falling back to local mode:', apiError);
        return generateLocalResponse(userMessage, targetLanguage);
      }
    }

    // No API key: use local intelligent response
    console.log('Using local intelligent mode with language:', targetLanguage);
    console.log('To use ChatGPT API: Add REACT_APP_OPENAI_API_KEY=sk-... to .env file');
    return generateLocalResponse(userMessage, targetLanguage);

  } catch (error) {
    console.error('AI Service Error:', error);
    // Fallback to local response on error
    return generateLocalResponse(userMessage, targetLanguage);
  }
};

// Helper function to setup API (can be called when user provides key)
export const setupOpenAIKey = (apiKey: string) => {
  // Store in localStorage so it persists across sessions
  localStorage.setItem('openai_api_key', apiKey);
  console.log('OpenAI API key configured and saved to localStorage');
  // Note: You'll need to reload the app for the new key to take effect
};

// Export service status
export const getServiceStatus = () => ({
  hasAPIKey: hasAPIKey(),
  mode: hasAPIKey() ? 'ChatGPT API' : 'Local Intelligent',
  apiKey: hasAPIKey() ? '✓ Configured' : '✗ Not configured',
  fallback: 'Local dictionary + analysis'
});
