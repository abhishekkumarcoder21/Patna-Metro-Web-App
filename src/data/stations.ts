// Metro line data
export const lines = [
  {
    id: 'blue',
    name: 'Blue Line',
    color: 'blue',
    bgColor: '#2563eb',
    path: 'M 100,250 L 250,100 L 400,150 L 550,100 L 700,200 L 850,150'
  },
  {
    id: 'green',
    name: 'Green Line',
    color: 'green',
    bgColor: '#16a34a',
    path: 'M 150,400 L 300,350 L 450,400 L 600,300 L 750,350 L 900,300'
  },
  {
    id: 'yellow',
    name: 'Yellow Line',
    color: 'yellow',
    bgColor: '#ca8a04',
    path: 'M 200,150 L 350,200 L 500,250 L 650,200 L 800,250'
  }
];

// Station data
export const stations = [
  {
    id: 'pj',
    name: 'Patna Junction',
    area: 'Central Patna',
    lines: ['blue', 'yellow'],
    order: 1,
    x: 150,
    y: 200
  },
  {
    id: 'gm',
    name: 'Gandhi Maidan',
    area: 'Central Patna',
    lines: ['blue', 'green'],
    order: 2,
    x: 250,
    y: 150
  },
  {
    id: 'dp',
    name: 'Danapur',
    area: 'West Patna',
    lines: ['blue', 'green'],
    order: 3,
    x: 350,
    y: 180
  },
  {
    id: 'pp',
    name: 'Patliputra',
    area: 'North Patna',
    lines: ['green', 'yellow'],
    order: 4,
    x: 450,
    y: 220
  },
  {
    id: 'rn',
    name: 'Rajendra Nagar',
    area: 'South Patna',
    lines: ['yellow'],
    order: 5,
    x: 550,
    y: 170
  },
  {
    id: 'bk',
    name: 'Bailey Road',
    area: 'East Patna',
    lines: ['blue'],
    order: 6,
    x: 650,
    y: 190
  },
  {
    id: 'sk',
    name: 'Saguna More',
    area: 'West Patna',
    lines: ['green'],
    order: 7,
    x: 750,
    y: 210
  },
  {
    id: 'pg',
    name: 'Phulwari Sharif',
    area: 'South-West Patna',
    lines: ['yellow'],
    order: 8,
    x: 850,
    y: 230
  }
];