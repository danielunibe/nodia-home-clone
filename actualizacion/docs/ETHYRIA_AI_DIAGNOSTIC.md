# Diagnóstico y Parche: Fuga de Prompts y Alucinación en Ethyria (Gemma 4 2B)

## Problema detectado

Se ha identificado una cascada de alucinaciones críticas con Gemma 4 2B en el asistente local Ethyria. El modelo está tratando las reglas del *system prompt* como contenido a formatear en lugar de como instrucciones de comportamiento (ej: responde con "Sure! Here's a revised version with a more formal tone: Pronunciamiento..."). Además, se mezcla con texto incoherente (letras de canciones).

### Causas Raíz Identificadas:

1. **System Prompt en Español Descriptivo:** El formato narrativo en español (`"Nunca: Responde en el lenguaje..."`) confunde al modelo 2B.
2. **Ausencia de Retry Silencioso en `PROVIDER_OLLAMA_LEGACY`:** Si ocurre un error o alucinación, no se gatilla el reintento.
3. **Filtro de Leaks Incompleto:** La función `looks_like_contract_leak` no captura patrones como `"Sure! Here's a revised version"`.
4. **Fallback del Frontend Inseguro:** `useOllamaFallback.tsx` usa un system prompt débil y no fija explícitamente la temperatura.
5. **Temperatura Alta (0.45):** Es excesiva para un modelo de 2B enfrentado a un input emocional o ambiguo.

---

## Plan de Intervención Quirúrgica (Parches)

### PATCH 1 — Backend (Rust Tauri) `src-tauri/src/commands/ai.rs`

1. **Reescritura de `build_ethyria_system_prompt`**: 
   * Usar imperativos en inglés (tienen mayor peso cognitivo para Gemma).
   * Añadir como ancla el idioma: `"Responde siempre en español mexicano natural. Nunca en inglés."`.
2. **Actualización de `looks_like_contract_leak`**:
   * Incluir patrones específicos detectados en las alucinaciones (e.g., `"pronunciamiento:"`, `"respond en el lenguaje"`, `"here's a revised version"`).
3. **Corrección de Retry en OLLAMA_LEGACY**:
   * Permitir que el provider legacy intente de nuevo en caso de detectar una respuesta inválida bajando la temperatura.
4. **Nuevo `build_reinforced_system_prompt`**:
   * Prompt de emergencia ultra-minimalista para el segundo intento.
5. **Ajuste del Temperatura y Few-Shot**:
   * Añadir ejemplos *few-shot* para manejar intenciones emocionales (ej: `"estoy un poco angustiado"`).
   * Reducir la temperatura base a `0.3` (bajando a `0.2` en el retry).

### PATCH 2 — Frontend (Next.js) `useOllamaFallback.tsx` y `chatUtils.ts`

1. **Mejora del System Prompt en Fallback**:
   * Igualar la fuerza de las instrucciones imperativas en inglés al del backend.
2. **Temperatura Explícita en la API**:
   * Forzar las opciones `temperature: 0.3`, `top_k: 35` en `sendMessageToOllama`.
3. **Ampliaciones en `isPromptLeakText`**:
   * Agregar validaciones sólidas de falsos positivos en el frontend basándose en combinaciones de coincidencias.

### PATCH 3 — Core Personality `personality/base_system_prompt.rs`

1. **Reestructuración a nivel base**:
   * Mantener la longitud del prompt por debajo de 100 tokens. Puras reglas "ALWAYS" y "NEVER" en inglés, con sólo una orden en español para asegurar la lengua.

---

## Pasos de Ejecución para Implementación (Pipeline)

Para aplicar estas reparaciones a través de la CLI/Rust y Next.js:

1. Reescribir `base_system_prompt()` → *Patch 3*
2. Reescribir `build_ethyria_system_prompt()` → *Patch 1a*
3. Añadir `build_reinforced_system_prompt()` → *Patch 1d*
4. Ampliar `looks_like_contract_leak()` → *Patch 1b*
5. Corregir el retry de `OLLAMA_LEGACY` → *Patch 1c*
6. Añadir few-shot emocional en `ollama_legacy_chat_completion` → *Patch 1e*
7. Bajar temperatura base a `0.3` → *Patch 1f*
8. Reescribir system prompt en `useOllamaFallback.tsx` → *Patch 2a*
9. Añadir `options { temperature: 0.3 }` en `sendMessageToOllama` → *Patch 2b*
10. Ampliar `isPromptLeakText` en `chatUtils.ts` → *Patch 2c*
11. Compilar con `cargo build --release` y probar la interacción de IA con inputs emocionales ambiguos.
