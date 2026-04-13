export function createBookingData() {
  return {
    firstname: 'Michal',
    lastname: 'Test',
    totalprice: 123,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-04-10',
      checkout: '2026-04-15',
    },
    additionalneeds: 'Breakfast',
  };
}