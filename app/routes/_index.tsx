import { ActionFunction, LoaderArgs, LoaderFunction, json, redirect } from '@remix-run/node'
import { createServerClient } from '@supabase/auth-helpers-remix'
import { useActionData, useLoaderData } from 'react-router'
// import CodeViolationsTacoma from './assets/code_violations_tacoma.csv'
import * as fs from 'fs'
import { parse } from 'csv-parse/sync'

import { useReactTable } from '@tanstack/react-table'

import { getData, getMetrics } from '~/server/data.server'
import { useRef } from 'react'

export const action: ActionFunction = async ({ request }) => {
  const response = new Response()

  const supabase = createServerClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || '',
    { request, response }
  )

  const { data: { session }} = await supabase.auth.getSession()

  // ...perform action

  return redirect('/')
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const response = new Response()
  // an empty response is required for the auth helpers
  // to set cookies to manage auth

  const supabase = createServerClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || '',
    { request, response }
  )
  const { data: { session }} = await supabase.auth.getSession()

  /// ...resolve loader
  const data = await getData()
  const metrics = await getMetrics(data)

  return json({ session, data, metrics })
}

export default function Index() {
  const { data, metrics, session } = useLoaderData()
  const actionData = useActionData()
  const tableRef = useRef()
  const columns = data.fields.map((field) => ({ dataField: field.name, text: field.alias }))
  
  const features = data.features.map((feature) => feature.attributes)
  const table = useReactTable({ data: features, columns, ref: tableRef})
  const tableFields = ['casenumber', 'address', 'casetype', 'casestatus', 'opendate']

  console.log(features[0])

  return (
    <div>
      <div className="flex flex-col w-full gap-4">
        <div className="grid grid-flow-col gap-2 grid-rows-2">
          {
            metrics.map(({name, value}) => (
              <div className="flex flex-col text-center bg-gray-100 rounded-md p-4">
                <div className="font-bold">{name}</div>
                <div>{value}</div>
              </div>
            ))
          }
        </div>
        <div className="flex px-4 py-2 w-full">
          {
            tableFields.map(field => (
              <div className="font-bold w-full">{field}</div>
              ))
            }
        </div>
        <div className="flex flex-col gap-2">
          {features.map((feature) => (
            <a href={`/${feature.casenumber}`}>
              <div className="flex hover:bg-gray-200 px-4 py-2 round-md transition whitespace-nowrap">
                {
                  tableFields.map(field => (
                    <div className="w-full">{feature[field]}</div>
                  ))
                }
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
