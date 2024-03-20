import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Layout = {
  theme: string
  drawerOpen: boolean,
  popup: any
}
const initialState: Layout = {
  theme: 'system',
  drawerOpen: false,
  popup: false
}

export const layoutStore = create<Layout>()(
  persist(() => initialState, {
    name: 'layoutStore',
  })
)

export default function useLayoutService() {
  const { theme, drawerOpen,popup } = layoutStore()

  return {
    theme,
    drawerOpen,
    popup,
    toggleTheme: () => {
      layoutStore.setState({
        theme: theme === 'dark' ? 'light' : 'dark',
      })
    },
    toggleDrawer: () => {
      layoutStore.setState({
        drawerOpen: !drawerOpen,
      })
    },
    offDrawer: () => {
      layoutStore.setState({
        drawerOpen: false,
      })
    },
    openPopup: (children:React.ReactNode) => {
      layoutStore.setState({
        popup: children,
      })
    },
    closePopup: () => {
      layoutStore.setState({
        popup: 0,
      })
    },
    togglePopup: () => {
      layoutStore.setState({
        popup: !popup,
      })
    },
  }
}
