import { requestApi } from '../../utils/requestApi'
import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from './type'

export const openModal = () => ({
	type: OPEN_MODAL,
});

export const closeModal = () => ({
	type: CLOSE_MODAL,
});

