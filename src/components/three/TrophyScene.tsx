"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
  Stars,
  Sparkles,
  Trail,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import * as THREE from "three";

/* ===================================================================
   TrophyScene — cinematic 3D celebration scene for the rewards page.

   Big upgrades over the previous pass:
   • Cinematic camera intro (wide → resting orbit) on first mount
   • Click trophy to zoom in for a closeup, click again to zoom out
   • Real waving cloth ribbon (animated subdivided plane) instead of flat boxes
   • Mirror-floor reflection of the trophy + probes (MeshReflectorMaterial)
   • Procedural nebula sky-sphere replacing the flat backdrop
   • Bloom + vignette + chromatic aberration + ACES tone mapping
   • Engine-trail comets behind each Hope Probe
   • A third probe on a wider polar orbit (over the top)
   • Antenna dishes track Earth in real time
   • Saturn drifts in the distance (with rings) alongside Earth + Mars
   • 36-rock asteroid belt tumbling at varied speeds
   • Shooting stars streak across the sky on a timer
   • Reduced-motion respect: skips intro + auto-rotate on request
   =================================================================== */

const GOLD_DARK = "#7A5C12";
const GOLD_MID = "#A8821F";
const GOLD = "#D4AF37";
const GOLD_LIGHT = "#E8C547";
const GOLD_BRIGHT = "#FFD96B";
const GOLD_GLOW = "#FFB800";
const STAR_PIN = "#FFE9A8";

/* ---------- Trophy ---------- */
function GoldTrophy() {
  const starRef = useRef<THREE.Mesh>(null);
  const cupGlowRef = useRef<THREE.PointLight>(null);
  const ribbonGeomRef = useRef<THREE.PlaneGeometry>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (starRef.current) {
      starRef.current.rotation.y += 0.025;
      const s = 1 + Math.sin(t * 2.2) * 0.07;
      starRef.current.scale.set(s, s, s);
    }
    if (cupGlowRef.current) {
      cupGlowRef.current.intensity = 1.4 + Math.sin(t * 2.6) * 0.4;
    }
    // Wave the ribbon by displacing each vertex along a sine wave
    if (ribbonGeomRef.current) {
      const pos = ribbonGeomRef.current.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // wave amplitude ramps with x so the side closest to the cup stays put
        const wave = Math.sin(x * 6 + t * 3) * 0.03 * (x + 0.6);
        pos.setZ(i, wave);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Wide circular base */}
      <mesh position={[0, -1.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.05, 1.25, 0.22, 64]} />
        <meshStandardMaterial color={GOLD_DARK} metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Decorative ring on base */}
      <mesh position={[0, -1.27, 0]}>
        <torusGeometry args={[1.0, 0.04, 16, 64]} />
        <meshStandardMaterial
          color={GOLD_LIGHT}
          metalness={1}
          roughness={0.05}
          emissive={GOLD}
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* Engraved nameplate disc on the base front (Master Explorer) */}
      <mesh position={[0, -1.34, 1.05]} rotation={[-Math.PI / 2.3, 0, 0]}>
        <ringGeometry args={[0.18, 0.32, 32]} />
        <meshStandardMaterial
          color={GOLD_BRIGHT}
          metalness={1}
          roughness={0.1}
          emissive={GOLD}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Pedestal column */}
      <mesh position={[0, -1.0, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.7, 0.4, 32]} />
        <meshStandardMaterial color={GOLD_MID} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Stem (tapered) */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.4, 0.9, 32]} />
        <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Cup (the trophy bowl) */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.32, 0.9, 64]} />
        <meshStandardMaterial color={GOLD_LIGHT} metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Volumetric cup glow — warm light pulsing inside the cup */}
      <pointLight
        ref={cupGlowRef}
        position={[0, 0.5, 0]}
        intensity={1.4}
        color={GOLD_GLOW}
        distance={2.2}
      />

      {/* Top rim of cup */}
      <mesh position={[0, 0.8, 0]}>
        <torusGeometry args={[0.7, 0.05, 16, 64]} />
        <meshStandardMaterial color={GOLD_BRIGHT} metalness={1} roughness={0.02} />
      </mesh>

      {/* UAE-flag ribbon as a real waving cloth — subdivided plane that
          we displace per-vertex each frame. Painted with a custom canvas
          texture so the flag colors stay correct even as the cloth waves. */}
      <mesh
        position={[0, 0.35, 0.72]}
        rotation={[0, 0, 0]}
        castShadow
      >
        <planeGeometry ref={ribbonGeomRef} args={[1.4, 0.42, 32, 8]} />
        <meshStandardMaterial
          map={useUaeFlagTexture()}
          side={THREE.DoubleSide}
          metalness={0.1}
          roughness={0.6}
        />
      </mesh>

      {/* Left handle */}
      <mesh position={[-0.78, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.06, 16, 32, Math.PI]} />
        <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Right handle */}
      <mesh position={[0.78, 0.35, 0]} rotation={[Math.PI / 2, 0, Math.PI]}>
        <torusGeometry args={[0.2, 0.06, 16, 32, Math.PI]} />
        <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Star on top — glowing, rotating, pulsing */}
      <mesh ref={starRef} position={[0, 1.3, 0]} rotation={[0, 0, Math.PI / 10]}>
        <octahedronGeometry args={[0.32]} />
        <meshStandardMaterial
          color={STAR_PIN}
          metalness={1}
          roughness={0}
          emissive={GOLD_GLOW}
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

      {/* Star halo light */}
      <pointLight position={[0, 1.3, 0]} intensity={1.0} color={GOLD_GLOW} distance={3.5} />

      {/* Star burst sparkles — drifting flecks above the star */}
      <Sparkles
        position={[0, 1.7, 0]}
        count={30}
        scale={1.4}
        size={3}
        speed={0.6}
        color={GOLD_BRIGHT}
      />
    </group>
  );
}

