import { internalPropertiesIncrement, internalPropertiesSet } from '$redux/actions/internal-properties'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useInitializeRunCount(storeReady: boolean) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (storeReady) {
      dispatch(internalPropertiesIncrement('RunCount', internalPropertiesSet('InitializedRunCount', true)))
    }
  }, [storeReady])
}

export default useInitializeRunCount
