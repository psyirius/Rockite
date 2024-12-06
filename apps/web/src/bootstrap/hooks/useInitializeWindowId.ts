import { internalPropertiesInitializeWindowId } from '$redux/actions/internal-properties'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useInitializeWindowId(storeReady: boolean) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (storeReady) {
      dispatch(internalPropertiesInitializeWindowId())
    }
  }, [storeReady])
}

export default useInitializeWindowId
