import type { RowData, Table } from '@tanstack/react-table'
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '@/features/core/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/features/core/components/ui/pagination'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface DataTablePaginationProps<TData extends RowData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
}

export function DataTablePagination<TData extends RowData>({
  table,
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  const { t } = useTranslation()

  return (
    <div className={cn('flex flex-row items-center gap-4', className)} {...props}>
      <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
        <p className="text-muted-foreground text-sm whitespace-nowrap" aria-live="polite">
          <span className="text-foreground">
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
            {Math.min(
              Math.max(
                table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                  table.getState().pagination.pageSize,
                0
              ),
              table.getRowCount()
            )}
          </span>{' '}
          {t('table.pageStatus')}{' '}
          <span className="text-foreground">{table.getRowCount().toString()}</span>
        </p>
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label={t('table.goFirstPage')}
              >
                <ChevronFirstIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label={t('table.goPreviousPage')}
              >
                <ChevronLeftIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label={t('table.goNextPage')}
              >
                <ChevronRightIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
                aria-label={t('table.goLastPage')}
              >
                <ChevronLastIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
