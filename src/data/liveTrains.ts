// Mock live train data
export const liveTrains = [
  {
    id: '1001',
    lineId: 'blue',
    nextStationId: 'gm',
    previousStationId: 'pj',
    destination: 'Danapur',
    platform: 1,
    minutesToArrival: 3,
    status: 'on-time',
    crowdLevel: 'high',
    x: 200, // For map display
    y: 175  // For map display
  },
  {
    id: '1002',
    lineId: 'blue',
    nextStationId: 'dp',
    previousStationId: 'gm',
    destination: 'Bailey Road',
    platform: 2,
    minutesToArrival: 5,
    status: 'delayed',
    crowdLevel: 'moderate',
    x: 300,
    y: 165
  },
  {
    id: '1003',
    lineId: 'green',
    nextStationId: 'pp',
    previousStationId: 'dp',
    destination: 'Saguna More',
    platform: 1,
    minutesToArrival: 2,
    status: 'arriving',
    crowdLevel: 'low',
    x: 400,
    y: 200
  },
  {
    id: '1004',
    lineId: 'yellow',
    nextStationId: 'rn',
    previousStationId: 'pp',
    destination: 'Phulwari Sharif',
    platform: 1,
    minutesToArrival: 7,
    status: 'on-time',
    crowdLevel: 'moderate',
    x: 500,
    y: 195
  },
  {
    id: '1005',
    lineId: 'blue',
    nextStationId: 'bk',
    previousStationId: 'dp',
    destination: 'Bailey Road',
    platform: 1,
    minutesToArrival: 8,
    status: 'delayed',
    crowdLevel: 'high',
    x: 600,
    y: 185
  },
  {
    id: '1006',
    lineId: 'green',
    nextStationId: 'sk',
    previousStationId: 'pp',
    destination: 'Saguna More',
    platform: 2,
    minutesToArrival: 4,
    status: 'on-time',
    crowdLevel: 'low',
    x: 700,
    y: 180
  },
  {
    id: '1007',
    lineId: 'yellow',
    nextStationId: 'pg',
    previousStationId: 'rn',
    destination: 'Phulwari Sharif',
    platform: 1,
    minutesToArrival: 6,
    status: 'on-time',
    crowdLevel: 'moderate',
    x: 800,
    y: 190
  }
];