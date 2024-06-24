import { defineStore } from 'pinia'

const useAppStore = defineStore('app', {
  state: () => ({
    isMenuContentCollapse: false,
    isConfigPanelCollapse: false
  }),

  actions: {
    toggleMenuContentCollapse() {
      this.isMenuContentCollapse = !this.isMenuContentCollapse
    },
    toggleConfigPanelCollapse() {
      this.isConfigPanelCollapse = !this.isConfigPanelCollapse
    }
  }
})

export default useAppStore
