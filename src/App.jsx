import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// --- Data for our sections ---
const projectData = [
    {
        //imgSrc: "https://placehold.co/600x400/111111/00ff88?text=LIfeGoals",
        imgSrc: "/images/LGLS.png", 
        title: "Lifegoals",
        description: "Developed LifeGoals, a cross-platform mobile application for goal and habit management. Built with React and Firebase, the app features real-time progress tracking, gamified motivation, and user authentication. Recognized as the top software engineering project of my graduating class for its innovation, usability, and impact on productivity.",
        liveUrl: "#",
        sourceUrl: "#",
        // ADDED: Screenshots for the Livegoals app
        screenshots: [
            "/images/lifegoals1.jpg", 
            "/images/lifegoals2.jpg",
            "/images/lifegoals3.jpg",
            "/images/lifegoals4.jpg",
            "/images/lifegoals5.jpg",
            "/images/lifegoals6.jpg",
            "/images/lifegoals7.jpg",
            "/images/lifegoals8.jpg",
            "/images/lifegoals9.jpg",
            "/images/lifegoals10.jpg",
            "/images/lifegoals11.jpg",
            "/images/lifegoals12.jpg",
            "/images/lifegoals13.jpg",
            "/images/lifegoals14.jpg",
            "/images/lifegoals15.jpg",
            "/images/lifegoals16.jpg",
        ]
    },
    {
        //imgSrc: "https://placehold.co/600x400/000000/007bff?text=Movie+Library+App", // Placeholder, replace with a screenshot of your app!
        imgSrc: "/images/movielibrary.png",
        title: "Movie Library App",
        description: "A responsive web application for browsing movies, managing personalized favorite lists, and user authentication. Built with React (Vite), Firebase (Authentication & Firestore), and The Movie Database (TMDB) API.",
        liveUrl: "https://the-movie-library-omega.vercel.app/",
        sourceUrl: "https://github.com/xmRandy/the-movie-library.git",
        screenshots: [] // Empty array for no screenshots link
    },
    {
        //imgSrc: "https://placehold.co/600x400/995588/ffffff?text=Superb+Beauty+World",
        imgSrc: "/images/superbbeauty.png",
        title: "Superb Beauty World E-commerce Store",
        description: "Developed and launched a Shopify-powered online store for a beauty brand, specializing in hair product sales. Managed product listings, inventory, and integrated payment gateways for seamless transactions.",
        liveUrl: "https://superbbeautyworld.com/",
        sourceUrl: "#", // Changed this to '#' as typical Shopify stores don't have public source code repos
        screenshots: []
    },
    {
        //imgSrc: "https://placehold.co/600x400/111111/00ff88?text=Macalunge+Site",
        imgSrc: "/images/macalunge.png",
        title: "Macalunge Spoken word artist webSite",
        description: "Contributed to the development of this site during internship by adding media, editing pages, adding plugins, editing UI elements.",
        liveUrl: "https://www.macalunge.com/",
        sourceUrl: "#",
        screenshots: []
    }
];

const skillsData = [
    "JavaScript (ES6+)", "React", "FireBase", "SQl",
    "HTML/CSS", "Figma",
];

// --- Reusable Components & Hooks ---

// Custom Hook for the typing effect.
const useTypewriter = (text, speed = 100, start = true) => {
    const [displayText, setDisplayText] = useState('');
    useEffect(() => {
        if (!start) return;
        setDisplayText('');
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);
        return () => clearInterval(typingInterval);
    }, [text, speed, start]);
    return displayText;
};

// A wrapper component to handle the scroll-in animation for each section.
const Section = ({ children, id }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);
    return <section id={id} ref={sectionRef} className={`section-container ${isVisible ? 'is-visible' : ''}`}>{children}</section>;
};


