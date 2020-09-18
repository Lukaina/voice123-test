//@typescript-eslint/no-unused-vars
import React, { useCallback, useReducer, useState } from 'react'
import constate from 'constate'

type Action = { type: 'SET_RESULT'; payload: any[] }

type AppState = {
  loading: boolean
  actors: any[]
}

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'SET_RESULT':
      return { ...state, actors: action.payload }

    default:
      return state
  }
}

const initialState: AppState = {
  loading: false,
  actors: [],
}

const useAppState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [stateLoading, setStateLoading] = useState<boolean>(false)

  const loadActors = useCallback(
    async (actor: string) => {
      setStateLoading(true)
      const actors = await fetch(
        'https://api.sandbox.voice123.com/providers/search/?service=voice_over&keywords=' +
          actor +
          '&page=1'
      )
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result)
            dispatch({ type: 'SET_RESULT', payload: result.providers })
          },

          (error) => {
            console.log(error)
          }
        )

      setStateLoading(false)
    },
    [dispatch]
  )

  return { ...state, dispatch, loadActors }
}

const [AppStateProvider, useAppStateContext] = constate(useAppState)

export { AppStateProvider, useAppStateContext }
