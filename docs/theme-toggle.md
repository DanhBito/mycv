# Theme Toggle (Dark/Light Mode)

## Mục đích

Cho phép user chuyển đổi giữa dark theme và light theme. Tự động detect thời gian thiết bị để chọn theme phù hợp (6:00-18:00 = light, 18:00-6:00 = dark). User vẫn có thể toggle thủ công và preference được lưu lại.

## Chi tiết công việc

### 1. CSS Variables (`assets/css/main.css`)

Định nghĩa 6 color tokens dạng CSS custom properties:

| Token | Light | Dark |
|-------|-------|------|
| `--color-bg` | `255 255 255` (#fff) | `13 17 23` (#0d1117) |
| `--color-bg-secondary` | `246 248 250` (#f6f8fa) | `22 27 34` (#161b22) |
| `--color-bg-tertiary` | `238 241 245` (#eef1f5) | `33 38 45` (#21262d) |
| `--color-text-primary` | `31 35 40` (#1f2328) | `230 237 243` (#e6edf3) |
| `--color-muted` | `101 109 118` (#656d76) | `139 148 158` (#8b949e) |
| `--color-border` | `208 215 222` (#d0d7de) | `48 54 61` (#30363d) |

Format `R G B` (space-separated) để tương thích với Tailwind `rgb(var(...) / <alpha-value>)`.

Tag colors (.tag-green/cyan/orange/purple) có 2 bộ: light (text đậm hơn cho contrast) và dark (giữ nguyên bản gốc).

Global `*` transition trên `color, background-color, border-color, box-shadow` (0.3s ease) giúp chuyển theme mượt.

### 2. Tailwind Config (`tailwind.config.ts`)

- `darkMode: 'selector'` — toggle bằng class `.dark` trên `<html>`
- Colors map sang CSS variables thay vì hardcoded hex

### 3. Composable (`composables/useTheme.ts`)

- `useTheme()` trả về `{ isDark, toggle }`
- `isDark` — readonly reactive ref
- `toggle()` — đổi theme, lưu localStorage, apply class
- Auto-detect logic: check `localStorage('theme-preference')` → nếu không có → check giờ thiết bị
- SSR-safe: skip DOM operations trên server

### 4. Flash Prevention (`nuxt.config.ts`)

Inline `<script>` chạy trước Vue hydrate, đọc localStorage/giờ và add `.dark` class ngay lập tức → không bị flash trắng khi user prefer dark.

### 5. Toggle Button (`components/TheNav.vue`)

- Desktop: nằm cuối danh sách nav links
- Mobile: nằm cạnh hamburger menu
- Icon: Sun (đang dark → click chuyển light) / Moon (đang light → click chuyển dark)
- Animation: rotate + scale khi icon chuyển đổi (CSS keyframes `themeIconIn`)

### 6. Particles (`composables/useParticles.ts`)

Đọc `isDark` từ `useTheme()` mỗi frame để đổi:
- Dot color: `0,212,255` (dark) / `0,140,180` (light)
- Line color: `109,179,63` (dark) / `80,140,40` (light)
- Line alpha: `0.15` (dark) / `0.2` (light)

## Test Cases

| Test | Expected | Result |
|------|----------|--------|
| Load 6:00-18:00 (no localStorage) | Light theme | Pass |
| Load 18:00-6:00 (no localStorage) | Dark theme | Pass |
| Click toggle light → dark | Smooth transition, icon sun→moon, localStorage saved | Pass |
| Click toggle dark → light | Smooth transition, icon moon→sun, localStorage saved | Pass |
| Reload sau khi toggle | Theme giữ nguyên theo localStorage | Pass |
| Xóa localStorage, reload | Fallback về time-based | Pass |
| Tags readable cả 2 theme | Contrast đủ trên cả nền sáng/tối | Pass |
| Particles đổi màu theo theme | Lighter trên light, brighter trên dark | Pass |
| Không flash khi load | Inline script apply class trước hydrate | Pass |
