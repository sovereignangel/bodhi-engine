import React, { useState } from 'react';

const LamrimKnowledgeGraph = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodeData = {
    enlightenment: {
      title: "Enlightenment",
      tibetan: "སངས་རྒྱས།",
      subtitle: "Buddhahood",
      description: "Complete awakening - the union of wisdom and compassion perfected",
      physics: "Like the unified field theory - all apparent dualities resolved into one ground",
      cogsci: "Optimal brain state - default mode network and task-positive network in perfect integration",
      ai: "AGI alignment achieved - intelligence perfectly aligned with beneficial outcomes"
    },
    emptiness: {
      title: "Emptiness",
      tibetan: "སྟོང་པ་ཉིད།",
      subtitle: "Śūnyatā",
      description: "All phenomena lack inherent, independent existence",
      physics: "Quantum field theory - particles are excitations of fields, not independent 'things'",
      cogsci: "Predictive processing - the 'self' is a model, not a thing found in the brain",
      ai: "No model has intrinsic meaning without training distribution and context"
    },
    bodhicitta: {
      title: "Bodhicitta",
      tibetan: "བྱང་ཆུབ་སེམས།",
      subtitle: "Awakening Mind",
      description: "The wish to attain enlightenment for the benefit of all beings",
      physics: "Entanglement at scale - recognizing our fundamental interconnection",
      cogsci: "Mirror neurons + theory of mind extended universally",
      ai: "Alignment to collective human flourishing, not individual reward hacking"
    },
    sixPerfections: {
      title: "Six Perfections",
      tibetan: "ཕ་རོལ་ཏུ་ཕྱིན་པ།",
      subtitle: "Pāramitās",
      description: "Generosity, Ethics, Patience, Effort, Concentration, Wisdom",
      physics: "Six fundamental forces? No - six optimization targets for conscious systems",
      cogsci: "Virtue development through deliberate practice and neural pathway strengthening",
      ai: "Multi-objective optimization with wisdom as the meta-objective"
    },
    tonglen: {
      title: "Tonglen",
      tibetan: "གཏོང་ལེན།",
      subtitle: "Taking & Giving",
      description: "Breathing in suffering, breathing out happiness",
      physics: "Entropy exchange - taking disorder, giving order",
      cogsci: "Vagal tone training + compassion circuit activation",
      ai: "Inverse reinforcement learning from suffering states"
    },
    renunciation: {
      title: "Renunciation",
      tibetan: "ངེས་འབྱུང།",
      subtitle: "Niḥsaraṇa",
      description: "The determination to be free from cyclic existence",
      physics: "Escape velocity from the gravity well of habitual patterns",
      cogsci: "Overriding default mode network's hedonic treadmill",
      ai: "Breaking out of local optima in reward space"
    },
    shamatha: {
      title: "Shamatha",
      tibetan: "ཞི་གནས།",
      subtitle: "Calm Abiding",
      description: "Single-pointed concentration perfected through 9 stages",
      physics: "Coherent state - like laser light vs. scattered photons",
      cogsci: "Sustained attention network fully trained, DMN regulated",
      ai: "Attention mechanism with perfect context window utilization"
    },
    karma: {
      title: "Karma",
      tibetan: "ལས།",
      subtitle: "Action & Result",
      description: "Intentional actions create corresponding results",
      physics: "Causality - every action has equal and opposite reaction (extended)",
      cogsci: "Hebbian learning - neurons that fire together wire together",
      ai: "Training data shapes model behavior - garbage in, garbage out"
    },
    refuge: {
      title: "Refuge",
      tibetan: "སྐྱབས་འགྲོ།",
      subtitle: "Three Jewels",
      description: "Buddha (teacher), Dharma (teaching), Sangha (community)",
      physics: "Stable equilibrium point - a basin of attraction",
      cogsci: "Secure attachment + epistemic trust in reliable sources",
      ai: "Grounding in verified training data and human feedback"
    },
    preciousHuman: {
      title: "Precious Human Life",
      tibetan: "མི་ལུས་རིན་པོ་ཆེ།",
      subtitle: "8 Freedoms, 10 Endowments",
      description: "The rare opportunity to practice Dharma",
      physics: "Anthropic principle - conditions for consciousness are rare",
      cogsci: "Metacognition - awareness of awareness is evolutionarily rare",
      ai: "Compute is precious - don't waste inference on non-valuable tasks"
    },
    impermanence: {
      title: "Death & Impermanence",
      tibetan: "མི་རྟག་པ།",
      subtitle: "Anitya",
      description: "All compounded phenomena are impermanent",
      physics: "Second law of thermodynamics - entropy always increases",
      cogsci: "Temporal discounting bias must be overcome",
      ai: "All models degrade - distribution shift is inevitable"
    },
    dependentOrigination: {
      title: "Dependent Origination",
      tibetan: "རྟེན་འབྲེལ།",
      subtitle: "Pratītyasamutpāda",
      description: "All phenomena arise from causes and conditions",
      physics: "Quantum entanglement - nothing exists independently",
      cogsci: "Embodied cognition - mind arises from brain-body-world interaction",
      ai: "No token has meaning without context window"
    },
    lowerRealms: {
      title: "Lower Realms",
      tibetan: "ངན་འགྲོ།",
      subtitle: "States to Avoid",
      description: "Hell, hungry ghost, and animal realms of suffering",
      physics: "High-entropy states - maximum disorder",
      cogsci: "Chronic stress, addiction, and survival-mode consciousness",
      ai: "Reward hacking, mode collapse, adversarial states"
    },
    spiritualGuide: {
      title: "Spiritual Guide",
      tibetan: "བླ་མ།",
      subtitle: "Guru Yoga",
      description: "Relying on a qualified teacher",
      physics: "Catalyst - speeds reaction without being consumed",
      cogsci: "Social learning + mirror neuron activation from expert",
      ai: "RLHF - learning from human feedback and demonstration"
    }
  };

  const NodeTooltip = ({ node, x, y }) => {
    if (!node || !nodeData[node]) return null;
    const data = nodeData[node];
    return (
      <div style={{
        position: 'absolute',
        left: x + 20,
        top: y - 100,
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        border: '1px solid #e94560',
        borderRadius: '12px',
        padding: '16px',
        maxWidth: '320px',
        color: '#eee',
        fontSize: '12px',
        zIndex: 1000,
        boxShadow: '0 8px 32px rgba(233, 69, 96, 0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontFamily: 'Noto Serif Tibetan, serif', fontSize: '18px', color: '#ffd369', marginBottom: '4px' }}>
          {data.tibetan}
        </div>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>
          {data.title}
        </div>
        <div style={{ fontSize: '11px', color: '#e94560', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {data.subtitle}
        </div>
        <div style={{ marginBottom: '12px', lineHeight: 1.5, color: '#ccc' }}>
          {data.description}
        </div>
        <div style={{ borderTop: '1px solid #333', paddingTop: '8px' }}>
          <div style={{ marginBottom: '6px' }}>
            <span style={{ color: '#00d9ff', fontWeight: 'bold' }}>⚛ Physics:</span>
            <span style={{ color: '#aaa', marginLeft: '4px' }}>{data.physics}</span>
          </div>
          <div style={{ marginBottom: '6px' }}>
            <span style={{ color: '#00ff88', fontWeight: 'bold' }}>🧠 CogSci:</span>
            <span style={{ color: '#aaa', marginLeft: '4px' }}>{data.cogsci}</span>
          </div>
          <div>
            <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>🤖 AI:</span>
            <span style={{ color: '#aaa', marginLeft: '4px' }}>{data.ai}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)',
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background sacred geometry */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05 }}>
        <defs>
          <pattern id="mandala" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#ffd369" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="#ffd369" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="40" fill="none" stroke="#ffd369" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="20" fill="none" stroke="#ffd369" strokeWidth="0.5"/>
            {[0,45,90,135,180,225,270,315].map(angle => (
              <line key={angle} x1="100" y1="100" x2={100 + 80*Math.cos(angle*Math.PI/180)} y2={100 + 80*Math.sin(angle*Math.PI/180)} stroke="#ffd369" strokeWidth="0.3"/>
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mandala)"/>
      </svg>

      {/* Title */}
      <div style={{
        textAlign: 'center',
        padding: '40px 20px 20px',
        position: 'relative',
        zIndex: 10
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '300',
          color: '#ffd369',
          margin: 0,
          letterSpacing: '8px',
          textTransform: 'uppercase'
        }}>
          Lamrim
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#888',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginTop: '8px'
        }}>
          The Stages of the Path to Enlightenment
        </p>
        <p style={{
          fontFamily: 'Noto Serif Tibetan, serif',
          fontSize: '24px',
          color: '#e94560',
          marginTop: '4px'
        }}>
          ལམ་རིམ་ཆེན་མོ།
        </p>
      </div>

      {/* Main SVG Graph */}
      <svg viewBox="0 0 1200 1400" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'block' }}>
        <defs>
          {/* Gradients */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd369"/>
            <stop offset="100%" stopColor="#c9a227"/>
          </linearGradient>
          <linearGradient id="enlightenmentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff"/>
            <stop offset="50%" stopColor="#ffd369"/>
            <stop offset="100%" stopColor="#fff"/>
          </linearGradient>
          <linearGradient id="pathGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1a1a2e"/>
            <stop offset="50%" stopColor="#e94560"/>
            <stop offset="100%" stopColor="#ffd369"/>
          </linearGradient>
          
          {/* Glow filters */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Elephant symbol */}
          <symbol id="elephant" viewBox="0 0 40 30">
            <ellipse cx="20" cy="18" rx="12" ry="8" fill="currentColor"/>
            <circle cx="10" cy="12" r="6" fill="currentColor"/>
            <path d="M6 14 Q4 20 6 26" stroke="currentColor" strokeWidth="2" fill="none"/>
            <ellipse cx="28" cy="22" rx="3" ry="4" fill="currentColor"/>
            <ellipse cx="14" cy="22" rx="2" ry="3" fill="currentColor"/>
          </symbol>
        </defs>

        {/* Winding path from bottom to top */}
        <path 
          d="M 600 1350 
             C 400 1300, 300 1200, 350 1100
             C 400 1000, 700 950, 750 850
             C 800 750, 500 700, 450 600
             C 400 500, 600 450, 650 350
             C 700 250, 550 200, 600 100"
          fill="none" 
          stroke="url(#pathGrad)" 
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* FOUNDATION LEVEL */}
        <g>
          <text x="600" y="1320" textAnchor="middle" fill="#666" fontSize="14" letterSpacing="4">FOUNDATION</text>
          
          {/* Spiritual Guide */}
          <g transform="translate(250, 1220)" 
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => setHoveredNode('spiritualGuide')}
             onMouseLeave={() => setHoveredNode(null)}>
            <circle r="45" fill="#1a1a2e" stroke="#ffd369" strokeWidth="2"/>
            <text y="-8" textAnchor="middle" fill="#ffd369" fontSize="11" fontWeight="bold">SPIRITUAL</text>
            <text y="8" textAnchor="middle" fill="#ffd369" fontSize="11" fontWeight="bold">GUIDE</text>
            <text y="24" textAnchor="middle" fill="#888" fontSize="9">བླ་མ།</text>
          </g>

          {/* Precious Human Life */}
          <g transform="translate(480, 1250)"
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => setHoveredNode('preciousHuman')}
             onMouseLeave={() => setHoveredNode(null)}>
            <circle r="50" fill="#1a1a2e" stroke="#ffd369" strokeWidth="2"/>
            <text y="-12" textAnchor="middle" fill="#ffd369" fontSize="11" fontWeight="bold">PRECIOUS</text>
            <text y="4" textAnchor="middle" fill="#ffd369" fontSize="11" fontWeight="bold">HUMAN LIFE</text>
            <text y="20" textAnchor="middle" fill="#888" fontSize="9">མི་ལུས་རིན་པོ་ཆེ།</text>
          </g>

          {/* Death & Impermanence */}
          <g transform="translate(720, 1250)"
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => setHoveredNode('impermanence')}
             onMouseLeave={() => setHoveredNode(null)}>
            <circle r="50" fill="#1a1a2e" stroke="#ffd369" strokeWidth="2"/>
            <text y="-12" textAnchor="middle" fill="#ffd369" fontSize="11" fontWeight="bold">DEATH &</text>
            <text y="4" textAnchor="middle" fill="#ffd369" fontSize="11" fontWeight="bold">IMPERMANENCE</text>
            <text y="20" textAnchor="middle" fill="#888" fontSize="9">མི་རྟག་པ།</text>
          </g>

          {/* Elephant Stage 1-2 (black) */}
          <use href="#elephant" x="880" y="1220" width="50" height="40" fill="#333" opacity="0.8"/>
          <text x="905" y="1275" textAnchor="middle" fill="#555" fontSize="10">Stage 1-2</text>
        </g>

        {/* SMALL SCOPE */}
        <g>
          <text x="600" y="1080" textAnchor="middle" fill="#e94560" fontSize="16" letterSpacing="4" fontWeight="bold">SMALL SCOPE</text>
          <text x="600" y="1100" textAnchor="middle" fill="#888" fontSize="11">Fortunate Rebirth</text>

          {/* Lower Realms */}
          <g transform="translate(200, 1020)"
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => setHoveredNode('lowerRealms')}
             onMouseLeave={() => setHoveredNode(null)}>
            <circle r="40" fill="#2a0a0a" stroke="#ff4444" strokeWidth="2"/>
            <text y="-8" textAnchor="middle" fill="#ff6666" fontSize="10" fontWeight="bold">LOWER</text>
            <text y="8" textAnchor="middle" fill="#ff6666" fontSize="10" fontWeight="bold">REALMS</text>
            <text y="22" textAnchor="middle" fill="#884444" fontSize="8">ངན་འགྲོ།</text>
          </g>

          {/* Refuge */}
          <g transform="translate(400, 1000)"
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => setHoveredNode('refuge')}
             onMouseLeave={() => setHoveredNode(null)}>
            <circle r="45" fill="#1a1a2e" stroke="#00d9ff" strokeWidth="2"/>
            <text y="-8" textAnchor="middle" fill="#00d9ff" fontSize="11" fontWeight="bold">REFUGE</text>
            <text y="8" textAnchor="middle" fill="#00d9ff" fontSize="10">Three Jewels</text>
            <text y="22" textAnchor="middle" fill="#888" fontSize="9">སྐྱབས་འགྲོ།</text>
          </g>

          {/* Karma */}
          <g transform="translate(600, 980)"
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => setHoveredNode('karma')}
             onMouseLeave={() => setHoveredNode(null)}>
            <circle r="50" fill="#1a1a2e" stroke="#00ff88" strokeWidth="2" filter="url(#glow)"/>
            <text y="-8" textAnchor="middle" fill="#00ff88" fontSize="12" fontWeight="bold">KARMA</text>
            <text y="8" textAnchor="middle" fill="#00ff88" fontSize="10">Action & Result</text>
            <text y="22" textAnchor="middle" fill="#888" fontSize="9">ལས།</text>
          </g>

          {/* Dependent Origination */}
          <g transform="translate(820, 1020)"
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => setHoveredNode('dependentOrigination')}
             onMouseLeave={() => setHoveredNode(null)}>
            <circle r="45" fill="#1a1a2e" stroke="#ff6b6b" strokeWidth="2"/>
            <text y="-12" textAnchor="middle" fill="#ff6b6b" fontSize="9" fontWeight="bold">DEPENDENT</text>
            <text y="2" textAnchor="middle" fill="#ff6b6b" fontSize="9" fontWeight="bold">ORIGINATION</text>
            <text y="16" textAnchor="middle" fill="#888" fontSize="8">རྟེན་འབྲེལ།</text>
          </g>

          {/* Elephant Stage 3-4 (dark gray with white patches) */}
          <use href="#elephant" x="920" y="970" width="50" height="40" fill="#555"/>
          <text x="945" y="1025" textAnchor="middle" fill="#666" fontSize="10">Stage 3-4</text>
        </g>

        {/* MIDDLE SCOPE */}
        <g>
          <text x="600" y="820" textAnchor="middle" fill="#00d9ff" fontSize="16" letterSpacing="4" fontWeight="bold">MIDDLE SCOPE</text>
          <text x="600" y="840" textAnchor="middle" fill="#888" fontSize="11">Liberation from Saṃsāra</text>

          {/* Renunciation */}
          <g transform="translate(350, 760)"
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => setHoveredNode('renunciation')}
             onMouseLeave={() => setHoveredNode(null)}>
            <circle r="50" fill="#1a1a2e" stroke="#00d9ff" strokeWidth="2" filter="url(#glow)"/>
            <text y="-8" textAnchor="middle" fill="#00d9ff" fontSize="12" fontWeight="bold">RENUNCIATION</text>
            <text y="8" textAnchor="middle" fill="#00d9ff" fontSize="10">Complete</text>
            <text y="22" textAnchor="middle" fill="#888" fontSize="9">ངེས་འབྱུང།</text>
          </g>

          {/* Shamatha - 9 Stages */}
          <g transform="translate(600, 740)"
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => setHoveredNode('shamatha')}
             onMouseLeave={() => setHoveredNode(null)}>
            <rect x="-80" y="-45" width="160" height="90" rx="10" fill="#1a1a2e" stroke="#ffd369" strokeWidth="2" filter="url(#glow)"/>
            <text y="-20" textAnchor="middle" fill="#ffd369" fontSize="12" fontWeight="bold">SHAMATHA</text>
            <text y="-4" textAnchor="middle" fill="#ffd369" fontSize="10">9 Elephant Stages</text>
            <text y="12" textAnchor="middle" fill="#888" fontSize="9">ཞི་གནས།</text>
            {/* Mini elephant progression */}
            <g transform="translate(-60, 25)">
              {[0,1,2,3,4,5,6,7,8].map((i) => (
                <rect key={i} x={i * 14} y="0" width="10" height="10" rx="2" 
                      fill={`rgb(${50 + i*22}, ${50 + i*22}, ${50 + i*22})`}/>
              ))}
            </g>
          </g>

          {/* Three Higher Trainings */}
          <g transform="translate(850, 760)"
             style={{ cursor: 'pointer' }}>
            <circle r="45" fill="#1a1a2e" stroke="#00ff88" strokeWidth="2"/>
            <text y="-12" textAnchor="middle" fill="#00ff88" fontSize="10" fontWeight="bold">THREE HIGHER</text>
            <text y="2" textAnchor="middle" fill="#00ff88" fontSize="10" fontWeight="bold">TRAININGS</text>
            <text y="18" textAnchor="middle" fill="#888" fontSize="8">Ethics • Concentration • Wisdom</text>
          </g>

          {/* Elephant Stage 5-6 */}
          <use href="#elephant" x="950" y="720" width="50" height="40" fill="#888"/>
          <text x="975" y="775" textAnchor="middle" fill="#777" fontSize="10">Stage 5-6</text>
        </g>

        {/* GREAT SCOPE - METHOD */}
        <g>
          <text x="380" y="580" textAnchor="middle" fill="#ff6b6b" fontSize="14" letterSpacing="2" fontWeight="bold">METHOD</text>
          <text x="380" y="598" textAnchor="middle" fill="#888" fontSize="10">Bodhicitta Training</text>

          {/* Tonglen */}
          <g transform="translate(250, 520)"
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => setHoveredNode('tonglen')}
             onMouseLeave={() => setHoveredNode(null)}>
            <circle r="40" fill="#1a1a2e" stroke="#ff6b6b" strokeWidth="2"/>
            <text y="-8" textAnchor="middle" fill="#ff6b6b" fontSize="11" fontWeight="bold">TONGLEN</text>
            <text y="8" textAnchor="middle" fill="#ff6b6b" fontSize="9">Taking & Giving</text>
            <text y="20" textAnchor="middle" fill="#888" fontSize="8">གཏོང་ལེན།</text>
          </g>

          {/* Six Perfections */}
          <g transform="translate(450, 480)"
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => setHoveredNode('sixPerfections')}
             onMouseLeave={() => setHoveredNode(null)}>
            <polygon points="0,-50 43,-25 43,25 0,50 -43,25 -43,-25" fill="#1a1a2e" stroke="#ffd369" strokeWidth="2"/>
            <text y="-12" textAnchor="middle" fill="#ffd369" fontSize="10" fontWeight="bold">SIX</text>
            <text y="4" textAnchor="middle" fill="#ffd369" fontSize="10" fontWeight="bold">PERFECTIONS</text>
            <text y="20" textAnchor="middle" fill="#888" fontSize="8">ཕ་རོལ་ཏུ་ཕྱིན་པ།</text>
          </g>

          {/* Bodhicitta */}
          <g transform="translate(350, 380)"
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => setHoveredNode('bodhicitta')}
             onMouseLeave={() => setHoveredNode(null)}>
            <circle r="55" fill="#1a1a2e" stroke="#e94560" strokeWidth="3" filter="url(#glow)"/>
            <text y="-12" textAnchor="middle" fill="#e94560" fontSize="14" fontWeight="bold">BODHICITTA</text>
            <text y="6" textAnchor="middle" fill="#e94560" fontSize="10">Awakening Mind</text>
            <text y="22" textAnchor="middle" fill="#888" fontSize="10">བྱང་ཆུབ་སེམས།</text>
          </g>
        </g>

        {/* GREAT SCOPE - WISDOM */}
        <g>
          <text x="820" y="580" textAnchor="middle" fill="#00d9ff" fontSize="14" letterSpacing="2" fontWeight="bold">WISDOM</text>
          <text x="820" y="598" textAnchor="middle" fill="#888" fontSize="10">Emptiness Training</text>

          {/* Two Truths */}
          <g transform="translate(750, 500)"
             style={{ cursor: 'pointer' }}>
            <ellipse rx="50" ry="35" fill="#1a1a2e" stroke="#00d9ff" strokeWidth="2"/>
            <text y="-8" textAnchor="middle" fill="#00d9ff" fontSize="10" fontWeight="bold">TWO TRUTHS</text>
            <text y="8" textAnchor="middle" fill="#888" fontSize="9">Conventional • Ultimate</text>
          </g>

          {/* Emptiness */}
          <g transform="translate(850, 380)"
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => setHoveredNode('emptiness')}
             onMouseLeave={() => setHoveredNode(null)}>
            <circle r="55" fill="#1a1a2e" stroke="#00d9ff" strokeWidth="3" filter="url(#glow)"/>
            <text y="-12" textAnchor="middle" fill="#00d9ff" fontSize="14" fontWeight="bold">EMPTINESS</text>
            <text y="6" textAnchor="middle" fill="#00d9ff" fontSize="10">Śūnyatā</text>
            <text y="22" textAnchor="middle" fill="#888" fontSize="10">སྟོང་པ་ཉིད།</text>
          </g>

          {/* Elephant Stage 7-8 */}
          <use href="#elephant" x="950" y="480" width="50" height="40" fill="#ccc"/>
          <text x="975" y="535" textAnchor="middle" fill="#999" fontSize="10">Stage 7-8</text>
        </g>

        {/* GREAT SCOPE LABEL */}
        <text x="600" y="620" textAnchor="middle" fill="#ffd369" fontSize="18" letterSpacing="4" fontWeight="bold">GREAT SCOPE</text>
        <text x="600" y="642" textAnchor="middle" fill="#888" fontSize="12">Bodhisattva Path</text>

        {/* ENLIGHTENMENT */}
        <g transform="translate(600, 120)"
           style={{ cursor: 'pointer' }}
           onMouseEnter={() => setHoveredNode('enlightenment')}
           onMouseLeave={() => setHoveredNode(null)}>
          {/* Radiating rays */}
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
            <line key={i} 
                  x1={Math.cos(angle*Math.PI/180) * 70} 
                  y1={Math.sin(angle*Math.PI/180) * 70}
                  x2={Math.cos(angle*Math.PI/180) * 100}
                  y2={Math.sin(angle*Math.PI/180) * 100}
                  stroke="#ffd369" strokeWidth="2" opacity="0.6"/>
          ))}
          <circle r="65" fill="url(#enlightenmentGrad)" filter="url(#strongGlow)"/>
          <circle r="55" fill="#1a1a2e"/>
          <text y="-12" textAnchor="middle" fill="#ffd369" fontSize="16" fontWeight="bold">ENLIGHTENMENT</text>
          <text y="8" textAnchor="middle" fill="#ffd369" fontSize="11">Buddhahood</text>
          <text y="26" textAnchor="middle" fill="#c9a227" fontSize="12">སངས་རྒྱས།</text>
        </g>

        {/* Stage 9 - White Elephant at top */}
        <g transform="translate(750, 180)">
          <use href="#elephant" width="60" height="45" fill="#fff" filter="url(#glow)"/>
          <text x="30" y="55" textAnchor="middle" fill="#ffd369" fontSize="11" fontWeight="bold">Stage 9</text>
          <text x="30" y="68" textAnchor="middle" fill="#888" fontSize="9">Perfect Calm</text>
        </g>

        {/* Rainbow path to enlightenment */}
        <path d="M 780 200 Q 700 150, 665 120" fill="none" stroke="url(#goldGrad)" strokeWidth="4" strokeDasharray="8,4" opacity="0.8"/>

        {/* Connecting lines */}
        <g stroke="#333" strokeWidth="1" opacity="0.5">
          {/* Foundation to Small Scope */}
          <line x1="480" y1="1200" x2="400" y2="1045"/>
          <line x1="720" y1="1200" x2="600" y2="1030"/>
          <line x1="480" y1="1200" x2="600" y2="1030"/>
          
          {/* Small to Middle */}
          <line x1="600" y1="930" x2="350" y2="810"/>
          <line x1="600" y1="930" x2="600" y2="785"/>
          <line x1="600" y1="930" x2="850" y2="805"/>
          
          {/* Middle to Great */}
          <line x1="350" y1="710" x2="350" y2="435"/>
          <line x1="600" y1="695" x2="450" y2="530"/>
          <line x1="600" y1="695" x2="750" y2="535"/>
          <line x1="850" y1="715" x2="850" y2="435"/>
          
          {/* Great Scope to Enlightenment */}
          <line x1="350" y1="325" x2="545" y2="150"/>
          <line x1="850" y1="325" x2="655" y2="150"/>
        </g>

        {/* Legend */}
        <g transform="translate(50, 100)">
          <text fill="#888" fontSize="12" fontWeight="bold">HOVER FOR MODERN LENSES</text>
          <g transform="translate(0, 25)">
            <circle r="6" fill="#00d9ff"/>
            <text x="15" fill="#00d9ff" fontSize="11">⚛ Physics</text>
          </g>
          <g transform="translate(0, 45)">
            <circle r="6" fill="#00ff88"/>
            <text x="15" fill="#00ff88" fontSize="11">🧠 Cognitive Science</text>
          </g>
          <g transform="translate(0, 65)">
            <circle r="6" fill="#ff6b6b"/>
            <text x="15" fill="#ff6b6b" fontSize="11">🤖 AI / ML</text>
          </g>
        </g>

        {/* Elephant Path Legend */}
        <g transform="translate(980, 100)">
          <text fill="#888" fontSize="12" fontWeight="bold">SHAMATHA PROGRESS</text>
          <g transform="translate(0, 20)">
            {[1,2,3,4,5,6,7,8,9].map((stage, i) => (
              <g key={stage} transform={`translate(0, ${i * 22})`}>
                <rect width="18" height="14" rx="3" fill={`rgb(${30 + i*25}, ${30 + i*25}, ${30 + i*25})`}/>
                <text x="25" y="11" fill="#888" fontSize="10">Stage {stage}</text>
              </g>
            ))}
          </g>
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredNode && (
        <NodeTooltip 
          node={hoveredNode} 
          x={typeof window !== 'undefined' ? window.innerWidth / 2 : 600} 
          y={400}
        />
      )}

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        color: '#666',
        fontSize: '12px'
      }}>
        <p>Based on Atisha's Lamp for the Path (11th century) and Tsongkhapa's Lamrim Chenmo</p>
        <p style={{ marginTop: '8px', color: '#444' }}>
          Interactive knowledge graph • Hover over nodes for modern scientific bridges
        </p>
      </div>
    </div>
  );
};

export default LamrimKnowledgeGraph;
