import { useNavigate, useParams, useRouterState } from '@tanstack/react-router'

import { SearchInput } from '@/features/core/components/ui/search_input'
import { useTranslation } from '@/lib/i18n'

export function SearchPlayerForm() {
  const { t } = useTranslation()
  const params = useParams({ from: '/hypixel/players/$username', shouldThrow: false })
  const navigate = useNavigate()
  const pageIsLoading = useRouterState({ select: (state) => state.isLoading })

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const username = String(formData.get('username'))

    if (!username) {
      return
    }

    navigate({ to: '/hypixel/players/$username', params: { username: username } })
  }

  return (
    <form onSubmit={onSubmit}>
      <SearchInput
        name="username"
        defaultValue={params?.username}
        placeholder={t('server.hypixel.playerSearchPlaceholder')}
        disabled={pageIsLoading}
      />
    </form>
  )
}
