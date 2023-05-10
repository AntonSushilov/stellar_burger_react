import { useSelector } from 'react-redux';
import { RootState } from "../index";

export const useRootSelector = <T>(fn: (state: RootState) => T) => useSelector<RootState, T>(fn);

