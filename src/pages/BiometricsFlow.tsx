import React from 'react'
import BiometricsScreen from '../components/BiometricsScreen'
import { NavigationProps } from '../utils/types'

function BiometricsFlow({ navigation }: NavigationProps) {
  return <BiometricsScreen navigation={navigation} />
}

export default BiometricsFlow
