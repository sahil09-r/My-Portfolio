/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ReactNode, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'motion/react';
import { 
  Terminal, 
  LayoutGrid, 
  FolderOpen, 
  Network, 
  Cpu, 
  User, 
  Code2, 
  Layers, 
  Wrench, 
  GraduationCap, 
  ExternalLink, 
  RefreshCcw, 
  Lock,
  Search,
  X,
  Mail,
  Send,
  Phone,
  MapPin,
  Github,
  Linkedin
} from 'lucide-react';

// --- Types ---

type Screen = 'DASHBOARD' | 'TECH_STACK' | 'HISTORY' | 'PROJECTS' | 'CONTACT';

interface Project {
  id: string;
  title: string;
  description: string;
  details: string[];
  tags: string[];
  metrics: string[];
  image: string;
  type: 'AI' | 'WEB' | 'SYSTEM';
  liveUrl?: string;
  sourceUrl?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: '01',
    title: 'GEN-AI YOLO TRAFFIC SIGN',
    description: 'Lead the whole team in developing an AI Augmented System for smart Traffic and Road Information using YOLO.',
    details: [
      'Lead the whole team',
      'An AI Augmented System for smart Traffic and Road Information',
      'High-accuracy recognition using YOLO v8'
    ],
    tags: ['Python', 'AI', 'YOLO', 'Recognition'],
    metrics: ['YEAR: 2026', 'ROLE: TEAM_LEAD', 'URL: genai-yolo.vercel.app'],
    image: 'https://picsum.photos/seed/yolo/800/400',
    type: 'AI',
    liveUrl: 'https://genai-yolo.vercel.app/',
    sourceUrl: 'https://github.com/sahil09-r'
  },
  {
    id: '02',
    title: 'PASSWORD GEN & EFFICIENCY',
    description: 'Stores passwords in encrypted form, automatically fills login forms, and checks strength against data breaches.',
    details: [
      'Stores all your passwords in encrypted form',
      'Automatically fills login forms in browsers and apps',
      'Gives Strength Output by checking it in Data Breach'
    ],
    tags: ['Security', 'Encryption', 'Automation'],
    metrics: ['YEAR: 2025', 'STATUS: STABLE', 'FEATURE: BREACH_CHECK'],
    image: 'https://picsum.photos/seed/pass/800/400',
    type: 'SYSTEM'
  },
  {
    id: '03',
    title: 'HOME AUTOMATION SYSTEM',
    description: 'Centralized management of lighting and appliances designed to transform everyday living spaces into smart environments.',
    details: [
      'Centralize management of lighting and appliances',
      'Designed to transform everyday living spaces into smart, connected environments',
      'Remote access via secure web interface'
    ],
    tags: ['IoT', 'Automation', 'SmartHome'],
    metrics: ['YEAR: 2025', 'TYPE: IOT_HUB', 'SYNC: REAL_TIME'],
    image: 'https://picsum.photos/seed/home/800/400',
    type: 'SYSTEM'
  },
  {
    id: '04',
    title: 'SMART DUSTBIN IOT BASED',
    description: 'Intelligent control systems to optimize processes, reduce manual intervention, and provide real-time monitoring.',
    details: [
      'Implement intelligent control systems to optimize processes and reduce manual intervention',
      'Real-time equipment monitoring and predictive maintenance',
      'Ultrasonic sensor integration for fill-level detection'
    ],
    tags: ['IoT', 'Hardware', 'Sensors'],
    metrics: ['YEAR: 2025', 'MAINTENANCE: PREDICTIVE', 'CONTROL: AUTO'],
    image: 'https://picsum.photos/seed/dustbin/800/400',
    type: 'SYSTEM'
  },
  {
    id: '05',
    title: 'ACTIVE NOISE CANCELLATION',
    description: 'Led the whole project working with a group of 2+ people to implement active noise cancellation algorithms.',
    details: [
      'Led the whole project',
      'Worked with 2 more people as a group',
      'Real-time audio processing and phase inversion'
    ],
    tags: ['SignalProcessing', 'Audio', 'System'],
    metrics: ['YEAR: 2024', 'ROLE: PROJECT_LEAD', 'TEAM: 3_MEMBERS'],
    image: 'https://picsum.photos/seed/noise/800/400',
    type: 'SYSTEM'
  },
  {
    id: '06',
    title: 'ULTRA SONIC RADAR SYSTEM',
    description: 'Led the whole project team of 3. Selected for Project Expo 2024. Implements ultrasonic distance mapping.',
    details: [
      'Led the whole project',
      'Worked with 3 people as a team',
      'Selected For Project Expo 2024'
    ],
    tags: ['Radar', 'Arduino', 'Robotics'],
    metrics: ['YEAR: 2024', 'EXPO: SELECTED', 'TEAM: 3_MEMBERS'],
    image: 'https://picsum.photos/seed/radar/800/400',
    type: 'SYSTEM'
  }
];

