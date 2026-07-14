import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Cpu, Sparkles, BookOpen, PenTool, Layout, Wand2, History, ChevronRight, Terminal, Zap, Hash } from 'lucide-react';
import { NodiaBridge } from '@/services/Bridge';

interface AIAssistantProps {
    isVisible: boolean;
    onClose?: () => void;
}

interface Message {
    id: string;
    sender: 'ai' | 'user';
    text: string;
    type?: 'text' | 'action' | 'system';
    timestamp?: string;
}

const ACTION_CAPSULES = [
    { id: 'draft', label: 'Borrador de Escena', icon: BookOpen, color: 'var(--lime)', detail: 'Generar estructura base' },
    { id: 'nodes', label: 'Explicar Nodos', icon: Layout, color: '#3b82f6', detail: 'Analizar grafo actual' },
    { id: 'continue', label: 'Continuar Historia', icon: Wand2, color: '#a855f7', detail: 'Inferencia predictiva' },
    { id: 'edit', label: 'Modificar Interfaz', icon: PenTool, color: '#f97316', detail: 'Ajustes de sistema' },
];

export const AIAssistant = ({ isVisible, onClose }: AIAssistantProps) => {
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([
        { 
            id: '1', 
            sender: 'ai', 
            text: 'Hola. Soy tu compañero creativo en Nodia. Puedo ayudarte a tejer historias, estructurar el mundo o entender cómo funciona cada herramienta de este entorno. ¿Por dónde empezamos?',
            type: 'text',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (textOverride?: string) => {
        const text = textOverride || inputValue;
        if (!text.trim() || isTyping) return;

        setInputValue('');
        const userMsg: Message = { 
            id: crypto.randomUUID(), 
            sender: 'user', 
            text, 
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        };
        setMessages(prev => [...prev, userMsg]);
        
        setIsTyping(true);
        const response = await NodiaBridge.queryAIAssistant(text);
        setIsTyping(false);

        const aiMsg: Message = { 
            id: crypto.randomUUID(), 
            sender: 'ai', 
            text: response,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
    };

    if (!isVisible) return null;

    return (
        <div 
            className="w-full h-full flex flex-col pointer-events-auto bg-[#14181c] relative overflow-hidden shadow-md"
        >
            {/* Cabecera Técnica */}
            <div className="pt-20 px-10 pb-8 relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 blur-md bg-[var(--lime)]/30 animate-pulse" />
                            <div className="w-10 h-10 rounded-xl bg-[var(--lime)]/10  flex items-center justify-center relative">
                                <Sparkles size={20} className="text-[var(--lime)]" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[15px] tracking-[0.4em] font-black text-white uppercase italic">Nodia Assistant</span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--lime)] animate-pulse" />
                                <span className="text-[9px] text-[var(--lime)]/60 uppercase tracking-[0.2em] font-black">Neural Interface v4.2</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/5  flex items-center justify-center text-white/40 hover:text-white/80 transition-colors cursor-help">
                            <Hash size={14} />
                        </div>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
            </div>
            
            {/* Área de Mensajes con Staggered Entrance */}
            <div className="flex-1 px-10 pb-4 overflow-y-auto flex flex-col gap-8 scrollbar-hide relative z-10">
                {/* Status Monitor Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-[28px] bg-white/[0.02]  backdrop-blur-xl relative overflow-hidden group hover:bg-white/[0.04] transition-all duration-500"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[var(--lime)]/10 flex items-center justify-center text-[var(--lime)] ">
                                <Terminal size={18} />
                            </div>
                            <span className="text-[11px] font-black text-white/80 uppercase tracking-[0.15em]">Estatus de Inferencia</span>
                        </div>
                        <div className="flex gap-1.5 px-2.5 py-1 rounded-full bg-[var(--lime)]/5 ">
                            <Zap size={10} className="text-[var(--lime)]" />
                            <span className="text-[9px] font-bold text-[var(--lime)]">ACTIVE</span>
                        </div>
                    </div>
                    <p className="text-[12px] text-white/40 leading-relaxed font-medium">
                        Model: <span className="text-white/60">Gemma-4-Narrative</span> <br/>
                        Context: <span className="text-white/60">&quot;El Umbral&quot; (Active Chapter)</span>
                    </p>
                </motion.div>

                <AnimatePresence mode="popLayout">
                    {messages.map((msg, index) => (
                        <motion.div 
                            key={msg.id}
                            initial={{ opacity: 0, x: msg.sender === 'ai' ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                            className={`max-w-[92%] p-5 text-[13.5px] leading-relaxed relative group ${
                                msg.sender === 'ai' 
                                    ? 'self-start bg-white/[0.04] text-white/90  rounded-[28px] rounded-tl-none' 
                                    : 'self-end bg-[var(--lime)] text-black font-bold border-[var(--lime)] rounded-[28px] rounded-tr-none shadow-md'
                            }`}
                        >
                            <div className="flex flex-col gap-1">
                                {msg.text}
                                <span className={`text-[9px] mt-2 font-black tracking-widest ${msg.sender === 'ai' ? 'text-white/20' : 'text-black/30'}`}>
                                    {msg.timestamp}
                                </span>
                            </div>
                            
                            {msg.sender === 'ai' && (
                                <button className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 rounded-full hover:bg-white/10 text-white/30 hover:text-[var(--lime)]">
                                    <ChevronRight size={16} />
                                </button>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="self-start flex items-center gap-4 p-5 bg-white/[0.03] border-white/[0.05] rounded-[24px] rounded-tl-none"
                    >
                        <div className="flex gap-1.5">
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-[var(--lime)] rounded-full" />
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-[var(--lime)] rounded-full" />
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-[var(--lime)] rounded-full" />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Acciones Rápidas - Pills con detalle */}
            <div className="px-10 pb-6 flex gap-3 overflow-x-auto scrollbar-hide relative z-10">
                {ACTION_CAPSULES.map((capsule) => (
                    <button
                        key={capsule.id}
                        onClick={() => handleSend(capsule.label)}
                        className="flex flex-col items-start gap-1 p-4 rounded-[20px] bg-white/[0.02]  hover:bg-white/[0.08] hover: transition-all duration-300 whitespace-nowrap group min-w-[140px]"
                    >
                        <capsule.icon size={16} className="mb-2 transition-transform duration-500 group-hover:scale-110" style={{ color: capsule.color }} />
                        <span className="text-[11px] font-black text-white group-hover:text-[var(--lime)] uppercase tracking-wider">{capsule.label}</span>
                        <span className="text-[9px] text-white/30 font-medium">{capsule.detail}</span>
                    </button>
                ))}
            </div>
            
            {/* Input Tactico */}
            <div className="px-10 pb-12 relative z-10">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--lime)]/0 via-[var(--lime)]/10 to-[var(--lime)]/0 rounded-[32px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
                    <div className="relative flex items-center bg-white/[0.03] backdrop-blur-3xl  rounded-[30px] p-2 pr-3 transition-all duration-500 focus-within: focus-within:bg-black/60 shadow-md">
                        <div className="pl-5 pr-1 flex items-center text-white/10 group-focus-within:text-[var(--lime)] transition-colors">
                            <Terminal size={18} />
                        </div>
                        <input 
                            type="text" 
                            className="w-full bg-transparent border-none outline-none text-white text-[14px] px-4 py-4 placeholder:text-white/10 font-bold tracking-tight"
                            placeholder="Escribe un comando o petición narrativa..." 
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                        />
                        <button 
                            className="w-14 h-14 flex items-center justify-center rounded-[24px] bg-[var(--lime)] text-black transition-all duration-500 hover:scale-[1.05] active:scale-95 shadow-md relative overflow-hidden group/btn disabled:opacity-30 disabled:grayscale"
                            onClick={() => handleSend()}
                            disabled={!inputValue.trim() || isTyping}
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                            <Send size={24} strokeWidth={3} className="relative z-10" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
