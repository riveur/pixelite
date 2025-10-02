import type { RowData, Table } from '@tanstack/react-table'
import { useId } from 'react'

import { Label } from '@/features/core/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/features/core/components/ui/select'
import { useTranslation } from '@/lib/i18n'

interface DataTablePerPageProps<TData extends RowData> {
  table: Table<TData>
}

function DataTablePerPage<TData extends RowData>({ table }: DataTablePerPageProps<TData>) {
  const id = useId()
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-3">
      <Label htmlFor={id} className="max-sm:sr-only">
        {t('table.perPage')}
      </Label>
      <Select
        value={table.getState().pagination.pageSize.toString()}
        onValueChange={(value) => {
          table.setPageSize(Number(value))
        }}
      >
        <SelectTrigger
          id={id}
          className="p-6px h-8 w-fit min-w-8 whitespace-nowrap dark:bg-background"
        >
          <SelectValue placeholder={t('table.perPagePlaceholder')} />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
          {[5, 10, 25, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={pageSize.toString()}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export { DataTablePerPage }
