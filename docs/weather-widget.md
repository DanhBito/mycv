# Weather Animation Widget

## Mục đích
Hiển thị icon animation thời tiết realtime trên navbar, dựa trên vị trí thiết bị user.

## Chi tiết công việc

### Luồng hoạt động
1. User truy cập → browser hỏi quyền Geolocation
2. Nếu cho phép → lấy lat/lon → gọi `/api/weather?lat=...&lon=...`
3. Nếu từ chối → fallback về Ho Chi Minh City (10.8231, 106.6297)
4. Server proxy gọi OpenWeatherMap API → trả về condition, temp, city
5. Client nhận data → render SVG animation tương ứng

### Weather conditions mapping
| OpenWeatherMap | Widget state | Animation |
|---------------|-------------|-----------|
| Clear | clear | Mặt trời xoay tia sáng |
| Clouds | clouds | Đám mây trôi |
| Rain, Drizzle | rain | Đám mây + giọt mưa rơi |
| Thunderstorm | thunderstorm | Đám mây + sét chớp + mưa |
| Snow | snow | Đám mây + bông tuyết rơi |
| Mist, Fog, Haze, ... | mist | Đường sương mờ nhấp nháy |

### Files
- `server/api/weather.get.ts` — Nitro API proxy
- `composables/useWeather.ts` — Geolocation + fetch logic
- `components/WeatherWidget.vue` — SVG + tooltip UI
- `assets/css/weather.css` — Keyframe animations

### Environment
- `NUXT_WEATHER_API_KEY` — OpenWeatherMap API key (free tier)

## Test cases
- [ ] Widget hiện đúng icon khi trời nắng (clear)
- [ ] Widget hiện đám mây khi trời nhiều mây
- [ ] Widget hiện mưa khi trời mưa
- [ ] Tooltip hiển thị temp + description + city khi hover
- [ ] Fallback HCM city khi user từ chối geolocation
- [ ] Widget ẩn khi API lỗi hoặc không có key
- [ ] Responsive: hiện trên cả mobile và desktop
