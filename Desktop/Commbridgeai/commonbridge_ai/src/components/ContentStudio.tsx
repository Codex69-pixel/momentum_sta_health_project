import React, { useState, useRef } from 'react';
import { Search, Menu, Send, Paperclip, Mic, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { generateAIResponse } from '../services/aiService';

const SidebarItem: React.FC<{title: string; time: string; active?: boolean}> = ({ title, time, active }) => (
	<div className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-slate-700 ring-1 ring-cyan-500' : 'hover:bg-slate-800'}`}>
		<div className="flex items-center space-x-3">
			<div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-cyan-400">●</div>
			<div>
				<div className="text-sm font-medium text-slate-100">{title}</div>
				<div className="text-xs text-slate-400">{time}</div>
			</div>
		</div>
	</div>
);

const ActionCard: React.FC<{label: string; onClick?: () => void}> = ({ label, onClick }) => (
	<button onClick={onClick} className="w-full text-left p-6 rounded-xl bg-slate-800 hover:bg-slate-700 transition-shadow shadow-inner" aria-label={label}>
		<div className="text-sm text-cyan-300 mb-2">●</div>
		<div className="text-white font-semibold">{label}</div>
	</button>
);

const ContentStudio: React.FC = () => {
	const [showSidebar, setShowSidebar] = useState(false);
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState<Array<{id: string; role: 'user'|'assistant'; content: string}>>([]);
	const sendingRef = useRef(false);
	const targetLanguage = useSelector((state: RootState) => state.app.targetLanguage);

	const toggleSidebar = () => setShowSidebar(v => !v);

	const sendMessage = async (prefill?: string) => {
		const text = prefill !== undefined ? prefill : input.trim();
		if (!text || sendingRef.current) return;
		sendingRef.current = true;

		const userId = Date.now().toString();
		setMessages(prev => [...prev, { id: userId, role: 'user', content: text }]);
		setInput('');

		try {
			const aiResp = await generateAIResponse(text, targetLanguage || 'en');
			// Build a readable assistant content (primary + alternatives)
			let assistantContent = '';
			if (aiResp.translations) {
				assistantContent += `Primary (${targetLanguage}): ${aiResp.translations[targetLanguage] || aiResp.translations.en}\n\n`;
				assistantContent += 'Alternatives:\n';
				Object.entries(aiResp.translations).forEach(([lang, t]) => {
					assistantContent += `• ${lang}: ${t}\n`;
				});
				assistantContent += '\n';
			}
			if (aiResp.copyVariants) {
				assistantContent += `Short: ${aiResp.copyVariants.short}\n`;
			}

			const assistantId = (Date.now() + 1).toString();
			setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: assistantContent }]);
		} catch (err) {
			setMessages(prev => [...prev, { id: (Date.now()+2).toString(), role: 'assistant', content: 'Error generating response' }]);
		} finally {
			sendingRef.current = false;
		}
	};

	return (
		<div className="min-h-screen flex bg-slate-900 text-slate-100">
			{/* Mobile sidebar overlay */}
			{showSidebar && (
				<div onClick={() => setShowSidebar(false)} className="md:hidden fixed inset-0 z-40 bg-black/50">
					<div onClick={(e) => e.stopPropagation()} className="w-72 h-full bg-[#0b1220] border-r border-slate-800 p-4">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md flex items-center justify-center text-black font-bold">◐</div>
								<div>
									<div className="text-cyan-300 font-semibold">CommBridge</div>
									<div className="text-xs text-slate-500">AI Assistant</div>
								</div>
							</div>
							<button onClick={() => setShowSidebar(false)} aria-label="Close sidebar" className="p-2 rounded-md bg-slate-800"><X size={16} /></button>
						</div>

						<div className="mb-3">
							<div className="relative">
								<input placeholder="Search conversations..." className="w-full bg-slate-800 placeholder:text-slate-500 rounded-lg py-2 px-3 text-sm" />
								<div className="absolute right-3 top-2 text-slate-500"><Search size={16} /></div>
							</div>
						</div>

						<div className="space-y-2">
							<SidebarItem title="Translation project help" time="2m ago" active />
							<SidebarItem title="Meeting summary request" time="1h ago" />
							<SidebarItem title="Email draft assistance" time="3h ago" />
						</div>
					</div>
				</div>
			)}
			{/* Sidebar */}
			<aside className="w-72 bg-[#0b1220] border-r border-slate-800 hidden md:flex flex-col">
				<div className="p-4 border-b border-slate-800">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md flex items-center justify-center text-black font-bold">◐</div>
							<div>
								<div className="text-cyan-300 font-semibold">CommBridge</div>
								<div className="text-xs text-slate-500">AI Assistant</div>
							</div>
						</div>
						<button className="p-1 rounded-md bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-medium">+ New Chat</button>
					</div>
				</div>

				<div className="p-3">
					<div className="relative">
						<input placeholder="Search conversations..." className="w-full bg-slate-800 placeholder:text-slate-500 rounded-lg py-2 px-3 text-sm" />
						<div className="absolute right-3 top-2 text-slate-500"><Search size={16} /></div>
					</div>
				</div>

				<div className="p-3 flex-1 overflow-y-auto space-y-2">
					<SidebarItem title="Translation project help" time="2m ago" active />
					<SidebarItem title="Meeting summary request" time="1h ago" />
					<SidebarItem title="Email draft assistance" time="3h ago" />
					<SidebarItem title="Code documentation" time="Yesterday" />
					<SidebarItem title="Market research analysis" time="2 days ago" />
					<SidebarItem title="Content writing ideas" time="3 days ago" />
				</div>
			</aside>

			{/* Main content */}
			<main className="flex-1 relative">
				<header className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
						<div className="flex items-center space-x-3">
							<button onClick={toggleSidebar} className="md:hidden p-2 rounded-md bg-slate-800" aria-label="Toggle sidebar"><Menu size={18} /></button>
							<div className="text-cyan-300 font-semibold">CommBridge AI</div>
						</div>
					<div className="text-sm text-slate-400 hidden md:block">&nbsp;</div>
				</header>

				<div className="px-4 py-10 sm:py-16 lg:py-24 flex items-center justify-center">
					<div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
						<div className="mb-6">
							<div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-black text-lg font-bold shadow-lg">◐</div>
						</div>
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 tracking-tight">CommBridge AI</h1>
						<p className="mt-3 sm:mt-4 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">Your intelligent assistant for seamless communication across languages and platforms</p>

						<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
							<ActionCard label="Help me translate a document" onClick={() => setInput("Please translate the following document:")} />
							<ActionCard label="Draft a professional email" onClick={() => setInput("Draft a professional email about:")} />
							<ActionCard label="Summarize meeting notes" onClick={() => setInput("Summarize the following meeting notes:")} />
							<ActionCard label="Improve message clarity" onClick={() => setInput("Improve the clarity of this message:")} />
						</div>
					</div>
				</div>

				{/* Bottom input bar */}
					<div className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none">
						<div className="w-[min(1100px,96%)] sm:w-[min(900px,92%)] pointer-events-auto bg-slate-800 border border-slate-700 rounded-3xl p-3 flex items-center space-x-3">
							<input aria-label="Chat input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }} className="flex-1 bg-transparent placeholder:text-slate-500 text-slate-100 outline-none px-3 py-2" placeholder="Ask CommBridge AI anything..." />
							<div className="flex items-center space-x-2">
								<button aria-label="Attach file" className="p-2 rounded-md text-slate-300 hover:text-white"><Paperclip size={18} /></button>
								<button aria-label="Voice input" className="p-2 rounded-md text-slate-300 hover:text-white"><Mic size={18} /></button>
								<button aria-label="Send message" onClick={() => sendMessage()} className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl text-black"><Send size={16} /></button>
							</div>
						</div>
					</div>

					{/* In-page small chat panel above input (shows last messages) */}
					<div className="fixed bottom-24 left-0 right-0 flex justify-center pointer-events-none">
						<div className="w-[min(1100px,92%)] pointer-events-auto max-h-72 overflow-y-auto bg-slate-800 border border-slate-700 rounded-xl p-3 space-y-2">
							{messages.length === 0 ? (
								<div className="text-slate-500 text-sm">No messages yet — use the input to start a chat.</div>
							) : (
								messages.slice(-6).map(m => (
									<div key={m.id} className={`p-2 rounded-md ${m.role === 'user' ? 'bg-slate-700 text-slate-100 self-end' : 'bg-slate-900 text-slate-200'}`}>
										<div className="text-xs opacity-70">{m.role === 'user' ? 'You' : 'Assistant'}</div>
										<div className="whitespace-pre-wrap text-sm">{m.content}</div>
									</div>
								))
							)}
						</div>
					</div>
			</main>
		</div>
	);
};

export default ContentStudio;