// --- Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, rotateX: 15, z: -50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0, 
    z: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, z: -200, rotateX: 10 },
  visible: { 
    opacity: 1, 
    z: 0, 
    rotateX: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// --- Components ---

const TopNav = ({ activeSection }: { activeSection: Screen }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full h-16 border-b-4 border-primary bg-surface flex justify-between items-center px-6 z-50 shadow-[0_0_15px_rgba(255,180,168,0.15)]">
      <div className="text-xl font-bold text-primary text-glow uppercase tracking-widest font-sans">
        SAHIL'S PORTFOLIO
      </div>
      <nav className="hidden md:flex gap-8 items-center">
        {(['DASHBOARD', 'TECH_STACK', 'HISTORY', 'PROJECTS', 'CONTACT'] as Screen[]).map((screen) => (
          <motion.button
            key={screen}
            onClick={() => scrollTo(screen)}
            whileHover={{ scale: 1.1, rotateX: 10, translateZ: 10 }}
            className={`font-sans uppercase tracking-widest transition-all duration-75 hover:bg-primary/10 hover:skew-x-[-2deg] px-2 py-1 ${
              activeSection === screen ? 'text-primary border-b-2 border-primary' : 'text-outline-variant hover:text-primary'
            }`}
          >
            &gt;_{screen.split('_')[0]}
          </motion.button>
        ))}
      </nav>
      <div className="flex gap-4 items-center">
        <Terminal className="text-primary cursor-pointer hover:scale-110 transition-transform" size={20} />
      </div>
    </header>
  );
};

const SideNav = ({ activeSection }: { activeSection: Screen }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px-32px)] w-64 border-r border-outline-variant/20 bg-surface-container-low flex flex-col py-4 z-40 hidden md:flex">
      <div className="px-6 mb-8 border-l-4 border-primary ml-4">
        <div className="text-primary font-black text-sm">OPERATOR_01</div>
        <div className="text-primary/60 text-[10px] font-mono">ID: 77-04-A</div>
      </div>
      <div className="flex flex-col flex-1">
        <NavItem 
          active={activeSection === 'DASHBOARD'} 
          icon={<LayoutGrid size={16} />} 
          label="DASHBOARD" 
          onClick={() => scrollTo('DASHBOARD')} 
        />
        <NavItem 
          active={activeSection === 'TECH_STACK'} 
          icon={<FolderOpen size={16} />} 
          label="TECH_STACK" 
          onClick={() => scrollTo('TECH_STACK')} 
        />
        <NavItem 
          active={activeSection === 'HISTORY'} 
          icon={<Network size={16} />} 
          label="HISTORY" 
          onClick={() => scrollTo('HISTORY')} 
        />
        <NavItem 
          active={activeSection === 'PROJECTS'} 
          icon={<Cpu size={16} />} 
          label="PROJECTS" 
          onClick={() => scrollTo('PROJECTS')} 
        />
        <NavItem 
          active={activeSection === 'CONTACT'} 
          icon={<Mail size={16} />} 
          label="CONTACT" 
          onClick={() => scrollTo('CONTACT')} 
        />
      </div>
    </aside>
  );
};

const NavItem = ({ active, icon, label, onClick }: { active: boolean, icon: ReactNode, label: string, onClick: () => void }) => (
  <motion.button 
    onClick={onClick}
    whileHover={{ x: 5, translateZ: 10, rotateY: 5 }}
    className={`flex items-center gap-3 px-6 py-3 transition-all font-mono text-xs w-full text-left ${
      active 
        ? 'bg-primary text-surface-container-lowest font-black' 
        : 'text-primary/60 hover:text-primary hover:bg-surface-container-high'
    }`}
  >
    {icon} {label}
  </motion.button>
);

