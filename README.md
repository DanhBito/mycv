# My CV

Personal CV/portfolio website with admin panel, dark/light theme, animated weather widget, and PDF download.

**Live:** Deployed on VPS with PM2

## Tech Stack

- **Framework:** Nuxt 3 (SSR mode)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deploy:** VPS + PM2

## Features

- **Public CV Page** — Hero with typewriter effect & particle background, skills, experience timeline, metrics, education, contact terminal
- **Dark / Light Theme** — Auto-detect by time of day (6:00-18:00), toggle in navbar, persisted in localStorage
- **Weather Widget** — Animated pill in navbar showing realtime weather based on user location (GPS or IP fallback)
- **Admin Panel** — Password-protected editor for all CV sections, PDF upload/delete, SEO config
- **PDF Download** — Visitors can download selected CV as PDF

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Run production server
node .output/server/index.mjs
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
NUXT_ADMIN_PASSWORD=your-admin-password
NUXT_SESSION_PASSWORD=a-random-string-at-least-32-characters-long
NUXT_WEATHER_API_KEY=your-openweathermap-api-key
```

| Variable | Description |
|----------|-------------|
| `NUXT_ADMIN_PASSWORD` | Password for `/admin` login |
| `NUXT_SESSION_PASSWORD` | Session encryption key (32+ chars) |
| `NUXT_WEATHER_API_KEY` | [OpenWeatherMap](https://openweathermap.org/api) free API key |

## Project Structure

```
data/cv.json              # Single source of truth for all CV content
types/cv.ts               # TypeScript interfaces

pages/
  index.vue               # Public CV page
  admin.vue               # Admin panel

components/
  HeroSection.vue         # Hero with typewriter + particles
  SkillsSection.vue       # Skills grid with tags
  ExperienceSection.vue   # Experience timeline
  MetricsSection.vue      # Impact metrics
  EducationSection.vue    # Education cards
  ContactSection.vue      # Terminal-style contact
  TheNav.vue              # Navbar with theme toggle + weather
  TheFooter.vue           # Footer
  WeatherWidget.vue       # Animated weather pill
  admin/                  # 13 admin editor components

server/
  api/cv.get.ts           # GET  /api/cv — public CV data
  api/cv/[section].put.ts # PUT  /api/cv/:section — update section
  api/weather.get.ts      # GET  /api/weather — weather proxy
  api/auth/               # Login, logout, session check
  api/pdf/                # Upload, delete, download, config
  middleware/auth.ts       # Protects admin endpoints

composables/
  useTheme.ts             # Dark/light theme logic
  useWeather.ts           # Geolocation + weather fetch
  useParticles.ts         # Canvas particle animation
  useScrollReveal.ts      # Scroll reveal animations

assets/css/
  main.css                # Global styles + theme variables
  weather.css             # Weather widget animations

public/cv/                # PDF files for download
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/cv` | No | All CV data |
| PUT | `/api/cv/:section` | Yes | Update a section |
| GET | `/api/weather` | No | Weather by lat/lon or IP |
| POST | `/api/auth/login` | No | Admin login |
| POST | `/api/auth/logout` | Yes | Admin logout |
| GET | `/api/auth/check` | No | Check session |
| GET | `/api/pdf/download` | No | Download active PDF |
| POST | `/api/pdf/upload` | Yes | Upload new PDF |
| PUT | `/api/pdf/config` | Yes | Set active PDF |
| DELETE | `/api/pdf/:id` | Yes | Delete a PDF |

## License

Private project.
