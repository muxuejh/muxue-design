import { defineStore } from 'pinia'

import img01 from '@/assets/images/01.png'
import img02 from '@/assets/images/02.png'
import img03 from '@/assets/images/03.png'
import img04 from '@/assets/images/04.png'
import img05 from '@/assets/images/05.png'
import img06 from '@/assets/images/06.png'
import img07 from '@/assets/images/07.png'
import img08 from '@/assets/images/08.png'
import img09 from '@/assets/images/09.png'
import img10 from '@/assets/images/10.png'
import img11 from '@/assets/images/11.png'
import img12 from '@/assets/images/12.png'
import img13 from '@/assets/images/13.png'
import img14 from '@/assets/images/14.png'
import img15 from '@/assets/images/15.png'
import img16 from '@/assets/images/16.png'
import img17 from '@/assets/images/17.png'

const useDataStore = defineStore('data', {
  state: () => ({
    MaterialList: [
      img01,
      img02,
      img03,
      img04,
      img05,
      img06,
      img07,
      img08,
      img09,
      img10,
      img11,
      img12,
      img13,
      img14,
      img15,
      img16,
      img17
    ]
  }),

  actions: {}
})

export default useDataStore
