import { ActionFunction, LoaderArgs, LoaderFunction, json, redirect } from '@remix-run/node'
import { createServerClient } from '@supabase/auth-helpers-remix'
import { useActionData, useLoaderData } from 'react-router'
// import CodeViolationsTacoma from './assets/code_violations_tacoma.csv'
import * as fs from 'fs'
import { parse } from 'csv-parse/sync'

import { useReactTable } from '@tanstack/react-table'

import { getData } from '~/server/data.server'
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

  console.log(data)

  return json({ session, data })
}

export default function Index() {
  const { data, session } = useLoaderData()
  const actionData = useActionData()
  const tableRef = useRef()
  const columns = data.fields.map((field) => ({ dataField: field.name, text: field.alias }))
  
  const features = data.features.map((feature) => feature.attributes)
  const table = useReactTable({ data: features, columns, ref: tableRef})
  const tableFields = ['casenumber', 'address', 'casetype', 'casestatus', 'opendate']

  console.log(features[0])

  return (
    <div>
      <table ref={tableRef}></table>
      <div className="flex flex-col w-full gap-4">
        <div className="flex">
          {
            tableFields.map(field => (
              <div className="font-bold w-full">{field}</div>
              ))
            }
        </div>
        <div className="flex flex-col gap-2">
          {features.map((feature) => (
            <div className="flex">
              {
                tableFields.map(field => (
                  <div className="w-full">{feature[field]}</div>
                ))
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
