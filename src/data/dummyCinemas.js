/**
 * src/data/dummyCinemas.js
 * -----------------------------------------------------------------------
 * Data dummy untuk daftar bioskop di Pekanbaru beserta jadwal tayang (showtimes)
 * untuk mall-mall target: SKA, Living World (LW), Transmart, Ramayana.
 * -----------------------------------------------------------------------
 */

const INDO_DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const INDO_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];

function getBookingDates() {
  const dates = [];
  const start = new Date(2026, 5, 25); // June 25, 2026 (Month 5 is June)
  const today = new Date();
  const baseDate = today > start ? today : start;
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    const dayName = INDO_DAYS[d.getDay()];
    const dateNum = d.getDate();
    const monthName = INDO_MONTHS[d.getMonth()];
    const year = d.getFullYear();
    dates.push(`${dayName}, ${dateNum} ${monthName} ${year}`);
  }
  return dates;
}

export const dummyCinemas = [
  {
    id: 'c1',
    name: 'SKA Mall XXI',
    location: 'Mall SKA Lt. 3, Jl. Soekarno - Hatta, Pekanbaru',
    type: 'XXI',
    rating: '4.8',
    ticketPrice: 40000,
    dates: getBookingDates(),
    showtimes: ['12:00', '14:30', '17:00', '19:30', '21:45']
  },
  {
    id: 'c2',
    name: 'Living World CGV',
    location: 'Living World Pekanbaru Lt. 2, Jl. Tuanku Tambusai, Pekanbaru',
    type: 'CGV',
    rating: '4.7',
    ticketPrice: 45000,
    dates: getBookingDates(),
    showtimes: ['11:45', '13:15', '16:00', '18:40', '21:20']
  },
  {
    id: 'c3',
    name: 'Transmart CGV',
    location: 'Trans Studio Mini Lt. 3, Jl. Soekarno - Hatta, Pekanbaru',
    type: 'CGV',
    rating: '4.5',
    ticketPrice: 35000,
    dates: getBookingDates(),
    showtimes: ['12:30', '15:00', '17:30', '20:00', '22:10']
  },
  {
    id: 'c4',
    name: 'Ramayana Cineplex',
    location: 'Plaza Ramayana Lt. 3, Jl. Sudirman, Pekanbaru',
    type: 'CINEPLEX',
    rating: '4.3',
    ticketPrice: 30000,
    dates: getBookingDates(),
    showtimes: ['12:15', '14:45', '17:15', '19:45', '21:30']
  }
];
