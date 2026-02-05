# BODHI ENGINE
## བྱང་ཆུབ་འཕྲུལ་འཁོར།
### An AI-Native Platform for Indo-Tibetan Buddhist Wisdom

---

**Product Requirements Document v1.0**  
**February 2026**  
**Prepared for: Primary Ventures**

---

## Executive Summary

**Bodhi Engine** is a platform that makes 2,500 years of Buddhist wisdom accessible, navigable, and applicable through modern technology. It bridges ancient Indo-Tibetan texts with contemporary understanding through the lenses of physics, cognitive science, and artificial intelligence.

### The Problem

- Less than 5% of the Tibetan Buddhist canon has been translated into modern languages
- Existing translations lack modern epistemological bridges for contemporary practitioners
- No systematic way to track progress through the graduated path (Lamrim)
- Traditional teaching structures don't map to modern learning patterns

### The Solution

A daily practice platform combining:
1. Curated teachings with scientific lens annotations
2. An interactive knowledge graph of the complete spiritual architecture
3. Journaling with AI-assisted reflection
4. Gamified progress tracking based on the 9-stage Shamatha (Elephant Path)
5. Streak-based engagement mechanics

### Market Opportunity

- 275M+ Buddhists globally, fastest-growing religion in Western countries
- $2.2B meditation app market (Headspace, Calm) lacks depth and tradition
- Growing intersection of contemplative practice and cognitive science

---

## Product Vision

### Vision Statement

> *"To create the definitive AI-native platform for Buddhist study and practice—where ancient wisdom meets modern science, and every practitioner has a GPS for the path to awakening."*

### Design Principles

#### 1. Tradition-First, Technology-Enabled
Respect the 1,000-year lineage while making it accessible. Never dilute teachings for engagement metrics.

#### 2. Engagement Without Attainment Claims
Track time spent, concepts studied, and practice consistency—never claim spiritual realization.

#### 3. Bridge, Don't Replace
Scientific lenses are bridges to understanding, not replacements for traditional meaning.

#### 4. Open Architecture
Build on open source, integrate with existing translation projects (84000, BDRC), enable community contribution.

---

## Source Corpus Strategy

The platform will index Buddhist texts across three tiers of accessibility:

| Tier | Source | Content | Status |
|------|--------|---------|--------|
| **Tier 1** | 84000.co | 25% Kangyur (English) | ✅ Ready (API) |
| **Tier 1** | Lotsawa House | Lamrim, prayers | ✅ Ready (CC) |
| **Tier 1** | FPMT Archive | Modern teachings | ✅ Ready (CC) |
| **Tier 2** | BDRC (library.bdrc.io) | 30M pages scanned | ⚠️ OCR needed |
| **Tier 3** | Audio/Video teachings | Living masters | ⚠️ Transcription |

**MVP Recommendation:** Start with Tier 1 sources (84000 + Lotsawa House + FPMT). This provides the complete Lamrim framework plus key sutras in structured, API-accessible English. BDRC integration becomes Phase 2.

---

## Core Features

### 1. Daily Teaching Engine

A curated daily teaching with multi-lens annotations.

**Components:**
- **Traditional Source:** Original text with Tibetan, transliteration, and English translation
- **Physics Lens:** Connections to quantum mechanics, thermodynamics, relativity
- **Cognitive Science Lens:** Neuroscience, predictive processing, embodied cognition
- **AI Lens:** Machine learning analogies, alignment, attention mechanisms
- **Reflection Prompt:** Daily contemplation question linked to concept

**Scientific Lens Curation Model (Three-Layer Hybrid):**

```
┌─────────────────────────────────────────────────────┐
│           LAYER 3: AI-GENERATED                     │
│   Claude/GPT generates bridge for new concepts      │
│   Flagged as "AI-suggested" until reviewed          │
└─────────────────────────────────────────────────────┘
                        ▲
┌─────────────────────────────────────────────────────┐
│         LAYER 2: COMMUNITY-CONTRIBUTED              │
│   Users propose mappings with upvote/review         │
│   Best contributions get "verified" badge           │
└─────────────────────────────────────────────────────┘
                        ▲
┌─────────────────────────────────────────────────────┐
│         LAYER 1: EDITORIAL (GOLD STANDARD)          │
│   Expert-curated bridges for ~50 core concepts      │
│   Physics, CogSci, AI lenses fully written          │
└─────────────────────────────────────────────────────┘
```

---

### 2. Lamrim Knowledge Graph

Interactive visualization of the complete spiritual architecture.

**Structure (Kadampa Lamrim):**

