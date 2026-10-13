export function GalleryEnvironment() {
    return (
        <>
            <mesh position={[0, 1.6, 0]} receiveShadow>
                <boxGeometry args={[20, 4, 0.2]} />
                <meshStandardMaterial color="#f1efe9" roughness={0.9} />
            </mesh>
            <mesh position={[0, -0.4, 3]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 12]} />
                <meshStandardMaterial color="#b8b1a7" roughness={0.85} />
            </mesh>
        </>
    );
}