/* Render a UAE flag to a canvas texture once (red hoist + green/white/black
   stripes). Memoized so the texture isn't rebuilt each render. */
function useUaeFlagTexture(): THREE.CanvasTexture {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    const hoistW = canvas.width * 0.25;
    // fly-side stripes (right 75%)
    ctx.fillStyle = "#009639";
    ctx.fillRect(hoistW, 0, canvas.width - hoistW, canvas.height / 3);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(hoistW, canvas.height / 3, canvas.width - hoistW, canvas.height / 3);
    ctx.fillStyle = "#1A1A2E";
    ctx.fillRect(hoistW, (canvas.height / 3) * 2, canvas.width - hoistW, canvas.height / 3);
    // red hoist (left 25%)
    ctx.fillStyle = "#CE1126";
    ctx.fillRect(0, 0, hoistW, canvas.height);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/* ---------- Hope Probe with engine glow + dish that tracks a target ---------- */
function HopeProbeMesh({ trackTarget }: { trackTarget?: THREE.Vector3 }) {
  const dishRef = useRef<THREE.Mesh>(null);
  const panelLeftRef = useRef<THREE.MeshStandardMaterial>(null);
  const panelRightRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Solar panel emissive shimmer
    const shimmer = 0.12 + (Math.sin(t * 1.7) + 1) * 0.18;
    if (panelLeftRef.current) panelLeftRef.current.emissiveIntensity = shimmer;
    if (panelRightRef.current) panelRightRef.current.emissiveIntensity = shimmer;
    // Dish slowly tracks target (Earth) if provided
    if (dishRef.current && trackTarget) {
      const local = dishRef.current.parent!.worldToLocal(trackTarget.clone());
      dishRef.current.lookAt(local);
    }
  });

  return (
    <group rotation={[0.15, 0, 0.05]}>
      {/* Main body */}
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.32, 0.7]} />
        <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.18} />
      </mesh>
      {/* Body trim band */}
      <mesh position={[0, 0, 0.36]}>
        <boxGeometry args={[0.5, 0.32, 0.02]} />
        <meshStandardMaterial color="#9C7C28" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Solar panels with shimmer */}
      <mesh position={[-1.0, 0, 0]} castShadow>
        <boxGeometry args={[1.4, 0.025, 0.55]} />
        <meshStandardMaterial
          ref={panelLeftRef}
          color="#1E3A8A"
          metalness={0.4}
          roughness={0.35}
          emissive="#3B82F6"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[1.0, 0, 0]} castShadow>
        <boxGeometry args={[1.4, 0.025, 0.55]} />
        <meshStandardMaterial
          ref={panelRightRef}
          color="#1E3A8A"
          metalness={0.4}
          roughness={0.35}
          emissive="#3B82F6"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Antenna mast */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.55, 8]} />
        <meshStandardMaterial color="#CCCCCC" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* High-gain dish — tracks the target */}
      <mesh ref={dishRef} position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.18, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#F5F5F5"
          metalness={0.7}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.78, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
        <meshStandardMaterial color="#666" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

