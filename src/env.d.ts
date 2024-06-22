declare global {
  declare module 'fabric/fabric-impl' {
    interface IObjectOptions {
      /**
       * 标识
       */
      id?: string | undefined
    }
  }
}
