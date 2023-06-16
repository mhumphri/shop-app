const calcCosts = (roomData, checkin, checkout) => {
  const numberNights = (checkout - checkin) / (1000 * 60 * 60 * 24);
  const dayRate = roomData.prices.dayRate
  const base = roomData.prices.dayRate * numberNights
  const cleaning = roomData.prices.cleaning
  const service = roomData.prices.serviceRate * numberNights
  const tax = roomData.prices.taxRate * numberNights
  const total = base + cleaning + service + tax
  const perNight = total/numberNights

  return {
    numberNights: numberNights,
    dayRate: Math.round(roomData.prices.dayRate).toLocaleString("en-US"),
    base: Math.round(base).toLocaleString("en-US"),
    cleaning: Math.round(cleaning).toLocaleString("en-US"),
    service: Math.round(service).toLocaleString("en-US"),
    tax: Math.round(tax).toLocaleString("en-US"),
    total: Math.round(total).toLocaleString("en-US"),
    perNight: Math.round(perNight).toLocaleString("en-US"),
  }
}

export default calcCosts