/* ---------- Orbiting probe with a glowing comet trail ---------- */
function OrbitingProbe({
  direction,
  speed,
  radius,
  height,
  phase,
  axis = "y",
  trackTarget,
}: {
  direction: 1 | -1;
  speed: number;
  radius: number;
  height: number;
  phase: number;
  /** which axis the orbit revolves around — y = horizontal ring, x = polar ring */
  axis?: "y" | "x";
  trackTarget?: THREE.Vector3;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * speed * direction + phase;
    if (axis === "y") {
      groupRef.current.position.x = Math.cos(t) * radius;
      groupRef.current.position.z = Math.sin(t) * radius;
      groupRef.current.position.y = height + Math.sin(t * 2) * 0.18;
      groupRef.current.rotation.y = -t + Math.PI / 2;
    } else {
      // polar orbit — over the top
      groupRef.current.position.x = Math.cos(t) * radius * 0.3;
      groupRef.current.position.y = height + Math.sin(t) * radius * 0.7;
      groupRef.current.position.z = Math.cos(t) * radius * 0.6;
      groupRef.current.rotation.x = -t + Math.PI / 2;
    }
  });

  return (
    <group ref={groupRef}>
      <HopeProbeMesh trackTarget={trackTarget} />
      {/* Tiny anchor for the trail to follow */}
      <Trail
        width={0.5}
        length={6}
        color={GOLD_BRIGHT}
        attenuation={(t) => t * t}
      >
        <mesh position={[0, 0, -0.4]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={GOLD_BRIGHT} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
}

/* ---------- Distant Earth with continent shader ---------- */
function DistantEarth({ positionRef }: { positionRef: React.MutableRefObject<THREE.Vector3> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  // Earth as a procedural texture: blue ocean + green continents painted on a canvas
  const earthTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 128;
    const ctx = c.getContext("2d")!;
    // ocean
    const grad = ctx.createLinearGradient(0, 0, 0, c.height);
    grad.addColorStop(0, "#1E3A8A");
    grad.addColorStop(0.5, "#3B82F6");
    grad.addColorStop(1, "#1E3A8A");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, c.width, c.height);
    // continents — a few random green blobs
    ctx.fillStyle = "#22C55E";
    const blobs: [number, number, number, number][] = [
      [40, 50, 28, 14],
      [110, 70, 22, 18],
      [170, 45, 36, 16],
      [200, 90, 18, 10],
      [70, 95, 16, 8],
    ];
    for (const [x, y, w, h] of blobs) {
      ctx.beginPath();
      ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    // ice caps
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, c.width, 6);
    ctx.fillRect(0, c.height - 6, c.width, 6);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    return tex;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.004;
    const t = state.clock.elapsedTime * 0.12;
    meshRef.current.position.x = Math.cos(t) * 6.5;
    meshRef.current.position.z = Math.sin(t) * 6.5 - 2;
    meshRef.current.position.y = 1.8;
    positionRef.current.copy(meshRef.current.position);
  });

  return (
    <mesh ref={meshRef} position={[-6, 1.8, -3]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial map={earthTex} roughness={0.85} metalness={0.05} />
    </mesh>
  );
}

/* ---------- Distant Mars with polar caps ---------- */
function DistantMars() {
  const meshRef = useRef<THREE.Mesh>(null);
  const marsTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 128;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#CD5C2E";
    ctx.fillRect(0, 0, c.width, c.height);
    // darker mares
    ctx.fillStyle = "#7F1D1D";
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.ellipse(
        Math.random() * c.width,
        Math.random() * c.height,
        Math.random() * 14 + 4,
        Math.random() * 8 + 2,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    // ice caps
    ctx.fillStyle = "#FEE2E2";
    ctx.fillRect(0, 0, c.width, 8);
    ctx.fillRect(0, c.height - 8, c.width, 8);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.003;
    const t = state.clock.elapsedTime * 0.18 + Math.PI;
    meshRef.current.position.x = Math.cos(t) * 6;
    meshRef.current.position.z = Math.sin(t) * 6 - 3;
  });

  return (
    <mesh ref={meshRef} position={[5, 1.5, -3]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial map={marsTex} roughness={0.95} metalness={0} />
    </mesh>
  );
}