```
                      ENLIGHTENMENT
                           ▲
              ┌────────────┴────────────┐
              │                         │
         EMPTINESS               BODHICITTA
         (Wisdom)                 (Method)
              │                         │
         Two Truths              Six Perfections
              │                         │
              └────────────┬────────────┘
                           │
                    RENUNCIATION
                           │
                      SHAMATHA
                   (9 Elephant Stages)
                           │
              ┌────────────┼────────────┐
              │            │            │
           KARMA        REFUGE    DEP. ORIGINATION
              │            │            │
              └────────────┼────────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        PRECIOUS      DEATH &      SPIRITUAL
        HUMAN LIFE   IMPERMANENCE    GUIDE
              └────────────┴────────────┘
                      FOUNDATION
```

**Node Interactions:**
- **Click:** Navigate to concept deep-dive
- **Hover:** Quick preview with scientific lenses
- **Connections:** Show prerequisites, dependencies, outcomes
- **Progress overlay:** Personal engagement mapped to nodes

---

### 3. AI-Assisted Journal

Contemplative journaling with intelligent reflection support.

**Capabilities:**
- Daily reflection prompts linked to current teaching
- AI-generated follow-up questions (Socratic method)
- Pattern recognition across entries (themes, progress)
- Auto-tagging of concepts mentioned
- Integration with knowledge graph (entries linked to nodes)

---

### 4. Shamatha Progress Tracker (Elephant Path)

Gamified progress based on the 9-stage Buddhist attention training model.

**Design Philosophy:** *Engagement, not attainment*—track time and consistency, never claim spiritual realization.

| Stage | Name | Phenomenological Marker | App Metric Proxy |
|-------|------|------------------------|------------------|
| 1 | Placement | Mind wanders constantly | Session completion rate |
| 2-3 | Continual Placement | Brief focus moments | Self-reported focus intervals |
| 4-5 | Taming | Focus > distraction | Consecutive focused sessions |
| 6-7 | Pacifying | Joy in practice | Wellbeing check-ins + streaks |
| 8-9 | Single-Pointed | Effortless abiding | Session length + depth markers |

**Visual Design:** Inspired by traditional thangka paintings—elephant turning from black to white as practice deepens, monkey of distraction disappearing.

---

### 5. Streak & Engagement System

- **Daily streak:** Consecutive days of practice
- **Topic completion:** Progress through 21 Lamrim meditations
- **Knowledge graph coverage:** % of concepts engaged
- **Journal depth:** Entries per concept

---

## Three Features to Build Now

> *These features can be built as standalone artifacts/prototypes in 1-2 weeks each.*

### A. Interactive Lamrim Knowledge Graph

**What:** A beautiful, interactive visualization of the complete Kadampa Lamrim architecture as a React component.

**Why Now:**
- No dependencies on text corpus integration
- Immediately shareable/embeddable
- Visual anchor for the entire product vision
- Can be used for fundraising demos

**Deliverable:** React/SVG component with hover tooltips showing scientific bridges, inspired by traditional thangka paintings.

**Effort:** 1 week

---

### B. Daily Teaching API + Widget

**What:** Backend service that serves one teaching per day from a curated set of 50 core concepts, with pre-written scientific bridges.

**Why Now:**
- Creates the core content loop
- Can be embedded anywhere (email, Slack, website)
- Tests the editorial curation process
- Forces clarity on the scientific lens framework

**Deliverable:** REST API + embeddable React widget + daily email digest option.

**Effort:** 2 weeks (1 week content curation, 1 week engineering)

---

### C. Shamatha Progress Visualization

**What:** The 9-stage Elephant Path as an animated, interactive progress tracker.

**Why Now:**
- Iconic visual (thangka-inspired elephant turning white)
- Differentiated from generic meditation apps
- Can work standalone before full app integration
- Demonstrates the "engagement not attainment" philosophy

**Deliverable:** Animated React component showing user's elephant stage with phenomenological descriptions and practice recommendations.

**Effort:** 1 week

---

## Technical Architecture

### Stack Recommendation

- **Frontend:** Next.js + React + Tailwind
- **Visualization:** D3.js / React Flow for knowledge graph
- **Backend:** Node.js or Python (FastAPI)
- **Database:** PostgreSQL + vector store (Pinecone/pgvector) for semantic search
- **AI:** Claude API for journal reflection, lens generation review
- **Text Processing:** 84000 API + custom XML parsers

### Data Model (Simplified)

