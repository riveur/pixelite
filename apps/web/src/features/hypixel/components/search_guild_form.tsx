import { useNavigate, useParams, useRouterState } from '@tanstack/react-router'

import { PixelCardTextIcon, PixelHumanIcon } from '@/features/core/components/icons'
import { SearchInput } from '@/features/core/components/ui/search_input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/features/core/components/ui/select'
import { useTranslation } from '@/lib/i18n'

interface SearchGuildFormProps {
  type: string
}

export function SearchGuildForm({ type }: SearchGuildFormProps) {
  const { t } = useTranslation()
  const params = useParams({ from: '/hypixel/guilds/$name', shouldThrow: false })
  const navigate = useNavigate()
  const pageIsLoading = useRouterState({ select: (state) => state.isLoading })

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const name = String(formData.get('name'))

    if (!name) {
      return
    }

    navigate({
      to: '/hypixel/guilds/$name',
      params: { name: name },
      search: { type: type },
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col sm:flex-row gap-1 w-full [&_[data-slot='search-input']]:flex-1">
        <div className="flex flex-row">
          <div className="flex items-center justify-center border border-input text-sm px-3">
            <span>{t('server.hypixel.guild.searchTypeLabel')} :</span>
          </div>
          <Select
            value={type}
            onValueChange={(value) =>
              navigate({ from: '/hypixel/guilds', search: { type: value } })
            }
          >
            <SelectTrigger className="-ms-px flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">
                <PixelCardTextIcon />
                {t('server.hypixel.guild.searchType.name')}
              </SelectItem>
              <SelectItem value="player">
                <PixelHumanIcon />
                {t('server.hypixel.guild.searchType.player')}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <SearchInput
          name="name"
          defaultValue={params?.name}
          placeholder={t('server.hypixel.guild.searchPlaceholder')}
          disabled={pageIsLoading}
        />
      </div>
    </form>
  )
}
