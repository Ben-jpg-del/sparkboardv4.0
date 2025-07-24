"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Environment } from "@react-three/drei"
import * as THREE from "three"

const BulbNode = ({ position, color, speed = 1, size = 0.5 }) => {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return

    // Rotate around center
    const time = state.clock.getElapsedTime() * speed
    ref.current.position.x = position[0] + Math.sin(time) * 2
    ref.current.position.y = position[1] + Math.cos(time) * 2
    ref.current.position.z = position[2] + Math.sin(time * 0.5) * 2
  })

  return (
    <Sphere ref={ref} args={[size, 16, 16]} position={position}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.2} metalness={0.8} />
    </Sphere>
  )
}

const Connection = ({ start, end }) => {
  const ref = useRef<THREE.Line>(null)

  useEffect(() => {
    if (!ref.current) return

    const geometry = ref.current.geometry as THREE.BufferGeometry
    const positions = geometry.attributes.position as THREE.BufferAttribute

    positions.setXYZ(0, start.x, start.y, start.z)
    positions.setXYZ(1, end.x, end.y, end.z)
    positions.needsUpdate = true
  }, [start, end])

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={2} array={new Float32Array(6)} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#1A73E8" opacity={0.4} transparent />
    </line>
  )
}

const LightBulbNetwork = () => {
  const bulbs = [
    { position: [0, 0, 0], color: "#1A73E8", speed: 0.5, size: 0.8 },
    { position: [3, 2, -2], color: "#34A853", speed: 0.7, size: 0.6 },
    { position: [-3, -2, -1], color: "#FBBC05", speed: 0.9, size: 0.5 },
    { position: [2, -3, 2], color: "#EA4335", speed: 0.6, size: 0.7 },
    { position: [-2, 3, 1], color: "#4285F4", speed: 0.8, size: 0.5 },
  ]

  return (
    <>
      {bulbs.map((bulb, i) => (
        <BulbNode key={i} position={bulb.position} color={bulb.color} speed={bulb.speed} size={bulb.size} />
      ))}
      <mesh>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial color="#000" side={THREE.BackSide} transparent opacity={0.05} />
      </mesh>
      <Environment preset="city" />
    </>
  )
}

const ThreeDHero = () => {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <LightBulbNetwork />
    </Canvas>
  )
}

export default ThreeDHero
