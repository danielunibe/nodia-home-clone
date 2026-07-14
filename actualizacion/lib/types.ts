/**
 * NODIA / RETRIVER - Core Type System for Pipeline Integration
 */

export type LayerType = 'cronos' | 'sistema' | 'identidad' | 'espacialidad';

export interface Vector2 {
  x: number;
  y: number;
}

export interface Vector3 extends Vector2 {
  z: number;
}

export interface NodePort {
  id: string;
  type: 'input' | 'output' | 'binding';
  label?: string;
}

export interface NodiaNode {
  id: string;
  type: 'dialog' | 'event' | 'condition' | 'metadata' | 'stack';
  label: string;
  position: Vector2;
  content: any;
  layer: LayerType;
  metadata?: Record<string, any>;
  polygon?: {x: number, y: number}[];
  roomHeight?: number;
}

export interface Connection {
  id: string;
  fromNodeId: string;
  fromPortId: string;
  toNodeId: string;
  toPortId: string;
  type: 'narrative' | 'logic' | 'binding';
}

export interface SceneBox {
  id: string;
  label: string;
  position: Vector3;
  dimensions: Vector2;
  layer: 'espacialidad';
}

export interface Scene {
  id: string;
  label: string;
  x: number;
  y: number;
  children?: Scene[];
}

export interface WorldState {
  sceneBoxes: SceneBox[];
  nodes: NodiaNode[];
  connections: Connection[];
  metadata: {
    lastSync: string;
    version: string;
    projectName: string;
  };
}
