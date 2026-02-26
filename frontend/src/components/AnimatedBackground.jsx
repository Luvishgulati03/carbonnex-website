import React, { useEffect, useMemo, useRef, useState } from 'react';
import './AnimatedBackground.css';
import './AnimatedBackground.css';
const AnimatedBackground = ({ variant = 'particles', intensity = 'medium' }) => {
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Track mouse movement for parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePos({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height
                });
            }
        };

        const container = containerRef.current?.parentElement;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseenter', () => setIsHovering(true));
            container.addEventListener('mouseleave', () => setIsHovering(false));
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseenter', () => setIsHovering(true));
                container.removeEventListener('mouseleave', () => setIsHovering(false));
            }
        };
    }, []);

    const particleCount = intensity === 'high' ? 30 : intensity === 'medium' ? 20 : 10;
    const leafCount = intensity === 'high' ? 15 : intensity === 'medium' ? 10 : 5;

    const particleData = useMemo(() => {
        return Array.from({ length: particleCount }).map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 3 + Math.random() * 4,
            opacity: 0.3 + Math.random() * 0.4
        }));
    }, [particleCount]);

    const renderParticles = () => {
        return particleData.map((p, i) => (
            <div
                key={i}
                className="particle"
                style={{
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.duration}s`,
                    opacity: p.opacity,
                    transform: isHovering && variant !== 'nature'
                        ? `translate(${(mousePos.x - 0.5) * 30}px, ${(mousePos.y - 0.5) * 30}px)`
                        : 'none',
                }}
            />
        ));
    };

    const leafData = useMemo(() => {
        const leafEmojis = ['🌿', '🍃', '🌱', '☘️'];
        return Array.from({ length: leafCount }).map((_, i) => ({
            emoji: leafEmojis[i % leafEmojis.length],
            left: Math.random() * 100,
            delay: Math.random() * 8,
            duration: 8 + Math.random() * 6,
            fontSize: 16 + Math.random() * 16,
            opacity: 0.4 + Math.random() * 0.3
        }));
    }, [leafCount]);

    const renderLeaves = () => {
        return leafData.map((l, i) => (
            <div
                key={i}
                className="floating-leaf"
                style={{
                    left: `${l.left}%`,
                    animationDelay: `${l.delay}s`,
                    animationDuration: `${l.duration}s`,
                    fontSize: `${l.fontSize}px`,
                    opacity: l.opacity,
                }}
            >
                {l.emoji}
            </div>
        ));
    };

    const pollutionData = useMemo(() => {
        const witheredEmojis = ['🍂', '🍁', '🥀', '🍃'];
        const leaves = Array.from({ length: leafCount * 1.5 }).map((_, i) => ({
            emoji: witheredEmojis[i % 4],
            left: Math.random() * 100,
            delay: Math.random() * 10,
            duration: 10 + Math.random() * 10,
            fontSize: 14 + Math.random() * 10,
            opacity: 0.6 + Math.random() * 0.4
        }));

        const smoke = Array.from({ length: particleCount * 2 }).map(() => ({
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 6 + Math.random() * 4,
            size: 20 + Math.random() * 60,
            opacity: 0.1 + Math.random() * 0.2
        }));

        return { leaves, smoke };
    }, [leafCount, particleCount]);

    const renderPollution = () => {
        // Falling withered leaves and plants
        const leavesElements = pollutionData.leaves.map((l, i) => (
            <div
                key={`leaf-${i}`}
                className="falling-debris"
                style={{
                    left: `${l.left}%`,
                    top: `-10%`,
                    animationDelay: `${l.delay}s`,
                    animationDuration: `${l.duration}s`,
                    fontSize: `${l.fontSize}px`,
                    opacity: l.opacity,
                    filter: 'grayscale(0.6) sepia(0.4)', // Withered look
                }}
            >
                {l.emoji}
            </div>
        ));

        // Rising smoke/pollution particles
        const smokeElements = pollutionData.smoke.map((s, i) => (
            <div
                key={`smoke-${i}`}
                className="smoke-particle"
                style={{
                    left: `${s.left}%`,
                    bottom: `-20%`,
                    animationDelay: `${s.delay}s`,
                    animationDuration: `${s.duration}s`,
                    width: `${s.size}px`,
                    height: `${s.size}px`,
                    opacity: s.opacity,
                }}
            />
        ));

        return (
            <>
                <div className="pollution-overlay" />
                {smokeElements}
                {leavesElements}
            </>
        );
    };

    const renderCircuitLines = () => {
        return (
            <svg className="circuit-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
                    </linearGradient>
                </defs>
                <path
                    className="circuit-path"
                    d="M0,30 L20,30 L25,25 L40,25 L45,30 L60,30 L65,25 L80,25 L85,30 L100,30"
                    stroke="url(#circuitGradient)"
                    fill="none"
                    strokeWidth="0.3"
                    style={{
                        transform: isHovering
                            ? `translateY(${(mousePos.y - 0.5) * 10}px)`
                            : 'none',
                    }}
                />
                <path
                    className="circuit-path circuit-path--delayed"
                    d="M0,50 L15,50 L20,55 L35,55 L40,50 L55,50 L60,45 L75,45 L80,50 L100,50"
                    stroke="url(#circuitGradient)"
                    fill="none"
                    strokeWidth="0.3"
                />
                <path
                    className="circuit-path circuit-path--delayed-2"
                    d="M0,70 L10,70 L15,75 L30,75 L35,70 L50,70 L55,65 L70,65 L75,70 L100,70"
                    stroke="url(#circuitGradient)"
                    fill="none"
                    strokeWidth="0.3"
                />
            </svg>
        );
    };

    const renderGlowOrbs = () => {
        return (
            <>
                <div
                    className="glow-orb glow-orb--1"
                    style={{
                        transform: isHovering
                            ? `translate(${(mousePos.x - 0.5) * 50}px, ${(mousePos.y - 0.5) * 50}px)`
                            : 'none',
                    }}
                />
                <div
                    className="glow-orb glow-orb--2"
                    style={{
                        transform: isHovering
                            ? `translate(${(mousePos.x - 0.5) * -30}px, ${(mousePos.y - 0.5) * -30}px)`
                            : 'none',
                    }}
                />
                <div
                    className="glow-orb glow-orb--3"
                    style={{
                        transform: isHovering
                            ? `translate(${(mousePos.x - 0.5) * 40}px, ${(mousePos.y - 0.5) * -40}px)`
                            : 'none',
                    }}
                />
            </>
        );
    };

    const renderEarth = () => {
        return (
            <div className="earth-container">
                <div className="earth-sphere">
                    <div className="map-texture"></div>
                    <div className="earth-glow"></div>
                </div>
            </div>
        );
    };

    // Memoize tree data so random positions stay fixed across re-renders
    const treeData = useMemo(() => {
        return Array.from({ length: 5 }).map((_, i) => ({
            scale: 0.5 + Math.random() * 0.5,
            left: 5 + i * 20 + Math.random() * 10,
        }));
    }, []);

    const renderTrees = () => {
        return (
            <>
                {treeData.map((tree, i) => (
                    <svg
                        key={i}
                        className="growing-tree-svg"
                        viewBox="0 0 100 200"
                        width={100 * tree.scale}
                        height={200 * tree.scale}
                        style={{ left: `${tree.left}%`, bottom: '-20px' }}
                    >
                        <g>
                            {/* Trunk */}
                            <path className="tree-path" d="M50,200 Q50,150 50,100" />
                            {/* Branches */}
                            <path className="tree-path" d="M50,100 Q30,70 10,60" />
                            <path className="tree-path" d="M50,100 Q70,70 90,60" />
                            <path className="tree-path" d="M50,120 Q30,100 20,90" />
                            <path className="tree-path" d="M50,120 Q70,100 80,90" />

                            {/* Leaves */}
                            <circle cx="10" cy="60" r="5" className="tree-leaf" />
                            <circle cx="90" cy="60" r="5" className="tree-leaf" />
                            <circle cx="20" cy="90" r="4" className="tree-leaf" />
                            <circle cx="80" cy="90" r="4" className="tree-leaf" />
                            <circle cx="50" cy="100" r="6" className="tree-leaf" />
                        </g>
                    </svg>
                ))}
            </>
        );
    };

    return (
        <div ref={containerRef} className={`animated-bg animated-bg--${variant}`}>
            {variant === 'particles' && renderParticles()}
            {variant === 'leaves' && renderLeaves()}
            {variant === 'circuit' && renderCircuitLines()}
            {variant === 'nature' && (
                <>
                    {renderEarth()}
                    {renderTrees()}
                    {/* Add subtle particles for atmosphere, without mouse reactivity */}
                    <div className="particles-layer">
                        {renderParticles()}
                    </div>
                </>
            )}
            {variant === 'pollution' && renderPollution()}
            {variant !== 'pollution' && variant !== 'nature' && renderGlowOrbs()}
        </div>
    );
};

export default AnimatedBackground;