/* ---------- Distant Saturn with rings ---------- */
function DistantSaturn() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * 0.08 + Math.PI / 2;
    groupRef.current.position.x = Math.cos(t) * 8;
    groupRef.current.position.y = 2.4 + Math.sin(t * 0.7) * 0.4;
    groupRef.current.position.z = Math.sin(t) * 8 - 4;
    groupRef.current.rotation.y += 0.002;
  });
  return (
    <group ref={groupRef}>
      {/* planet */}
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* ring */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <ringGeometry args={[0.55, 0.85, 64]} />
        <meshStandardMaterial
          color="#E8E2D0"
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

/* ---------- Tumbling asteroid belt ---------- */
function AsteroidBelt({ count = 36, radius = 5.2 }: { count?: number; radius?: number }) {
  const rocksRef = useRef<THREE.InstancedMesh>(null);
  // Generate stable per-rock orbital params once
  const rocks = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      angleStart: (i / count) * Math.PI * 2 + Math.random() * 0.3,
      r: radius + (Math.random() - 0.5) * 0.6,
      yOffset: (Math.random() - 0.5) * 0.5,
      speed: 0.04 + Math.random() * 0.04,
      tumble: 0.5 + Math.random() * 1.5,
      scale: 0.04 + Math.random() * 0.07,
    }));
  }, [count, radius]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!rocksRef.current) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < rocks.length; i++) {
      const r = rocks[i];
      const a = r.angleStart + t * r.speed;
      dummy.position.set(Math.cos(a) * r.r, r.yOffset, Math.sin(a) * r.r);
      dummy.rotation.set(t * r.tumble, t * r.tumble * 0.7, 0);
      dummy.scale.setScalar(r.scale);
      dummy.updateMatrix();
      rocksRef.current.setMatrixAt(i, dummy.matrix);
    }
    rocksRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={rocksRef} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#9A8C6E" roughness={0.95} metalness={0.05} />
    </instancedMesh>
  );
}

/* ---------- Procedural nebula sky-sphere ---------- */
function Nebula() {
  // We paint a wide nebula gradient onto a canvas and project it on the
  // inside of a giant sphere. Cheap, no external HDRI needed.
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    // base deep-space
    const base = ctx.createLinearGradient(0, 0, 0, c.height);
    base.addColorStop(0, "#0B0B22");
    base.addColorStop(0.5, "#180E2E");
    base.addColorStop(1, "#0B0B22");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, c.width, c.height);
    // big glowing nebula clouds
    const clouds: [number, number, number, string][] = [
      [200, 220, 240, "rgba(180,80,200,0.45)"],
      [600, 180, 280, "rgba(255,120,80,0.35)"],
      [820, 320, 220, "rgba(80,140,255,0.4)"],
      [400, 350, 180, "rgba(255,200,100,0.28)"],
    ];
    for (const [x, y, r, color] of clouds) {
      const grad = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
      grad.addColorStop(0, color);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // pinprick stars
    ctx.fillStyle = "#FFFFFF";
    for (let i = 0; i < 240; i++) {
      const x = Math.random() * c.width;
      const y = Math.random() * c.height;
      const r = Math.random() * 0.9 + 0.2;
      ctx.globalAlpha = 0.5 + Math.random() * 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.mapping = THREE.EquirectangularReflectionMapping;
    return t;
  }, []);

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[40, 64, 64]} />
      <meshBasicMaterial map={tex} side={THREE.BackSide} depthWrite={false} />
    </mesh>
  );
}

