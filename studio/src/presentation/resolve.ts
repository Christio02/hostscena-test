import {defineLocations, PresentationPluginOptions} from 'sanity/presentation'
import {locationConfigs} from '../utils/locationsConfig'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: Object.fromEntries(
    locationConfigs.map(({type, select, buildSingle}) => [
      type,
      defineLocations({
        select,
        resolve: (doc) => ({locations: buildSingle(doc ?? [])}),
      }),
    ]),
  ),
}
