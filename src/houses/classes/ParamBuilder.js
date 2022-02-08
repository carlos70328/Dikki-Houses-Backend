
const houseConstants = require('../constants/HouseConstants');

class ParamBuilder {

  setParams(params){
    return {
      // City
      ...( params.city ? { 'location.city': params.city.toLowerCase() } : '' ),
      // State
      ...( params.state ? { 'location.state': params.state.toLowerCase() } : '' ),
      // Country
      ...( params.country ? { 'location.country': params.country.toLowerCase() } : '' ),
      // Type
      ...( params.type ? { 'type' : params.type.toLowerCase() } : '' ),
      // Price
      ...( params.priceGT || params.priceLT ? { price: {
        ...( params.priceGT ? { '$gte': params.priceGT } : ''),
        ...( params.priceLT ? { '$lte': params.priceLT } : '')
      }} : ''),
      // Rooms
      ...( params.roomsGT || params.roomsLT ? { 'components.bedrooms.quantity': {
        ...( params.roomsGT ? { '$gte': params.roomsGT } : ''),
        ...( params.roomsLT ? { '$lte': params.roomsLT } : '')
      }} : ''),
      // Geolocation
      ...( params.lat && params.lng && params.maxDistance ? {
        geoPosition: {
          $near: {
              $maxDistance: params.maxDistance,
              $geometry: {
                  type: params.geolocationType || houseConstants.geoLocationPoint,
                  coordinates: [params.lat, params.lng]
              }
          }
        }
      }: ''),
    }
  }

  setPagination(params){
    return {
      ...( params.page ? { skip: Number(params.page * params.limit) } : '' ),
      ...( params.limit ? { limit: Number(params.limit) }: '' ),
    }
  }
}

module.exports = ParamBuilder;
