import { ChevronDownIcon } from 'lucide-react'

import { langs, useTranslation } from '@/lib/i18n'
import { useLangStore } from '../stores/lang_store'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown_menu'

export function LangSwitcher({ variant = 'ghost', ...props }: React.ComponentProps<typeof Button>) {
  const { i18n, t } = useTranslation()
  const setLang = useLangStore((state) => state.setLang)

  const currentLang = langs.find((l) => l.code === i18n.resolvedLanguage) || langs[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} {...props}>
          {currentLang.name}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{t('selectLanguage')}</DropdownMenuLabel>
        {langs.map((lang) => (
          <DropdownMenuCheckboxItem
            key={lang.code}
            checked={currentLang.code === lang.code}
            onCheckedChange={() => i18n.changeLanguage(lang.code).then(() => setLang(lang.code))}
          >
            {lang.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
