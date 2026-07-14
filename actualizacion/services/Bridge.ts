import { GoogleGenAI } from "@google/genai";
import { NodiaNode, Scene } from '@/lib/types';

// Inicialización de la IA para simular el motor nativo
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "" });

const SYSTEM_INSTRUCTION = `Eres Nodia Retriever, un motor de IA local integrado en una aplicación nativa de Windows (Tauri). 
    Tu backend corre sobre Llama.cpp con aceleración CUDA/DirectML. 
    Ayudas al usuario a gestionar su narrativa y lore. 
    Tus respuestas deben ser técnicas, precisas y con un tono de "sistema operativo pro".`;

/**
 * Interfaz de comunicación entre el frontend (React) 
 * y el backend (Rust/Tauri o Web Prototype).
 */
export const NodiaBridge = {
    // Escenas (Simulación SQLite)
    async getScenes(): Promise<Scene[]> {
        console.log("[IPC Mock] -> invoke('get_scenes')");
        return [
            { 
                id: 's1', label: 'Capítulo 1: El Despertar', x: 200, y: 200, 
                children: [
                    { id: 's1-1', label: 'Habitación del Protagonista', x: 400, y: 150 },
                    { id: 's1-2', label: 'El Pasillo Oscuro', x: 800, y: 300 }
                ]
            },
            { id: 's2', label: 'Capítulo 2: El Encuentro', x: 1500, y: 1000 },
        ];
    },

    // Nodos
    async getNodes(): Promise<NodiaNode[]> {
        return [
            {
                id: 'n_0x4f2a',
                type: 'metadata',
                label: 'NODE METADATA // FS SYNC',
                position: { x: 420, y: 100 },
                layer: 'sistema',
                content: { path: '/acts/act1/dialog_01.md', coord: '[X: 12.4, Y: 0.0, Z: -5.2]' }
            },
            {
                id: 'n_dialog_hero',
                type: 'dialog',
                label: 'FRAGMENT: dialog_01.md',
                position: { x: 580, y: 240 },
                layer: 'identidad',
                content: { 
                    speaker1: 'SPEAKER_01',
                    text1: 'The coordinates are shifting. The SceneBox constraint is breaking down.',
                    speaker2: 'SPEAKER_02',
                    text2: 'Syncing file system... wait.'
                }
            }
        ];
    },

    // IA Local (Simulada vía Gemini para el Prototipo)
    async queryAIAssistant(prompt: string): Promise<string> {
        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            return "[SYS_ERR]: API_KEY no configurada. Simulación de IA offline activa.";
        }

        try {
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
                config: {
                    systemInstruction: SYSTEM_INSTRUCTION
                }
            });
            return response.text || "[ERR]: Respuesta vacía del motor.";
        } catch (error) {
            console.error("AI Bridge Error:", error);
            return "[BACKEND_TIMEOUT]: Error en el Sidecar de Llama.cpp.";
        }
    },

    // Persistencia
    async saveGraph(data: NodiaNode[]): Promise<void> {
        localStorage.setItem('nodia_graph_backup', JSON.stringify(data));
        console.log("[IPC] Graph Synced with virtual SQLite.");
    },

    // Exportación
    async exportToEngine(engine: 'unreal' | 'unity'): Promise<void> {
        console.log(`[IPC] Generando Schema Nativo para ${engine}...`);
        alert(`Exportando a ${engine.toUpperCase()}... Check console for IPC logs.`);
    }
};