/* ---------- Aurora ring under the trophy with UAE color pulse ---------- */
function AuroraRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return;
    meshRef.current.rotation.z += 0.003;
    const t = state.clock.elapsedTime;
    // Color cycles through gold → red → green
    const cycle = (Math.sin(t * 0.6) + 1) / 2;
    const c = new THREE.Color();
    if (cycle < 0.33) c.setHex(0xffb800); // gold
    else if (cycle < 0.66) c.lerpColors(new THREE.Color(0xffb800), new THREE.Color(0xce1126), (cycle - 0.33) * 3);
    else c.lerpColors(new THREE.Color(0xce1126), new THREE.Color(0x009639), (cycle - 0.66) * 3);
    matRef.current.color.copy(c);
    matRef.current.opacity = 0.3 + Math.sin(t * 1.4) * 0.12;
  });

  return (
    <mesh ref={meshRef} position={[0, -1.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.3, 2.4, 64]} />
      <meshBasicMaterial
        ref={matRef}
        color={GOLD_GLOW}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ---------- Floor (flat dark disc).
   Was a MeshReflectorMaterial that rendered the scene twice (real-time
   reflection). Replaced with a plain Standard material — same look from
   the resting orbit angle but ~half the GPU cost. */
function MirrorFloor() {
  return (
    <mesh position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[5, 48]} />
      <meshStandardMaterial
        color="#0F0F23"
        roughness={0.9}
        metalness={0.4}
      />
    </mesh>
  );
}

/* ---------- Shooting stars ---------- */
function ShootingStars() {
  // Three independent shooting stars, each fires every ~5s on a stagger.
  // Each is a small bright sphere with a Trail; we move it across the sky.
  const stars = useMemo(
    () => [
      { period: 6.0, offset: 0.0, axis: new THREE.Vector3(8, 4, -6), endAxis: new THREE.Vector3(-6, 2, -4) },
      { period: 7.5, offset: 2.4, axis: new THREE.Vector3(-7, 5, -5), endAxis: new THREE.Vector3(7, 1, -3) },
      { period: 5.2, offset: 4.0, axis: new THREE.Vector3(6, 6, 4), endAxis: new THREE.Vector3(-7, 2, 5) },
    ],
    []
  );
  return (
    <>
      {stars.map((s, i) => (
        <ShootingStar key={i} {...s} />
      ))}
    </>
  );
}

function ShootingStar({
  period,
  offset,
  axis,
  endAxis,
}: {
  period: number;
  offset: number;
  axis: THREE.Vector3;
  endAxis: THREE.Vector3;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.elapsedTime + offset) % period) / period;
    // Active for first 30% of period, then hidden until next cycle
    const active = t < 0.35;
    if (!active) {
      ref.current.position.set(0, -100, 0);
      return;
    }
    const u = t / 0.35;
    ref.current.position.lerpVectors(axis, endAxis, u);
  });
  return (
    <Trail width={0.3} length={4} color="#FFFFFF" attenuation={(x) => x * x}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
      </mesh>
    </Trail>
  );
}

