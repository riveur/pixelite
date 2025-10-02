import { Link } from '@tanstack/react-router'
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
import { MinecraftColor } from '@/features/core/components/minecraft_color'
import { Avatar, AvatarImage } from '@/features/core/components/ui/avatar'
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
import { getSkullUrl } from '@/lib/minecraft/skin'
import { cn } from '@/lib/utils'
import type { Guild } from '../types'

function getColumns({ t }: Pick<ReturnType<typeof useTranslation>, 't'>) {
  const columns: ColumnDef<Guild['members'][number]>[] = [
    /* {
    id: 'expand',
    cell: ({ row, table }) => {
      return (
        <Button
          size="icon"
          variant="ghost"
          className="group size-8"
          aria-expanded={row.getIsExpanded()}
          onClick={() => table.setExpanded({ [row.id]: !row.getIsExpanded() })}
        >
          <ChevronRightIcon className="group-aria-[expanded=true]:rotate-90 transition-transform" />
        </Button>
      )
    },
    enableSorting: false,
  }, */
    {
      header: t('server.labels.name'),
      accessorFn: (member) => member.profile?.displayName || member.uuid,
      id: 'username',
      cell: ({ row }) => {
        const member = row.original

        let displayName = '§3' + member.uuid

        if (member.profile) {
          const rank =
            member.profile.rank.cleanName === 'DEFAULT'
              ? ''
              : member.profile.rank.prefix !== member.profile.rank.colorCode
                ? member.profile.rank.prefix
                : member.profile.rank.colorCode + member.profile.rank.cleanName
          const name =
            (member.profile.rank.name === 'SUPERSTAR' && member.profile.rank.customRankColor
              ? member.profile.rank.customRankColor
              : member.profile.rank.colorCode) + member.profile.displayName

          displayName = [rank, name].filter(Boolean).join(' ')
        }

        return (
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage
                src={getSkullUrl(row.original.uuid)}
                alt={row.original.profile?.displayName?.at(0) || row.original.uuid.at(0)}
              />
            </Avatar>
            {member.profile?.displayName ? (
              <Link
                to="/hypixel/players/$username"
                params={{ username: member.profile.displayName }}
                className="hover:underline"
              >
                <MinecraftColor>{displayName}</MinecraftColor>
              </Link>
            ) : (
              <MinecraftColor>{displayName}</MinecraftColor>
            )}
          </div>
        )
      },
    },
    {
      header: t('server.hypixel.labels.rank'),
      accessorKey: 'rank',
      cell: ({ row }) => {
        return <Badge variant="outline">{row.getValue('rank')}</Badge>
      },
    },
    {
      header: t('server.hypixel.labels.joined'),
      accessorKey: 'joined',
      cell: ({ row }) => {
        const { DateTime } = useLuxon()
        return DateTime.fromMillis(row.getValue('joined')).toLocaleString(DateTime.DATETIME_SHORT)
      },
    },
  ]

  return columns
}

interface GuildMembersTableProps {
  data: Guild['members']
}

export function GuildMembersTable({ data }: GuildMembersTableProps) {
  const { t } = useTranslation()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'joined',
      desc: false,
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
            column={table.getColumn('username')!}
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
