export const getDistanceAndTime = (lat1, lat2, lon1, lon2) => {
    // const lat2 = 10.066942
    // const lon2 = 78.222133

    const speed = 20 * (5 / 18) //km/h=>m/s
    if (lat1 == lat2 && lon1 == lon2) {
        return {
            dist: 0,
            time: 0,
        }
    } else {
        let radlat1 = (Math.PI * lat1) / 180
        let radlat2 = (Math.PI * lat2) / 180
        let theta = lon1 - lon2
        let radtheta = (Math.PI * theta) / 180
        let dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        if (dist > 1) {
            dist = 1
        }
        dist = Math.acos(dist)
        dist = (dist * 180) / Math.PI
        dist = dist * 60 * 1.1515
        dist = dist * 1.609344
        let time = (dist * 1000) / speed / 60

        return {
            dist: Math.round(dist * 100) / 100,
            time: Math.round(time * 100) / 100,
        }
    }
}