/* ---------- Cinematic camera intro ---------- */
function CameraController({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const introTimeRef = useRef<number>(0);
  const introDoneRef = useRef<boolean>(false);
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const restPos = useMemo(() => new THREE.Vector3(0, 1.2, 4.8), []);

  useEffect(() => {
    introTimeRef.current = 0;
    introDoneRef.current = false;
    if (reducedMotion) {
      camera.position.copy(restPos);
      camera.lookAt(0, 0, 0);
      introDoneRef.current = true;
    } else {
      camera.position.set(0, 4.5, 12);
      camera.lookAt(0, 0, 0);
    }
  }, [camera, reducedMotion, restPos]);

  useFrame((_, delta) => {
    if (introDoneRef.current) return;
    introTimeRef.current += delta;
    const introDuration = 2.5;
    const easedT = Math.min(1, introTimeRef.current / introDuration);
    const eased = 1 - Math.pow(1 - easedT, 3);
    const start = new THREE.Vector3(0, 4.5, 12);
    targetPos.lerpVectors(start, restPos, eased);
    camera.position.copy(targetPos);
    camera.lookAt(targetLook);
    if (easedT >= 1) introDoneRef.current = true;
  });

  return null;
}

/* ---------- Scene composer ---------- */
function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  const earthPosRef = useRef(new THREE.Vector3(-6, 1.8, -3));

  return (
    <>
      <CameraController reducedMotion={reducedMotion} />

      {/* Lighting rig */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.4}
        color="#FFE9A8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 3, -3]} intensity={0.7} color="#7AC4FF" />
      <pointLight position={[0, 2.5, 2]} intensity={0.6} color={GOLD} />

      {/* Atmosphere */}
      <fog attach="fog" args={["#0B0B22", 8, 22]} />
      <Nebula />
      <Stars radius={50} depth={30} count={1500} factor={4} fade speed={0.5} />
      <Sparkles count={60} scale={9} size={2} speed={0.3} color={GOLD} />

      {/* Floor + glow */}
      <AuroraRing />
      <MirrorFloor />

      {/* Trophy gently floats */}
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.3}>
        <GoldTrophy />
      </Float>

      {/* Probes */}
      <OrbitingProbe direction={1} speed={0.45} radius={3.2} height={0.55} phase={0} trackTarget={earthPosRef.current} />
      <OrbitingProbe direction={-1} speed={0.32} radius={2.7} height={-0.1} phase={Math.PI} trackTarget={earthPosRef.current} />
      <OrbitingProbe direction={1} speed={0.25} radius={3.6} height={1.2} phase={Math.PI / 2} axis="x" trackTarget={earthPosRef.current} />

      {/* Distant planets */}
      <DistantEarth positionRef={earthPosRef} />
      <DistantMars />
      <DistantSaturn />

      {/* Asteroid belt */}
      <AsteroidBelt count={12} radius={5.2} />

      {/* Shooting stars */}
      <ShootingStars />

      <OrbitControls
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.9}
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 4}
      />
      <Environment preset="sunset" />

      {/* Post-processing — Bloom + Vignette + ACES tone mapping.
          ChromaticAberration was dropped (full-screen fragment-shader
          cost vs subtle visual). Skip the entire composer under
          reduced-motion since each pass eats fill rate. */}
      {!reducedMotion && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.65}
            luminanceThreshold={0.65}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={0.65} />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
      )}
    </>
  );
}

export default function TrophyScene() {
  // Respect reduced-motion users — skip cinematic intro + auto-rotate
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  /* === PERF: lazy-mount the Canvas only when the scene's container
     scrolls into view, and pause its render loop when it leaves. This
     avoids burning GPU on a heavy 3D scene that the user isn't even
     looking at — by far the biggest single perf win on this page. */
  const containerRef = useRef<HTMLDivElement>(null);
  // `mounted` becomes true the first time the scene is visible, then
  // stays true (we keep the WebGL context warm so re-entering is
  // instant — only the frameloop pauses on exit).
  const [mounted, setMounted] = useState(false);
  // `inView` toggles with intersection — drives `frameloop` so RAF
  // stops when the scene scrolls offscreen.
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // SSR / no IO support — just mount eagerly.
      setMounted(true);
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible) {
          setMounted(true);
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Also pause the render loop when the tab is backgrounded.
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] md:h-[440px] lg:h-full lg:min-h-[520px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1A1A2E] via-[#0F0F23] to-black border-2 border-[#1A1A2E] relative"
      style={{ boxShadow: "0 5px 0 #C9B58A, inset 0 1px 0 rgba(255,255,255,0.08)" }}
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-[#FFD96B] font-heading animate-pulse">Loading 3D trophy…</p>
          </div>
        }
      >
        {mounted ? (
          <Canvas
            camera={{ position: [0, 4.5, 12], fov: 50 }}
            shadows
            // PERF: capped at 1.5 (was 1.75) so retina screens don't
            // pay 4× the fragment-shader cost.
            dpr={[1, 1.5]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            // PERF: drive RAF only when the scene is on-screen AND the
            // tab is foregrounded. When either is false, we fall back
            // to "demand" so RTF won't render unless explicitly asked.
            frameloop={inView && tabVisible ? "always" : "demand"}
          >
            <Scene reducedMotion={reducedMotion} />
          </Canvas>
        ) : (
          // Pre-mount placeholder — same dimensions as the canvas, no
          // GPU cost. Replaced by the real Canvas on first scroll-in.
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-[#FFD96B]/60 font-heading text-sm">Trophy scene paused</p>
          </div>
        )}
      </Suspense>
    </div>
  );
}
