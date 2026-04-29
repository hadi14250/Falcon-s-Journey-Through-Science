"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { RotateCcw } from "lucide-react";
import ModelLoader3D from "@/components/profile/ModelLoader3D";

/* === AvatarViewer3D ====================================================
   Generic 3D viewer for any character GLB.

   Interaction model (Pass 2):
   - Drag rotates on the Y-axis (turntable). Vertical tilt is locked.
   - Scroll/pinch zooms in and out, clamped to a sane range so the user
     can't lose the model.
   - When the user isn't actively interacting, the model gently drifts
     back-and-forth on Y by ~6° so it feels alive.
   - After 4s of inactivity the camera auto-snaps back to the default
     pose (front-facing, default zoom). A manual reset button is also
     pinned to the bottom-right of the canvas.

   Drei's `useGLTF` automatically wires the Draco + Meshopt decoders
   for compressed GLBs, no extra setup needed.
   =================================================================== */

interface Props {
  modelUrl: string;
}

/* Camera defaults — referenced by the OrbitControls reset, the initial
   Canvas mount, and the zoom clamps. Single source of truth. */
const DEFAULT_CAMERA_DISTANCE = 3.5;
const MIN_CAMERA_DISTANCE = 2.0; // can't zoom past the model itself
const MAX_CAMERA_DISTANCE = 6.0; // can't zoom out into the void

function Model({
  url,
  onReady,
  isInteracting,
}: {
  url: string;
  onReady: () => void;
  isInteracting: boolean;
}) {
  const gltf = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  /* Clone so multiple mounts don't share material/transform state. */
  const scene = gltf.scene.clone();

  /* Center on bounding-box origin so rotation pivots around the visual
     middle, not whatever origin the artist (or AI generator) used. */
  const bbox = new THREE.Box3().setFromObject(scene);
  const center = bbox.getCenter(new THREE.Vector3());
  scene.position.sub(center);

  /* Auto-fit: scale so the model's longest axis fills ~2 world units,
     matching the camera distance. Decouples display size from the GLB's
     own arbitrary scale (Meshy exports come at different scales — this
     normalizes everything). */
  const size = bbox.getSize(new THREE.Vector3());
  const longest = Math.max(size.x, size.y, size.z);
  const scale = 2 / longest;
  scene.scale.setScalar(scale);

  /* Idle sway — only runs when the user isn't actively dragging. Gentle
     ±6° on Y, sine-wave so the easing feels organic. We pause it during
     interaction so it doesn't fight the user's drag. */
  useFrame(({ clock }) => {
    if (!groupRef.current || isInteracting) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.105; // ~6° peak
  });

  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

export default function AvatarViewer3D({ modelUrl }: Props) {
  /* Reset readiness whenever the URL flips so swapping items between
     characters re-shows the loader for the new download/decode. */
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(false);
  }, [modelUrl]);

  /* Track active drag/zoom so the idle sway can pause itself. We also
     use the same flag to time the auto-reset — see the inactivity
     timer below. */
  const [isInteracting, setIsInteracting] = useState(false);

  /* Imperative handle to OrbitControls so we can reset the camera and
     also detect "the user moved the camera." */
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  /* Has the user actually moved the camera away from the default pose?
     We track this so the reset button only shows when there's something
     to reset to (and so the auto-reset doesn't keep firing forever
     after the camera is already home). */
  const [isAwayFromDefault, setIsAwayFromDefault] = useState(false);

  const resetCamera = () => {
    const c = controlsRef.current;
    if (!c) return;
    /* Restore default position + target. OrbitControls.reset() would
       work too but it sometimes re-uses a stale "saveState" snapshot,
       so we set explicitly. */
    c.object.position.set(0, 0, DEFAULT_CAMERA_DISTANCE);
    c.target.set(0, 0, 0);
    c.update();
    setIsAwayFromDefault(false);
  };

  /* No auto-reset — the camera stays where the user left it until they
     click the reset puck explicitly. Auto-snapping mid-screenshot was
     hostile to anyone trying to capture a posed angle. */

  return (
    <div className="relative w-full h-full">
      {/* HTML loader overlay — sits over the Canvas while the GLB is
          fetching/decoding. Pointer-events-none so it never blocks the
          (empty) canvas underneath. Removed once Model commits via the
          onReady callback. */}
      {!ready && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <ModelLoader3D />
        </div>
      )}

      {/* Reset button — only visible once the user has dragged or zoomed
          the camera away from the default pose. Bottom-right so it's
          out of the model's silhouette. */}
      {ready && isAwayFromDefault && (
        <button
          type="button"
          onClick={resetCamera}
          aria-label="Reset view"
          className="absolute bottom-3 right-3 z-20 w-10 h-10 rounded-full bg-white border-2 border-[#1A1A2E] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          style={{ boxShadow: "0 3px 0 #C9B58A" }}
        >
          <RotateCcw className="w-4 h-4 text-[#1A1A2E]" strokeWidth={2.5} />
        </button>
      )}

      <Canvas
        camera={{ position: [0, 0, DEFAULT_CAMERA_DISTANCE], fov: 35 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        // dpr cap at 2 keeps it sharp on retina without thrashing GPU on 3x devices.
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Bright neutral lighting — strong ambient floor + a key + fill
            directional pair. Total energy is high so the model reads as
            clearly lit; all white so colors stay true to Meshy's bake. */}
        <ambientLight intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[3, 4, 3]} intensity={2.0} color="#FFFFFF" />
        <directionalLight position={[-2, 3, -2]} intensity={1.0} color="#FFFFFF" />

        <Suspense fallback={null}>
          <Model
            url={modelUrl}
            onReady={() => setReady(true)}
            isInteracting={isInteracting}
          />
        </Suspense>

        {/* OrbitControls — Y-axis rotation + clamped zoom.
            - polarAngle pinned to PI/2 (horizontal eye-level) — vertical
              drag is neutralized so the user can't somersault the model.
            - pan disabled to keep navigation simple.
            - zoom enabled, distance clamped so the model can never go
              off-screen or get lost in the void.
            - Damping gives a turntable feel — stops with weight, not
              abruptly.
            - onStart/onEnd track interaction so the idle sway can pause
              and the auto-reset can fire after 4s.
            - onChange flips the "moved from default" flag so the reset
              button only appears when there's something to reset to. */}
        <OrbitControls
          ref={controlsRef}
          enableRotate
          enablePan={false}
          enableZoom
          minDistance={MIN_CAMERA_DISTANCE}
          maxDistance={MAX_CAMERA_DISTANCE}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={1.1}
          zoomSpeed={0.8}
          enableDamping
          dampingFactor={0.08}
          onStart={() => setIsInteracting(true)}
          onEnd={() => setIsInteracting(false)}
          onChange={() => setIsAwayFromDefault(true)}
        />
      </Canvas>
    </div>
  );
}
