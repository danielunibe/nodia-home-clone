'use client';
import React, { useEffect, useRef } from 'react';

export const BackgroundShader = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) return;

        // Vertex Shader
        const vsSource = `
            attribute vec4 aVertexPosition;
            void main() {
                gl_Position = aVertexPosition;
            }
        `;

        // Fragment Shader (Fondo Dinámico tipo "Fluid Windows")
        const fsSource = `
            precision highp float;
            uniform float uTime;
            uniform vec2 uResolution;

            void main() {
                vec2 uv = gl_FragCoord.xy / uResolution.xy;
                float color1 = sin(uv.x * 10.0 + uTime * 0.5) * 0.5 + 0.5;
                float color2 = cos(uv.y * 10.0 + uTime * 0.3) * 0.5 + 0.5;
                
                vec3 finalColor = mix(
                    vec3(0.02, 0.03, 0.05), // Azul muy profundo
                    vec3(0.05, 0.08, 0.12), // Azul Nodia
                    (color1 * color2) * 0.3
                );

                // Grano sutil para estética cinematográfica
                float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
                finalColor += noise * 0.015;

                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        // Compilación y Linkeado
        const loadShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        };

        const vertexShader = loadShader(gl.VERTEX_SHADER, vsSource);
        const fragmentShader = loadShader(gl.FRAGMENT_SHADER, fsSource);

        const program = gl.createProgram();
        if (!program || !vertexShader || !fragmentShader) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        // Geometría (Pantalla completa redundante)
        const vertices = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1,
        ]);

        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const positionAttrib = gl.getAttribLocation(program, 'aVertexPosition');
        gl.enableVertexAttribArray(positionAttrib);
        gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

        const timeUniform = gl.getUniformLocation(program, 'uTime');
        const resUniform = gl.getUniformLocation(program, 'uResolution');

        const render = (time: number) => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
            
            gl.uniform1f(timeUniform, time * 0.001);
            gl.uniform2f(resUniform, canvas.width, canvas.height);
            
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="fixed inset-0 w-full h-full -z-10" 
            style={{ filter: 'blur(30px)' }} // Refuerza el look de fondo orgánico
        />
    );
};
