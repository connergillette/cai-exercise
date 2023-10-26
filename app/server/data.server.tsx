import * as fs from 'fs';
import { parse } from 'csv-parse/sync'
import CodeViolationsTacoma from '~/code_violations_tacoma.csv'

export const getData = async () => {
  const response = await fetch('https://services3.arcgis.com/SCwJH1pD8WSn5T5y/arcgis/rest/services/Code_Violations/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
  const result = await response.json()
  return result
}

export const getMetrics = async (data) => {
  const features = data.features
  console.log(features)
  // TODO: Make this non-dummy
  return [
    {
      name: 'Open Cases',
      value: data.features.filter((feature) => !feature.attributes.casestatus.includes('Closed')).length
    },
    {
      name: 'Record Count',
      value: features.length
    },
    {
      name: 'Last Record Date',
      value: new Date(features[0].attributes.opendate).toDateString()
    },
    {
      name: 'Open Cases',
      value: data.features.filter((feature) => !feature.attributes.casestatus.includes('Closed')).length
    },
    {
      name: 'Record Count',
      value: features.length
    },
    {
      name: 'Last Record Date',
      value: new Date(features[0].attributes.opendate).toDateString()
    },
  ]
}