const Footer = () => {
  const [time, setTime] = useState(new Date().toISOString().replace('T', '_').split('.')[0]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString().replace('T', '_').split('.')[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="fixed bottom-0 w-full h-8 flex items-center bg-surface-container-lowest text-primary px-4 z-50 border-t border-primary/10 font-mono text-[10px] uppercase justify-between">
      <div className="flex items-center gap-4">
        <span className="blinking-cursor">[SYSTEM_READY]</span>
        <span className="text-outline-variant">LATENCY: 14ms</span>
        <span className="text-outline-variant">BRANCH: main</span>
        <span className="hidden md:inline text-outline-variant">TIMESTAMP: {time}</span>
      </div>
      <div className="flex gap-6">
        <button className="text-outline-variant hover:text-white transition-none flex items-center gap-1">
          <Lock size={10} /> ENCRYPT_LINK
        </button>
        <button className="text-outline-variant hover:text-white transition-none flex items-center gap-1">
          <RefreshCcw size={10} /> REBOOT_SYS
        </button>
      </div>
    </footer>
  );
};

// --- Sections ---

const Dashboard = () => {
  const [temp, setTemp] = useState<string>('38.0°C');

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
          const data = await response.json();
          if (data.current_weather && data.current_weather.temperature !== undefined) {
            setTemp(`${data.current_weather.temperature.toFixed(1)}°C`);
          }
        } catch (error) {
          console.error("Failed to fetch temperature:", error);
        }
      });
    }
  }, []);

  return (
    <section id="DASHBOARD" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 perspective-2000">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-20 flex flex-col items-center justify-center px-8 lg:px-24 w-full preserve-3d"
      >
        <motion.div variants={itemVariants} className="relative mb-12 group">
          <div className="absolute -inset-6 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-1000 animate-pulse"></div>
          <div className="absolute -inset-2 bg-gradient-to-tr from-primary/40 to-blue-400/40 rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-all duration-700"></div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-primary p-1 overflow-hidden shadow-[0_0_40px_rgba(255,180,168,0.4)]">
            <img 
              alt="Sahil Sinha" 
              className="w-full h-full object-cover rounded-full transition-all duration-700 brightness-110 contrast-105 group-hover:scale-110" 
              src="/Profile_Photo.jpeg"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-primary/5 to-transparent bg-[length:100%_8px] animate-scan opacity-20"></div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-6 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase shadow-[4px_4px_0px_#690100]">
            IDENTITY_VERIFIED
          </div>
        </motion.div>

        <div className="text-center max-w-2xl">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold uppercase tracking-[0.2em] text-primary text-glow mb-4">
            SAHIL SINHA
          </motion.h1>
          <motion.p variants={itemVariants} className="text-outline text-lg md:text-xl font-mono mb-10 tracking-widest uppercase"> Software Engineer & Web Developer </motion.p>
          <motion.button 
            variants={itemVariants} 
            onClick={() => document.getElementById('PROJECTS')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary text-on-primary px-10 py-4 font-black tracking-widest text-lg hover:translate-x-1 hover:-translate-y-1 active:translate-y-1 transition-all shadow-[4px_4px_0px_#690100] hover:shadow-[0px_0px_15px_rgba(255,180,168,0.5)]"
          >
            RUN_DIAGNOSTICS
          </motion.button>
        </div>

        {/* Detail Metrics */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ translateZ: 80, rotateY: 15 }}
          className="absolute top-24 right-8 text-right hidden xl:block preserve-3d"
        >
          <div className="mb-4">
            <div className="text-[10px] text-outline uppercase font-bold tracking-tighter">CPU_LOAD</div>
            <div className="text-2xl font-black text-primary font-mono">24.8%</div>
          </div>
          <div>
            <div className="text-[10px] text-outline uppercase font-bold tracking-tighter">TEMP_STABILITY</div>
            <div className="text-2xl font-black text-primary font-mono">{temp}</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const TechStack = () => (
  <section id="TECH_STACK" className="min-h-screen flex flex-col p-8 md:p-12 md:pl-72 pt-24 perspective-2000">
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full h-full flex flex-col preserve-3d"
    >
      <motion.header variants={itemVariants} className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tighter uppercase mb-2">
          <span className="text-primary-container">&gt;</span> TECH_STACK
        </h1>
        <div className="h-1 w-32 bg-primary"></div>
      </motion.header>

      <div className="grid grid-cols-12 grid-rows-6 gap-6 flex-1">
        <motion.div variants={itemVariants} className="col-span-12 lg:col-span-6 row-span-4 bg-surface-container-high border border-outline-variant/10 relative flex items-center justify-center group overflow-hidden min-h-[500px]">
          <div className="absolute top-4 left-4 font-mono text-[10px] text-primary/40 uppercase tracking-widest">Visualizer // Core_Nodes</div>
          <div className="relative w-full h-full flex items-center justify-center gap-6 md:gap-12 flex-wrap md:flex-nowrap p-12">
            <TechNode label="JAVA" version="v.21" delay={0} glow />
            <TechNode label="PY" version="v.3.12" offset="-translate-y-4" delay={0.5} glow />
            <TechNode label="C++" version="v.20" offset="translate-y-4" delay={1} glow />
            <TechNode label="REACT" version="v.19" delay={1.5} glow />
          </div>
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/20 shadow-[0_0_10px_#FFB4A8] opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-full h-[2px] bg-primary/10 shadow-[0_0_10px_#FFB4A8] opacity-30"></div>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-3 row-span-3 bg-surface-container border-l-4 border-primary p-6">
          <h2 className="font-mono text-sm font-black text-primary mb-6 flex items-center gap-2">
            <Code2 size={14} /> TECHNICAL_SKILLS
          </h2>
          <ul className="space-y-4 font-mono text-xs text-primary/80">
            {['PYTHON', 'C_PROGRAMMING', 'C++', 'JAVA', 'HTML', 'CSS', 'JAVASCRIPT', 'REACT'].map(lang => (
              <li key={lang} className="flex items-center gap-2 hover:text-primary cursor-crosshair transition-colors">
                <span className="text-primary">[■]</span> {lang}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-3 row-span-3 bg-surface-container border-l-4 border-primary p-6">
          <h2 className="font-mono text-sm font-black text-primary mb-6 flex items-center gap-2">
            <Layers size={14} /> FRAMEWORKS
          </h2>
          <ul className="space-y-4 font-mono text-xs text-primary/80">
            {['JAVASCRIPT', 'REACT_JS', 'TAILWIND_CSS', 'NODE_JS', 'NEXT_JS'].map(fw => (
              <li key={fw} className="flex items-center gap-2 hover:text-primary cursor-crosshair transition-colors">
                <span className="text-primary">[■]</span> {fw}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-12 lg:col-span-6 row-span-2 bg-surface-container-low border border-outline-variant/10 relative overflow-hidden group">
          <div className="absolute top-4 left-4 font-mono text-[10px] text-primary/40 uppercase tracking-widest flex items-center gap-2">
            <Wrench size={10} /> Visualizer // Infra_Subsystem
          </div>
          <div className="relative w-full h-full flex items-center justify-center gap-4 md:gap-6 p-8 flex-wrap">
            <ToolNode label="DOCKER" delay={0} />
            <ToolNode label="K8S" delay={0.4} />
            <ToolNode label="AWS" delay={0.8} />
            <ToolNode label="GIT" delay={1.2} />
            <ToolNode label="NODE" delay={1.6} />
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-primary/20 uppercase italic">Status: Link_Stable</div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

const ToolNode = ({ label, delay = 0 }: { label: string, delay?: number }) => (
  <motion.div 
    animate={{ 
      y: [0, -10, 0],
      boxShadow: ["0 0 5px rgba(255,180,168,0.1)", "0 0 15px rgba(255,180,168,0.4)", "0 0 5px rgba(255,180,168,0.1)"],
      borderColor: ["rgba(255,180,168,0.2)", "rgba(255,180,168,0.6)", "rgba(255,180,168,0.2)"]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
    whileHover={{ scale: 1.1, z: 30, rotateY: 10 }}
    className="w-20 h-16 bg-surface-container-highest border border-primary/40 flex items-center justify-center cursor-crosshair relative z-10 preserve-3d"
  >
    <span className="font-mono text-[10px] text-primary font-black tracking-widest">{label}</span>
  </motion.div>
);

const TechNode = ({ label, version, offset = "", glow = false, delay = 0 }: { label: string, version: string, offset?: string, glow?: boolean, delay?: number }) => (
  <motion.div 
    animate={{ 
      y: [0, -15, 0],
      rotateZ: [-1, 1, -1],
      boxShadow: glow 
        ? ["0 0 10px rgba(255,180,168,0.2)", "0 0 30px rgba(255,180,168,0.6)", "0 0 10px rgba(255,180,168,0.2)"]
        : "0 0 0px rgba(0,0,0,0)",
      borderColor: glow
        ? ["rgba(255,180,168,0.3)", "rgba(255,180,168,0.8)", "rgba(255,180,168,0.3)"]
        : "rgba(255,180,168,0.2)"
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
    whileHover={{ rotateY: 20, rotateX: -10, z: 50, scale: 1.1, y: -20 }}
    className={`w-28 h-28 bg-surface-container-highest border-2 flex flex-col items-center justify-center cursor-crosshair ${offset} relative z-10 preserve-3d`}
  >
    <div className="absolute -inset-1 bg-primary/5 rounded opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <span className="font-black text-2xl text-primary font-mono drop-shadow-[0_0_8px_rgba(255,180,168,0.5)]">{label}</span>
    <span className="text-[10px] text-primary font-mono mt-2 opacity-60 tracking-tighter">{version}</span>
  </motion.div>
);

const History = () => (
  <section id="HISTORY" className="min-h-screen p-8 md:p-12 md:pl-72 pt-24 perspective-2000">
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-5xl mx-auto preserve-3d"
    >
      <motion.header variants={itemVariants} className="mb-12 border-l-4 border-primary pl-6">
        <h1 className="text-4xl md:text-6xl font-black text-on-surface uppercase tracking-tight mb-2">
          <span className="text-primary">&gt;</span> history --log
        </h1>
        <p className="text-primary/60 font-mono text-sm tracking-widest uppercase">
          [SYSTEM_JOURNAL_STREAMS] // ACCESS_GRANTED
        </p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative">
        <div className="hidden md:block absolute left-[calc(50%-2px)] top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(255,180,168,0.4)] z-0"></div>
        
        <div className="md:col-span-5 flex flex-col space-y-12">
          <motion.div variants={itemVariants}>
            <HistorySection 
              id="01_CERTIFICATIONS" 
              title="Professional Credentials" 
              content="Entrepreneurship Strategies (2025), Software Engineering (2025), Academic Writing & IPR (2024), Critical Thinking (2024), Design Thinking (2024), Python for Data Science (2024), AI Cybersecurity (Coursera)."
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <HistorySection 
              id="02_LANGUAGES_&_HOBBIES" 
              title="Personal Profile" 
              content="Fluent in English and Hindi. Passionate about playing indoor games and listening to music during system downtime."
            />
          </motion.div>
        </div>

        <div className="hidden md:flex md:col-span-2 flex-col items-center justify-between py-12 relative z-20">
          {[1, 2, 3, 4].map(i => (
            <motion.div key={i} variants={itemVariants} className="w-4 h-4 bg-primary shadow-[0_0_10px_#FFB4A8]"></motion.div>
          ))}
        </div>

        <div className="md:col-span-5 flex flex-col space-y-12 pt-0 md:pt-24">
          <motion.div variants={itemVariants}>
            <ExperienceCard 
              period="2025—2026" 
              role="Project Lead & AI Developer" 
              company="GEN-AI YOLO / IOT PROJECTS" 
              points={['Led teams for AI Traffic Recognition', 'Developed Home Automation & Smart Dustbin systems', 'Implemented Active Noise Cancellation algorithms']}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-primary font-mono text-lg">ACADEMIC_RECORD</span>
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
            </div>
            <div className="bg-surface-container-highest p-6 border border-primary/20 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-black text-xl uppercase tracking-tighter text-on-surface">BE_COMPUTER_SCIENCE_ENG</h3>
                  <div className="text-sm font-mono text-primary mt-1">@CHANDIGARH_UNIVERSITY (2024-28)</div>
                  <div className="text-[10px] font-mono text-outline-variant mt-1">CURRENT_STATUS: 4th_SEMESTER</div>
                </div>
                <GraduationCap className="text-primary" size={24} />
              </div>
              <div className="border-t border-outline-variant/20 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-on-surface-variant">12th_GRADE // ST_KARENS_HIGH</span>
                  <span className="text-xs font-mono text-primary">76% [2024]</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-on-surface-variant">10th_GRADE // GYAN_JYOTI_PUBLIC</span>
                  <span className="text-xs font-mono text-primary">87% [2022]</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </section>
);

const HistorySection = ({ id, title, content }: { id: string, title: string, content: string }) => (
  <motion.section 
    whileHover={{ translateZ: 40, rotateY: -5, scale: 1.02 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="bg-surface-container p-6 border-l-2 border-primary-container relative z-10 preserve-3d shadow-lg cursor-default"
  >
    <div className="text-[10px] text-primary font-mono mb-2">{id}</div>
    <h2 className="text-xl font-bold mb-4 uppercase tracking-tighter">{title}</h2>
    <p className="text-on-surface-variant leading-relaxed text-sm">{content}</p>
  </motion.section>
);

const ExperienceCard = ({ period, role, company, points }: { period: string, role: string, company: string, points: string[] }) => (
  <motion.div 
    whileHover={{ translateZ: 40, rotateY: 5, scale: 1.02 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="relative z-10 preserve-3d cursor-default"
  >
    <div className="flex items-center space-x-4 mb-4">
      <span className="text-primary font-mono text-lg">{period}</span>
      <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
    </div>
    <div className="bg-surface-container-high p-6 shadow-xl">
      <h3 className="font-bold text-lg uppercase tracking-widest text-primary">{role}</h3>
      <div className="text-xs font-mono text-on-surface-variant mb-4">@{company}</div>
      <ul className="text-xs text-on-surface-variant/80 space-y-2 font-mono">
        {points.map((p, i) => <li key={i}>- {p}</li>)}
      </ul>
    </div>
  </motion.div>
);

const Projects = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'AI' | 'WEB' | 'SYSTEM'>('ALL');

  const filteredProjects = PROJECTS_DATA.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = filter === 'ALL' || p.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section id="PROJECTS" className="min-h-screen p-8 md:p-12 md:pl-72 pt-24 perspective-2000">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto preserve-3d"
      >
        <motion.header variants={itemVariants} className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter italic text-glow">
            <span className="text-primary mr-2">&gt;</span>PROJECT_SHOWCASE
          </h1>
          <p className="text-outline-variant font-mono text-sm tracking-widest mt-2">SYS_REF: ARCHIVE_DELTA_V.32</p>
        </motion.header>

        {/* Search & Filter Bar */}
        <motion.div variants={itemVariants} className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between bg-surface-container p-6 border border-primary/10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH_PROJECTS..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-lowest border border-primary/20 p-3 pl-10 text-primary font-mono text-sm focus:outline-none focus:border-primary transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary">
                <X size={18} />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            {(['ALL', 'AI', 'WEB', 'SYSTEM'] as const).map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 font-mono text-xs transition-all ${
                  filter === f 
                    ? 'bg-primary text-on-primary font-black' 
                    : 'bg-surface-container-highest text-primary/60 hover:text-primary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 border-2 border-dashed border-primary/10"
          >
            <p className="text-primary/40 font-mono uppercase tracking-widest">NO_PROJECTS_FOUND_IN_ARCHIVE</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      whileHover={{ 
        translateZ: 50, 
        rotateX: 2, 
        rotateY: -2,
        scale: 1.02
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-surface-container shadow-[0_0_40px_rgba(255,180,168,0.05)] border-l-4 border-primary relative flex flex-col group transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,180,168,0.15)] h-full preserve-3d"
    >
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer flex-1 flex flex-col"
      >
        <div className="bg-surface-container-high h-10 border-b border-outline-variant/30 flex items-center justify-between px-4">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-error"></div>
            <div className="w-2 h-2 bg-primary"></div>
            <div className="w-2 h-2 bg-surface-container-highest"></div>
          </div>
          <div className="text-[10px] font-mono text-primary/60 tracking-[0.2em]">NODE_{project.id}: {isExpanded ? 'EXPANDED' : 'ACTIVE'}</div>
        </div>
        <div className="p-8 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight">
              <span className="text-primary">&gt;</span>PROJECT_{project.id}:<br/>{project.title}
            </h2>
            <span className="text-[10px] font-mono border border-primary px-2 py-1 text-primary">STABLE_BUILD</span>
          </div>
          
          <motion.div layout className="relative h-48 bg-surface-container-lowest border border-outline/10 mb-6 overflow-hidden">
            <img 
              className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700" 
              src={project.image}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80"></div>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-primary space-y-1">
              {project.metrics.map((m, i) => <p key={i}>{m}</p>)}
            </div>
          </motion.div>

          <motion.p layout className="text-on-surface-variant font-mono text-sm leading-relaxed mb-6">{project.description}</motion.p>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="border-t border-primary/10 pt-4 space-y-2">
                  <div className="text-[10px] font-mono text-primary/40 uppercase mb-2 tracking-widest">System_Specifications:</div>
                  {project.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-mono text-on-surface-variant/80">
                      <span className="text-primary mt-1">↳</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div 
        onClick={(e) => e.stopPropagation()}
        className="project-footer relative z-40 flex items-center justify-between p-8 pt-0 mt-auto"
      >
        <div className="flex gap-2 flex-wrap">
          {project.tags.map(tag => (
            <span key={tag} className="bg-surface-container-highest px-3 py-1 text-[10px] font-mono text-primary">[{tag}]</span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="relative z-30 bg-primary text-on-primary font-black px-6 py-2 text-xs tracking-[0.2em] hover:bg-white hover:text-surface transition-all active:translate-y-1 flex items-center gap-2 group/btn shadow-[0_0_10px_rgba(255,180,168,0.2)]"
            >
              VIEW_LIVE <ExternalLink size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
          )}
          {project.sourceUrl && (
            <a 
              href={project.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="relative z-30 bg-surface-container-highest text-primary font-black px-6 py-2 text-xs tracking-[0.2em] hover:bg-primary hover:text-on-primary transition-all active:translate-y-1 flex items-center gap-2 border border-primary/20 group/btn"
            >
              VIEW_SOURCE <Code2 size={12} className="group-hover/btn:scale-110 transition-transform" />
            </a>
          )}
          {!project.sourceUrl && (
            <button 
              onClick={(e) => e.stopPropagation()}
              className="relative z-30 opacity-50 cursor-not-allowed bg-surface-container-highest text-primary font-black px-6 py-2 text-xs tracking-[0.2em] flex items-center gap-2 border border-primary/20"
            >
              VIEW_SOURCE <Code2 size={12} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://formspree.io/f/sahilsrivastwa3@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        // Check for setup error specifically
        if (data.error && data.error.includes("isn't set up yet")) {
          throw new Error("PENDING_ACTIVATION: Check sahilsrivastwa3@gmail.com (including Spam/Junk) for an activation email from Formspree. You MUST click 'Confirm' to enable the form.");
        }
        throw new Error(data.error || 'UPLINK_FAILURE: SIGNAL_NOT_RECEIVED');
      }
    } catch (err) {
      console.error('Contact Form Error:', err);
      setError(err instanceof Error ? err.message : 'UNSPECIFIED_SYSTEM_ERROR');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="CONTACT" className="min-h-screen p-8 md:p-12 md:pl-72 pt-24 perspective-2000">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto preserve-3d"
      >
        <motion.header variants={itemVariants} className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter italic text-glow">
            <span className="text-primary mr-2">&gt;</span>ESTABLISH_UPLINK
          </h1>
          <p className="text-outline-variant font-mono text-sm tracking-widest mt-2">SYS_REF: COMMS_PROTOCOL_VOICE.V4</p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Content Card with Moving Glow */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-7 relative group"
          >
            {/* Moving Glow Border Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-transparent to-primary/50 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            <div className="relative bg-surface-container-low border border-primary/20 p-8 shadow-2xl overflow-hidden">
              {/* Moving Glow Line */}
              <motion.div 
                animate={{ 
                  left: ["0%", "100%", "100%", "0%", "0%"],
                  top: ["0%", "0%", "100%", "100%", "0%"]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-20 h-[2px] bg-primary shadow-[0_0_15px_#FFB4A8] z-10"
              />

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">COMMS_ID // NAME</label>
                      <input 
                        id="contact-name"
                        name="name"
                        required
                        aria-required="true"
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-surface-container-lowest border border-primary/10 p-3 text-primary font-mono text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(255,180,168,0.2)] focus:bg-primary/5 transition-all duration-300"
                        placeholder="IDENTIFY_YOURSELF..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">ENCRYPTED_MAIL // EMAIL</label>
                      <input 
                        id="contact-email"
                        name="email"
                        required
                        aria-required="true"
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-surface-container-lowest border border-primary/10 p-3 text-primary font-mono text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(255,180,168,0.2)] focus:bg-primary/5 transition-all duration-300"
                        placeholder="INPUT_ADDRESS..."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">SIGNAL_SUB // SUBJECT</label>
                    <input 
                      id="contact-subject"
                      name="subject"
                      required
                      aria-required="true"
                      type="text" 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-surface-container-lowest border border-primary/10 p-3 text-primary font-mono text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(255,180,168,0.2)] focus:bg-primary/5 transition-all duration-300"
                      placeholder="MESSAGE_HEADER..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">DATA_PACKET // MESSAGE</label>
                    <textarea 
                      id="contact-message"
                      name="message"
                      required
                      aria-required="true"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-surface-container-lowest border border-primary/10 p-3 text-primary font-mono text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_20px_rgba(255,180,168,0.2)] focus:bg-primary/5 transition-all duration-300 resize-none"
                      placeholder="CONSTRUCT_SIGNAL..."
                    />
                  </div>

                  <div aria-live="polite">
                    {error && (
                      <div className="space-y-4 mb-4">
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }} 
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-error/10 border border-error/20 p-3 text-error font-mono text-[10px] uppercase tracking-widest flex items-center gap-2"
                        >
                          <X size={14} aria-hidden="true" /> ERROR: {error}
                        </motion.div>
                        
                        <button 
                          type="button"
                          onClick={() => window.location.href = `mailto:sahilsrivastwa3@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`}
                          className="w-full border border-primary/40 text-primary font-mono text-[10px] py-3 uppercase tracking-widest hover:bg-primary/5 focus:bg-primary/10 focus:outline-none transition-all text-center flex items-center justify-center gap-2"
                        >
                          <ExternalLink size={14} aria-hidden="true" /> OVERRIDE_SYSTEM: USE_DIRECT_MAIL_UPLINK
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="bg-primary text-on-primary font-black py-4 uppercase tracking-[0.2em] text-xs hover:translate-x-1 hover:-translate-y-1 focus:translate-x-1 focus:-translate-y-1 focus:outline-none transition-all shadow-[4px_4px_0px_#690100] focus:shadow-none active:translate-y-0 active:shadow-none flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <RefreshCcw className="animate-spin" size={16} aria-hidden="true" />
                      ) : (
                        <>SEND_DATA_PACKET <Send size={16} aria-hidden="true" /></>
                      )}
                    </button>
                    
                    <button 
                      type="button"
                      aria-label="Direct email system override"
                      onClick={() => window.location.href = `mailto:sahilsrivastwa3@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio_Inquiry')}&body=${encodeURIComponent(formData.message)}`}
                      className="border-2 border-primary text-primary font-black py-4 uppercase tracking-[0.2em] text-xs hover:bg-primary/10 focus:bg-primary/10 focus:outline-none transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-primary/5 animate-pulse pointer-events-none"></div>
                      <Lock size={16} className="text-primary/60" aria-hidden="true" /> SYSTEM_OVERRIDE
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto border-2 border-primary animate-pulse">
                    <Send className="text-primary" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-primary uppercase">SIGNAL_TRANSMITTED</h3>
                    <p className="text-on-surface-variant font-mono text-xs mt-2">UPLINK_SUCCESSFUL // EXPECT_RESPONSE_SOON</p>
                  </div>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-mono text-[10px] uppercase tracking-widest border border-primary/30 px-4 py-2 hover:bg-primary/10 transition-all"
                  >
                    RETURN_TO_COMMS
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-surface-container-low border-l-4 border-primary p-6 space-y-6">
              <h2 className="text-xl font-bold text-primary uppercase flex items-center gap-3">
                <Terminal size={18} /> OPERATOR_CHANNELS
              </h2>
              
              <div className="space-y-4">
                <button 
                  aria-label="Send direct email to Sahil Sinha"
                  className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors cursor-pointer group w-full text-left focus:outline-none focus:bg-primary/5 p-2 rounded" 
                  onClick={() => window.location.href = 'mailto:sahilsrivastwa3@gmail.com'}
                >
                  <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center border border-primary/10 group-hover:border-primary/40 group-focus:border-primary/40">
                    <Mail size={16} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono opacity-40 uppercase">Direct_Line</div>
                    <div className="text-xs font-mono">sahilsrivastwa3@gmail.com</div>
                  </div>
                </button>

                <button 
                  aria-label="Send email to Sahil Sinha's college address"
                  className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors cursor-pointer group w-full text-left focus:outline-none focus:bg-primary/5 p-2 rounded" 
                  onClick={() => window.location.href = 'mailto:24bcs10164@cuchd.in'}
                >
                  <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center border border-primary/10 group-hover:border-primary/40 group-focus:border-primary/40">
                    <GraduationCap size={16} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono opacity-40 uppercase">Academic_Uplink</div>
                    <div className="text-xs font-mono">24bcs10164@cuchd.in</div>
                  </div>
                </button>

                <button 
                  aria-label="View LinkedIn Profile"
                  className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors cursor-pointer group w-full text-left focus:outline-none focus:bg-primary/5 p-2 rounded" 
                  onClick={() => window.open('https://www.linkedin.com/in/sahil-sinha-512214333', '_blank')}
                >
                  <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center border border-primary/10 group-hover:border-primary/40 group-focus:border-primary/40">
                    <Linkedin size={16} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono opacity-40 uppercase">Professional_Uplink</div>
                    <div className="text-xs font-mono">linkedin.com/in/sahil-sinha-512214333</div>
                  </div>
                </button>

                <button 
                  aria-label="View GitHub Portfolio"
                  className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors cursor-pointer group w-full text-left focus:outline-none focus:bg-primary/5 p-2 rounded" 
                  onClick={() => window.open('https://github.com/sahil09-r', '_blank')}
                >
                  <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center border border-primary/10 group-hover:border-primary/40 group-focus:border-primary/40">
                    <Github size={16} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono opacity-40 uppercase">Source_Repository</div>
                    <div className="text-xs font-mono">github.com/sahil09-r</div>
                  </div>
                </button>

                <div className="flex items-center gap-4 text-on-surface-variant p-2">
                  <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center border border-primary/10">
                    <MapPin size={16} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono opacity-40 uppercase">Base_Coord</div>
                    <div className="text-xs font-mono">CHANDIGARH_UNIVERSITY // CU</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-primary/10">
                <div className="text-[10px] font-mono text-primary/40 uppercase mb-4 tracking-widest italic">Digital_Artifacts:</div>
                <div className="flex gap-4">
                  {['GH', 'IN', 'TW', 'DR'].map(social => (
                    <button 
                      key={social} 
                      aria-label={`Link to ${social}`}
                      className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-[10px] font-mono text-primary/60 hover:text-primary hover:border-primary focus:border-primary focus:outline-none cursor-pointer transition-all"
                    >
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 blur-2xl"></div>
              <div className="relative z-10 font-mono text-[10px] text-primary/70 leading-relaxed uppercase">
                &gt; NOTICE: SYSTEM_MONITORING_ACTIVE<br/>
                &gt; ALL_DATA_PACKETS_ARE_ENCRYPTED_AND<br/>
                &gt; LOGGED_FOR_AUDIT. RESPONSE_TIME_VARY<br/>
                &gt; BASED_ON_NETWORK_LATENCY.
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// --- Custom Cursor ---

const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Primary Glow Node */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="absolute inset-0 bg-primary blur-[4px] rounded-full"></div>
      </motion.div>
      
      {/* Atmospheric Trailing Glow */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 bg-primary/10 rounded-full pointer-events-none z-[9998] blur-[40px]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Target Crosshair */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-primary/20 rounded-full pointer-events-none z-[9997]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  );
};

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState<Screen>('DASHBOARD');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as Screen);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-surface text-on-surface font-sans selection:bg-primary selection:text-on-primary overflow-x-hidden cursor-none">
      <CursorGlow />
      {/* Background Effects */}
      <div className="fixed inset-0 wireframe-grid opacity-20 pointer-events-none z-0"></div>
      <div className="fixed inset-0 scanline opacity-20 pointer-events-none z-50"></div>
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-10">
        <div className="w-full h-[1px] bg-primary shadow-[0_0_10px_rgba(255,180,168,1)] animate-scan"></div>
      </div>

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left" style={{ scaleX }} />

      <TopNav activeSection={activeSection} />
      <SideNav activeSection={activeSection} />

      <main className="relative md:ml-64 pb-8">
        <Dashboard />
        <TechStack />
        <History />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
