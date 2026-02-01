# Prompt for Risk Assessment Council Frontend Developer

**Role**: You are an expert Senior Full Stack Developer and UI/UX Designer specializing in secure, corporate, and government-standard web applications.

**Objective**: Create the frontend for the **Risk Assessment Council** website. This website will focus on cybersecurity, DPDP (Digital Personal Data Protection) laws, and risk management in India.

**Reference & Design Philosophy**:
- **Structure**: The website must mimic the **Carbonnex** website's structure, layout, and interactivity exactly. Use Carbonnex’s codebase as your structural template.
- **Theme**: While the structure is Carbonnex, the *theme* must be adapted for a **Risk Assessment Council**.
  - **Colors**: Use a professional "Security Blue" palette (deep blues, greys, white, and alert accents like orange/red). 
  - **Visuals**: Review `https://www.dpo-india.com/` for content inspiration and color matching (professional/legal/corporate look).
- **Tech Stack**: 
  - **Framework**: React 19 (via Vite)
  - **Routing**: React Router Dom 7
  - **Styling**: Standard CSS (Modular or Global `App.css` similar to Carbonnex) or CSS Modules. Ensure it is responsive and "premium".
  - **Animations**: `framer-motion` for page transitions and element entry (fade-ins, slides).
  - **Translation**: `i18next` & `react-i18next` for bilingual support (English/Hindi or other relevant languages).
  - **Charts**: `recharts` for any data visualization.

---

## Specific Requirements

### 1. Hero Section (Home Page)
- **Animation**: You **MUST** include the **Rotating Earth Animation** in the background, similar to Carbonnex's 'nature' variant.
  - **Constraint**: **REMOVE** any "smoke", "pollution", "falling leaves", or "growing trees" animations. The Earth should be clean/tech-focused (perhaps overlaying circuit lines or a digital grid if possible, but the rotating earth is mandatory).
- **Content**: 
  - Headline: Professional and authoritative (e.g., "Securing India's Digital Future", "Mastering User Risk & Data Privacy").
  - Subtitle: concise description of the council's mission.
  - CTAs: "Join Council", "Explore Services".

### 2. Website Structure (Pages)
Replicate the Carbonnex page structure but rename/repurpose them for Risk/Cybersecurity:
- **Home**: Hero, Counter/Stats (e.g., "Audits Conducted", "Members", "Regulations Covered"), Services Highlights, Latest Insights.
- **Services Hub**: A central page listing services.
  - *Examples*: "DPDP Compliance", "Cyber Audit", "Vendor Risk Management", "CISO as a Service".
  - *Format*: Grid of interactive cards with hover effects (same as Carbonnex).
- **Resources**:
  - **Flash Cards**: Use the flash card format for educational snippets (e.g., "What is a Data Fiduciary?", "Section 43A of IT Act").
  - **Articles/Blog**: List of whitepapers or updates.
- **About Us**: Mission, Vision, Council Members (Team section).
- **Contact**: Standard contact form with validation.

### 3. Interactive Elements (Carbonnex Clones)
- **Animations**: Use `framer-motion` for all scrolling elements (fade up, stagger children).
- **Cards**: High-quality hover states (lift up, shadow increase, subtle border glow).
- **Translation**: Include a language switcher in the Header (e.g., EN | HI).

### 4. Technical Constraints
- **Frontend Only**: Do **NOT** create a backend or database.
- **Mock Data**: Hardcode all text, stats, and "database" items in JSON files or within the components.
- **No Smoke/Leaf Effects**: As mentioned, keep the Earth, but remove organic/pollution effects.
- **Responsiveness**: Must be fully mobile-responsive.

## Deliverables
- Complete React project source code.
- `App.jsx` with all routes defined.
- Components folder (Header, Footer, Hero, ServiceCard, etc.).
- Pages folder (Home, Services, Resources, etc.).
- CSS files for styling.

**Note to Agent**: Acknowledge `dpo-india.com` as a source for *content tone* and *color inspiration*, but strictly follow the **Carbonnex** *layout and code structure*.
