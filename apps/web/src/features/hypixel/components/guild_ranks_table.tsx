import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useState } from 'react'

import { DataTableFilter } from '@/features/core/components/data_table_filter'
import { DataTablePagination } from '@/features/core/components/data_table_pagination'
import { DataTablePerPage } from '@/features/core/components/data_table_per_page'
import { Badge } from '@/features/core/components/ui/badge'
import { Card, CardContent } from '@/features/core/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/features/core/components/ui/table'
import { useLuxon } from '@/features/core/hooks/use_luxon'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { Guild } from '../types'

function getColumns({ t }: Pick<ReturnType<typeof useTranslation>, 't'>) {
  const columns: ColumnDef<Guild['ranks'][number]>[] = [
    {
      header: t('server.labels.name'),
      accessorKey: 'name',
    },
    {
      header: t('server.hypixel.labels.tag'),
      accessorKey: 'tag',
      cell: ({ row }) => {
        return <Badge variant="outline">{row.getValue('tag')}</Badge>
      },
    },
    {
      header: t('server.hypixel.labels.priority'),
      accessorKey: 'priority',
    },
    {
      header: t('server.hypixel.labels.created'),
      accessorKey: 'created',
      cell: ({ row }) => {
        const { DateTime } = useLuxon()
        return DateTime.fromMillis(row.getValue('created')).toLocaleString(DateTime.DATETIME_SHORT)
      },
    },
  ]

  return columns
}

interface GuildRanksTableProps {
  data: Guild['ranks']
}

export function GuildRanksTable({ data }: GuildRanksTableProps) {
  const { t } = useTranslation()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'priority',
      desc: true,
    },
  ])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const columns = getColumns({ t })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
  })

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="w-60">
          <DataTableFilter
            showLabel={false}
            placeholder={t('server.labels.name')}
            column={table.getColumn('name')!}
          />
        </div>
      </div>
      <Card className="py-0 overflow-hidden">
        <CardContent className="px-0">
          <div className="space-y-6">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="bg-muted/50">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="relative h-10 select-none"
                          aria-sort={
                            header.column.getIsSorted() === 'asc'
                              ? 'ascending'
                              : header.column.getIsSorted() === 'desc'
                                ? 'descending'
                                : 'none'
                          }
                        >
                          {header.isPlaceholder ? null : header.column.getCanSort() ? (
                            <div
                              className={cn(
                                header.column.getCanSort() &&
                                  'flex h-full cursor-pointer items-center justify-between gap-2 select-none'
                              )}
                              onClick={header.column.getToggleSortingHandler()}
                              onKeyDown={(e) => {
                                // Enhanced keyboard handling for sorting
                                if (
                                  header.column.getCanSort() &&
                                  (e.key === 'Enter' || e.key === ' ')
                                ) {
                                  e.preventDefault()
                                  header.column.getToggleSortingHandler()?.(e)
                                }
                              }}
                              tabIndex={header.column.getCanSort() ? 0 : undefined}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: (
                                  <ChevronUpIcon
                                    className="shrink-0 opacity-60"
                                    size={16}
                                    aria-hidden="true"
                                  />
                                ),
                                desc: (
                                  <ChevronDownIcon
                                    className="shrink-0 opacity-60"
                                    size={16}
                                    aria-hidden="true"
                                  />
                                ),
                              }[header.column.getIsSorted() as string] ?? (
                                <span className="size-4" aria-hidden="true" />
                              )}
                            </div>
                          ) : (
                            flexRender(header.column.columnDef.header, header.getContext())
                          )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      {t('table.noResults')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-between gap-8">
        <DataTablePerPage table={table} />
        <DataTablePagination table={table} />
      </div>
    </>
  )
}
