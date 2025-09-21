import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  lang: string
}

type Actions = {
  setLang: (value: string) => void
}

const storageKey = 'i18n-state'

const initialState: State = {
  lang: 'en',
}

export const useLangStore = create(
  persist<State & Actions>(
    (set) => ({
      ...initialState,
      setLang: (value: string) => set(() => ({ lang: value })),
    }),
    {
      name: storageKey,
      storage: createJSONStorage(() => localStorage),
    }
  )
)
