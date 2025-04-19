'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type AvalancheWarning = {
  id: string
  region_name: string
  danger_level: number
  valid_from: string
  main_text: string
}

export default function AvalancheWarnings() {
  const [warnings, setWarnings] = useState<AvalancheWarning[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('avalanche_warning')
        .select('*')
        .order('valid_from', { ascending: false })

      if (error) {
        console.error('Error fetching data:', error)
      } else {
        setWarnings(data as AvalancheWarning[])
      }
    }

    fetchData()
  }, [])

  // Function to get the color and style for the danger level pill
  const getDangerLevelPillStyle = (level: number): string => {
    if (level == 0 || level == 1) return 'bg-green-200 text-black' // Shadcn theme green
    if (level == 2) return 'bg-yellow-200 text-black' // Shadcn theme yellow
    if (level >= 3 && level <= 5) return 'bg-red-200 text-black' // Shadcn theme red
    return ''
  }

  return (
    <div className="flex justify-center p-6">
      <div className="overflow-x-auto w-full max-w-6xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Region</TableHead>
              <TableHead>Danger Level</TableHead>
              <TableHead>Valid From</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {warnings.map((warning) => (
              <TableRow key={warning.id}>
                <TableCell>{warning.region_name}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getDangerLevelPillStyle(warning.danger_level)}`}
                  >
                    {warning.danger_level}
                  </span>
                </TableCell>
                <TableCell>{new Date(warning.valid_from).toLocaleString()}</TableCell>
                <TableCell>{warning.main_text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
