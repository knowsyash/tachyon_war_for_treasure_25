'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '../lib/store'
import { persistStore } from 'redux-persist'
import { store } from '../lib/store'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}