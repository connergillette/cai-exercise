import { LoaderArgs, json } from '@remix-run/node'
import { useLoaderData, useParams } from '@remix-run/react'

export const loader = ({ params }: LoaderArgs) => {
  const caseNumber = params.caseNumber

  return json({ caseNumber })
}

export default function CaseDetails () {
  const { caseNumber } = useLoaderData()

  return (
    <>
      <h1 className="text-2xl">Case Details (#{caseNumber})</h1>
      <div className="grid grid-flow-col gap-2 grid-cols-3 py-4">
        <div className="flex flex-col text-center bg-gray-100 rounded-md p-4">
          <div className="font-bold">Metric Name</div>
          <div>Value</div>
        </div>
        <div className="flex flex-col text-center bg-gray-100 rounded-md p-4">
          <div className="font-bold">Metric Name</div>
          <div>Value</div>
        </div>
        <div className="flex flex-col text-center bg-gray-100 rounded-md p-4">
          <div className="font-bold">Metric Name</div>
          <div>Value</div>
        </div>
      </div>
    </>
  )
}