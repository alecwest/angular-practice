import {
    Action,
    Reducer,
    Store
  } from './lib/miniRedux';

interface AppState {
    messages: String[];
}

interface AddMessageAction extends Action {
    message: string;
}

interface DeleteMessageAction extends Action {
    index: number;
}

let reducer: Reducer<AppState> = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                messages: state.messages.concat(
                    (<AddMessageAction>action).message
                ),
            };
        case 'DELETE_MESSAGE':
            let idx = (<DeleteMessageAction>action).index;
            return {
                messages: [
                    ...state.messages.slice(0, idx),
                    ...state.messages.slice(idx + 1, state.messages.length)
                ],
            };
    }
};

let store = new Store<AppState>(reducer, { messages: [] });
console.log(store.getState());

store.dispatch({
    type: 'ADD_MESSAGE',
    message: 'Would you say the fringe was made of silk?'
} as AddMessageAction);

store.dispatch({
    type: 'ADD_MESSAGE',
    message: 'Wouldn\'t have no other kind but silk'
} as AddMessageAction);

store.dispatch({
    type: 'ADD_MESSAGE',
    message: 'Has it really got a team of snow white horses?'
} as AddMessageAction);

console.log(store.getState());
