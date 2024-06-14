import { defineStore } from 'pinia'

const useAppStore = defineStore('app', {
  state: () => ({
    isMenuContentCollapse: false,
    isConfigPanelCillspse: false
  }),

  actions: {
    toggleMenuContentCollapse() {
      this.isMenuContentCollapse = !this.isMenuContentCollapse
    },
    toggleConfigPanelCillspse() {
      this.isConfigPanelCillspse = !this.isConfigPanelCillspse
    }
  }
})

export default useAppStore
