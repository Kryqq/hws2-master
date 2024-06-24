import { UserType } from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: any, action: any): any => { // need to fix any
    switch (action.type) {

        case 'sort': { // by name
            if (action.payload === 'up') {
                return [...state.sort((a: UserType, b: UserType) => a.name.localeCompare(b.name))]
            } else {
                return [...state.sort((a: UserType, b: UserType) => b.name.localeCompare(a.name))]
            }
        }
        case 'check': {
            let a = [...state.sort((a: UserType, b: UserType) => a.name.localeCompare(b.name))]
            return [...a.filter((u: UserType) => u.age > action.payload)]
        }
        default:
            return state
    }
}