// NEW COMPONENT: Screenshots Modal for mobile-friendly image display
const ScreenshotsModal = ({ screenshots, title, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const totalImages = screenshots.length;

    if (!totalImages) return null;

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Simple styling for a good mobile experience
    // Note: In a real project, you'd move this styling to a CSS file.
    const modalStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        boxSizing: 'border-box',
    };

    const contentStyles = {
        position: 'relative',
        maxWidth: '90%',
        maxHeight: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const imageStyles = {
        maxWidth: '100%',
        maxHeight: 'calc(100vh - 120px)', // Leave space for title/controls
        width: 'auto',
        height: 'auto',
        objectFit: 'contain',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 255, 255, 0.5)',
    };

    const buttonStyles = {
        background: 'none',
        border: '1px solid #00ffff',
        color: '#00ffff',
        padding: '10px 20px',
        margin: '0 10px',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '5px',
        textTransform: 'uppercase',
        transition: 'background-color 0.3s, color 0.3s',
    };

    const navButtonStyles = {
        ...buttonStyles,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: 0.8,
        padding: '5px 10px',
        zIndex: 1010,
    };

    return (
        <div style={modalStyles} onClick={onClose}>
            <div style={contentStyles} onClick={e => e.stopPropagation()}>
                <h3 style={{ color: '#00ffff', marginBottom: '15px' }}>{title} Screenshots ({currentImageIndex + 1}/{totalImages})</h3>
                <img
                    src={screenshots[currentImageIndex]}
                    alt={`${title} Screenshot ${currentImageIndex + 1}`}
                    style={imageStyles}
                />
                <button
                    onClick={prevImage}
                    style={{...navButtonStyles, left: '-40px'}}
                    aria-label="Previous Screenshot"
                >
                    &lt;
                </button>
                <button
                    onClick={nextImage}
                    style={{...navButtonStyles, right: '-40px'}}
                    aria-label="Next Screenshot"
                >
                    &gt;
                </button>
                <button
                    onClick={onClose}
                    style={{...buttonStyles, marginTop: '20px'}}
                >
                    Close [X]
                </button>
            </div>
        </div>
    );
};


// --- Page Section Components (Hero, About, etc. remain unchanged) ---
// ... (Hero, About, SkillTag, Skills, Contact, Footer components are unchanged and omitted for brevity)
const Hero = () => {
    const canvasRef = useRef(null);
    const nameText = useTypewriter("Malla Randy Wah", 100);
    const nameFinished = nameText === "Malla Randy Wah";
    const titleText = useTypewriter("Full stack software Developer", 50, nameFinished);

    useEffect(() => {
        if (!canvasRef.current) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        const geometry = new THREE.IcosahedronGeometry(1.5, 0);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ffff, wireframe: true, emissive: 0x00ffff, emissiveIntensity: 0.5 });
        const shape = new THREE.Mesh(geometry, material);
        scene.add(shape);
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x00ffff, 1.5);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
        camera.position.z = 5;
        let mouseX = 0, mouseY = 0;
        const onMouseMove = (event) => {
            mouseX = (event.clientX - window.innerWidth / 2) / 1000;
            mouseY = (event.clientY - window.innerHeight / 2) / 1000;
        };
        document.addEventListener('mousemove', onMouseMove);
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            shape.rotation.x += 0.001;
            shape.rotation.y += 0.001;
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        };
        animate();
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
            document.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="hero">
            <canvas ref={canvasRef} className="hero-canvas"></canvas>
            <div className="hero-content">
                <h1 className="hero-name">
                    {nameText}
                    {!nameFinished && <span className="blinker">_</span>}
                </h1>
                <p className="hero-title">
                    {titleText}
                    {nameFinished && <span className="blinker">_</span>}
                </p>
                <a href="#projects" className="hero-button">
                    [ View My Work ]
                </a>
            </div>
        </section>
    );
};

const About = () => (
    <Section id="about">
        <div className="container">
            <h2 className="section-title">&lt;About Me /&gt;</h2>
            <div className="about-content">
                <div className="about-image-wrapper">
                    <img src="https://placehold.co/400x400/0a0a0a/00ffff?text=MR" alt="Malla Randy" className="about-image" />
                </div>
                <div className="about-text">
                    <p>Hello! I'm Malla Randy, a passionate creative developer with a knack for building unique and engaging digital experiences. </p>
                    <p>I thrive at the intersection of design and development, transforming complex problems into elegant, user-friendly solutions. Whether it's a sleek application, or a dynamic web app, I bring my full commitment and creativity to every project.</p>
                    <p>When I'm not coding, you can find me exploring the latest in generative art, contributing to open-source projects, or searching for the perfect cup of coffee.</p>
                </div>
            </div>
        </div>
    </Section>
);

