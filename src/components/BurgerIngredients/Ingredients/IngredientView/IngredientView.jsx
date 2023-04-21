import React from 'react'
import { useParams } from 'react-router'
import PropTypes from 'prop-types'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
const IngredientView = props => {
  return (
    <>
    <IngredientDetails />
    </>
  )
}

IngredientView.propTypes = {}

export default IngredientView