```
Concept → hasSource[] → Text
Concept → hasLens[] → ScientificBridge
Concept → prerequisiteOf[] → Concept
User → hasEngagement[] → ConceptEngagement
User → hasJournalEntry[] → JournalEntry → taggedWith[] → Concept
User → currentShamatha → Stage
```

---

## Product Naming

### Recommended: **Bodhi Engine**

བྱང་ཆུབ་འཕྲུལ་འཁོར། *(Changchub Trulkhor)*

**Why it works:**
- **Bodhi** = awakening (the goal)
- **Engine** = technology-forward, implies power and capability
- Evokes both tradition (Bodhi tree) and modernity (search engine)
- Domain-friendly (bodhiengine.com likely available)

### Alternative Names Considered

| Name | Meaning | Consideration |
|------|---------|---------------|
| Lamrim.ai | Direct, trademarked term | May limit scope; Gelug-specific |
| Rigpa | Pure awareness (Dzogchen) | Already used by major org |
| Dharma Engine | Teaching + technology | Good alternative; broader |
| Sutra | The texts themselves | Simple but generic |
| Path.ai | The journey metaphor | Too generic; taken |
| Wisdom Engine | Prajna + technology | Strong but less distinctive |

---

## Roadmap

### Phase 1: Foundation (Months 1-3)
- ✓ Build interactive Lamrim knowledge graph
- ✓ Create daily teaching API with 50 curated concepts
- ✓ Develop Shamatha progress visualization
- ○ Launch landing page + email waitlist

### Phase 2: Core App (Months 4-6)
- Web app with user accounts and progress tracking
- AI-assisted journal integration
- 84000 text corpus integration
- Community contribution system for scientific lenses

### Phase 3: Scale (Months 7-12)
- Mobile apps (iOS/Android)
- BDRC integration for Tibetan source texts
- Teacher verification layer
- Premium features (personalized curriculum, advanced AI)

---

## The 21 Kadampa Lamrim Meditations

The platform's daily curriculum follows this traditional 3-week cycle:

**Foundation (Days 1-2)**
1. Precious Human Life
2. Death and Impermanence

**Small Scope (Days 3-6)**
3. Danger of Lower Rebirth
4. Refuge Practice
5. Actions and Effects (Karma)
6. Developing Renunciation for Samsara

**Middle Scope (Days 7-8)**
7. Recognizing Samsara's Suffering
8. Three Higher Trainings

**Great Scope - Bodhicitta (Days 9-20)**
9. Developing Equanimity
10. Recognizing All Beings as Mothers
11. Remembering Kindness of Beings
12. Equalizing Self and Others
13. Disadvantages of Self-Cherishing
14. Advantages of Cherishing Others
15. Exchanging Self with Others
16. Great Compassion
17. Taking (Tonglen)
18. Wishing Love
19. Giving (Tonglen)
20. Bodhicitta

**Great Scope - Wisdom (Day 21)**
21. Emptiness / Ultimate Truth

---

## Appendix: Scientific Lens Examples

### Dependent Origination (རྟེན་འབྲེལ།)

**Traditional:** All phenomena arise from causes and conditions. Nothing exists independently.

**Physics Bridge:** Quantum entanglement demonstrates that particles can be correlated regardless of distance—they don't exist as independent entities but as relationships. The "emptiness" of independent existence is literally encoded in quantum mechanics.

**CogSci Bridge:** Embodied cognition shows that mind isn't in the brain—it arises from brain-body-world interaction. Thoughts, perceptions, and even "self" are emergent from conditions, not pre-existing entities.

**AI Bridge:** In transformer architectures, no token has meaning without its context window. The "meaning" of a word is entirely dependent on surrounding tokens—a perfect demonstration of dependent origination at the computational level.

---

### Emptiness (སྟོང་པ་ཉིད།)

**Traditional:** All phenomena are empty of inherent existence—they exist conventionally but not ultimately.

**Physics Bridge:** Quantum field theory reveals that "particles" are excitations of underlying fields. The electron isn't a "thing"—it's a pattern of activity. Even the vacuum isn't empty; it teems with virtual particles.

**CogSci Bridge:** The predictive processing framework shows that perception is construction—the brain generates predictions and updates them based on error signals. The "self" is a prediction, not a discovery. There's no homunculus.

**AI Bridge:** A trained model has no intrinsic meaning outside its training distribution. The weights are just numbers until they process input. Meaning is relational, contextual, dependent—exactly as emptiness teaches.

---

*May all beings benefit.*

*སེམས་ཅན་ཐམས་ཅད་ལ་ཕན་པར་གྱུར་ཅིག*