// UPDATED ProjectCard component to include the conditional Screenshots button
const ProjectCard = ({ imgSrc, title, description, liveUrl, sourceUrl, screenshots, onScreenshotsClick }) => {
    // CONDITIONAL LOGIC: Determine if the URL is valid (not null, empty, or just '#')
    const isLiveLinkValid = liveUrl && liveUrl !== "#";
    const isSourceLinkValid = sourceUrl && sourceUrl !== "#";
    const hasScreenshots = screenshots && screenshots.length > 0;

    const handleLinkClick = (e, isValid, linkType) => {
        if (!isValid) {
            e.preventDefault(); // Prevent navigation if link is not valid
            alert(`${linkType} not available yet!`);
        }
    };

    return (
        <div className="project-card">
            <img src={imgSrc} alt={title} className="project-image" />
            <h3 className="project-title">{title}</h3>
            <p className="project-description">{description}</p>
            <div className="project-links">
                {/* CONDITIONAL RENDER: Live Demo Link */}
                {isLiveLinkValid && (
                    <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glitch-hover project-button"
                    >
                        Live Demo
                    </a>
                )}

                {/* CONDITIONAL RENDER: Source Code Link */}
                {isSourceLinkValid && (
                    <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glitch-hover project-button"
                    >
                        Source Code
                    </a>
                )}

                {/* CONDITIONAL RENDER: Screenshots Button */}
                {hasScreenshots && (
                    <button
                        onClick={onScreenshotsClick}
                        className="glitch-hover project-button"
                    >
                        Screenshots
                    </button>
                )}

                {/* Fallback buttons (if links were invalid but still rendered before, we now don't render them) */}
                {/* If no valid link exists, consider rendering an "Info" button or nothing at all */}
                {!isLiveLinkValid && !isSourceLinkValid && !hasScreenshots && (
                     <button className="project-button disabled-link" disabled>
                        Info N/A
                    </button>
                )}

            </div>
        </div>
    );
};


// UPDATED Projects component to handle the modal state
const Projects = () => {
    const [modalData, setModalData] = useState(null); // Stores {title, screenshots} of the active project

    const openModal = (project) => {
        setModalData({ title: project.title, screenshots: project.screenshots });
    };

    const closeModal = () => {
        setModalData(null);
    };

    return (
        <Section id="projects">
            <div className="container">
                <h2 className="section-title">&lt;Projects /&gt;</h2>
                <div className="projects-grid">
                    {projectData.map((project, index) => (
                        <ProjectCard
                            key={index}
                            {...project}
                            onScreenshotsClick={() => openModal(project)} // Pass handler for opening the modal
                        />
                    ))}
                </div>
            </div>

            {/* Render the modal if modalData is set */}
            {modalData && (
                <ScreenshotsModal
                    screenshots={modalData.screenshots}
                    title={modalData.title}
                    onClose={closeModal}
                />
            )}
        </Section>
    );
};

const SkillTag = ({ skill }) => <span className="skill-tag">{skill}</span>;

const Skills = () => (
    <Section id="skills">
        <div className="container">
            <h2 className="section-title">&lt;Skills /&gt;</h2>
            <div className="skills-container">
                <div className="skills-grid">
                    {skillsData.map((skill, index) => <SkillTag key={index} skill={skill} />)}
                </div>
            </div>
        </div>
    </Section>
);

const Contact = () => (
    <Section id="contact">
        <div className="container">
            <h2 className="section-title">&lt;Get In Touch /&gt;</h2>
            <div className="contact-container">
                <p className="contact-text">I'm currently available for freelance work and open to new opportunities. Have a project in mind or just want to say hello? Drop me a line!</p>
                <a href="mailto:mallarandy026@gmail.com" className="contact-button glitch-hover">
                    [ mallarandy026@gmail.com ]
                </a>
            </div>
        </div>
    </Section>
);

const Footer = () => (
    <footer className="footer">
        <p>Designed & Built by Malla Randy</p>
    </footer>
);


// --- The Main App Component ---
export default function App() {
    return (
        <>
            <main className="main-content">
                <Hero />
                <Skills />
                <Projects /> {/* Projects now contains the logic for the modal */}
                <About />
                <Contact />
            </main>
            <Footer />
        </>
    );
}